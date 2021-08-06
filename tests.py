from logging import log

import numpy as np
import pyrebase
import pytest
import tensorflow as tf
from numpy.testing import (
    assert_array_almost_equal,
    assert_array_compare,
    assert_array_equal,
)
from numpy.testing._private.utils import assert_almost_equal
from tfwatcher.callbacks.epoch import EpochEnd
from tfwatcher.callbacks.predict import PredictEnd
from tfwatcher.callbacks.predict_batch import PredictBatchEnd
from tfwatcher.callbacks.test_batch import TestBatchEnd
from tfwatcher.callbacks.train_batch import TrainBatchEnd
from tfwatcher.firebase_config import get_firebase_config
from tfwatcher.firebase_helpers import (
    random_char,
    write_in_callback,
    write_to_firebase,
)


fashion_mnist = tf.keras.datasets.fashion_mnist
(X_train_full, y_train_full), (X_test, y_test) = fashion_mnist.load_data()

X_train, y_train = X_train_full[:15000] / 255.0, y_train_full[:15000]
print((X_train.shape, y_train.shape), (X_test.shape, y_test.shape))

from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.models import Sequential


def make_model():
    model = Sequential(
        [
            Flatten(input_shape=(28, 28)),
            Dense(300, activation="relu"),
            Dense(100, activation="relu"),
            Dense(10, activation="softmax"),
        ]
    )
    model.compile(
        optimizer="sgd", loss="sparse_categorical_crossentropy", metrics=["accuracy"]
    )
    return model


model = make_model()
model.summary()


epochs = 10

history = model.fit(
    X_train,
    y_train,
    epochs=epochs,
    validation_split=0.20,
    batch_size=4000,
    verbose=1,
    callbacks=[
        EpochEnd(schedule=3, print_logs=True),
        TrainBatchEnd(schedule=3, print_logs=True),
    ],
)


print(history.history)
log_history = history.history


loss_val, acc_val = model.evaluate(
    X_test,
    y_test,
    verbose=False,
    callbacks=[TestBatchEnd(schedule=2, print_logs=True)],
    batch_size=2000,
)




predictions = model.predict(
    X_test, verbose=False, callbacks=[PredictEnd(print_logs=True)], batch_size=2000
)
predictions_list = []

for i in predictions:
    predictions_list.append(np.argmax(i))

print(predictions_list)
print(y_test)


def test_assert_len_acc(epochs, log_history):

    len_acc = len(log_history["accuracy"])

    assert len_acc == epochs


def test_assert_len_loss(epochs, log_history):

    len_loss = len(log_history["loss"])

    assert len_loss == epochs


def test_batch_bool(log_history):
    bool_val = log_history["batch"]

    assert bool_val[0] == False


data = {
    "accuracy": [
        0.07400000095367432,
        0.06466666609048843,
        0.09316666424274445,
        0.14800000190734863,
        0.20475000143051147,
    ],
    "avg_time": [1.13, 0.35, 0.33],
    "batch": [False, False, False],
    "epoch": [0, 1, 3],
    "loss": [
        2.369312286376953,
        2.2976276874542236,
        2.2363133430480957,
        2.180738925933838,
        2.128960371017456,
    ],
    "time": [
        [1.1304969787597656],
        [0.3471100330352783],
        [0.33536386489868164, 0.32643795013427734],
    ],
    "val_accuracy": [
        0.06466666609048843,
        0.08299999684095383,
        0.1420000046491623,
        0.19233334064483643,
        0.23633334040641785,
    ],
    "val_loss": [
        2.311211347579956,
        2.2492246627807617,
        2.193131446838379,
        2.140815496444702,
        2.091247797012329,
    ],
}
data2 = {
    "val_loss": 2.311211347579956,
    "val_accuracy": 0.06466666609048843,
    "loss": 2.369312286376953,
    "epoch": 0,
    "accuracy": 0.07400000095367432,
}

print(data)


def test_firebase_write(data):
    ref_id = random_char(7)
    write_to_firebase(data=data, ref_id=ref_id, level="epoch")
    assert len(ref_id) == 7


test_assert_len_acc(epochs, log_history)
test_assert_len_loss(epochs, log_history)
test_batch_bool(log_history)
test_firebase_write(data=data2)

assert_array_almost_equal(y_test, np.array(predictions_list, dtype="uint8"))
