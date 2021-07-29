from setuptools import setup

exec(open("tfwatcher/version.py").read())

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name="tf-watcher",
    version=__version__,
    description="Monitor your TensorFlow model training on mobile devices, especially for Google Colab",
    packages=["tfwatcher"],
    long_description=long_description,
    long_description_content_type="text/markdown",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "License :: OSI Approved :: Apache Software License",
        "Intended Audience :: Developers",
        "Intended Audience :: Education",
        "Intended Audience :: Science/Research",
        "Topic :: Scientific/Engineering",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "Topic :: Software Development",
        "Topic :: Software Development :: Libraries",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    url="https://github.com/Rishit-dagli/TF-Watcher/",
    author="Rishit Dagli",
    author_email="rishit.dagli@gmail.com",
    install_requires=[
        "tensorflow >= 2.2.0",
    ],
    extras_require={
        "dev": ["check-manifest", "twine", "numpy", "black"],
    },
)
