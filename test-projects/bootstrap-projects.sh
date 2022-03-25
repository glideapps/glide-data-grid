#!/bin/bash

set -e

for DIR in "next-gdg" "cra5-gdg" "cra4-gdg"
do
    pushd $DIR
    npm ci
    rm -rf node_modules/@glideapps/glide-data-grid/dist
    cp -r ../../packages/core/dist node_modules/@glideapps/glide-data-grid/dist
    npm run build
    popd
done