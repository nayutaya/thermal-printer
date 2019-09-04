#!/bin/bash
set -eu
cd -- `dirname -- $0`
source ./env.sh
docker container run --interactive --tty --rm \
  --publish 3030:8080 \
  --env PRINTER_TYPE=NETWORK \
  --env PRINTER_HOST \
  --env PRINTER_PORT \
  ${IMAGE_NAME} \
  /bin/bash
