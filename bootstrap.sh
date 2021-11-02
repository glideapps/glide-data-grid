#!/bin/bash

set -e

npm install

pushd core
npm ci
popd

VERSION=`jq '.version' core/package.json`

pushd cells
npm ci
jq ".dependencies.\"@glideapps/glide-data-grid\" = $VERSION" package.json > package.json.tmp
mv package.json.tmp package.json
rm -rf node_modules/@glideapps/glide-data-grid
ln -s ../../../core/src node_modules/@glideapps/glide-data-grid
popd