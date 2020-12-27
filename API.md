# Grid API

## Properties

### Required

`rows` is the number of rows to display.

`columns` is an array of objects of type `GridColumn` describing the column headers. The length of the array is the number of columns to display.

`cellXOffset` is the zero-based index of the leftmost column to display.

`cellYOffset` is the zero-based index of the topmost row to display.

`allowResize` is a boolean indicating whether to allow resizing the widths of columns.

`getCellContent` returns an object of type `GridCell` describing the contents for the cell at the given coordinates.

### Optional

`onVisibleRowsChanged` is called whenever the visible region changed. The new visible region is passed as a `Rectangle`. Note that because the component doesn't keep any state, you have to keep track of at least the `cellXOffset` and `cellYOffset`, for which the rectangle provides new values in `.x` and `.y`, respectively.

`headerHeight` is the height of the table header. It defaults to `36`.

`rowHeight` is the height of a row in the table. It defaults to `34`.

`rowMarkers` determines whether to display the marker column on the very left. It defaults to `true`. Note that this column doesn't count as a table column, i.e. it has no index, and doesn't change column indexes.

`rowMarkerWidth` is the width of the marker column on the very left. It defaults to `50`.

```
    readonly onHeaderMenuClick?: (col: number, screenPosition: Rectangle) => void;

    readonly onKeyUp?: (event: GridKeyEventArgs) => void;

    readonly isDraggable?: boolean;
    readonly onDragStart?: (args: GridDragEventArgs) => void;

    readonly drawCustomCell?: (
        ctx: CanvasRenderingContext2D,
        cell: GridCell,
        theme: Theme,
        x: number,
        y: number,
        width: number,
        height: number
    ) => boolean;

    readonly onColumnMoved?: (startIndex: number, endIndex: number) => void;
    readonly onColumnResized?: (column: GridColumn, newSize: number) => void;

    readonly scrollToEnd?: boolean;

    readonly getCellsForSelection?: (selection: GridSelection) => readonly (readonly GridCell[])[];

    readonly onDeleteRows?: (rows: readonly number[]) => void;
    readonly onCellEdited?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
    readonly onRowInserted?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
    readonly onCellClicked?: (cell: readonly [number, number]) => void;

    readonly allowInsertRow?: boolean; // default true;

    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
```

## Types

### Cell coordinates

Many function properties take cell coordinates. Those are arrays of two numbers, namely the column index and the row index. Both are zero-based, and are absolute, i.e. independent of the region of cells currently displayed in the grid. For example, if `cellOffsetX` is `3` and `cellOffsetY` is `5`, then the coordinates of the cell displayed at the top left would be `[3, 5]`.

### Rectangle

```
export interface Rectangle {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}
```

### GridColumn

```
export interface GridColumn {
    readonly width: number;
    readonly title: string;
    readonly icon?: HeaderIcon;
    readonly overlayIcon?: HeaderIcon;
    readonly hasMenu?: boolean;
    readonly style?: "normal" | "highlight";
}
```

### GridCell

```
export type GridCell = EditableGridCell | BubbleCell | RowIDCell | LoadingCell | ProtectedCell;

export type EditableGridCell = TextCell | ImageCell | BooleanCell | MarkdownCell | UriCell | NumberCell;

interface BaseGridCell {
    readonly allowOverlay: boolean;
    readonly style?: "normal" | "faded";
}

interface TextCell extends BaseGridCell {
    readonly kind: GridCellKind.Text;
    readonly data: string;
    readonly editData: string;
}

interface ImageCell extends BaseGridCell {
    readonly kind: GridCellKind.Image;
    readonly data: string[];
    readonly allowAdd: boolean;
}

interface BooleanCell extends BaseGridCell {
    readonly kind: GridCellKind.Boolean;
    readonly checked: boolean;
    readonly showUnchecked: boolean;
    readonly allowEdit: boolean;
}

interface MarkdownCell extends BaseGridCell {
    readonly kind: GridCellKind.Markdown;
    readonly data: string;
}

interface UriCell extends BaseGridCell {
    readonly kind: GridCellKind.Uri;
    readonly data: string;
}

interface NumberCell extends BaseGridCell {
    readonly kind: GridCellKind.Number;
    readonly data: string;
    readonly editData: number | undefined;
}

interface BubbleCell extends BaseGridCell {
    readonly kind: GridCellKind.Bubble;
    readonly data: string[];
}

interface RowIDCell extends BaseGridCell {
    readonly kind: GridCellKind.RowID;
    readonly data: string;
}

interface LoadingCell extends BaseGridCell {
    readonly kind: GridCellKind.Loading;
}

interface ProtectedCell extends BaseGridCell {
    readonly kind: GridCellKind.Protected;
}

export enum GridCellKind {
    Uri = "uri",
    Text = "text",
    Image = "image",
    RowID = "row-id",
    Number = "number",
    Bubble = "bubble",
    Boolean = "boolean",
    Loading = "loading",
    Markdown = "markdown",
    Protected = "protected",
}
```
