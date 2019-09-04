#!/bin/bash
set -eu
IMAGE_NAME=thermal-printer/tool/html_print
cd -- `dirname -- $0`
docker image build --pull \
  --tag ${IMAGE_NAME} \
  .
