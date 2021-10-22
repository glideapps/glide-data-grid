import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

const pkg = require("./package.json");

const libraryName = "index";

export default {
    input: `src/${libraryName}.ts`,
    output: {
        dir: "dist/js/",
        sourcemap: true,
        file: pkg.module,
        format: "es",
    },
    external: [
        "direction",
        "lodash",
        "marked",
        "react-responsive-carousel",
        "react",
        "react-dom",
        "styled-components",
        "copy-to-clipboard",
        "react-number-format",
        "react-virtualized-auto-sizer",
    ],
    watch: {
        include: "src/**",
    },
    plugins: [
        json(),
        typescript({ useTsconfigDeclarationDir: true, tsconfig: "./tsconfig.json" }),
        commonjs(),
        resolve(),
        terser({
            output: {
                comments: false,
            },
        }),
        sourceMaps(),
        babel({ babelHelpers: "bundled" }),
    ],
};
