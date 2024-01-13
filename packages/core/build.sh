#!/bin/bash
set -em
source ../../config/build-util.sh

ensure_bash_4

shopt -s globstar

## Delete the dist folder
rm -rf dist

compile_esm() {
    tsc -p tsconfig.esm.json
    linaria -r dist/esm/ -m esnext -o dist/esm/ dist/esm/**/*.js -t -i dist/esm -c ../../config/linaria.json    
    remove_all_css_imports dist/esm
}

compile_cjs() {
    tsc -p tsconfig.cjs.json
    linaria -r dist/cjs/ -m commonjs -o dist/cjs/ dist/cjs/**/*.js -t -i dist/cjs -c ../../config/linaria.json
    remove_all_css_imports dist/cjs
}

run_in_parallel compile_esm compile_cjs

generate_index_css