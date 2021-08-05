def get_firebase_config() -> dict:
    """Returns a dictionary to initialize Firebase containing registered app's
    Firebase project configuration. It is safe to expose Firebase apiKey
    publicly, read `this Stack Overflow answer <https://stackoverflow.com/a/37484053/11878567>`_ .

    :return: A dictionary of Firebase project configuration
    :rtype: dict
    """

    # It is better using a dict literal, read: https://stackoverflow.com/a/6610783/11878567
    return {
        "apiKey": "AIzaSyAfCOOzFtKxTa-_pS3lO6URRGR8sVjK7sk",
        "authDomain": "tf-watcher.firebaseapp.com",
        "databaseURL": "https://tf-watcher-default-rtdb.firebaseio.com",
        "projectId": "tf-watcher",
        "storageBucket": "tf-watcher.appspot.com",
    }
