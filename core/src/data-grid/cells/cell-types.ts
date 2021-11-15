import { OverlayImageEditorProps, Theme } from "../..";
import ImageWindowLoader from "../../common/image-window-loader";
import { InnerGridCell, Rectangle } from "../data-grid-types";

export type HoverInfo = readonly [readonly [number, number | undefined], readonly [number, number]];

type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

type DrawCallback<T extends InnerGridCell> = (
    ctx: CanvasRenderingContext2D,
    theme: Theme,
    col: number,
    row: number,
    cell: T,
    x: number,
    y: number,
    w: number,
    h: number,
    highlighted: boolean,
    hoverAmount: number,
    hoverX: number | undefined,
    hoverY: number | undefined,
    imageLoader: ImageWindowLoader
) => void;

type ProvideEditorCallback<T extends InnerGridCell> = (
    cell: T
) =>
    | React.FunctionComponent<{
          readonly onChange: (newValue: T) => void;
          readonly onKeyDown: (event: React.KeyboardEvent) => void;
          readonly onFinishedEditing: () => void;
          readonly isHighlighted: boolean;
          readonly value: T;
          readonly imageEditorOverride?: ImageEditorType;
          readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
          readonly target: Rectangle;
          readonly forceEditMode: boolean;
      }>
    | undefined;

export interface InternalCellRenderer<T extends InnerGridCell> {
    readonly kind: T["kind"];
    readonly render: DrawCallback<T>;
    readonly needsHover: boolean;
    readonly needsHoverPosition: boolean;
    readonly onClick?: (cell: T, posX: number, posY: number, bounds: Rectangle) => T | undefined;
    readonly onDelete?: (cell: T) => T | undefined;
    readonly getAccessibilityString: (cell: T) => string;
    readonly getEditor?: ProvideEditorCallback<T>;
}
