#!/bin/bash
set -eu
cd -- `dirname -- $0`
source ./env.sh
TTY_DEVICE_NAME=$(ls /dev/ttyACM* | head -n 1)
docker stop ${CONTAINER_NAME} || true
docker rm   ${CONTAINER_NAME} || true
docker run --detach \
  --publish 3030:8080 \
  --env TTY_DEVICE=${TTY_DEVICE_NAME} \
  --device ${TTY_DEVICE_NAME} \
  --name ${CONTAINER_NAME} \
  ${IMAGE_NAME}
