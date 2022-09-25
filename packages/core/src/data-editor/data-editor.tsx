/* eslint-disable sonarjs/no-duplicate-string */
import * as React from "react";
import { assert, assertNever, maybe } from "../common/support";
import clamp from "lodash/clamp.js";
import uniq from "lodash/uniq.js";
import flatten from "lodash/flatten.js";
import range from "lodash/range.js";
import debounce from "lodash/debounce.js";
import DataGridOverlayEditor from "../data-grid-overlay-editor/data-grid-overlay-editor";
import {
    EditableGridCell,
    GridCell,
    GridCellKind,
    GridDragEventArgs,
    GridKeyEventArgs,
    GridMouseEventArgs,
    GridSelection,
    isEditableGridCell,
    Rectangle,
    isReadWriteCell,
    InnerGridCell,
    InnerGridCellKind,
    CompactSelection,
    Slice,
    isInnerOnlyCell,
    ProvideEditorCallback,
    DrawCustomCellCallback,
    GridMouseCellEventArgs,
    GridColumn,
    isObjectEditorCallbackResult,
    GroupHeaderClickedEventArgs,
    HeaderClickedEventArgs,
    CellClickedEventArgs,
    Item,
    MarkerCell,
    headerCellUnheckedMarker,
    headerCellCheckedMarker,
    headerCellIndeterminateMarker,
    groupHeaderKind,
    outOfBoundsKind,
    ValidatedGridCell,
    ImageEditorType,
    CustomCell,
} from "../data-grid/data-grid-types";
import DataGridSearch, { DataGridSearchProps } from "../data-grid-search/data-grid-search";
import { browserIsOSX } from "../common/browser-detect";
import { getDataEditorTheme, makeCSSStyle, Theme, ThemeContext } from "../common/styles";
import type { DataGridRef } from "../data-grid/data-grid";
import { getScrollBarWidth, useEventListener, useStateWithReactiveInput, whenDefined } from "../common/utils";
import { isGroupEqual } from "../data-grid/data-grid-lib";
import { GroupRename } from "./group-rename";
import { measureColumn, useColumnSizer } from "./use-column-sizer";
import { isHotkey } from "../common/is-hotkey";
import { SelectionBlending, useSelectionBehavior } from "../data-grid/use-selection-behavior";
import { useCellsForSelection } from "./use-cells-for-selection";
import { unquote, expandSelection, copyToClipboard, decodeHTML } from "./data-editor-fns";
import { DataEditorContainer } from "../data-editor-container/data-grid-container";
import { toggleBoolean } from "../data-grid/cells/boolean-cell";
import { useAutoscroll } from "./use-autoscroll";
import type { CustomRenderer, CellRenderer } from "../data-grid/cells/cell-types";
import { CellRenderers } from "../data-grid/cells";

let idCounter = 0;

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
        | "drawCustomCell"
        | "enableGroups"
        | "firstColAccessible"
        | "firstColSticky"
        | "freezeColumns"
        | "getCellContent"
        | "getCellRenderer"
        | "getCellsForSelection"
        | "gridRef"
        | "groupHeaderHeight"
        | "headerHeight"
        | "isFilling"
        | "isFocused"
        | "lockColumns"
        | "maxColumnWidth"
        | "minColumnWidth"
        | "onCanvasBlur"
        | "onCanvasFocused"
        | "onCellFocused"
        | "onContextMenu"
        | "onDragEnd"
        | "onMouseDown"
        | "onMouseMove"
        | "onMouseUp"
        | "onSearchResultsChanged"
        | "onVisibleRegionChanged"
        | "rowHeight"
        | "rows"
        | "scrollRef"
        | "searchColOffset"
        | "searchInputRef"
        | "selectedColumns"
        | "selection"
        | "theme"
        | "trailingRowType"
        | "translateX"
        | "translateY"
        | "verticalBorder"
    >
>;

type EditListItem = { location: Item; value: EditableGridCell };

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

interface Keybinds {
    readonly selectAll: boolean;
    readonly selectRow: boolean;
    readonly selectColumn: boolean;
    readonly downFill: boolean;
    readonly rightFill: boolean;
    readonly pageUp: boolean;
    readonly pageDown: boolean;
    readonly clear: boolean;
    readonly copy: boolean;
    readonly paste: boolean;
    readonly search: boolean;
    readonly first: boolean;
    readonly last: boolean;
}

const keybindingDefaults: Keybinds = {
    selectAll: true,
    selectRow: true,
    selectColumn: true,
    downFill: false,
    rightFill: false,
    pageUp: false,
    pageDown: false,
    clear: true,
    copy: true,
    paste: true,
    search: false,
    first: true,
    last: true,
};

/**
 * @category DataEditor
 */
export interface DataEditorProps extends Props {
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

    /** Determins if row markers should be automatically added to the grid.
     * @defaultValue `none`
     * @group Style
     */
    readonly rowMarkers?: "checkbox" | "number" | "clickable-number" | "both" | "none";
    /**
     * Sets the width of row markers in pixels, if unset row markers will automatically size.
     * @group Style
     */
    readonly rowMarkerWidth?: number;
    /** Changes the starting index for row markers.
     * @defaultValue 1
     * @group Style
     */
    readonly rowMarkerStartIndex?: number;

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
     * Callback used to override the rendering of any cell.
     * @group Drawing
     */
    readonly drawCell?: DrawCustomCellCallback;

    /**
     * The current selection of the data grid. Contains all selected cells, ranges, rows, and columns.
     * @group Selection
     */
    readonly gridSelection?: GridSelection;
    /**
     * Emitted whenever the grid selection changes.
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
        tx?: number,
        ty?: number,
        extras?: {
            /** The selected item if visible */
            selected?: Item;
            /** A selection of visible freeze columns */
            freezeRegion?: Rectangle;
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
     * Determins which keybindings are enabled.
     * @group Editing
     * @defaultValue is
     
            {  
                selectAll: true,
                selectRow: true,
                selectColumn: true,
                downFill: false,
                rightFill: false,
                pageUp: false,
                pageDown: false,
                clear: true,
                copy: true,
                paste: true,
                search: false,
                first: true,
                last: true,
            }
     */
    readonly keybindings?: Partial<Keybinds>;

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

    /**
     * An array of custom renderers which can be used to extend the data grid.
     * @group Advanced
     */
    readonly customRenderers?: readonly CustomRenderer<CustomCell<any>>[];
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
    appendRow: (col: number) => Promise<void>;
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
    const [overlay, setOverlay] =
        React.useState<{
            target: Rectangle;
            content: GridCell;
            theme: Theme;
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

    const {
        rowMarkers = "none",
        rowHeight = 34,
        headerHeight = 36,
        rowMarkerWidth: rowMarkerWidthRaw,
        imageEditorOverride,
        getRowThemeOverride,
        markdownDivCreateNode,
    } = p;

    const {
        width,
        height,
        columns: columnsIn,
        rows,
        getCellContent,
        onCellClicked,
        onCellActivated,
        onFinishedEditing,
        coercePasteValue,
        drawHeader: drawHeaderIn,
        onHeaderClicked,
        spanRangeBehavior = "default",
        onGroupHeaderClicked,
        onCellContextMenu,
        className,
        theme,
        onHeaderContextMenu,
        getCellsForSelection: getCellsForSelectionIn,
        onGroupHeaderContextMenu,
        onGroupHeaderRenamed,
        onCellEdited,
        onCellsEdited,
        onKeyDown: onKeyDownIn,
        onKeyUp: onKeyUpIn,
        keybindings: keybindingsIn,
        onRowAppended,
        onColumnMoved,
        validateCell: validateCellIn,
        highlightRegions: highlightRegionsIn,
        drawCell,
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
        groupHeaderHeight = headerHeight,
        freezeColumns = 0,
        rowSelectionMode = "auto",
        rowMarkerStartIndex = 1,
        onHeaderMenuClick,
        getGroupDetails,
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
        drawFocusRing,
        experimental,
        fixedShadowX,
        fixedShadowY,
        headerIcons,
        imageWindowLoader,
        initialSize,
        isDraggable,
        onDragLeave,
        onRowMoved,
        overscrollX,
        overscrollY,
        preventDiagonalScrolling,
        rightElement,
        rightElementProps,
        showMinimap,
        smoothScrollX,
        smoothScrollY,
        scrollToEnd,
    } = p;

    const minColumnWidth = Math.max(minColumnWidthIn, 20);
    const maxColumnWidth = Math.max(maxColumnWidthIn, minColumnWidth);
    const maxColumnAutoWidth = Math.max(maxColumnAutoWidthIn ?? maxColumnWidth, minColumnWidth);

    const keybindings = React.useMemo(() => {
        return keybindingsIn === undefined
            ? keybindingDefaults
            : {
                  ...keybindingDefaults,
                  ...keybindingsIn,
              };
    }, [keybindingsIn]);

    const rowMarkerWidth = rowMarkerWidthRaw ?? (rows > 10_000 ? 48 : rows > 1000 ? 44 : rows > 100 ? 36 : 32);
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

    const abortControllerRef = React.useRef(new AbortController());
    React.useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            abortControllerRef?.current.abort();
        };
    }, []);

    const [getCellsForSelection, getCellsForSeletionDirect] = useCellsForSelection(
        getCellsForSelectionIn,
        getCellContent,
        rowMarkerOffset,
        abortControllerRef.current
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
            args => {
                return drawHeaderIn?.({ ...args, columnIndex: args.columnIndex - rowMarkerOffset }) ?? false;
            },
            [drawHeaderIn, rowMarkerOffset]
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
        return { ...getDataEditorTheme(), ...theme };
    }, [theme]);

    const [clientSize, setClientSize] = React.useState<readonly [number, number, number]>([10, 10, 0]);

    const getCellRenderer: <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined = React.useCallback(
        <T extends InnerGridCell>(cell: T) => {
            if (cell.kind !== GridCellKind.Custom) {
                return CellRenderers[cell.kind] as unknown as CellRenderer<T>;
            }
            return additionalRenderers?.find(x => x.isMatch(cell)) as CellRenderer<T>;
        },
        [additionalRenderers]
    );

    const columns = useColumnSizer(
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

    const enableGroups = React.useMemo(() => {
        return columns.some(c => c.group !== undefined);
    }, [columns]);

    const totalHeaderHeight = enableGroups ? headerHeight + groupHeaderHeight : headerHeight;

    const numSelectedRows = gridSelection.rows.length;
    const rowMarkerHeader =
        rowMarkers === "none"
            ? ""
            : numSelectedRows === 0
            ? headerCellUnheckedMarker
            : numSelectedRows === rows
            ? headerCellCheckedMarker
            : headerCellIndeterminateMarker;

    const mangledCols = React.useMemo(() => {
        if (rowMarkers === "none") return columns;
        return [
            {
                title: rowMarkerHeader,
                width: rowMarkerWidth,
                icon: undefined,
                hasMenu: false,
                style: "normal" as const,
            },
            ...columns,
        ];
    }, [columns, rowMarkerWidth, rowMarkers, rowMarkerHeader]);

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
            freezeRegion?: Rectangle;
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

    const highlightRegions = React.useMemo(() => {
        if (highlightRegionsIn === undefined) return undefined;
        if (rowMarkerOffset === 0) return highlightRegionsIn;

        return highlightRegionsIn
            .map(r => {
                const maxWidth = mangledCols.length - r.range.x - rowMarkerOffset;
                if (maxWidth <= 0) return undefined;
                return {
                    color: r.color,
                    range: {
                        ...r.range,
                        x: r.range.x + rowMarkerOffset,
                        width: Math.min(maxWidth, r.range.width),
                    },
                    style: r.style,
                };
            })
            .filter(x => x !== undefined) as typeof highlightRegionsIn;
    }, [highlightRegionsIn, mangledCols.length, rowMarkerOffset]);

    const mangledColsRef = React.useRef(mangledCols);
    mangledColsRef.current = mangledCols;
    const getMangledCellContent = React.useCallback(
        ([col, row]: Item): InnerGridCell => {
            const isTrailing = showTrailingBlankRow && row === mangledRows - 1;
            const isRowMarkerCol = col === 0 && hasRowMarkers;
            if (isRowMarkerCol) {
                if (isTrailing) {
                    return loadingCell;
                }
                return {
                    kind: InnerGridCellKind.Marker,
                    allowOverlay: false,
                    checked: gridSelection?.rows.hasIndex(row) === true,
                    markerKind: rowMarkers === "clickable-number" ? "number" : rowMarkers,
                    row: rowMarkerStartIndex + row,
                    drawHandle: onRowMoved !== undefined,
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
                if (experimental?.strict === true) {
                    const vr = visibleRegionRef.current;
                    const isOutsideMainArea =
                        vr.x > outerCol || outerCol > vr.x + vr.width || vr.y > row || row > vr.y + vr.height;
                    const isSelected = outerCol === vr.extras?.selected?.[0] && row === vr.extras?.selected[1];
                    const isOutsideFreezeArea =
                        vr.extras?.freezeRegion === undefined ||
                        vr.extras.freezeRegion.x > outerCol ||
                        outerCol > vr.extras.freezeRegion.x + vr.extras.freezeRegion.width ||
                        vr.extras.freezeRegion.y > row ||
                        row > vr.extras.freezeRegion.y + vr.extras.freezeRegion.height;
                    if (isOutsideMainArea && !isSelected && isOutsideFreezeArea) {
                        return {
                            kind: GridCellKind.Loading,
                            allowOverlay: false,
                        };
                    }
                }
                let result = getCellContent([outerCol, row]);
                if (rowMarkerOffset !== 0 && result.span !== undefined) {
                    result = {
                        ...result,
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
            gridSelection?.rows,
            onRowMoved,
            rowMarkers,
            rowMarkerOffset,
            trailingRowOptions?.hint,
            trailingRowOptions?.addIcon,
            experimental?.strict,
            getCellContent,
            rowMarkerStartIndex,
        ]
    );

    const mangledGetGroupDetails = React.useCallback<NonNullable<DataEditorProps["getGroupDetails"]>>(
        group => {
            let result = getGroupDetails?.(group) ?? { name: group };
            if (onGroupHeaderRenamed !== undefined && group !== "") {
                result = {
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
                theme: { ...mergedTheme, ...groupTheme, ...colTheme, ...rowTheme, ...val.content.themeOverride },
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
                        if (lastRowSticky) {
                            trailingRowHeight = typeof rowHeight === "number" ? rowHeight : rowHeight(rows);
                        }

                        let sLeft = frozenWidth + scrollBounds.left + rowMarkerOffset * rowMarkerWidth;
                        let sRight = scrollBounds.right;
                        let sTop = scrollBounds.top + totalHeaderHeight;
                        let sBottom = scrollBounds.bottom - trailingRowHeight;

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

                        if (dir === "vertical" || col < freezeColumns) {
                            scrollX = 0;
                        } else if (dir === "horizontal") {
                            scrollY = 0;
                        }

                        if (scrollX !== 0 || scrollY !== 0) {
                            scrollRef.current.scrollTo(
                                scrollX + scrollRef.current.scrollLeft,
                                scrollY + scrollRef.current.scrollTop
                            );
                        }
                    }
                }
            }
        },
        [rowMarkerOffset, rowMarkerWidth, totalHeaderHeight, lastRowSticky, freezeColumns, columns, rowHeight, rows]
    );

    const focusCallback = React.useRef(focusOnRowFromTrailingBlankRow);
    const getCellContentRef = React.useRef(getCellContent);
    const rowsRef = React.useRef(rows);
    focusCallback.current = focusOnRowFromTrailingBlankRow;
    getCellContentRef.current = getCellContent;
    rowsRef.current = rows;
    const appendRow = React.useCallback(
        async (col: number): Promise<void> => {
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
                scrollTo(col - rowMarkerOffset, row);
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
                if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true) {
                    // wait for scroll to have a chance to process
                    window.setTimeout(() => {
                        focusCallback.current(col, row);
                    }, 0);
                }
            };
            // Queue up to allow the consumer to react to the event and let us check if they did
            doFocus();
        },
        [mangledCols, onRowAppended, rowMarkerOffset, rows, scrollTo, setCurrent]
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
        (cell: InnerGridCell, pos: Item): Theme => {
            const [col, row] = pos;
            return {
                ...mergedTheme,
                ...mangledCols[col]?.themeOverride,
                ...getRowThemeOverride?.(row),
                ...cell.themeOverride,
            };
        },
        [getRowThemeOverride, mangledCols, mergedTheme]
    );

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
            } else if (args.kind === outOfBoundsKind) {
                setGridSelection(emptyGridSelection, false);
                setOverlay(undefined);
                focus();
                onSelectionCleared?.();
                lastSelectedRowRef.current = undefined;
                lastSelectedColRef.current = undefined;
            }
        },
        [
            appendRow,
            columnSelect,
            focus,
            getCellRenderer,
            getCustomNewRowTargetColumn,
            getMangledCellContent,
            gridSelection,
            hasRowMarkers,
            lastRowSticky,
            onSelectionCleared,
            onRowMoved,
            rowMarkerOffset,
            rowMarkers,
            rowSelect,
            rowSelectionMode,
            rows,
            setCurrent,
            setGridSelection,
            setSelectedColumns,
            setSelectedRows,
            showTrailingBlankRow,
            themeForCell,
        ]
    );

    const lastMouseSelectLocation = React.useRef<[number, number]>();
    const touchDownArgs = React.useRef(visibleRegion);
    const mouseDownData =
        React.useRef<{
            wasDoubleClick: boolean;
            time: number;
            location: Item;
        }>();
    const onMouseDown = React.useCallback(
        (args: GridMouseEventArgs) => {
            isPrevented.current = false;
            touchDownArgs.current = visibleRegionRef.current;
            if (args.button !== 0) {
                mouseDownData.current = undefined;
                return;
            }

            const time = performance.now();
            const wasDoubleClick = time - (mouseDownData.current?.time ?? -1000) < 250;
            mouseDownData.current = {
                wasDoubleClick,
                time,
                location: args.location,
            };

            const fh = args.kind === "cell" && args.isFillHandle;

            if (!fh && args.kind !== "cell" && args.isEdge) return;

            setMouseState({
                previousSelection: gridSelection,
                fillHandle: fh,
            });
            lastMouseSelectLocation.current = undefined;

            if (!args.isTouch) {
                handleSelect(args);
            }
        },
        [gridSelection, handleSelect]
    );

    const [renameGroup, setRenameGroup] =
        React.useState<{
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

    const fillDown = React.useCallback(
        (reverse: boolean) => {
            if (gridSelection.current === undefined) return;
            const v: EditListItem[] = [];
            const r = gridSelection.current.range;
            for (let x = 0; x < r.width; x++) {
                const fillCol = x + r.x;
                const fillVal = getMangledCellContent([fillCol, reverse ? r.y + r.height - 1 : r.y]);
                if (isInnerOnlyCell(fillVal) || !isReadWriteCell(fillVal)) continue;
                for (let y = 1; y < r.height; y++) {
                    const fillRow = reverse ? r.y + r.height - (y + 1) : y + r.y;
                    const target = [fillCol, fillRow] as const;
                    v.push({
                        location: target,
                        value: { ...fillVal },
                    });
                }
            }

            mangledOnCellsEdited(v);

            gridRef.current?.damage(
                v.map(c => ({
                    cell: c.location,
                }))
            );
        },
        [getMangledCellContent, gridSelection, mangledOnCellsEdited]
    );

    const isPrevented = React.useRef(false);
    const onContextMenu = React.useCallback(
        (args: GridMouseEventArgs, preventDefault: () => void) => {
            const clickLocation = args.location[0] - rowMarkerOffset;
            if (args.kind === "header") {
                onHeaderContextMenu?.(clickLocation, { ...args, preventDefault });
            }

            if (args.kind === groupHeaderKind) {
                if (clickLocation < 0) {
                    return;
                }
                onGroupHeaderContextMenu?.(clickLocation, { ...args, preventDefault });
            }

            if (args.kind === "cell") {
                onCellContextMenu?.([clickLocation, args.location[1]], {
                    ...args,
                    preventDefault,
                });
            }
        },
        [onCellContextMenu, onGroupHeaderContextMenu, onHeaderContextMenu, rowMarkerOffset]
    );

    const normalSizeColumn = React.useCallback(
        async (col: number): Promise<void> => {
            if (
                mouseDownData.current?.wasDoubleClick === true &&
                getCellsForSelection !== undefined &&
                onColumnResize !== undefined
            ) {
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
                    ctx.font = `${mergedTheme.baseFontStyle} ${mergedTheme.fontFamily}`;
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

    const onMouseUp = React.useCallback(
        (args: GridMouseEventArgs, isOutside: boolean) => {
            const mouse = mouseState;
            setMouseState(undefined);
            setScrollDir(undefined);

            if (isOutside) return;

            const [col, row] = args.location;
            const [lastMouseDownCol, lastMouseDownRow] = lastMouseSelectLocation.current ?? [];

            const preventDefault = () => {
                isPrevented.current = true;
            };

            const handleMaybeClick = (a: GridMouseCellEventArgs): boolean => {
                if (lastMouseDownCol === col && lastMouseDownRow === row) {
                    onCellClicked?.([col - rowMarkerOffset, row], {
                        ...a,
                        preventDefault,
                    });
                }
                if (mouse?.fillHandle === true && gridSelection.current !== undefined) {
                    fillDown(gridSelection.current.cell[1] !== gridSelection.current.range.y);
                } else if (!isPrevented.current) {
                    const c = getMangledCellContent(args.location);
                    const r = getCellRenderer(c);
                    if (r !== undefined && r.onClick !== undefined) {
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
                    if (
                        !isPrevented.current &&
                        mouse?.previousSelection?.current?.cell !== undefined &&
                        gridSelection.current !== undefined
                    ) {
                        const [selectedCol, selectedRow] = gridSelection.current.cell;
                        const [prevCol, prevRow] = mouse.previousSelection.current.cell;
                        if (col === selectedCol && col === prevCol && row === selectedRow && row === prevRow) {
                            onCellActivated?.([col - rowMarkerOffset, row]);
                            reselect(a.bounds, false);
                            return true;
                        }
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
                    if (
                        args.kind === "cell" &&
                        gridSelection?.current?.cell[0] === col &&
                        gridSelection?.current?.cell[1] === row
                    ) {
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
                    handleSelect(args);
                }
                return;
            }

            if (args.kind === "header") {
                if (clickLocation < 0) {
                    return;
                }

                if (args.isEdge) {
                    void normalSizeColumn(col);
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

            if (args.kind === "cell" && args.button === 0) {
                handleMaybeClick(args);
            }

            lastMouseSelectLocation.current = undefined;
        },
        [
            mouseState,
            rowMarkerOffset,
            gridSelection,
            onCellClicked,
            fillDown,
            getMangledCellContent,
            getCellRenderer,
            themeForCell,
            mangledOnCellsEdited,
            onCellActivated,
            reselect,
            onCellContextMenu,
            onHeaderContextMenu,
            onGroupHeaderContextMenu,
            handleSelect,
            onGroupHeaderClicked,
            normalSizeColumn,
            onHeaderClicked,
            handleGroupHeaderSelection,
        ]
    );

    const onMouseMoveImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            const a: GridMouseEventArgs = {
                ...args,
                location: [args.location[0] - rowMarkerOffset, args.location[1]] as any,
            };
            onMouseMove?.(a);
            setScrollDir(cv => {
                if (args.scrollEdge[0] === cv?.[0] && args.scrollEdge[1] === cv[1]) return cv;
                return mouseState === undefined || (mouseDownData.current?.location[0] ?? 0) < rowMarkerOffset
                    ? undefined
                    : args.scrollEdge;
            });
        },
        [mouseState, onMouseMove, rowMarkerOffset]
    );

    useAutoscroll(scrollDir, scrollRef);

    const onHeaderMenuClickInner = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            onHeaderMenuClick?.(col - rowMarkerOffset, screenPosition);
        },
        [onHeaderMenuClick, rowMarkerOffset]
    );

    const currentCell = gridSelection?.current?.cell;
    const onVisibleRegionChangedImpl = React.useCallback(
        (
            region: Rectangle,
            clientWidth: number,
            clientHeight: number,
            rightElWidth: number,
            tx?: number,
            ty?: number
        ) => {
            let selected = currentCell;
            if (selected !== undefined) {
                selected = [selected[0] - rowMarkerOffset, selected[1]];
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
                    freezeRegion:
                        freezeColumns === 0
                            ? undefined
                            : {
                                  x: 0,
                                  y: region.y,
                                  width: freezeColumns,
                                  height: region.height,
                              },
                },
            };
            setClientSize([clientWidth, clientHeight, rightElWidth]);
            setVisibleRegion(newRegion);
            onVisibleRegionChanged?.(newRegion, newRegion.tx, newRegion.ty, newRegion.extras);
        },
        [
            currentCell,
            rowMarkerOffset,
            showTrailingBlankRow,
            rows,
            freezeColumns,
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

    const onItemHoveredImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            if (
                mouseState !== undefined &&
                gridSelection.current !== undefined &&
                !isActivelyDragging.current &&
                (rangeSelect === "rect" || rangeSelect === "multi-rect")
            ) {
                const [selectedCol, selectedRow] = gridSelection.current.cell;
                // eslint-disable-next-line prefer-const
                let [col, row] = args.location;

                if (row < 0) {
                    row = visibleRegionRef.current.y;
                }

                const landedOnLastStickyRow = lastRowSticky && row === rows;
                const startedFromLastStickyRow = lastRowSticky && selectedRow === rows;
                if (landedOnLastStickyRow || startedFromLastStickyRow) return;

                col = Math.max(col, rowMarkerOffset);

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

            onItemHovered?.({ ...args, location: [args.location[0] - rowMarkerOffset, args.location[1]] as any });
        },
        [mouseState, gridSelection, rangeSelect, onItemHovered, rowMarkerOffset, lastRowSticky, rows, setCurrent]
    );

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

            // take care of vertical first in case new spans come in
            if (y !== 0) {
                switch (y) {
                    case 2: {
                        // go to end
                        bottom = rows;
                        top = row;
                        scrollTo(0, bottom, "vertical");

                        break;
                    }
                    case -2: {
                        // go to start
                        top = 0;
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
                            bottom = Math.min(rows, bottom + 1);
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
                            top = Math.max(0, top - 1);
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
        [getCellsForSelection, gridSelection, mangledCols.length, rowMarkerOffset, rows, scrollTo, setCurrent]
    );

    const updateSelectedCell = React.useCallback(
        (col: number, row: number, fromEditingTrailingRow: boolean, freeMove: boolean): boolean => {
            const rowMax = mangledRows - (fromEditingTrailingRow ? 0 : 1);
            col = clamp(col, rowMarkerOffset, columns.length - 1 + rowMarkerOffset);
            row = clamp(row, 0, rowMax);

            if (col === currentCell?.[0] && row === currentCell?.[1]) return false;
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

    const onKeyDown = React.useCallback(
        (event: GridKeyEventArgs) => {
            const fn = async () => {
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

                const cancel = () => {
                    event.stopPropagation();
                    event.preventDefault();
                };

                const overlayOpen = overlay !== undefined;
                const { altKey, shiftKey, metaKey, ctrlKey, key, bounds } = event;
                const isOSX = browserIsOSX.value;
                const isPrimaryKey = isOSX ? metaKey : ctrlKey;
                const isDeleteKey = key === "Delete" || (isOSX && key === "Backspace");
                const vr = visibleRegionRef.current;
                const selectedColumns = gridSelection.columns;
                const selectedRows = gridSelection.rows;

                if (key === "Escape") {
                    if (overlayOpen) {
                        setOverlay(undefined);
                    } else if (keybindings.clear) {
                        setGridSelection(emptyGridSelection, false);
                        onSelectionCleared?.();
                    }
                    return;
                } else if (isHotkey("primary+a", event) && keybindings.selectAll) {
                    if (!overlayOpen) {
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
                    } else {
                        const el = document.getElementById(overlayID);
                        if (el !== null) {
                            const s = window.getSelection();
                            const r = document.createRange();
                            r.selectNodeContents(el);
                            s?.removeAllRanges();
                            s?.addRange(r);
                        }
                    }
                    cancel();
                    return;
                } else if (isHotkey("primary+f", event) && keybindings.search) {
                    cancel();
                    searchInputRef?.current?.focus({ preventScroll: true });
                    setShowSearchInner(true);
                }

                function deleteRange(r: Rectangle) {
                    focus();
                    const editList: EditListItem[] = [];
                    for (let x = r.x; x < r.x + r.width; x++) {
                        for (let y = r.y; y < r.y + r.height; y++) {
                            const cellValue = getCellContent([x - rowMarkerOffset, y]);
                            if (!cellValue.allowOverlay && cellValue.kind !== GridCellKind.Boolean) continue;
                            let newVal: InnerGridCell | undefined = undefined;
                            if (cellValue.kind === GridCellKind.Custom) {
                                const editor = provideEditor?.(cellValue);
                                if (isObjectEditorCallbackResult(editor)) {
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
                }

                if (isDeleteKey) {
                    const callbackResult = onDelete?.(gridSelection) ?? true;
                    cancel();
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
                                width: mangledCols.length - rowMarkerOffset,
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
                    return;
                }

                if (gridSelection.current === undefined) return;
                let [col, row] = gridSelection.current.cell;
                let freeMove = false;

                if (keybindings.selectColumn && isHotkey("ctrl+ ", event) && columnSelect !== "none") {
                    if (selectedColumns.hasIndex(col)) {
                        setSelectedColumns(selectedColumns.remove(col), undefined, true);
                    } else {
                        if (columnSelect === "single") {
                            setSelectedColumns(CompactSelection.fromSingleSelection(col), undefined, true);
                        } else {
                            setSelectedColumns(undefined, col, true);
                        }
                    }
                } else if (keybindings.selectRow && isHotkey("shift+ ", event) && rowSelect !== "none") {
                    if (selectedRows.hasIndex(row)) {
                        setSelectedRows(selectedRows.remove(row), undefined, true);
                    } else {
                        if (rowSelect === "single") {
                            setSelectedRows(CompactSelection.fromSingleSelection(row), undefined, true);
                        } else {
                            setSelectedRows(undefined, row, true);
                        }
                    }
                } else if (
                    (isHotkey("Enter", event) || isHotkey(" ", event) || isHotkey("shift+Enter", event)) &&
                    bounds !== undefined
                ) {
                    if (overlayOpen) {
                        setOverlay(undefined);
                        if (isHotkey("Enter", event)) {
                            row++;
                        } else if (isHotkey("shift+Enter", event)) {
                            row--;
                        }
                    } else if (row === rows && showTrailingBlankRow) {
                        window.setTimeout(() => {
                            const customTargetColumn = getCustomNewRowTargetColumn(col);
                            void appendRow(customTargetColumn ?? col);
                        }, 0);
                    } else {
                        onCellActivated?.([col - rowMarkerOffset, row]);
                        reselect(bounds, true);
                        cancel();
                    }
                } else if (
                    keybindings.downFill &&
                    isHotkey("primary+_68", event) &&
                    gridSelection.current.range.height > 1
                ) {
                    // ctrl/cmd + d
                    fillDown(false);
                    cancel();
                } else if (
                    keybindings.rightFill &&
                    isHotkey("primary+_82", event) &&
                    gridSelection.current.range.width > 1
                ) {
                    // ctrl/cmd + r
                    const editList: EditListItem[] = [];
                    const r = gridSelection.current.range;
                    for (let y = 0; y < r.height; y++) {
                        const fillRow = y + r.y;
                        const fillVal = getMangledCellContent([r.x, fillRow]);
                        if (isInnerOnlyCell(fillVal) || !isReadWriteCell(fillVal)) continue;
                        for (let x = 1; x < r.width; x++) {
                            const fillCol = x + r.x;
                            const target = [fillCol, fillRow] as const;
                            editList.push({
                                location: target,
                                value: { ...fillVal },
                            });
                        }
                    }
                    mangledOnCellsEdited(editList);
                    gridRef.current?.damage(
                        editList.map(c => ({
                            cell: c.location,
                        }))
                    );
                    cancel();
                } else if (keybindings.pageDown && isHotkey("PageDown", event)) {
                    row += Math.max(1, visibleRegionRef.current.height - 4); // partial cell accounting
                    cancel();
                } else if (keybindings.pageUp && isHotkey("PageUp", event)) {
                    row -= Math.max(1, visibleRegionRef.current.height - 4); // partial cell accounting
                    cancel();
                } else if (keybindings.first && isHotkey("primary+Home", event)) {
                    setOverlay(undefined);
                    row = 0;
                    col = 0;
                } else if (keybindings.last && isHotkey("primary+End", event)) {
                    setOverlay(undefined);
                    row = Number.MAX_SAFE_INTEGER;
                    col = Number.MAX_SAFE_INTEGER;
                } else if (keybindings.first && isHotkey("primary+shift+Home", event)) {
                    setOverlay(undefined);
                    adjustSelection([-2, -2]);
                } else if (keybindings.last && isHotkey("primary+shift+End", event)) {
                    setOverlay(undefined);
                    adjustSelection([2, 2]);
                    // eslint-disable-next-line unicorn/prefer-switch
                } else if (key === "ArrowDown") {
                    if (ctrlKey && altKey) {
                        return;
                    }
                    setOverlay(undefined);
                    if (shiftKey && (rangeSelect === "rect" || rangeSelect === "multi-rect")) {
                        // ctrl + alt is used as a screen reader command, let's not nuke it.
                        adjustSelection([0, isPrimaryKey && !altKey ? 2 : 1]);
                    } else {
                        if (altKey && !isPrimaryKey) {
                            freeMove = true;
                        }
                        if (isPrimaryKey && !altKey) {
                            row = rows - 1;
                        } else {
                            row += 1;
                        }
                    }
                } else if (key === "ArrowUp" || key === "Home") {
                    const asPrimary = key === "Home" || isPrimaryKey;
                    setOverlay(undefined);
                    if (shiftKey && (rangeSelect === "rect" || rangeSelect === "multi-rect")) {
                        // ctrl + alt is used as a screen reader command, let's not nuke it.
                        adjustSelection([0, asPrimary && !altKey ? -2 : -1]);
                    } else {
                        if (altKey && !asPrimary) {
                            freeMove = true;
                        }
                        row += asPrimary && !altKey ? Number.MIN_SAFE_INTEGER : -1;
                    }
                } else if (key === "ArrowRight" || key === "End") {
                    const asPrimary = key === "End" || isPrimaryKey;
                    setOverlay(undefined);
                    if (shiftKey && (rangeSelect === "rect" || rangeSelect === "multi-rect")) {
                        // ctrl + alt is used as a screen reader command, let's not nuke it.
                        adjustSelection([asPrimary && !altKey ? 2 : 1, 0]);
                    } else {
                        if (altKey && !asPrimary) {
                            freeMove = true;
                        }
                        col += asPrimary && !altKey ? Number.MAX_SAFE_INTEGER : 1;
                    }
                } else if (key === "ArrowLeft") {
                    setOverlay(undefined);
                    if (shiftKey && (rangeSelect === "rect" || rangeSelect === "multi-rect")) {
                        // ctrl + alt is used as a screen reader command, let's not nuke it.
                        adjustSelection([isPrimaryKey && !altKey ? -2 : -1, 0]);
                    } else {
                        if (altKey && !isPrimaryKey) {
                            freeMove = true;
                        }
                        col += isPrimaryKey && !altKey ? Number.MIN_SAFE_INTEGER : -1;
                    }
                } else if (key === "Tab") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        col--;
                    } else {
                        col++;
                    }
                } else if (
                    !metaKey &&
                    !ctrlKey &&
                    gridSelection.current !== undefined &&
                    key.length === 1 &&
                    /[ -~]/g.test(key) &&
                    bounds !== undefined &&
                    isReadWriteCell(getCellContent([col - rowMarkerOffset, Math.max(0, row - 1)]))
                ) {
                    if (
                        (!lastRowSticky || row !== rows) &&
                        (vr.y > row || row > vr.y + vr.height || vr.x > col || col > vr.x + vr.width)
                    ) {
                        return;
                    }
                    reselect(bounds, true, key);
                    cancel();
                }

                const moved = updateSelectedCell(col, row, false, freeMove);
                if (moved) {
                    cancel();
                }
            };
            void fn();
        },
        [
            onKeyDownIn,
            overlay,
            gridSelection,
            keybindings.selectAll,
            keybindings.search,
            keybindings.selectColumn,
            keybindings.selectRow,
            keybindings.downFill,
            keybindings.rightFill,
            keybindings.pageDown,
            keybindings.pageUp,
            keybindings.first,
            keybindings.last,
            keybindings.clear,
            columnSelect,
            rowSelect,
            getCellContent,
            rowMarkerOffset,
            updateSelectedCell,
            setGridSelection,
            onSelectionCleared,
            columnsIn.length,
            rows,
            overlayID,
            focus,
            mangledOnCellsEdited,
            provideEditor,
            getCellRenderer,
            onDelete,
            mangledCols.length,
            setSelectedColumns,
            setSelectedRows,
            showTrailingBlankRow,
            getCustomNewRowTargetColumn,
            appendRow,
            onCellActivated,
            reselect,
            fillDown,
            getMangledCellContent,
            adjustSelection,
            rangeSelect,
            lastRowSticky,
        ]
    );

    const onPasteInternal = React.useCallback(
        async (e?: ClipboardEvent) => {
            if (!keybindings.paste) return;
            function pasteToCell(inner: InnerGridCell, target: Item, toPaste: string): EditListItem | undefined {
                if (!isInnerOnlyCell(inner) && isReadWriteCell(inner) && inner.readonly !== true) {
                    const coerced = coercePasteValue?.(toPaste, inner);
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
                        const newVal = r.onPaste?.(toPaste, inner);
                        if (newVal === undefined) return undefined;
                        return {
                            location: target,
                            value: {
                                ...inner,
                                data: newVal,
                            },
                        };
                    } else {
                        const newVal = r.onPaste?.(toPaste, inner);
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

            let target = gridSelection.current?.cell;
            if (target === undefined && selectedColumns.length === 1) {
                target = [selectedColumns.first() ?? 0, 0];
            }
            if (target === undefined && selectedRows.length === 1) {
                target = [rowMarkerOffset, selectedRows.first() ?? 0];
            }

            if (focused && target !== undefined) {
                let data: string[][] | undefined;
                let text: string | undefined;

                const textPlain = "text/plain";
                const textHtml = "text/html";

                if (navigator.clipboard.read !== undefined) {
                    const clipboardContent = await navigator.clipboard.read();

                    for (const item of clipboardContent) {
                        if (item.types.includes(textHtml)) {
                            const htmlBlob = await item.getType(textHtml);
                            const html = await htmlBlob.text();
                            const fragment = document.createElement("html");
                            fragment.innerHTML = html;
                            const el = fragment.querySelector("table");
                            if (el !== null) {
                                data = decodeHTML(el);
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
                        const fragment = document.createElement("html");
                        fragment.innerHTML = html;
                        const el = fragment.querySelector("table");
                        if (el !== null) {
                            data = decodeHTML(el);
                        }
                    }
                    if (data === undefined && e.clipboardData.types.includes(textPlain)) {
                        text = e.clipboardData.getData(textPlain);
                    }
                } else {
                    return; // I didn't want to read that paste value anyway
                }

                const [gridCol, gridRow] = target;

                const editList: EditListItem[] = [];
                do {
                    if (onPaste === undefined) {
                        const cellData = getMangledCellContent(target);
                        const newVal = pasteToCell(
                            cellData,
                            target,
                            text ?? data?.map(r => r.join("\t")).join("\t") ?? ""
                        );
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
                            onPaste?.([target[0] - rowMarkerOffset, target[1]], data) !== true)
                    ) {
                        return;
                    }

                    for (const [row, dataRow] of data.entries()) {
                        if (row + gridRow >= rows) break;
                        for (const [col, dataItem] of dataRow.entries()) {
                            const index = [col + gridCol, row + gridRow] as const;
                            const cellData = getMangledCellContent(index);
                            const newVal = pasteToCell(cellData, index, dataItem);
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
            mangledOnCellsEdited,
            onPaste,
            rowMarkerOffset,
            rows,
        ]
    );

    useEventListener("paste", onPasteInternal, window, false, true);

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

            if (focused && getCellsForSelection !== undefined) {
                if (gridSelection.current !== undefined) {
                    let thunk = getCellsForSelection(gridSelection.current.range, abortControllerRef.current.signal);
                    if (typeof thunk !== "object") {
                        thunk = await thunk();
                    }
                    copyToClipboard(
                        thunk,
                        range(
                            gridSelection.current.range.x - rowMarkerOffset,
                            gridSelection.current.range.x + gridSelection.current.range.width - rowMarkerOffset
                        ),
                        e
                    );
                } else if (selectedRows !== undefined && selectedRows.length > 0) {
                    const toCopy = [...selectedRows];
                    const cells = toCopy.map(rowIndex => {
                        const thunk = getCellsForSelection(
                            {
                                x: rowMarkerOffset,
                                y: rowIndex,
                                width: columnsIn.length - rowMarkerOffset,
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
                        copyToClipboard(settled, range(columnsIn.length), e);
                    } else {
                        copyToClipboard(cells as (readonly GridCell[])[], range(columnsIn.length), e);
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
                        copyToClipboard(results[0], cols, e);
                    } else {
                        // FIXME: this is dumb
                        const toCopy = results.reduce((pv, cv) => pv.map((row, index) => [...row, ...cv[index]]));
                        copyToClipboard(toCopy, cols, e);
                    }
                }
            }
        },
        [columnsIn.length, getCellsForSelection, gridSelection, keybindings.copy, rowMarkerOffset, rows]
    );

    useEventListener("copy", onCopy, window, false, false);

    const onSearchResultsChanged = React.useCallback(
        (results: readonly Item[], navIndex: number) => {
            if (results.length === 0 || navIndex === -1) return;

            const [col, row] = results[navIndex];
            if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
                return;
            }
            lastSent.current = [col, row];
            updateSelectedCell(col, row, false, false);
        },
        [updateSelectedCell]
    );

    // this effects purpose in life is to scroll the newly selected cell into view when and ONLY when that cell
    // is from an external gridSelection change. Also note we want the unmangled out selection because scrollTo
    // expects unmangled indexes
    const [outCol, outRow] = gridSelectionOuter?.current?.cell ?? [];
    const scrollToRef = React.useRef(scrollTo);
    scrollToRef.current = scrollTo;
    React.useEffect(() => {
        if (
            outCol !== undefined &&
            outRow !== undefined &&
            (outCol !== expectedExternalGridSelection.current?.current?.cell[0] ||
                outRow !== expectedExternalGridSelection.current?.current?.cell[1])
        ) {
            scrollToRef.current(outCol, outRow);
        }
    }, [outCol, outRow]);

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
            appendRow: (col: number) => appendRow(col + rowMarkerOffset),
            updateCells: damageList => {
                if (rowMarkerOffset !== 0) {
                    damageList = damageList.map(x => ({ cell: [x.cell[0] + rowMarkerOffset, x.cell[1]] }));
                }
                return gridRef.current?.damage(damageList);
            },
            getBounds: (col, row) => {
                return gridRef.current?.getBounds(col + rowMarkerOffset, row);
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
        }),
        [appendRow, onCopy, onKeyDown, onPasteInternal, rowMarkerOffset, scrollTo]
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

    return (
        <ThemeContext.Provider value={mergedTheme}>
            <DataEditorContainer
                style={makeCSSStyle(mergedTheme)}
                className={className}
                inWidth={width ?? idealWidth}
                inHeight={height ?? idealHeight}>
                <DataGridSearch
                    fillHandle={fillHandle}
                    drawFocusRing={drawFocusRing}
                    experimental={experimental}
                    fixedShadowX={fixedShadowX}
                    fixedShadowY={fixedShadowY}
                    getRowThemeOverride={p.getRowThemeOverride}
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
                    showMinimap={showMinimap}
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
                    drawCustomCell={drawCell}
                    drawHeader={drawHeader}
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
                    trailingRowType={
                        !showTrailingBlankRow ? "none" : trailingRowOptions?.sticky === true ? "sticky" : "appended"
                    }
                    onColumnResize={onColumnResize}
                    onColumnResizeEnd={onColumnResizeEnd}
                    onColumnResizeStart={onColumnResizeStart}
                    onCellFocused={onCellFocused}
                    onColumnMoved={onColumnMovedImpl}
                    onDragStart={onDragStartImpl}
                    onHeaderMenuClick={onHeaderMenuClickInner}
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
                    clientSize={[clientSize[0], clientSize[1]]}
                    rowHeight={rowHeight}
                    rows={mangledRows}
                    scrollRef={scrollRef}
                    selection={gridSelection}
                    translateX={visibleRegion.tx}
                    translateY={visibleRegion.ty}
                    verticalBorder={mangledVerticalBorder}
                    gridRef={gridRef}
                    getCellRenderer={getCellRenderer}
                    scrollToEnd={scrollToEnd}
                />
                {renameGroupNode}
                {overlay !== undefined && (
                    <DataGridOverlayEditor
                        {...overlay}
                        validateCell={validateCell}
                        id={overlayID}
                        getCellRenderer={getCellRenderer}
                        className={experimental?.isSubGrid === true ? "click-outside-ignore" : undefined}
                        provideEditor={provideEditor}
                        imageEditorOverride={imageEditorOverride}
                        onFinishEditing={onFinishEditing}
                        markdownDivCreateNode={markdownDivCreateNode}
                    />
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
