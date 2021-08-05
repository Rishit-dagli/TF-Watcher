import random
import string

import pyrebase

from .firebase_config import get_firebase_config


def write_to_firebase(data: dict, ref_id: str, level: str) -> None:
    """Writes data to Firebase using `https://github.com/thisbejim/Pyrebase <https://stackoverflow.com/a/37484053/11878567>`_
    , a simply Python wrapper around the Firebase API.

    :param data: A dictionary of Firebase project configuration from
        :func:`firebase_config.get_firebase_config`
    :type data: dict
    :param ref_id: A unique ID where the data would be pushed to on Firebase
    :type ref_id: str
    :param level: This should be either ``epoch``, ``batch`` or ``prediction``
        corresponding to the level where the logs are collected. For ``prediction``,
        the data would be pushed without the epoch or batch number it was collected on.
    :type level: str
    """

    # level can be epoch, batch, prediction
    firebase = pyrebase.initialize_app(get_firebase_config())
    log_db = firebase.database()

    if level == "prediction":
        log_db.child(ref_id).child(1).push(data)
    else:
        log_db.child(ref_id).child(data[level]).push(data)


def write_in_callback(data: dict, ref_id: str):
    if data["epoch"]:
        level = "epoch"
    elif data["batch"]:
        level = "batch"
    else:
        level = "prediction"

    write_to_firebase(data=data, ref_id=ref_id, level=level)


def random_char(y: int) -> str:
    return "".join(random.choice(string.ascii_letters) for _ in range(y))
