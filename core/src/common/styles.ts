import baseStyled, { ThemedStyledInterface } from "styled-components";

const dataEditorBaseTheme = {
    accentColor: "#4F5DFF",
    accentFg: "#FFFFFF",
    accentLight: "rgba(62, 116, 253, 0.1)",

    textDark: "#313139",
    textMedium: "#737383",
    textLight: "#B2B2C0",
    textBubble: "#313139",

    bgIconHeader: "#737383",
    fgIconHeader: "#FFFFFF",
    textHeader: "#313139",
    textHeaderSelected: "#FFFFFF",

    bgCell: "#FFFFFF",
    bgCellMedium: "#FAFAFB",
    bgHeader: "#F7F7F8",
    bgHeaderHasFocus: "#E9E9EB",
    bgHeaderHovered: "#EFEFF1",

    bgBubble: "#EDEDF3",
    bgBubbleSelected: "#FFFFFF",

    bgSearchResult: "#fff9e3",

    borderColor: "rgba(115, 116, 131, 0.16)",
    drilldownBorder: "rgba(0, 0, 0, 0)",

    linkColor: "#4F5DFF",

    cellHorizontalPadding: 8,
    cellVerticalPadding: 3,

    headerFontStyle: "600 13px",
    baseFontStyle: "13px",
    fontFamily:
        "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
};

export type Theme = typeof dataEditorBaseTheme;

export const styled = baseStyled as ThemedStyledInterface<Theme>;

export function getDataEditorTheme(): Theme {
    return dataEditorBaseTheme;
}
