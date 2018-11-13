#!/bin/bash
set -eu
IMAGE_NAME=thermal-printer/service/rendering
CONTAINER_NAME=thermal-printer_service_rendering
docker stop ${CONTAINER_NAME} || true
docker rm   ${CONTAINER_NAME} || true
docker run --detach \
  --publish 3031:8080 \
  --name ${CONTAINER_NAME} \
  ${IMAGE_NAME}
