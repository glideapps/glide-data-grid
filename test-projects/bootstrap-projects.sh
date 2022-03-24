#!/bin/bash

pushd next-gdg
rm -rf node_modules/@glideapps/glide-data-grid/dist
cp -r ../../packages/core/dist node_modules/@glideapps/glide-data-grid/dist
popd