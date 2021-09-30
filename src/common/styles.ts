import baseStyled, { ThemedStyledInterface } from "styled-components";

// Light theme
const builderThemeBase = {
    overlayName: "LightTheme",
    darkGrey: "#313139",

    fgColorDarkest: "#000000",
    fgColorDark: "#313139",
    fgColorMedium: "#737383",
    fgColorLight: "#B2B2C0",

    bgColorLight: "#FFFFFF",

    borderColor: "rgba(45,45,45,0.16)",

    bgColorAltLight: "#FAFAFB",

    acceptColor: "#4F5DFF",
    b300: "rgba(79,118,255,0.5)",

    linkColor: "#4F5DFF",

    dataViewer: {
        fgAddButton: "#4F5DFF",
        bgColor: "#FFFFFF",
        gridColor: "#FFFFFF",
        leftMargin: "0px",
        bgSelected: "rgba(79, 93, 255, 0.1)",
        bgBubble: "#EDEDF3",
        bgBubbleSelected: "#FFFFFF",
        bgPrelight: "#fff9e3",

        checkbox: {
            checkedColor: "#4F5DFF",
        },
        columnHeader: {
            bgColor: "#EDEDF3",
            bgDark: "#D8D8E3",
            fgColor: "#737383",
            fgSelected: "#FFFFFF",
            bgSelected: "#4F5DFF",

            icon: {
                bgColor: "#313139",
                fgColor: "#FFFFFF",
                bgColorSelected: "#FFFFFF",
                fgColorSelected: "#4F5DFF",

                userSpecific: {
                    bgColor: "#4F5DFF",
                    fgColor: "#FFFFFF",
                    bgColorSelected: "#FFFFFF",
                    fgColorSelected: "#4F5DFF",
                },
            },
        },
    },
};

export type Theme = typeof builderThemeBase;

export const styled = baseStyled as ThemedStyledInterface<Theme>;

export function getBuilderTheme(): Theme {
    return builderThemeBase;
}
