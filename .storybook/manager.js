import { addons } from "@storybook/addons";
import { themes, create } from "@storybook/theming";

const glideTheme = create({
    base: "dark",
    brandTitle: "Glide Data Grid",
});

addons.setConfig({
    isFullscreen: false,
    showNav: true,
    showPanel: false,
    panelPosition: "bottom",
    enableShortcuts: true,
    isToolshown: false,
    theme: glideTheme,
    selectedPanel: undefined,
    initialActive: "sidebar",
    sidebar: {
        showRoots: true,
        collapsedRoots: ["Subcomponents", "TestCases"],
    },
    toolbar: {
        title: { hidden: false },
        zoom: { hidden: false },
        eject: { hidden: false },
        copy: { hidden: false },
        fullscreen: { hidden: false },
    },
});
