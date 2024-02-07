/* eslint-disable sonarjs/no-duplicate-string */
import * as React from "react";
import { assert, assertNever, maybe } from "../common/support.js";
import clamp from "lodash/clamp.js";
import uniq from "lodash/uniq.js";
import flatten from "lodash/flatten.js";
import range from "lodash/range.js";
import debounce from "lodash/debounce.js";
import {
    type EditableGridCell,
    type GridCell,
    GridCellKind,
    type GridSelection,
    isEditableGridCell,
    type Rectangle,
    isReadWriteCell,
    type InnerGridCell,
    InnerGridCellKind,
    CompactSelection,
    type Slice,
    isInnerOnlyCell,
    type ProvideEditorCallback,
    type GridColumn,
    isObjectEditorCallbackResult,
    type Item,
    type MarkerCell,
    type ValidatedGridCell,
    type ImageEditorType,
    type CustomCell,
    BooleanEmpty,
    BooleanIndeterminate,
    type FillHandleDirection,
    type EditListItem,
    type CellActiviationBehavior,
} from "../internal/data-grid/data-grid-types.js";
import DataGridSearch, { type DataGridSearchProps } from "../internal/data-grid-search/data-grid-search.js";
import { browserIsOSX } from "../common/browser-detect.js";
import {
    getDataEditorTheme,
    makeCSSStyle,
    type FullTheme,
    type Theme,
    ThemeContext,
    mergeAndRealizeTheme,
} from "../common/styles.js";
import type { DataGridRef } from "../internal/data-grid/data-grid.js";
import { getScrollBarWidth, useEventListener, useStateWithReactiveInput, whenDefined } from "../common/utils.js";
import {
    isGroupEqual,
    itemsAreEqual,
    itemIsInRect,
    gridSelectionHasItem,
    getFreezeTrailingHeight,
} from "../internal/data-grid/render/data-grid-lib.js";
import { GroupRename } from "./group-rename.js";
import { measureColumn, useColumnSizer } from "./use-column-sizer.js";
import { isHotkey } from "../common/is-hotkey.js";
import { type SelectionBlending, useSelectionBehavior } from "../internal/data-grid/use-selection-behavior.js";
import { useCellsForSelection } from "./use-cells-for-selection.js";
import { unquote, expandSelection, copyToClipboard, toggleBoolean } from "./data-editor-fns.js";
import { DataEditorContainer } from "../internal/data-editor-container/data-grid-container.js";
import { useAutoscroll } from "./use-autoscroll.js";
import type { CustomRenderer, CellRenderer, InternalCellRenderer } from "../cells/cell-types.js";
import { decodeHTML, type CopyBuffer } from "./copy-paste.js";
import { useRemAdjuster } from "./use-rem-adjuster.js";
import { withAlpha } from "../internal/data-grid/color-parser.js";
import { combineRects, getClosestRect, pointInRect } from "../common/math.js";
import {
    type HeaderClickedEventArgs,
    type GroupHeaderClickedEventArgs,
    type CellClickedEventArgs,
    type FillPatternEventArgs,
    type GridMouseEventArgs,
    groupHeaderKind,
    outOfBoundsKind,
    type GridMouseCellEventArgs,
    headerKind,
    type GridDragEventArgs,
    mouseEventArgsAreEqual,
    type GridKeyEventArgs,
} from "../internal/data-grid/event-args.js";
import { type Keybinds, useKeybindingsWithDefaults } from "./data-editor-keybindings.js";
import type { Highlight } from "../internal/data-grid/render/data-grid-render.cells.js";
import { useRowGroupingInner, type RowGroupingOptions } from "./row-grouping.js";
import { useRowGrouping } from "./row-grouping-api.js";

const DataGridOverlayEditor = React.lazy(
    async () => await import("../internal/data-grid-overlay-editor/data-grid-overlay-editor.js")
);

// There must be a better way
let idCounter = 0;

export interface RowMarkerOptions {
    kind: "checkbox" | "number" | "clickable-number" | "checkbox-visible" | "both" | "none";
    checkboxStyle?: "circle" | "square";
    startIndex?: number;
    width?: number;
    theme?: Partial<Theme>;
}

interface MouseState {
    readonly previousSelection?: GridSelection;
    readonly fillHandle?: boolean;
}

type Props = Partial<
    Omit<
        DataGridSearchProps,
        | "accessibilityHeight"
        | "canvasRef"
        | "cellXOffset"
        | "cellYOffset"
        | "className"
        | "clientSize"
        | "columns"
        | "disabledRows"
        | "enableGroups"
        | "firstColAccessible"
        | "firstColSticky"
        | "freezeColumns"
        | "hasAppendRow"
        | "getCellContent"
        | "getCellRenderer"
        | "getCellsForSelection"
        | "getRowThemeOverride"
        | "gridRef"
        | "groupHeaderHeight"
        | "headerHeight"
        | "isFilling"
        | "isFocused"
        | "imageWindowLoader"
        | "lockColumns"
        | "maxColumnWidth"
        | "minColumnWidth"
        | "nonGrowWidth"
        | "onCanvasBlur"
        | "onCanvasFocused"
        | "onCellFocused"
        | "onContextMenu"
        | "onDragEnd"
        | "onMouseDown"
        | "onMouseMove"
        | "onMouseUp"
        | "onVisibleRegionChanged"
        | "rowHeight"
        | "rows"
        | "scrollRef"
        | "searchInputRef"
        | "selectedColumns"
        | "selection"
        | "theme"
        | "translateX"
        | "translateY"
        | "verticalBorder"
    >
>;

type EmitEvents = "copy" | "paste" | "delete" | "fill-right" | "fill-down";

function getSpanStops(cells: readonly (readonly GridCell[])[]): number[] {
    return uniq(
        flatten(
            flatten(cells)
                .filter(c => c.span !== undefined)
                .map(c => range((c.span?.[0] ?? 0) + 1, (c.span?.[1] ?? 0) + 1))
        )
    );
}

function shiftSelection(input: GridSelection, offset: number): GridSelection {
    if (input === undefined || offset === 0 || (input.columns.length === 0 && input.current === undefined))
        return input;

    return {
        current:
            input.current === undefined
                ? undefined
                : {
                      cell: [input.current.cell[0] + offset, input.current.cell[1]],
                      range: {
                          ...input.current.range,
                          x: input.current.range.x + offset,
                      },
                      rangeStack: input.current.rangeStack.map(r => ({
                          ...r,
                          x: r.x + offset,
                      })),
                  },
        rows: input.rows,
        columns: input.columns.offset(offset),
    };
}

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
    readonly validateCell?: (
        cell: Item,
        newValue: EditableGridCell,
        prevValue: GridCell
    ) => boolean | ValidatedGridCell;

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
    readonly onVisibleRegionChanged?: (
        range: Rectangle,
        tx: number,
        ty: number,
        extras: {
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
        }
    ) => void;

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
}

type ScrollToFn = (
    col: number | { amount: number; unit: "cell" | "px" },
    row: number | { amount: number; unit: "cell" | "px" },
    dir?: "horizontal" | "vertical" | "both",
    paddingX?: number,
    paddingY?: number,
    options?: {
        hAlign?: "start" | "center" | "end";
        vAlign?: "start" | "center" | "end";
    }
) => void;

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

const loadingCell: GridCell = {
    kind: GridCellKind.Loading,
    allowOverlay: false,
};

const emptyGridSelection: GridSelection = {
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
    current: undefined,
};

const DataEditorImpl: React.ForwardRefRenderFunction<DataEditorRef, DataEditorProps> = (p, forwardedRef) => {
    const [gridSelectionInner, setGridSelectionInner] = React.useState<GridSelection>(emptyGridSelection);

    const [overlay, setOverlay] = React.useState<{
        target: Rectangle;
        content: GridCell;
        theme: FullTheme;
        initialValue: string | undefined;
        cell: Item;
        highlight: boolean;
        forceEditMode: boolean;
    }>();
    const searchInputRef = React.useRef<HTMLInputElement | null>(null);
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const [mouseState, setMouseState] = React.useState<MouseState>();
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const lastSent = React.useRef<[number, number]>();

    const safeWindow = typeof window === "undefined" ? null : window;

    const {
        imageEditorOverride,
        getRowThemeOverride: getRowThemeOverrideIn,
        markdownDivCreateNode,
        width,
        height,
        columns: columnsIn,
        rows: rowsIn,
        getCellContent: getCellContentIn,
        onCellClicked,
        onCellActivated,
        onFillPattern,
        onFinishedEditing,
        coercePasteValue,
        drawHeader: drawHeaderIn,
        drawCell: drawCellIn,
        editorBloom,
        onHeaderClicked,
        onColumnProposeMove,
        spanRangeBehavior = "default",
        onGroupHeaderClicked,
        onCellContextMenu,
        className,
        onHeaderContextMenu,
        getCellsForSelection: getCellsForSelectionIn,
        onGroupHeaderContextMenu,
        onGroupHeaderRenamed,
        onCellEdited,
        onCellsEdited,
        onSearchResultsChanged: onSearchResultsChangedIn,
        searchResults,
        onSearchValueChange,
        searchValue,
        onKeyDown: onKeyDownIn,
        onKeyUp: onKeyUpIn,
        keybindings: keybindingsIn,
        editOnType = true,
        onRowAppended,
        onColumnMoved,
        validateCell: validateCellIn,
        highlightRegions: highlightRegionsIn,
        rangeSelect = "rect",
        columnSelect = "multi",
        rowSelect = "multi",
        rangeSelectionBlending = "exclusive",
        columnSelectionBlending = "exclusive",
        rowSelectionBlending = "exclusive",
        onDelete: onDeleteIn,
        onDragStart,
        onMouseMove,
        onPaste,
        copyHeaders = false,
        freezeColumns = 0,
        cellActivationBehavior = "second-click",
        rowSelectionMode = "auto",
        onHeaderMenuClick,
        onHeaderIndicatorClick,
        getGroupDetails,
        rowGrouping,
        onSearchClose: onSearchCloseIn,
        onItemHovered,
        onSelectionCleared,
        showSearch: showSearchIn,
        onVisibleRegionChanged,
        gridSelection: gridSelectionOuter,
        onGridSelectionChange,
        minColumnWidth: minColumnWidthIn = 50,
        maxColumnWidth: maxColumnWidthIn = 500,
        maxColumnAutoWidth: maxColumnAutoWidthIn,
        provideEditor,
        trailingRowOptions,
        freezeTrailingRows = 0,
        allowedFillDirections = "orthogonal",
        scrollOffsetX,
        scrollOffsetY,
        verticalBorder,
        onDragOverCell,
        onDrop,
        onColumnResize: onColumnResizeIn,
        onColumnResizeEnd: onColumnResizeEndIn,
        onColumnResizeStart: onColumnResizeStartIn,
        customRenderers: additionalRenderers,
        fillHandle,
        drawFocusRing = true,
        experimental,
        fixedShadowX,
        fixedShadowY,
        headerIcons,
        imageWindowLoader,
        initialSize,
        isDraggable,
        onDragLeave,
        onRowMoved,
        overscrollX: overscrollXIn,
        overscrollY: overscrollYIn,
        preventDiagonalScrolling,
        rightElement,
        rightElementProps,
        trapFocus = false,
        smoothScrollX,
        smoothScrollY,
        scaleToRem = false,
        rowHeight: rowHeightIn = 34,
        headerHeight: headerHeightIn = 36,
        groupHeaderHeight: groupHeaderHeightIn = headerHeightIn,
        theme: themeIn,
        isOutsideClick,
        renderers,
    } = p;

    const rowMarkersObj = typeof p.rowMarkers === "string" ? undefined : p.rowMarkers;

    const rowMarkers = rowMarkersObj?.kind ?? (p.rowMarkers as RowMarkerOptions["kind"]) ?? "none";
    const rowMarkerWidthRaw = rowMarkersObj?.width ?? p.rowMarkerWidth;
    const rowMarkerStartIndex = rowMarkersObj?.startIndex ?? p.rowMarkerStartIndex ?? 1;
    const rowMarkerTheme = rowMarkersObj?.theme ?? p.rowMarkerTheme;
    const rowMarkerCheckboxStyle = rowMarkersObj?.checkboxStyle ?? "square";

    const minColumnWidth = Math.max(minColumnWidthIn, 20);
    const maxColumnWidth = Math.max(maxColumnWidthIn, minColumnWidth);
    const maxColumnAutoWidth = Math.max(maxColumnAutoWidthIn ?? maxColumnWidth, minColumnWidth);

    const docStyle = React.useMemo(() => {
        if (typeof window === "undefined") return { fontSize: "16px" };
        return window.getComputedStyle(document.documentElement);
    }, []);

    const {
        rows,
        getCellContent,
        rowNumberMapper,
        rowHeight: rowHeightPostGrouping,
        getRowThemeOverride,
    } = useRowGroupingInner(rowGrouping, rowsIn, getCellContentIn, rowHeightIn, getRowThemeOverrideIn);

    const remSize = React.useMemo(() => Number.parseFloat(docStyle.fontSize), [docStyle]);
    const { rowHeight, headerHeight, groupHeaderHeight, theme, overscrollX, overscrollY } = useRemAdjuster({
        groupHeaderHeight: groupHeaderHeightIn,
        headerHeight: headerHeightIn,
        overscrollX: overscrollXIn,
        overscrollY: overscrollYIn,
        remSize,
        rowHeight: rowHeightPostGrouping,
        scaleToRem,
        theme: themeIn,
    });

    const keybindings = useKeybindingsWithDefaults(keybindingsIn);

    const rowMarkerWidth = rowMarkerWidthRaw ?? (rowsIn > 10_000 ? 48 : rowsIn > 1000 ? 44 : rowsIn > 100 ? 36 : 32);
    const hasRowMarkers = rowMarkers !== "none";
    const rowMarkerOffset = hasRowMarkers ? 1 : 0;
    const showTrailingBlankRow = onRowAppended !== undefined;
    const lastRowSticky = trailingRowOptions?.sticky === true;

    const [showSearchInner, setShowSearchInner] = React.useState(false);
    const showSearch = showSearchIn ?? showSearchInner;

    const onSearchClose = React.useCallback(() => {
        if (onSearchCloseIn !== undefined) {
            onSearchCloseIn();
        } else {
            setShowSearchInner(false);
        }
    }, [onSearchCloseIn]);

    const gridSelectionOuterMangled: GridSelection | undefined = React.useMemo((): GridSelection | undefined => {
        return gridSelectionOuter === undefined ? undefined : shiftSelection(gridSelectionOuter, rowMarkerOffset);
    }, [gridSelectionOuter, rowMarkerOffset]);
    const gridSelection = gridSelectionOuterMangled ?? gridSelectionInner;

    const abortControllerRef = React.useRef() as React.MutableRefObject<AbortController>;
    if (abortControllerRef.current === undefined) abortControllerRef.current = new AbortController();

    React.useEffect(() => () => abortControllerRef?.current.abort(), []);

    const [getCellsForSelection, getCellsForSeletionDirect] = useCellsForSelection(
        getCellsForSelectionIn,
        getCellContent,
        rowMarkerOffset,
        abortControllerRef.current,
        rows
    );

    const validateCell = React.useCallback<NonNullable<typeof validateCellIn>>(
        (cell, newValue, prevValue) => {
            if (validateCellIn === undefined) return true;
            const item: Item = [cell[0] - rowMarkerOffset, cell[1]];
            return validateCellIn?.(item, newValue, prevValue);
        },
        [rowMarkerOffset, validateCellIn]
    );

    const expectedExternalGridSelection = React.useRef<GridSelection | undefined>(gridSelectionOuter);
    const setGridSelection = React.useCallback(
        (newVal: GridSelection, expand: boolean): void => {
            if (expand) {
                newVal = expandSelection(
                    newVal,
                    getCellsForSelection,
                    rowMarkerOffset,
                    spanRangeBehavior,
                    abortControllerRef.current
                );
            }
            if (onGridSelectionChange !== undefined) {
                expectedExternalGridSelection.current = shiftSelection(newVal, -rowMarkerOffset);
                onGridSelectionChange(expectedExternalGridSelection.current);
            } else {
                setGridSelectionInner(newVal);
            }
        },
        [onGridSelectionChange, getCellsForSelection, rowMarkerOffset, spanRangeBehavior]
    );

    const onColumnResize = whenDefined(
        onColumnResizeIn,
        React.useCallback<NonNullable<typeof onColumnResizeIn>>(
            (_, w, ind, wg) => {
                onColumnResizeIn?.(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
            },
            [onColumnResizeIn, rowMarkerOffset, columnsIn]
        )
    );

    const onColumnResizeEnd = whenDefined(
        onColumnResizeEndIn,
        React.useCallback<NonNullable<typeof onColumnResizeEndIn>>(
            (_, w, ind, wg) => {
                onColumnResizeEndIn?.(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
            },
            [onColumnResizeEndIn, rowMarkerOffset, columnsIn]
        )
    );

    const onColumnResizeStart = whenDefined(
        onColumnResizeStartIn,
        React.useCallback<NonNullable<typeof onColumnResizeStartIn>>(
            (_, w, ind, wg) => {
                onColumnResizeStartIn?.(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
            },
            [onColumnResizeStartIn, rowMarkerOffset, columnsIn]
        )
    );

    const drawHeader = whenDefined(
        drawHeaderIn,
        React.useCallback<NonNullable<typeof drawHeaderIn>>(
            (args, draw) => {
                return drawHeaderIn?.({ ...args, columnIndex: args.columnIndex - rowMarkerOffset }, draw) ?? false;
            },
            [drawHeaderIn, rowMarkerOffset]
        )
    );

    const drawCell = whenDefined(
        drawCellIn,
        React.useCallback<NonNullable<typeof drawCellIn>>(
            (args, draw) => {
                return drawCellIn?.({ ...args, col: args.col - rowMarkerOffset }, draw) ?? false;
            },
            [drawCellIn, rowMarkerOffset]
        )
    );

    const onDelete = React.useCallback<NonNullable<DataEditorProps["onDelete"]>>(
        sel => {
            if (onDeleteIn !== undefined) {
                const result = onDeleteIn(shiftSelection(sel, -rowMarkerOffset));
                if (typeof result === "boolean") {
                    return result;
                }
                return shiftSelection(result, rowMarkerOffset);
            }
            return true;
        },
        [onDeleteIn, rowMarkerOffset]
    );

    const [setCurrent, setSelectedRows, setSelectedColumns] = useSelectionBehavior(
        gridSelection,
        setGridSelection,
        rangeSelectionBlending,
        columnSelectionBlending,
        rowSelectionBlending,
        rangeSelect
    );

    const mergedTheme = React.useMemo(() => {
        return mergeAndRealizeTheme(getDataEditorTheme(), theme);
    }, [theme]);

    const [clientSize, setClientSize] = React.useState<readonly [number, number, number]>([0, 0, 0]);

    const rendererMap = React.useMemo(() => {
        if (renderers === undefined) return {};
        const result: Partial<Record<InnerGridCellKind | GridCellKind, InternalCellRenderer<InnerGridCell>>> = {};
        for (const r of renderers) {
            result[r.kind] = r;
        }
        return result;
    }, [renderers]);

    const getCellRenderer: <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined = React.useCallback(
        <T extends InnerGridCell>(cell: T) => {
            if (cell.kind !== GridCellKind.Custom) {
                return rendererMap[cell.kind] as unknown as CellRenderer<T>;
            }
            return additionalRenderers?.find(x => x.isMatch(cell)) as CellRenderer<T>;
        },
        [additionalRenderers, rendererMap]
    );

    // eslint-disable-next-line prefer-const
    let { sizedColumns: columns, nonGrowWidth } = useColumnSizer(
        columnsIn,
        rows,
        getCellsForSeletionDirect,
        clientSize[0] - (rowMarkerOffset === 0 ? 0 : rowMarkerWidth) - clientSize[2],
        minColumnWidth,
        maxColumnAutoWidth,
        mergedTheme,
        getCellRenderer,
        abortControllerRef.current
    );
    if (rowMarkers !== "none") nonGrowWidth += rowMarkerWidth;

    const enableGroups = React.useMemo(() => {
        return columns.some(c => c.group !== undefined);
    }, [columns]);

    const totalHeaderHeight = enableGroups ? headerHeight + groupHeaderHeight : headerHeight;

    const numSelectedRows = gridSelection.rows.length;
    const rowMarkerChecked =
        rowMarkers === "none" ? undefined : numSelectedRows === 0 ? false : numSelectedRows === rows ? true : undefined;

    const mangledCols = React.useMemo(() => {
        if (rowMarkers === "none") return columns;
        return [
            {
                title: "",
                width: rowMarkerWidth,
                icon: undefined,
                hasMenu: false,
                style: "normal" as const,
                themeOverride: rowMarkerTheme,
                rowMarker: rowMarkerCheckboxStyle,
                rowMarkerChecked,
            },
            ...columns,
        ];
    }, [rowMarkers, columns, rowMarkerWidth, rowMarkerTheme, rowMarkerCheckboxStyle, rowMarkerChecked]);

    const [visibleRegionY, visibleRegionTy] = React.useMemo(() => {
        return [
            scrollOffsetY !== undefined && typeof rowHeight === "number" ? Math.floor(scrollOffsetY / rowHeight) : 0,
            scrollOffsetY !== undefined && typeof rowHeight === "number" ? -(scrollOffsetY % rowHeight) : 0,
        ];
    }, [scrollOffsetY, rowHeight]);

    type VisibleRegion = Rectangle & {
        /** value in px */
        tx?: number;
        /** value in px */
        ty?: number;
        extras?: {
            selected?: Item;
            /**
             * @deprecated
             */
            freezeRegion?: Rectangle;

            /**
             * All visible freeze regions
             */
            freezeRegions?: readonly Rectangle[];
        };
    };

    const visibleRegionRef = React.useRef<VisibleRegion>({
        height: 1,
        width: 1,
        x: 0,
        y: 0,
    });
    const visibleRegionInput = React.useMemo<VisibleRegion>(
        () => ({
            x: visibleRegionRef.current.x,
            y: visibleRegionY,
            width: visibleRegionRef.current.width ?? 1,
            height: visibleRegionRef.current.height ?? 1,
            // tx: 'TODO',
            ty: visibleRegionTy,
        }),
        [visibleRegionTy, visibleRegionY]
    );

    const hasJustScrolled = React.useRef(false);

    const [visibleRegion, setVisibleRegion, empty] = useStateWithReactiveInput<VisibleRegion>(visibleRegionInput);
    visibleRegionRef.current = visibleRegion;

    const vScrollReady = (visibleRegion.height ?? 1) > 1;
    React.useLayoutEffect(() => {
        if (scrollOffsetY !== undefined && scrollRef.current !== null && vScrollReady) {
            if (scrollRef.current.scrollTop === scrollOffsetY) return;
            scrollRef.current.scrollTop = scrollOffsetY;
            if (scrollRef.current.scrollTop !== scrollOffsetY) {
                empty();
            }
            hasJustScrolled.current = true;
        }
    }, [scrollOffsetY, vScrollReady, empty]);

    const hScrollReady = (visibleRegion.width ?? 1) > 1;
    React.useLayoutEffect(() => {
        if (scrollOffsetX !== undefined && scrollRef.current !== null && hScrollReady) {
            if (scrollRef.current.scrollLeft === scrollOffsetX) return;
            scrollRef.current.scrollLeft = scrollOffsetX;
            if (scrollRef.current.scrollLeft !== scrollOffsetX) {
                empty();
            }
            hasJustScrolled.current = true;
        }
    }, [scrollOffsetX, hScrollReady, empty]);

    const cellXOffset = visibleRegion.x + rowMarkerOffset;
    const cellYOffset = visibleRegion.y;

    const gridRef = React.useRef<DataGridRef | null>(null);

    const focus = React.useCallback((immediate?: boolean) => {
        if (immediate === true) {
            gridRef.current?.focus();
        } else {
            window.requestAnimationFrame(() => {
                gridRef.current?.focus();
            });
        }
    }, []);

    const mangledRows = showTrailingBlankRow ? rows + 1 : rows;

    const mangledOnCellsEdited = React.useCallback<NonNullable<typeof onCellsEdited>>(
        (items: readonly EditListItem[]) => {
            const mangledItems =
                rowMarkerOffset === 0
                    ? items
                    : items.map(x => ({
                          ...x,
                          location: [x.location[0] - rowMarkerOffset, x.location[1]] as const,
                      }));
            const r = onCellsEdited?.(mangledItems);

            if (r !== true) {
                for (const i of mangledItems) onCellEdited?.(i.location, i.value);
            }

            return r;
        },
        [onCellEdited, onCellsEdited, rowMarkerOffset]
    );

    const [fillHighlightRegion, setFillHighlightRegion] = React.useState<Rectangle | undefined>();

    // this will generally be undefined triggering the memo less often
    const highlightRange =
        gridSelection.current !== undefined &&
        gridSelection.current.range.width * gridSelection.current.range.height > 1
            ? gridSelection.current.range
            : undefined;

    const highlightFocus = drawFocusRing ? gridSelection.current?.cell : undefined;
    const highlightFocusCol = highlightFocus?.[0];
    const highlightFocusRow = highlightFocus?.[1];

    const highlightRegions = React.useMemo(() => {
        if (
            (highlightRegionsIn === undefined || highlightRegionsIn.length === 0) &&
            (highlightRange ?? highlightFocusCol ?? highlightFocusRow ?? fillHighlightRegion) === undefined
        )
            return undefined;

        const regions: Highlight[] = [];

        if (highlightRegionsIn !== undefined) {
            for (const r of highlightRegionsIn) {
                const maxWidth = mangledCols.length - r.range.x - rowMarkerOffset;
                if (maxWidth > 0) {
                    regions.push({
                        color: r.color,
                        range: {
                            ...r.range,
                            x: r.range.x + rowMarkerOffset,
                            width: Math.min(maxWidth, r.range.width),
                        },
                        style: r.style,
                    });
                }
            }
        }

        if (fillHighlightRegion !== undefined) {
            regions.push({
                color: withAlpha(mergedTheme.accentColor, 0),
                range: fillHighlightRegion,
                style: "dashed",
            });
        }

        if (highlightRange !== undefined) {
            regions.push({
                color: withAlpha(mergedTheme.accentColor, 0.5),
                range: highlightRange,
                style: "solid-outline",
            });
        }

        if (highlightFocusCol !== undefined && highlightFocusRow !== undefined) {
            regions.push({
                color: mergedTheme.accentColor,
                range: {
                    x: highlightFocusCol,
                    y: highlightFocusRow,
                    width: 1,
                    height: 1,
                },
                style: "solid-outline",
            });
        }

        return regions.length > 0 ? regions : undefined;
    }, [
        fillHighlightRegion,
        highlightRange,
        highlightFocusCol,
        highlightFocusRow,
        highlightRegionsIn,
        mangledCols.length,
        mergedTheme.accentColor,
        rowMarkerOffset,
    ]);

    const mangledColsRef = React.useRef(mangledCols);
    mangledColsRef.current = mangledCols;
    const getMangledCellContent = React.useCallback(
        ([col, row]: Item, forceStrict: boolean = false): InnerGridCell => {
            const isTrailing = showTrailingBlankRow && row === mangledRows - 1;
            const isRowMarkerCol = col === 0 && hasRowMarkers;
            if (isRowMarkerCol) {
                if (isTrailing) {
                    return loadingCell;
                }
                const mappedRow = rowNumberMapper(row);
                if (mappedRow === undefined) return loadingCell;
                return {
                    kind: InnerGridCellKind.Marker,
                    allowOverlay: false,
                    checkboxStyle: rowMarkerCheckboxStyle,
                    checked: gridSelection?.rows.hasIndex(row) === true,
                    markerKind: rowMarkers === "clickable-number" ? "number" : rowMarkers,
                    row: rowMarkerStartIndex + mappedRow,
                    drawHandle: onRowMoved !== undefined,
                    cursor: rowMarkers === "clickable-number" ? "pointer" : undefined,
                };
            } else if (isTrailing) {
                //If the grid is empty, we will return text
                const isFirst = col === rowMarkerOffset;

                const maybeFirstColumnHint = isFirst ? trailingRowOptions?.hint ?? "" : "";
                const c = mangledColsRef.current[col];

                if (c?.trailingRowOptions?.disabled === true) {
                    return loadingCell;
                } else {
                    const hint = c?.trailingRowOptions?.hint ?? maybeFirstColumnHint;
                    const icon = c?.trailingRowOptions?.addIcon ?? trailingRowOptions?.addIcon;
                    return {
                        kind: InnerGridCellKind.NewRow,
                        hint,
                        allowOverlay: false,
                        icon,
                    };
                }
            } else {
                const outerCol = col - rowMarkerOffset;
                if (forceStrict || experimental?.strict === true) {
                    const vr = visibleRegionRef.current;
                    const isOutsideMainArea =
                        vr.x > outerCol ||
                        outerCol > vr.x + vr.width ||
                        vr.y > row ||
                        row > vr.y + vr.height ||
                        row >= rowsRef.current;
                    const isSelected = outerCol === vr.extras?.selected?.[0] && row === vr.extras?.selected[1];
                    let isInFreezeArea = false;
                    if (vr.extras?.freezeRegions !== undefined) {
                        for (const fr of vr.extras.freezeRegions) {
                            if (pointInRect(fr, outerCol, row)) {
                                isInFreezeArea = true;
                                break;
                            }
                        }
                    }

                    if (isOutsideMainArea && !isSelected && !isInFreezeArea) {
                        return loadingCell;
                    }
                }
                let result = getCellContent([outerCol, row]);
                if (rowMarkerOffset !== 0 && result.span !== undefined) {
                    result = {
                        ...result, // FIXME: Mutate
                        span: [result.span[0] + rowMarkerOffset, result.span[1] + rowMarkerOffset],
                    };
                }
                return result;
            }
        },
        [
            showTrailingBlankRow,
            mangledRows,
            hasRowMarkers,
            rowNumberMapper,
            rowMarkerCheckboxStyle,
            gridSelection?.rows,
            rowMarkers,
            rowMarkerStartIndex,
            onRowMoved,
            rowMarkerOffset,
            trailingRowOptions?.hint,
            trailingRowOptions?.addIcon,
            experimental?.strict,
            getCellContent,
        ]
    );

    const mangledGetGroupDetails = React.useCallback<NonNullable<DataEditorProps["getGroupDetails"]>>(
        group => {
            let result = getGroupDetails?.(group) ?? { name: group };
            if (onGroupHeaderRenamed !== undefined && group !== "") {
                result = {
                    // FIXME: Mutate
                    icon: result.icon,
                    name: result.name,
                    overrideTheme: result.overrideTheme,
                    actions: [
                        ...(result.actions ?? []),
                        {
                            title: "Rename",
                            icon: "renameIcon",
                            onClick: e =>
                                setRenameGroup({
                                    group: result.name,
                                    bounds: e.bounds,
                                }),
                        },
                    ],
                };
            }
            return result;
        },
        [getGroupDetails, onGroupHeaderRenamed]
    );

    const setOverlaySimple = React.useCallback(
        (val: Omit<NonNullable<typeof overlay>, "theme">) => {
            const [col, row] = val.cell;
            const column = mangledCols[col];
            const groupTheme =
                column?.group !== undefined ? mangledGetGroupDetails(column.group)?.overrideTheme : undefined;
            const colTheme = column?.themeOverride;
            const rowTheme = getRowThemeOverride?.(row);

            setOverlay({
                ...val,
                theme: mergeAndRealizeTheme(mergedTheme, groupTheme, colTheme, rowTheme, val.content.themeOverride),
            });
        },
        [getRowThemeOverride, mangledCols, mangledGetGroupDetails, mergedTheme]
    );

    const reselect = React.useCallback(
        (bounds: Rectangle, fromKeyboard: boolean, initialValue?: string) => {
            if (gridSelection.current === undefined) return;

            const [col, row] = gridSelection.current.cell;
            const c = getMangledCellContent([col, row]);
            if (c.kind !== GridCellKind.Boolean && c.allowOverlay) {
                let content = c;
                if (initialValue !== undefined) {
                    switch (content.kind) {
                        case GridCellKind.Number: {
                            const d = maybe(() => (initialValue === "-" ? -0 : Number.parseFloat(initialValue)), 0);
                            content = {
                                ...content,
                                data: Number.isNaN(d) ? 0 : d,
                            };
                            break;
                        }
                        case GridCellKind.Text:
                        case GridCellKind.Markdown:
                        case GridCellKind.Uri:
                            content = {
                                ...content,
                                data: initialValue,
                            };
                            break;
                    }
                }

                setOverlaySimple({
                    target: bounds,
                    content,
                    initialValue,
                    cell: [col, row],
                    highlight: initialValue === undefined,
                    forceEditMode: initialValue !== undefined,
                });
            } else if (c.kind === GridCellKind.Boolean && fromKeyboard && c.readonly !== true) {
                mangledOnCellsEdited([
                    {
                        location: gridSelection.current.cell,
                        value: {
                            ...c,
                            data: toggleBoolean(c.data),
                        },
                    },
                ]);
                gridRef.current?.damage([{ cell: gridSelection.current.cell }]);
            }
        },
        [getMangledCellContent, gridSelection, mangledOnCellsEdited, setOverlaySimple]
    );

    const focusOnRowFromTrailingBlankRow = React.useCallback(
        (col: number, row: number) => {
            const bounds = gridRef.current?.getBounds(col, row);
            if (bounds === undefined || scrollRef.current === null) {
                return;
            }

            const content = getMangledCellContent([col, row]);
            if (!content.allowOverlay) {
                return;
            }

            setOverlaySimple({
                target: bounds,
                content,
                initialValue: undefined,
                highlight: true,
                cell: [col, row],
                forceEditMode: true,
            });
        },
        [getMangledCellContent, setOverlaySimple]
    );

    const scrollTo = React.useCallback<ScrollToFn>(
        (col, row, dir = "both", paddingX = 0, paddingY = 0, options = undefined): void => {
            if (scrollRef.current !== null) {
                const grid = gridRef.current;
                const canvas = canvasRef.current;

                const trueCol = typeof col !== "number" ? (col.unit === "cell" ? col.amount : undefined) : col;
                const trueRow = typeof row !== "number" ? (row.unit === "cell" ? row.amount : undefined) : row;
                const desiredX = typeof col !== "number" && col.unit === "px" ? col.amount : undefined;
                const desiredY = typeof row !== "number" && row.unit === "px" ? row.amount : undefined;
                if (grid !== null && canvas !== null) {
                    let targetRect: Rectangle = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    };

                    let scrollX = 0;
                    let scrollY = 0;

                    if (trueCol !== undefined || trueRow !== undefined) {
                        targetRect = grid.getBounds((trueCol ?? 0) + rowMarkerOffset, trueRow ?? 0) ?? targetRect;
                        if (targetRect.width === 0 || targetRect.height === 0) return;
                    }

                    const scrollBounds = canvas.getBoundingClientRect();
                    const scale = scrollBounds.width / canvas.offsetWidth;

                    if (desiredX !== undefined) {
                        targetRect = {
                            ...targetRect,
                            x: desiredX - scrollBounds.left - scrollRef.current.scrollLeft,
                            width: 1,
                        };
                    }
                    if (desiredY !== undefined) {
                        targetRect = {
                            ...targetRect,
                            y: desiredY + scrollBounds.top - scrollRef.current.scrollTop,
                            height: 1,
                        };
                    }

                    if (targetRect !== undefined) {
                        const bounds = {
                            x: targetRect.x - paddingX,
                            y: targetRect.y - paddingY,
                            width: targetRect.width + 2 * paddingX,
                            height: targetRect.height + 2 * paddingY,
                        };

                        let frozenWidth = 0;
                        for (let i = 0; i < freezeColumns; i++) {
                            frozenWidth += columns[i].width;
                        }
                        let trailingRowHeight = 0;
                        const freezeTrailingRowsEffective = freezeTrailingRows + (lastRowSticky ? 1 : 0);
                        if (freezeTrailingRowsEffective > 0) {
                            trailingRowHeight = getFreezeTrailingHeight(
                                mangledRows,
                                freezeTrailingRowsEffective,
                                rowHeight
                            );
                        }

                        // scrollBounds is already scaled
                        let sLeft = frozenWidth * scale + scrollBounds.left + rowMarkerOffset * rowMarkerWidth * scale;
                        let sRight = scrollBounds.right;
                        let sTop = scrollBounds.top + totalHeaderHeight * scale;
                        let sBottom = scrollBounds.bottom - trailingRowHeight * scale;

                        const minx = targetRect.width + paddingX * 2;
                        switch (options?.hAlign) {
                            case "start":
                                sRight = sLeft + minx;
                                break;
                            case "end":
                                sLeft = sRight - minx;
                                break;
                            case "center":
                                sLeft = Math.floor((sLeft + sRight) / 2) - minx / 2;
                                sRight = sLeft + minx;
                                break;
                        }

                        const miny = targetRect.height + paddingY * 2;
                        switch (options?.vAlign) {
                            case "start":
                                sBottom = sTop + miny;
                                break;
                            case "end":
                                sTop = sBottom - miny;
                                break;
                            case "center":
                                sTop = Math.floor((sTop + sBottom) / 2) - miny / 2;
                                sBottom = sTop + miny;
                                break;
                        }

                        if (sLeft > bounds.x) {
                            scrollX = bounds.x - sLeft;
                        } else if (sRight < bounds.x + bounds.width) {
                            scrollX = bounds.x + bounds.width - sRight;
                        }

                        if (sTop > bounds.y) {
                            scrollY = bounds.y - sTop;
                        } else if (sBottom < bounds.y + bounds.height) {
                            scrollY = bounds.y + bounds.height - sBottom;
                        }

                        if (dir === "vertical" || (typeof col === "number" && col < freezeColumns)) {
                            scrollX = 0;
                        } else if (
                            dir === "horizontal" ||
                            (typeof row === "number" && row >= mangledRows - freezeTrailingRowsEffective)
                        ) {
                            scrollY = 0;
                        }

                        if (scrollX !== 0 || scrollY !== 0) {
                            // Remove scaling as scrollTo method is unaffected by transform scale.
                            if (scale !== 1) {
                                scrollX /= scale;
                                scrollY /= scale;
                            }
                            scrollRef.current.scrollTo(
                                scrollX + scrollRef.current.scrollLeft,
                                scrollY + scrollRef.current.scrollTop
                            );
                        }
                    }
                }
            }
        },
        [
            rowMarkerOffset,
            freezeTrailingRows,
            rowMarkerWidth,
            totalHeaderHeight,
            freezeColumns,
            columns,
            mangledRows,
            lastRowSticky,
            rowHeight,
        ]
    );

    const focusCallback = React.useRef(focusOnRowFromTrailingBlankRow);
    const getCellContentRef = React.useRef(getCellContent);
    const rowsRef = React.useRef(rows);
    focusCallback.current = focusOnRowFromTrailingBlankRow;
    getCellContentRef.current = getCellContent;
    rowsRef.current = rows;
    const appendRow = React.useCallback(
        async (col: number, openOverlay: boolean = true): Promise<void> => {
            const c = mangledCols[col];
            if (c?.trailingRowOptions?.disabled === true) {
                return;
            }
            const appendResult = onRowAppended?.();

            let r: "top" | "bottom" | number | undefined = undefined;
            let bottom = true;
            if (appendResult !== undefined) {
                r = await appendResult;
                if (r === "top") bottom = false;
                if (typeof r === "number") bottom = false;
            }

            let backoff = 0;
            const doFocus = () => {
                if (rowsRef.current <= rows) {
                    if (backoff < 500) {
                        window.setTimeout(doFocus, backoff);
                    }
                    backoff = 50 + backoff * 2;
                    return;
                }

                const row = typeof r === "number" ? r : bottom ? rows : 0;
                scrollToRef.current(col - rowMarkerOffset, row);
                setCurrent(
                    {
                        cell: [col, row],
                        range: {
                            x: col,
                            y: row,
                            width: 1,
                            height: 1,
                        },
                    },
                    false,
                    false,
                    "edit"
                );

                const cell = getCellContentRef.current([col - rowMarkerOffset, row]);
                if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true && openOverlay) {
                    // wait for scroll to have a chance to process
                    window.setTimeout(() => {
                        focusCallback.current(col, row);
                    }, 0);
                }
            };
            // Queue up to allow the consumer to react to the event and let us check if they did
            doFocus();
        },
        [mangledCols, onRowAppended, rowMarkerOffset, rows, setCurrent]
    );

    const getCustomNewRowTargetColumn = React.useCallback(
        (col: number): number | undefined => {
            const customTargetColumn =
                columns[col]?.trailingRowOptions?.targetColumn ?? trailingRowOptions?.targetColumn;

            if (typeof customTargetColumn === "number") {
                const customTargetOffset = hasRowMarkers ? 1 : 0;
                return customTargetColumn + customTargetOffset;
            }

            if (typeof customTargetColumn === "object") {
                const maybeIndex = columnsIn.indexOf(customTargetColumn);
                if (maybeIndex >= 0) {
                    const customTargetOffset = hasRowMarkers ? 1 : 0;
                    return maybeIndex + customTargetOffset;
                }
            }

            return undefined;
        },
        [columns, columnsIn, hasRowMarkers, trailingRowOptions?.targetColumn]
    );

    const lastSelectedRowRef = React.useRef<number>();
    const lastSelectedColRef = React.useRef<number>();

    const themeForCell = React.useCallback(
        (cell: InnerGridCell, pos: Item): FullTheme => {
            const [col, row] = pos;
            return mergeAndRealizeTheme(
                mergedTheme,
                mangledCols[col]?.themeOverride,
                getRowThemeOverride?.(row),
                cell.themeOverride
            );
        },
        [getRowThemeOverride, mangledCols, mergedTheme]
    );

    const { mapper } = useRowGrouping(rowGrouping, rowsIn);

    const rowGroupingNavBehavior = rowGrouping?.navigationBehavior;

    const handleSelect = React.useCallback(
        (args: GridMouseEventArgs) => {
            const isMultiKey = browserIsOSX.value ? args.metaKey : args.ctrlKey;
            const isMultiRow = isMultiKey && rowSelect === "multi";
            const isMultiCol = isMultiKey && columnSelect === "multi";
            const [col, row] = args.location;
            const selectedColumns = gridSelection.columns;
            const selectedRows = gridSelection.rows;
            const [cellCol, cellRow] = gridSelection.current?.cell ?? [];
            // eslint-disable-next-line unicorn/prefer-switch
            if (args.kind === "cell") {
                lastSelectedColRef.current = undefined;

                lastMouseSelectLocation.current = [col, row];

                if (col === 0 && hasRowMarkers) {
                    if (
                        (showTrailingBlankRow === true && row === rows) ||
                        rowMarkers === "number" ||
                        rowSelect === "none"
                    )
                        return;

                    const markerCell = getMangledCellContent(args.location);
                    if (markerCell.kind !== InnerGridCellKind.Marker) {
                        return;
                    }

                    if (onRowMoved !== undefined) {
                        const renderer = getCellRenderer(markerCell);
                        assert(renderer?.kind === InnerGridCellKind.Marker);
                        const postClick = renderer?.onClick?.({
                            ...args,
                            cell: markerCell,
                            posX: args.localEventX,
                            posY: args.localEventY,
                            bounds: args.bounds,
                            theme: themeForCell(markerCell, args.location),
                            preventDefault: () => undefined,
                        }) as MarkerCell | undefined;
                        if (postClick === undefined || postClick.checked === markerCell.checked) return;
                    }

                    setOverlay(undefined);
                    focus();
                    const isSelected = selectedRows.hasIndex(row);

                    const lastHighlighted = lastSelectedRowRef.current;
                    if (
                        rowSelect === "multi" &&
                        (args.shiftKey || args.isLongTouch === true) &&
                        lastHighlighted !== undefined &&
                        selectedRows.hasIndex(lastHighlighted)
                    ) {
                        const newSlice: Slice = [Math.min(lastHighlighted, row), Math.max(lastHighlighted, row) + 1];

                        if (isMultiRow || rowSelectionMode === "multi") {
                            setSelectedRows(undefined, newSlice, true);
                        } else {
                            setSelectedRows(CompactSelection.fromSingleSelection(newSlice), undefined, isMultiRow);
                        }
                    } else if (isMultiRow || args.isTouch || rowSelectionMode === "multi") {
                        if (isSelected) {
                            setSelectedRows(selectedRows.remove(row), undefined, true);
                        } else {
                            setSelectedRows(undefined, row, true);
                            lastSelectedRowRef.current = row;
                        }
                    } else if (isSelected && selectedRows.length === 1) {
                        setSelectedRows(CompactSelection.empty(), undefined, isMultiKey);
                    } else {
                        setSelectedRows(CompactSelection.fromSingleSelection(row), undefined, isMultiKey);
                        lastSelectedRowRef.current = row;
                    }
                } else if (col >= rowMarkerOffset && showTrailingBlankRow && row === rows) {
                    const customTargetColumn = getCustomNewRowTargetColumn(col);
                    void appendRow(customTargetColumn ?? col);
                } else {
                    if (cellCol !== col || cellRow !== row) {
                        const cell = getMangledCellContent(args.location);
                        const renderer = getCellRenderer(cell);

                        if (renderer?.onSelect !== undefined) {
                            let prevented = false;
                            renderer.onSelect({
                                ...args,
                                cell,
                                posX: args.localEventX,
                                posY: args.localEventY,
                                bounds: args.bounds,
                                preventDefault: () => (prevented = true),
                                theme: themeForCell(cell, args.location),
                            });
                            if (prevented) {
                                return;
                            }
                        }

                        if (rowGroupingNavBehavior === "block" && mapper(row).isGroupHeader) {
                            return;
                        }

                        const isLastStickyRow = lastRowSticky && row === rows;

                        const startedFromLastSticky =
                            lastRowSticky && gridSelection !== undefined && gridSelection.current?.cell[1] === rows;

                        if (
                            (args.shiftKey || args.isLongTouch === true) &&
                            cellCol !== undefined &&
                            cellRow !== undefined &&
                            gridSelection.current !== undefined &&
                            !startedFromLastSticky
                        ) {
                            if (isLastStickyRow) {
                                // If we're making a selection and shift click in to the last sticky row,
                                // just drop the event. Don't kill the selection.
                                return;
                            }

                            const left = Math.min(col, cellCol);
                            const right = Math.max(col, cellCol);
                            const top = Math.min(row, cellRow);
                            const bottom = Math.max(row, cellRow);
                            setCurrent(
                                {
                                    ...gridSelection.current,
                                    range: {
                                        x: left,
                                        y: top,
                                        width: right - left + 1,
                                        height: bottom - top + 1,
                                    },
                                },
                                true,
                                isMultiKey,
                                "click"
                            );
                            lastSelectedRowRef.current = undefined;
                            focus();
                        } else {
                            setCurrent(
                                {
                                    cell: [col, row],
                                    range: { x: col, y: row, width: 1, height: 1 },
                                },
                                true,
                                isMultiKey,
                                "click"
                            );
                            lastSelectedRowRef.current = undefined;
                            setOverlay(undefined);
                            focus();
                        }
                    }
                }
            } else if (args.kind === "header") {
                lastMouseSelectLocation.current = [col, row];
                setOverlay(undefined);
                if (hasRowMarkers && col === 0) {
                    lastSelectedRowRef.current = undefined;
                    lastSelectedColRef.current = undefined;
                    if (rowSelect === "multi") {
                        if (selectedRows.length !== rows) {
                            setSelectedRows(CompactSelection.fromSingleSelection([0, rows]), undefined, isMultiKey);
                        } else {
                            setSelectedRows(CompactSelection.empty(), undefined, isMultiKey);
                        }
                        focus();
                    }
                } else {
                    const lastCol = lastSelectedColRef.current;
                    if (
                        columnSelect === "multi" &&
                        (args.shiftKey || args.isLongTouch === true) &&
                        lastCol !== undefined &&
                        selectedColumns.hasIndex(lastCol)
                    ) {
                        const newSlice: Slice = [Math.min(lastCol, col), Math.max(lastCol, col) + 1];

                        if (isMultiCol) {
                            setSelectedColumns(undefined, newSlice, isMultiKey);
                        } else {
                            setSelectedColumns(CompactSelection.fromSingleSelection(newSlice), undefined, isMultiKey);
                        }
                    } else if (isMultiCol) {
                        if (selectedColumns.hasIndex(col)) {
                            setSelectedColumns(selectedColumns.remove(col), undefined, isMultiKey);
                        } else {
                            setSelectedColumns(undefined, col, isMultiKey);
                        }
                        lastSelectedColRef.current = col;
                    } else if (columnSelect !== "none") {
                        setSelectedColumns(CompactSelection.fromSingleSelection(col), undefined, isMultiKey);
                        lastSelectedColRef.current = col;
                    }
                    lastSelectedRowRef.current = undefined;
                    focus();
                }
            } else if (args.kind === groupHeaderKind) {
                lastMouseSelectLocation.current = [col, row];
            } else if (args.kind === outOfBoundsKind && !args.isMaybeScrollbar) {
                setGridSelection(emptyGridSelection, false);
                setOverlay(undefined);
                focus();
                onSelectionCleared?.();
                lastSelectedRowRef.current = undefined;
                lastSelectedColRef.current = undefined;
            }
        },
        [
            rowSelect,
            columnSelect,
            gridSelection,
            hasRowMarkers,
            rowMarkerOffset,
            showTrailingBlankRow,
            rows,
            rowMarkers,
            getMangledCellContent,
            onRowMoved,
            focus,
            rowSelectionMode,
            getCellRenderer,
            themeForCell,
            setSelectedRows,
            getCustomNewRowTargetColumn,
            appendRow,
            rowGroupingNavBehavior,
            mapper,
            lastRowSticky,
            setCurrent,
            setSelectedColumns,
            setGridSelection,
            onSelectionCleared,
        ]
    );
    const isActivelyDraggingHeader = React.useRef(false);
    const lastMouseSelectLocation = React.useRef<readonly [number, number]>();
    const touchDownArgs = React.useRef(visibleRegion);
    const mouseDownData = React.useRef<{
        time: number;
        button: number;
        location: Item;
    }>();
    const onMouseDown = React.useCallback(
        (args: GridMouseEventArgs) => {
            isPrevented.current = false;
            touchDownArgs.current = visibleRegionRef.current;
            if (args.button !== 0 && args.button !== 1) {
                mouseDownData.current = undefined;
                return;
            }

            const time = performance.now();
            mouseDownData.current = {
                button: args.button,
                time,
                location: args.location,
            };

            if (args?.kind === "header") {
                isActivelyDraggingHeader.current = true;
            }

            const fh = args.kind === "cell" && args.isFillHandle;

            if (!fh && args.kind !== "cell" && args.isEdge) return;

            setMouseState({
                previousSelection: gridSelection,
                fillHandle: fh,
            });
            lastMouseSelectLocation.current = undefined;

            if (!args.isTouch && args.button === 0 && !fh) {
                handleSelect(args);
            } else if (!args.isTouch && args.button === 1) {
                lastMouseSelectLocation.current = args.location;
            }
        },
        [gridSelection, handleSelect]
    );

    const [renameGroup, setRenameGroup] = React.useState<{
        group: string;
        bounds: Rectangle;
    }>();

    const handleGroupHeaderSelection = React.useCallback(
        (args: GridMouseEventArgs) => {
            if (args.kind !== groupHeaderKind || columnSelect !== "multi") {
                return;
            }
            const isMultiKey = browserIsOSX.value ? args.metaKey : args.ctrlKey;
            const [col] = args.location;
            const selectedColumns = gridSelection.columns;

            if (col < rowMarkerOffset) return;

            const needle = mangledCols[col];
            let start = col;
            let end = col;
            for (let i = col - 1; i >= rowMarkerOffset; i--) {
                if (!isGroupEqual(needle.group, mangledCols[i].group)) break;
                start--;
            }

            for (let i = col + 1; i < mangledCols.length; i++) {
                if (!isGroupEqual(needle.group, mangledCols[i].group)) break;
                end++;
            }

            focus();

            if (isMultiKey) {
                if (selectedColumns.hasAll([start, end + 1])) {
                    let newVal = selectedColumns;
                    for (let index = start; index <= end; index++) {
                        newVal = newVal.remove(index);
                    }
                    setSelectedColumns(newVal, undefined, isMultiKey);
                } else {
                    setSelectedColumns(undefined, [start, end + 1], isMultiKey);
                }
            } else {
                setSelectedColumns(CompactSelection.fromSingleSelection([start, end + 1]), undefined, isMultiKey);
            }
        },
        [columnSelect, focus, gridSelection.columns, mangledCols, rowMarkerOffset, setSelectedColumns]
    );

    const isPrevented = React.useRef(false);

    const normalSizeColumn = React.useCallback(
        async (col: number): Promise<void> => {
            if (getCellsForSelection !== undefined && onColumnResize !== undefined) {
                const start = visibleRegionRef.current.y;
                const end = visibleRegionRef.current.height;
                let cells = getCellsForSelection(
                    {
                        x: col,
                        y: start,
                        width: 1,
                        height: Math.min(end, rows - start),
                    },
                    abortControllerRef.current.signal
                );
                if (typeof cells !== "object") {
                    cells = await cells();
                }
                const inputCol = columns[col - rowMarkerOffset];
                const offscreen = document.createElement("canvas");
                const ctx = offscreen.getContext("2d", { alpha: false });
                if (ctx !== null) {
                    ctx.font = mergedTheme.baseFontFull;
                    const newCol = measureColumn(
                        ctx,
                        mergedTheme,
                        inputCol,
                        0,
                        cells,
                        minColumnWidth,
                        maxColumnWidth,
                        false,
                        getCellRenderer
                    );
                    onColumnResize?.(inputCol, newCol.width, col, newCol.width);
                }
            }
        },
        [
            columns,
            getCellsForSelection,
            maxColumnWidth,
            mergedTheme,
            minColumnWidth,
            onColumnResize,
            rowMarkerOffset,
            rows,
            getCellRenderer,
        ]
    );

    const [scrollDir, setScrollDir] = React.useState<GridMouseEventArgs["scrollEdge"]>();

    const fillPattern = React.useCallback(
        async (previousSelection: GridSelection, currentSelection: GridSelection) => {
            const patternRange = previousSelection.current?.range;

            if (
                patternRange === undefined ||
                getCellsForSelection === undefined ||
                currentSelection.current === undefined
            ) {
                return;
            }
            const currentRange = currentSelection.current.range;

            if (onFillPattern !== undefined) {
                let canceled = false;
                onFillPattern({
                    fillDestination: { ...currentRange, x: currentRange.x - rowMarkerOffset },
                    patternSource: { ...patternRange, x: patternRange.x - rowMarkerOffset },
                    preventDefault: () => (canceled = true),
                });
                if (canceled) return;
            }

            let cells = getCellsForSelection(patternRange, abortControllerRef.current.signal);
            if (typeof cells !== "object") cells = await cells();

            const pattern = cells;

            // loop through all cells in currentSelection.current.range
            const editItemList: EditListItem[] = [];
            for (let x = 0; x < currentRange.width; x++) {
                for (let y = 0; y < currentRange.height; y++) {
                    const cell: Item = [currentRange.x + x, currentRange.y + y];
                    if (itemIsInRect(cell, patternRange)) continue;
                    const patternCell = pattern[y % patternRange.height][x % patternRange.width];
                    if (isInnerOnlyCell(patternCell) || !isReadWriteCell(patternCell)) continue;
                    editItemList.push({
                        location: cell,
                        value: { ...patternCell },
                    });
                }
            }
            mangledOnCellsEdited(editItemList);

            gridRef.current?.damage(
                editItemList.map(c => ({
                    cell: c.location,
                }))
            );
        },
        [getCellsForSelection, mangledOnCellsEdited, onFillPattern, rowMarkerOffset]
    );

    const fillRight = React.useCallback(() => {
        if (gridSelection.current === undefined || gridSelection.current.range.width <= 1) return;

        const firstColSelection = {
            ...gridSelection,
            current: {
                ...gridSelection.current,
                range: {
                    ...gridSelection.current.range,
                    width: 1,
                },
            },
        };

        void fillPattern(firstColSelection, gridSelection);
    }, [fillPattern, gridSelection]);

    const fillDown = React.useCallback(() => {
        if (gridSelection.current === undefined || gridSelection.current.range.height <= 1) return;

        const firstRowSelection = {
            ...gridSelection,
            current: {
                ...gridSelection.current,
                range: {
                    ...gridSelection.current.range,
                    height: 1,
                },
            },
        };

        void fillPattern(firstRowSelection, gridSelection);
    }, [fillPattern, gridSelection]);

    const onMouseUp = React.useCallback(
        (args: GridMouseEventArgs, isOutside: boolean) => {
            const mouse = mouseState;
            setMouseState(undefined);
            setFillHighlightRegion(undefined);
            setScrollDir(undefined);
            isActivelyDraggingHeader.current = false;

            if (isOutside) return;

            if (
                mouse?.fillHandle === true &&
                gridSelection.current !== undefined &&
                mouse.previousSelection?.current !== undefined
            ) {
                if (fillHighlightRegion === undefined) return;
                const newRange = {
                    ...gridSelection,
                    current: {
                        ...gridSelection.current,
                        range: combineRects(mouse.previousSelection.current.range, fillHighlightRegion),
                    },
                };
                void fillPattern(mouse.previousSelection, newRange);
                setGridSelection(newRange, true);
                return;
            }

            const [col, row] = args.location;
            const [lastMouseDownCol, lastMouseDownRow] = lastMouseSelectLocation.current ?? [];

            const preventDefault = () => {
                isPrevented.current = true;
            };

            const handleMaybeClick = (a: GridMouseCellEventArgs): boolean => {
                const isValidClick = a.isTouch || (lastMouseDownCol === col && lastMouseDownRow === row);
                if (isValidClick) {
                    onCellClicked?.([col - rowMarkerOffset, row], {
                        ...a,
                        preventDefault,
                    });
                }
                if (a.button === 1) return !isPrevented.current;
                if (!isPrevented.current) {
                    const c = getMangledCellContent(args.location);
                    const r = getCellRenderer(c);
                    if (r !== undefined && r.onClick !== undefined && isValidClick) {
                        const newVal = r.onClick({
                            ...a,
                            cell: c,
                            posX: a.localEventX,
                            posY: a.localEventY,
                            bounds: a.bounds,
                            theme: themeForCell(c, args.location),
                            preventDefault,
                        });
                        if (newVal !== undefined && !isInnerOnlyCell(newVal) && isEditableGridCell(newVal)) {
                            mangledOnCellsEdited([{ location: a.location, value: newVal }]);
                            gridRef.current?.damage([
                                {
                                    cell: a.location,
                                },
                            ]);
                        }
                    }
                    if (isPrevented.current || gridSelection.current === undefined) return false;

                    let shouldActivate = false;
                    switch (c.activationBehaviorOverride ?? cellActivationBehavior) {
                        case "double-click":
                        case "second-click": {
                            if (mouse?.previousSelection?.current?.cell === undefined) break;
                            const [selectedCol, selectedRow] = gridSelection.current.cell;
                            const [prevCol, prevRow] = mouse.previousSelection.current.cell;
                            const isClickOnSelected =
                                col === selectedCol && col === prevCol && row === selectedRow && row === prevRow;
                            shouldActivate =
                                isClickOnSelected &&
                                (a.isDoubleClick === true || cellActivationBehavior === "second-click");
                            break;
                        }
                        case "single-click": {
                            shouldActivate = true;
                            break;
                        }
                    }
                    if (shouldActivate) {
                        onCellActivated?.([col - rowMarkerOffset, row]);
                        reselect(a.bounds, false);
                        return true;
                    }
                }
                return false;
            };

            const clickLocation = args.location[0] - rowMarkerOffset;
            if (args.isTouch) {
                const vr = visibleRegionRef.current;
                const touchVr = touchDownArgs.current;
                if (vr.x !== touchVr.x || vr.y !== touchVr.y) {
                    // we scrolled, abort
                    return;
                }
                // take care of context menus first if long pressed item is already selected
                if (args.isLongTouch === true) {
                    if (args.kind === "cell" && itemsAreEqual(gridSelection.current?.cell, args.location)) {
                        onCellContextMenu?.([clickLocation, args.location[1]], {
                            ...args,
                            preventDefault,
                        });
                        return;
                    } else if (args.kind === "header" && gridSelection.columns.hasIndex(col)) {
                        onHeaderContextMenu?.(clickLocation, { ...args, preventDefault });
                        return;
                    } else if (args.kind === groupHeaderKind) {
                        if (clickLocation < 0) {
                            return;
                        }

                        onGroupHeaderContextMenu?.(clickLocation, { ...args, preventDefault });
                        return;
                    }
                }
                if (args.kind === "cell") {
                    // click that cell
                    if (!handleMaybeClick(args)) {
                        handleSelect(args);
                    }
                } else if (args.kind === groupHeaderKind) {
                    onGroupHeaderClicked?.(clickLocation, { ...args, preventDefault });
                } else {
                    if (args.kind === headerKind) {
                        onHeaderClicked?.(clickLocation, {
                            ...args,
                            preventDefault,
                        });
                    }
                    handleSelect(args);
                }
                return;
            }

            if (args.kind === "header") {
                if (clickLocation < 0) {
                    return;
                }

                if (args.isEdge) {
                    if (args.isDoubleClick === true) {
                        void normalSizeColumn(col);
                    }
                } else if (args.button === 0 && col === lastMouseDownCol && row === lastMouseDownRow) {
                    onHeaderClicked?.(clickLocation, { ...args, preventDefault });
                }
            }

            if (args.kind === groupHeaderKind) {
                if (clickLocation < 0) {
                    return;
                }

                if (args.button === 0 && col === lastMouseDownCol && row === lastMouseDownRow) {
                    onGroupHeaderClicked?.(clickLocation, { ...args, preventDefault });
                    if (!isPrevented.current) {
                        handleGroupHeaderSelection(args);
                    }
                }
            }

            if (args.kind === "cell" && (args.button === 0 || args.button === 1)) {
                handleMaybeClick(args);
            }

            lastMouseSelectLocation.current = undefined;
        },
        [
            mouseState,
            gridSelection,
            rowMarkerOffset,
            fillHighlightRegion,
            fillPattern,
            setGridSelection,
            onCellClicked,
            getMangledCellContent,
            getCellRenderer,
            cellActivationBehavior,
            themeForCell,
            mangledOnCellsEdited,
            onCellActivated,
            reselect,
            onCellContextMenu,
            onHeaderContextMenu,
            onGroupHeaderContextMenu,
            handleSelect,
            onGroupHeaderClicked,
            onHeaderClicked,
            normalSizeColumn,
            handleGroupHeaderSelection,
        ]
    );

    const onMouseMoveImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            const a: GridMouseEventArgs = {
                ...args, // FIXME: Mutate
                location: [args.location[0] - rowMarkerOffset, args.location[1]] as any,
            };
            onMouseMove?.(a);

            if (mouseState !== undefined && args.buttons === 0) {
                setMouseState(undefined);
                setFillHighlightRegion(undefined);
                setScrollDir(undefined);
                isActivelyDraggingHeader.current = false;
            }

            setScrollDir(cv => {
                if (isActivelyDraggingHeader.current) return [args.scrollEdge[0], 0];
                if (args.scrollEdge[0] === cv?.[0] && args.scrollEdge[1] === cv[1]) return cv;
                return mouseState === undefined || (mouseDownData.current?.location[0] ?? 0) < rowMarkerOffset
                    ? undefined
                    : args.scrollEdge;
            });
        },
        [mouseState, onMouseMove, rowMarkerOffset]
    );

    const onHeaderMenuClickInner = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            onHeaderMenuClick?.(col - rowMarkerOffset, screenPosition);
        },
        [onHeaderMenuClick, rowMarkerOffset]
    );

    const onHeaderIndicatorClickInner = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            onHeaderIndicatorClick?.(col - rowMarkerOffset, screenPosition);
        },
        [onHeaderIndicatorClick, rowMarkerOffset]
    );

    const currentCell = gridSelection?.current?.cell;
    const onVisibleRegionChangedImpl = React.useCallback(
        (
            region: Rectangle,
            clientWidth: number,
            clientHeight: number,
            rightElWidth: number,
            tx: number,
            ty: number
        ) => {
            hasJustScrolled.current = false;
            let selected = currentCell;
            if (selected !== undefined) {
                selected = [selected[0] - rowMarkerOffset, selected[1]];
            }

            const freezeRegion =
                freezeColumns === 0
                    ? undefined
                    : {
                          x: 0,
                          y: region.y,
                          width: freezeColumns,
                          height: region.height,
                      };

            const freezeRegions: Rectangle[] = [];
            if (freezeRegion !== undefined) freezeRegions.push(freezeRegion);
            if (freezeTrailingRows > 0) {
                freezeRegions.push({
                    x: region.x - rowMarkerOffset,
                    y: rows - freezeTrailingRows,
                    width: region.width,
                    height: freezeTrailingRows,
                });

                if (freezeColumns > 0) {
                    freezeRegions.push({
                        x: 0,
                        y: rows - freezeTrailingRows,
                        width: freezeColumns,
                        height: freezeTrailingRows,
                    });
                }
            }

            const newRegion = {
                x: region.x - rowMarkerOffset,
                y: region.y,
                width: region.width,
                height: showTrailingBlankRow && region.y + region.height >= rows ? region.height - 1 : region.height,
                tx,
                ty,
                extras: {
                    selected,
                    freezeRegion,
                    freezeRegions,
                },
            };
            visibleRegionRef.current = newRegion;
            setVisibleRegion(newRegion);
            setClientSize([clientWidth, clientHeight, rightElWidth]);
            onVisibleRegionChanged?.(newRegion, newRegion.tx, newRegion.ty, newRegion.extras);
        },
        [
            currentCell,
            rowMarkerOffset,
            showTrailingBlankRow,
            rows,
            freezeColumns,
            freezeTrailingRows,
            setVisibleRegion,
            onVisibleRegionChanged,
        ]
    );

    const onColumnMovedImpl = whenDefined(
        onColumnMoved,
        React.useCallback(
            (startIndex: number, endIndex: number) => {
                onColumnMoved?.(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset);
                if (columnSelect !== "none") {
                    setSelectedColumns(CompactSelection.fromSingleSelection(endIndex), undefined, true);
                }
            },
            [columnSelect, onColumnMoved, rowMarkerOffset, setSelectedColumns]
        )
    );

    const isActivelyDragging = React.useRef(false);
    const onDragStartImpl = React.useCallback(
        (args: GridDragEventArgs) => {
            if (args.location[0] === 0 && rowMarkerOffset > 0) {
                args.preventDefault();
                return;
            }
            onDragStart?.({
                ...args,
                location: [args.location[0] - rowMarkerOffset, args.location[1]] as any,
            });

            if (!args.defaultPrevented()) {
                isActivelyDragging.current = true;
            }
            setMouseState(undefined);
        },
        [onDragStart, rowMarkerOffset]
    );

    const onDragEnd = React.useCallback(() => {
        isActivelyDragging.current = false;
    }, []);

    const rowGroupingSelectionBehavior = rowGrouping?.selectionBehavior;

    const getSelectionRowLimits = React.useCallback(
        (selectedRow: number): readonly [number, number] | undefined => {
            if (rowGroupingSelectionBehavior !== "block-spanning") return undefined;

            const { isGroupHeader, path, groupRows } = mapper(selectedRow);

            if (isGroupHeader) {
                return [selectedRow, selectedRow];
            }

            const groupRowIndex = path[path.length - 1];
            const lowerBounds = selectedRow - groupRowIndex;
            const upperBounds = selectedRow + groupRows - groupRowIndex - 1;

            return [lowerBounds, upperBounds];
        },
        [mapper, rowGroupingSelectionBehavior]
    );

    const hoveredRef = React.useRef<GridMouseEventArgs>();
    const onItemHoveredImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            // make sure we still have a button down
            if (mouseEventArgsAreEqual(args, hoveredRef.current)) return;
            hoveredRef.current = args;
            if (mouseDownData?.current?.button !== undefined && mouseDownData.current.button >= 1) return;
            if (
                args.buttons !== 0 &&
                mouseState !== undefined &&
                mouseDownData.current?.location[0] === 0 &&
                args.location[0] === 0 &&
                rowMarkerOffset === 1 &&
                rowSelect === "multi" &&
                mouseState.previousSelection &&
                !mouseState.previousSelection.rows.hasIndex(mouseDownData.current.location[1]) &&
                gridSelection.rows.hasIndex(mouseDownData.current.location[1])
            ) {
                const start = Math.min(mouseDownData.current.location[1], args.location[1]);
                const end = Math.max(mouseDownData.current.location[1], args.location[1]) + 1;
                setSelectedRows(CompactSelection.fromSingleSelection([start, end]), undefined, false);
            }
            if (
                args.buttons !== 0 &&
                mouseState !== undefined &&
                gridSelection.current !== undefined &&
                !isActivelyDragging.current &&
                !isActivelyDraggingHeader.current &&
                (rangeSelect === "rect" || rangeSelect === "multi-rect")
            ) {
                const [selectedCol, selectedRow] = gridSelection.current.cell;
                // eslint-disable-next-line prefer-const
                let [col, row] = args.location;

                if (row < 0) {
                    row = visibleRegionRef.current.y;
                }

                if (mouseState.fillHandle === true && mouseState.previousSelection?.current !== undefined) {
                    const prevRange = mouseState.previousSelection.current.range;
                    row = Math.min(row, showTrailingBlankRow ? rows - 1 : rows);
                    const rect = getClosestRect(prevRange, col, row, allowedFillDirections);
                    setFillHighlightRegion(rect);
                } else {
                    const startedFromLastStickyRow = showTrailingBlankRow && selectedRow === rows;
                    if (startedFromLastStickyRow) return;

                    const landedOnLastStickyRow = showTrailingBlankRow && row === rows;
                    if (landedOnLastStickyRow) {
                        if (args.kind === outOfBoundsKind) row--;
                        else return;
                    }

                    col = Math.max(col, rowMarkerOffset);
                    const clampLimits = getSelectionRowLimits(selectedRow);
                    row = clampLimits === undefined ? row : clamp(row, clampLimits[0], clampLimits[1]);

                    // FIXME: Restrict row based on rowGrouping.selectionBehavior here

                    const deltaX = col - selectedCol;
                    const deltaY = row - selectedRow;

                    const newRange: Rectangle = {
                        x: deltaX >= 0 ? selectedCol : col,
                        y: deltaY >= 0 ? selectedRow : row,
                        width: Math.abs(deltaX) + 1,
                        height: Math.abs(deltaY) + 1,
                    };

                    setCurrent(
                        {
                            ...gridSelection.current,
                            range: newRange,
                        },
                        true,
                        false,
                        "drag"
                    );
                }
            }

            onItemHovered?.({ ...args, location: [args.location[0] - rowMarkerOffset, args.location[1]] as any });
        },
        [
            mouseState,
            rowMarkerOffset,
            rowSelect,
            gridSelection,
            rangeSelect,
            onItemHovered,
            setSelectedRows,
            showTrailingBlankRow,
            rows,
            allowedFillDirections,
            getSelectionRowLimits,
            setCurrent,
        ]
    );

    const adjustSelectionOnScroll = React.useCallback(() => {
        const args = hoveredRef.current;
        if (args === undefined) return;
        const [xDir, yDir] = args.scrollEdge;
        let [col, row] = args.location;
        const visible = visibleRegionRef.current;
        if (xDir === -1) {
            col = visible.extras?.freezeRegion?.x ?? visible.x;
        } else if (xDir === 1) {
            col = visible.x + visible.width;
        }
        if (yDir === -1) {
            row = Math.max(0, visible.y);
        } else if (yDir === 1) {
            row = Math.min(rows - 1, visible.y + visible.height);
        }
        col = clamp(col, 0, mangledCols.length - 1);
        row = clamp(row, 0, rows - 1);
        onItemHoveredImpl({
            ...args,
            location: [col, row] as any,
        });
    }, [mangledCols.length, onItemHoveredImpl, rows]);

    useAutoscroll(scrollDir, scrollRef, adjustSelectionOnScroll);

    // 1 === move one
    // 2 === move to end
    const adjustSelection = React.useCallback(
        (direction: [0 | 1 | -1 | 2 | -2, 0 | 1 | -1 | 2 | -2]) => {
            if (gridSelection.current === undefined) return;

            const [x, y] = direction;
            const [col, row] = gridSelection.current.cell;
            const old = gridSelection.current.range;
            let left = old.x;
            let right = old.x + old.width;
            let top = old.y;
            let bottom = old.y + old.height;

            const [minRow, maxRowRaw] = getSelectionRowLimits(row) ?? [0, rows];
            const maxRow = maxRowRaw + 1; // we need an inclusive value

            // take care of vertical first in case new spans come in
            if (y !== 0) {
                switch (y) {
                    case 2: {
                        // go to end
                        bottom = maxRow;
                        top = row;
                        scrollTo(0, bottom, "vertical");

                        break;
                    }
                    case -2: {
                        // go to start
                        top = minRow;
                        bottom = row + 1;
                        scrollTo(0, top, "vertical");

                        break;
                    }
                    case 1: {
                        // motion down
                        if (top < row) {
                            top++;
                            scrollTo(0, top, "vertical");
                        } else {
                            bottom = Math.min(maxRow, bottom + 1);
                            scrollTo(0, bottom, "vertical");
                        }

                        break;
                    }
                    case -1: {
                        // motion up
                        if (bottom > row + 1) {
                            bottom--;
                            scrollTo(0, bottom, "vertical");
                        } else {
                            top = Math.max(minRow, top - 1);
                            scrollTo(0, top, "vertical");
                        }

                        break;
                    }
                    default: {
                        assertNever(y);
                    }
                }
            }

            if (x !== 0) {
                if (x === 2) {
                    right = mangledCols.length;
                    left = col;
                    scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
                } else if (x === -2) {
                    left = rowMarkerOffset;
                    right = col + 1;
                    scrollTo(left - rowMarkerOffset, 0, "horizontal");
                } else {
                    let disallowed: number[] = [];
                    if (getCellsForSelection !== undefined) {
                        const cells = getCellsForSelection(
                            {
                                x: left,
                                y: top,
                                width: right - left - rowMarkerOffset,
                                height: bottom - top,
                            },
                            abortControllerRef.current.signal
                        );

                        if (typeof cells === "object") {
                            disallowed = getSpanStops(cells);
                        }
                    }
                    if (x === 1) {
                        // motion right
                        let done = false;
                        if (left < col) {
                            if (disallowed.length > 0) {
                                const target = range(left + 1, col + 1).find(
                                    n => !disallowed.includes(n - rowMarkerOffset)
                                );
                                if (target !== undefined) {
                                    left = target;
                                    done = true;
                                }
                            } else {
                                left++;
                                done = true;
                            }
                            if (done) scrollTo(left, 0, "horizontal");
                        }
                        if (!done) {
                            right = Math.min(mangledCols.length, right + 1);
                            scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
                        }
                    } else if (x === -1) {
                        // motion left
                        let done = false;
                        if (right > col + 1) {
                            if (disallowed.length > 0) {
                                const target = range(right - 1, col, -1).find(
                                    n => !disallowed.includes(n - rowMarkerOffset)
                                );
                                if (target !== undefined) {
                                    right = target;
                                    done = true;
                                }
                            } else {
                                right--;
                                done = true;
                            }
                            if (done) scrollTo(right - rowMarkerOffset, 0, "horizontal");
                        }
                        if (!done) {
                            left = Math.max(rowMarkerOffset, left - 1);
                            scrollTo(left - rowMarkerOffset, 0, "horizontal");
                        }
                    } else {
                        assertNever(x);
                    }
                }
            }

            setCurrent(
                {
                    cell: gridSelection.current.cell,
                    range: {
                        x: left,
                        y: top,
                        width: right - left,
                        height: bottom - top,
                    },
                },
                true,
                false,
                "keyboard-select"
            );
        },
        [
            getCellsForSelection,
            getSelectionRowLimits,
            gridSelection,
            mangledCols.length,
            rowMarkerOffset,
            rows,
            scrollTo,
            setCurrent,
        ]
    );

    const updateSelectedCell = React.useCallback(
        (col: number, row: number, fromEditingTrailingRow: boolean, freeMove: boolean): boolean => {
            const rowMax = mangledRows - (fromEditingTrailingRow ? 0 : 1);
            col = clamp(col, rowMarkerOffset, columns.length - 1 + rowMarkerOffset);
            row = clamp(row, 0, rowMax);

            const curCol = currentCell?.[0];
            const curRow = currentCell?.[1];

            if (col === curCol && row === curRow) return false;
            if (freeMove && gridSelection.current !== undefined) {
                const newStack = [...gridSelection.current.rangeStack];
                if (gridSelection.current.range.width > 1 || gridSelection.current.range.height > 1) {
                    newStack.push(gridSelection.current.range);
                }
                setGridSelection(
                    {
                        ...gridSelection,
                        current: {
                            cell: [col, row],
                            range: { x: col, y: row, width: 1, height: 1 },
                            rangeStack: newStack,
                        },
                    },
                    true
                );
            } else {
                setCurrent(
                    {
                        cell: [col, row],
                        range: { x: col, y: row, width: 1, height: 1 },
                    },
                    true,
                    false,
                    "keyboard-nav"
                );
            }

            if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
                lastSent.current = undefined;
            }

            scrollTo(col - rowMarkerOffset, row);

            return true;
        },
        [
            mangledRows,
            rowMarkerOffset,
            columns.length,
            currentCell,
            gridSelection,
            scrollTo,
            setGridSelection,
            setCurrent,
        ]
    );

    const onFinishEditing = React.useCallback(
        (newValue: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => {
            if (overlay?.cell !== undefined && newValue !== undefined && isEditableGridCell(newValue)) {
                mangledOnCellsEdited([{ location: overlay.cell, value: newValue }]);
                window.requestAnimationFrame(() => {
                    gridRef.current?.damage([
                        {
                            cell: overlay.cell,
                        },
                    ]);
                });
            }
            focus(true);
            setOverlay(undefined);

            const [movX, movY] = movement;
            if (gridSelection.current !== undefined && (movX !== 0 || movY !== 0)) {
                const isEditingTrailingRow =
                    gridSelection.current.cell[1] === mangledRows - 1 && newValue !== undefined;
                updateSelectedCell(
                    clamp(gridSelection.current.cell[0] + movX, 0, mangledCols.length - 1),
                    clamp(gridSelection.current.cell[1] + movY, 0, mangledRows - 1),
                    isEditingTrailingRow,
                    false
                );
            }
            onFinishedEditing?.(newValue, movement);
        },
        [
            overlay?.cell,
            focus,
            gridSelection,
            onFinishedEditing,
            mangledOnCellsEdited,
            mangledRows,
            updateSelectedCell,
            mangledCols.length,
        ]
    );

    const overlayID = React.useMemo(() => {
        return `gdg-overlay-${idCounter++}`;
    }, []);

    const deleteRange = React.useCallback(
        (r: Rectangle) => {
            focus();
            const editList: EditListItem[] = [];
            for (let x = r.x; x < r.x + r.width; x++) {
                for (let y = r.y; y < r.y + r.height; y++) {
                    const cellValue = getCellContent([x - rowMarkerOffset, y]);
                    if (!cellValue.allowOverlay && cellValue.kind !== GridCellKind.Boolean) continue;
                    let newVal: InnerGridCell | undefined = undefined;
                    if (cellValue.kind === GridCellKind.Custom) {
                        const toDelete = getCellRenderer(cellValue);
                        const editor = toDelete?.provideEditor?.(cellValue);
                        if (toDelete?.onDelete !== undefined) {
                            newVal = toDelete.onDelete(cellValue);
                        } else if (isObjectEditorCallbackResult(editor)) {
                            newVal = editor?.deletedValue?.(cellValue);
                        }
                    } else if (
                        (isEditableGridCell(cellValue) && cellValue.allowOverlay) ||
                        cellValue.kind === GridCellKind.Boolean
                    ) {
                        const toDelete = getCellRenderer(cellValue);
                        newVal = toDelete?.onDelete?.(cellValue);
                    }
                    if (newVal !== undefined && !isInnerOnlyCell(newVal) && isEditableGridCell(newVal)) {
                        editList.push({ location: [x, y], value: newVal });
                    }
                }
            }
            mangledOnCellsEdited(editList);
            gridRef.current?.damage(editList.map(x => ({ cell: x.location })));
        },
        [focus, getCellContent, getCellRenderer, mangledOnCellsEdited, rowMarkerOffset]
    );

    const overlayOpen = overlay !== undefined;

    const handleFixedKeybindings = React.useCallback(
        (event: GridKeyEventArgs): boolean => {
            const cancel = () => {
                event.stopPropagation();
                event.preventDefault();
            };

            const details = {
                didMatch: false,
            };

            const { bounds } = event;
            const selectedColumns = gridSelection.columns;
            const selectedRows = gridSelection.rows;

            const keys = keybindings;

            if (!overlayOpen && isHotkey(keys.clear, event, details)) {
                setGridSelection(emptyGridSelection, false);
                onSelectionCleared?.();
            } else if (!overlayOpen && isHotkey(keys.selectAll, event, details)) {
                setGridSelection(
                    {
                        columns: CompactSelection.empty(),
                        rows: CompactSelection.empty(),
                        current: {
                            cell: gridSelection.current?.cell ?? [rowMarkerOffset, 0],
                            range: {
                                x: rowMarkerOffset,
                                y: 0,
                                width: columnsIn.length,
                                height: rows,
                            },
                            rangeStack: [],
                        },
                    },
                    false
                );
            } else if (isHotkey(keys.search, event, details)) {
                searchInputRef?.current?.focus({ preventScroll: true });
                setShowSearchInner(true);
            } else if (isHotkey(keys.delete, event, details)) {
                const callbackResult = onDelete?.(gridSelection) ?? true;
                if (callbackResult !== false) {
                    const toDelete = callbackResult === true ? gridSelection : callbackResult;

                    // delete order:
                    // 1) primary range
                    // 2) secondary ranges
                    // 3) columns
                    // 4) rows

                    if (toDelete.current !== undefined) {
                        deleteRange(toDelete.current.range);
                        for (const r of toDelete.current.rangeStack) {
                            deleteRange(r);
                        }
                    }

                    for (const r of toDelete.rows) {
                        deleteRange({
                            x: rowMarkerOffset,
                            y: r,
                            width: columnsIn.length,
                            height: 1,
                        });
                    }

                    for (const col of toDelete.columns) {
                        deleteRange({
                            x: col,
                            y: 0,
                            width: 1,
                            height: rows,
                        });
                    }
                }
            }

            if (details.didMatch) {
                cancel();
                return true;
            }

            if (gridSelection.current === undefined) return false;
            let [col, row] = gridSelection.current.cell;
            const [, startRow] = gridSelection.current.cell;
            let freeMove = false;
            let cancelOnlyOnMove = false;

            if (isHotkey(keys.scrollToSelectedCell, event, details)) {
                scrollToRef.current(col - rowMarkerOffset, row);
            } else if (columnSelect !== "none" && isHotkey(keys.selectColumn, event, details)) {
                if (selectedColumns.hasIndex(col)) {
                    setSelectedColumns(selectedColumns.remove(col), undefined, true);
                } else {
                    if (columnSelect === "single") {
                        setSelectedColumns(CompactSelection.fromSingleSelection(col), undefined, true);
                    } else {
                        setSelectedColumns(undefined, col, true);
                    }
                }
            } else if (rowSelect !== "none" && isHotkey(keys.selectRow, event, details)) {
                if (selectedRows.hasIndex(row)) {
                    setSelectedRows(selectedRows.remove(row), undefined, true);
                } else {
                    if (rowSelect === "single") {
                        setSelectedRows(CompactSelection.fromSingleSelection(row), undefined, true);
                    } else {
                        setSelectedRows(undefined, row, true);
                    }
                }
            } else if (!overlayOpen && bounds !== undefined && isHotkey(keys.activateCell, event, details)) {
                if (row === rows && showTrailingBlankRow) {
                    window.setTimeout(() => {
                        const customTargetColumn = getCustomNewRowTargetColumn(col);
                        void appendRow(customTargetColumn ?? col);
                    }, 0);
                } else {
                    onCellActivated?.([col - rowMarkerOffset, row]);
                    reselect(bounds, true);
                }
            } else if (gridSelection.current.range.height > 1 && isHotkey(keys.downFill, event, details)) {
                fillDown();
            } else if (gridSelection.current.range.width > 1 && isHotkey(keys.rightFill, event, details)) {
                fillRight();
            } else if (isHotkey(keys.goToNextPage, event, details)) {
                row += Math.max(1, visibleRegionRef.current.height - 4); // partial cell accounting
            } else if (isHotkey(keys.goToPreviousPage, event, details)) {
                row -= Math.max(1, visibleRegionRef.current.height - 4); // partial cell accounting
            } else if (isHotkey(keys.goToFirstCell, event, details)) {
                setOverlay(undefined);
                row = 0;
                col = 0;
            } else if (isHotkey(keys.goToLastCell, event, details)) {
                setOverlay(undefined);
                row = Number.MAX_SAFE_INTEGER;
                col = Number.MAX_SAFE_INTEGER;
            } else if (isHotkey(keys.selectToFirstCell, event, details)) {
                setOverlay(undefined);
                adjustSelection([-2, -2]);
            } else if (isHotkey(keys.selectToLastCell, event, details)) {
                setOverlay(undefined);
                adjustSelection([2, 2]);
            } else if (!overlayOpen) {
                if (isHotkey(keys.goDownCell, event, details)) {
                    row += 1;
                } else if (isHotkey(keys.goUpCell, event, details)) {
                    row -= 1;
                } else if (isHotkey(keys.goRightCell, event, details)) {
                    col += 1;
                } else if (isHotkey(keys.goLeftCell, event, details)) {
                    col -= 1;
                } else if (isHotkey(keys.goDownCellRetainSelection, event, details)) {
                    row += 1;
                    freeMove = true;
                } else if (isHotkey(keys.goUpCellRetainSelection, event, details)) {
                    row -= 1;
                    freeMove = true;
                } else if (isHotkey(keys.goRightCellRetainSelection, event, details)) {
                    col += 1;
                    freeMove = true;
                } else if (isHotkey(keys.goLeftCellRetainSelection, event, details)) {
                    col -= 1;
                    freeMove = true;
                } else if (isHotkey(keys.goToLastRow, event, details)) {
                    row = rows - 1;
                } else if (isHotkey(keys.goToFirstRow, event, details)) {
                    row = Number.MIN_SAFE_INTEGER;
                } else if (isHotkey(keys.goToLastColumn, event, details)) {
                    col = Number.MAX_SAFE_INTEGER;
                } else if (isHotkey(keys.goToFirstColumn, event, details)) {
                    col = Number.MIN_SAFE_INTEGER;
                } else if (rangeSelect === "rect" || rangeSelect === "multi-rect") {
                    if (isHotkey(keys.selectGrowDown, event, details)) {
                        adjustSelection([0, 1]);
                    } else if (isHotkey(keys.selectGrowUp, event, details)) {
                        adjustSelection([0, -1]);
                    } else if (isHotkey(keys.selectGrowRight, event, details)) {
                        adjustSelection([1, 0]);
                    } else if (isHotkey(keys.selectGrowLeft, event, details)) {
                        adjustSelection([-1, 0]);
                    } else if (isHotkey(keys.selectToLastRow, event, details)) {
                        adjustSelection([0, 2]);
                    } else if (isHotkey(keys.selectToFirstRow, event, details)) {
                        adjustSelection([0, -2]);
                    } else if (isHotkey(keys.selectToLastColumn, event, details)) {
                        adjustSelection([2, 0]);
                    } else if (isHotkey(keys.selectToFirstColumn, event, details)) {
                        adjustSelection([-2, 0]);
                    }
                }
                cancelOnlyOnMove = details.didMatch;
            } else {
                if (isHotkey(keys.closeOverlay, event, details)) {
                    setOverlay(undefined);
                }

                if (isHotkey(keys.acceptOverlayDown, event, details)) {
                    setOverlay(undefined);
                    row++;
                }

                if (isHotkey(keys.acceptOverlayUp, event, details)) {
                    setOverlay(undefined);
                    row--;
                }

                if (isHotkey(keys.acceptOverlayLeft, event, details)) {
                    setOverlay(undefined);
                    col--;
                }

                if (isHotkey(keys.acceptOverlayRight, event, details)) {
                    setOverlay(undefined);
                    col++;
                }
            }
            // #endregion

            const mustRestrictRow = rowGroupingNavBehavior !== undefined && rowGroupingNavBehavior !== "normal";

            if (mustRestrictRow && row !== startRow) {
                const skipUp =
                    rowGroupingNavBehavior === "skip-up" ||
                    rowGroupingNavBehavior === "skip" ||
                    rowGroupingNavBehavior === "block";
                const skipDown =
                    rowGroupingNavBehavior === "skip-down" ||
                    rowGroupingNavBehavior === "skip" ||
                    rowGroupingNavBehavior === "block";
                const didMoveUp = row < startRow;
                if (didMoveUp && skipUp) {
                    while (row >= 0 && mapper(row).isGroupHeader) {
                        row--;
                    }

                    if (row < 0) {
                        row = startRow;
                    }
                } else if (!didMoveUp && skipDown) {
                    while (row < rows && mapper(row).isGroupHeader) {
                        row++;
                    }

                    if (row >= rows) {
                        row = startRow;
                    }
                }
            }

            const moved = updateSelectedCell(col, row, false, freeMove);

            const didMatch = details.didMatch;

            if (didMatch && (moved || !cancelOnlyOnMove || trapFocus)) {
                cancel();
            }

            return didMatch;
        },
        [
            rowGroupingNavBehavior,
            overlayOpen,
            gridSelection,
            keybindings,
            columnSelect,
            rowSelect,
            rangeSelect,
            rowMarkerOffset,
            mapper,
            rows,
            updateSelectedCell,
            setGridSelection,
            onSelectionCleared,
            columnsIn.length,
            onDelete,
            trapFocus,
            deleteRange,
            setSelectedColumns,
            setSelectedRows,
            showTrailingBlankRow,
            getCustomNewRowTargetColumn,
            appendRow,
            onCellActivated,
            reselect,
            fillDown,
            fillRight,
            adjustSelection,
        ]
    );

    const onKeyDown = React.useCallback(
        (event: GridKeyEventArgs) => {
            let cancelled = false;
            if (onKeyDownIn !== undefined) {
                onKeyDownIn({
                    ...event,
                    cancel: () => {
                        cancelled = true;
                    },
                });
            }

            if (cancelled) return;

            if (handleFixedKeybindings(event)) return;

            if (gridSelection.current === undefined) return;
            const [col, row] = gridSelection.current.cell;
            const vr = visibleRegionRef.current;

            if (
                editOnType &&
                !event.metaKey &&
                !event.ctrlKey &&
                gridSelection.current !== undefined &&
                event.key.length === 1 &&
                /[ -~]/g.test(event.key) &&
                event.bounds !== undefined &&
                isReadWriteCell(getCellContent([col - rowMarkerOffset, Math.max(0, Math.min(row, rows - 1))]))
            ) {
                if (
                    (!showTrailingBlankRow || row !== rows) &&
                    (vr.y > row || row > vr.y + vr.height || vr.x > col || col > vr.x + vr.width)
                ) {
                    return;
                }
                reselect(event.bounds, true, event.key);
                event.stopPropagation();
                event.preventDefault();
            }
        },
        [
            editOnType,
            onKeyDownIn,
            handleFixedKeybindings,
            gridSelection,
            getCellContent,
            rowMarkerOffset,
            rows,
            showTrailingBlankRow,
            reselect,
        ]
    );

    const onContextMenu = React.useCallback(
        (args: GridMouseEventArgs, preventDefault: () => void) => {
            const adjustedCol = args.location[0] - rowMarkerOffset;
            if (args.kind === "header") {
                onHeaderContextMenu?.(adjustedCol, { ...args, preventDefault });
            }

            if (args.kind === groupHeaderKind) {
                if (adjustedCol < 0) {
                    return;
                }
                onGroupHeaderContextMenu?.(adjustedCol, { ...args, preventDefault });
            }

            if (args.kind === "cell") {
                const [col, row] = args.location;
                onCellContextMenu?.([adjustedCol, row], {
                    ...args,
                    preventDefault,
                });

                if (!gridSelectionHasItem(gridSelection, args.location)) {
                    updateSelectedCell(col, row, false, false);
                }
            }
        },
        [
            gridSelection,
            onCellContextMenu,
            onGroupHeaderContextMenu,
            onHeaderContextMenu,
            rowMarkerOffset,
            updateSelectedCell,
        ]
    );

    const onPasteInternal = React.useCallback(
        async (e?: ClipboardEvent) => {
            if (!keybindings.paste) return;
            function pasteToCell(
                inner: InnerGridCell,
                target: Item,
                rawValue: string | boolean | string[] | number | boolean | BooleanEmpty | BooleanIndeterminate,
                formatted?: string | string[]
            ): EditListItem | undefined {
                const stringifiedRawValue =
                    typeof rawValue === "object" ? rawValue?.join("\n") ?? "" : rawValue?.toString() ?? "";

                if (!isInnerOnlyCell(inner) && isReadWriteCell(inner) && inner.readonly !== true) {
                    const coerced = coercePasteValue?.(stringifiedRawValue, inner);
                    if (coerced !== undefined && isEditableGridCell(coerced)) {
                        if (process.env.NODE_ENV !== "production" && coerced.kind !== inner.kind) {
                            // eslint-disable-next-line no-console
                            console.warn("Coercion should not change cell kind.");
                        }
                        return {
                            location: target,
                            value: coerced,
                        };
                    }
                    const r = getCellRenderer(inner);
                    if (r === undefined) return undefined;
                    if (r.kind === GridCellKind.Custom) {
                        assert(inner.kind === GridCellKind.Custom);
                        const newVal = (r as unknown as CustomRenderer<CustomCell<any>>).onPaste?.(
                            stringifiedRawValue,
                            inner.data
                        );
                        if (newVal === undefined) return undefined;
                        return {
                            location: target,
                            value: {
                                ...inner,
                                data: newVal,
                            },
                        };
                    } else {
                        const newVal = r.onPaste?.(stringifiedRawValue, inner, {
                            formatted,
                            formattedString: typeof formatted === "string" ? formatted : formatted?.join("\n"),
                            rawValue,
                        });
                        if (newVal === undefined) return undefined;
                        assert(newVal.kind === inner.kind);
                        return {
                            location: target,
                            value: newVal,
                        };
                    }
                }
                return undefined;
            }

            const selectedColumns = gridSelection.columns;
            const selectedRows = gridSelection.rows;
            const focused =
                scrollRef.current?.contains(document.activeElement) === true ||
                canvasRef.current?.contains(document.activeElement) === true;

            let target: Item | undefined;

            if (gridSelection.current !== undefined) {
                target = [gridSelection.current.range.x, gridSelection.current.range.y];
            } else if (selectedColumns.length === 1) {
                target = [selectedColumns.first() ?? 0, 0];
            } else if (selectedRows.length === 1) {
                target = [rowMarkerOffset, selectedRows.first() ?? 0];
            }

            if (focused && target !== undefined) {
                let data: CopyBuffer | undefined;
                let text: string | undefined;

                const textPlain = "text/plain";
                const textHtml = "text/html";

                if (navigator.clipboard.read !== undefined) {
                    const clipboardContent = await navigator.clipboard.read();

                    for (const item of clipboardContent) {
                        if (item.types.includes(textHtml)) {
                            const htmlBlob = await item.getType(textHtml);
                            const html = await htmlBlob.text();
                            const decoded = decodeHTML(html);
                            if (decoded !== undefined) {
                                data = decoded;
                                break;
                            }
                        }
                        if (item.types.includes(textPlain)) {
                            // eslint-disable-next-line unicorn/no-await-expression-member
                            text = await (await item.getType(textPlain)).text();
                        }
                    }
                } else if (navigator.clipboard.readText !== undefined) {
                    text = await navigator.clipboard.readText();
                } else if (e !== undefined && e?.clipboardData !== null) {
                    if (e.clipboardData.types.includes(textHtml)) {
                        const html = e.clipboardData.getData(textHtml);
                        data = decodeHTML(html);
                    }
                    if (data === undefined && e.clipboardData.types.includes(textPlain)) {
                        text = e.clipboardData.getData(textPlain);
                    }
                } else {
                    return; // I didn't want to read that paste value anyway
                }

                const [targetCol, targetRow] = target;

                const editList: EditListItem[] = [];
                do {
                    if (onPaste === undefined) {
                        const cellData = getMangledCellContent(target);
                        const rawValue = text ?? data?.map(r => r.map(cb => cb.rawValue).join("\t")).join("\t") ?? "";
                        const newVal = pasteToCell(cellData, target, rawValue, undefined);
                        if (newVal !== undefined) {
                            editList.push(newVal);
                        }
                        break;
                    }

                    if (data === undefined) {
                        if (text === undefined) return;
                        data = unquote(text);
                    }

                    if (
                        onPaste === false ||
                        (typeof onPaste === "function" &&
                            onPaste?.(
                                [target[0] - rowMarkerOffset, target[1]],
                                data.map(r => r.map(cb => cb.rawValue?.toString() ?? ""))
                            ) !== true)
                    ) {
                        return;
                    }

                    for (const [row, dataRow] of data.entries()) {
                        if (row + targetRow >= rows) break;
                        for (const [col, dataItem] of dataRow.entries()) {
                            const index = [col + targetCol, row + targetRow] as const;
                            const [writeCol, writeRow] = index;
                            if (writeCol >= mangledCols.length) continue;
                            if (writeRow >= mangledRows) continue;
                            const cellData = getMangledCellContent(index);
                            const newVal = pasteToCell(cellData, index, dataItem.rawValue, dataItem.formatted);
                            if (newVal !== undefined) {
                                editList.push(newVal);
                            }
                        }
                    }
                    // eslint-disable-next-line no-constant-condition
                } while (false);

                mangledOnCellsEdited(editList);

                gridRef.current?.damage(
                    editList.map(c => ({
                        cell: c.location,
                    }))
                );
            }
        },
        [
            coercePasteValue,
            getCellRenderer,
            getMangledCellContent,
            gridSelection,
            keybindings.paste,
            mangledCols.length,
            mangledOnCellsEdited,
            mangledRows,
            onPaste,
            rowMarkerOffset,
            rows,
        ]
    );

    useEventListener("paste", onPasteInternal, safeWindow, false, true);

    // While this function is async, we deeply prefer not to await if we don't have to. This will lead to unpacking
    // promises in rather awkward ways when possible to avoid awaiting. We have to use fallback copy mechanisms when
    // an await has happened.
    const onCopy = React.useCallback(
        async (e?: ClipboardEvent, ignoreFocus?: boolean) => {
            if (!keybindings.copy) return;
            const focused =
                ignoreFocus === true ||
                scrollRef.current?.contains(document.activeElement) === true ||
                canvasRef.current?.contains(document.activeElement) === true;

            const selectedColumns = gridSelection.columns;
            const selectedRows = gridSelection.rows;

            const copyToClipboardWithHeaders = (
                cells: readonly (readonly GridCell[])[],
                columnIndexes: readonly number[]
            ) => {
                if (!copyHeaders) {
                    copyToClipboard(cells, columnIndexes, e);
                } else {
                    const headers = columnIndexes.map(index => ({
                        kind: GridCellKind.Text,
                        data: columnsIn[index].title,
                        displayData: columnsIn[index].title,
                        allowOverlay: false,
                    })) as GridCell[];
                    copyToClipboard([headers, ...cells], columnIndexes, e);
                }
            };

            if (focused && getCellsForSelection !== undefined) {
                if (gridSelection.current !== undefined) {
                    let thunk = getCellsForSelection(gridSelection.current.range, abortControllerRef.current.signal);
                    if (typeof thunk !== "object") {
                        thunk = await thunk();
                    }
                    copyToClipboardWithHeaders(
                        thunk,
                        range(
                            gridSelection.current.range.x - rowMarkerOffset,
                            gridSelection.current.range.x + gridSelection.current.range.width - rowMarkerOffset
                        )
                    );
                } else if (selectedRows !== undefined && selectedRows.length > 0) {
                    const toCopy = [...selectedRows];
                    const cells = toCopy.map(rowIndex => {
                        const thunk = getCellsForSelection(
                            {
                                x: rowMarkerOffset,
                                y: rowIndex,
                                width: columnsIn.length,
                                height: 1,
                            },
                            abortControllerRef.current.signal
                        );
                        if (typeof thunk === "object") {
                            return thunk[0];
                        }
                        return thunk().then(v => v[0]);
                    });
                    if (cells.some(x => x instanceof Promise)) {
                        const settled = await Promise.all(cells);
                        copyToClipboardWithHeaders(settled, range(columnsIn.length));
                    } else {
                        copyToClipboardWithHeaders(cells as (readonly GridCell[])[], range(columnsIn.length));
                    }
                } else if (selectedColumns.length > 0) {
                    const results: (readonly (readonly GridCell[])[])[] = [];
                    const cols: number[] = [];
                    for (const col of selectedColumns) {
                        let thunk = getCellsForSelection(
                            {
                                x: col,
                                y: 0,
                                width: 1,
                                height: rows,
                            },
                            abortControllerRef.current.signal
                        );
                        if (typeof thunk !== "object") {
                            thunk = await thunk();
                        }
                        results.push(thunk);
                        cols.push(col - rowMarkerOffset);
                    }
                    if (results.length === 1) {
                        copyToClipboardWithHeaders(results[0], cols);
                    } else {
                        // FIXME: this is dumb
                        const toCopy = results.reduce((pv, cv) => pv.map((row, index) => [...row, ...cv[index]]));
                        copyToClipboardWithHeaders(toCopy, cols);
                    }
                }
            }
        },
        [columnsIn, getCellsForSelection, gridSelection, keybindings.copy, rowMarkerOffset, rows, copyHeaders]
    );

    useEventListener("copy", onCopy, safeWindow, false, false);

    const onCut = React.useCallback(
        async (e?: ClipboardEvent) => {
            if (!keybindings.cut) return;
            const focused =
                scrollRef.current?.contains(document.activeElement) === true ||
                canvasRef.current?.contains(document.activeElement) === true;

            if (!focused) return;
            await onCopy(e);
            if (gridSelection.current !== undefined) {
                let effectiveSelection: GridSelection = {
                    current: {
                        cell: gridSelection.current.cell,
                        range: gridSelection.current.range,
                        rangeStack: [],
                    },
                    rows: CompactSelection.empty(),
                    columns: CompactSelection.empty(),
                };
                const onDeleteResult = onDelete?.(effectiveSelection);
                if (onDeleteResult === false) return;
                effectiveSelection = onDeleteResult === true ? effectiveSelection : onDeleteResult;
                if (effectiveSelection.current === undefined) return;
                deleteRange(effectiveSelection.current.range);
            }
        },
        [deleteRange, gridSelection, keybindings.cut, onCopy, onDelete]
    );

    useEventListener("cut", onCut, safeWindow, false, false);

    const onSearchResultsChanged = React.useCallback(
        (results: readonly Item[], navIndex: number) => {
            if (onSearchResultsChangedIn !== undefined) {
                if (rowMarkerOffset !== 0) {
                    results = results.map(item => [item[0] - rowMarkerOffset, item[1]]);
                }
                onSearchResultsChangedIn(results, navIndex);
                return;
            }
            if (results.length === 0 || navIndex === -1) return;

            const [col, row] = results[navIndex];
            if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
                return;
            }
            lastSent.current = [col, row];
            updateSelectedCell(col, row, false, false);
        },
        [onSearchResultsChangedIn, rowMarkerOffset, updateSelectedCell]
    );

    // this effects purpose in life is to scroll the newly selected cell into view when and ONLY when that cell
    // is from an external gridSelection change. Also note we want the unmangled out selection because scrollTo
    // expects unmangled indexes
    const [outCol, outRow] = gridSelectionOuter?.current?.cell ?? [];
    const scrollToRef = React.useRef(scrollTo);
    scrollToRef.current = scrollTo;
    React.useLayoutEffect(() => {
        if (
            !hasJustScrolled.current &&
            outCol !== undefined &&
            outRow !== undefined &&
            (outCol !== expectedExternalGridSelection.current?.current?.cell[0] ||
                outRow !== expectedExternalGridSelection.current?.current?.cell[1])
        ) {
            scrollToRef.current(outCol, outRow);
        }
        hasJustScrolled.current = false; //only allow skipping a single scroll
    }, [outCol, outRow]);

    const selectionOutOfBounds =
        gridSelection.current !== undefined &&
        (gridSelection.current.cell[0] >= mangledCols.length || gridSelection.current.cell[1] >= mangledRows);
    React.useLayoutEffect(() => {
        if (selectionOutOfBounds) {
            setGridSelection(emptyGridSelection, false);
        }
    }, [selectionOutOfBounds, setGridSelection]);

    const disabledRows = React.useMemo(() => {
        if (showTrailingBlankRow === true && trailingRowOptions?.tint === true) {
            return CompactSelection.fromSingleSelection(mangledRows - 1);
        }
        return CompactSelection.empty();
    }, [mangledRows, showTrailingBlankRow, trailingRowOptions?.tint]);

    const mangledVerticalBorder = React.useCallback(
        (col: number) => {
            return typeof verticalBorder === "boolean"
                ? verticalBorder
                : verticalBorder?.(col - rowMarkerOffset) ?? true;
        },
        [rowMarkerOffset, verticalBorder]
    );

    const renameGroupNode = React.useMemo(() => {
        if (renameGroup === undefined || canvasRef.current === null) return null;
        const { bounds, group } = renameGroup;
        const canvasBounds = canvasRef.current.getBoundingClientRect();
        return (
            <GroupRename
                bounds={bounds}
                group={group}
                canvasBounds={canvasBounds}
                onClose={() => setRenameGroup(undefined)}
                onFinish={newVal => {
                    setRenameGroup(undefined);
                    onGroupHeaderRenamed?.(group, newVal);
                }}
            />
        );
    }, [onGroupHeaderRenamed, renameGroup]);

    const mangledFreezeColumns = Math.min(mangledCols.length, freezeColumns + (hasRowMarkers ? 1 : 0));

    React.useImperativeHandle(
        forwardedRef,
        () => ({
            appendRow: (col: number, openOverlay?: boolean) => appendRow(col + rowMarkerOffset, openOverlay),
            updateCells: damageList => {
                if (rowMarkerOffset !== 0) {
                    damageList = damageList.map(x => ({ cell: [x.cell[0] + rowMarkerOffset, x.cell[1]] }));
                }
                return gridRef.current?.damage(damageList);
            },
            getBounds: (col, row) => {
                if (canvasRef?.current === null || scrollRef?.current === null) {
                    return undefined;
                }

                if (col === undefined && row === undefined) {
                    // Return the bounds of the entire scroll area:
                    const rect = canvasRef.current.getBoundingClientRect();
                    const scale = rect.width / scrollRef.current.clientWidth;
                    return {
                        x: rect.x - scrollRef.current.scrollLeft * scale,
                        y: rect.y - scrollRef.current.scrollTop * scale,
                        width: scrollRef.current.scrollWidth * scale,
                        height: scrollRef.current.scrollHeight * scale,
                    };
                }
                return gridRef.current?.getBounds((col ?? 0) + rowMarkerOffset, row);
            },
            focus: () => gridRef.current?.focus(),
            emit: async e => {
                switch (e) {
                    case "delete":
                        onKeyDown({
                            bounds: undefined,
                            cancel: () => undefined,
                            stopPropagation: () => undefined,
                            preventDefault: () => undefined,
                            ctrlKey: false,
                            key: "Delete",
                            keyCode: 46,
                            metaKey: false,
                            shiftKey: false,
                            altKey: false,
                            rawEvent: undefined,
                            location: undefined,
                        });
                        break;
                    case "fill-right":
                        onKeyDown({
                            bounds: undefined,
                            cancel: () => undefined,
                            stopPropagation: () => undefined,
                            preventDefault: () => undefined,
                            ctrlKey: true,
                            key: "r",
                            keyCode: 82,
                            metaKey: false,
                            shiftKey: false,
                            altKey: false,
                            rawEvent: undefined,
                            location: undefined,
                        });
                        break;
                    case "fill-down":
                        onKeyDown({
                            bounds: undefined,
                            cancel: () => undefined,
                            stopPropagation: () => undefined,
                            preventDefault: () => undefined,
                            ctrlKey: true,
                            key: "d",
                            keyCode: 68,
                            metaKey: false,
                            shiftKey: false,
                            altKey: false,
                            rawEvent: undefined,
                            location: undefined,
                        });
                        break;
                    case "copy":
                        await onCopy(undefined, true);
                        break;
                    case "paste":
                        await onPasteInternal();
                        break;
                }
            },
            scrollTo,
            remeasureColumns: cols => {
                for (const col of cols) {
                    void normalSizeColumn(col + rowMarkerOffset);
                }
            },
        }),
        [appendRow, normalSizeColumn, onCopy, onKeyDown, onPasteInternal, rowMarkerOffset, scrollTo]
    );

    const [selCol, selRow] = currentCell ?? [];
    const onCellFocused = React.useCallback(
        (cell: Item) => {
            const [col, row] = cell;

            if (row === -1) {
                if (columnSelect !== "none") {
                    setSelectedColumns(CompactSelection.fromSingleSelection(col), undefined, false);
                    focus();
                }
                return;
            }

            if (selCol === col && selRow === row) return;
            setCurrent(
                {
                    cell,
                    range: { x: col, y: row, width: 1, height: 1 },
                },
                true,
                false,
                "keyboard-nav"
            );
            scrollTo(col, row);
        },
        [columnSelect, focus, scrollTo, selCol, selRow, setCurrent, setSelectedColumns]
    );

    const [isFocused, setIsFocused] = React.useState(false);
    const setIsFocusedDebounced = React.useRef(
        debounce((val: boolean) => {
            setIsFocused(val);
        }, 5)
    );

    const onCanvasFocused = React.useCallback(() => {
        setIsFocusedDebounced.current(true);

        // check for mouse state, don't do anything if the user is clicked to focus.
        if (
            gridSelection.current === undefined &&
            gridSelection.columns.length === 0 &&
            gridSelection.rows.length === 0 &&
            mouseState === undefined
        ) {
            setCurrent(
                {
                    cell: [rowMarkerOffset, cellYOffset],
                    range: {
                        x: rowMarkerOffset,
                        y: cellYOffset,
                        width: 1,
                        height: 1,
                    },
                },
                true,
                false,
                "keyboard-select"
            );
        }
    }, [cellYOffset, gridSelection, mouseState, rowMarkerOffset, setCurrent]);

    const onFocusOut = React.useCallback(() => {
        setIsFocusedDebounced.current(false);
    }, []);

    const [idealWidth, idealHeight] = React.useMemo(() => {
        let h: number;
        const scrollbarWidth = experimental?.scrollbarWidthOverride ?? getScrollBarWidth();
        const rowsCountWithTrailingRow = rows + (showTrailingBlankRow ? 1 : 0);
        if (typeof rowHeight === "number") {
            h = totalHeaderHeight + rowsCountWithTrailingRow * rowHeight;
        } else {
            let avg = 0;
            const toAverage = Math.min(rowsCountWithTrailingRow, 10);
            for (let i = 0; i < toAverage; i++) {
                avg += rowHeight(i);
            }
            avg = Math.floor(avg / toAverage);

            h = totalHeaderHeight + rowsCountWithTrailingRow * avg;
        }
        h += scrollbarWidth;

        const w = mangledCols.reduce((acc, x) => x.width + acc, 0) + scrollbarWidth;

        // We need to set a reasonable cap here as some browsers will just ignore huge values
        // rather than treat them as huge values.
        return [`${Math.min(100_000, w)}px`, `${Math.min(100_000, h)}px`];
    }, [mangledCols, experimental?.scrollbarWidthOverride, rowHeight, rows, showTrailingBlankRow, totalHeaderHeight]);

    const cssStyle = React.useMemo(() => {
        return makeCSSStyle(mergedTheme);
    }, [mergedTheme]);

    return (
        <ThemeContext.Provider value={mergedTheme}>
            <DataEditorContainer
                style={cssStyle}
                className={className}
                inWidth={width ?? idealWidth}
                inHeight={height ?? idealHeight}>
                <DataGridSearch
                    fillHandle={fillHandle}
                    drawFocusRing={drawFocusRing}
                    experimental={experimental}
                    fixedShadowX={fixedShadowX}
                    fixedShadowY={fixedShadowY}
                    getRowThemeOverride={getRowThemeOverride}
                    headerIcons={headerIcons}
                    imageWindowLoader={imageWindowLoader}
                    initialSize={initialSize}
                    isDraggable={isDraggable}
                    onDragLeave={onDragLeave}
                    onRowMoved={onRowMoved}
                    overscrollX={overscrollX}
                    overscrollY={overscrollY}
                    preventDiagonalScrolling={preventDiagonalScrolling}
                    rightElement={rightElement}
                    rightElementProps={rightElementProps}
                    smoothScrollX={smoothScrollX}
                    smoothScrollY={smoothScrollY}
                    className={className}
                    enableGroups={enableGroups}
                    onCanvasFocused={onCanvasFocused}
                    onCanvasBlur={onFocusOut}
                    canvasRef={canvasRef}
                    onContextMenu={onContextMenu}
                    theme={mergedTheme}
                    cellXOffset={cellXOffset}
                    cellYOffset={cellYOffset}
                    accessibilityHeight={visibleRegion.height}
                    onDragEnd={onDragEnd}
                    columns={mangledCols}
                    nonGrowWidth={nonGrowWidth}
                    drawHeader={drawHeader}
                    onColumnProposeMove={onColumnProposeMove}
                    drawCell={drawCell}
                    disabledRows={disabledRows}
                    freezeColumns={mangledFreezeColumns}
                    lockColumns={rowMarkerOffset}
                    firstColAccessible={rowMarkerOffset === 0}
                    getCellContent={getMangledCellContent}
                    minColumnWidth={minColumnWidth}
                    maxColumnWidth={maxColumnWidth}
                    searchInputRef={searchInputRef}
                    showSearch={showSearch}
                    onSearchClose={onSearchClose}
                    highlightRegions={highlightRegions}
                    getCellsForSelection={getCellsForSelection}
                    getGroupDetails={mangledGetGroupDetails}
                    headerHeight={headerHeight}
                    isFocused={isFocused}
                    groupHeaderHeight={enableGroups ? groupHeaderHeight : 0}
                    freezeTrailingRows={
                        freezeTrailingRows + (showTrailingBlankRow && trailingRowOptions?.sticky === true ? 1 : 0)
                    }
                    hasAppendRow={showTrailingBlankRow}
                    onColumnResize={onColumnResize}
                    onColumnResizeEnd={onColumnResizeEnd}
                    onColumnResizeStart={onColumnResizeStart}
                    onCellFocused={onCellFocused}
                    onColumnMoved={onColumnMovedImpl}
                    onDragStart={onDragStartImpl}
                    onHeaderMenuClick={onHeaderMenuClickInner}
                    onHeaderIndicatorClick={onHeaderIndicatorClickInner}
                    onItemHovered={onItemHoveredImpl}
                    isFilling={mouseState?.fillHandle === true}
                    onMouseMove={onMouseMoveImpl}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUpIn}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onDragOverCell={onDragOverCell}
                    onDrop={onDrop}
                    onSearchResultsChanged={onSearchResultsChanged}
                    onVisibleRegionChanged={onVisibleRegionChangedImpl}
                    clientSize={clientSize}
                    rowHeight={rowHeight}
                    searchResults={searchResults}
                    searchValue={searchValue}
                    onSearchValueChange={onSearchValueChange}
                    rows={mangledRows}
                    scrollRef={scrollRef}
                    selection={gridSelection}
                    translateX={visibleRegion.tx}
                    translateY={visibleRegion.ty}
                    verticalBorder={mangledVerticalBorder}
                    gridRef={gridRef}
                    getCellRenderer={getCellRenderer}
                />
                {renameGroupNode}
                {overlay !== undefined && (
                    <React.Suspense fallback={null}>
                        <DataGridOverlayEditor
                            {...overlay}
                            validateCell={validateCell}
                            bloom={editorBloom}
                            id={overlayID}
                            getCellRenderer={getCellRenderer}
                            className={experimental?.isSubGrid === true ? "click-outside-ignore" : undefined}
                            provideEditor={provideEditor}
                            imageEditorOverride={imageEditorOverride}
                            onFinishEditing={onFinishEditing}
                            markdownDivCreateNode={markdownDivCreateNode}
                            isOutsideClick={isOutsideClick}
                        />
                    </React.Suspense>
                )}
            </DataEditorContainer>
        </ThemeContext.Provider>
    );
};

/**
 * The primary component of Glide Data Grid.
 * @category DataEditor
 * @param {DataEditorProps} props
 */
export const DataEditor = React.forwardRef(DataEditorImpl);
