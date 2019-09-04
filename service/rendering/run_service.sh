#!/bin/bash
set -eu
IMAGE_NAME=thermal-printer/service/rendering
CONTAINER_NAME=thermal-printer_service_rendering
docker container stop ${CONTAINER_NAME} || true
docker container rm   ${CONTAINER_NAME} || true
docker container run --detach \
  --publish 3031:8080 \
  --name ${CONTAINER_NAME} \
  ${IMAGE_NAME}
