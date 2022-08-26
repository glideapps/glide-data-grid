import type { Theme } from "../..";
import type { SpriteManager } from "../data-grid-sprites";
import type {
    InnerGridCell,
    Rectangle,
    ImageWindowLoader,
    CustomCell,
    ProvideEditorCallback,
} from "../data-grid-types";

export interface BaseDrawArgs {
    ctx: CanvasRenderingContext2D;
    theme: Theme;
    col: number;
    row: number;
    rect: Rectangle;
    highlighted: boolean;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    imageLoader: ImageWindowLoader;
    spriteManager: SpriteManager;
    hyperWrapping: boolean;
    requestAnimationFrame: () => void;
}

export interface DrawArgs<T extends InnerGridCell> extends BaseDrawArgs {
    cell: T;
}

// intentionally mutable
export interface PrepResult {
    font: string | undefined;
    fillStyle: string | undefined;
    renderer: {};
    deprep: ((args: Pick<BaseDrawArgs, "ctx">) => void) | undefined;
}

export type DrawCallback<T extends InnerGridCell> = (args: DrawArgs<T>, cell: T) => void;
type PrepCallback = (args: BaseDrawArgs, lastPrep?: PrepResult) => Partial<PrepResult>;
type DeprepCallback = (args: Pick<BaseDrawArgs, "ctx">) => void;

interface BaseCellRenderer<T extends InnerGridCell> {
    // drawing
    readonly kind: T["kind"];
    readonly draw: DrawCallback<T>;
    readonly drawPrep?: PrepCallback;
    readonly drawDeprep?: DeprepCallback;
    readonly needsHover?: boolean;
    readonly needsHoverPosition?: boolean;
    readonly measure?: (ctx: CanvasRenderingContext2D, cell: T, theme: Theme) => number;

    // editing
    readonly provideEditor?: ProvideEditorCallback<T>;

    // event callbacks
    readonly onClick?: (cell: T, posX: number, posY: number, bounds: Rectangle) => T | undefined;
    readonly onDelete?: (cell: T) => T | undefined;
}

export interface InternalCellRenderer<T extends InnerGridCell> extends BaseCellRenderer<T> {
    readonly useLabel?: boolean;
    readonly getAccessibilityString: (cell: T) => string;
    readonly onPaste: (val: string, cell: T) => T | undefined;
}

export interface CustomRenderer<T extends CustomCell = CustomCell> extends BaseCellRenderer<T> {
    readonly isMatch: (cell: CustomCell) => cell is T;
    readonly onPaste?: (val: string, cellData: T["data"]) => T["data"] | undefined;
}

export type CellRenderer<T extends InnerGridCell> = [T] extends [CustomCell<infer DataType>]
    ? CustomRenderer<CustomCell<DataType>>
    : InternalCellRenderer<T>;

export type GetCellRendererCallback = <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined;
