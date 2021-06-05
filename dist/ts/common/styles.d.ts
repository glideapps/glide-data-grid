import { ThemedStyledInterface } from "styled-components";
declare const builderThemeBase: {
    overlayName: string;
    darkGrey: string;
    fgColorDarkest: string;
    fgColorDark: string;
    fgColorMedium: string;
    fgColorLight: string;
    bgColorLight: string;
    borderColor: string;
    bgColorAltLight: string;
    acceptColor: string;
    linkColor: string;
    dataViewer: {
        fgAddButton: string;
        bgColor: string;
        gridColor: string;
        leftMargin: string;
        bgSelected: string;
        bgBubble: string;
        bgBubbleSelected: string;
        bgPrelight: string;
        checkbox: {
            checkedColor: string;
        };
        columnHeader: {
            bgColor: string;
            bgDark: string;
            fgColor: string;
            fgSelected: string;
            bgSelected: string;
            icon: {
                bgColor: string;
                fgColor: string;
                bgColorSelected: string;
                fgColorSelected: string;
                userSpecific: {
                    bgColor: string;
                    fgColor: string;
                    bgColorSelected: string;
                    fgColorSelected: string;
                };
            };
        };
    };
};
export declare type Theme = typeof builderThemeBase;
export declare const styled: ThemedStyledInterface<{
    overlayName: string;
    darkGrey: string;
    fgColorDarkest: string;
    fgColorDark: string;
    fgColorMedium: string;
    fgColorLight: string;
    bgColorLight: string;
    borderColor: string;
    bgColorAltLight: string;
    acceptColor: string;
    linkColor: string;
    dataViewer: {
        fgAddButton: string;
        bgColor: string;
        gridColor: string;
        leftMargin: string;
        bgSelected: string;
        bgBubble: string;
        bgBubbleSelected: string;
        bgPrelight: string;
        checkbox: {
            checkedColor: string;
        };
        columnHeader: {
            bgColor: string;
            bgDark: string;
            fgColor: string;
            fgSelected: string;
            bgSelected: string;
            icon: {
                bgColor: string;
                fgColor: string;
                bgColorSelected: string;
                fgColorSelected: string;
                userSpecific: {
                    bgColor: string;
                    fgColor: string;
                    bgColorSelected: string;
                    fgColorSelected: string;
                };
            };
        };
    };
}>;
export declare function getBuilderTheme(): Theme;
export {};
//# sourceMappingURL=styles.d.ts.map