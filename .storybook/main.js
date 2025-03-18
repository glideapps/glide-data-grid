const path = require("path");

module.exports = {
    stories: ["../**/src/**/*.stories.tsx"],
    addons: [getAbsolutePath("@storybook/addon-storysource"), getAbsolutePath("@storybook/addon-controls")],

    typescript: {
        reactDocgen: false,
    },

    async viteFinal(config) {
        // We need to dynamically import these since they use ESM
        const { mergeConfig } = await import("vite");
        const linaria = (await import("@linaria/vite")).default;

        return mergeConfig(config, {
            plugins: [linaria()],
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
    return path.dirname(require.resolve(path.join(value, "package.json")));
}
