import type { OverlayImageEditorProps, Theme } from "../..";
import type { SpriteManager } from "../data-grid-sprites";
import type { InnerGridCell, Rectangle, ImageWindowLoader, CustomCell } from "../data-grid-types";

export type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

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

type DrawCallback<T extends InnerGridCell> = (args: DrawArgs<T>, cell: T) => void;
type PrepCallback = (args: BaseDrawArgs, lastPrep?: PrepResult) => Partial<PrepResult>;
type DeprepCallback = (args: Pick<BaseDrawArgs, "ctx">) => void;

type ProvideEditorCallback<T extends InnerGridCell> = (
    cell: T
) =>
    | React.FunctionComponent<{
          readonly onChange: (newValue: T) => void;
          readonly onKeyDown: (event: React.KeyboardEvent) => void;
          readonly onFinishedEditing: (newValue?: T) => void;
          readonly isHighlighted: boolean;
          readonly value: T;
          readonly imageEditorOverride?: ImageEditorType;
          readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
          readonly target: Rectangle;
          readonly validatedSelection?: number | readonly [number, number];
          readonly forceEditMode: boolean;
          readonly isValid?: boolean;
      }>
    | undefined;

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

export interface AdditionalRenderer<T extends CustomCell = CustomCell> extends BaseCellRenderer<T> {
    readonly isMatch: (cell: CustomCell) => cell is T;
    readonly onPaste?: (val: string, cellData: T["data"]) => T["data"] | undefined;
}

export type CellRenderer<T extends InnerGridCell> = T extends CustomCell<infer DataType>
    ? AdditionalRenderer<CustomCell<DataType>>
    : InternalCellRenderer<InnerGridCell>;

export type GetCellRendererCallback = <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined;
