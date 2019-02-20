#!/bin/bash
set -eu
cd -- `dirname -- $0`
source ./env.sh
PRINTER_DEVICE=$(ls /dev/ttyACM* | head -n 1)
docker run --interactive --tty --rm \
  --publish 3030:8080 \
  --env PRINTER_TYPE=SERIAL \
  --env PRINTER_DEVICE=${PRINTER_DEVICE} \
  --device ${PRINTER_DEVICE} \
  ${IMAGE_NAME} \
  /bin/bash
