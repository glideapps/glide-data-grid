#!/bin/bash

set -e

function update {
    echo $1 $2
    jq --indent 4 "$1" $2 > $2.tmp
    mv $2.tmp $2
}

CUR_VERSION=`jq ".version" package.json`
VERSION=${1:-$CUR_VERSION}

if [[ ${VERSION::1} != "\"" ]]
then
  VERSION="\"$VERSION\""
fi

update ".version = $VERSION" package.json

for DIR in "cells" "source" "core"
do
    pushd packages/$DIR
    update ".version = $VERSION" package.json
    popd
done

for DIR in "cells" "source"
do
    pushd packages/$DIR
    update ".dependencies.\"@glideapps/glide-data-grid\" = $VERSION" package.json
    popd
done