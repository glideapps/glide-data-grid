const { build } = require("esbuild");
const linaria = require("@linaria/esbuild/lib/index").default;
const { dependencies } = require("./package.json");

const shared = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: true,
    plugins: [
        linaria({
            sourceMap: true,
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
        outfile: "dist/js/index.js",
        format: "esm",
    });

    fs.copyFileSync("dist/js/index.css", "dist/index.css");
    fs.rmSync("dist/js/index.css");
    fs.rmSync("dist/cjs/index.css");
}

f();
