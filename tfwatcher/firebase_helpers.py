import pyrebase

from .firebase_config import get_firebase_config


def write_to_firebase(data, config, id, level):
    # level can be epoch, batch, prediction
    firebase = pyrebase.initialize_app(config)
    log_db = firebase.database()

    if level == "prediction":
        log_db.child(id).child(1).push(data)
    else:
        log_db.child(id).child(data[level]).push(data)
