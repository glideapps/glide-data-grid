import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import { defineConfig, type Plugin } from "vite";

function resolveCoreJsImports(): Plugin {
    return {
        name: "resolve-core-js-imports",
        enforce: "pre",
        resolveId(source, importer) {
            if (importer === undefined || !source.startsWith(".") || !source.endsWith(".js")) {
                return null;
            }

            const normalizedImporter = importer.replace(/\\/g, "/");
            if (!normalizedImporter.includes("/packages/core/src/")) {
                return null;
            }

            const unresolvedPath = source.slice(0, -3);
            const basePath = path.resolve(path.dirname(importer), unresolvedPath);
            const candidates = [
                `${basePath}.ts`,
                `${basePath}.tsx`,
                `${basePath}.js`,
                path.join(basePath, "index.ts"),
                path.join(basePath, "index.tsx"),
                path.join(basePath, "index.js"),
            ];

            const resolved = candidates.find(candidate => fs.existsSync(candidate));
            return resolved ?? null;
        },
    };
}

export default defineConfig({
    plugins: [
        resolveCoreJsImports(),
        wyw({
            include: [/packages[\\/]core[\\/]src[\\/].*\.[cm]?[jt]sx?$/, /preview_grid[\\/]src[\\/].*\.[cm]?[jt]sx?$/],
            babelOptions: {
                assumptions: {
                    setPublicClassFields: true,
                    setSpreadProperties: true,
                },
                sourceType: "unambiguous",
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            modules: false,
                            targets: {
                                firefox: "60",
                                chrome: "67",
                                safari: "12.1",
                            },
                            exclude: ["@babel/plugin-transform-template-literals"],
                        },
                    ],
                    "@babel/preset-react",
                    "@babel/preset-typescript",
                    "@wyw-in-js/babel-preset",
                ],
                plugins: ["@babel/plugin-proposal-class-properties"],
            },
        }),
        react({
            fastRefresh: false,
        }),
    ],
    resolve: {
        alias: {
            "@glide-data-grid-local": path.resolve(__dirname, "../packages/core/src/index.ts"),
        },
    },
    server: {
        port: 5174,
    },
});
