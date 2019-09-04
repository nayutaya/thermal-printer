#!/bin/bash
set -eu
cd -- `dirname -- $0`
source ./env.sh
PRINTER_DEVICE=$(ls /dev/ttyACM* | head -n 1)
docker container stop ${CONTAINER_NAME} || true
docker container rm   ${CONTAINER_NAME} || true
docker container run --detach \
  --publish 3030:8080 \
  --env PRINTER_TYPE=SERIAL \
  --env PRINTER_DEVICE=${PRINTER_DEVICE} \
  --device ${PRINTER_DEVICE} \
  --name ${CONTAINER_NAME} \
  ${IMAGE_NAME}
