const preview = {
    parameters: {
        layout: "fullscreen",
        options: {
            storySort: (a, b) => (a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })),
        },
    },
};

export default preview;
