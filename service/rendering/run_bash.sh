#!/bin/bash
set -eu
IMAGE_NAME=thermal-printer/service/rendering
docker container run --interactive --tty --rm \
  --publish 3031:8080 \
  ${IMAGE_NAME} \
  /bin/bash
