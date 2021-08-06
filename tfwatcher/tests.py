from logging import log

import numpy as np
import pyrebase
import pytest
import tensorflow as tf
from numpy.testing import (
    assert_array_compare,
    assert_array_equal,
)
from numpy.testing._private.utils import assert_almost_equal
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.models import Sequential
from .callbacks.epoch import EpochEnd
from .callbacks.predict import PredictEnd
from .callbacks.predict_batch import PredictBatchEnd
from .callbacks.test_batch import TestBatchEnd
from .callbacks.train_batch import TrainBatchEnd
from .firebase_config import get_firebase_config
from .firebase_helpers import (
    random_char,
    write_in_callback,
    write_to_firebase,
)

fashion_mnist = tf.keras.datasets.fashion_mnist
(X_train_full, y_train_full), (X_test, y_test) = fashion_mnist.load_data()

X_train, y_train = X_train_full[:15000] / 255.0, y_train_full[:15000]


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
    "val_loss": 2.311211347579956,
    "val_accuracy": 0.06466666609048843,
    "loss": 2.369312286376953,
    "epoch": 0,
    "accuracy": 0.07400000095367432,
}


def test_firebase_write(data):
    ref_id = random_char(7)

    # Firebase API shoulld return in an error
    write_to_firebase(data=data, ref_id=ref_id, level="epoch")

    # Delete from Firebase after this is tested
    config = {
        "apiKey": "AIzaSyAfCOOzFtKxTa-_pS3lO6URRGR8sVjK7sk",
        "authDomain": "tf-watcher.firebaseapp.com",
        "databaseURL": "https://tf-watcher-default-rtdb.firebaseio.com",
        "projectId": "tf-watcher",
        "storageBucket": "tf-watcher.appspot.com",
    }
    firebase = pyrebase.initialize_app(config)
    db = firebase.database()
    db.child(ref_id).remove()

    assert len(ref_id) == 7


test_assert_len_acc(epochs, log_history)
test_assert_len_loss(epochs, log_history)
test_batch_bool(log_history)
test_firebase_write(data=data)
