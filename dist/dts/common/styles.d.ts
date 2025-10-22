import React from "react";
/** @category Theme */
export declare function makeCSSStyle(theme: Theme): Record<string, string>;
/** @category Theme */
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
    bgGroupHeader?: string;
    bgGroupHeaderHovered?: string;
    textHeaderSelected: string;
    bgCell: string;
    bgCellMedium: string;
    bgHeader: string;
    bgHeaderHasFocus: string;
    bgHeaderHovered: string;
    bgBubble: string;
    bgBubbleSelected: string;
    bubbleHeight: number;
    bubblePadding: number;
    bubbleMargin: number;
    bgSearchResult: string;
    borderColor: string;
    drilldownBorder: string;
    linkColor: string;
    cellHorizontalPadding: number;
    cellVerticalPadding: number;
    headerFontStyle: string;
    headerIconSize: number;
    baseFontStyle: string;
    markerFontStyle: string;
    fontFamily: string;
    editorFontSize: string;
    lineHeight: number;
    checkboxMaxSize: number;
    resizeIndicatorColor?: string;
    horizontalBorderColor?: string;
    headerBottomBorderColor?: string;
    roundingRadius?: number;
    rowMarkerIcon?: string;
}
export interface FullTheme extends Theme {
    headerFontFull: string;
    baseFontFull: string;
    markerFontFull: string;
}
/** @category Theme */
export declare function getDataEditorTheme(): Theme;
/** @category Theme */
export declare const ThemeContext: React.Context<Theme>;
/** @category Hooks */
export declare function useTheme(): Theme;
export declare function mergeAndRealizeTheme(theme: Theme, ...overlays: Partial<Theme | undefined>[]): FullTheme;
//# sourceMappingURL=styles.d.ts.map