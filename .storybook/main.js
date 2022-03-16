const path = require("path");

module.exports = {
    stories: ["../**/*.stories.tsx"],
    addons: ["@storybook/addon-links", "@storybook/addon-controls", "./addons/expand-all/register.js"],
    devtool: "source-map",
    webpackFinal: async (config, { configType }) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve("babel-loader"),
                },
            ],
        });

        config.resolve.extensions.push(".ts", ".tsx");
        config.performance.hints = false;
        return config;
    },
};
