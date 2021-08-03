# It is safe to expose Firebase apiKey publicly, read: https://stackoverflow.com/a/37484053/11878567

def get_firebase_config() -> dict:
    # It is better using a dict literal, read: https://stackoverflow.com/a/6610783/11878567
    return {
        'apiKey': "AIzaSyAfCOOzFtKxTa-_pS3lO6URRGR8sVjK7sk",
        'authDomain': "tf-watcher.firebaseapp.com",
        'databaseURL': "https://tf-watcher-default-rtdb.firebaseio.com",
        'projectId': "tf-watcher",
        'storageBucket': "tf-watcher.appspot.com"
    }
