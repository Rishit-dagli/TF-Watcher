Installation
============

.. image:: https://img.shields.io/pypi/v/tf-watcher
   :target: https://pypi.org/project/tf-watcher

Run the following to install the package from PyPi:

.. code-block:: bash

    pip install tf-watcher

Developing TF watcher
---------------------

You will require Python 3.5 or above and pip 19.0 or aboce (or >20.3 for macOS) to be 
able to develop the package. Download Python from 
`here <https://www.python.org/downloads/>`__ and pip from 
`here <https://pip.pypa.io/en/stable/installation/>`__ .

To install ``tf-watcher``, along with tools you need to develop and test, run the following in your virtualenv:

.. code-block:: bash

    git clone https://github.com/Rishit-dagli/TF-Watcher.git
    # or clone your own fork

    cd TF-Watcher
    pip install -e .[dev]
