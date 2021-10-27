# Glide Data Grid

## HTML/CSS Prerequisites

Currently the Grid depends on there being a root level "portal" div in your HTML. Insert this snippet as the last child of your `<body>` tag:

```HTML
<div id="portal" style="position: fixed; left: 0; top: 0; z-index: 9999;" />
```

Once you've got that done, the easiest way to use the Data Grid is to wrap it inside a `DataEditorContainer` component:

```jsx
<DataEditorContainer width={500} height={300}>
    <DataEditor {...props} />
</DataEditorContainer>
```

What the container does is give the Grid its size. The Grid itself has no intrinisic size. This is likely to change in a future version. If you'd rather not use the container and set a size yourself, the quickest way is by wrapping it in a div with CSS like this:

```CSS
.gridWrapper > :first-child {
  width: 800px;
  height: 500px;
}
```

## Changes to your data

The Grid will never change any of your underlying data. You have to do so yourself when one of the callbacks is invoked. For example, when the user edits the value in a cell, the Grid will invoke the `onCellEdited` callback. If you don't implement that callback, or if it doesn't change the undelying data to the new value, the Grid will keep displaying the old value.

Note that there is currently no way to tell the grid that data has changed. It has to be forced to redraw by passing a different object to the `getCellContent` property. This triggers the entire grid to redraw. You should avoid changing the `getCellContent` object ID as much as possible otherwise.

If you want to use the default Image overlay preview you must remember to include the react-responsive-carousel css file or it will not function correctly. This should be available in your node-modules.

```ts
import "react-responsive-carousel/lib/styles/carousel.min.css";
```

## A note on col/row values

Grid always passes col/row coordinate pairs in the format [col, row] and never [row, col]. This is to more accurately match an [x, y] world, even though most english speakers will tend to say "row col".

## Properties

### Required

```ts
rows: number;
```

`rows` is the number of rows to display.

```ts
columns: readonly GridColumn[];
```

`columns` is an array of objects of type `GridColumn` describing the column headers. The length of the array is the number of columns to display.

```ts
getCellContent: (cell: readonly [number, number]) => GridCell;
```

`getCellContent` returns an object of type `GridCell` describing the contents for the cell at the given coordinates.

### Optional

```ts
onVisibleRegionChanged?: (range: Rectangle) => void;
```

`onVisibleRegionChanged` is called whenever the visible region changed. The new visible region is passed as a `Rectangle`.

```ts
headerHeight: number;
```

`headerHeight` is the height of the table header. It defaults to `36`.

```ts
rowHeight: number | ((index: number) => number);
```

`rowHeight` is the height of a row in the table. It defaults to `34`. By passing a function instead of a number you can give different heights to each row. The `index` is the zero-based absolute row index.

```ts
rowMarkers?: "checkbox" | "number" | "both" | "none";
```

`rowMarkers` determines whether to display the marker column on the very left. It defaults to `none`. Note that this column doesn't count as a table column, i.e. it has no index, and doesn't change column indexes.

```ts
rowMarkerWidth?: number;
```

`rowMarkerWidth` is the width of the marker column on the very left. By default it adapts based on the number of rows in your data set.

```ts
rowSelectionMode?: "auto" | "multi";
```

`rowSelectionMode` changes how selecting a row marker behaves. In auto mode it adapts to touch or mouse environments automatically, in multi-mode it always acts as if the multi key (Ctrl) is pressed.

```ts
onHeaderMenuClick?: (col: number, screenPosition: Rectangle) => void;
```

`onHeaderMenuClick` is called when the user clicks the menu button on a column header. `col` is the column index, and `screenPosition` is the bounds of the column header. You are responsible for drawing and handling the menu.

```ts
onColumnMoved?: (startIndex: number, endIndex: number) => void;
```

`onColumnMoved` is called when the user finishes moving a column. `startIndex` is the index of the column that was moved, and `endIndex` is the index at which it should end up. Note that you have to effect the move of the column, and pass the reordered columns back in the `columns` property.

```ts
onColumnResized?: (column: GridColumn, newSize: number) => void;
```

`onColumnResized` is called when the user finishes resizing a column. `newSize` is the new size of the column. Note that you have change the size of the column in the `GridColumn` and pass it back to the grid in the `columns` property.

```ts
onCellEdited?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
```

`onCellEdited` is called when the user finishes editing a cell. Note that you are responsible for setting the new value of the cell.

```ts
onDeleteRows?: (rows: readonly number[]) => void;
```

`onDeleteRows` is called when the user deletes one or more rows. `rows` is an array with the absolute indexes of the deletes rows. Note that it is on you to actually effect the deletion of those rows.

```ts
onItemHovered?: (args: GridMouseEventArgs) => void;
```

`onItemHovered` is called when the user hovers over a cell, a header, or outside the grid.

```ts
trailingRowOptions?: {
    readonly tint?: boolean;
    readonly hint?: string;
    readonly sticky?: boolean;
}
onRowAppended?: (cell?: readonly [number, number], newValue?: EditableGridCell) => void;
```

`onRowAppended` controls adding new rows at the bottom of the Grid. If `onRowAppended` is defined, an empty, editable row will display at the bottom. If the user enters a value in one of its cells, `onRowAppended` is called, which is responsible for appending the new row. The appearance of the blank row can be configured using `trailingRowOptions`.

```ts
getCellsForSelection?: (selection: GridSelection) => readonly (readonly GridCell[])[];
```

`getCellsForSelection` is called when the user copies a selection to the clipboard. It must return a two-dimensional array (an array of rows, where each row is an array of cells) of the cells in the selection's rectangle. Note that the rectangle can include cells that are not currently visible.

```ts
onCellClicked?: (cell: readonly [number, number]) => void;
```

`onCellClicked` is called whenever the user clicks a cell in the grid.

```ts
imageEditorOverride?: ImageEditorType;
```

If `imageEditorOverride` is specified, then it will be used instead of the default image editor overlay, which is what the user sees when they double-click on an image cell.

```ts
markdownDivCreateNode?: (content: string) => DocumentFragment;
```

IF `markdownDivCreateNode` is specified, then it will be used to render Markdown, instead of the default Markdown renderer used by the Grid. You'll want to use this if you need to process your Markdown for security purposes, or if you want to use a renderer with different Markdown features.

```ts
drawCustomCell?: (
    ctx: CanvasRenderingContext2D,
    cell: GridCell,
    theme: Theme,
    rect: Rectangle
) => boolean;
```

You can specify `drawCustomCell` to enable rendering your own cells. The Grid will call this for every cell it needs to render. It should either render the cell and return `true`, or not render anything and return `false`, in which case the Grid will render the cell.

```ts
scrollToEnd?: boolean;
```

When this property changes to `true`, the Grid will scroll all the way to the right. Glide uses that when the user clicks the "Add Column" button.

```ts
isDraggable?: boolean;
onDragStart?: (args: GridDragEventArgs) => void;
```

If `isDraggable` is set, the whole Grid is draggable, and `onDragStart` will be called when dragging starts. You can use this to build a UI where the user can drag the Grid around.

```ts
maxColumnWidth?: number;
```

If `maxColumnWidth` is set with a value greater than 50, then columns will have a maximum size of that many pixels.
If the value is less than 50, it will be increased to 50. If it isn't set, the default value will be 500.

## Types

### Cell coordinates

Many function properties take cell coordinates. Those are arrays of two numbers, namely the column index and the row index. Both are zero-based, and are absolute, i.e. independent of the region of cells currently displayed in the grid.

### Rectangle

```ts
export interface Rectangle {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}
```

### GridColumn

```ts
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

Some cells have both a `data` and a `displayData` field. `displayData` is
always a string, and is what's displayed in the cell for viewing. For cells
that allow editing via the overlay, `data` is what the overlay display for
editing. That way you can, for example, display numbers in a specific format.

The Grid supports the following kinds of cells:

-   `TextCell` is just a string.
-   `ImageCell` is an image URI, displayed as a thumbnail.
-   `BooleanCell` is a checkbox.
-   `Markdown` is markdown text, which is rendered nicely in the overlay on double-click.
-   `UriCell` is a URI.
-   `NumberCell` is a number.
-   `BubbleCell` is a number of gray bubbles with a bit of text in them.
-   `RowIDCell` is a string that's grayed out.
-   `LoadingCell` is currently rendered empty, but should be used for data that's not loaded in yet.
-   `ProtectedCell` is for data that the user isn't supposed to see, for example other user's passwords.
-   `DrilldownCell` displays bubbles with a small thumbnail and text.

```ts
export type GridCell = EditableGridCell | BubbleCell | RowIDCell | LoadingCell | ProtectedCell | DrilldownCell;

export type EditableGridCell = TextCell | ImageCell | BooleanCell | MarkdownCell | UriCell | NumberCell;

interface TextCell extends BaseGridCell {
    readonly kind: GridCellKind.Text;
    readonly displayData: string;
    readonly data: string;
}

interface NumberCell extends BaseGridCell {
    readonly kind: GridCellKind.Number;
    readonly displayData: string;
    readonly data: number | undefined;
}

interface ImageCell extends BaseGridCell {
    readonly kind: GridCellKind.Image;
    readonly data: string[];
    readonly allowAdd: boolean;
}

interface BubbleCell extends BaseGridCell {
    readonly kind: GridCellKind.Bubble;
    readonly data: string[];
}

export interface DrilldownCellData {
    readonly text: string;
    readonly img?: string;
}

interface DrilldownCell extends BaseGridCell {
    readonly kind: GridCellKind.Drilldown;
    readonly data: readonly DrilldownCellData[];
}

interface BooleanCell extends BaseGridCell {
    readonly kind: GridCellKind.Boolean;
    readonly data: boolean;
    readonly showUnchecked: boolean;
    readonly allowEdit: boolean;
}

interface RowIDCell extends BaseGridCell {
    readonly kind: GridCellKind.RowID;
    readonly data: string;
}

interface MarkdownCell extends BaseGridCell {
    readonly kind: GridCellKind.Markdown;
    readonly data: string;
}

interface UriCell extends BaseGridCell {
    readonly kind: GridCellKind.Uri;
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

### GridMouseEventArgs

```ts
export type GridMouseEventArgs = GridMouseCellEventArgs | GridMouseHeaderEventArgs | GridMouseOutOfBoundsEventArgs;

interface BaseGridMouseEventArgs {
    shiftKey: boolean;
}

interface GridMouseCellEventArgs extends BaseGridMouseEventArgs {
    readonly kind: "cell";
    readonly location: readonly [number, number];
    readonly bounds: Rectangle;
    readonly isEdge: boolean;
}

interface GridMouseHeaderEventArgs extends BaseGridMouseEventArgs {
    readonly kind: "header";
    readonly location: readonly [number, undefined];
    readonly bounds: Rectangle;
    readonly isEdge: boolean;
}

interface GridMouseOutOfBoundsEventArgs extends BaseGridMouseEventArgs {
    readonly kind: "out-of-bounds";
    readonly location: readonly [number, number];
    readonly direction: readonly [-1 | 0 | 1, -1 | 0 | 1];
}
```
