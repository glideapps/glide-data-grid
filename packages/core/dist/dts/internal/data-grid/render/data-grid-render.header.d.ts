import { type FullTheme } from "../../../common/styles.js";
import type { HoverValues } from "../animation-manager.js";
import type { CellSet } from "../cell-set.js";
import type { SpriteManager } from "../data-grid-sprites.js";
import { type DrawHeaderCallback, type Rectangle, type GridSelection } from "../data-grid-types.js";
import { type MappedGridColumn } from "./data-grid-lib.js";
import type { GroupDetails, GroupDetailsCallback } from "./data-grid-render.cells.js";
import type { DragAndDropState, HoverInfo } from "./draw-grid-arg.js";
export declare function drawGridHeaders(ctx: CanvasRenderingContext2D, effectiveCols: readonly MappedGridColumn[], enableGroups: boolean, hovered: HoverInfo | undefined, width: number, translateX: number, headerHeight: number, groupHeaderHeight: number, dragAndDropState: DragAndDropState | undefined, isResizing: boolean, selection: GridSelection, outerTheme: FullTheme, spriteManager: SpriteManager, hoverValues: HoverValues, verticalBorder: (col: number) => boolean, getGroupDetails: GroupDetailsCallback, damage: CellSet | undefined, drawHeaderCallback: DrawHeaderCallback | undefined, touchMode: boolean): void;
export declare function drawGroups(ctx: CanvasRenderingContext2D, effectiveCols: readonly MappedGridColumn[], width: number, translateX: number, groupHeaderHeight: number, hovered: HoverInfo | undefined, theme: FullTheme, spriteManager: SpriteManager, _hoverValues: HoverValues, verticalBorder: (col: number) => boolean, getGroupDetails: GroupDetailsCallback, damage: CellSet | undefined): void;
export declare function getActionBoundsForGroup(box: Rectangle, actions: NonNullable<GroupDetails["actions"]>): readonly Rectangle[];
interface HeaderLayout {
    readonly textBounds: Rectangle | undefined;
    readonly iconBounds: Rectangle | undefined;
    readonly iconOverlayBounds: Rectangle | undefined;
    readonly indicatorIconBounds: Rectangle | undefined;
    readonly menuBounds: Rectangle | undefined;
}
export declare function computeHeaderLayout(ctx: CanvasRenderingContext2D | undefined, c: MappedGridColumn, x: number, y: number, width: number, height: number, theme: FullTheme, isRTL: boolean): HeaderLayout;
export declare function drawHeader(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, c: MappedGridColumn, selected: boolean, theme: FullTheme, isHovered: boolean, posX: number | undefined, posY: number | undefined, hasSelectedCell: boolean, hoverAmount: number, spriteManager: SpriteManager, drawHeaderCallback: DrawHeaderCallback | undefined, touchMode: boolean): void;
export {};
