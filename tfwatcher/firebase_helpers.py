import random
import string

import pyrebase

from .firebase_config import get_firebase_config


def write_to_firebase(data: dict, ref_id: str, level: str) -> None:
    """Writes data to Firebase Realtime Database using 
    `https://github.com/thisbejim/Pyrebase <https://stackoverflow.com/a/37484053/11878567>`_
    , a simple Python wrapper around the Firebase API. This automatically fetches the 
    Firebase Config from :func:`firebase_config.get_firebase_config` .

    :param data: A dictionary of the logging metrics, epoch number and average time 
        which are to be logged to Firebase 
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
    """A wrapper around :func:`firebase_helpers.write_to_firebase` to simply pass in 
    the ``data`` and a unique ID to write to Firebase Realtime database. It 
    automatically figures out the level at which logs were collected and calls the 
    :func:`firebase_helpers.write_to_firebase` function. This function is also used to 
    write data to Firebase in between callbacks (eg. the :class:`EpochEnd` class). 

    :param data: A dictionary of the logging metrics, epoch number and average time 
        which are to be logged to Firebase 
    :type data: dict
    :param ref_id: A unique ID where the data would be pushed to on Firebase
    :type ref_id: str
    """

    if data["epoch"]:
        level = "epoch"
    elif data["batch"]:
        level = "batch"
    else:
        level = "prediction"

    write_to_firebase(data=data, ref_id=ref_id, level=level)


def random_char(y: int) -> str:
    """A very simple function to help generate an arbitary length of pseudo random 
    letters to serve as a unique ID specific to the class through which metrics are 
    being logged. This is also the child under which the mtrics are logged in Firebase 
    Realtime database.

    :param y: The length of the unique ID to be created
    :type y: int
    :return: A string of ``y`` pseudo random upper case and lower letters
    :rtype: str
    """

    return "".join(random.choice(string.ascii_letters) for _ in range(y))
