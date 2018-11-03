#!/bin/bash
set -eu
IMAGE_NAME=${USER}/thermal-printer/tool/print
TTY_DEVICE_NAME=$(ls /dev/ttyACM* | head -n 1)
docker run --interactive --tty --rm \
  --device ${TTY_DEVICE_NAME} \
  ${IMAGE_NAME} \
  /bin/bash
