import type { FullTheme } from "../../../common/styles.js";
import { type Item, type GridSelection, type InnerGridCell, type InnerGridColumn, type Rectangle, type BaseGridCell } from "../data-grid-types.js";
import type { BaseDrawArgs, PrepResult } from "../../../cells/cell-types.js";
import type { FullyDefined } from "../../../common/support.js";
export interface MappedGridColumn extends FullyDefined<InnerGridColumn> {
    sourceIndex: number;
    sticky: boolean;
}
export declare function useMappedColumns(columns: readonly InnerGridColumn[], freezeColumns: number): readonly MappedGridColumn[];
export declare function gridSelectionHasItem(sel: GridSelection, item: Item): boolean;
export declare function isGroupEqual(left: string | undefined, right: string | undefined): boolean;
export declare function cellIsSelected(location: Item, cell: InnerGridCell, selection: GridSelection): boolean;
export declare function itemIsInRect(location: Item, rect: Rectangle): boolean;
export declare function itemsAreEqual(a: Item | undefined, b: Item | undefined): boolean;
export declare function rectBottomRight(rect: Rectangle): Item;
export declare function cellIsInRange(location: Item, cell: InnerGridCell, selection: GridSelection, includeSingleSelection: boolean): number;
export declare function remapForDnDState(columns: readonly MappedGridColumn[], dndState?: {
    src: number;
    dest: number;
}): readonly MappedGridColumn[];
export declare function getStickyWidth(columns: readonly MappedGridColumn[], dndState?: {
    src: number;
    dest: number;
}): number;
export declare function getFreezeTrailingHeight(rows: number, freezeTrailingRows: number, getRowHeight: number | ((row: number) => number)): number;
export declare function getEffectiveColumns(columns: readonly MappedGridColumn[], cellXOffset: number, width: number, dndState?: {
    src: number;
    dest: number;
}, tx?: number): readonly MappedGridColumn[];
export declare function getColumnIndexForX(targetX: number, effectiveColumns: readonly MappedGridColumn[], translateX?: number): number;
export declare function getRowIndexForY(targetY: number, height: number, hasGroups: boolean, headerHeight: number, groupHeaderHeight: number, rows: number, rowHeight: number | ((index: number) => number), cellYOffset: number, translateY: number, freezeTrailingRows: number): number | undefined;
/** @category Drawing */
export declare function measureTextCached(s: string, ctx: CanvasRenderingContext2D, font?: string, baseline?: "middle" | "alphabetic"): TextMetrics;
export declare function getMeasuredTextCache(s: string, font: string): TextMetrics | undefined;
/** @category Drawing */
export declare function getMiddleCenterBias(ctx: CanvasRenderingContext2D, font: string | FullTheme): number;
export declare function drawLastUpdateUnderlay(args: BaseDrawArgs, lastUpdate: number | undefined, frameTime: number, lastPrep: PrepResult | undefined, isLastCol: boolean, isLastRow: boolean): boolean;
export declare function prepTextCell(args: BaseDrawArgs, lastPrep: PrepResult | undefined, overrideColor?: string): Partial<PrepResult>;
/** @category Drawing */
export declare function drawTextCellExternal(args: BaseDrawArgs, data: string, contentAlign?: BaseGridCell["contentAlign"], allowWrapping?: boolean, hyperWrapping?: boolean): void;
export declare function getEmHeight(ctx: CanvasRenderingContext2D, fontStyle: string): number;
/** @category Drawing */
export declare function drawTextCell(args: Pick<BaseDrawArgs, "rect" | "ctx" | "theme">, data: string, contentAlign?: BaseGridCell["contentAlign"], allowWrapping?: boolean, hyperWrapping?: boolean): void;
interface CornerRadius {
    tl: number;
    tr: number;
    bl: number;
    br: number;
}
export declare function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number | CornerRadius): void;
interface Point {
    x: number;
    y: number;
    radius?: number;
}
export declare function drawMenuDots(ctx: CanvasRenderingContext2D, dotsX: number, dotsY: number): void;
export declare function roundedPoly(ctx: CanvasRenderingContext2D, points: Point[], radiusAll: number): void;
export declare function computeBounds(col: number, row: number, width: number, height: number, groupHeaderHeight: number, totalHeaderHeight: number, cellXOffset: number, cellYOffset: number, translateX: number, translateY: number, rows: number, freezeColumns: number, freezeTrailingRows: number, mappedColumns: readonly MappedGridColumn[], rowHeight: number | ((index: number) => number)): Rectangle;
export {};
//# sourceMappingURL=data-grid-lib.d.ts.map