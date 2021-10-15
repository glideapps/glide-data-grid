import baseStyled, { ThemedStyledInterface } from "styled-components";

const builderThemeBase = {
    overlayName: "LightTheme",

    accentColor: "#4F5DFF",
    accentMedium: "rgba(79,118,255,0.5)",
    accentLight: "rgba(79, 93, 255, 0.1)",

    textDark: "#313139",
    textMedium: "#737383",
    textLight: "#B2B2C0",
    textHeader: "#737383",
    textHeaderSelected: "#FFFFFF",
    textBubble: "#313139",

    bgCell: "#FFFFFF",
    bgCellMedium: "#FAFAFB",
    bgHeader: "#EDEDF3",
    bgHeaderHasFocus: "#D8D8E3",

    bgBubble: "#EDEDF3",
    bgBubbleSelected: "#FFFFFF",

    bgSearchResult: "#fff9e3",

    borderColor: "rgba(45,45,45,0.16)",
    borderDark: "rgba(0, 0, 0, 0)",

    linkColor: "#4F5DFF",

    headerFontStyle: "bold 14px",
    baseFontStyle: "13px",
    fontFamily:
        "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
};

export type Theme = typeof builderThemeBase;

export const styled = baseStyled as ThemedStyledInterface<Theme>;

export function getBuilderTheme(): Theme {
    return builderThemeBase;
}
