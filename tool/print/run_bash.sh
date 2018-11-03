#!/bin/bash
set -eu
IMAGE_NAME=${USER}/thermal-printer/tool/print
docker run --interactive --tty --rm \
  --device $1 \
  ${IMAGE_NAME} \
  /bin/bash
