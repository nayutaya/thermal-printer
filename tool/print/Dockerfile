FROM ubuntu:18.04

RUN apt-get update \
  && apt-get install --yes --no-install-recommends \
    build-essential \
    libjpeg-dev \
    python3-dev \
    python3-pip \
    python3-setuptools \
    zlib1g-dev \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /root/
RUN pip3 install -r /root/requirements.txt
