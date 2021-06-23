import * as React from "react";
import { assertNever, dontAwait, maybe, removeArrayItem } from "../common/support";
import { Subtract } from "utility-types";
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
    RowSelection,
    isEditableGridCell,
    Rectangle,
    ColumnSelection,
} from "../data-grid/data-grid-types";
import copy from "copy-to-clipboard";
import { makeEditCell } from "../data-grid/data-grid-lib";
import DataGridSearch, { DataGridSearchProps } from "../data-grid-search/data-grid-search";
import { browserIsOSX } from "../common/browser-detect";
import { OverlayImageEditorProps } from "../data-grid-overlay-editor/private/image-overlay-editor";
import { ThemeProvider, useTheme } from "styled-components";
import { getBuilderTheme } from "../common/styles";
import { DataGridRef } from "data-grid/data-grid";

interface MouseState {
    readonly previousSelection?: GridSelection;
}

interface Handled {
    readonly firstColSticky: boolean;

    readonly headerHeight: number;
    readonly rowHeight: number | ((index: number) => number);

    readonly className?: string;

    readonly selectedColumns?: readonly number[];
    readonly selectedCell?: GridSelection;

    readonly onMouseDown?: (args: GridMouseEventArgs) => void;
    readonly onMouseUp?: (args: GridMouseEventArgs) => void;

    readonly onKeyDown?: (event: GridKeyEventArgs) => void;
    readonly onKeyUp?: (event: GridKeyEventArgs) => void;
    readonly onCellFocused?: (args: readonly [number, number]) => void;

    readonly canvasRef?: React.MutableRefObject<HTMLCanvasElement | null>;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;

    readonly onSearchResultsChanged?: (results: readonly (readonly [number, number])[], navIndex: number) => void;
    readonly onVisibleRegionChanged?: (range: Rectangle, tx?: number, ty?: number) => void;
    readonly searchColOffset: number;

    readonly cellXOffset: number;
    readonly cellYOffset: number;

    readonly translateX?: number;
    readonly translateY?: number;

    readonly gridRef?: React.Ref<DataGridRef>;
}

type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

export interface DataEditorProps extends Subtract<DataGridSearchProps, Handled> {
    readonly onDeleteRows?: (rows: readonly number[]) => void;
    readonly onCellEdited?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
    readonly onRowAppended?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
    readonly onCellClicked?: (cell: readonly [number, number]) => void;

    readonly rowMarkers?: boolean; // default true;
    readonly showTrailingBlankRow?: boolean; // default true;
    readonly headerHeight?: number; // default 36
    readonly rowHeight?: number; // default 34
    readonly rowMarkerWidth?: number; // default 50

    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;

    readonly cellXOffset?: number;
    readonly cellYOffset?: number;

    readonly selectedRows?: RowSelection;
    readonly onSelectedRowsChange?: (newRows: RowSelection | undefined) => void;

    readonly selectedColumns?: ColumnSelection;
    readonly onSelectedColumnsChange?: (newColumns: ColumnSelection | undefined) => void;

    readonly gridSelection?: GridSelection;
    readonly onGridSelectionChange?: (newSelection: GridSelection | undefined) => void;
    readonly onVisibleRegionChanged?: (range: Rectangle, tx?: number, ty?: number) => void;
}

const DataEditor: React.FunctionComponent<DataEditorProps> = p => {
    const [gridSelectionInner, setGridSelectionInner] = React.useState<GridSelection>();
    const [selectedColumnsInner, setSelectedColumnsInner] = React.useState<ColumnSelection>([]);
    const [selectedRowsInner, setSelectedRowsInner] = React.useState<RowSelection>([]);
    const [hoveredCell, setHoveredCell] = React.useState<readonly [number, number]>();
    const [overlay, setOverlay] = React.useState<{
        target: Rectangle;
        content: GridCell;
        cell: readonly [number, number];
        forceEditMode: boolean;
    }>();
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const mouseState = React.useRef<MouseState>();
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const scrollTimer = React.useRef<number>();
    const lastSent = React.useRef<[number, number]>();

    const imageEditorOverride = p.imageEditorOverride;
    const markdownDivCreateNode = p.markdownDivCreateNode;
    const rowMarkers = p.rowMarkers ?? true;
    const showTrailingBlankRow = p.showTrailingBlankRow ?? true;
    const rowMarkerOffset = rowMarkers ? 1 : 0;

    const rowHeight = p.rowHeight ?? 34;
    const headerHeight = p.headerHeight ?? 36;
    const rowMarkerWidth = p.rowMarkerWidth ?? 50;

    const { isDraggable, getCellsForSelection } = p;

    const {
        cellXOffset: xOff,
        cellYOffset: yOff,
        columns,
        rows,
        getCellContent,
        onCellClicked,
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
        ...rest
    } = p;

    const gridSelection = gridSelectionOuter ?? gridSelectionInner;
    const setGridSelection = onGridSelectionChange ?? setGridSelectionInner;
    const selectedRows = selectedRowsOuter ?? selectedRowsInner;
    const setSelectedRows = setSelectedRowsOuter ?? setSelectedRowsInner;
    const selectedColumns = selectedColumnsOuter ?? selectedColumnsInner;
    const setSelectedColumns = setSelectedColumnsOuter ?? setSelectedColumnsInner;

    const hoveredFirstRow = hoveredCell?.[0] === 0 ? hoveredCell?.[1] : undefined;

    const gridRef = React.useRef<DataGridRef | null>(null);

    const focus = React.useCallback(() => {
        window.requestAnimationFrame(() => {
            gridRef.current?.focus();
        });
    }, []);

    const mangledRows = showTrailingBlankRow ? rows + 1 : rows;

    const mangledOnCellEdited = React.useCallback(
        (cell: readonly [number, number], newValue: EditableGridCell) => {
            const [, row] = cell;
            if (showTrailingBlankRow && row === mangledRows - 1) {
                onRowAppended?.(cell, newValue);
            } else {
                onCellEdited?.(cell, newValue);
            }
        },
        [onRowAppended, onCellEdited, mangledRows, showTrailingBlankRow]
    );

    const mangledCols = React.useMemo(() => {
        if (!rowMarkers) return columns;
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
        ([col, row]: readonly [number, number]): GridCell => {
            if (col === 0 && rowMarkers) {
                return {
                    kind: GridCellKind.Boolean,
                    data: selectedRows?.includes(row),
                    showUnchecked: hoveredFirstRow === row,
                    allowOverlay: false,
                    allowEdit: false,
                };
            } else if (showTrailingBlankRow && row === mangledRows - 1) {
                //If the grid is empty, we will return text
                if (row === 0) {
                    return {
                        kind: GridCellKind.Text,
                        displayData: "",
                        data: "",
                        allowOverlay: true,
                    };
                }
                //Base the dataType on the previous row.
                const previousRow = getCellContent([col - rowMarkerOffset, row - 1]);
                return makeEditCell(previousRow);
            } else {
                return getCellContent([col - rowMarkerOffset, row]);
            }
        },
        [rowMarkers, showTrailingBlankRow, mangledRows, selectedRows, hoveredFirstRow, getCellContent, rowMarkerOffset]
    );

    const onMouseDown = React.useCallback(
        (args: GridMouseEventArgs) => {
            mouseState.current = {
                previousSelection: gridSelection,
            };
            if (args.kind === "cell") {
                const [col, row] = args.location;
                if (col === 0 && rowMarkers) {
                    setGridSelection(undefined);
                    setOverlay(undefined);
                    focus();
                    setSelectedColumns([]);
                    const index = selectedRows.indexOf(row);
                    if (index !== -1) {
                        setSelectedRows(removeArrayItem(selectedRows, index));
                    } else {
                        setSelectedRows([...selectedRows, row]);
                    }
                } else {
                    if (gridSelection?.cell[0] !== col || gridSelection.cell[1] !== row) {
                        if (args.shiftKey && gridSelection !== undefined) {
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
                        } else {
                            setGridSelection({ cell: [col, row], range: { x: col, y: row, width: 1, height: 1 } });
                            setSelectedColumns([]);
                            setSelectedRows([]);
                            setOverlay(undefined);
                            focus();
                        }
                    }
                }
            } else if (args.kind === "header") {
                const [col] = args.location;
                setSelectedColumns([col]);
                setGridSelection(undefined);
                setOverlay(undefined);
                focus();
                setSelectedRows([]);
            } else if (args.kind === "out-of-bounds") {
                setGridSelection(undefined);
                setOverlay(undefined);
                focus();
                setSelectedColumns([]);
                setSelectedRows([]);
            }
        },
        [gridSelection, rowMarkers, setGridSelection, focus, setSelectedColumns, selectedRows, setSelectedRows]
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
                    forceEditMode: initialValue !== undefined,
                });
            } else if (c.kind === GridCellKind.Boolean) {
                mangledOnCellEdited?.([col - rowMarkerOffset, row], {
                    ...c,
                    data: !c.data,
                });
            } else {
                onCellClicked?.([col - rowMarkerOffset, row]);
            }
        },
        [getMangedCellContent, mangledOnCellEdited, onCellClicked, rowMarkerOffset, gridSelection]
    );

    const onMouseUp = React.useCallback(
        (args: GridMouseEventArgs) => {
            const mouse = mouseState.current;
            mouseState.current = undefined;

            if (scrollTimer.current !== undefined) {
                window.clearInterval(scrollTimer.current);
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
        [gridSelection, reselect]
    );

    const onHeaderMenuClickInner = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            onHeaderMenuClick?.(col - rowMarkerOffset, screenPosition);
        },
        [onHeaderMenuClick, rowMarkerOffset]
    );

    const [visibileRegion, setVisibleRegion] = React.useState<Rectangle & { tx?: number; ty?: number }>({
        x: 0,
        y: 0,
        width: 1,
        height: 1,
    });

    const cellXOffset = xOff ?? visibileRegion.x;
    const cellYOffset = yOff ?? visibileRegion.y;

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
            setSelectedColumns([endIndex]);
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
            if (args.kind === "cell") {
                setHoveredCell(args.location);
            } else if (args.kind === "out-of-bounds") {
                setHoveredCell(undefined);
            }

            if (mouseState.current !== undefined && gridSelection !== undefined && !isDraggable) {
                const [selectedCol, selectedRow] = gridSelection.cell;
                // eslint-disable-next-line prefer-const
                let [col, row] = args.location;

                if (col === 0 && rowMarkers) {
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
                        scrollY = rowHeight * vertical;
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
        [onItemHovered, gridSelection, isDraggable, rowMarkers, setGridSelection, columns, rowHeight]
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
        (col: number, row: number): boolean => {
            col = clamp(rowMarkerOffset, columns.length, col);
            row = clamp(0, mangledRows - 1, row);
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
                    // if (rowMarkers) index--;
                    const maxX = maxXScrollToCol(index);

                    const availableSpace = clientWidth - (rowMarkers ? rowMarkerWidth : 0) - mangledCols[index].width;
                    let offset = 0;
                    for (let i = index - 1; i >= 0; i--) {
                        if (availableSpace - (offset + mangledCols[i].width) < 0) break;

                        offset += mangledCols[i].width;
                    }

                    return maxX - offset;
                };

                let visibleFullColumns = 0;
                let t = rowMarkers ? rowMarkerWidth : 0;
                for (let c = cellYOffset; c < columns.length; c++) {
                    if (t + columns[c].width > clientWidth) break;

                    visibleFullColumns++;
                    t += columns[c].width;
                }

                const visible = {
                    x: cellXOffset + 1,
                    y: cellYOffset,
                    width: visibleFullColumns,
                    height: Math.ceil((clientHeight - headerHeight) / rowHeight),
                };

                if (row >= visible.y + visible.height - 1) {
                    const delta = row - (visible.y + visible.height - 2);
                    scrollRef.current.scrollBy(0, rowHeight * delta);
                } else if (row < visible.y) {
                    const delta = visible.y - row;
                    scrollRef.current.scrollBy(0, -(rowHeight * delta));
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
            rowMarkerOffset,
            columns,
            mangledRows,
            gridSelection?.cell,
            setGridSelection,
            rowMarkers,
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
            setOverlay(undefined);
            focus();

            const [movX, movY] = movement;
            if (gridSelection !== undefined && (movX !== 0 || movY !== 0)) {
                updateSelectedCell(gridSelection.cell[0] + movX, gridSelection.cell[1] + movY);
            }
        },
        [gridSelection, focus, mangledOnCellEdited, rowMarkerOffset, updateSelectedCell]
    );

    const onCellFocused = React.useCallback(
        (cell: readonly [number, number]) => {
            setGridSelection({
                cell,
                range: { x: cell[0], y: cell[1], width: 1, height: 1 },
            });
            setSelectedRows([]);
        },
        [setGridSelection, setSelectedRows]
    );

    const onKeyDown = React.useCallback(
        (event: GridKeyEventArgs) => {
            const fn = async () => {
                const shiftKey = event.shiftKey;
                const isDeleteKey = event.key === "Delete" || (browserIsOSX.value && event.key === "Backspace");
                const isCopyKey = event.key === "c" && (event.metaKey || event.ctrlKey);

                if (event.key === "Escape") {
                    setGridSelection(undefined);
                    setSelectedRows([]);
                    setSelectedColumns([]);
                    return;
                }

                if (isDeleteKey && selectedRows.length !== 0 && gridSelection === undefined) {
                    focus();
                    onDeleteRows?.(selectedRows);
                    setSelectedRows([]);
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
                    } else if (selectedRows.length > 0) {
                        const cells = selectedRows.map(
                            rowIndex =>
                                getCellsForSelection({
                                    x: 0,
                                    y: rowIndex,
                                    width: columns.length,
                                    height: 1,
                                })[0]
                        );
                        copyToClipboard(cells);
                    } else if (selectedColumns.length === 1) {
                        copyToClipboard(
                            getCellsForSelection({
                                x: selectedColumns[0] - rowMarkerOffset,
                                y: 0,
                                width: 1,
                                height: rows,
                            })
                        );
                    }
                }

                if (gridSelection === undefined) return;
                let [col, row] = gridSelection.cell;

                if (event.key === "Enter" && event.bounds !== undefined) {
                    reselect(event.bounds);
                    event.cancel();
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
                    if (shiftKey) {
                        adjustSelection([0, 1]);
                    } else {
                        row++;
                    }
                } else if (event.key === "ArrowUp") {
                    if (shiftKey) {
                        adjustSelection([0, -1]);
                    } else {
                        row--;
                    }
                } else if (event.key === "ArrowRight") {
                    if (shiftKey) {
                        adjustSelection([1, 0]);
                    } else {
                        col++;
                    }
                } else if (event.key === "ArrowLeft") {
                    if (shiftKey) {
                        adjustSelection([-1, 0]);
                    } else {
                        col--;
                    }
                } else if (event.key === "Tab") {
                    if (shiftKey) {
                        col--;
                    } else {
                        col++;
                    }
                } else if (isDeleteKey) {
                    const cellValue = getCellContent([col - rowMarkerOffset, row]);
                    if (isEditableGridCell(cellValue) && cellValue.allowOverlay) {
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
                    event.bounds !== undefined
                ) {
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
            dontAwait(fn());
        },
        [
            selectedRows,
            gridSelection,
            getCellsForSelection,
            updateSelectedCell,
            setGridSelection,
            setSelectedRows,
            setSelectedColumns,
            focus,
            onDeleteRows,
            selectedColumns,
            copyToClipboard,
            rowMarkerOffset,
            getCellContent,
            columns.length,
            rows,
            reselect,
            mangledOnCellEdited,
            adjustSelection,
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

    const theme = useTheme();
    const mergedTheme = React.useMemo(() => {
        return { ...getBuilderTheme(), ...theme };
    }, [theme]);
    return (
        <ThemeProvider theme={mergedTheme}>
            <DataGridSearch
                {...rest}
                canvasRef={canvasRef}
                cellXOffset={(cellXOffset ?? visibileRegion.x) + rowMarkerOffset}
                cellYOffset={cellYOffset ?? visibileRegion.y}
                translateX={visibileRegion.tx}
                translateY={visibileRegion.ty}
                columns={mangledCols}
                rows={mangledRows}
                firstColSticky={rowMarkers}
                getCellContent={getMangedCellContent}
                headerHeight={headerHeight}
                onColumnMoved={onColumnMovedImpl}
                onDragStart={onDragStartImpl}
                onCellFocused={onCellFocused}
                onHeaderMenuClick={onHeaderMenuClickInner}
                onItemHovered={onItemHoveredImpl}
                onKeyDown={onKeyDown}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onVisibleRegionChanged={onVisibleRegionChangedImpl}
                rowHeight={rowHeight}
                scrollRef={scrollRef}
                selectedCell={gridSelection}
                selectedColumns={selectedColumns}
                selectedRows={selectedRows}
                onSearchResultsChanged={onSearchResultsChanged}
                searchColOffset={rowMarkerOffset}
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

export default DataEditor;
