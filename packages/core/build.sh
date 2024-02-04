#!/bin/bash
set -em
source ../../config/build-util.sh

ensure_bash_4

shopt -s globstar

## Delete the dist folder
rm -rf dist

echo -e "\033[0;36mBuilding Glide Data Grid\033[0m"

compile_esm() {
    tsc -p tsconfig.esm.json
    linaria -r dist/esm/ -m esnext -o dist/esm/ dist/esm/**/*.js -t -i dist/esm -c ../../config/linaria.json > /dev/null
    remove_all_css_imports dist/esm
}

compile_cjs() {
    tsc -p tsconfig.cjs.json
    linaria -r dist/cjs/ -m commonjs -o dist/cjs/ dist/cjs/**/*.js -t -i dist/cjs -c ../../config/linaria.json > /dev/null
    remove_all_css_imports dist/cjs
}

run_in_parallel compile_esm compile_cjs

generate_index_css

echo -e "\033[0;36mBuild Complete\033[0m"