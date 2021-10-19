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
} from "../data-grid/data-grid-types";
import copy from "copy-to-clipboard";
import DataGridSearch, { DataGridSearchProps } from "../data-grid-search/data-grid-search";
import { browserIsOSX } from "../common/browser-detect";
import { OverlayImageEditorProps } from "../data-grid-overlay-editor/private/image-overlay-editor";
import { ThemeProvider, useTheme } from "styled-components";
import { getDataEditorTheme } from "../common/styles";
import { DataGridRef } from "data-grid/data-grid";
import noop from "lodash/noop";

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
    | "firstColSticky"
    | "getCellContent"
    | "gridRef"
    | "headerHeight"
    | "lastRowSticky"
    | "onCellFocused"
    | "onKeyDown"
    | "onKeyUp"
    | "onMouseDown"
    | "onMouseUp"
    | "onSearchResultsChanged"
    | "onVisibleRegionChanged"
    | "rowHeight"
    | "scrollRef"
    | "searchColOffset"
    | "selectedCell"
    | "selectedColumns"
    | "translateX"
    | "translateY"
>;

type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;

export interface DataEditorProps extends Props {
    readonly onDeleteRows?: (rows: readonly number[]) => void;
    readonly onCellEdited?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
    readonly onRowAppended?: () => void;
    readonly onHeaderClicked?: (colIndex: number) => void;
    readonly onCellClicked?: (cell: readonly [number, number]) => void;

    readonly trailingRowOptions?: {
        readonly tint?: boolean;
        readonly hint?: string;
        readonly sticky?: boolean;
    };
    readonly headerHeight?: number;

    readonly rowMarkers?: "checkbox" | "number" | "both" | "none";
    readonly rowMarkerWidth?: number;

    readonly rowHeight?: DataGridSearchProps["rowHeight"];

    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;

    readonly onSelectedRowsChange?: (newRows: CompactSelection) => void;

    readonly selectedColumns?: DataGridSearchProps["selectedColumns"];
    readonly onSelectedColumnsChange?: (newColumns: CompactSelection) => void;

    readonly gridSelection?: GridSelection;
    readonly onGridSelectionChange?: (newSelection: GridSelection | undefined) => void;
    readonly onVisibleRegionChanged?: (range: Rectangle, tx?: number, ty?: number) => void;

    readonly getCellContent: ReplaceReturnType<DataGridSearchProps["getCellContent"], GridCell>;
}

export const DataEditor: React.FunctionComponent<DataEditorProps> = p => {
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
    const [forceDraw, setForceDraw] = React.useState<number>(0);

    const {
        isDraggable,
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
        onCellEdited,
        onRowAppended,
        onColumnMoved,
        onDeleteRows,
        onDragStart,
        onHeaderMenuClick,
        onItemHovered,
        onVisibleRegionChanged,
        selectedColumns: selectedColumnsOuter,
        onSelectedColumnsChange: setSelectedColumnsOuter,
        selectedRows: selectedRowsOuter,
        onSelectedRowsChange: setSelectedRowsOuter,
        gridSelection: gridSelectionOuter,
        onGridSelectionChange,
        trailingRowOptions,
        ...rest
    } = p;

    const rowMarkerWidth = rowMarkerWidthRaw ?? rows > 10000 ? 48 : rows > 1000 ? 44 : rows > 100 ? 36 : 32;
    const hasRowMarkers = rowMarkers !== "none";
    const rowMarkerOffset = hasRowMarkers ? 1 : 0;
    const showTrailingBlankRow = onRowAppended !== undefined;
    const lastRowSticky = trailingRowOptions?.sticky === true;

    const gridSelection = gridSelectionOuter ?? gridSelectionInner;
    const setGridSelection = onGridSelectionChange ?? setGridSelectionInner;
    const selectedRows = selectedRowsOuter ?? selectedRowsInner;
    const setSelectedRows = setSelectedRowsOuter ?? setSelectedRowsInner;
    const selectedColumns = selectedColumnsOuter ?? selectedColumnsInner;
    const setSelectedColumns = setSelectedColumnsOuter ?? setSelectedColumnsInner;

    const [visibileRegion, setVisibleRegion] = React.useState<Rectangle & { tx?: number; ty?: number }>({
        x: 0,
        y: 0,
        width: 1,
        height: 1,
    });

    const cellXOffset = visibileRegion.x;
    const cellYOffset = visibileRegion.y;

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

    const mangledOnCellEdited = React.useCallback(
        (cell: readonly [number, number], newValue: EditableGridCell) => {
            onCellEdited?.(cell, newValue);
        },
        [onCellEdited]
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
            noop(forceDraw);
            if (isRowMarkerCol) {
                if (isTrailing) {
                    return {
                        kind: GridCellKind.Loading,
                        allowOverlay: false,
                    };
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
            forceDraw,
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
            } else if (c.kind === GridCellKind.Boolean && c.allowEdit) {
                mangledOnCellEdited?.([col - rowMarkerOffset, row], {
                    ...c,
                    data: !c.data,
                });
                setForceDraw(cv => (cv + 1) % 100); // I can't do math with triple digits so I always avoid it
            } else {
                onCellClicked?.([col - rowMarkerOffset, row]);
            }
        },
        [getMangedCellContent, mangledOnCellEdited, onCellClicked, rowMarkerOffset, gridSelection]
    );

    const focusOnRowFromTrailingBlankRow = React.useCallback(
        (col: number, row: number) => {
            const bounds = gridRef.current?.getBounds(col, row);
            if (bounds === undefined || scrollRef.current === null) {
                return;
            }
            const lastRowHeight = typeof rowHeight === "number" ? rowHeight : rowHeight(rows);

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

            // The bounds fetched above will almost certainly be wrong because a scroll is about to take place
            // so instead we can just compute where the scroll will be landing us.
            const boundingRect = scrollRef.current.getBoundingClientRect();
            setOverlay({
                target: {
                    ...bounds,
                    y: boundingRect.top + scrollRef.current.clientHeight - lastRowHeight - bounds.height,
                },
                content,
                highlight: true,
                cell: [col, row],
                forceEditMode: true,
            });
        },
        [getMangedCellContent, rowHeight, rows]
    );

    const rowsRef = React.useRef(rows);
    rowsRef.current = rows;
    const appendRow = React.useCallback(
        (col: number) => {
            onRowAppended?.();
            // Queue up to allow the consumer to react to the event and let us check if they did
            window.setTimeout(() => {
                if (rowsRef.current <= rows) return;
                scrollRef.current?.scrollBy(0, scrollRef.current.scrollHeight + 1000);
                setGridSelection({
                    cell: [col, rows],
                    range: {
                        x: col,
                        y: rows,
                        width: 1,
                        height: 1,
                    },
                });
                focusOnRowFromTrailingBlankRow(col, rows - 1);
            }, 0);
        },
        [focusOnRowFromTrailingBlankRow, onRowAppended, rows, setGridSelection]
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
                    setSelectedColumns(CompactSelection.empty());
                    const isSelected = selectedRows.hasIndex(row);

                    const lastHighlighted = lastSelectedRowRef.current;
                    if (args.shiftKey && lastHighlighted !== undefined && selectedRows.hasIndex(lastHighlighted)) {
                        const newSlice: Slice = [Math.min(lastHighlighted, row), Math.max(lastHighlighted, row) + 1];

                        if (isMultiKey) {
                            setSelectedRows(selectedRows.add(newSlice));
                        } else {
                            setSelectedRows(CompactSelection.fromSingleSelection(newSlice));
                        }
                    } else if (isMultiKey || args.isTouch) {
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
                    appendRow(col);
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
                            setSelectedColumns(CompactSelection.empty());
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
                } else {
                    const lastCol = lastSelectedColRef.current;
                    if (args.shiftKey && lastCol !== undefined && selectedColumns.hasIndex(lastCol)) {
                        const newSlice: Slice = [Math.min(lastCol, col), Math.max(lastCol, col) + 1];

                        if (isMultiKey) {
                            setSelectedColumns(selectedColumns.add(newSlice));
                        } else {
                            setSelectedColumns(CompactSelection.fromSingleSelection(newSlice));
                        }
                    } else if (isMultiKey) {
                        if (selectedColumns.hasIndex(col)) {
                            setSelectedColumns(selectedColumns.remove(col));
                        } else {
                            setSelectedColumns(selectedColumns.add(col));
                        }
                        lastSelectedColRef.current = col;
                    } else {
                        setSelectedColumns(CompactSelection.fromSingleSelection(col));
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
                setSelectedColumns(CompactSelection.empty());
                setSelectedRows(CompactSelection.empty());
                lastSelectedRowRef.current = undefined;
                lastSelectedColRef.current = undefined;
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
            setSelectedRows,
            appendRow,
            lastRowSticky,
            selectedColumns,
        ]
    );

    const onMouseUp = React.useCallback(
        (args: GridMouseEventArgs) => {
            const mouse = mouseState.current;
            mouseState.current = undefined;

            if (scrollTimer.current !== undefined) {
                window.clearInterval(scrollTimer.current);
            }

            if (args.kind === "header") {
                onHeaderClicked?.(args.location[0]);
            }

            if (args.kind !== "cell" || gridSelection === undefined || mouse?.previousSelection?.cell === undefined)
                return;
            const [col, row] = args.location;
            const [selectedCol, selectedRow] = gridSelection.cell;
            const [prevCol, prevRow] = mouse.previousSelection.cell;
            if (col === selectedCol && col === prevCol && row === selectedRow && row === prevRow) {
                reselect(args.bounds);
            }
        },
        [gridSelection, onHeaderClicked, reselect]
    );

    const onHeaderMenuClickInner = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            onHeaderMenuClick?.(col - rowMarkerOffset, screenPosition);
        },
        [onHeaderMenuClick, rowMarkerOffset]
    );

    const onVisibleRegionChangedImpl = React.useCallback(
        (visibleRegion: Rectangle, tx?: number, ty?: number) => {
            const newRegion = {
                ...visibleRegion,
                x: visibleRegion.x - rowMarkerOffset,
                height:
                    showTrailingBlankRow && visibleRegion.y + visibleRegion.height >= rows
                        ? visibleRegion.height - 1
                        : visibleRegion.height,
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
            setSelectedColumns(CompactSelection.fromSingleSelection(endIndex));
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

            onItemHovered?.(args);
        },
        [
            gridSelection,
            isDraggable,
            onItemHovered,
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
            if (/\n|"/.test(str)) {
                str = `"${str.replace(`"`, `""`)}"`;
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
                default:
                    assertNever(cell);
            }
        };

        const str = cells.map(row => row.map(formatCell).join("\t")).join("\n");
        copy(str, {
            format: "text/plain",
        });
    }, []);

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

            if (!isTop) {
                top -= heightDiff;
                height = Math.abs(top - row) + 1;
            } else {
                const maxHeight = rows - top;
                height += heightDiff;
                height = Math.min(maxHeight, height);
            }

            if (!isLeft) {
                left -= widthDiff;
                //Don't let it select the marker column
                left = Math.max(rowMarkerOffset, left);
                width = Math.abs(left - col) + 1;
            } else {
                width += widthDiff;
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
        [gridSelection, rowMarkerOffset, rows, setGridSelection]
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

            if (scrollRef.current !== null) {
                const { clientWidth, clientHeight } = scrollRef.current;

                const maxXScrollToCol = (index: number) => {
                    if (index <= 1) return 0;
                    const widths = mangledCols.slice(undefined, index - 1).map(c => c.width);
                    const total = widths.reduce((pv, cv) => pv + cv);
                    return total + 1;
                };

                const minXScrollToCol = (index: number) => {
                    const maxX = maxXScrollToCol(index);

                    const availableSpace =
                        clientWidth - (hasRowMarkers ? rowMarkerWidth : 0) - mangledCols[index].width;
                    let offset = 0;
                    for (let i = index - 1; i >= 0; i--) {
                        if (availableSpace - (offset + mangledCols[i].width) < 0) break;

                        offset += mangledCols[i].width;
                    }

                    return maxX - offset;
                };

                let visibleFullColumns = 0;
                let t = hasRowMarkers ? rowMarkerWidth : 0;
                for (let c = cellXOffset; c < columns.length; c++) {
                    if (t + columns[c].width > clientWidth) break;

                    visibleFullColumns++;
                    t += columns[c].width;
                }

                let height = 0;
                if (typeof rowHeight === "number") {
                    height = Math.ceil((clientHeight - headerHeight) / rowHeight);
                } else {
                    let h = 0;
                    let r = cellYOffset;
                    while (h < clientHeight - headerHeight) {
                        h += rowHeight(r);
                        r++;
                    }
                    height = r - cellYOffset;
                }

                const visible = {
                    x: cellXOffset + 1,
                    y: cellYOffset,
                    width: visibleFullColumns,
                    height,
                };

                if (row >= visible.y + visible.height - 1) {
                    const delta = row - (visible.y + visible.height - 2);
                    if (typeof rowHeight === "number") {
                        scrollRef.current.scrollBy(0, rowHeight * delta);
                    } else {
                        let r = visible.y + visible.height - 1;
                        let toScroll = 0;
                        for (let i = 0; i < delta; i++) {
                            toScroll += rowHeight(r);
                            r++;
                        }
                        scrollRef.current.scrollBy(0, toScroll);
                    }
                } else if (row < visible.y + 1) {
                    const delta = visible.y + 1 - row;
                    if (typeof rowHeight === "number") {
                        scrollRef.current.scrollBy(0, -(rowHeight * delta));
                    } else {
                        let r = visible.y + 1;
                        let toScroll = 0;
                        while (r !== row) {
                            toScroll += rowHeight(r);
                            r--;
                        }
                        scrollRef.current.scrollBy(0, -toScroll);
                    }
                } else if (col >= visible.x + visible.width) {
                    scrollRef.current.scrollLeft = minXScrollToCol(col);
                    // scrollRef.current.scrollBy(columns[1].width, 0);
                } else if (col < visible.x) {
                    scrollRef.current.scrollLeft = maxXScrollToCol(col);
                }
            }

            return true;
        },
        [
            mangledRows,
            rowMarkerOffset,
            columns,
            gridSelection?.cell,
            setGridSelection,
            hasRowMarkers,
            rowMarkerWidth,
            cellXOffset,
            cellYOffset,
            headerHeight,
            rowHeight,
            mangledCols,
        ]
    );

    const onFinishEditing = React.useCallback(
        (newValue: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => {
            if (gridSelection !== undefined && newValue !== undefined) {
                // Fixme, this cast is dangerous
                mangledOnCellEdited?.(
                    [gridSelection.cell[0] - rowMarkerOffset, gridSelection.cell[1]],
                    newValue as EditableGridCell
                );
            }
            focus(true);
            setOverlay(undefined);

            const [movX, movY] = movement;
            if (gridSelection !== undefined && (movX !== 0 || movY !== 0)) {
                const isEditingTrailingRow = gridSelection.cell[1] === mangledRows - 1 && newValue !== undefined;
                updateSelectedCell(gridSelection.cell[0] + movX, gridSelection.cell[1] + movY, isEditingTrailingRow);
            }
        },
        [gridSelection, focus, mangledOnCellEdited, rowMarkerOffset, mangledRows, updateSelectedCell]
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
                const isDeleteKey = event.key === "Delete" || (browserIsOSX.value && event.key === "Backspace");
                const isCopyKey = event.key === "c" && (event.metaKey || event.ctrlKey);

                if (event.key === "Escape") {
                    if (overlayOpen) {
                        setOverlay(undefined);
                        return;
                    }
                    setGridSelection(undefined);
                    setSelectedRows(CompactSelection.empty());
                    setSelectedColumns(CompactSelection.empty());
                    return;
                }

                if (
                    isDeleteKey &&
                    selectedRows !== undefined &&
                    selectedRows.length !== 0 &&
                    gridSelection === undefined
                ) {
                    focus();
                    onDeleteRows?.(Array.from(selectedRows));
                    setSelectedRows(CompactSelection.empty());
                    return;
                }

                if (isCopyKey && getCellsForSelection !== undefined) {
                    if (gridSelection !== undefined) {
                        const [col, row] = gridSelection.cell;
                        if (gridSelection.range !== undefined && getCellsForSelection !== undefined) {
                            copyToClipboard(
                                getCellsForSelection({
                                    ...gridSelection.range,
                                    x: gridSelection.range.x - rowMarkerOffset,
                                })
                            );
                        } else {
                            const cellValue = getCellContent([col - rowMarkerOffset, row]);
                            copyToClipboard([[cellValue]]);
                        }
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

                if (gridSelection === undefined) return;
                let [col, row] = gridSelection.cell;

                if (event.key === "Enter" && event.bounds !== undefined) {
                    if (overlayOpen) {
                        setOverlay(undefined);
                        row++;
                    } else if (row === rows && showTrailingBlankRow) {
                        window.setTimeout(() => {
                            appendRow(col);
                        }, 0);
                    } else {
                        reselect(event.bounds);
                        event.cancel();
                    }
                } else if (event.key === "v" && (event.metaKey || event.ctrlKey)) {
                    try {
                        const text = await navigator.clipboard.readText();
                        const cellValue = getCellContent([col - rowMarkerOffset, row]);

                        if (!isEditableGridCell(cellValue)) return;

                        switch (cellValue.kind) {
                            case GridCellKind.Text:
                                mangledOnCellEdited?.([col - rowMarkerOffset, row], {
                                    ...cellValue,
                                    data: text,
                                });
                                break;
                            case GridCellKind.Markdown:
                            case GridCellKind.Uri:
                                mangledOnCellEdited?.([col - rowMarkerOffset, row], {
                                    ...cellValue,
                                    data: text,
                                });
                                break;
                        }
                    } catch {
                        // do nothing
                    }
                } else if (event.key === "ArrowDown") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        adjustSelection([0, 1]);
                    } else {
                        row++;
                    }
                } else if (event.key === "ArrowUp") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        adjustSelection([0, -1]);
                    } else {
                        row--;
                    }
                } else if (event.key === "ArrowRight") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        adjustSelection([1, 0]);
                    } else {
                        col++;
                    }
                } else if (event.key === "ArrowLeft") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        adjustSelection([-1, 0]);
                    } else {
                        col--;
                    }
                } else if (event.key === "Tab") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        col--;
                    } else {
                        col++;
                    }
                } else if (isDeleteKey) {
                    const cellValue = getCellContent([col - rowMarkerOffset, row]);
                    if (
                        (isEditableGridCell(cellValue) && cellValue.allowOverlay) ||
                        cellValue.kind === GridCellKind.Boolean
                    ) {
                        // FIXME: Add way to show confirm modal
                        const del = true;
                        focus();
                        const cell = [col - rowMarkerOffset, row] as const;
                        if (del) {
                            switch (cellValue.kind) {
                                case GridCellKind.Text:
                                    mangledOnCellEdited?.(cell, {
                                        ...cellValue,
                                        data: "",
                                    });
                                    break;
                                case GridCellKind.Markdown:
                                case GridCellKind.Uri:
                                    mangledOnCellEdited?.(cell, {
                                        ...cellValue,
                                        data: "",
                                    });
                                    break;
                                case GridCellKind.Image:
                                    mangledOnCellEdited?.(cell, {
                                        ...cellValue,
                                        data: [],
                                    });
                                    break;
                                case GridCellKind.Boolean:
                                    mangledOnCellEdited?.(cell, {
                                        ...cellValue,
                                        data: false,
                                    });
                                    break;
                                case GridCellKind.Number:
                                    mangledOnCellEdited?.(cell, {
                                        ...cellValue,
                                        data: undefined,
                                    });
                                    break;
                                default:
                                    assertNever(cellValue);
                            }
                        }
                    }
                } else if (
                    !event.metaKey &&
                    !event.ctrlKey &&
                    String.fromCharCode(event.keyCode).match(/(\w|\s)/g) &&
                    event.bounds !== undefined &&
                    isReadWriteCell(getCellContent([col - rowMarkerOffset, Math.max(0, row - 1)]))
                ) {
                    if (
                        (!lastRowSticky || row !== rows) &&
                        (visibileRegion.y > col ||
                            col > visibileRegion.y + visibileRegion.height ||
                            visibileRegion.x > row ||
                            row > visibileRegion.x + visibileRegion.width)
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
            getCellsForSelection,
            getCellContent,
            rowMarkerOffset,
            updateSelectedCell,
            setGridSelection,
            setSelectedRows,
            setSelectedColumns,
            focus,
            onDeleteRows,
            selectedColumns,
            copyToClipboard,
            columns.length,
            rows,
            showTrailingBlankRow,
            appendRow,
            reselect,
            mangledOnCellEdited,
            adjustSelection,
            lastRowSticky,
            visibileRegion.y,
            visibileRegion.height,
            visibileRegion.x,
            visibileRegion.width,
        ]
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
    return (
        <ThemeProvider theme={mergedTheme}>
            <DataGridSearch
                {...rest}
                canvasRef={canvasRef}
                cellXOffset={(cellXOffset ?? visibileRegion.x) + rowMarkerOffset}
                cellYOffset={cellYOffset ?? visibileRegion.y}
                columns={mangledCols}
                disabledRows={disabledRows}
                firstColSticky={hasRowMarkers}
                getCellContent={getMangedCellContent}
                headerHeight={headerHeight}
                lastRowSticky={lastRowSticky}
                onCellFocused={onCellFocused}
                onColumnMoved={onColumnMoved === undefined ? undefined : onColumnMovedImpl}
                onDragStart={onDragStartImpl}
                onHeaderMenuClick={onHeaderMenuClickInner}
                onItemHovered={onItemHoveredImpl}
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
                translateX={visibileRegion.tx}
                translateY={visibileRegion.ty}
                gridRef={gridRef}
            />
            {overlay !== undefined && (
                <DataGridOverlayEditor
                    {...overlay}
                    imageEditorOverride={imageEditorOverride}
                    onFinishEditing={onFinishEditing}
                    markdownDivCreateNode={markdownDivCreateNode}
                />
            )}
        </ThemeProvider>
    );
};
