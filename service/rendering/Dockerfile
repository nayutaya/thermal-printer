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

RUN git clone --branch v1.0.1 --depth 1 https://github.com/riywo/anyenv ~/.anyenv \
  && echo 'export PATH="${HOME}/.anyenv/bin:${PATH}"' >> ~/.bash_profile \
  && echo 'eval "$(anyenv init -)"' >> ~/.bash_profile

SHELL ["/bin/bash", "--login", "-c"]

RUN anyenv install --force-init \
  && anyenv install nodenv
RUN nodenv install 10.13.0 \
  && nodenv global 10.13.0

COPY package.json /root/
COPY package-lock.json /root/
RUN cd /root/ \
  && npm install

COPY src/ /root/src/

EXPOSE 8080
WORKDIR /root/
ENTRYPOINT ["/bin/bash", "--login", "-c"]
CMD ["npm start"]
