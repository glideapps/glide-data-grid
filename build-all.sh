#!/bin/bash

set -e

for DIR in "core" "cells" "source"
do
    pushd packages/$DIR
    npm run lint && npm run build
    popd
done