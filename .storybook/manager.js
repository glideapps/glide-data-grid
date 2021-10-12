import { addons } from "@storybook/addons";
import { themes, create } from "@storybook/theming";

const glideTheme = create({
    base: "dark",
    brandTitle: "Glide Data Grid",
    brandUrl: "https://grid.glideapps.com.com",
    brandImage:
        "https://res.cloudinary.com/glide/image/upload/c_fill,g_auto,r_max,w_40/v1634012666/glidehq/a1026e6c1993c4e3e334d2f1c36591dfb8a7a729.png",
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
        collapsedRoots: ["Subcomponents"],
    },
    toolbar: {
        title: { hidden: false },
        zoom: { hidden: false },
        eject: { hidden: false },
        copy: { hidden: false },
        fullscreen: { hidden: false },
    },
});
