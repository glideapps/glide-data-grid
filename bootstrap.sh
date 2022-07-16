#!/bin/bash

set -e

VERSION=`jq '.version' package.json`
npm install

function update {
    echo $1 $2
    jq --indent 4 "$1" $2 > $2.tmp
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
    update ".dependencies.\"@glideapps/glide-data-grid\" = \"4.99.0-beta2\"" package.json
    npm ci
    update ".dependencies.\"@glideapps/glide-data-grid\" = $VERSION" package.json
    update ".version = $VERSION" package.json
    rm -rf node_modules/@glideapps/glide-data-grid/*
    ln -s ../../../../core/dist node_modules/@glideapps/glide-data-grid/dist
    ln -s ../../../../core/package.json node_modules/@glideapps/glide-data-grid/package.json
    popd
done