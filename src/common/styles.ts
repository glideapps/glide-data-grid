import baseStyled, { ThemedStyledInterface } from "styled-components";

const heavyFontWeight = "bold";
const ultraHeavyFontWeight = "900";

const smallShadow = "0px 3px 4px rgba(0, 0, 0, 0.08)";
const largeShadow = "0px 12px 32px rgba(0, 0, 0, 0.2)";

const hoverTransition = "0.1s";

// Light theme
const builderThemeBase = {
    overlayName: "LightTheme",
    darkGrey: "#313139",

    // kill these
    blue: "#4F5DFF",
    blueDark: "#3F4ACC",
    blueTransparent: "rgba(79, 93, 255, 0.1)",
    bgGreen: "#00CB69",
    // end kill list

    fgColorOpaque: "#313139FF",
    fgColorDarkest: "#000000",
    fgColorDark: "#313139",
    fgColorMedium: "#737383",
    fgColorLight: "#B2B2C0",
    fgColorAccent: "#FFFFFF",

    bgColorLight: "#FFFFFF",
    bgColorLightTransparent: "rgba(255, 255, 255, 0.5)",
    bgColorMedium: "#EDEDF3",
    bgColorAccent: "#313139",
    bgColorAccentTransparent: "rgba(49, 49, 57, 0.95)",
    bgColorDark: "#000000",

    borderColor: "#D8D8E3",
    borderColorLight: "#EDEDF3",

    bgColorAlt: "#F3F3F4",
    bgColorAltLight: "#FAFAFB",

    acceptColor: "#4F5DFF",
    cancelColor: "#EDEDF3",
    destroyColor: "#FF574C",
    errorColor: "_destroyColor",
    warningColor: "#FBBC05",

    heavyFontWeight,
    ultraHeavyFontWeight,

    iconShadow: smallShadow,
    modalShadow: largeShadow,

    linkColor: "#4F5DFF",
    linkHoverConnectColor: "#4F5DFF",

    hoverTransition,

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
            fgColor: "#D8D8E3",
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
        picker: {
            separatorColor: "#D8D8E3",
            bgColor: "#EDEDF3",
            bgSelectedColor: "#313139",
            fgSelectedColor: "#FFFFFF",
        },
    },

   
};

export type Theme = typeof builderThemeBase;

export const styled = baseStyled as ThemedStyledInterface<Theme>;

export function getBuilderTheme(_useDarkTheme: boolean): Theme {
    return builderThemeBase;
}
