FROM node:9.11-jessie

RUN apt-get update \
  && apt-get install --yes --no-install-recommends \
    fontconfig \
    fonts-ipaexfont \
    fonts-ipafont \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libgtk2.0-0 \
    libnss3 \
    libx11-xcb-dev \
    libxcomposite1 \
    libxss1 \
    libxtst6 \
  && rm -rf /var/lib/apt/lists/*

COPY package.json /root/
COPY package-lock.json /root/
RUN cd /root/ \
  && npm install

#COPY src/ /root/src/
#
#EXPOSE 8080
#WORKDIR /root/
#CMD ["npm", "start"]
