#!/bin/bash
set -eu
IMAGE_NAME=thermal-printer/service/rendering
cd -- `dirname -- $0`
docker build \
  --tag ${IMAGE_NAME} \
  .
