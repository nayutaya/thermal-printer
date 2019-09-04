#!/bin/bash
set -eu
IMAGE_NAME=thermal-printer/tool/html_print
cd -- `dirname -- ${0}`
docker container run --interactive --tty --rm \
  --publish 3032:8080 \
  --volume $(pwd):/workspace \
  ${IMAGE_NAME} \
  /bin/bash
