Introduction
============

TF Watcher is a simple to use Python package and web app which allows you to easily 
monitor your model training or testing process on mobile devices. We built this to 
specially support easily monitoring training or testing in Google Colab or Kaggle 
though this can pretty much be used on any machine or remote server.

.. seealso::

    Checkout this quickstart example which you can run directly on Google Colab to get 
    started with using this package: `Quickstart Example <todo link>`_

To make this super easy to use and easily merge in with your development workflow we 
make use of
`TensorFlow's Callbacks <https://www.tensorflow.org/api_docs/python/tf/keras/callbacks>`_
which allow us to easily call our code at certain points during model training. This 
package then accumalates the training data and sends it to Firebase Realtime database 
allowing you to easily monitor and share live logs from anywhere through the web app.