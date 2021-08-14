<p align="center">
  <img src="../media/logo.png" height="128"/>
</p>


# TF Watcher (Python Package)

[![Upload Python Package](https://github.com/Rishit-dagli/TF-Watcher/actions/workflows/python-publish.yml/badge.svg)](https://github.com/Rishit-dagli/TF-Watcher/actions/workflows/python-publish.yml)
[![Test Python package](https://github.com/Rishit-dagli/TF-Watcher/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/Rishit-dagli/TF-Watcher/actions/workflows/tests.yml)

_**TF Watcher Python Package**_ is built with TensorFlow and Pyrebase (a python wrapper for the Firebase🔥 API). 
Aim of this project is to create new TensorFlow callbacks to easily log the data and write it to Firebase realtime database. 
_Dedicated to all ML Developers with_ ❤️.

[📄 _**Visit the documentation of this project**_](https://rishit-dagli.github.io/TF-Watcher/) to get more information in detail.

## Installation

Run the following to install this package from PyPI:

```sh
pip install tf-watcher
```

This command also installs any other required dependencies if they are not installed.

## Features 👓

- [x] Easy structure
- [x] Support easily logging training, validation or testing metrics
- [x] Write data to Firebase realtime database
- [x] Tests

## About this project 💡

This project contains the following modules:

- [**`firebase_config`**](/firebase_config.py): Defines the Firebase configuration to access the realtime database
- [**`firebase_helpers`**](/firebase_helpers.py): Creates functions to help write data to Firebase realtime database using [_Pyrebase4_](https://github.com/nhorvath/Pyrebase4)
- [**`callbacks`**](/callbacks): This subpackage contains modules to help log data in between your ML training, validation and testing processes with [_TensorFlow_](http://tensorflow.org/)
    - [**`callbacks.epoch`**](/callbacks/epoch.py): Logs and sends data to firebase after every epoch or after every n epochs or using a more granular control
    - [**`callbacks.predict_batch`**](/callbacks/predict_batch.py): Logs and sends data to firebase after every batch in predict method or after every n batches in predict method or using a more granular control
    - [**`callbacks.predict`**](/callbacks/predict.py): Logs and sends data to firebase after the predict method is run
    - [**`callbacks.test_batch`**](/callbacks/test_batch.py): Logs and sends data to firebase after every batch in evaluate method or after every n batches in evaluate method or using a more granular control
    - [**`callbacks.train_batch`**](/callbacks/train_batch.py): Logs and sends data to firebase after every training batch in fit method or after every n training batch in fit method or using a more granular control

## Development Setup 🖥️

You will require Python 3.5 or above and pip 19.0 or aboce (or >20.3 for macOS) to be able to develop the package. Download Python from [here](https://www.python.org/downloads/) and pip from [here](https://pip.pypa.io/en/stable/installation/).

To install `tfwatcher`, along with the dependencies you need to develop and test, run the following in your virtualenv:

```sh
git clone https://github.com/Rishit-dagli/TF-Watcher.git
# or clone your own fork

cd TF-Watcher
pip install -e .[dev]
```

## Built with 🛠

- [Python](https://www.python.org/) - A programming language that lets you work quickly and integrate systems more effectively, used quite a lot for ML development
- [pip](https://pip.pypa.io/en/stable/) - Package installer for Python, allows easily packaging and deploying
- [TensorFlow](https://www.tensorflow.org/) - An end-to-end open source machine learning platform
  - [Keras](https://keras.io/) - High level TensorFlow API
  - [callbacks](https://www.tensorflow.org/api_docs/python/tf/keras/callbacks) - Utilities called at certain points during model training
- [Firebase](https://firebase.google.com/) - Accelerate and scale app development with fully managed backend infrastructure
  - [Realtime Database](https://firebase.google.com/products/realtime-database) - Cloud-hosted NoSQL database to store and sync dataa in rwaltime
  - [Authentication](https://firebase.google.com/products/auth) - Simple, free multi-platform sign-in
- [Pyrebase4](https://github.com/nhorvath/Pyrebase4) - A simple python wrapper for the Firebase API
- [Sphinx](https://www.sphinx-doc.org/en/master/) - Create intelligent and beautiful documentation
- [Read The Docs](https://readthedocs.org/) - Simplifies software documentation by automating building, versioning, and hosting docs
