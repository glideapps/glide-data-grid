#!/bin/bash
set -em
source ../../config/build-util.sh

ensure_bash_4

shopt -s globstar

echo -e "\033[0;36m🏗️ Building Glide Data Grid 🏗️\033[0m"

compile_esm() {
    compile esm true
}

compile_cjs() {
    compile cjs false
}

run_in_parallel compile_esm compile_cjs

generate_index_css

echo -e "\033[0;36m🎉 Core Build Complete 🎉\033[0m"