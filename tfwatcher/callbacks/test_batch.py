from statistics import mean
from typing import Union

import tensorflow as tf

from ..firebase_helpers import random_char, write_in_callback


class TestBatchEnd(tf.keras.callbacks.Callback):
    """This class is a subclass of the `tf.keras.callbacks.Callback <https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/Callback>`_
    abstract base class and overrides the methods :func:`on_test_batch_begin` and :func:`on_test_batch_end`
    allowing loging after batches in ``evaluate`` methods and at the beginning of a
    validation batch in the fit methods, if validation data is provided. This class
    also uses the :mod:`.firebase_helpers` to send data to Firebase Realtime database
    and also creates a 7 character unique string where the data is pushed on Firebase.
    Logging to Firebase is also controllable by ``schedule`` argument, even providing a
    granular control for each batch in ``evaluate`` methods.

    Example:

    .. code-block:: python
        :caption: Logging data after every batch in evaluate methods
        :emphasize-lines: 4,13
        :linenos:

        import tfwatcher

        # here we specify schedule = 1 to log after every batch
        monitor_callback = tfwatcher.callbacks.TestBatchEnd(schedule=1)

        model.compile(
            optimizer=...,
            loss=...,
            # metrics which will be logged
            metrics=[...],
        )

        model.fit(..., callbacks=[monitor_callback])

    .. warning::
        If the ``steps_per_execution`` argument to compile in ``tf.keras.Model`` is set
        to N, the logging code will only be called every N batches.

    :param schedule: Use an integer value n to specify logging data every n batches
        the first one being logged by default. Use a list of integers to control
        logging with a greater granularity, logs on all batch numbers specified in
        the list taking the first batch as batch 1. Using a list will override
        loggging on the first batch by default, defaults to 1
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
        super(TestBatchEnd, self).__init__()
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

    def on_test_batch_begin(self, batch: int, logs: dict = None):
        """Overrides the `tf.keras.callbacks.Callback.on_test_batch_begin <https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/Callback#on_test_batch_begin>`_
        method which is called called at the beginning of a batch in evaluate methods
        and at the beginning of a validation batch in the fit methods, if validation
        data is provided.

        :param batch: Index of batch within the current epoch
        :type batch: int
        :param logs: contains the return value of ``model.test_step``. Typically, the
            values of the Model's metrics are returned.
            Example: ``{'loss': 0.2, 'accuracy': 0.7}``.
        :type logs: dict, optional
        """

        self.start_time = tf.timestamp()

    def on_test_batch_end(self, batch: int, logs: dict = None):
        """Overrides the `tf.keras.callbacks.Callback.on_test_batch_end <https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/Callback#on_test_batch_end>`_
        method which is called called at the end of a batch in evaluate
        methods and at the beginning of a validation batch in the fit methods, if
        validation data is provided. This method adds the batch number, the average
        time taken and pushes it to Firebase using the :mod:`.firebase_helpers` module.

        :param epoch: Index of batch within the current epoch
        :type epoch: int
        :param logs: Aggregated metric results up until this batch, defaults to None
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
            (self.is_int and ((batch + 1) % self.schedule == 0))
            or (self.is_list and ((batch + 1) in self.schedule))
        ) or (batch == 0):

            data = logs
            data["batch"] = batch + 1
            data["epoch"] = False
            data["avg_time"] = round(mean(self.times), self.round_time)

            write_in_callback(data=data, ref_id=self.ref_id)

            data["time"] = self.times
            if self.print_logs:
                print(data)

            self.times = list()
