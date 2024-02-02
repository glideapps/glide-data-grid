const { dirname, join } = require("path");
const linaria = require("@linaria/vite");
const vite = require("vite");

const mergeConfig = vite.mergeConfig;

module.exports = {
    stories: ["../**/src/**/*.stories.tsx"],
    addons: ["@storybook/addon-storysource", getAbsolutePath("@storybook/addon-controls")],
    core: {
        builder: "@storybook/builder-vite",
    },

    typescript: {
        reactDocgen: false,
    },

    async viteFinal(config) {
        return mergeConfig(config, {
            plugins: [linaria.default()],
        });
    },

    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {},
    },

    docs: {
        autodocs: false,
    },
};

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}
