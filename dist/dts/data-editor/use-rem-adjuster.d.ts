import { type Theme } from "../common/styles.js";
interface DataEditorDimensions {
    rowHeight: number | ((n: number) => number);
    headerHeight: number;
    groupHeaderHeight: number;
    theme: Partial<Theme> | undefined;
    overscrollX: number | undefined;
    overscrollY: number | undefined;
}
interface DataEditorProps {
    rowHeight: number | ((n: number) => number);
    headerHeight: number;
    groupHeaderHeight: number;
    theme?: Partial<Theme>;
    overscrollX?: number;
    overscrollY?: number;
    scaleToRem: boolean;
    remSize: number;
}
export declare function useRemAdjuster({ rowHeight: rowHeightIn, headerHeight: headerHeightIn, groupHeaderHeight: groupHeaderHeightIn, theme: themeIn, overscrollX: overscrollXIn, overscrollY: overscrollYIn, scaleToRem, remSize, }: DataEditorProps): DataEditorDimensions;
export {};
//# sourceMappingURL=use-rem-adjuster.d.ts.map