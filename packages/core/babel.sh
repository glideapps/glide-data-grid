# we want to call babel on dist/esm and dist/cjs so it can run linaria

npx babel dist/esm --out-dir dist/esm-babel --extensions '.js,.jsx' --source-maps --config-file ../../babel.config.json