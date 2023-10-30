import React from 'react';

// theme variable precidence

/** @category Theme */
export function makeCSSStyle(theme: Theme): Record<string, string> {
  return {
    '--gdg-accent-color': theme.accentColor,
    '--gdg-accent-fg': theme.accentFg,
    '--gdg-accent-light': theme.accentLight,
    '--gdg-text-dark': theme.textDark,
    '--gdg-text-medium': theme.textMedium,
    '--gdg-text-light': theme.textLight,
    '--gdg-text-bubble': theme.textBubble,
    '--gdg-bg-icon-header': theme.bgIconHeader,
    '--gdg-fg-icon-header': theme.fgIconHeader,
    '--gdg-text-header': theme.textHeader,
    '--gdg-text-group-header': theme.textGroupHeader ?? theme.textHeader,
    '--gdg-text-header-selected': theme.textHeaderSelected,
    '--gdg-bg-cell': theme.bgCell,
    '--gdg-bg-cell-medium': theme.bgCellMedium,
    '--gdg-bg-header': theme.bgHeader,
    '--gdg-bg-header-has-focus': theme.bgHeaderHasFocus,
    '--gdg-bg-header-hovered': theme.bgHeaderHovered,
    '--gdg-bg-bubble': theme.bgBubble,
    '--gdg-bg-bubble-selected': theme.bgBubbleSelected,
    '--gdg-bg-search-result': theme.bgSearchResult,
    '--gdg-border-color': theme.borderColor,
    '--gdg-horizontal-border-color': theme.horizontalBorderColor ?? theme.borderColor,
    '--gdg-drilldown-border': theme.drilldownBorder,
    '--gdg-link-color': theme.linkColor,
    '--gdg-cell-horizontal-padding': `${theme.cellHorizontalPadding}px`,
    '--gdg-cell-vertical-padding': `${theme.cellVerticalPadding}px`,
    '--gdg-header-font-style': theme.headerFontStyle,
    '--gdg-base-font-style': theme.baseFontStyle,
    '--gdg-font-family': theme.fontFamily,
    '--gdg-editor-font-size': theme.editorFontSize,
  };
}

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
  textHeaderSelected: string;
  bgCell: string;
  bgCellMedium: string;
  bgHeader: string;
  bgHeaderHasFocus: string;
  /**
   * the background color of row group header
   */
  bgGroup: string;
  rowGroupTitleFontStyle: string;
  rowGroupCountFontStyle: string;
  bgHeaderHovered: string;
  bgBubble: string;
  bgBubbleSelected: string;
  bgSearchResult: string;
  bgSelectedSearchResult: string;
  bgSelectedColumnIcon: string;
  bgSelectedColumnHeader: string;
  bgSelectedCell: string;
  borderColor: string;
  horizontalBorderColor?: string;
  headerBottomBorderColor?: string;
  drilldownBorder: string;
  linkColor: string;
  cellHorizontalPadding: number;
  cellVerticalPadding: number;
  headerFontStyle: string;
  headerIconSize: number;
  baseFontStyle: string;
  fontFamily: string;
  editorFontSize: string;
  lineHeight: number;
  /**
   * the nested group indent is the amount of pixels to indent each nested group
   */
  nestedGroupIndent: number;
  sortIndicatorBackgroundColor: string;
  sortIndicatorColor: string;
  dragAndDropAccentColor: string;
}

const dataEditorBaseTheme: Theme = {
  accentColor: '#4F5DFF',
  accentFg: '#FFFFFF',
  accentLight: '#ebf1ff',
  textDark: '#313139',
  textMedium: '#737383',
  textLight: '#B2B2C0',
  textBubble: '#313139',

  bgIconHeader: '#737383',
  fgIconHeader: '#FFFFFF',
  textHeader: '#313139',
  textGroupHeader: '#313139BB',
  textHeaderSelected: '#FFFFFF',

  bgCell: '#FFFFFF',
  bgCellMedium: '#FAFAFB',
  bgHeader: '#F7F7F8',
  bgGroup: '#E6E6E6',
  bgHeaderHasFocus: '#E9E9EB',
  bgHeaderHovered: '#E6E6E6',
  bgSelectedColumnIcon: '#fff',
  bgSelectedColumnHeader: '#4F5DFF',
  bgSelectedCell: '#ebf1ff',

  bgBubble: '#EDEDF3',
  bgBubbleSelected: '#FFFFFF',

  bgSearchResult: '#fff9e3',
  bgSelectedSearchResult: '#FFDFAD',

  borderColor: 'rgba(115, 116, 131, 0.16)',
  drilldownBorder: 'rgba(0, 0, 0, 0)',

  linkColor: '#4F5DFF',

  cellHorizontalPadding: 8,
  cellVerticalPadding: 3,

  headerIconSize: 18,

  headerFontStyle: '600 13px',
  rowGroupCountFontStyle: '600 13px',
  rowGroupTitleFontStyle: '600 13px',
  baseFontStyle: '13px',
  fontFamily:
    'Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif',
  editorFontSize: '13px',
  lineHeight: 1.4, //unitless scaler depends on your font
  nestedGroupIndent: 16,
  sortIndicatorBackgroundColor: '#B5DEFF',
  sortIndicatorColor: '#0265DC',
  dragAndDropAccentColor: '#4F5DFF',
};

/** @category Theme */
export function getDataEditorTheme(): Theme {
  return dataEditorBaseTheme;
}

/** @category Theme */
export const ThemeContext = React.createContext<Theme>(dataEditorBaseTheme);
/** @category Hooks */
export function useTheme(): Theme {
  return React.useContext(ThemeContext);
}
