#!/bin/bash
set -eu
IMAGE_NAME=${USER}/thermal-printer/tool/print
cd -- `dirname -- $0`
docker build \
  --tag ${IMAGE_NAME} \
  .
