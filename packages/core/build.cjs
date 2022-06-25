const { build } = require("esbuild");
const { dependencies, peerDependencies } = require("./package.json");

const shared = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: true,
    external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};

build({
    ...shared,
    outfile: "dist/cjs/index.js",
});

build({
    ...shared,
    outfile: "dist/js/index.js",
    format: "esm",
});
