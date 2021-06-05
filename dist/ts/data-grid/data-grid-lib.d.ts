import { Theme } from "../common/styles";
import ImageWindowLoader from "../common/image-window-loader";
import { DrilldownCellData, GridCell, GridColumn } from "./data-grid-types";
export interface MappedGridColumn extends GridColumn {
    sourceIndex: number;
    sticky: boolean;
}
export declare function makeEditCell(cell: GridCell): GridCell;
export declare function getEffectiveColumns(columns: readonly GridColumn[], cellXOffset: number, width: number, firstColSticky: boolean, dndState?: {
    src: number;
    dest: number;
}, tx?: number): readonly MappedGridColumn[];
export declare function getColumnIndexForX(targetX: number, effectiveColumns: readonly MappedGridColumn[], translateX?: number): number;
export declare function getRowIndexForY(targetY: number, headerHeight: number, rows: number, rowHeight: number | ((index: number) => number), cellYOffset: number, translateY?: number): number | undefined;
export declare function drawTextCell(ctx: CanvasRenderingContext2D, theme: Theme, data: string, x: number, y: number, width: number, height: number, overrideColor?: string): void;
export declare function drawProtectedCell(ctx: CanvasRenderingContext2D, theme: Theme, x: number, y: number, width: number, height: number, drawBackground: boolean): void;
export declare function drawBoolean(ctx: CanvasRenderingContext2D, theme: Theme, data: boolean, x: number, y: number, width: number, height: number, highlighted: boolean): void;
export declare function drawBubbles(ctx: CanvasRenderingContext2D, theme: Theme, data: string[], x: number, y: number, width: number, height: number, highlighted: boolean): void;
export declare function drawDrilldownCell(ctx: CanvasRenderingContext2D, theme: Theme, data: readonly DrilldownCellData[], col: number, row: number, x: number, y: number, width: number, height: number, imageLoader: ImageWindowLoader): void;
export declare function drawImage(ctx: CanvasRenderingContext2D, _theme: Theme, data: string[], col: number, row: number, x: number, y: number, _width: number, height: number, imageLoader: ImageWindowLoader): void;
interface Point {
    x: number;
    y: number;
    radius?: number;
}
export declare function roundedPoly(ctx: CanvasRenderingContext2D, points: Point[], radiusAll: number): void;
export {};
//# sourceMappingURL=data-grid-lib.d.ts.map