export default {
    preset: "ts-jest",
    roots: ["<rootDir>/"],
    testEnvironment: "jsdom",
    moduleDirectories: ["node_modules", "../node_modules"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testPathIgnorePatterns: ["/node_modules/", "/ts-build/"],
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
    },
};
