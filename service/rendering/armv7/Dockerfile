FROM ubuntu:18.04

RUN apt-get update \
  && apt-get install --yes --no-install-recommends \
    chromium-browser \
    fonts-ipaexfont \
    fonts-ipafont \
  && rm -rf /var/lib/apt/lists/*
