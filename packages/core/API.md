# Basic Usage

## HTML/CSS Prerequisites

Currently the Grid depends on there being a root level "portal" div in your HTML. Insert this snippet as the last child of your `<body>` tag:

```HTML
<div id="portal" style="position: fixed; left: 0; top: 0; z-index: 9999;" />
```

Once you've got that done, the easiest way to use the Data Grid is to give it a fixed size:

```jsx
<DataEditor width={500} height={300} {...props} />
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

# API Overview

Details of each property can be found by clicking on it.

## Types

| Name                            | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| [GridColumn](#gridcolumn)       | A column description. Passed to the `columns` property.               |
| [GridCell](#gridcell)           | The basic interface for defining a cell                               |
| [GridSelection](#gridselection) | The most basic representation of the selected cells in the data grid. |
| [Theme](#theme)                 | The theme used by the data grid to get all color and font information |

## Ref Methods

| Name                        | Description                                                   |
| --------------------------- | ------------------------------------------------------------- |
| [updateCells](#updatecells) | Invalidates the rendering of a list of passed cells.          |
| [getBounds](#getbounds)     | Gets the current screen-space bounds of a desired cell.       |
| [scrollTo](#scrollto)       | Tells the data-grid to scroll to a particular location.       |
| [appendRow](#appendrow)     | Append a row to the data grid.                                |
| [focus](#focus)             | Focuses the data grid.                                        |
| [emit](#emit)               | Used to emit commands normally emitted by keyboard shortcuts. |

## Required Props

All data grids must set these props. These props are the bare minimum required to set up a functional data grid. Not all features will function with only these props but basic functionality will be present.

| Name                              | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| [columns](#columns)               | All columns in the data grid.                           |
| [rows](#rows)                     | The number of rows in the data-grid.                    |
| [getCellContent](#getcellcontent) | A callback to get the content of a given cell location. |

## Important Props

Most data grids will want to set the majority of these props one way or another.

| Name                                              | Description                                                                                                                                                                                                                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [freezeColumns](#freezecolumns)                   | The number of columns which should remain in place when scrolling horizontally. The row marker column, if enabled is always frozen and is not included in this count.                                                                                               |
| [getCellsForSelection](#getcellsforselection)     | Used to fetch large amounts of cells at once. Used for copy/paste, if unset copy will not work.                                                                                                                                                                     |
| [markdownDivCreateNode](#markdowndivcreatenode)   | If specified, it will be used to render Markdown, instead of the default Markdown renderer used by the Grid. You'll want to use this if you need to process your Markdown for security purposes, or if you want to use a renderer with different Markdown features. |
| [onVisibleRegionChanged](#onvisibleregionchanged) | Emits whenever the visible rows/columns changes.                                                                                                                                                                                                                    |
| [provideEditor](#provideeditor)                   | Callback for providing a custom editor for a cell.                                                                                                                                                                                                                  |
| [rowHeight](#rowheight)                           | Callback or number used to specify the height of a given row.                                                                                                                                                                                                       |
| [rowMarkers](#rowmarkers)                         | Enable/disable row marker column on the left. Can show row numbers, selection boxes, or both.                                                                                                                                                                       |
| [smoothScrollX](#smoothscroll)                    | Enable/disable smooth scrolling on the X axis.                                                                                                                                                                                                                      |
| [smoothScrollY](#smoothscroll)                    | Enable/disable smooth scrolling on the Y axis.                                                                                                                                                                                                                      |
| [fixedShadowX](#fixedshadow)                      | Enable/disable a shadow behind fixed columns on the X axis.                                                                                                                                                                                                         |
| [fixedShadowY](#fixedshadow)                      | Enable/disable a shadow behind the header(s) on the Y axis.                                                                                                                                                                                                         |

## Search

| Name                            | Description                                                |
| ------------------------------- | ---------------------------------------------------------- |
| [showSearch](#showsearch)       | Show/hide the search interface.                            |
| [onSearchClose](#onsearchclose) | Emitted when the search interface close button is clicked. |

## Styling

| Name                                        | Description                                                             |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| [drawCell](#drawcell)                       | Callback used to override the rendering of any cell.                    |
| [drawHeader](#drawheader)                   | Callback used to override the rendering of any header.                  |
| [getGroupDetails](#getgroupdetails)         | Callback to provide additional details for group headers such as icons. |
| [getRowThemeOverride](#getrowthemeoverride) | Callback to provide theme override for any row.                         |
| [groupHeaderHeight](#groupheaderheight)     | The height in pixels of the column group headers.                       |
| [headerHeight](#headerheight)               | The height in pixels of the column headers.                             |
| [headerIcons](#headericons)                 | Additional header icons for use by `GridColumn`.                        |
| [overscrollX](#overscroll)                  | Allows overscrolling the data grid horizontally by a set amount.        |
| [overscrollY](#overscroll)                  | Allows overscrolling the data grid vertically by a set amount.          |
| [rightElement](#rightelement)               | A node which will be placed at the right edge of the data grid.         |
| [rightElementProps](#rightelement)          | Changes how the right element renders.                                  |
| [rowMarkerWidth](#rowmarkerwidth)           | The width of the row markers.                                           |
| [rowMarkerStartIndex](#rowmarkerstartindex) | The index of the first element in the grid                              |
| [verticalBorder](#verticalborder)           | Enable/disable vertical borders for any `GridColumn`                    |

## Selection Handling

| Name                                               | Description                                                                                             |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [gridSelection](#gridselection)                    | The current selection active in the data grid. Includes both the selection cell and the selected range. |
| [spanRangeBehavior](#spanrangebehavior)            | Determines if the `gridSelection` should allow partial spans or not.                                    |
| [onGridSelectionChange](#gridselection)            | Emitted whenever the `gridSelection` should change.                                                     |
| [onSelectionCleared](#onselectioncleared)          | Emitted when the selection is explicitly cleared.                                                       |
| [rangeSelect](#rangeselect)                        | Controls if multiple ranges can be selected at once.                                                    |
| [columnSelect](#rangeselect)                       | Controls if multiple columns can be selected at once.                                                   |
| [rowSelect](#rangeselect)                          | Controls if multiple rows can be selected at aonce.                                                     |
| [rangeSelectionBlending](#rangeselectionblending)  | Controls how range selections may be mixed with other selection types.                                  |
| [columnSelectionBlending](#rangeselectionblending) | Controls how column selections may be mixed with other selection types.                                 |
| [rowSelectionBlending](#rangeselectionblending)    | Controls how row selections may be mixed with other selection types.                                    |
| [highlightRegions](#highlightregions)              | Adds additional highlights to the data grid for showing contextually important cells.                   |
| [fillHandle](#fillhandle)                          | Controls the presence of the fill indicator                                                             |

## Editing

| Name                                          | Description                                                                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [imageEditorOverride](#imageeditoroverride)   | Used to provide an override to the default image editor for the data grid. `provideEditor` may be a better choice for most people. |
| [onCellEdited](#oncelledited)                 | Emitted whenever a cell edit is completed.                                                                                         |
| [onCellsEdited](#oncelledited)                | Emitted whenever a cell edit is completed and provides all edits inbound as a single batch.                                        |
| [onDelete](#ondelete)                         | Emitted whenever the user has requested the deletion of the selection.                                                             |
| [onFinishedEditing](#onfinishedediting)       | Emitted when editing has finished, regardless of data changing or not.                                                             |
| [onGroupHeaderRenamed](#ongroupheaderrenamed) | Emitted whe the user wishes to rename a group.                                                                                     |
| [onPaste](#onpaste)                           | Emitted any time data is pasted to the grid. Allows controlling paste behavior.                                                    |
| [onRowAppended](#trailingrowoptions)          | Emitted whenever a row append operation is requested. Append location can be set in callback.                                      |
| [trailingRowOptions](#trailingrowoptions)     | Controls the built in trailing row to allow appending new rows.                                                                    |

## Input Interaction

| Name                                                  | Description                                                                                                                                                                         |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [maxColumnWidth](#maxcolumnwidth)                     | Sets the maximum width the user can resize a column to.                                                                                                                             |
| [minColumnWidth](#maxcolumnwidth)                     | Sets the minimum width the user can resize a column to.                                                                                                                             |
| [onCellClicked](#oncellclicked)                       | Emitted when a cell is clicked.                                                                                                                                                     |
| [onCellActivated](#oncellactivated)                   | Emitted when a cell is activated, by pressing Enter, Space or double clicking it.                                                                                                   |
| [onCellContextMenu](#oncellcontextmenu)               | Emitted when a cell should show a context menu. Usually right click.                                                                                                                |
| [onColumnMoved](#oncolumnmoved)                       | Emitted when a column has been dragged to a new location.                                                                                                                           |
| [onColumnResize](#oncolumnresize)                     | Emitted when a column has been resized to a new size.                                                                                                                               |
| [onGroupHeaderClicked](#ongroupheaderclicked)         | Emitted when a group header is clicked.                                                                                                                                             |
| [onGroupHeaderContextMenu](#ongroupheadercontextmenu) | Emitted when a group header should show a context menu. Usually right click.                                                                                                        |
| [onHeaderClicked](#onheaderclicked)                   | Emitted when a column header is clicked.                                                                                                                                            |
| [onHeaderContextMenu](#onheadercontextmenu)           | Emitted when a column header should show a context menu. Usually right click.                                                                                                       |
| [onHeaderMenuClick](#onheadermenuclick)               | Emitted when the menu dropdown arrow on a column header is clicked.                                                                                                                 |
| [onItemHovered](#onitemhovered)                       | Emitted when the hovered item changes.                                                                                                                                              |
| [onMouseMove](#onmousemove)                           | Emitted whenever the mouse moves. Be careful, can cause performance issues.                                                                                                         |
| [onRowMoved](#onrowmoved)                             | Emitted when a row has been dragged to a new location.                                                                                                                              |
| [preventDiagonalScrolling](#preventdiagonalscrolling) | Prevents diagonal scrolling                                                                                                                                                         |
| [rowSelectionMode](#rowselectionmode)                 | Determines if row selection requires a modifier key to enable multi-selection or not.                                                                                               |
| [showMinimap](#showminimap)                           | Shows the interactive minimap of the grid.                                                                                                                                          |
| [scrollToEnd](#scrolltoend)                           | When set to true, the grid will scroll to the end. The ref has a better method to do this and this prop should not be used but it will remain supported for the foreseeable future. |
| [validateCell](#validatecell)                         | When returns false indicates to the user the value will not be accepted. When returns a new GridCell the value is coerced to match.                                                 |

## Rarely Used

| Name                          | Description                                                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [isDraggable](#isdraggable)   | Makes the grid as a whole draggable. Disables many interactions.                                                                |
| [onDragStart](#isdraggable)   | Emitted when a drag starts and `isDraggable` is true.                                                                           |
| [experimental](#experimental) | Contains experimental flags. Nothing in here is considered stable API and is mostly used for features that are not yet settled. |

# Keybindings

| Key Combo                    | Default | Flag                | Description                                                                              |
| ---------------------------- | ------- | ------------------- | ---------------------------------------------------------------------------------------- |
| Arrow                        | ✔️      | N/A                 | Moves the currently selected cell and clears other selections                            |
| Shift + Arrow                | ✔️      | N/A                 | Extends the current selection range in the direction pressed.                            |
| Alt + Arrow                  | ✔️      | N/A                 | Moves the currently selected cell and retains the current selection                      |
| Ctrl/Cmd + Arrow \| Home/End | ✔️      | N/A                 | Move the selection as far as possible in the direction pressed.                          |
| Ctrl/Cmd + Shift + Arrow     | ✔️      | N/A                 | Extends the selection as far as possible in the direction pressed.                       |
| Shift + Home/End             | ✔️      | N/A                 | Extends the selection as far as possible in the direction pressed.                       |
| Ctrl/Cmd + A                 | ✔️      | `selectAll`         | Selects all cells.                                                                       |
| Shift + Space                | ✔️      | `selectRow`         | Selecs the current row.                                                                  |
| Ctrl + Space                 | ✔️      | `selectCol`         | Selects the current col.                                                                 |
| PageUp/PageDown              | ❌      | `pageUp`/`pageDown` | Moves the current selection up/down by one page.                                         |
| Escape                       | ✔️      | `clear`             | Clear the current selection.                                                             |
| Ctrl/Cmd + D                 | ❌      | `downFill`          | Data from the first row of the range will be down filled into the rows below it          |
| Ctrl/Cmd + R                 | ❌      | `rightFill`         | Data from the first column of the range will be right filled into the columns next to it |
| Ctrl/Cmd + C                 | ✔️      | `copy`              | Copies the current selection.                                                            |
| Ctrl/Cmd + V                 | ✔️      | `paste`             | Pastes the current buffer into the grid.                                                 |
| Ctrl/Cmd + F                 | ❌      | `search`            | Opens the search interface.                                                              |
| Ctrl/Cmd + Home/End          | ✔️      | `first`/`last`      | Move the selection to the first/last cell in the data grid.                              |
| Ctrl/Cmd + Shift + Home/End  | ✔️      | `first`/`last`      | Extend the selection to the first/last cell in the data grid.                            |

# Full API Docs

## GridColumn

Grid columns are the basic horizontal building block of the data grid. At their most basic level a `GridColumn` is just an object which contains a `title` and a `width` or `id`. Their type looks like:

```ts
interface BaseGridColumn {
    readonly title: string;
    readonly group?: string;
    readonly icon?: GridColumnIcon | string;
    readonly overlayIcon?: GridColumnIcon | string;
    readonly hasMenu?: boolean;
    readonly style?: "normal" | "highlight";
    readonly grow?: number;
    readonly themeOverride?: Partial<Theme>;
    readonly trailingRowOptions?: {
        readonly hint?: string;
        readonly addIcon?: string;
        readonly targetColumn?: number | GridColumn;
        readonly themeOverride?: Partial<Theme>;
        readonly disabled?: boolean;
    };
}

interface SizedGridColumn extends BaseGridColumn {
    readonly width: number;
    readonly id?: string;
}

interface AutoGridColumn extends BaseGridColumn {
    readonly id: string;
}

export type GridColumn = SizedGridColumn | AutoGridColumn;
```

| Property           | Description                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| title              | The title of the column                                                                                                                  |
| group              | The name of the group the column belongs to                                                                                              |
| icon               | The icon the column belongs to. The icon must be either one of the predefined icons or an icon passed to the `headerIcons` prop          |
| overlayIcon        | An icon which is painted on top offset bottom right of the `icon`. Must be a predefined icon or an icon passed to the `headerIcons` prop |
| hasMenu            | Enables/disables the menu dropdown indicator. If not enabled, `onHeaderMenuClick` will not be emitted.                                   |
| style              | Makes the column use the highlighted theming from the `Theme`. `themeOverride` can be used to perform the same effect.                   |
| grow               | When set to a number > 0 the column will grow to consume extra available space according to the weight of its grow property.             |
| themeOverride      | A `Partial<Theme>` which can be used to override the theming of the header as well as all cells within the column.                       |
| trailingRowOptions | Overrides the `DataEditor` level prop for [`trailingRowOptions`](#trailingrowoptions) for this column                                    |

---

## GridCell

`GridCell` is the basic content building block of a data grid. There are many types of cells available out of the box and more available in additional packages.

| Cell Kind | Description                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| Uri       | Displays uris. Can be edited.                                                                                  |
| Text      | Displays arbitrary text.                                                                                       |
| Image     | Displays one or more images.                                                                                   |
| RowID     | Designed to show primary keys in data sources.                                                                 |
| Number    | Displays numbers with formatting options and better editing support.                                           |
| Bubble    | Displays lists of data in little bubbles.                                                                      |
| Boolean   | Displays a checkbox which can be directly edited if desired.                                                   |
| Loading   | Useful for when data is loading. Rendering is basically free.                                                  |
| Markdown  | Displays markdown when opened.                                                                                 |
| Drilldown | Similar to a bubble cell, but allows embedding text and images with each cell.                                 |
| Protected | Displays stars instead of data. Useful for indicating that hidden data is present but unavailable to the user. |
| Custom    | Has no rendering by default and must be provided via `drawCell`. Used to implement 3rd party cells.            |

All grid cells support the following properties

```ts
interface BaseGridCell {
    readonly allowOverlay: boolean;
    readonly lastUpdated?: number;
    readonly style?: "normal" | "faded";
    readonly themeOverride?: Partial<Theme>;
    readonly span?: readonly [number, number];
    readonly contentAlign?: "left" | "right" | "center";
    readonly cursor?: CSSProperties["cursor"];
}
```

| Property      | Description                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowOverlay  | Determins if an overlay editor or previewer should be shown when activating this cell.                                                                  |
| lastUpdated   | If set, the grid will render this cell with a highlighted background which fades out. Uses performance.now() instead of Date.now().                     |
| style         | If set to `faded` the cell will draw with a transparent appearance.                                                                                     |
| themeOverride | A partial theme override to use when drawing this cell.                                                                                                 |
| span          | If set the `span` controls which horizontal span a cell belongs to. Spans are inclusive and must be correctly reported for all cells in the span range. |
| contentAlign  | Changes the default text alignment for the cell.                                                                                                        |
| cursor        | An override for the cell cursor when hovered.                                                                                                           |

---

## GridSelection

`GridSelection` is the most basic representation of the selected cells, rows, and columns in the data grid. The `current` property accounts for the selected cell and the range of cells selected as well. It is the selection which is modified by keyboard and mouse interaction when clicking on the cells themselves.

The `rows` and `columns` properties both account for the columns or rows which have been explicitly selected by the user. Selecting a range which encompases the entire set of cells within a column/row does not implicitly set it into this part of the collection. This allows for distinguishing between cases when the user wishes to delete all contents of a row/column and delete the row/column itself.

```ts
interface GridSelection {
    readonly current?: {
        readonly cell: Item;
        readonly range: Readonly<Rectangle>;
        readonly rangeStack: readonly Readonly<Rectangle>[];
    };
    readonly columns: CompactSelection;
    readonly rows: CompactSelection;
}
```

The `cell` is the [col, row] formatted cell which will have the focus ring drawn around it. The `range` should always include the `cell` and represents additional cells which can be edited via copy, delete and other events. The `range` may or may not include partial spans depending on the [`spanRangeBehavior`](#spanrangebehavior) set.

---

## Theme

The data grid uses the `Theme` provided to the DataEditer in the `theme` prop. This is used to style editors as well as the grid itself. The theme interface is flat. The data grid comes with a built in theme which it will use to fill in any missing values.

| Property              | Type                | CSS Variable                  | Description                                                                                       |
| --------------------- | ------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| accentColor           | string              | --gdg-accent-color            | The primary accent color of the grid. This will show up in focus rings and selected rows/headers. |
| accentFg              | string              | --gdg-accent-fg               | A foreground color which works well on top of the accent color.                                   |
| accentLight           | string              | --gdg-accent-light            | A lighter version of the accent color used to hint selection.                                     |
| textDark              | string              | --gdg-text-dark               | The standard text color.                                                                          |
| textMedium            | string              | --gdg-text-medium             | A lighter text color used for non-editable data in some cases.                                    |
| textLight             | string              | --gdg-text-light              | An even lighter text color                                                                        |
| textBubble            | string              | --gdg-text-bubble             | The text color used in bubbles                                                                    |
| bgIconHeader          | string              | --gdg-bg-icon-header          | The background color for header icons                                                             |
| fgIconHeader          | string              | --gdg-fg-icon-header          | The foreground color for header icons                                                             |
| textHeader            | string              | --gdg-text-header             | The header text color                                                                             |
| textGroupHeader       | string \| undefined | --gdg-text-group-header       | The group header text color, if none provided the `textHeader` is used instead.                   |
| textHeaderSelected    | string              | --gdg-text-header-selected    | The text color used for selected headers                                                          |
| bgCell                | string              | --gdg-bg-cell                 | The primary background color of the data grid.                                                    |
| bgCellMedium          | string              | --gdg-bg-cell-medium          | Used for disabled or otherwise off colored cells.                                                 |
| bgHeader              | string              | --gdg-bg-header               | The header background color                                                                       |
| bgHeaderHasFocus      | string              | --gdg-bg-header-has           | The header background color when its column contains the selected cell                            |
| bgHeaderHovered       | string              | --gdg-bg-header-hovered       | The header background color when it is hovered                                                    |
| bgBubble              | string              | --gdg-bg-bubble               | The background color used in bubbles                                                              |
| bgBubbleSelected      | string              | --gdg-bg-bubble-selected      | The background color used in bubbles when the cell is selected                                    |
| bgSearchResult        | string              | --gdg-bg-search-result        | The background color used for cells which match the search string                                 |
| borderColor           | string              | --gdg-border-color            | The color of all vertical borders and horizontal borders if a horizontal override is not provided |
| horizontalBorderColor | string \| undefined | --gdg-horizontal-border-color | The horizontal border color override                                                              |
| drilldownBorder       | string              | --gdg-drilldown-border        | The ring color of a drilldown cell                                                                |
| linkColor             | string              | --gdg-link-color              | What color to render links                                                                        |
| cellHorizontalPadding | number              | --gdg-cell-horizontal-padding | The internal horizontal padding size of a cell.                                                   |
| cellVerticalPadding   | number              | --gdg-cell-vertical-padding   | The internal vertical padding size of a cell.                                                     |
| headerFontStyle       | string              | --gdg-header-font-style       | The font style of the header. e.g. `bold 15px`                                                    |
| baseFontStyle         | string              | --gdg-base-font-style         | The font style used for cells by default, e.g. `13px`                                             |
| fontFamily            | string              | --gdg-font-family             | The font family used by the data grid.                                                            |
| editorFontSize        | string              | --gdg-editor-font-size        | The font size used by overlay editors.                                                            |
| lineHeight            | number              | None                          | A unitless scaler which defines the height of a line of text relative to the ink size.            |

---

## updateCells

Example usage:

```ts
dataGridRef.current.updateCells([{ cell: [10, 10] }, { cell: [11, 10] }, { cell: [12, 10] }]);
```

Causes the data grid to rerender these specific cells. Rerendering a single cell is significantly faster than invalidating the `getCellContent` callback as in the latter case all cells must be redrawn.

---

## getBounds

```ts
getBounds: (col?: number, row?: number) => Rectangle | undefined;
```

`getBounds` returns the current bounding box of a cell. This does not need to be a currently rendered cell. If called with `col` and `row` as undefined, the bounding box of the entire data grid scroll area is returned.

---

## scrollTo

```ts
scrollTo: (
        col: number,
        row: number,
        dir?: "horizontal" | "vertical" | "both",
        paddingX?: number,
        paddingY?: number
    ) => void;
```

Requests the data grid to scroll to a particular location. If only one direction is requested it will get as close as it can without scrolling the off axis. Padding can be applied to inset the cell by a certain amount.

---

| [focus](#focus) | Focuses the data grid. |
| [emit](#emit) | Used to emit commands normally emitted by keyboard shortcuts. |

## appendRow

```ts
appendRow: (col: number, openOverlay: boolean = true) => Promise<void>;
```

Appends a row to the data grid.

---

## focus

```ts
focus: () => void;
```

Causes the data grid to become focused.

---

## emit

```ts
type EmitEvents = "copy" | "paste" | "delete" | "fill-right" | "fill-down";

emit: (eventName: EmitEvents) => Promise<void>;
```

Emits the event into the data grid as if the user had pressed the keyboard shortcut.

---

## columns

```ts
columns: readonly GridColumn[];
```

`columns` is an array of objects of type `GridColumn` describing the column headers. The length of the array is the number of columns to display.

---

## rows

```ts
rows: number;
```

`rows` is the number of rows to display.

---

## getCellContent

```ts
getCellContent: (cell: Item) => GridCell;
```

`getCellContent` returns an object of type `GridCell` describing the contents for the cell at the given coordinates.

---

## freezeColumns

```ts
freezeColumns?: number;
```

Set to a positive number to freeze columns on the left side of the grid during horizontal scrolling.

---

## getCellsForSelection

```ts
type CellArray = readonly (readonly GridCell[])[];
type GetCellsThunk = () => Promise<CellArray>;

getCellsForSelection?: true | (selection: Rectangle) => CellArray | GetCellsThunk;
```

`getCellsForSelection` is called when the user copies a selection to the clipboard or the data editor needs to inspect data which may be outside the curently visible range. It must return a two-dimensional array (an array of rows, where each row is an array of cells) of the cells in the selection's rectangle. Note that the rectangle can include cells that are not currently visible.

If `true` is passed instead of a callback, the data grid will internally use the `getCellContent` callback to provide a basic implementation of `getCellsForSelection`. This can make it easier to light up more data grid functionality, but may have negative side effects if your data source is not able to handle being queried for data outside the normal window.

If `getCellsForSelection` returns a thunk, the data may be loaded asynchronously, however the data grid may be unable to properly react to column spans when performing range selections. Copying large amounts of data out of the grid will depend on the performance of the thunk as well.

---

## markdownDivCreateNode

```ts
markdownDivCreateNode?: (content: string) => DocumentFragment;
```

If `markdownDivCreateNode` is specified, then it will be used to render Markdown, instead of the default Markdown renderer used by the Grid. You'll want to use this if you need to process your Markdown for security purposes, or if you want to use a renderer with different Markdown features.

---

## onVisibleRegionChanged

```ts
onVisibleRegionChanged?: (
    range: Rectangle,
    tx: number,
    ty: number,
    extras: { selected?: Item; freezeRegion?: Rectangle };
) => void;
```

`onVisibleRegionChanged` is called whenever the visible region changed. The new visible region is passed as a `Rectangle`. The x and y transforms of the cell region are passed as `tx` and `ty`. The current selection and frozen region are passed in the `extras` object.

---

## provideEditor

```ts
export type ProvideEditorComponent<T extends InnerGridCell> = React.FunctionComponent<{
    readonly onChange: (newValue: T) => void;
    readonly onFinishedEditing: (newValue?: T, movement?: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly isHighlighted: boolean;
    readonly value: T;
    readonly initialValue?: string;
    readonly validatedSelection?: SelectionRange;
    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
    readonly target: Rectangle;
    readonly forceEditMode: boolean;
    readonly isValid?: boolean;
}>;

export type ProvideEditorCallbackResult<T extends InnerGridCell> =
    | (ProvideEditorComponent<T> & {
          disablePadding?: boolean;
          disableStyling?: boolean;
      })
    | ObjectEditorCallbackResult<T>
    | undefined;

export type ProvideEditorCallback<T extends InnerGridCell> = (cell: T) => ProvideEditorCallbackResult<T>;

provideEditor?: ProvideEditorCallback<GridCell>;
```

When provided the `provideEditor` callbacks job is to be a constructor for functional components which have the correct properties to be used by the data grid as an editor. The editor must implement `onChange` and `onFinishedEditing` callbacks as well support the `isHighlighted` flag which tells the editor to begin with any editable text pre-selected so typing will immediately begin to overwrite it.

---

## rowHeight

```ts
rowHeight: number | ((index: number) => number);
```

`rowHeight` is the height of a row in the table. It defaults to `34`. By passing a function instead of a number you can give different heights to each row. The `index` is the zero-based absolute row index.

---

## rowMarkers

```ts
rowMarkers?: "checkbox" | "number" | "both" | "none";
```

`rowMarkers` determines whether to display the marker column on the very left. It defaults to `none`. Note that this column doesn't count as a table column, i.e. it has no index, and doesn't change column indexes.

---

## smoothScroll

```ts
smoothScrollX?: boolean;
smoothScrollY?: boolean;
```

Controls smooth scrolling in the data grid. Defaults to `false`. If smooth scrolling is not enabled the grid will always be cell aligned in the non-smooth scrolling axis.

---

## fixedShadow

```ts
fixedShadowX?: boolean;
fixedShadowY?: boolean;
```

Controls shadows behind fixed columns and header rows. Defaults to `true`.

---

## showSearch

```ts
showSearch?: boolean;
```

`showSearch` causes the search box built into the data grid to become visible. The data grid does not provide an in-built way to show the search box, so it is suggested to hook into the ctrl/cmd+f accelerator or add a button to your apps chrome.

---

## onSearchClose

```ts
onSearchClose?: () => void;
```

If `onSearchClose` is not provided and `showSearch` is set to true, the search box will be shown but there will be no close button. Providing an `onSearchClose` callback enables the close button and the event will emit when it is clicked.

---

## drawCell

```ts
drawCell?: (args: {
    ctx: CanvasRenderingContext2D;
    cell: GridCell;
    theme: Theme;
    rect: Rectangle;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    highlighted: boolean;
    imageLoader: ImageWindowLoader;
}) => boolean;
```

You can specify `drawCell` to enable rendering your own cells. The Grid will call this for every cell it needs to render. It should either render the cell and return `true`, or not render anything and return `false`, in which case the Grid will render the cell.

---

## drawHeader

```ts
drawHeader?: (args: {
    ctx: CanvasRenderingContext2D;
    column: GridColumn;
    theme: Theme;
    rect: Rectangle;
    hoverAmount: number;
    isSelected: boolean;
    isHovered: boolean;
    hasSelectedCell: boolean;
    spriteManager: SpriteManager;
    menuBounds: Rectangle;
}) => boolean;
```

`drawHeader` may be specified to override the rendering of a header. The grid will call this for every header it needs to render. Header rendering is not as well optimized because they do not redraw as often, but very heavy drawing methods can negatively impact horizontal scrolling performance. The return result works the same way as `drawCell`, `false` means the default rendering will happen and `true` means the default rendering will not happen.

It is possible to return `false` after rendering just a background and the regular foreground rendering will happen.

---

## getGroupDetails

```ts
getGroupDetails?: (groupName: string) => ({
    name: string;
    icon?: string;
    overrideTheme?: Partial<Theme>;
    actions?: {
        title: string;
        onClick: (e: GridMouseGroupHeaderEventArgs) => void;
        icon: GridColumnIcon | string;
    }[];
});
```

`getGroupDetails` is invoked whenever a group header is rendered. The group details are used to provide a name override for the group as well as an icon, a list of actions which can be activated by the user, and an overrideTheme which will impact the rendering of all child cells of the group and all column headers in the group.

---

## getRowThemeOverride

```ts
getRowThemeOverride?: (row: number) => Partial<Theme> | undefined;
```

Whenever a row is rendered the row theme override is fetched if provided. This function should aim to be extremely fast as it may be invoked many times per render. All cells in the row have this theme merged into their theme prior to rendering.

---

## groupHeaderHeight

```ts
groupHeaderHeight?: number;
```

The height of the group headers in the data grid. If not provided this will default to the [`headerHeight`](#headerheight) value.

---

## headerHeight

```ts
headerHeight: number;
```

`headerHeight` is the height of the table header. It defaults to `36`.

---

## headerIcons

```ts
headerIcons?: Record<string, (spriteProps: { fgColor: string, bgColor: string }) => string>;
```

Providing custom header icons to the data grid must be done with a somewhat non-standard mechanism to allow theming and scaling. The `headerIcons` property takes a dictionary which maps icon names to functions which can take a foreground and background color and returns back a string representation of an svg. The svg should contain a header similar to this `<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">` and interpolate the fg/bg colors into the string.

We recognize this process is not fantastic from a graphics workflow standpoint, improvements are very welcome here.

---

## overscroll

```ts
overscrollX?: number;
overscrollY?: number;
```

The overscroll properties are used to allow the grid to scroll past the logical end of the content by a fixed number of pixels. This is useful particularly on the X axis if you allow for resizing columns as it can make resizing the final column significantly easier.

---

## rightElement

```ts
rightElementProps?: {
    readonly sticky?: boolean;
    readonly fill?: boolean;
};
rightElement?: React.ReactNode;
```

The right element is a DOM node which can be inserted at the end of the horizontal scroll region. This can be used to create a right handle panel, make a big add button, or display messages. If `rightElementProps.sticky` is set to true the right element will be visible at all times, otherwise the user will need to scroll to the end to reveal it.

If `rightElementProps.fill` is set, the right elements container will fill to consume all remaining space (if any) at the end of the grid. This does not play nice with growing columns.

---

## rowMarkerWidth

```ts
rowMarkerWidth?: number;
```

`rowMarkerWidth` is the width of the marker column on the very left. By default, it adapts based on the number of rows in your data set.

---

## rowMarkerStartIndex

```ts
rowMarkerStartIndex?: number;
```

`rowMarkerStartIndex` is the starting index of your rows. Defaults to 1, however a custom value may be needed for situations such as paging.

---

## verticalBorder

```ts
verticalBorder?: ((col: number) => boolean) | boolean;
```

Controls the drawing of the left hand vertical border of a column. If set to a boolean value it controls all borders. Defaults to `true`.

---

## gridSelection

```ts
gridSelection?: GridSelection;
onGridSelectionChange?: (newSelection: GridSelection | undefined) => void;
```

The currently selected `cell` and `range` in the data grid. If provided the `onGridSelectionChange` event should also be used as this property is controlled via that event. If this property is not provided, nor should the `onGridSelectionChange` event be.

---

## spanRangeBehavior

```ts
spanRangeBehavior?: "default" | "allowPartial";
```

If set to `default` the `gridSelection` will always be expanded to fully include any spans within it. This means in some cases the `range` of the selection may be inflated to the size of the entire sheet, however the user will be unable to highlight partial spans.

If `allowPartial` is set no inflation behavior will be enforced.

---

## onSelectionCleared

```ts
onSelectionCleared?: () => void;
```

Emitted when the current selection is cleared, usually when the user presses "Escape". `rowSelection`, `columnSelection`, and `gridSelection` should all be empty when this event is emitted. This event only emits when the user explicitly attempts to clear the selection.

---

## rangeSelect

```ts
rangeSelect?: "none" | "cell" | "rect" | "multi-cell" | "multi-rect"; // default rect
columnSelect?: "none" | "single" | "multi"; // default multi
rowSelect?: "none" | "single" | "multi"; // default multi
```

Controls if multi-selection is allowed. If disabled, shift/ctrl/command clicking will work as if no modifiers are pressed.

When range select is set to cell, only one cell may be selected at a time. When set to rect one one rect at a time. The multi variants allow for multiples of the rect or cell to be selected.

---

## rangeSelectionBlending

```ts
rangeSelectionBlending?: "exclusive" | "mixed"; // default exclusive
columnSelectionBlending?: "exclusive" | "mixed"; // default exclusive
rowSelectionBlending?: "exclusive" | "mixed"; // default exclusive
```

Controls which types of selections can exist at the same time in the grid. If selection blending is set to exclusive, the grid will clear other types of selections when the exclusive selection is made. By default row, column, and range selections are exclusive.

---

## highlightRegions

```ts
interface Highlight {
    readonly color: string;
    readonly range: Rectangle;
}

highlightRegions?: readonly Highlight[];
```

Highlight regions are regions on the grid which get drawn with a background color and a dashed line around the region. The color string must be css parseable and the opacity will be removed for the drawing of the dashed line. Opacity should be used to allow overlapping selections to properly blend in background colors.

---

## fillHandle

```ts
fillHandle?: boolean;
```

Controls the visibility of the fill handle used for filling cells with the mouse.

---

## onDelete

```ts
onDelete?: (selection: GridSelection) => GridSelection | boolean;
```

`onDelete` is called when the user deletes one or more rows. `gridSelection` is current selection. If the callback returns false, deletion will not happen. If it returns true, all cells inside all selected rows, columns and ranges will be deleted. If the callback returns a GridSelection, the newly returned selection will be deleted instead.

---

## imageEditorOverride

```ts
imageEditorOverride?: ImageEditorType;
```

If `imageEditorOverride` is specified, then it will be used instead of the default image editor overlay, which is what the user sees when they double-click on an image cell.

---

## onCellEdited

```ts
onCellEdited?: (cell: Item, newValue: EditableGridCell) => void;
onCellsEdited?: (newValues: readonly { location: Item; value: EditableGridCell }[]) => boolean | void;
```

`onCellEdited` is called when the user finishes editing a cell. Note that you are responsible for setting the new value of the cell.

`onCellsEdited` is called whenever a batch of cells is about to be edited. If the callback returns `true`, `onCellEdited` will not be called for an cells in the event.

---

## onDeleteRows

```ts
onDeleteRows?: (rows: readonly number[]) => void;
```

`onDeleteRows` is called when the user deletes one or more rows. `rows` is an array with the absolute indexes of the deletes rows. Note that it is on you to actually effect the deletion of those rows.

---

## onFinishedEditing

```ts
onFinishedEditing?: (newValue: GridCell | undefined, movement: Item) => void;
```

Emitted whenever the data grid exits edit mode. The movement indicates which direction the user requested the selection move towards. `-1` is left/up, `1` is right/down.

---

## onGroupHeaderRenamed

```ts
onGroupHeaderRenamed?: (groupName: string, newVal: string) => void
```

If provided group headers will have an icon allowing users to rename them. When a user renames a group header this event will be emitted. It is up to the developer to actually rename the header.

---

## onPaste

```ts
onPaste?: ((target: Item, values: readonly (readonly string[])[]) => boolean) | boolean;
```

`onPaste` is called when data is pasted into the grid. If left undefined, the `DataEditor` will operate in a fallback mode and attempt to paste the text buffer into the current cell assuming the current cell is not readonly and can accept the data type. If `onPaste` is set to false or the function returns false, the grid will simply ignore paste. If `onPaste` evaluates to true the grid will attempt to split the data by tabs and newlines and paste into available cells.

The grid will not attempt to add additional rows if more data is pasted then can fit. In that case it is advisable to simply return false from onPaste and handle the paste manually.

---

## trailingRowOptions

```ts
trailingRowOptions?: {
    readonly tint?: boolean; // DataEditor level only
    readonly sticky?: boolean; // DataEditor level only
    readonly hint?: string;
    readonly addIcon?: string;
    readonly targetColumn?: number | GridColumn;
    readonly themeOverride?: Partial<Theme>; // GridColumn only
    readonly disabled?: boolean; // GridColumn only
}
onRowAppended?: () => void;
```

`onRowAppended` controls adding new rows at the bottom of the Grid. If `onRowAppended` is defined, an empty row will display at the bottom. When the user clicks on one of its cells, `onRowAppended` is called, which is responsible for appending the new row. The appearance of the blank row can be configured using `trailingRowOptions`.

---

## maxColumnWidth

```ts
maxColumnWidth?: number;
minColumnWidth?: number;
```

If `maxColumnWidth` is set with a value greater than 50, then columns will have a maximum size of that many pixels.
If the value is less than 50, it will be increased to 50. If it isn't set, the default value will be 500.

---

## onCellClicked

```ts
onCellClicked?: (cell: Item) => void;
```

`onCellClicked` is called whenever the user clicks a cell in the grid.

---

## onCellActivated

```ts
onCellActivated?: (cell: Item) => void;
```

`onCellActivated` is called whenever the user double clicks, taps Enter, or taps Space on a cell in the grid.

---

## onCellContextMenu

---

## onColumnMoved

```ts
onColumnMoved?: (startIndex: number, endIndex: number) => void;
```

`onColumnMoved` is called when the user finishes moving a column. `startIndex` is the index of the column that was moved, and `endIndex` is the index at which it should end up. Note that you have to effect the move of the column, and pass the reordered columns back in the `columns` property.

---

## onColumnResize

```ts
onColumnResize?: (column: GridColumn, newSize: number, columnIndex: number) => void;
```

`onColumnResize` is called when the user is resizing a column. `newSize` is the new size of the column. Note that you have change the size of the column in the `GridColumn` and pass it back to the grid in the `columns` property.

## onColumnResizeStart

```ts
onColumnResizeStart?: (column: GridColumn, newSize: number, columnIndex: number) => void;
```

`onColumnResize` is called when the user starts resizing a column. `newSize` is the new size of the column.

## onColumnResizeEnd

```ts
onColumnResizeEnd?: (column: GridColumn, newSize: number, columnIndex: number) => void;
```

`onColumnResize` is called when the user ends resizing a column. `newSize` is the new size of the column.

---

## onGroupHeaderClicked

```ts
onGroupHeaderClicked?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
```

Emitted whenever a group header is clicked.

---

## onGroupHeaderContextMenu

```ts
onGroupHeaderContextMenu?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void
```

Emitted whenever a group header's context menu should be presented, usually right click.

---

## onHeaderClicked

```ts
onHeaderClicked?: (colIndex: number, event: HeaderClickedEventArgs) => void;
```

Emitted whenever a header is clicked.

---

## onHeaderContextMenu

```ts
onHeaderContextMenu?: (colIndex: number, event: HeaderClickedEventArgs) => void;
```

Emitted whenever a column header's context menu should be presented, usually right click.

---

## onHeaderMenuClick

```ts
onHeaderMenuClick?: (col: number, screenPosition: Rectangle) => void;
```

`onHeaderMenuClick` is called when the user clicks the menu button on a column header. `col` is the column index, and `screenPosition` is the bounds of the column header. You are responsible for drawing and handling the menu.

---

## onItemHovered

```ts
onItemHovered?: (args: GridMouseEventArgs) => void;
```

`onItemHovered` is called when the user hovers over a cell, a header, or outside the grid.

---

## onMouseMove

```ts
onMouseMove?: (args: GridMouseEventArgs) => void;
```

Emitted any time the mouse moves. Most behaviors relying on this should be debounced for performance reasons.

---

## onRowMoved

```ts
onRowMoved?: (startIndex: number, endIndex: number) => void;
```

Called whenever a row re-order operation is completed. Setting the callback enables re-ordering by dragging the first column of a row.

---

## preventDiagonalScrolling

```ts
preventDiagonalScrolling?: booling;
```

Set to true to prevent any diagonal scrolling.

---

## rowSelectionMode

```ts
rowSelectionMode?: "auto" | "multi";
```

`rowSelectionMode` changes how selecting a row marker behaves. In auto mode it adapts to touch or mouse environments automatically, in multi-mode it always acts as if the multi key (Ctrl) is pressed.

---

## showMinimap

```ts
showMinimap?: boolean;
```

Enables/disables the interactive minimap. Default to `false`.

---

## scrollToEnd

```ts
scrollToEnd?: boolean;
```

When this property changes to `true`, the Grid will scroll all the way to the right. Glide uses that when the user clicks the "Add Column" button.

---

## validateCell

```ts
readonly validateCell?: (cell: Item, newValue: EditableGridCell) => boolean | EditableGridCell;
```

When returns false indicates to the user the value will not be accepted. When returns a new GridCell the value is coerced to match.

---

## isDraggable

```ts
isDraggable?: boolean;
onDragStart?: (args: GridDragEventArgs) => void;
```

If `isDraggable` is set, the whole Grid is draggable, and `onDragStart` will be called when dragging starts. You can use this to build a UI where the user can drag the Grid around.

---

## experimental

Behavior not defined or officially supported. Feel free to check out what this does in github but anything in here is up for grabs to be changed at any time.

---

# Hooks

## useCustomCells

```ts
// arguments passed to the draw callback
interface DrawArgs {
    ctx: CanvasRenderingContext2D;
    theme: Theme;
    rect: Rectangle;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    col: number;
    row: number;
    highlighted: boolean;
    imageLoader: ImageWindowLoader;
}

// a standardized cell renderer consumed by the hook
type CustomCellRenderer<T extends CustomCell> = {
    isMatch: (cell: CustomCell) => cell is T;
    draw: (args: DrawArgs, cell: T) => boolean;
    provideEditor: ProvideEditorCallback<T>;
};

// the hook itself
declare function useCustomCells(
    cells: readonly CustomCellRenderer<any>[]
): { drawCell: DrawCustomCellCallback; provideEditor: ProvideEditorCallback<GridCell> };
```

The useCustomCells hook provides a standardized method of integrating custom cells into the Glide Data Grid. All cells in the `@glideapps/glide-data-grid-source` package are already in this format and can be used individually by passing them to this hook as so. The result of the hook is an object which can be spread on the DataEditor to implement the cells.

```tsx
import StarCell from "@glideapps/glide-data-grid-cells/cells/star-cell";
import DropdownCell from "@glideapps/glide-data-grid-cells/cells/dropdown-cell";

const MyGrid = () => {
    const args = useCustomCells([StarCell, DropdownCell]);

    return <DataEditor {...args} />;
};
```
