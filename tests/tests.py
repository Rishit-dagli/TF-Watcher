from logging import log

import numpy as np
import pyrebase
import pytest
import tensorflow as tf
from numpy.testing import assert_array_compare, assert_array_equal
from numpy.testing._private.utils import assert_almost_equal
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.models import Sequential
from tfwatcher.callbacks.epoch import EpochEnd
from tfwatcher.callbacks.predict import PredictEnd
from tfwatcher.callbacks.predict_batch import PredictBatchEnd
from tfwatcher.callbacks.test_batch import TestBatchEnd
from tfwatcher.callbacks.train_batch import TrainBatchEnd
from tfwatcher.firebase_config import get_firebase_config

from tfwatcher.firebase_helpers import (  # isort:skip
    get_firebase_config,
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


def train_model():
    epochs = 2
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

    return history, log_history, epochs


history, log_history, epochs = train_model()

loss_val, acc_val = model.evaluate(
    X_test,
    y_test,
    verbose=False,
    callbacks=[TestBatchEnd(schedule=2, print_logs=True)],
    batch_size=2000,
)

predictions = model.predict(
    X_test,
    verbose=False,
    callbacks=[
        PredictEnd(print_logs=True),
        PredictBatchEnd(schedule=2, print_logs=True),
    ],
    batch_size=2000,
)

data = {
    "val_loss": 2.311211347579956,
    "val_accuracy": 0.06466666609048843,
    "loss": 2.369312286376953,
    "epoch": 0,
    "accuracy": 0.07400000095367432,
}


def test_assert_len_acc():

    history, log_history, epochs = train_model()
    len_acc = len(log_history["accuracy"])

    assert len_acc == epochs


def test_assert_len_loss():

    history, log_history, epochs = train_model()
    len_loss = len(log_history["loss"])
    assert len_loss == epochs


def test_assert_len_predictions():

    predictions = model.predict(
        X_test,
        verbose=False,
        callbacks=[
            PredictEnd(print_logs=True),
            PredictBatchEnd(schedule=2, print_logs=True),
        ],
        batch_size=2000,
    )
    predictions_list = []

    for i in predictions:
        predictions_list.append(np.argmax(i))

    assert len(predictions_list) == len(y_test)


def test_batch_bool():
    history, log_history, epochs = train_model()
    bool_val = log_history["batch"]

    assert bool_val[0] == False


def test_firebase_write():
    ref_id = random_char(7)

    # Firebase API shoulld return in an error
    try:
        write_to_firebase(data=data, ref_id=ref_id, level="prediction")
        val_bool = True
    except:
        val_bool = False
        return "Not working"

    # Delete from Firebase after this is tested
    config = get_firebase_config()

    firebase = pyrebase.initialize_app(config)
    db = firebase.database()
    db.child(ref_id).remove()

    assert len(ref_id) == 7 and val_bool == True


test_assert_len_acc()
test_assert_len_loss()
test_batch_bool()
test_assert_len_predictions()
test_firebase_write()
