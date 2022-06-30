const { build } = require("esbuild");
const linaria = require("@linaria/esbuild/lib/index").default;
const { dependencies, peerDependencies } = require("./package.json");
const fs = require("fs");

const shared = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: false,
    target: "esnext",
    plugins: [
        linaria({
            sourceMap: false,
        }),
    ],
    external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};

async function f() {
    await build({
        ...shared,
        outfile: "dist/cjs/index.js",
        format: "cjs",
    });

    await build({
        ...shared,
        outfile: "dist/js/index.js",
        format: "esm",
    });

    fs.copyFileSync("dist/js/index.css", "dist/index.css");
    fs.rmSync("dist/js/index.css");
    fs.rmSync("dist/cjs/index.css");
}

f();
