import tensorflow as tf


class PredictEnd(tf.keras.callbacks.Callback):
    def __init__(self, round_time: int = 2):
        super(PredictEnd, self).__init__()
        self.round_time = round_time
        self.start_time = None
        self.end_time = None
        self.time = None

    def on_predict_begin(self, logs=None):
        self.start_time = tf.timestamp()

    def on_predict_end(self, logs=None):
        self.end_time = tf.timestamp()

        # Use Python built in functions to allow using in @tf.function see
        # https://github.com/tensorflow/tensorflow/issues/27491#issuecomment-890887810
        self.time = float(self.end_time - self.start_time)

        data = logs
        data["avg_time"] = self.time
