#!/bin/bash
set -eu
cd -- `dirname -- $0`
source ./env.sh
docker image build --pull \
  --tag ${IMAGE_NAME} \
  .
