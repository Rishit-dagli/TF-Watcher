from statistics import mean
from typing import Union

import tensorflow as tf

from ..firebase_helpers import random_char, write_in_callback


class PredictBatchEnd(tf.keras.callbacks.Callback):
    def __init__(
        self,
        schedule: Union[int, list] = 1,
        round_time: int = 2,
        print_logs: bool = False,
    ):
        super(PredictBatchEnd, self).__init__()
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

    def on_predict_batch_begin(self, batch, logs=None):
        self.start_time = tf.timestamp()

    def on_predict_batch_end(self, batch: int, logs: dict = None):
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
            data["batch"] = batch
            data["epoch"] = False
            data["avg_time"] = round(mean(self.times), self.round_time)

            write_in_callback(data=data, ref_id=self.ref_id)

            data["time"] = self.times
            if self.print_logs:
                print(data)

            self.times = list()
