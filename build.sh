#!/bin/bash
set -e

if [[ -d "node_modules-1/" ]]
then
    echo "moving old modules in place"
    mv node_modules-1 node_modules
else
    npm ci
fi

npm run build

echo "moving modules to -1"
mv node_modules node_modules-1