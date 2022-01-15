import * as React from "react";
import { assertNever, maybe } from "../common/support";
import { clamp } from "lodash/fp";
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
    GridMouseHeaderEventArgs,
    GridMouseGroupHeaderEventArgs,
} from "../data-grid/data-grid-types";
import DataGridSearch, { DataGridSearchProps } from "../data-grid-search/data-grid-search";
import { browserIsOSX } from "../common/browser-detect";
import { OverlayImageEditorProps } from "../data-grid-overlay-editor/private/image-overlay-editor";
import { ThemeProvider, useTheme } from "styled-components";
import { getDataEditorTheme, Theme } from "../common/styles";
import { DataGridRef } from "../data-grid/data-grid";
import { useEventListener } from "../common/utils";
import { CellRenderers } from "../data-grid/cells";
import { isGroupEqual } from "../data-grid/data-grid-lib";
import { GroupRename } from "./group-rename";

interface MouseState {
    readonly previousSelection?: GridSelection;
}

type Props = Omit<
    DataGridSearchProps,
    | "canvasRef"
    | "cellXOffset"
    | "cellYOffset"
    | "className"
    | "disabledRows"
    | "drawCustomCell"
    | "enableGroups"
    | "firstColSticky"
    | "getCellContent"
    | "gridRef"
    | "headerHeight"
    | "groupHeaderHeight"
    | "lastRowSticky"
    | "lockColumns"
    | "onCellFocused"
    | "onKeyDown"
    | "onKeyUp"
    | "onMouseDown"
    | "onMouseUp"
    | "onMouseMove"
    | "freezeColumns"
    | "onSearchResultsChanged"
    | "onVisibleRegionChanged"
    | "rowHeight"
    | "verticalBorder"
    | "scrollRef"
    | "searchColOffset"
    | "selectedCell"
    | "selectedColumns"
    | "translateX"
    | "translateY"
>;

type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;

export type HeaderSelectionTrigger = "selection" | "drag" | "header" | "group";

interface PreventableEvent {
    preventDefault: () => void;
}
interface CellClickedEventArgs extends GridMouseCellEventArgs, PreventableEvent {}

interface HeaderClickedEventArgs extends GridMouseHeaderEventArgs, PreventableEvent {}

interface GroupHeaderClickedEventArgs extends GridMouseGroupHeaderEventArgs, PreventableEvent {}

export interface DataEditorProps extends Props {
    readonly onDeleteRows?: (rows: readonly number[]) => void;
    readonly onCellEdited?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
    readonly onRowAppended?: () => Promise<"top" | "bottom" | number | undefined> | void;
    readonly onHeaderClicked?: (colIndex: number, event: HeaderClickedEventArgs) => void;
    readonly onGroupHeaderClicked?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
    readonly onGroupHeaderRenamed?: (groupName: string, newVal: string) => void;
    readonly onCellClicked?: (cell: readonly [number, number], event: CellClickedEventArgs) => void;

    readonly trailingRowOptions?: {
        readonly tint?: boolean;
        readonly hint?: string;
        readonly sticky?: boolean;
    };
    readonly headerHeight?: number;
    readonly groupHeaderHeight?: number;

    readonly rowMarkers?: "checkbox" | "number" | "both" | "none";
    readonly rowMarkerWidth?: number;

    readonly rowHeight?: DataGridSearchProps["rowHeight"];
    readonly onMouseMove?: DataGridSearchProps["onMouseMove"];

    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;

    readonly provideEditor?: ProvideEditorCallback<GridCell>;

    readonly onSelectedRowsChange?: (newRows: CompactSelection) => void;

    readonly selectedColumns?: DataGridSearchProps["selectedColumns"];
    readonly onSelectedColumnsChange?: (newColumns: CompactSelection, trigger: HeaderSelectionTrigger) => void;

    /**
     * @deprecated Use drawCell instead. This will be removed in a future version.
     */
    readonly drawCustomCell?: (
        ctx: CanvasRenderingContext2D,
        cell: GridCell,
        theme: Theme,
        rect: Rectangle,
        hoverAmount: number
    ) => boolean;

    readonly drawCell?: DrawCustomCellCallback;

    readonly gridSelection?: GridSelection;
    readonly onGridSelectionChange?: (newSelection: GridSelection | undefined) => void;
    readonly onVisibleRegionChanged?: (range: Rectangle, tx?: number, ty?: number) => void;

    readonly getCellContent: ReplaceReturnType<DataGridSearchProps["getCellContent"], GridCell>;
    readonly rowSelectionMode?: "auto" | "multi";

    readonly enableDownfill?: boolean;

    readonly freezeColumns?: DataGridSearchProps["freezeColumns"];

    readonly verticalBorder?: DataGridSearchProps["verticalBorder"] | boolean;

    readonly onPaste?:
        | ((target: readonly [number, number], values: readonly (readonly string[])[]) => boolean)
        | boolean;
}

export interface DataEditorRef {
    updateCells: DataGridRef["damage"];
    getBounds: DataGridRef["getBounds"];
}

const loadingCell: GridCell = {
    kind: GridCellKind.Loading,
    allowOverlay: false,
};

const DataEditorImpl: React.ForwardRefRenderFunction<DataEditorRef, DataEditorProps> = (p, forwardedRef) => {
    const [gridSelectionInner, setGridSelectionInner] = React.useState<GridSelection>();
    const [selectedColumnsInner, setSelectedColumnsInner] = React.useState<CompactSelection>(CompactSelection.empty());
    const [selectedRowsInner, setSelectedRowsInner] = React.useState(CompactSelection.empty());
    const [overlay, setOverlay] = React.useState<{
        target: Rectangle;
        content: GridCell;
        cell: readonly [number, number];
        highlight: boolean;
        forceEditMode: boolean;
    }>();
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const mouseState = React.useRef<MouseState>();
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const scrollTimer = React.useRef<number>();
    const lastSent = React.useRef<[number, number]>();

    const {
        isDraggable = false,
        getCellsForSelection,
        rowMarkers = "none",
        rowHeight = 34,
        headerHeight = 36,
        rowMarkerWidth: rowMarkerWidthRaw,
        imageEditorOverride,
        markdownDivCreateNode,
    } = p;

    const {
        columns,
        rows,
        getCellContent,
        onCellClicked,
        onHeaderClicked,
        onGroupHeaderClicked,
        onGroupHeaderRenamed,
        onCellEdited,
        enableDownfill = false,
        onRowAppended,
        onColumnMoved,
        drawCell,
        drawCustomCell,
        onDeleteRows,
        onDragStart,
        onMouseMove,
        onPaste,
        groupHeaderHeight = headerHeight,
        freezeColumns = 0,
        rowSelectionMode = "auto",
        onHeaderMenuClick,
        getGroupDetails,
        onItemHovered,
        onVisibleRegionChanged,
        selectedColumns: selectedColumnsOuter,
        onSelectedColumnsChange: setSelectedColumnsOuter,
        selectedRows: selectedRowsOuter,
        onSelectedRowsChange: setSelectedRowsOuter,
        gridSelection: gridSelectionOuter,
        onGridSelectionChange,
        provideEditor,
        trailingRowOptions,
        verticalBorder,
        ...rest
    } = p;

    const rowMarkerWidth = rowMarkerWidthRaw ?? (rows > 10000 ? 48 : rows > 1000 ? 44 : rows > 100 ? 36 : 32);
    const hasRowMarkers = rowMarkers !== "none";
    const rowMarkerOffset = hasRowMarkers ? 1 : 0;
    const showTrailingBlankRow = onRowAppended !== undefined;
    const lastRowSticky = trailingRowOptions?.sticky === true;

    const gridSelectionOuterMangled: GridSelection | undefined = React.useMemo(() => {
        return gridSelectionOuter === undefined
            ? undefined
            : {
                  cell: [gridSelectionOuter.cell[0] + rowMarkerOffset, gridSelectionOuter.cell[1]],
                  range: {
                      ...gridSelectionOuter.range,
                      x: gridSelectionOuter.range.x + rowMarkerOffset,
                  },
              };
    }, [gridSelectionOuter, rowMarkerOffset]);
    const gridSelection = gridSelectionOuterMangled ?? gridSelectionInner;
    const setGridSelection = React.useCallback(
        (newVal: GridSelection | undefined) => {
            if (onGridSelectionChange !== undefined) {
                if (newVal === undefined) {
                    onGridSelectionChange(undefined);
                } else {
                    onGridSelectionChange({
                        cell: [newVal.cell[0] - rowMarkerOffset, newVal.cell[1]],
                        range: {
                            ...newVal.range,
                            x: newVal.range.x - rowMarkerOffset,
                        },
                    });
                }
            } else {
                setGridSelectionInner(newVal);
            }
        },
        [onGridSelectionChange, rowMarkerOffset]
    );
    const selectedRows = selectedRowsOuter ?? selectedRowsInner;
    const setSelectedRows = setSelectedRowsOuter ?? setSelectedRowsInner;

    const mangledOuterCols = selectedColumnsOuter?.offset(rowMarkerOffset);
    const selectedColumns = mangledOuterCols ?? selectedColumnsInner;

    const setSelectedColumns = React.useCallback(
        (newColumns: CompactSelection, trigger: HeaderSelectionTrigger) => {
            if (setSelectedColumnsOuter !== undefined) {
                setSelectedColumnsOuter?.(newColumns.offset(-rowMarkerOffset), trigger);
            } else {
                setSelectedColumnsInner(newColumns);
            }
        },
        [rowMarkerOffset, setSelectedColumnsOuter]
    );

    const enableGroups = React.useMemo(() => {
        return columns.some(c => c.group !== undefined);
    }, [columns]);

    const totalHeaderHeight = enableGroups ? headerHeight + groupHeaderHeight : headerHeight;

    const [visibleRegion, setVisibleRegion] = React.useState<Rectangle & { tx?: number; ty?: number }>({
        x: 0,
        y: 0,
        width: 1,
        height: 1,
    });

    const cellXOffset = visibleRegion.x + rowMarkerOffset;
    const cellYOffset = visibleRegion.y;

    const gridRef = React.useRef<DataGridRef | null>(null);

    React.useImperativeHandle(
        forwardedRef,
        () => ({
            updateCells: (...args) => gridRef.current?.damage(...args),
            getBounds: (...args) => gridRef.current?.getBounds(...args),
        }),
        []
    );

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

    const mangledOnCellEdited = React.useCallback(
        (cell: readonly [number, number], newValue: EditableGridCell) => {
            onCellEdited?.([cell[0] - rowMarkerOffset, cell[1]], newValue);
        },
        [onCellEdited, rowMarkerOffset]
    );

    const mangledCols = React.useMemo(() => {
        if (rowMarkers === "none") return columns;
        return [
            {
                title: "",
                width: rowMarkerWidth,
                icon: undefined,
                hasMenu: false,
                style: "normal" as const,
            },
            ...columns,
        ];
    }, [columns, rowMarkerWidth, rowMarkers]);

    const getMangedCellContent = React.useCallback(
        ([col, row]: readonly [number, number]): InnerGridCell => {
            const isTrailing = showTrailingBlankRow && row === mangledRows - 1;
            const isRowMarkerCol = col === 0 && hasRowMarkers;
            if (isRowMarkerCol) {
                if (isTrailing) {
                    return loadingCell;
                }
                return {
                    kind: InnerGridCellKind.Marker,
                    allowOverlay: false,
                    checked: selectedRows.hasIndex(row),
                    markerKind: rowMarkers,
                    row,
                };
            } else if (isTrailing) {
                //If the grid is empty, we will return text
                const isFirst = col === rowMarkerOffset;
                const display = isFirst ? trailingRowOptions?.hint ?? "" : "";
                return {
                    kind: InnerGridCellKind.NewRow,
                    hint: display,
                    isFirst,
                    allowOverlay: false,
                };
            } else {
                return getCellContent([col - rowMarkerOffset, row]);
            }
        },
        [
            showTrailingBlankRow,
            mangledRows,
            hasRowMarkers,
            selectedRows,
            rowMarkers,
            rowMarkerOffset,
            trailingRowOptions?.hint,
            getCellContent,
        ]
    );

    const reselect = React.useCallback(
        (bounds: Rectangle, initialValue?: string) => {
            if (gridSelection === undefined) return;

            const [col, row] = gridSelection.cell;
            const c = getMangedCellContent([col, row]);
            if (c.kind !== GridCellKind.Boolean && c.allowOverlay) {
                let content = c;
                if (initialValue !== undefined) {
                    switch (content.kind) {
                        case GridCellKind.Text:
                            content = {
                                ...content,
                                data: initialValue,
                            };
                            break;
                        case GridCellKind.Number:
                            content = {
                                ...content,
                                data: maybe(() => Number.parseFloat(initialValue), 0),
                            };
                            break;
                        case GridCellKind.Markdown:
                        case GridCellKind.Uri:
                            content = {
                                ...content,
                                data: initialValue,
                            };
                            break;
                    }
                }
                setOverlay({
                    target: bounds,
                    content,
                    cell: [col, row],
                    highlight: initialValue === undefined,
                    forceEditMode: initialValue !== undefined,
                });
            }
        },
        [getMangedCellContent, gridSelection]
    );

    const focusOnRowFromTrailingBlankRow = React.useCallback(
        (col: number, row: number) => {
            const bounds = gridRef.current?.getBounds(col, row);
            if (bounds === undefined || scrollRef.current === null) {
                return;
            }

            let content = getMangedCellContent([col, row]);
            if (!content.allowOverlay) {
                return;
            }
            switch (content.kind) {
                case GridCellKind.Text:
                    content = {
                        ...content,
                        data: "",
                    };
                    break;
                case GridCellKind.Number:
                    content = {
                        ...content,
                        data: undefined,
                    };
                    break;
                case GridCellKind.Markdown:
                case GridCellKind.Uri:
                    content = {
                        ...content,
                        data: "",
                    };
                    break;
            }

            setOverlay({
                target: bounds,
                content,
                highlight: true,
                cell: [col, row],
                forceEditMode: true,
            });
        },
        [getMangedCellContent]
    );

    const focusCallback = React.useRef(focusOnRowFromTrailingBlankRow);
    const getCellContentRef = React.useRef(getCellContent);
    const rowsRef = React.useRef(rows);
    focusCallback.current = focusOnRowFromTrailingBlankRow;
    getCellContentRef.current = getCellContent;
    rowsRef.current = rows;
    const appendRow = React.useCallback(
        async (col: number) => {
            // FIXME: Maybe this should optionally return a promise that we can await?
            const appendResult = onRowAppended?.();

            let r;
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

                const row = typeof r === 'number' ? r : (bottom ? rows : 0);
                scrollTo(col, row);
                setGridSelection({
                    cell: [col, row],
                    range: {
                        x: col,
                        y: row,
                        width: 1,
                        height: 1,
                    },
                });
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
        [onRowAppended, rowMarkerOffset, rows, setGridSelection]
    );

    const lastSelectedRowRef = React.useRef<number>();
    const lastSelectedColRef = React.useRef<number>();
    const onMouseDown = React.useCallback(
        (args: GridMouseEventArgs) => {
            mouseState.current = {
                previousSelection: gridSelection,
            };
            const isMultiKey = browserIsOSX.value ? args.metaKey : args.ctrlKey;
            if (args.kind === "cell") {
                lastSelectedColRef.current = undefined;
                const [col, row] = args.location;
                if (col === 0 && hasRowMarkers) {
                    if ((showTrailingBlankRow === true && row === rows) || rowMarkers === "number") return;
                    setGridSelection(undefined);
                    setOverlay(undefined);
                    focus();
                    setSelectedColumns(CompactSelection.empty(), "selection");
                    const isSelected = selectedRows.hasIndex(row);

                    const lastHighlighted = lastSelectedRowRef.current;
                    if (args.shiftKey && lastHighlighted !== undefined && selectedRows.hasIndex(lastHighlighted)) {
                        const newSlice: Slice = [Math.min(lastHighlighted, row), Math.max(lastHighlighted, row) + 1];

                        if (isMultiKey || rowSelectionMode === "multi") {
                            setSelectedRows(selectedRows.add(newSlice));
                        } else {
                            setSelectedRows(CompactSelection.fromSingleSelection(newSlice));
                        }
                    } else if (isMultiKey || args.isTouch || rowSelectionMode === "multi") {
                        if (isSelected) {
                            setSelectedRows(selectedRows.remove(row));
                        } else {
                            setSelectedRows(selectedRows.add(row));
                            lastSelectedRowRef.current = row;
                        }
                    } else if (isSelected && selectedRows.length === 1) {
                        setSelectedRows(CompactSelection.empty());
                    } else {
                        setSelectedRows(CompactSelection.fromSingleSelection(row));
                        lastSelectedRowRef.current = row;
                    }
                } else if (col >= rowMarkerOffset && showTrailingBlankRow && row === rows) {
                    void appendRow(col);
                } else {
                    if (gridSelection?.cell[0] !== col || gridSelection.cell[1] !== row) {
                        const isLastStickyRow = lastRowSticky && row === rows;

                        const startedFromLastSticky =
                            lastRowSticky && gridSelection !== undefined && gridSelection.cell[1] === rows;

                        if (args.shiftKey && gridSelection !== undefined && !startedFromLastSticky) {
                            if (isLastStickyRow) {
                                // If we're making a selection and shift click in to the last sticky row,
                                // just drop the event. Don't kill the selection.
                                return;
                            }

                            const [sCol, sRow] = gridSelection.cell;
                            const left = Math.min(col, sCol);
                            const right = Math.max(col, sCol);
                            const top = Math.min(row, sRow);
                            const bottom = Math.max(row, sRow);
                            setGridSelection({
                                ...gridSelection,
                                range: {
                                    x: left,
                                    y: top,
                                    width: right - left + 1,
                                    height: bottom - top + 1,
                                },
                            });
                            lastSelectedRowRef.current = undefined;
                            focus();
                        } else {
                            setGridSelection({ cell: [col, row], range: { x: col, y: row, width: 1, height: 1 } });
                            setSelectedColumns(CompactSelection.empty(), "selection");
                            setSelectedRows(CompactSelection.empty());
                            lastSelectedRowRef.current = undefined;
                            setOverlay(undefined);
                            focus();
                        }
                    }
                }
            } else if (args.kind === "header") {
                const [col] = args.location;
                setGridSelection(undefined);
                setOverlay(undefined);
                if (hasRowMarkers && col === 0) {
                    lastSelectedRowRef.current = undefined;
                    lastSelectedColRef.current = undefined;
                    if (selectedRows.length !== rows) {
                        setSelectedRows(CompactSelection.fromSingleSelection([0, rows]));
                    } else {
                        setSelectedRows(CompactSelection.empty());
                    }
                    focus();
                } else {
                    const lastCol = lastSelectedColRef.current;
                    if (args.shiftKey && lastCol !== undefined && selectedColumns.hasIndex(lastCol)) {
                        const newSlice: Slice = [Math.min(lastCol, col), Math.max(lastCol, col) + 1];

                        if (isMultiKey) {
                            setSelectedColumns(selectedColumns.add(newSlice), "header");
                        } else {
                            setSelectedColumns(CompactSelection.fromSingleSelection(newSlice), "header");
                        }
                    } else if (isMultiKey) {
                        if (selectedColumns.hasIndex(col)) {
                            setSelectedColumns(selectedColumns.remove(col), "header");
                        } else {
                            setSelectedColumns(selectedColumns.add(col), "header");
                        }
                        lastSelectedColRef.current = col;
                    } else {
                        setSelectedColumns(CompactSelection.fromSingleSelection(col), "header");
                        lastSelectedColRef.current = col;
                    }
                    setSelectedRows(CompactSelection.empty());
                    lastSelectedRowRef.current = undefined;
                    focus();
                }
            } else if (args.kind === "out-of-bounds") {
                setGridSelection(undefined);
                setOverlay(undefined);
                focus();
                setSelectedColumns(CompactSelection.empty(), "selection");
                setSelectedRows(CompactSelection.empty());
                lastSelectedRowRef.current = undefined;
                lastSelectedColRef.current = undefined;
            } else if (args.kind === "group-header") {
                const [col] = args.location;

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

                setSelectedRows(CompactSelection.empty());
                setGridSelection(undefined);
                focus();

                if (isMultiKey) {
                    if (selectedColumns.hasAll([start, end + 1])) {
                        let newVal = selectedColumns;
                        for (let index = start; index <= end; index++) {
                            newVal = newVal.remove(index);
                        }
                        setSelectedColumns(newVal, "group");
                    } else {
                        setSelectedColumns(selectedColumns.add([start, end + 1]), "group");
                    }
                } else {
                    setSelectedColumns(CompactSelection.fromSingleSelection([start, end + 1]), "group");
                }
            }
        },
        [
            gridSelection,
            hasRowMarkers,
            rowMarkerOffset,
            showTrailingBlankRow,
            rows,
            rowMarkers,
            setGridSelection,
            focus,
            setSelectedColumns,
            selectedRows,
            rowSelectionMode,
            setSelectedRows,
            appendRow,
            lastRowSticky,
            selectedColumns,
            mangledCols,
        ]
    );

    const [renameGroup, setRenameGroup] = React.useState<{
        group: string;
        bounds: Rectangle;
    }>();

    const onMouseUp = React.useCallback(
        (args: GridMouseEventArgs, isOutside: boolean) => {
            const mouse = mouseState.current;
            mouseState.current = undefined;
            if (isOutside) return;

            let prevented = false;
            const preventDefault = () => {
                prevented = true;
            };

            if (scrollTimer.current !== undefined) {
                window.clearInterval(scrollTimer.current);
            }

            if (args.kind === "header") {
                onHeaderClicked?.(args.location[0] - rowMarkerOffset, { ...args, preventDefault });
            }

            if (args.kind === "group-header") {
                onGroupHeaderClicked?.(args.location[0] - rowMarkerOffset, { ...args, preventDefault });
            }

            if (args.kind !== "cell") {
                return;
            }
            onCellClicked?.([args.location[0] - rowMarkerOffset, args.location[1]], { ...args, preventDefault });
            if (gridSelection !== undefined && mouse?.previousSelection?.cell !== undefined && !prevented) {
                const [col, row] = args.location;
                const [selectedCol, selectedRow] = gridSelection.cell;
                const [prevCol, prevRow] = mouse.previousSelection.cell;
                const c = getMangedCellContent([col, row]);
                const r = c.kind === GridCellKind.Custom ? undefined : CellRenderers[c.kind];
                if (r !== undefined && r.onClick !== undefined) {
                    const newVal = r.onClick(c, args.localEventX, args.localEventY, args.bounds);
                    if (newVal !== undefined && !isInnerOnlyCell(newVal) && isEditableGridCell(newVal)) {
                        mangledOnCellEdited(args.location, newVal);
                        gridRef.current?.damage([
                            {
                                cell: args.location,
                            },
                        ]);
                    }
                }
                if (col === selectedCol && col === prevCol && row === selectedRow && row === prevRow) {
                    reselect(args.bounds);
                }
            }
        },
        [
            getMangedCellContent,
            gridSelection,
            mangledOnCellEdited,
            onCellClicked,
            onGroupHeaderClicked,
            onHeaderClicked,
            reselect,
            rowMarkerOffset,
        ]
    );

    const onHeaderMenuClickInner = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            onHeaderMenuClick?.(col - rowMarkerOffset, screenPosition);
        },
        [onHeaderMenuClick, rowMarkerOffset]
    );

    const onVisibleRegionChangedImpl = React.useCallback(
        (region: Rectangle, tx?: number, ty?: number) => {
            const newRegion = {
                ...region,
                x: region.x - rowMarkerOffset,
                height: showTrailingBlankRow && region.y + region.height >= rows ? region.height - 1 : region.height,
                tx,
                ty,
            };
            setVisibleRegion(newRegion);
            onVisibleRegionChanged?.(newRegion, tx, ty);
        },
        [onVisibleRegionChanged, rowMarkerOffset, rows, showTrailingBlankRow]
    );

    const onColumnMovedImpl = React.useCallback(
        (startIndex: number, endIndex: number) => {
            onColumnMoved?.(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset);
            setSelectedColumns(CompactSelection.fromSingleSelection(endIndex), "drag");
        },
        [onColumnMoved, rowMarkerOffset, setSelectedColumns]
    );

    const onDragStartImpl = React.useCallback(
        (args: GridDragEventArgs) => {
            onDragStart?.({
                ...args,
                location: [args.location[0] - rowMarkerOffset, args.location[1]] as any,
            });
        },
        [onDragStart, rowMarkerOffset]
    );

    const onMouseMoveImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            const a: GridMouseEventArgs = {
                ...args,
                location: [args.location[0] - rowMarkerOffset, args.location[1]] as any,
            };
            onMouseMove?.(a);
        },
        [onMouseMove, rowMarkerOffset]
    );

    const onItemHoveredImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            if (mouseState.current !== undefined && gridSelection !== undefined && !isDraggable) {
                const [selectedCol, selectedRow] = gridSelection.cell;
                // eslint-disable-next-line prefer-const
                let [col, row] = args.location;

                const landedOnLastStickyRow = lastRowSticky && row === rows;
                const startedFromLastStickyRow = lastRowSticky && selectedRow === rows;
                if (landedOnLastStickyRow || startedFromLastStickyRow) return;

                if (col === 0 && hasRowMarkers) {
                    col = 1;
                }

                const deltaX = col - selectedCol;
                const deltaY = (row ?? 0) - selectedRow;

                const newRange: Rectangle = {
                    x: deltaX >= 0 ? selectedCol : col,
                    y: deltaY >= 0 ? selectedRow : row ?? 0,
                    width: Math.abs(deltaX) + 1,
                    height: Math.abs(deltaY) + 1,
                };

                setGridSelection({
                    ...gridSelection,
                    range: newRange,
                });

                if (args.kind === "out-of-bounds" && scrollRef.current !== null) {
                    const [horizontal, vertical] = args.direction;
                    let scrollX = 0;
                    let scrollY = 0;
                    if (horizontal === -1) {
                        scrollX = columns[columns.length - 1].width;
                    } else if (horizontal === 1) {
                        scrollX = -columns[0].width;
                    }
                    if (vertical !== 0) {
                        if (typeof rowHeight === "number") {
                            scrollY = rowHeight * vertical;
                        } else {
                            scrollY = rowHeight(row ?? 0) * vertical;
                        }
                    }

                    if (scrollTimer.current !== undefined) {
                        window.clearInterval(scrollTimer.current);
                    }
                    scrollTimer.current = window.setInterval(() => {
                        scrollRef.current?.scrollBy(-100 * horizontal, scrollY);
                    }, 200);
                    scrollRef.current.scrollBy(scrollX, scrollY);
                } else {
                    if (scrollTimer.current !== undefined) {
                        window.clearInterval(scrollTimer.current);
                    }
                }
            }

            onItemHovered?.({ ...args, location: [args.location[0] - rowMarkerOffset, args.location[1]] as any });
        },
        [
            gridSelection,
            isDraggable,
            onItemHovered,
            rowMarkerOffset,
            lastRowSticky,
            rows,
            hasRowMarkers,
            setGridSelection,
            columns,
            rowHeight,
        ]
    );

    const copyToClipboard = React.useCallback((cells: readonly (readonly GridCell[])[]) => {
        function escape(str: string): string {
            if (/\n|"|\t/.test(str)) {
                str = `"${str.replace(/"/g, `""`)}"`;
            }
            return str;
        }

        const formatCell = (cell: GridCell) => {
            switch (cell.kind) {
                case GridCellKind.Text:
                case GridCellKind.Number:
                    return escape(cell.displayData);
                case GridCellKind.Markdown:
                case GridCellKind.RowID:
                case GridCellKind.Uri:
                    return escape(cell.data);
                case GridCellKind.Image:
                case GridCellKind.Bubble:
                    return cell.data.reduce((pv, cv) => `${escape(pv)},${escape(cv)}`);
                case GridCellKind.Boolean:
                    return cell.data ? "TRUE" : "FALSE";
                case GridCellKind.Loading:
                    return "#LOADING";
                case GridCellKind.Protected:
                    return "************";
                case GridCellKind.Drilldown:
                    return cell.data.map(i => i.text).reduce((pv, cv) => `${escape(pv)},${escape(cv)}`);
                case GridCellKind.Custom:
                    return escape(cell.copyData);
                default:
                    assertNever(cell);
            }
        };

        const str = cells.map(row => row.map(formatCell).join("\t")).join("\n");
        void window.navigator.clipboard.writeText(str);
    }, []);

    const scrollTo = React.useCallback(
        (col: number, row: number, dir: "horizontal" | "vertical" | "both" = "both") => {
            if (scrollRef.current !== null) {
                const grid = gridRef.current;
                const canvas = canvasRef.current;
                if (grid !== null && canvas !== null) {
                    const bounds = grid.getBounds(col, row);
                    const scrollBounds = canvas.getBoundingClientRect();

                    if (bounds !== undefined) {
                        let scrollX = 0;
                        let scrollY = 0;

                        const sLeft = scrollBounds.left + rowMarkerOffset * rowMarkerWidth;
                        const sRight = scrollBounds.right;
                        const sTop = scrollBounds.top + totalHeaderHeight;
                        let trailingRowHeight = 0;
                        if (lastRowSticky) {
                            trailingRowHeight = typeof rowHeight === "number" ? rowHeight : rowHeight(rows);
                        }
                        const sBottom = scrollBounds.bottom - trailingRowHeight;

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

                        if (dir === "vertical") {
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
        [totalHeaderHeight, lastRowSticky, rowHeight, rowMarkerOffset, rowMarkerWidth, rows]
    );

    const adjustSelection = React.useCallback(
        (direction: [number, number]) => {
            if (gridSelection === undefined) return;

            const [x, y] = direction;
            const [col, row] = gridSelection.cell;
            const oldRange = gridSelection.range;

            let left = oldRange?.x ?? col;
            let top = oldRange?.y ?? row;

            let width = oldRange?.width ?? 1;
            let height = oldRange?.height ?? 1;

            const topDiff = top - row;
            const leftDiff = left - col;

            let isTop = topDiff === 0;
            if (y < 0 && height === 1) isTop = false;
            const heightDiff = isTop ? y : y * -1;

            let isLeft = leftDiff === 0;
            if (x < 0 && width === 1) isLeft = false;
            const widthDiff = isLeft ? x : x * -1;

            if (isTop) {
                const maxHeight = rows - top;
                height += heightDiff;
                height = Math.min(maxHeight, height);
                scrollTo(0, top + height - 1, "vertical");
            } else {
                top -= heightDiff;
                height = Math.abs(top - row) + 1;
                scrollTo(0, top, "vertical");
            }

            if (isLeft) {
                width += widthDiff;
                scrollTo(left + width - 1, 0, "horizontal");
            } else {
                left -= widthDiff;
                //Don't let it select the marker column
                left = Math.max(rowMarkerOffset, left);
                width = Math.abs(left - col) + 1;
                scrollTo(left, 0, "horizontal");
            }

            setGridSelection({
                ...gridSelection,
                range: {
                    x: left,
                    y: top,
                    width: width,
                    height: height,
                },
            });
        },
        [gridSelection, rowMarkerOffset, rows, scrollTo, setGridSelection]
    );

    const updateSelectedCell = React.useCallback(
        (col: number, row: number, fromEditingTrailingRow: boolean = false): boolean => {
            const rowMax = mangledRows - (fromEditingTrailingRow ? 0 : 1);
            col = clamp(rowMarkerOffset, columns.length - 1 + rowMarkerOffset, col);
            row = clamp(0, rowMax, row);

            if (col === gridSelection?.cell[0] && row === gridSelection?.cell[1]) return false;
            setGridSelection({ cell: [col, row], range: { x: col, y: row, width: 1, height: 1 } });

            if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
                lastSent.current = undefined;
            }

            scrollTo(col, row);

            return true;
        },
        [mangledRows, rowMarkerOffset, columns.length, gridSelection?.cell, setGridSelection, scrollTo]
    );

    const onFinishEditing = React.useCallback(
        (newValue: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => {
            if (overlay?.cell !== undefined && newValue !== undefined) {
                // Fixme, this cast is dangerous
                mangledOnCellEdited?.(overlay.cell, newValue as EditableGridCell);
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
            if (gridSelection !== undefined && (movX !== 0 || movY !== 0)) {
                const isEditingTrailingRow = gridSelection.cell[1] === mangledRows - 1 && newValue !== undefined;
                updateSelectedCell(gridSelection.cell[0] + movX, gridSelection.cell[1] + movY, isEditingTrailingRow);
            }
        },
        [overlay?.cell, focus, gridSelection, mangledOnCellEdited, mangledRows, updateSelectedCell]
    );

    const [selCol, selRow] = gridSelection?.cell ?? [];
    const onCellFocused = React.useCallback(
        (cell: readonly [number, number]) => {
            if (selCol === cell[0] && selRow === cell[1]) return;
            setGridSelection({
                cell,
                range: { x: cell[0], y: cell[1], width: 1, height: 1 },
            });
            setSelectedRows(CompactSelection.empty());
        },
        [selCol, selRow, setGridSelection, setSelectedRows]
    );

    const onKeyDown = React.useCallback(
        (event: GridKeyEventArgs) => {
            const fn = async () => {
                const overlayOpen = overlay !== undefined;
                const shiftKey = event.shiftKey;
                const isOSX = browserIsOSX.value;
                const isPrimaryKey = isOSX ? event.metaKey : event.ctrlKey;
                const isDeleteKey = event.key === "Delete" || (isOSX && event.key === "Backspace");

                if (event.key === "Escape") {
                    if (overlayOpen) {
                        setOverlay(undefined);
                        return;
                    }
                    setGridSelection(undefined);
                    setSelectedRows(CompactSelection.empty());
                    setSelectedColumns(CompactSelection.empty(), "selection");
                    return;
                }

                if (isDeleteKey && selectedRows.length !== 0 && gridSelection === undefined) {
                    event.cancel();
                    focus();
                    onDeleteRows?.(Array.from(selectedRows));
                    setSelectedRows(CompactSelection.empty());
                    return;
                }

                function deleteRange(range: Rectangle) {
                    focus();
                    const damaged: [number, number][] = [];
                    for (let x = range.x; x < range.x + range.width; x++) {
                        for (let y = range.y; y < range.y + range.height; y++) {
                            const cellValue = getCellContent([x - rowMarkerOffset, y]);
                            if (
                                (isEditableGridCell(cellValue) && cellValue.allowOverlay) ||
                                cellValue.kind === GridCellKind.Boolean
                            ) {
                                const r = CellRenderers[cellValue.kind];
                                const newVal = r.onDelete?.(cellValue);
                                if (newVal !== undefined) {
                                    mangledOnCellEdited([x, y], newVal as typeof cellValue);
                                    damaged.push([x, y]);
                                }
                            }
                        }
                    }
                    gridRef.current?.damage(damaged.map(x => ({ cell: x })));
                }

                if (isDeleteKey && selectedColumns.length > 0 && gridSelection === undefined) {
                    event.cancel();
                    for (const col of selectedColumns) {
                        deleteRange({
                            x: col,
                            y: 0,
                            width: 1,
                            height: rows,
                        });
                    }
                    return;
                }

                if (gridSelection === undefined) return;
                let [col, row] = gridSelection.cell;

                if (event.key === "Enter" && event.bounds !== undefined) {
                    if (overlayOpen) {
                        setOverlay(undefined);
                        row++;
                    } else if (row === rows && showTrailingBlankRow) {
                        window.setTimeout(() => {
                            void appendRow(col);
                        }, 0);
                    } else {
                        reselect(event.bounds);
                        event.cancel();
                    }
                } else if (event.keyCode === 68 && isPrimaryKey && gridSelection.range.height > 1 && enableDownfill) {
                    // ctrl/cmd + d
                    const damage: (readonly [number, number])[] = [];
                    const r = gridSelection.range;
                    for (let x = 0; x < r.width; x++) {
                        const fillCol = x + r.x;
                        const fillVal = getMangedCellContent([fillCol, r.y]);
                        if (isInnerOnlyCell(fillVal) || !isEditableGridCell(fillVal)) continue;
                        for (let y = 1; y < r.height; y++) {
                            const fillRow = y + r.y;
                            const target = [fillCol, fillRow] as const;
                            damage.push(target);
                            mangledOnCellEdited?.(target, {
                                ...fillVal,
                            });
                        }
                    }

                    gridRef.current?.damage(
                        damage.map(c => ({
                            cell: c,
                        }))
                    );
                    event.cancel();
                } else if (event.key === "ArrowDown") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        adjustSelection([0, isPrimaryKey ? Number.MAX_SAFE_INTEGER : 1]);
                    } else {
                        row += isPrimaryKey ? Number.MAX_SAFE_INTEGER : 1;
                    }
                } else if (event.key === "ArrowUp") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        adjustSelection([0, isPrimaryKey ? Number.MIN_SAFE_INTEGER : -1]);
                    } else {
                        row += isPrimaryKey ? Number.MIN_SAFE_INTEGER : -1;
                    }
                } else if (event.key === "ArrowRight") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        adjustSelection([isPrimaryKey ? Number.MAX_SAFE_INTEGER : 1, 0]);
                    } else {
                        col += isPrimaryKey ? Number.MAX_SAFE_INTEGER : 1;
                    }
                } else if (event.key === "ArrowLeft") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        adjustSelection([isPrimaryKey ? Number.MIN_SAFE_INTEGER : -1, 0]);
                    } else {
                        col += isPrimaryKey ? Number.MIN_SAFE_INTEGER : -1;
                    }
                } else if (event.key === "Tab") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        col--;
                    } else {
                        col++;
                    }
                } else if (isDeleteKey) {
                    event.cancel();
                    const range = gridSelection.range;
                    deleteRange(range);
                } else if (
                    !event.metaKey &&
                    !event.ctrlKey &&
                    String.fromCharCode(event.keyCode).match(/(\w|\s)/g) &&
                    event.bounds !== undefined &&
                    isReadWriteCell(getCellContent([col - rowMarkerOffset, Math.max(0, row - 1)]))
                ) {
                    if (
                        (!lastRowSticky || row !== rows) &&
                        (visibleRegion.y > row ||
                            row > visibleRegion.y + visibleRegion.height ||
                            visibleRegion.x > col ||
                            col > visibleRegion.x + visibleRegion.width)
                    ) {
                        return;
                    }
                    let key = String.fromCharCode(event.keyCode);
                    if (!event.shiftKey) {
                        key = key.toLowerCase();
                    }
                    reselect(event.bounds, key);
                    event.cancel();
                }

                const moved = updateSelectedCell(col, row);
                if (moved) {
                    event.cancel();
                }
            };
            void fn();
        },
        [
            overlay,
            selectedRows,
            gridSelection,
            selectedColumns,
            enableDownfill,
            getCellContent,
            rowMarkerOffset,
            updateSelectedCell,
            setGridSelection,
            setSelectedRows,
            setSelectedColumns,
            focus,
            onDeleteRows,
            mangledOnCellEdited,
            rows,
            showTrailingBlankRow,
            appendRow,
            reselect,
            getMangedCellContent,
            adjustSelection,
            lastRowSticky,
            visibleRegion.y,
            visibleRegion.height,
            visibleRegion.x,
            visibleRegion.width,
        ]
    );

    function unquote(str: string): string[][] {
        function descape(s: string): string {
            if (s.startsWith('"') && s.endsWith('"')) {
                s = s.slice(1, -1).replace(/""/g, '"');
            }
            return s;
        }

        const enum State {
            None,
            inString,
            inStringPostQuote,
        }

        const result: string[][] = [];
        let current: string[] = [];

        let start = 0;
        let state = State.None;
        str = str.trim().replace(/\r\n/g, "\n");
        let index = 0;
        for (const char of str) {
            switch (state) {
                case State.None:
                    if (char === "\t" || char === "\n") {
                        current.push(str.slice(start, index));
                        start = index + 1;

                        if (char === "\n") {
                            result.push(current);
                            current = [];
                        }
                    } else if (char === `"`) {
                        state = State.inString;
                    }
                    break;
                case State.inString:
                    if (char === `"`) {
                        state = State.inStringPostQuote;
                    }
                    break;
                case State.inStringPostQuote:
                    if (char === '"') {
                        state = State.inString;
                    } else if (char === "\t" || char === "\n") {
                        current.push(descape(str.slice(start, index)));
                        start = index + 1;

                        if (char === "\n") {
                            result.push(current);
                            current = [];
                        }
                        state = State.None;
                    } else {
                        state = State.None;
                    }
                    break;
            }

            index++;
        }
        if (start < str.length) {
            current.push(descape(str.slice(start, str.length)));
        }
        result.push(current);
        return result;
    }

    useEventListener(
        "paste",
        React.useCallback(async () => {
            function pasteToCell(inner: InnerGridCell, target: readonly [number, number], toPaste: string): boolean {
                if (!isInnerOnlyCell(inner) && isReadWriteCell(inner) && inner.readonly !== true) {
                    switch (inner.kind) {
                        case GridCellKind.Text:
                        case GridCellKind.Markdown:
                        case GridCellKind.Uri: {
                            mangledOnCellEdited?.(target, {
                                ...inner,
                                data: toPaste,
                            });
                            return true;
                        }
                        case GridCellKind.Number: {
                            const newNumber = Number.parseFloat(toPaste);
                            if (!Number.isNaN(newNumber)) {
                                mangledOnCellEdited?.(target, {
                                    ...inner,
                                    data: newNumber,
                                });
                                return true;
                            }
                            return false;
                        }
                        default:
                            assertNever(inner);
                    }
                }
                return false;
            }

            const focused =
                scrollRef.current?.contains(document.activeElement) === true ||
                canvasRef.current?.contains(document.activeElement) === true;

            let target = gridSelection?.cell;
            if (target === undefined && selectedColumns.length === 1) {
                target = [selectedColumns.first() ?? 0, 0];
            }
            if (target === undefined && selectedRows.length === 1) {
                target = [rowMarkerOffset, selectedRows.first() ?? 0];
            }

            if (focused && target !== undefined) {
                const text = await navigator.clipboard.readText();

                const [gridCol, gridRow] = target;

                if (onPaste === undefined) {
                    const cellData = getMangedCellContent(target);
                    pasteToCell(cellData, target, text);
                    return;
                }

                const data = unquote(text);

                if (onPaste === false || (typeof onPaste === "function" && onPaste?.(target, data) !== true)) {
                    return;
                }

                const damage: (readonly [number, number])[] = [];
                for (let row = 0; row < data.length; row++) {
                    const dataRow = data[row];
                    if (row + gridRow >= rows) break;
                    for (let col = 0; col < dataRow.length; col++) {
                        const dataItem = dataRow[col];
                        const index = [col + gridCol, row + gridRow] as const;
                        const cellData = getMangedCellContent(index);
                        if (pasteToCell(cellData, index, dataItem)) {
                            damage.push(index);
                        }
                    }
                }
                gridRef.current?.damage(
                    damage.map(c => ({
                        cell: c,
                    }))
                );
            }
        }, [
            getMangedCellContent,
            gridSelection,
            mangledOnCellEdited,
            onPaste,
            rowMarkerOffset,
            rows,
            selectedColumns,
            selectedRows,
        ]),
        window,
        false,
        true
    );

    useEventListener(
        "copy",
        React.useCallback(() => {
            const focused =
                scrollRef.current?.contains(document.activeElement) === true ||
                canvasRef.current?.contains(document.activeElement) === true;

            if (focused && getCellsForSelection !== undefined) {
                if (gridSelection !== undefined) {
                    copyToClipboard(
                        getCellsForSelection({
                            ...gridSelection.range,
                            x: gridSelection.range.x - rowMarkerOffset,
                        })
                    );
                } else if (selectedRows !== undefined && selectedRows.length > 0) {
                    const toCopy = Array.from(selectedRows);
                    const cells = toCopy.map(
                        rowIndex =>
                            getCellsForSelection({
                                x: 0,
                                y: rowIndex,
                                width: columns.length,
                                height: 1,
                            })[0]
                    );
                    copyToClipboard(cells);
                } else if (selectedColumns.length >= 1) {
                    const results: (readonly (readonly GridCell[])[])[] = [];
                    for (const col of selectedColumns) {
                        results.push(
                            getCellsForSelection({
                                x: col - rowMarkerOffset,
                                y: 0,
                                width: 1,
                                height: rows,
                            })
                        );
                    }
                    if (results.length === 1) {
                        copyToClipboard(results[0]);
                    }
                    // FIXME: this is dumb
                    const toCopy = results.reduce((pv, cv) => pv.map((row, index) => [...row, ...cv[index]]));

                    copyToClipboard(toCopy);
                }
            }
        }, [
            columns.length,
            copyToClipboard,
            getCellsForSelection,
            gridSelection,
            rowMarkerOffset,
            rows,
            selectedColumns,
            selectedRows,
        ]),
        window,
        true,
        false
    );

    const onSearchResultsChanged = React.useCallback(
        (results: readonly (readonly [number, number])[], navIndex: number) => {
            if (results.length === 0 || navIndex === -1) return;

            const [col, row] = results[navIndex];
            if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
                return;
            }
            lastSent.current = [col, row];
            updateSelectedCell(col, row);
        },
        [updateSelectedCell]
    );

    React.useEffect(() => {
        if (gridSelection === undefined) return;
        const [col, row] = gridSelection.cell;

        // Check that the grid selection is in range before updating the selected cell
        const selectionColInRange = mangledCols[col];
        if (selectionColInRange === undefined) return;

        updateSelectedCell(col, row);
    }, [mangledCols, rows, gridSelection, updateSelectedCell]);

    const disabledRows = React.useMemo(() => {
        if (showTrailingBlankRow === true && trailingRowOptions?.tint === true) {
            return CompactSelection.fromSingleSelection(mangledRows - 1);
        }
        return CompactSelection.empty();
    }, [mangledRows, showTrailingBlankRow, trailingRowOptions?.tint]);

    const theme = useTheme();
    const mergedTheme = React.useMemo(() => {
        return { ...getDataEditorTheme(), ...theme };
    }, [theme]);

    const mangledVerticalBorder = React.useCallback(
        (col: number) => {
            return typeof verticalBorder === "boolean"
                ? verticalBorder
                : verticalBorder?.(col - rowMarkerOffset) ?? true;
        },
        [rowMarkerOffset, verticalBorder]
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

    const drawCustomCellMangled: typeof drawCell = React.useMemo(() => {
        if (drawCell !== undefined) {
            return drawCell;
        } else if (drawCustomCell !== undefined) {
            return a => drawCustomCell(a.ctx, a.cell, a.theme, a.rect, a.hoverAmount);
        }

        return undefined;
    }, [drawCell, drawCustomCell]);

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

    return (
        <ThemeProvider theme={mergedTheme}>
            <DataGridSearch
                {...rest}
                enableGroups={enableGroups}
                canvasRef={canvasRef}
                cellXOffset={cellXOffset}
                cellYOffset={cellYOffset}
                columns={mangledCols}
                drawCustomCell={drawCustomCellMangled}
                disabledRows={disabledRows}
                freezeColumns={mangledFreezeColumns}
                lockColumns={rowMarkerOffset}
                getCellContent={getMangedCellContent}
                getGroupDetails={mangledGetGroupDetails}
                headerHeight={headerHeight}
                groupHeaderHeight={enableGroups ? groupHeaderHeight : 0}
                lastRowSticky={lastRowSticky}
                onCellFocused={onCellFocused}
                onColumnMoved={onColumnMoved === undefined ? undefined : onColumnMovedImpl}
                onDragStart={onDragStartImpl}
                onHeaderMenuClick={onHeaderMenuClickInner}
                onItemHovered={onItemHoveredImpl}
                onMouseMove={onMouseMoveImpl}
                onKeyDown={onKeyDown}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onSearchResultsChanged={onSearchResultsChanged}
                onVisibleRegionChanged={onVisibleRegionChangedImpl}
                rowHeight={rowHeight}
                rows={mangledRows}
                scrollRef={scrollRef}
                searchColOffset={rowMarkerOffset}
                selectedCell={gridSelection}
                selectedColumns={selectedColumns}
                selectedRows={selectedRows}
                translateX={visibleRegion.tx}
                translateY={visibleRegion.ty}
                verticalBorder={mangledVerticalBorder}
                gridRef={gridRef}
            />
            {renameGroupNode}
            {overlay !== undefined && (
                <DataGridOverlayEditor
                    {...overlay}
                    className={p.experimental?.isSubGrid === true ? "click-outside-ignore" : undefined}
                    provideEditor={provideEditor}
                    imageEditorOverride={imageEditorOverride}
                    onFinishEditing={onFinishEditing}
                    markdownDivCreateNode={markdownDivCreateNode}
                />
            )}
        </ThemeProvider>
    );
};

export const DataEditor = React.forwardRef(DataEditorImpl);
