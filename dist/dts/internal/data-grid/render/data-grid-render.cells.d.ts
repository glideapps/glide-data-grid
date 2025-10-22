import { type GridSelection, type InnerGridCell, type Rectangle, CompactSelection, GridColumnIcon, type Item, type CellList, type DrawCellCallback } from "../data-grid-types.js";
import { CellSet } from "../cell-set.js";
import type { HoverValues } from "../animation-manager.js";
import { type MappedGridColumn } from "./data-grid-lib.js";
import type { SpriteManager } from "../data-grid-sprites.js";
import { type FullTheme, type Theme } from "../../../common/styles.js";
import type { GetCellRendererCallback, PrepResult } from "../../../cells/cell-types.js";
import type { HoverInfo } from "./draw-grid-arg.js";
import type { EnqueueCallback } from "../use-animation-queue.js";
import type { RenderStateProvider } from "../../../common/render-state-provider.js";
import type { ImageWindowLoader } from "../image-window-loader-interface.js";
import type { GridMouseGroupHeaderEventArgs } from "../event-args.js";
export interface GroupDetails {
    readonly name: string;
    readonly icon?: string;
    readonly overrideTheme?: Partial<Theme>;
    readonly actions?: readonly {
        readonly title: string;
        readonly onClick: (e: GridMouseGroupHeaderEventArgs) => void;
        readonly icon: GridColumnIcon | string;
    }[];
}
export type GroupDetailsCallback = (groupName: string) => GroupDetails;
export type GetRowThemeCallback = (row: number) => Partial<Theme> | undefined;
export interface Highlight {
    readonly color: string;
    readonly range: Rectangle;
    readonly style?: "dashed" | "solid" | "no-outline" | "solid-outline";
}
export declare function drawCells(ctx: CanvasRenderingContext2D, effectiveColumns: readonly MappedGridColumn[], allColumns: readonly MappedGridColumn[], height: number, totalHeaderHeight: number, translateX: number, translateY: number, cellYOffset: number, rows: number, getRowHeight: (row: number) => number, getCellContent: (cell: Item) => InnerGridCell, getGroupDetails: GroupDetailsCallback, getRowThemeOverride: GetRowThemeCallback | undefined, disabledRows: CompactSelection, isFocused: boolean, drawFocus: boolean, freezeTrailingRows: number, hasAppendRow: boolean, drawRegions: readonly Rectangle[], damage: CellSet | undefined, selection: GridSelection, prelightCells: CellList | undefined, highlightRegions: readonly Highlight[] | undefined, imageLoader: ImageWindowLoader, spriteManager: SpriteManager, hoverValues: HoverValues, hoverInfo: HoverInfo | undefined, drawCellCallback: DrawCellCallback | undefined, hyperWrapping: boolean, outerTheme: FullTheme, enqueue: EnqueueCallback, renderStateProvider: RenderStateProvider, getCellRenderer: GetCellRendererCallback, overrideCursor: (cursor: React.CSSProperties["cursor"]) => void, minimumCellWidth: number): Rectangle[] | undefined;
export declare function drawCell(ctx: CanvasRenderingContext2D, cell: InnerGridCell, col: number, row: number, isLastCol: boolean, isLastRow: boolean, x: number, y: number, w: number, h: number, highlighted: boolean, theme: FullTheme, finalCellFillColor: string, imageLoader: ImageWindowLoader, spriteManager: SpriteManager, hoverAmount: number, hoverInfo: HoverInfo | undefined, hyperWrapping: boolean, frameTime: number, drawCellCallback: DrawCellCallback | undefined, lastPrep: PrepResult | undefined, enqueue: EnqueueCallback | undefined, renderStateProvider: RenderStateProvider, getCellRenderer: GetCellRendererCallback, overrideCursor: (cursor: React.CSSProperties["cursor"]) => void): PrepResult | undefined;
//# sourceMappingURL=data-grid-render.cells.d.ts.map