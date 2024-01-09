const { dirname, join } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin");

module.exports = {
    stories: ["../**/src/**/*.stories.tsx"],
    addons: ["@storybook/addon-storysource", getAbsolutePath("@storybook/addon-controls")],

    typescript: {
        reactDocgen: false,
    },

    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.
        // Check docs here: https://storybook.js.org/docs/react/configure/webpack#extending-storybooks-webpack-config

        config.plugins.push(new MiniCssExtractPlugin({ filename: "[name].css" }));

        // Add Linaria loader after babel-loader
        config.module.rules.splice(1, 0, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: require.resolve("@linaria/webpack-loader"),
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        });

        config.optimization.minimize = false;
        config.devtool = "source-map";
        config.resolve.plugins = [new ResolveTypeScriptPlugin()];

        return config;
    },

    framework: {
        name: getAbsolutePath("@storybook/react-webpack5"),
        options: {},
    },

    docs: {
        autodocs: false,
    },
};

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}
