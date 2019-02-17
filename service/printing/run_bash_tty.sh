#!/bin/bash
set -eu
cd -- `dirname -- $0`
source ./env.sh
TTY_DEVICE_NAME=$(ls /dev/ttyACM* | head -n 1)
docker run --interactive --tty --rm \
  --publish 3030:8080 \
  --env TTY_DEVICE=${TTY_DEVICE_NAME} \
  --device ${TTY_DEVICE_NAME} \
  ${IMAGE_NAME} \
  /bin/bash
