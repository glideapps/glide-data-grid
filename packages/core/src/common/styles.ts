import baseStyled, { ThemedStyledInterface } from "styled-components";

export interface Theme {
    accentColor: string;
    accentFg: string;
    accentLight: string;

    textDark: string;
    textMedium: string;
    textLight: string;
    textBubble: string;

    bgIconHeader: string;
    fgIconHeader: string;
    textHeader: string;
    textGroupHeader?: string;
    textHeaderSelected: string;

    bgCell: string;
    bgCellMedium: string;
    bgHeader: string;
    bgHeaderHasFocus: string;
    bgHeaderHovered: string;

    bgBubble: string;
    bgBubbleSelected: string;

    bgSearchResult: string;

    borderColor: string;
    horizontalBorderColor?: string;
    drilldownBorder: string;

    linkColor: string;

    cellHorizontalPadding: number;
    cellVerticalPadding: number;

    headerFontStyle: string;
    baseFontStyle: string;
    fontFamily: string;
    editorFontSize: string;
    lineHeight: number;
}

const dataEditorBaseTheme: Theme = {
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
    textGroupHeader: "#313139BB",
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
    editorFontSize: "13px",
    lineHeight: 1.4, //unitless scaler depends on your font
};

export const styled = baseStyled as ThemedStyledInterface<Theme>;

export function getDataEditorTheme(): Theme {
    return dataEditorBaseTheme;
}
