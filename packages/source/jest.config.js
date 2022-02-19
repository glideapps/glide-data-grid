export default {
    preset: "ts-jest",
    roots: ["<rootDir>/"],
    testEnvironment: "jsdom",
    moduleDirectories: ["node_modules", "../node_modules"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    transform: {
        "^.+\\.[t|j]sx?$": ["babel-jest", { configFile: "../../babel.config.json" }],
    },
};
