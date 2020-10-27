import { addParameters } from "@storybook/react";

addParameters({
    options: {
        showRoots: true,
        storySort: (a, b) => a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    },
});
