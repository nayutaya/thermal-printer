FROM ubuntu:18.04

RUN apt-get update \
  && apt-get install --yes --no-install-recommends \
    ca-certificates \
    chromium-browser \
    fonts-ipaexfont \
    fonts-ipafont \
    git \
    wget \
  && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/riywo/anyenv ~/.anyenv \
  && echo 'export PATH="${HOME}/.anyenv/bin:${PATH}"' >> ~/.bash_profile \
  && echo 'eval "$(anyenv init -)"' >> ~/.bash_profile

SHELL ["/bin/bash", "--login", "-c"]

RUN apt-get update \
  && apt-get install --yes --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

RUN anyenv install nodenv
RUN nodenv install 10.13.0 \
  && nodenv global 10.13.0
