export default {
    preset: "ts-jest/presets/default-esm",
    roots: ["<rootDir>/"],
    testEnvironment: "jsdom",
    moduleDirectories: ["node_modules", "../node_modules"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    transform: {
        "^.+\\.(ts|tsx)?$": ["ts-jest", { isolatedModules: true, useESM: true }],
        "^.+\\.(js|jsx)$": "babel-jest",
    },
};
