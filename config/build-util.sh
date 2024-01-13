run_in_parallel() {
  local funcs=("$@")
  local pids=()

  # Start the functions in the background and store their PIDs
  for func in "${funcs[@]}"; do
    ($func) &
    pids+=($!)
  done

  # Wait for all functions and exit if any of them fail
  for pid in "${pids[@]}"; do
    wait $pid || exit $?
  done
}

generate_index_css() {
  echo "/* Auto-generated file */" > dist/index.css
  find dist/esm -name '*.css' -print | sed 's/^dist\/esm\//\@import ".\/esm\//' | sed 's/$/";/' >> dist/index.css
}

ensure_bash_4() {
    if [ "${BASH_VERSINFO[0]}" -lt 4 ]; then
        if [ -x "/opt/homebrew/bin/bash" ]; then
            exec /opt/homebrew/bin/bash "$0" "$@"
        elif [ -x "/usr/local/bin/bash" ]; then
            exec /usr/local/bin/bash "$0" "$@"
        else
            echo "Bash 4 or higher is required."
            exit 1
        fi
    fi
}

remove_all_css_imports() {
    local directory=$1
    local sed_cmd="sed -i"

    # Check if sed is GNU sed or BSD sed
    if sed --version 2>/dev/null | grep -q GNU; then
        sed_cmd="sed -i"  # GNU sed
    else
        sed_cmd="sed -i ''"  # BSD sed
    fi

    find "$directory" -type f -name "*.js" -exec bash -c "$sed_cmd \"/require('.\/.*\.css');/d\" {}" \;
    find "$directory" -type f -name "*.js" -exec bash -c "$sed_cmd \"/import \\\".*\.css\\\";/d\" {}" \;
}