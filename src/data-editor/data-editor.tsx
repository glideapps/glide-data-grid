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
    isEditableGridCell,
    Rectangle,
} from "../data-grid/data-grid-types";
import copy from "copy-to-clipboard";
import { makeEditCell } from "../data-grid/data-grid-lib";
import DataGridSearch, { DataGridSearchProps } from "../data-grid-search/data-grid-search";
import { browserIsOSX } from "../common/browser-detect";
import { OverlayImageEditorProps } from "../data-grid-overlay-editor/private/image-overlay-editor";
import { ThemeProvider, useTheme } from "styled-components";
import { getBuilderTheme } from "../common/styles";

interface MouseState {
    readonly previousSelection?: GridSelection;
}

interface Handled {
    readonly firstColSticky: boolean;

    readonly headerHeight: number;
    readonly rowHeight: number | ((index: number) => number);

    readonly className?: string;

    readonly onCellClick?: (cell: readonly [number, number], screenPosition: Rectangle) => void;
    readonly onCellHovered?: (cell: readonly [number, number] | undefined) => void;

    readonly openedCell?: readonly [number, number];
    readonly selectedRows?: readonly number[];
    readonly selectedColumns?: readonly number[];
    readonly selectedCell?: GridSelection;

    readonly onItemHovered?: (args: GridMouseEventArgs) => void;
    readonly onMouseDown?: (args: GridMouseEventArgs) => void;
    readonly onMouseUp?: (args: GridMouseEventArgs) => void;

    readonly onKeyDown?: (event: GridKeyEventArgs) => void;

    readonly canvasRef?: React.MutableRefObject<HTMLCanvasElement | null>;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;

    readonly onSearchResultsChanged?: (results: readonly (readonly [number, number])[], navIndex: number) => void;
    readonly searchColOffset: number;
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
}

const DataEditor: React.FunctionComponent<DataEditorProps> = p => {
    const [selectedCell, setSelectedCell] = React.useState<GridSelection>();
    const [selectedRows, setSelectedRows] = React.useState<readonly number[]>([]);
    const [selectedColumns, setSelectedColumns] = React.useState<readonly number[]>([]);
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
        cellXOffset,
        cellYOffset,
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
        onVisibleRowsChanged,
        ...rest
    } = p;

    const hoveredFirstRow = hoveredCell?.[0] === 0 ? hoveredCell?.[1] : undefined;

    const focus = React.useCallback(() => {
        window.requestAnimationFrame(() => {
            canvasRef.current?.focus();
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
                previousSelection: selectedCell,
            };
            if (args.kind === "cell") {
                const [col, row] = args.location;
                if (col === 0 && rowMarkers) {
                    setSelectedCell(undefined);
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
                    if (selectedCell?.cell[0] !== col || selectedCell.cell[1] !== row) {
                        if (args.shiftKey && selectedCell !== undefined) {
                            const [sCol, sRow] = selectedCell.cell;
                            const left = Math.min(col, sCol);
                            const right = Math.max(col, sCol);
                            const top = Math.min(row, sRow);
                            const bottom = Math.max(row, sRow);
                            setSelectedCell({
                                ...selectedCell,
                                range: {
                                    x: left,
                                    y: top,
                                    width: right - left + 1,
                                    height: bottom - top + 1,
                                },
                            });
                        } else {
                            setSelectedCell({ cell: [col, row] });
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
                setSelectedCell(undefined);
                setOverlay(undefined);
                focus();
                setSelectedRows([]);
            } else if (args.kind === "out-of-bounds") {
                setSelectedCell(undefined);
                setOverlay(undefined);
                focus();
                setSelectedColumns([]);
                setSelectedRows([]);
            }
        },
        [selectedCell, rowMarkers, focus, selectedRows]
    );

    const reselect = React.useCallback(
        (bounds: Rectangle, initialValue?: string) => {
            if (selectedCell === undefined) return;

            const [col, row] = selectedCell.cell;
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
        [getMangedCellContent, mangledOnCellEdited, onCellClicked, rowMarkerOffset, selectedCell]
    );

    const onMouseUp = React.useCallback(
        (args: GridMouseEventArgs) => {
            const mouse = mouseState.current;
            mouseState.current = undefined;

            if (scrollTimer.current !== undefined) {
                window.clearInterval(scrollTimer.current);
            }

            if (args.kind !== "cell" || selectedCell === undefined || mouse?.previousSelection?.cell === undefined)
                return;
            const [col, row] = args.location;
            const [selectedCol, selectedRow] = selectedCell.cell;
            const [prevCol, prevRow] = mouse.previousSelection.cell;
            if (col === selectedCol && col === prevCol && row === selectedRow && row === prevRow) {
                reselect(args.bounds);
            }
        },
        [selectedCell, reselect]
    );

    const onHeaderMenuClickInner = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            onHeaderMenuClick?.(col - rowMarkerOffset, screenPosition);
        },
        [onHeaderMenuClick, rowMarkerOffset]
    );

    const onVisibleRowsChangedImpl = React.useCallback(
        (visibleRegion: Rectangle) => {
            onVisibleRowsChanged?.({
                ...visibleRegion,
                x: visibleRegion.x - rowMarkerOffset,
                height:
                    showTrailingBlankRow && visibleRegion.y + visibleRegion.height >= rows
                        ? visibleRegion.height - 1
                        : visibleRegion.height,
            });
        },
        [onVisibleRowsChanged, rowMarkerOffset, rows, showTrailingBlankRow]
    );

    const onColumnMovedImpl = React.useCallback(
        (startIndex: number, endIndex: number) => {
            onColumnMoved?.(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset);
            setSelectedColumns([endIndex]);
        },
        [onColumnMoved, rowMarkerOffset]
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

    const onItemHovered = React.useCallback(
        (args: GridMouseEventArgs) => {
            if (args.kind === "cell") {
                setHoveredCell(args.location);
            } else if (args.kind === "out-of-bounds") {
                setHoveredCell(undefined);
            }

            if (mouseState.current !== undefined && selectedCell !== undefined && !isDraggable) {
                const [selectedCol, selectedRow] = selectedCell.cell;
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

                setSelectedCell({
                    ...selectedCell,
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
        },
        [selectedCell, isDraggable, rowMarkers, columns, rowHeight]
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
            if (selectedCell === undefined) return;

            const [x, y] = direction;
            const [col, row] = selectedCell.cell;
            const oldRange = selectedCell.range;

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

            setSelectedCell({
                ...selectedCell,
                range: {
                    x: left,
                    y: top,
                    width: width,
                    height: height,
                },
            });
        },
        [selectedCell, rowMarkerOffset, rows]
    );

    const updateSelectedCell = React.useCallback(
        (col: number, row: number): boolean => {
            col = clamp(rowMarkerOffset, columns.length, col);
            row = clamp(0, mangledRows - 1, row);
            if (col === selectedCell?.cell[0] && row === selectedCell?.cell[1]) return false;
            setSelectedCell({ cell: [col, row] });

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
            cellXOffset,
            cellYOffset,
            columns,
            headerHeight,
            mangledCols,
            mangledRows,
            rowHeight,
            rowMarkerOffset,
            rowMarkerWidth,
            rowMarkers,
            selectedCell,
        ]
    );

    const onFinishEditing = React.useCallback(
        (newValue: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => {
            if (selectedCell !== undefined && newValue !== undefined) {
                // Fixme, this cast is dangerous
                mangledOnCellEdited?.(
                    [selectedCell.cell[0] - rowMarkerOffset, selectedCell.cell[1]],
                    newValue as EditableGridCell
                );
            }
            setOverlay(undefined);
            focus();

            const [movX, movY] = movement;
            if (selectedCell !== undefined && (movX !== 0 || movY !== 0)) {
                updateSelectedCell(selectedCell.cell[0] + movX, selectedCell.cell[1] + movY);
            }
        },
        [selectedCell, focus, mangledOnCellEdited, rowMarkerOffset, updateSelectedCell]
    );

    const onKeyDown = React.useCallback(
        (event: GridKeyEventArgs) => {
            const fn = async () => {
                const shiftKey = event.shiftKey;
                const isDeleteKey = event.key === "Delete" || (browserIsOSX && event.key === "Backspace");
                const isCopyKey = event.key === "c" && (event.metaKey || event.ctrlKey);

                if (event.key === "Escape") {
                    setSelectedCell(undefined);
                    setSelectedRows([]);
                    setSelectedColumns([]);
                    return;
                }

                if (isDeleteKey && selectedRows.length !== 0 && selectedCell === undefined) {
                    focus();
                    onDeleteRows?.(selectedRows);
                    setSelectedRows([]);
                    return;
                }

                if (isCopyKey && getCellsForSelection !== undefined) {
                    if (selectedCell !== undefined) {
                        const [col, row] = selectedCell.cell;
                        if (selectedCell.range !== undefined && getCellsForSelection !== undefined) {
                            copyToClipboard(
                                getCellsForSelection({
                                    ...selectedCell,
                                    range: {
                                        ...selectedCell.range,
                                        x: selectedCell.range.x - rowMarkerOffset,
                                    },
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
                                    cell: [0, 0],
                                    range: {
                                        x: 0,
                                        y: rowIndex,
                                        width: columns.length,
                                        height: 1,
                                    },
                                })[0]
                        );
                        copyToClipboard(cells);
                    } else if (selectedColumns.length === 1) {
                        copyToClipboard(
                            getCellsForSelection({
                                cell: [0, 0],
                                range: {
                                    x: selectedColumns[0] - rowMarkerOffset,
                                    y: 0,
                                    width: 1,
                                    height: rows,
                                },
                            })
                        );
                    }
                }

                if (selectedCell === undefined) return;
                let [col, row] = selectedCell.cell;

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
            selectedCell,
            getCellsForSelection,
            updateSelectedCell,
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
        if (selectedCell === undefined) return;
        const [col, row] = selectedCell.cell;
        updateSelectedCell(col, row);
    }, [mangledCols, rows, selectedCell, updateSelectedCell]);

    const theme = useTheme();
    const mergedTheme = React.useMemo(() => {
        return { ...getBuilderTheme(), ...theme };
    }, [theme]);
    return (
        <ThemeProvider theme={mergedTheme}>
            <DataGridSearch
                {...rest}
                canvasRef={canvasRef}
                cellXOffset={cellXOffset + rowMarkerOffset}
                cellYOffset={cellYOffset}
                columns={mangledCols}
                rows={mangledRows}
                firstColSticky={rowMarkers}
                getCellContent={getMangedCellContent}
                headerHeight={headerHeight}
                onColumnMoved={onColumnMovedImpl}
                onDragStart={onDragStartImpl}
                onHeaderMenuClick={onHeaderMenuClickInner}
                onItemHovered={onItemHovered}
                onKeyDown={onKeyDown}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onVisibleRowsChanged={onVisibleRowsChangedImpl}
                rowHeight={rowHeight}
                scrollRef={scrollRef}
                selectedCell={selectedCell}
                selectedColumns={selectedColumns}
                selectedRows={selectedRows}
                onSearchResultsChanged={onSearchResultsChanged}
                searchColOffset={rowMarkerOffset}
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
