import tensorflow as tf

from ..firebase_helpers import random_char, write_in_callback


class PredictEnd(tf.keras.callbacks.Callback):
    def __init__(self, round_time: int = 2, print_logs: bool = False):
        super(PredictEnd, self).__init__()
        self.round_time = round_time
        self.start_time = None
        self.end_time = None
        self.time = None
        self.print_logs = print_logs

        self.ref_id = random_char(7)
        print(f"Use this ID to monitor training for this session: {self.ref_id}")

    def on_predict_begin(self, logs=None):
        self.start_time = tf.timestamp()

    def on_predict_end(self, logs=None):
        self.end_time = tf.timestamp()

        # Use Python built in functions to allow using in @tf.function see
        # https://github.com/tensorflow/tensorflow/issues/27491#issuecomment-890887810
        self.time = float(self.end_time - self.start_time)

        data = logs
        data["epoch"] = False
        data["batch"] = False
        data["avg_time"] = self.time

        write_in_callback(data=data, ref_id=self.ref_id)

        if self.print_logs:
            print(data)
