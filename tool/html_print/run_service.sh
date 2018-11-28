#!/bin/bash
set -eu
IMAGE_NAME=thermal-printer/tool/html_print
CONTAINER_NAME=thermal-printer_tool_html_print
docker stop ${CONTAINER_NAME} || true
docker rm   ${CONTAINER_NAME} || true
docker run --detach \
  --publish 3032:8080 \
  --name ${CONTAINER_NAME} \
  ${IMAGE_NAME}
