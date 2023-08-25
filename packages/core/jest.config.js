export default {
    preset: "ts-jest",
    roots: ["<rootDir>/"],
    testEnvironment: "jsdom",
    moduleDirectories: ["node_modules", "../node_modules"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    transform: {
        "^.+\\.(ts|tsx)?$": ["ts-jest", { isolatedModules: true, useESM: true }],
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    globals: {
        __PATH_PREFIX__: ``,
        "ts-jest": {
            babelConfig: {
                presets: [
                    ["@babel/preset-env", { targets: { node: "current" } }],
                    "@babel/preset-react",
                    ["@linaria/babel-preset", { evaluate: true, displayName: true }],
                ],
            },
        },
    },
};
