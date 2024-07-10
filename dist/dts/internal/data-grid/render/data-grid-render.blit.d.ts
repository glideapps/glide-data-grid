import { type Rectangle } from "../data-grid-types.js";
import { type MappedGridColumn } from "./data-grid-lib.js";
import type { DrawGridArg } from "./draw-grid-arg.js";
export interface BlitData {
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number;
    readonly translateY: number;
    readonly mustDrawFocusOnHeader: boolean;
    readonly mustDrawHighlightRingsOnHeader: boolean;
    readonly lastBuffer: "a" | "b" | undefined;
    aBufferScroll: [boolean, boolean] | undefined;
    bBufferScroll: [boolean, boolean] | undefined;
}
export declare function blitLastFrame(ctx: CanvasRenderingContext2D, blitSource: HTMLCanvasElement, blitSourceScroll: [boolean, boolean] | undefined, targetScroll: [boolean, boolean] | undefined, last: BlitData, cellXOffset: number, cellYOffset: number, translateX: number, translateY: number, freezeTrailingRows: number, width: number, height: number, rows: number, totalHeaderHeight: number, dpr: number, mappedColumns: readonly MappedGridColumn[], effectiveCols: readonly MappedGridColumn[], getRowHeight: number | ((r: number) => number), doubleBuffer: boolean): {
    regions: Rectangle[];
};
export declare function blitResizedCol(last: BlitData, cellXOffset: number, cellYOffset: number, translateX: number, translateY: number, width: number, height: number, totalHeaderHeight: number, effectiveCols: readonly MappedGridColumn[], resizedIndex: number): Rectangle[];
export declare function computeCanBlit(current: DrawGridArg, last: DrawGridArg | undefined): boolean | number;
//# sourceMappingURL=data-grid-render.blit.d.ts.map