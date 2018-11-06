#!/bin/bash
set -eu
IMAGE_NAME=thermal-printer/service/printing
TTY_DEVICE_NAME=$(ls /dev/ttyACM* | head -n 1)
docker run --interactive --tty --rm \
  --publish 8080:8080 \
  --device ${TTY_DEVICE_NAME}:/dev/ttyPRINTER \
  ${IMAGE_NAME} \
  /bin/bash
