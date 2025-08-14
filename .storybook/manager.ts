import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const glideTheme = create({
    base: "dark",
    brandTitle: "Glide Data Grid",
    brandUrl: "https://grid.glideapps.com",
    brandImage: "https://res.cloudinary.com/glide/image/upload/c_scale,w_45/v1634058004/glidehq/glide-transparent.png",
});

addons.setConfig({
    isFullscreen: false,
    showNav: true,
    showPanel: false,
    panelPosition: "right",
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
