from statistics import mean
from typing import Union

import tensorflow as tf

from ..firebase_helpers import random_char, write_in_callback


class EpochEnd(tf.keras.callbacks.Callback):
    """This class is a subclass of the `tf.keras.callbacks.Callback <https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/Callback>`_
    abstract base class and overrides the methods :func:`on_epoch_begin` and :func:`on_epoch_end`
    allowing logging after epochs in training. This class also uses the
    :mod:`.firebase_helpers` to send data to Firebase Realtime database and also
    creates a 7 character unique string where the data is pushed on Firebase. Logging
    to Firebase is also controllable by ``schedule`` argument, even providing a
    granular control for each epoch.

    Example:

    .. code-block:: python
        :caption: Logging data after every epoch
        :emphasize-lines: 4,13
        :linenos:

        import tfwatcher

        # here we specify schedule = 1 to log after every epoch
        monitor_callback = tfwatcher.callbacks.EpochEnd(schedule=1)

        model.compile(
            optimizer=...,
            loss=...,
            # metrics which will be logged
            metrics=[...],
        )

        model.fit(..., callbacks=[monitor_callback])


    :param schedule: Use an integer value n to specify logging data every n epochs
        the first one being logged by default. Use a list of integers to control
        logging with a greater granularity, logs on all epoch numbers specified in
        the list taking the first epoch as epoch 1. Using a list will override
        loggging on the first epoch by default, defaults to 1
    :type schedule: Union[int, list[int]], optional
    :param round_time: This argument allows specifying if you want to see the times
        on the web-app to be rounded, in most cases you would not be using this, defaults to 2
    :type round_time: int, optional
    :param print_logs: This argument should only be used when trying to debug if
        your logs do not appear in the web-app, if set to ``True`` this would print
        out the dictionary which is being pushed to Firebase, defaults to False
    :type print_logs: bool, optional
    :raises ValueError: If the ``schedule`` is neither an integer or a list.
    :raises Exception: If all the values in ``schedule`` list are not convertible
        to integer.
    """

    def __init__(
        self,
        schedule: Union[int, list] = 1,
        round_time: int = 2,
        print_logs: bool = False,
    ):

        super(EpochEnd, self).__init__()
        self.schedule = schedule
        self.start_time = None
        self.end_time = None
        self.times = list()
        self.round_time = round_time
        self.print_logs = print_logs

        self.ref_id = random_char(7)
        print(f"Use this ID to monitor training for this session: {self.ref_id}")

        self.is_int = False
        self.is_list = False
        if isinstance(self.schedule, int):
            self.is_int = True
        elif isinstance(self.schedule, list):
            self.is_list = True
        else:
            raise ValueError("schedule should either be an integer or a list")

        if self.is_list:
            try:
                self.schedule = list(map(int, self.schedule))
            except (ValueError, TypeError) as err:
                raise Exception(
                    "All elements in the list should be convertible to int: {}".format(
                        err
                    )
                )

    def on_epoch_begin(self, epoch: int, logs: dict = None):
        """Overrides the `tf.keras.callbacks.Callback.on_epoch_begin <https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/Callback#on_epoch_begin>`_
        method which is called at the start of an epoch. This function should only be
        called during TRAIN mode.

        :param epoch: Index of epoch
        :type epoch: int
        :param logs: Currently no data is passed to this argument since there are no
            logs during the start of an epoch, defaults to None
        :type logs: dict, optional
        """

        self.start_time = tf.timestamp()

    def on_epoch_end(self, epoch: int, logs: dict = None):
        """Overrides the `tf.keras.callbacks.Callback.on_epoch_end <https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/Callback#on_epoch_end>`_
        method which is called at the end of an epoch. This function should only be
        called during TRAIN mode. This method adds the epoch number, the average time
        taken and pushes it to Firebase using the :mod:`.firebase_helpers` module.

        :param epoch: Index of epoch
        :type epoch: int
        :param logs: Metric results for this training epoch, and for the validation
            epoch if validation is performed. Validation result keys are prefixed with
            ``val_``. For training epoch, the values of the Model's metrics are
            returned. Example : ``{'loss': 0.2, 'accuracy': 0.7}``, defaults to None
        :type logs: dict, optional
        """

        self.end_time = tf.timestamp()

        # Use Python built in functions to allow using in @tf.function see
        # https://github.com/tensorflow/tensorflow/issues/27491#issuecomment-890887810
        time = float(self.end_time - self.start_time)
        self.times.append(time)

        # Since we have similar logging code use the fact that if first argument of and is False Python doesn't
        # execute the second argument
        if (
            (self.is_int and ((epoch + 1) % self.schedule == 0))
            or (self.is_list and ((epoch + 1) in self.schedule))
        ) or (epoch == 0):
            data = logs
            data["epoch"] = epoch + 1
            data["batch"] = False
            data["avg_time"] = round(mean(self.times), self.round_time)

            write_in_callback(data=data, ref_id=self.ref_id)

            data["time"] = self.times
            if self.print_logs:
                print(data)

            self.times = list()
