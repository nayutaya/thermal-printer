#!/bin/bash
set -eu
IMAGE_NAME=thermal-printer/service/printing
cd -- `dirname -- $0`
docker build \
  --tag ${IMAGE_NAME} \
  .
