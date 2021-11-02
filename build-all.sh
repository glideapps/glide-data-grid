#!/bin/bash

set -e

for DIR in core cells
do
    pushd $DIR
    npm run lint && npm run build
    popd $DIR
done