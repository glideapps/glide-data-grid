import { addParameters } from "@storybook/react";

addParameters({
    options: {
        showRoots: true,
        storySort: (a, b) => {
            return a[1].name.localeCompare(b[1].name, undefined, { numeric: true });
        },
    },
});

export const parameters = {
    layout: "fullscreen",
};
