const { build } = require("esbuild");
const linaria = require("@linaria/esbuild/lib/index").default;
const { dependencies } = require("./package.json");
const fs = require("fs");

const shared = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: false,
    target: "es2018",
    plugins: [
        linaria({
            sourceMap: false,
        }),
    ],
    external: Object.keys(dependencies),
};

async function f() {
    await build({
        ...shared,
        outfile: "dist/cjs/index.js",
        format: "cjs",
    });

    await build({
        ...shared,
        splitting: true,
        outdir: "dist/js",
        format: "esm",
    });

    fs.copyFileSync("dist/js/index.css", "dist/index.css");
    fs.rmSync("dist/js/index.css");
    fs.rmSync("dist/cjs/index.css");
}

f();
