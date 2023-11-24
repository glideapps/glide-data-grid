#!/bin/bash

set -e

for DIR in "next-gdg" "cra5-gdg"
do
    pushd $DIR
    npm ci
    rm -rf node_modules/@glideapps/glide-data-grid
    ln -s ../../../../packages/core/ node_modules/@glideapps/glide-data-grid
    popd
done