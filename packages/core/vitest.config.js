import react from "@vitejs/plugin-react";
import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
    plugins: [react()],
    test: {
        include: ["test/**/*.test.tsx", "test/**/*.test.ts"],
        environment: "jsdom",
        setupFiles: "vitest.setup.js",
        threads: false,
        singleThread: true,
        watch: false,
        clearMocks: true,
        maxConcurrency: 5,
        coverage: {
            reporter: ["text", "lcov"],
        },
        fakeTimers: {
            toFake: [
                ...(configDefaults.fakeTimers.toFake ?? []),
                "performance",
                "requestAnimationFrame",
                "cancelAnimationFrame",
            ],
        },
        deps: {
            optimizer: {
                web: {
                    include: ["vitest-canvas-mock"],
                },
            },
        },
        environmentOptions: {
            jsdom: {
                resources: "usable",
            },
        },
    },
});
