#!/bin/bash
set -eu
IMAGE_NAME=thermal-printer/service/printing
docker run --interactive --tty --rm \
  --publish 8080:8080 \
  ${IMAGE_NAME} \
  /bin/bash
