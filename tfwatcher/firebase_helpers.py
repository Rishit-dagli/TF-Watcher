import pyrebase

from .firebase_config import get_firebase_config


def write_to_firebase(data: dict, config: dict, ref_id: str, level: str):
    # level can be epoch, batch, prediction
    firebase = pyrebase.initialize_app(config)
    log_db = firebase.database()

    if level == "prediction":
        log_db.child(ref_id).child(1).push(data)
    else:
        log_db.child(ref_id).child(data[level]).push(data)
