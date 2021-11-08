import clamp from "lodash/clamp";
import * as React from "react";
import DataGrid, { DataGridProps, DataGridRef } from "../data-grid/data-grid";
import { GridColumn, GridMouseEventArgs, Rectangle } from "../data-grid/data-grid-types";

type Props = Omit<DataGridProps, "dragAndDropState" | "isResizing" | "isDragging" | "onMouseMove" | "allowResize">;

export interface DataGridDndProps extends Props {
    readonly onRowMoved?: (startIndex: number, endIndex: number) => void;
    readonly onColumnMoved?: (startIndex: number, endIndex: number) => void;
    readonly onColumnResized?: (column: GridColumn, newSize: number) => void;
    readonly gridRef?: React.MutableRefObject<DataGridRef | null>;
    readonly maxColumnWidth?: number;
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
        gridRef,
        maxColumnWidth,
        onHeaderMenuClick,
        onRowMoved,
        getCellContent,
        ...rest
    } = p;

    const { freezeColumns, onMouseDown, onMouseUp, onItemHovered, isDraggable = false, columns, selectedColumns } = p;

    const onItemHoveredImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            const [col, row] = args.location;
            if (dragCol !== undefined && dropCol !== col && col >= freezeColumns) {
                setDragColActive(true);
                setDropCol(col);
            } else if (dragRow !== undefined && row !== undefined) {
                setDragRowActive(true);
                setDropRow(row);
            } else {
                onItemHovered?.(args);
            }
        },
        [dragCol, dragRow, dropCol, freezeColumns, onItemHovered]
    );

    const canDragCol = onColumnMoved !== undefined;
    const onMouseDownImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            let shouldFireEvent = true;
            const [col, row] = args.location;
            if (!isDraggable) {
                if (args.kind === "out-of-bounds" && args.isEdge) {
                    const bounds = gridRef?.current?.getBounds(columns.length - 1, -1);
                    if (bounds !== undefined) {
                        setResizeColStartX(bounds.x);
                        setResizeCol(columns.length - 1);
                    }
                } else if ((args.kind === "header" || args.kind === "cell") && col >= freezeColumns) {
                    if (args.isEdge) {
                        shouldFireEvent = false;
                        setResizeColStartX(args.bounds.x);
                        setResizeCol(col);
                    } else if (args.kind === "header" && canDragCol) {
                        setDragStartX(args.bounds.x);
                        setDragCol(col);
                    }
                } else if (
                    args.kind === "cell" &&
                    freezeColumns > 0 &&
                    col === 0 &&
                    row !== undefined &&
                    onRowMoved !== undefined
                ) {
                    setDragStartY(args.bounds.y);
                    setDragRow(row);
                }
            }
            if (shouldFireEvent) onMouseDown?.(args);
        },
        [isDraggable, onMouseDown, freezeColumns, onRowMoved, gridRef, columns.length, canDragCol]
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
            if (resizeCol !== undefined && selectedColumns?.hasIndex(resizeCol) === true) {
                for (const c of selectedColumns) {
                    if (c === resizeCol) continue;
                    onColumnResized?.(columns[c], lastResizeWidthRef.current);
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
            onMouseUp?.(args, isOutside);
        },
        [
            columns,
            dragCol,
            dragRow,
            dropCol,
            dropRow,
            onColumnMoved,
            onColumnResized,
            onMouseUp,
            onRowMoved,
            resizeCol,
            selectedColumns,
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

    const maxColumnWidthValue = maxColumnWidth === undefined ? 500 : maxColumnWidth < 50 ? 50 : maxColumnWidth;

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
                const newWidth = clamp(event.clientX - resizeColStartX, 50, maxColumnWidthValue);
                onColumnResized?.(column, newWidth);
                lastResizeWidthRef.current = newWidth;

                if (resizeCol !== undefined && selectedColumns?.first() === resizeCol) {
                    for (const c of selectedColumns) {
                        if (c === resizeCol) continue;
                        onColumnResized?.(columns[c], lastResizeWidthRef.current);
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
            maxColumnWidthValue,
            onColumnResized,
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
            {...rest}
            getCellContent={getMangledCellContent}
            isResizing={resizeCol !== undefined}
            onHeaderMenuClick={onHeaderMenuClickMangled}
            isDragging={dragColActive}
            onItemHovered={onItemHoveredImpl}
            onMouseDown={onMouseDownImpl}
            allowResize={onColumnResized !== undefined}
            onMouseUp={onMouseUpImpl}
            dragAndDropState={dragOffset}
            onMouseMove={onMouseMove}
            ref={gridRef}
        />
    );
};

export default DataGridDnd;
