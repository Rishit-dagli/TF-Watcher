import random
import string

import pyrebase

from .firebase_config import get_firebase_config


def write_to_firebase(data: dict, ref_id: str, level: str):
    # level can be epoch, batch, prediction
    firebase = pyrebase.initialize_app(get_firebase_config())
    log_db = firebase.database()

    if level == "prediction":
        log_db.child(ref_id).child(1).push(data)
    else:
        log_db.child(ref_id).child(data[level]).push(data)


def write_in_callback(data: dict, ref_id: str):
    if data["epoch"] or (data["epoch"] is 0):
        level = "epoch"
    elif data["batch"] or (data["batch"] is 0):
        level = "batch"
    else:
        level = "prediction"

    write_to_firebase(data=data, ref_id=ref_id, level=level)


def random_char(y: int) -> str:
    return "".join(random.choice(string.ascii_letters) for _ in range(y))
