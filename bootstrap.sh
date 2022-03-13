#!/bin/bash

set -e

VERSION=`jq '.version' package.json`
npm install

function update {
    echo $1 $2
    jq "$1" $2 > $2.tmp
    mv $2.tmp $2
}

pushd packages/core
npm ci
update ".version = $VERSION" package.json
npm run build
popd


for DIR in "cells" "source"
do
    pushd packages/$DIR
    update ".dependencies.\"@glideapps/glide-data-grid\" = \"3.1.0-beta5\"" package.json
    npm ci
    update ".dependencies.\"@glideapps/glide-data-grid\" = $VERSION" package.json
    update ".version = $VERSION" package.json
    rm -rf node_modules/@glideapps/glide-data-grid
    ln -s ../../../core node_modules/@glideapps/glide-data-grid
    popd
done