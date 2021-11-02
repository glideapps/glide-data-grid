#!/bin/bash

set -e

VERSION=`jq '.version' package.json`
npm install

pushd core
npm ci
jq ".version = $VERSION" package.json > package.json.tmp
mv package.json.tmp package.json
popd


pushd cells
jq ".dependencies.\"@glideapps/glide-data-grid\" = $VERSION" package.json > package.json.tmp
jq ".version = $VERSION" package.json.tmp > package.json
rm package.json.tmp
npm ci
rm -rf node_modules/@glideapps/glide-data-grid
ln -s ../../../core node_modules/@glideapps/glide-data-grid
popd