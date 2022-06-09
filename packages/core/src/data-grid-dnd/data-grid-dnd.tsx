import clamp from "lodash/clamp";
import * as React from "react";
import DataGrid, { DataGridProps, DataGridRef } from "../data-grid/data-grid";
import { GridColumn, GridMouseEventArgs, Rectangle } from "../data-grid/data-grid-types";

type Props = Omit<DataGridProps, "dragAndDropState" | "isResizing" | "isDragging" | "onMouseMoveRaw" | "allowResize">;

let warned = false;

export interface DataGridDndProps extends Props {
    readonly onRowMoved?: (startIndex: number, endIndex: number) => void;
    readonly onColumnMoved?: (startIndex: number, endIndex: number) => void;

    /**
     * @deprecated Use onColumnResize instead. It's the same thing, just fixes the naming convention.
     * This will be removed in a future version.
     */
    readonly onColumnResized?: (column: GridColumn, newSize: number) => void; // these should not be past tense?

    readonly onColumnResize?: (column: GridColumn, newSize: number) => void; // these should not be past tense?
    readonly onColumnResizeStart?: (column: GridColumn, newSize: number) => void; // these should not be past tense?
    readonly onColumnResizeEnd?: (column: GridColumn, newSize: number) => void; // these should not be past tense?

    readonly gridRef?: React.MutableRefObject<DataGridRef | null>;
    readonly maxColumnWidth: number;
    readonly minColumnWidth: number;
    readonly lockColumns: number;
}

const DataGridDnd: React.FunctionComponent<DataGridDndProps> = p => {
    const [resizeColStartX, setResizeColStartX] = React.useState<number>();
    const [resizeCol, setResizeCol] = React.useState<number>();

    const [dragCol, setDragCol] = React.useState<number>();
    const [dropCol, setDropCol] = React.useState<number>();
    const [dragColActive, setDragColActive] = React.useState(false);
    const [dragStartX, setDragStartX] = React.useState<number>();

    const [dragRow, setDragRow] = React.useState<number>();
    const [dropRow, setDropRow] = React.useState<number>();
    const [dragRowActive, setDragRowActive] = React.useState(false);
    const [dragStartY, setDragStartY] = React.useState<number>();

    const {
        onColumnMoved,
        onColumnResized,
        onColumnResize,
        onColumnResizeStart,
        onColumnResizeEnd,
        gridRef,
        maxColumnWidth,
        minColumnWidth,
        onHeaderMenuClick,
        onRowMoved,
        lockColumns,
        getCellContent,
    } = p;

    const canResize = (onColumnResize ?? onColumnResized ?? onColumnResizeEnd ?? onColumnResizeStart) !== undefined;

    if (process.env.NODE_ENV !== "production" && onColumnResized !== undefined && !warned) {
        // eslint-disable-next-line no-console
        console.warn("onColumnResized has been renamed to onColumnResize and will be removed in a future version.");
        warned = true;
    }

    const { onMouseDown, onMouseUp, onItemHovered, isDraggable = false, columns, selection } = p;
    const selectedColumns = selection.columns;

    const onItemHoveredImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            const [col, row] = args.location;
            if (dragCol !== undefined && dropCol !== col && col >= lockColumns) {
                setDragColActive(true);
                setDropCol(col);
            } else if (dragRow !== undefined && row !== undefined) {
                setDragRowActive(true);
                setDropRow(Math.max(0, row));
            } else {
                onItemHovered?.(args);
            }
        },
        [dragCol, dragRow, dropCol, onItemHovered, lockColumns]
    );

    const canDragCol = onColumnMoved !== undefined;
    const onMouseDownImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            let shouldFireEvent = true;
            if (args.button === 0) {
                const [col, row] = args.location;
                if (!isDraggable) {
                    if (args.kind === "out-of-bounds" && args.isEdge) {
                        const bounds = gridRef?.current?.getBounds(columns.length - 1, -1);
                        if (bounds !== undefined) {
                            setResizeColStartX(bounds.x);
                            setResizeCol(columns.length - 1);
                        }
                    } else if (args.kind === "header" && col >= lockColumns) {
                        if (args.isEdge) {
                            shouldFireEvent = false;
                            setResizeColStartX(args.bounds.x);
                            setResizeCol(col);
                            onColumnResizeStart?.(columns[col], args.bounds.width);
                        } else if (args.kind === "header" && canDragCol) {
                            setDragStartX(args.bounds.x);
                            setDragCol(col);
                        }
                    } else if (
                        args.kind === "cell" &&
                        lockColumns > 0 &&
                        col === 0 &&
                        row !== undefined &&
                        onRowMoved !== undefined
                    ) {
                        setDragStartY(args.bounds.y);
                        setDragRow(row);
                    }
                }
            }
            if (shouldFireEvent) onMouseDown?.(args);
        },
        [
            onMouseDown,
            isDraggable,
            canResize,
            lockColumns,
            onRowMoved,
            gridRef,
            columns,
            canDragCol,
            onColumnResizeStart,
        ]
    );

    const onHeaderMenuClickMangled = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            if (dragColActive || dragRowActive) return;
            onHeaderMenuClick?.(col, screenPosition);
        },
        [dragColActive, dragRowActive, onHeaderMenuClick]
    );

    const lastResizeWidthRef = React.useRef(-1);

    const onMouseUpImpl = React.useCallback(
        (args: GridMouseEventArgs, isOutside: boolean) => {
            if (args.button === 0) {
                if (resizeCol !== undefined) {
                    // if the column is in selection, the selection may contain extra cols, so lets just re-send the last
                    // resize event to all those columns.
                    if (selectedColumns?.hasIndex(resizeCol) === true) {
                        for (const c of selectedColumns) {
                            if (c === resizeCol) continue;
                            onColumnResized?.(columns[c], lastResizeWidthRef.current);
                            onColumnResize?.(columns[c], lastResizeWidthRef.current);
                        }
                    }

                    onColumnResizeEnd?.(columns[resizeCol], lastResizeWidthRef.current);
                    for (const c of selectedColumns) {
                        if (c === resizeCol) continue;
                        onColumnResizeEnd?.(columns[c], lastResizeWidthRef.current);
                    }
                }

                lastResizeWidthRef.current = -1;
                setDragRow(undefined);
                setDropRow(undefined);
                setDragStartY(undefined);
                setDragRowActive(false);
                setDragCol(undefined);
                setDropCol(undefined);
                setDragStartX(undefined);
                setDragColActive(false);
                setResizeCol(undefined);
                setResizeColStartX(undefined);
                if (dragCol !== undefined && dropCol !== undefined) {
                    onColumnMoved?.(dragCol, dropCol);
                }
                if (dragRow !== undefined && dropRow !== undefined) {
                    onRowMoved?.(dragRow, dropRow);
                }
            }
            onMouseUp?.(args, isOutside);
        },
        [
            onMouseUp,
            resizeCol,
            selectedColumns,
            dragCol,
            dropCol,
            dragRow,
            dropRow,
            onColumnResizeEnd,
            columns,
            onColumnResized,
            onColumnResize,
            onColumnMoved,
            onRowMoved,
        ]
    );

    const dragOffset = React.useMemo(() => {
        if (dragCol === undefined || dropCol === undefined) return undefined;
        if (dragCol === dropCol) return undefined;

        return {
            src: dragCol,
            dest: dropCol,
        };
    }, [dragCol, dropCol]);

    const onMouseMove = React.useCallback(
        (event: MouseEvent) => {
            if (dragCol !== undefined && dragStartX !== undefined) {
                const diff = Math.abs(event.clientX - dragStartX);
                if (diff > 20) {
                    setDragColActive(true);
                }
            } else if (dragRow !== undefined && dragStartY !== undefined) {
                const diff = Math.abs(event.clientY - dragStartY);
                if (diff > 20) {
                    setDragRowActive(true);
                }
            } else if (resizeCol !== undefined && resizeColStartX !== undefined) {
                const column = columns[resizeCol];
                const newWidth = clamp(
                    Math.round(event.clientX - resizeColStartX),
                    Math.ceil(minColumnWidth),
                    Math.floor(maxColumnWidth)
                );
                onColumnResized?.(column, newWidth);
                onColumnResize?.(column, newWidth);
                lastResizeWidthRef.current = newWidth;

                if (selectedColumns?.first() === resizeCol) {
                    for (const c of selectedColumns) {
                        if (c === resizeCol) continue;
                        onColumnResized?.(columns[c], lastResizeWidthRef.current);
                        onColumnResize?.(columns[c], lastResizeWidthRef.current);
                    }
                }
            }
        },
        [
            dragCol,
            dragStartX,
            dragRow,
            dragStartY,
            resizeCol,
            resizeColStartX,
            columns,
            minColumnWidth,
            maxColumnWidth,
            onColumnResized,
            onColumnResize,
            selectedColumns,
        ]
    );

    const getMangledCellContent = React.useCallback<typeof getCellContent>(
        cell => {
            if (dragRow === undefined || dropRow === undefined) return getCellContent(cell);

            // eslint-disable-next-line prefer-const
            let [col, row] = cell;
            if (row === dropRow) {
                row = dragRow;
            } else {
                if (row > dropRow) row -= 1;
                if (row >= dragRow) row += 1;
            }

            return getCellContent([col, row]);
        },
        [dragRow, dropRow, getCellContent]
    );

    return (
        <DataGrid
            // I know the below could be done with ...rest, but it adds about 2-3% cpu load in the hot loop
            // This doesn't matter much for most devices but it will matter for low power phones and such.
            accessibilityHeight={p.accessibilityHeight}
            cellXOffset={p.cellXOffset}
            cellYOffset={p.cellYOffset}
            columns={p.columns}
            enableGroups={p.enableGroups}
            freezeColumns={p.freezeColumns}
            onCanvasFocused={p.onCanvasFocused}
            onCanvasBlur={p.onCanvasBlur}
            isFocused={p.isFocused}
            onMouseMove={p.onMouseMove}
            groupHeaderHeight={p.groupHeaderHeight}
            fillHandle={p.fillHandle}
            headerHeight={p.headerHeight}
            height={p.height}
            lastRowSticky={p.lastRowSticky}
            rowHeight={p.rowHeight}
            rows={p.rows}
            highlightRegions={p.highlightRegions}
            verticalBorder={p.verticalBorder}
            width={p.width}
            canvasRef={p.canvasRef}
            className={p.className}
            disabledRows={p.disabledRows}
            isFilling={p.isFilling}
            firstColAccessible={p.firstColAccessible}
            drawCustomCell={p.drawCustomCell}
            drawHeader={p.drawHeader}
            eventTargetRef={p.eventTargetRef}
            experimental={p.experimental}
            getGroupDetails={p.getGroupDetails}
            getRowThemeOverride={p.getRowThemeOverride}
            headerIcons={p.headerIcons}
            isDraggable={p.isDraggable}
            onCellFocused={p.onCellFocused}
            onDragStart={p.onDragStart}
            onDragOverCell={p.onDragOverCell}
            onDragLeave={p.onDragLeave}
            onDrop={p.onDrop}
            onKeyDown={p.onKeyDown}
            onKeyUp={p.onKeyUp}
            prelightCells={p.prelightCells}
            selection={p.selection}
            translateX={p.translateX}
            translateY={p.translateY}
            // handled or mutated props
            getCellContent={getMangledCellContent}
            isResizing={resizeCol !== undefined}
            onHeaderMenuClick={onHeaderMenuClickMangled}
            isDragging={dragColActive}
            onItemHovered={onItemHoveredImpl}
            onMouseDown={onMouseDownImpl}
            allowResize={onColumnResized !== undefined || onColumnResize !== undefined}
            onMouseUp={onMouseUpImpl}
            dragAndDropState={dragOffset}
            onMouseMoveRaw={onMouseMove}
            ref={gridRef}
        />
    );
};

export default DataGridDnd;
