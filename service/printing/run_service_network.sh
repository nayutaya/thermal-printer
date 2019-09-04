#!/bin/bash
set -eu
cd -- `dirname -- $0`
source ./env.sh
docker container stop ${CONTAINER_NAME} || true
docker container rm   ${CONTAINER_NAME} || true
docker container run --detach \
  --publish 3030:8080 \
  --env PRINTER_TYPE=NETWORK \
  --env PRINTER_HOST \
  --env PRINTER_PORT \
  --name ${CONTAINER_NAME} \
  ${IMAGE_NAME}
