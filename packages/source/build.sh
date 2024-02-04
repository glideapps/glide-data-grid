#!/bin/bash
set -em
source ../../config/build-util.sh

ensure_bash_4

shopt -s globstar

## Delete the dist folder
rm -rf dist

echo -e "\033[0;36m🏗️ Building Glide Data Grid Source 🏗️\033[0m"

compile_esm() {
  tsc -p tsconfig.esm.json
}

compile_cjs() {
  tsc -p tsconfig.cjs.json
}

run_in_parallel compile_esm compile_cjs

echo -e "\033[0;36m🎉 Source Build Complete 🎉\033[0m"
