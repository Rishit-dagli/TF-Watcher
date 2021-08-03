import pyrebase
from .firebase_config import get_firebase_config

def write_to_firebase(data, config, id):
    firebase = pyrebase.initialize_app(config)
    log_db = firebase.database()
    
    log_db.child(id).child