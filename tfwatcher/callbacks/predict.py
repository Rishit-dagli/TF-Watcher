import tensorflow as tf

from ..firebase_helpers import random_char, write_in_callback


class PredictEnd(tf.keras.callbacks.Callback):
    """This class is a subclass of the `tf.keras.callbacks.Callback <https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/Callback>`_
    abstract base class and overrides the methods :func:`on_predict_begin` and :func:`on_predict_end`
    allowing loging after ``predict`` method is run. This class also uses the
    :mod:`.firebase_helpers` module to send data to Firebase Realtime database and also
    creates a 7 character unique string where the data is pushed on Firebase.

    .. note::
        This class does not have the ``schedule`` parameter like other clases in the
        ``tfwatcher.callbacks`` subpackage since this would notify you once the
        prediction is over and there are no batches or epochs to make a schedule for.

    Example:

    .. code-block:: python
        :caption: Logging data after predict method
        :emphasize-lines: 3,12
        :linenos:

        import tfwatcher

        monitor_callback = tfwatcher.callbacks.PredictEnd()

        model.compile(
            optimizer=...,
            loss=...,
            # metrics which will be logged
            metrics=[...],
        )

        model.fit(..., callbacks=[monitor_callback])

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

    def __init__(self, round_time: int = 2, print_logs: bool = False):
        super(PredictEnd, self).__init__()
        self.round_time = round_time
        self.start_time = None
        self.end_time = None
        self.time = None
        self.print_logs = print_logs

        self.ref_id = random_char(7)
        print(f"Use this ID to monitor training for this session: {self.ref_id}")

    def on_predict_begin(self, logs: dict = None):
        """Overrides the `tf.keras.callbacks.Callback.on_predict_begin <https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/Callback#on_predict_begin>`_
        method which is called at the start of prediction.

        :param logs: Currently no data is passed to this argument since there are no
            logs during the start of an epoch, defaults to None
        :type logs: dict, optional
        """

        self.start_time = tf.timestamp()

    def on_predict_end(self, logs: dict = None):
        """Overrides the `tf.keras.callbacks.Callback.on_predict_end <https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/Callback#on_predict_end>`_
        method which is called at the end of prediction.

        :param logs:  Currently no data is passed to this argument since there are no
            logs during the start of an epoch, defaults to None
        :type logs: dict, optional
        """

        self.end_time = tf.timestamp()

        # Use Python built in functions to allow using in @tf.function see
        # https://github.com/tensorflow/tensorflow/issues/27491#issuecomment-890887810
        self.time = float(self.end_time - self.start_time)

        data = {"epoch": False, "batch": False, "avg_time": self.time}

        write_in_callback(data=data, ref_id=self.ref_id)

        if self.print_logs:
            print(data)
