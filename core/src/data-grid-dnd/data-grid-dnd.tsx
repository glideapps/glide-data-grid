import clamp from "lodash/clamp";
import * as React from "react";
import DataGrid, { DataGridProps, DataGridRef } from "../data-grid/data-grid";
import { GridColumn, GridMouseEventArgs, Rectangle } from "../data-grid/data-grid-types";

type Props = Omit<DataGridProps, "dragAndDropState" | "isResizing" | "isDragging" | "onMouseMove" | "allowResize">;

export interface DataGridDndProps extends Props {
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
    const [dragActive, setDragActive] = React.useState(false);
    const [dragStartX, setDragStartX] = React.useState<number>();

    const { onColumnMoved, onColumnResized, gridRef, maxColumnWidth, onHeaderMenuClick, ...rest } = p;

    const { freezeColumns, onMouseDown, onMouseUp, onItemHovered, isDraggable = false, columns, selectedColumns } = p;

    const onItemHoveredImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            const [col] = args.location;
            if (dragCol !== undefined && dropCol !== col && col >= freezeColumns) {
                setDragActive(true);
                setDropCol(col);
            }
            onItemHovered?.(args);
        },
        [dragCol, dropCol, freezeColumns, onItemHovered]
    );

    const canDragCol = onColumnMoved !== undefined;
    const onMouseDownImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            let shouldFireEvent = true;
            const [col] = args.location;
            if (!isDraggable && args.kind === "out-of-bounds" && args.isEdge) {
                const bounds = gridRef?.current?.getBounds(columns.length - 1, -1);
                if (bounds !== undefined) {
                    setResizeColStartX(bounds.x);
                    setResizeCol(columns.length - 1);
                }
            } else if (!isDraggable && (args.kind === "header" || args.kind === "cell") && col >= freezeColumns) {
                if (args.isEdge) {
                    shouldFireEvent = false;
                    setResizeColStartX(args.bounds.x);
                    setResizeCol(col);
                } else if (args.kind === "header" && canDragCol) {
                    setDragStartX(args.bounds.x);
                    setDragCol(col);
                }
            }
            if (shouldFireEvent) onMouseDown?.(args);
        },
        [isDraggable, freezeColumns, onMouseDown, gridRef, columns.length, canDragCol]
    );

    const onHeaderMenuClickMangled = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            if (dragActive) return;
            onHeaderMenuClick?.(col, screenPosition);
        },
        [dragActive, onHeaderMenuClick]
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
            setDragCol(undefined);
            setDropCol(undefined);
            setDragStartX(undefined);
            setDragActive(false);
            setResizeCol(undefined);
            setResizeColStartX(undefined);
            if (dragCol !== undefined && dropCol !== undefined) {
                if (dropCol !== undefined) {
                    onColumnMoved?.(dragCol, dropCol);
                }
            }
            onMouseUp?.(args, isOutside);
        },
        [columns, dragCol, dropCol, onColumnMoved, onColumnResized, onMouseUp, resizeCol, selectedColumns]
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
                    setDragActive(true);
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
            resizeCol,
            resizeColStartX,
            columns,
            maxColumnWidthValue,
            onColumnResized,
            selectedColumns,
        ]
    );

    return (
        <DataGrid
            {...rest}
            isResizing={resizeCol !== undefined}
            onHeaderMenuClick={onHeaderMenuClickMangled}
            isDragging={dragActive}
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
