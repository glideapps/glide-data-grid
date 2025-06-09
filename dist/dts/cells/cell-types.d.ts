import type React from "react";
import type { SpriteManager } from "../internal/data-grid/data-grid-sprites.js";
import type { InnerGridCell, Rectangle, CustomCell, ProvideEditorCallback, BooleanEmpty, BooleanIndeterminate, Item } from "../internal/data-grid/data-grid-types.js";
import type { FullTheme } from "../common/styles.js";
import type { ImageWindowLoader } from "../internal/data-grid/image-window-loader-interface.js";
import type { BaseGridMouseEventArgs } from "../internal/data-grid/event-args.js";
export interface BaseDrawArgs {
    ctx: CanvasRenderingContext2D;
    theme: FullTheme;
    col: number;
    row: number;
    rect: Rectangle;
    highlighted: boolean;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    cellFillColor: string;
    imageLoader: ImageWindowLoader;
    spriteManager: SpriteManager;
    hyperWrapping: boolean;
    cell: InnerGridCell;
}
/** @category Drawing */
export type DrawStateTuple = [any, (state: any) => void];
export interface DrawArgs<T extends InnerGridCell> extends BaseDrawArgs {
    cell: T;
    requestAnimationFrame: (state?: any) => void;
    drawState: DrawStateTuple;
    frameTime: number;
    overrideCursor: ((cursor: React.CSSProperties["cursor"]) => void) | undefined;
}
/** @category Drawing */
export interface PrepResult {
    font: string | undefined;
    fillStyle: string | undefined;
    renderer: {};
    deprep: ((args: Pick<BaseDrawArgs, "ctx">) => void) | undefined;
}
/** @category Renderers */
export type DrawCallback<T extends InnerGridCell> = (args: DrawArgs<T>, cell: T) => void;
type PrepCallback = (args: BaseDrawArgs, lastPrep?: PrepResult) => Partial<PrepResult>;
interface BaseCellRenderer<T extends InnerGridCell> {
    readonly kind: T["kind"];
    readonly draw: DrawCallback<T>;
    readonly drawPrep?: PrepCallback;
    readonly needsHover?: boolean | ((cell: T) => boolean);
    readonly needsHoverPosition?: boolean;
    readonly measure?: (ctx: CanvasRenderingContext2D, cell: T, theme: FullTheme) => number;
    readonly provideEditor?: ProvideEditorCallback<T>;
    readonly onClick?: (args: {
        readonly cell: T;
        readonly posX: number;
        readonly posY: number;
        readonly bounds: Rectangle;
        readonly location: Item;
        readonly theme: FullTheme;
        readonly preventDefault: () => void;
    } & BaseGridMouseEventArgs) => T | undefined;
    readonly onSelect?: (args: {
        readonly cell: T;
        readonly posX: number;
        readonly posY: number;
        readonly bounds: Rectangle;
        readonly theme: FullTheme;
        readonly preventDefault: () => void;
    } & BaseGridMouseEventArgs) => void;
    readonly onDelete?: (cell: T) => T | undefined;
}
/** @category Renderers */
export interface InternalCellRenderer<T extends InnerGridCell> extends BaseCellRenderer<T> {
    readonly useLabel?: boolean;
    readonly getAccessibilityString: (cell: T) => string;
    readonly onPaste: (val: string, cell: T, details: {
        readonly rawValue: string | string[] | number | boolean | BooleanEmpty | BooleanIndeterminate;
        readonly formatted?: string | string[];
        readonly formattedString?: string;
    }) => T | undefined;
}
/** @category Renderers */
export interface CustomRenderer<T extends CustomCell = CustomCell> extends BaseCellRenderer<T> {
    readonly isMatch: (cell: CustomCell) => cell is T;
    readonly onPaste?: (val: string, cellData: T["data"]) => T["data"] | undefined;
}
/** @category Renderers */
export type CellRenderer<T extends InnerGridCell> = [T] extends [CustomCell<infer DataType>] ? CustomRenderer<CustomCell<DataType>> : InternalCellRenderer<T>;
/** @category Renderers */
export type GetCellRendererCallback = <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined;
export {};
