#!/bin/bash
set -em
source ../../config/build-util.sh

ensure_bash_4

shopt -s globstar

## Delete the dist folder
# rm -rf dist

echo -e "\033[0;36m🏗️ Building Glide Data Grid 🏗️\033[0m"

compile() {
    tsc -p tsconfig.$1.json --outdir ./dist/$1-tmp --declarationDir ./dist/dts-tmp
    linaria -r dist/$1-tmp/ -m esnext -o dist/$1-tmp/ dist/$1-tmp/**/*.js -t -i dist/$1-tmp -c ../../config/linaria.json > /dev/null
    remove_all_css_imports dist/$1-tmp

    # replace dist/$1 (if it exists) with dist/$1-tmp
    if [ -d "dist/$1" ]; then
        mv dist/$1 dist/$1-remove
        rm -rf dist/$1-remove &
    fi
    mv dist/$1-tmp dist/$1

    

    # if it's esm, move the dts folder
    if [ "$2" = true ]; then
        if [ -d "dist/dts" ]; then
            mv dist/dts dist/dts-remove
            rm -rf dist/dts-remove &
        fi
        mv dist/dts-tmp dist/dts
    fi

    rm dist/tsconfig.$1.tsbuildinfo
}

compile_esm() {
    compile esm true
}

compile_cjs() {
    compile cjs false
}

run_in_parallel compile_esm compile_cjs

generate_index_css

echo -e "\033[0;36m🎉 Core Build Complete 🎉\033[0m"