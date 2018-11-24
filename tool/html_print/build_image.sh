#!/bin/bash
set -eu
IMAGE_NAME=thermal-printer/tool/html_print
cd -- `dirname -- $0`
docker build \
  --tag ${IMAGE_NAME} \
  .
