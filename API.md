# Glide Data Grid

## HTML/CSS Prerequisites

Currently the Grid depends on there being a root level "portal" div in your HTML. Insert this snippet as the last child of your `<body>` tag:

```HTML
<div id="portal" />
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

## A note on col/row values

Grid always passes col/row coordinate pairs in the format [col, row] and never [row, col]. This is to more accurately match an [x, y] world, even though most english speakers will tend to say "row col".

## Properties

### Required

```
rows: number;
```

`rows` is the number of rows to display.

```
columns: readonly GridColumn[];
```

`columns` is an array of objects of type `GridColumn` describing the column headers. The length of the array is the number of columns to display.

```
getCellContent: (cell: readonly [number, number]) => GridCell;
```

`getCellContent` returns an object of type `GridCell` describing the contents for the cell at the given coordinates.

### Optional

```
cellXOffset?: number;
cellYOffset?: number;
```

`cellXOffset` and `cellYOffset` are the zero-based indexes of the leftmost column, and topmost row to display, respectively. Both should be provided if one is.

```
allowResize?: boolean;
```

`allowResize` is a boolean indicating whether to allow resizing the widths of columns. Default is `false`.

```
onVisibleRegionChanged?: (range: Rectangle) => void;
```

`onVisibleRegionChanged` is called whenever the visible region changed. The new visible region is passed as a `Rectangle`. Note that you have to keep track of at least the `cellXOffset` and `cellYOffset`, for which the rectangle provides new values in `.x` and `.y`, respectively, and pass them back in as properties, otherwise your Grid will not scroll.

```
headerHeight: number;
```

`headerHeight` is the height of the table header. It defaults to `36`.

```
rowHeight: number | ((index: number) => number);
```

`rowHeight` is the height of a row in the table. It defaults to `34`. By passing a function instead of a number you can give different heights to each row. The `index` is the zero-based absolute row index.

```
rowMarkers?: boolean;
```

`rowMarkers` determines whether to display the marker column on the very left. It defaults to `true`. Note that this column doesn't count as a table column, i.e. it has no index, and doesn't change column indexes.

```
rowMarkerWidth?: number;
```

`rowMarkerWidth` is the width of the marker column on the very left. It defaults to `50`.

```
onHeaderMenuClick?: (col: number, screenPosition: Rectangle) => void;
```

`onHeaderMenuClick` is called when the user clicks the menu button on a column header. `col` is the column index, and `screenPosition` is the bounds of the column header. You are responsible for drawing and handling the menu.

```
onColumnMoved?: (startIndex: number, endIndex: number) => void;
```

`onColumnMoved` is called when the user finishes moving a column. `startIndex` is the index of the column that was moved, and `endIndex` is the index at which it should end up. Note that you have to effect the move of the column, and pass the reordered columns back in the `columns` property.

```
onColumnResized?: (column: GridColumn, newSize: number) => void;
```

`onColumnResized` is called when the user finishes resizing a column. `newSize` is the new size of the column. Note that you have change the size of the column in the `GridColumn` and pass it back to the grid in the `columns` property.

```
onCellEdited?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
```

`onCellEdited` is called when the user finishes editing a cell. Note that you are responsible for setting the new value of the cell.

```
onDeleteRows?: (rows: readonly number[]) => void;
```

`onDeleteRows` is called when the user deletes one or more rows. `rows` is an array with the absolute indexes of the deletes rows. Note that it is on you to actually effect the deletion of those rows.

```
showTrailingBlankRow?: boolean;
onRowAppended?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
```

`showTrailingBlankRow` and `onRowAppended` control adding new rows at the bottom of the Grid. If `showTrailingBlankRow` is `true`, an empty, editable row will display at the bottom. If the user enters a value in one of its cells, `onRowAppended` is called, which is responsible for appending the new row.

`showTrailingBlankRow` is `true` by default.

```
getCellsForSelection?: (selection: GridSelection) => readonly (readonly GridCell[])[];
```

`getCellsForSelection` is called when the user copies a selection to the clipboard. It must return a two-dimensional array (an array of rows, where each row is an array of cells) of the cells in the selection's rectangle. Note that the rectangle can include cells that are not currently visible.

```
onCellClicked?: (cell: readonly [number, number]) => void;
```

`onCellClicked` is called whenever the user clicks a cell in the grid.

```
imageEditorOverride?: ImageEditorType;
```

If `imageEditorOverride` is specified, then it will be used instead of the default image editor overlay, which is what the user sees when they double-click on an image cell.

```
markdownDivCreateNode?: (content: string) => DocumentFragment;
```

IF `markdownDivCreateNode` is specified, then it will be used to render Markdown, instead of the default Markdown renderer used by the Grid. You'll want to use this if you need to process your Markdown for security purposes, or if you want to use a renderer with different Markdown features.

```
drawCustomCell?: (
    ctx: CanvasRenderingContext2D,
    cell: GridCell,
    theme: Theme,
    rect: Rectangle
) => boolean;
```

You can specify `drawCustomCell` to enable rendering your own cells. The Grid will call this for every cell it needs to render. It should either render the cell and return `true`, or not render anything and return `false`, in which case the Grid will render the cell.

```
scrollToEnd?: boolean;
```

When this property changes to `true`, the Grid will scroll all the way to the right. Glide uses that when the user clicks the "Add Column" button.

```
isDraggable?: boolean;
onDragStart?: (args: GridDragEventArgs) => void;
```

If `isDraggable` is set, the whole Grid is draggable, and `onDragStart` will be called when dragging starts. You can use this to build a UI where the user can drag the Grid around.

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
