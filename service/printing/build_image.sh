#!/bin/bash
set -eu
cd -- `dirname -- $0`
source ./env.sh
docker build \
  --tag ${IMAGE_NAME} \
  .
