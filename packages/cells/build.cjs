const { build } = require('esbuild');
const glob = require('glob');
const linaria = require('@linaria/esbuild/lib/index').default;
const { dependencies, peerDependencies } = require('./package.json');
const fs = require('fs');

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: false,
  target: 'es2018',
  plugins: [
    linaria({
      sourceMap: false,
    }),
  ],
  external: Object.keys(dependencies).concat(['react', 'react-dom', 'styled-components']),
};

async function f() {
  await build({
    ...shared,
    outfile: 'dist/cjs/index.js',
    format: 'cjs',
  });

  await build({
    ...shared,
    splitting: true,
    outdir: 'dist/js',
    format: 'esm',
  });

  fs.copyFileSync('dist/cjs/index.css', 'dist/index.css');
  glob('dist/js/*.css', {}, function (_er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
    files.forEach((f) => fs.rmSync(f));
  });
  fs.rmSync('dist/cjs/index.css');
}

f();
