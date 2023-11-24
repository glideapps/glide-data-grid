#!/bin/bash
set -em
source ../../config/build-util.sh

ensure_bash_4

shopt -s globstar

## Delete the dist folder
rm -rf dist

compile_esm() {
  tsc -p tsconfig.esm.json
}

compile_cjs() {
  tsc -p tsconfig.cjs.json
}

run_in_parallel compile_esm compile_cjs
