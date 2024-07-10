import * as React from "react";
import { type EditableGridCell, type GridCell, type GridSelection, type Rectangle, type InnerGridCell, CompactSelection, type ProvideEditorCallback, type GridColumn, type Item, type ValidatedGridCell, type ImageEditorType, type FillHandleDirection, type EditListItem, type CellActiviationBehavior } from "../internal/data-grid/data-grid-types.js";
import { type DataGridSearchProps } from "../internal/data-grid-search/data-grid-search.js";
import { type Theme } from "../common/styles.js";
import type { DataGridRef } from "../internal/data-grid/data-grid.js";
import { type SelectionBlending } from "../internal/data-grid/use-selection-behavior.js";
import type { CustomRenderer, InternalCellRenderer } from "../cells/cell-types.js";
import { type HeaderClickedEventArgs, type GroupHeaderClickedEventArgs, type CellClickedEventArgs, type FillPatternEventArgs } from "../internal/data-grid/event-args.js";
import { type Keybinds } from "./data-editor-keybindings.js";
import { type RowGroupingOptions } from "./row-grouping.js";
export interface RowMarkerOptions {
    kind: "checkbox" | "number" | "clickable-number" | "checkbox-visible" | "both" | "none";
    checkboxStyle?: "circle" | "square";
    startIndex?: number;
    width?: number;
    theme?: Partial<Theme>;
    headerTheme?: Partial<Theme>;
    headerAlwaysVisible?: boolean;
}
type Props = Partial<Omit<DataGridSearchProps, "accessibilityHeight" | "canvasRef" | "cellXOffset" | "cellYOffset" | "className" | "clientSize" | "columns" | "disabledRows" | "drawFocusRing" | "enableGroups" | "firstColAccessible" | "firstColSticky" | "freezeColumns" | "hasAppendRow" | "getCellContent" | "getCellRenderer" | "getCellsForSelection" | "getRowThemeOverride" | "gridRef" | "groupHeaderHeight" | "headerHeight" | "isFilling" | "isFocused" | "imageWindowLoader" | "lockColumns" | "maxColumnWidth" | "minColumnWidth" | "nonGrowWidth" | "onCanvasBlur" | "onCanvasFocused" | "onCellFocused" | "onContextMenu" | "onDragEnd" | "onMouseDown" | "onMouseMove" | "onMouseUp" | "onVisibleRegionChanged" | "rowHeight" | "rows" | "scrollRef" | "searchInputRef" | "selectedColumns" | "selection" | "theme" | "translateX" | "translateY" | "verticalBorder">>;
type EmitEvents = "copy" | "paste" | "delete" | "fill-right" | "fill-down";
/**
 * @category DataEditor
 */
export interface DataEditorProps extends Props, Pick<DataGridSearchProps, "imageWindowLoader"> {
    /** Emitted whenever the user has requested the deletion of the selection.
     * @group Editing
     */
    readonly onDelete?: (selection: GridSelection) => boolean | GridSelection;
    /** Emitted whenever a cell edit is completed.
     * @group Editing
     */
    readonly onCellEdited?: (cell: Item, newValue: EditableGridCell) => void;
    /** Emitted whenever a cell mutation is completed and provides all edits inbound as a single batch.
     * @group Editing
     */
    readonly onCellsEdited?: (newValues: readonly EditListItem[]) => boolean | void;
    /** Emitted whenever a row append operation is requested. Append location can be set in callback.
     * @group Editing
     */
    readonly onRowAppended?: () => Promise<"top" | "bottom" | number | undefined> | void;
    /** Emitted when a column header should show a context menu. Usually right click.
     * @group Events
     */
    readonly onHeaderClicked?: (colIndex: number, event: HeaderClickedEventArgs) => void;
    /** Emitted when a group header is clicked.
     * @group Events
     */
    readonly onGroupHeaderClicked?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
    /** Emitted whe the user wishes to rename a group.
     * @group Events
     */
    readonly onGroupHeaderRenamed?: (groupName: string, newVal: string) => void;
    /** Emitted when a cell is clicked.
     * @group Events
     */
    readonly onCellClicked?: (cell: Item, event: CellClickedEventArgs) => void;
    /** Emitted when a cell is activated, by pressing Enter, Space or double clicking it.
     * @group Events
     */
    readonly onCellActivated?: (cell: Item) => void;
    /**
     * Emitted whenever the user initiats a pattern fill using the fill handle. This event provides both
     * a patternSource region and a fillDestination region, and can be prevented.
     * @group Editing
     */
    readonly onFillPattern?: (event: FillPatternEventArgs) => void;
    /** Emitted when editing has finished, regardless of data changing or not.
     * @group Editing
     */
    readonly onFinishedEditing?: (newValue: GridCell | undefined, movement: Item) => void;
    /** Emitted when a column header should show a context menu. Usually right click.
     * @group Events
     */
    readonly onHeaderContextMenu?: (colIndex: number, event: HeaderClickedEventArgs) => void;
    /** Emitted when a group header should show a context menu. Usually right click.
     * @group Events
     */
    readonly onGroupHeaderContextMenu?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
    /** Emitted when a cell should show a context menu. Usually right click.
     * @group Events
     */
    readonly onCellContextMenu?: (cell: Item, event: CellClickedEventArgs) => void;
    /** Used for validating cell values during editing.
     * @group Editing
     * @param cell The cell which is being validated.
     * @param newValue The new value being proposed.
     * @param prevValue The previous value before the edit.
     * @returns A return of false indicates the value will not be accepted. A value of
     * true indicates the value will be accepted. Returning a new GridCell will immediately coerce the value to match.
     */
    readonly validateCell?: (cell: Item, newValue: EditableGridCell, prevValue: GridCell) => boolean | ValidatedGridCell;
    /** The columns to display in the data grid.
     * @group Data
     */
    readonly columns: readonly GridColumn[];
    /** Controls the trailing row used to insert new data into the grid.
     * @group Editing
     */
    readonly trailingRowOptions?: {
        /** If the trailing row should be tinted */
        readonly tint?: boolean;
        /** A hint string displayed on hover. Usually something like "New row" */
        readonly hint?: string;
        /** When set to true, the trailing row is always visible. */
        readonly sticky?: boolean;
        /** The icon to use for the cell. Either a GridColumnIcon or a member of the passed headerIcons */
        readonly addIcon?: string;
        /** Overrides the column to focus when a new row is created. */
        readonly targetColumn?: number | GridColumn;
    };
    /** Controls the height of the header row
     * @defaultValue 36
     * @group Style
     */
    readonly headerHeight?: number;
    /** Controls the header of the group header row
     * @defaultValue `headerHeight`
     * @group Style
     */
    readonly groupHeaderHeight?: number;
    /**
     * The number of rows in the grid.
     * @group Data
     */
    readonly rows: number;
    /** Determines if row markers should be automatically added to the grid.
     * Interactive row markers allow the user to select a row.
     *
     * - "clickable-number" renders a number that can be clicked to
     *   select the row
     * - "both" causes the row marker to show up as a number but
     *   reveal a checkbox when the marker is hovered.
     *
     * @defaultValue `none`
     * @group Style
     */
    readonly rowMarkers?: RowMarkerOptions["kind"] | RowMarkerOptions;
    /**
     * Sets the width of row markers in pixels, if unset row markers will automatically size.
     * @group Style
     * @deprecated Use `rowMarkers` instead.
     */
    readonly rowMarkerWidth?: number;
    /** Changes the starting index for row markers.
     * @defaultValue 1
     * @group Style
     * @deprecated Use `rowMarkers` instead.
     */
    readonly rowMarkerStartIndex?: number;
    /** Changes the theme of the row marker column
     * @group Style
     * @deprecated Use `rowMarkers` instead.
     */
    readonly rowMarkerTheme?: Partial<Theme>;
    /** Sets the width of the data grid.
     * @group Style
     */
    readonly width?: number | string;
    /** Sets the height of the data grid.
     * @group Style
     */
    readonly height?: number | string;
    /** Custom classname for data grid wrapper.
     * @group Style
     */
    readonly className?: string;
    /** If set to `default`, `gridSelection` will be coerced to always include full spans.
     * @group Selection
     * @defaultValue `default`
     */
    readonly spanRangeBehavior?: "default" | "allowPartial";
    /** Controls which types of selections can exist at the same time in the grid. If selection blending is set to
     * exclusive, the grid will clear other types of selections when the exclusive selection is made. By default row,
     * column, and range selections are exclusive.
     * @group Selection
     * @defaultValue `exclusive`
     * */
    readonly rangeSelectionBlending?: SelectionBlending;
    /** {@inheritDoc rangeSelectionBlending}
     * @group Selection
     */
    readonly columnSelectionBlending?: SelectionBlending;
    /** {@inheritDoc rangeSelectionBlending}
     * @group Selection
     */
    readonly rowSelectionBlending?: SelectionBlending;
    /** Controls if multi-selection is allowed. If disabled, shift/ctrl/command clicking will work as if no modifiers
     * are pressed.
     *
     * When range select is set to cell, only one cell may be selected at a time. When set to rect one one rect at a
     * time. The multi variants allow for multiples of the rect or cell to be selected.
     * @group Selection
     * @defaultValue `rect`
     */
    readonly rangeSelect?: "none" | "cell" | "rect" | "multi-cell" | "multi-rect";
    /** {@inheritDoc rangeSelect}
     * @group Selection
     * @defaultValue `multi`
     */
    readonly columnSelect?: "none" | "single" | "multi";
    /** {@inheritDoc rangeSelect}
     * @group Selection
     * @defaultValue `multi`
     */
    readonly rowSelect?: "none" | "single" | "multi";
    /** Controls if range selection is allowed to span columns.
     * @group Selection
     * @defaultValue `true`
     */
    readonly rangeSelectionColumnSpanning?: boolean;
    /** Sets the initial scroll Y offset.
     * @see {@link scrollOffsetX}
     * @group Advanced
     */
    readonly scrollOffsetY?: number;
    /** Sets the initial scroll X offset
     * @see {@link scrollOffsetY}
     * @group Advanced
     */
    readonly scrollOffsetX?: number;
    /** Determins the height of each row.
     * @group Style
     * @defaultValue 34
     */
    readonly rowHeight?: DataGridSearchProps["rowHeight"];
    /** Fires whenever the mouse moves
     * @group Events
     * @param args
     */
    readonly onMouseMove?: DataGridSearchProps["onMouseMove"];
    /**
     * The minimum width a column can be resized to.
     * @defaultValue 50
     * @group Style
     */
    readonly minColumnWidth?: DataGridSearchProps["minColumnWidth"];
    /**
     * The maximum width a column can be resized to.
     * @defaultValue 500
     * @group Style
     */
    readonly maxColumnWidth?: DataGridSearchProps["maxColumnWidth"];
    /**
     * The maximum width a column can be automatically sized to.
     * @defaultValue `maxColumnWidth`
     * @group Style
     */
    readonly maxColumnAutoWidth?: number;
    /**
     * Used to provide an override to the default image editor for the data grid. `provideEditor` may be a better
     * choice for most people.
     * @group Advanced
     * */
    readonly imageEditorOverride?: ImageEditorType;
    /**
     * If specified, it will be used to render Markdown, instead of the default Markdown renderer used by the Grid.
     * You'll want to use this if you need to process your Markdown for security purposes, or if you want to use a
     * renderer with different Markdown features.
     * @group Advanced
     */
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
    /**
     * Allows overriding the theme of any row
     * @param row represents the row index of the row, increasing by 1 for every represented row. Collapsed rows are not included.
     * @param groupRow represents the row index of the group row. Only distinct when row grouping enabled.
     * @param contentRow represents the index of the row excluding group headers. Only distinct when row grouping enabled.
     * @returns
     */
    readonly getRowThemeOverride?: (row: number, groupRow: number, contentRow: number) => Partial<Theme> | undefined;
    /** Callback for providing a custom editor for a cell.
     * @group Editing
     */
    readonly provideEditor?: ProvideEditorCallback<GridCell>;
    /**
     * Allows coercion of pasted values.
     * @group Editing
     * @param val The pasted value
     * @param cell The cell being pasted into
     * @returns `undefined` to accept default behavior or a `GridCell` which should be used to represent the pasted value.
     */
    readonly coercePasteValue?: (val: string, cell: GridCell) => GridCell | undefined;
    /**
     * Emitted when the grid selection is cleared.
     * @group Selection
     */
    readonly onSelectionCleared?: () => void;
    /**
     * The current selection of the data grid. Contains all selected cells, ranges, rows, and columns.
     * Used in conjunction with {@link onGridSelectionChange}
     * method to implement a controlled selection.
     * @group Selection
     */
    readonly gridSelection?: GridSelection;
    /**
     * Emitted whenever the grid selection changes. Specifying
     * this function will make the grid’s selection controlled, so
     * so you will need to specify {@link gridSelection} as well. See
     * the "Controlled Selection" example for details.
     *
     * @param newSelection The new gridSelection as created by user input.
     * @group Selection
     */
    readonly onGridSelectionChange?: (newSelection: GridSelection) => void;
    /**
     * Emitted whenever the visible cells change, usually due to scrolling.
     * @group Events
     * @param range An inclusive range of all visible cells. May include cells obscured by UI elements such
     * as headers.
     * @param tx The x transform of the cell region.
     * @param ty The y transform of the cell region.
     * @param extras Contains information about the selected cell and
     * any visible freeze columns.
     */
    readonly onVisibleRegionChanged?: (range: Rectangle, tx: number, ty: number, extras: {
        /** The selected item if visible */
        selected?: Item;
        /** A selection of visible freeze columns
         * @deprecated
         */
        freezeRegion?: Rectangle;
        /**
         * All visible freeze regions
         */
        freezeRegions?: readonly Rectangle[];
    }) => void;
    /**
     * The primary callback for getting cell data into the data grid.
     * @group Data
     * @param cell The location of the cell being requested.
     * @returns A valid GridCell to be rendered by the Grid.
     */
    readonly getCellContent: (cell: Item) => GridCell;
    /**
     * Determines if row selection requires a modifier key to enable multi-selection or not. In auto mode it adapts to
     * touch or mouse environments automatically, in multi-mode it always acts as if the multi key (Ctrl) is pressed.
     * @group Editing
     * @defaultValue `auto`
     */
    readonly rowSelectionMode?: "auto" | "multi";
    /**
     * Add table headers to copied data.
     * @group Editing
     * @defaultValue `false`
     */
    readonly copyHeaders?: boolean;
    /**
     * Determins which keybindings are enabled.
     * @group Editing
     */
    readonly keybindings?: Partial<Keybinds>;
    /**
     * Determines if the data editor should immediately begin editing when the user types on a selected cell
     * @group Editing
     */
    readonly editOnType?: boolean;
    /**
     * Used to fetch large amounts of cells at once. Used for copy/paste, if unset copy will not work.
     *
     * `getCellsForSelection` is called when the user copies a selection to the clipboard or the data editor needs to
     * inspect data which may be outside the curently visible range. It must return a two-dimensional array (an array of
     * rows, where each row is an array of cells) of the cells in the selection's rectangle. Note that the rectangle can
     * include cells that are not currently visible.
     *
     * If `true` is passed instead of a callback, the data grid will internally use the `getCellContent` callback to
     * provide a basic implementation of `getCellsForSelection`. This can make it easier to light up more data grid
     * functionality, but may have negative side effects if your data source is not able to handle being queried for
     * data outside the normal window.
     *
     * If `getCellsForSelection` returns a thunk, the data may be loaded asynchronously, however the data grid may be
     * unable to properly react to column spans when performing range selections. Copying large amounts of data out of
     * the grid will depend on the performance of the thunk as well.
     * @group Data
     * @param {Rectangle} selection The range of requested cells
     * @param {AbortSignal} abortSignal A signal indicating the requested cells are no longer needed
     * @returns A row-major collection of cells or an async thunk which returns a row-major collection.
     */
    readonly getCellsForSelection?: DataGridSearchProps["getCellsForSelection"] | true;
    /** The number of columns which should remain in place when scrolling horizontally. The row marker column, if
     * enabled is always frozen and is not included in this count.
     * @defaultValue 0
     * @group Style
     */
    readonly freezeColumns?: DataGridSearchProps["freezeColumns"];
    /**
     * Controls the drawing of the left hand vertical border of a column. If set to a boolean value it controls all
     * borders.
     * @defaultValue `true`
     * @group Style
     */
    readonly verticalBorder?: DataGridSearchProps["verticalBorder"] | boolean;
    /**
     * Controls the grouping of rows to be drawn in the grid.
     */
    readonly rowGrouping?: RowGroupingOptions;
    /**
     * Called when data is pasted into the grid. If left undefined, the `DataEditor` will operate in a
     * fallback mode and attempt to paste the text buffer into the current cell assuming the current cell is not
     * readonly and can accept the data type. If `onPaste` is set to false or the function returns false, the grid will
     * simply ignore paste. If `onPaste` evaluates to true the grid will attempt to split the data by tabs and newlines
     * and paste into available cells.
     *
     * The grid will not attempt to add additional rows if more data is pasted then can fit. In that case it is
     * advisable to simply return false from onPaste and handle the paste manually.
     * @group Editing
     */
    readonly onPaste?: ((target: Item, values: readonly (readonly string[])[]) => boolean) | boolean;
    /**
     * The theme used by the data grid to get all color and font information
     * @group Style
     */
    readonly theme?: Partial<Theme>;
    readonly renderers?: readonly InternalCellRenderer<InnerGridCell>[];
    /**
     * An array of custom renderers which can be used to extend the data grid.
     * @group Advanced
     */
    readonly customRenderers?: readonly CustomRenderer<any>[];
    /**
     * Scales most elements in the theme to match rem scaling automatically
     * @defaultValue false
     */
    readonly scaleToRem?: boolean;
    /**
     * Custom predicate function to decide whether the click event occurred outside the grid
     * Especially used when custom editor is opened with the portal and is outside the grid, but there is no possibility
     * to add a class "click-outside-ignore"
     * If this function is supplied and returns false, the click event is ignored
     */
    readonly isOutsideClick?: (e: MouseEvent | TouchEvent) => boolean;
    /**
     * Controls which directions fill is allowed in.
     */
    readonly allowedFillDirections?: FillHandleDirection;
    /**
     * Determines when a cell is considered activated and will emit the `onCellActivated` event. Generally an activated
     * cell will open to edit mode.
     */
    readonly cellActivationBehavior?: CellActiviationBehavior;
    /**
     * Controls if focus will trap inside the data grid when doing tab and caret navigation.
     */
    readonly trapFocus?: boolean;
    /**
     * Allows overriding the default amount of bloom (the size growth of the overlay editor)
     */
    readonly editorBloom?: readonly [number, number];
    /**
     * If set to true, the data grid will attempt to scroll to keep the selction in view
     */
    readonly scrollToActiveCell?: boolean;
    readonly drawFocusRing?: boolean | "no-editor";
}
type ScrollToFn = (col: number | {
    amount: number;
    unit: "cell" | "px";
}, row: number | {
    amount: number;
    unit: "cell" | "px";
}, dir?: "horizontal" | "vertical" | "both", paddingX?: number, paddingY?: number, options?: {
    hAlign?: "start" | "center" | "end";
    vAlign?: "start" | "center" | "end";
}) => void;
/** @category DataEditor */
export interface DataEditorRef {
    /**
     * Programatically appends a row.
     * @param col The column index to focus in the new row.
     * @returns A promise which waits for the append to complete.
     */
    appendRow: (col: number, openOverlay?: boolean) => Promise<void>;
    /**
     * Triggers cells to redraw.
     */
    updateCells: DataGridRef["damage"];
    /**
     * Gets the screen space bounds of the requested item.
     */
    getBounds: DataGridRef["getBounds"];
    /**
     * Triggers the data grid to focus itself or the correct accessibility element.
     */
    focus: DataGridRef["focus"];
    /**
     * Generic API for emitting events as if they had been triggered via user interaction.
     */
    emit: (eventName: EmitEvents) => Promise<void>;
    /**
     * Scrolls to the desired cell or location in the grid.
     */
    scrollTo: ScrollToFn;
    /**
     * Causes the columns in the selection to have their natural size recomputed and re-emitted as a resize event.
     */
    remeasureColumns: (cols: CompactSelection) => void;
}
/**
 * The primary component of Glide Data Grid.
 * @category DataEditor
 * @param {DataEditorProps} props
 */
export declare const DataEditor: React.ForwardRefExoticComponent<DataEditorProps & React.RefAttributes<DataEditorRef>>;
export {};
