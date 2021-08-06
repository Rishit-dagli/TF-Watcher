from logging import log

import numpy as np
import pytest
import tensorflow as tf
from numpy.testing import (assert_array_almost_equal, assert_array_compare,
                           assert_array_equal)
from numpy.testing._private.utils import assert_almost_equal

from tfwatcher.callbacks.epoch import EpochEnd
from tfwatcher.callbacks.predict import PredictEnd
from tfwatcher.callbacks.predict_batch import PredictBatchEnd
from tfwatcher.callbacks.test_batch import TestBatchEnd
from tfwatcher.callbacks.train_batch import TrainBatchEnd

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


epochs = 20

history = model.fit(
    X_train,
    y_train,
    epochs=epochs,
    validation_split=0.20,
    batch_size=4000,
    verbose=2,
    callbacks=[
        EpochEnd(schedule=2, print_logs=True),
        TrainBatchEnd(schedule=2, print_logs=True),
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


print(loss_val)
print(acc_val)


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


test_assert_len_acc(epochs, log_history)
test_assert_len_loss(epochs, log_history)
test_batch_bool(log_history)

assert_array_almost_equal(y_test, np.array(predictions_list, dtype="uint8"))
