FROM node:12.9

RUN npm install --global serve

COPY app/ /root/app/
RUN cd /root/app/ \
  && npm install \
  && npm run build

EXPOSE 8080
CMD ["serve", "--single", "--listen=tcp://0.0.0.0:8080", "/root/app/build/"]
