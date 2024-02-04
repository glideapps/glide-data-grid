import { dirname, join } from "path";
import linaria from "@linaria/vite";
import { mergeConfig } from "vite";

export default {
    stories: ["../**/src/**/*.stories.tsx"],
    addons: [getAbsolutePath("@storybook/addon-storysource"), getAbsolutePath("@storybook/addon-controls")],

    typescript: {
        reactDocgen: false,
    },

    async viteFinal(config) {
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
    return dirname(require.resolve(join(value, "package.json")));
}
