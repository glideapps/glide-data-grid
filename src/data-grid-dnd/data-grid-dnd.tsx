import clamp from "lodash/clamp";
import * as React from "react";
import { Subtract } from "utility-types";
import DataGrid, { DataGridProps } from "../data-grid/data-grid";
import { GridColumn, GridMouseEventArgs } from "../data-grid/data-grid-types";

interface Handled {
    readonly dragAndDropState?: {
        src: number;
        dest: number;
    };

    readonly onMouseMove?: (event: MouseEvent) => void;
}

export interface DataGridDndProps extends Subtract<DataGridProps, Handled> {
    readonly onColumnMoved?: (startIndex: number, endIndex: number) => void;
    readonly onColumnResized?: (column: GridColumn, newSize: number) => void;
}

const DataGridDnd: React.FunctionComponent<DataGridDndProps> = p => {
    const [resizeColStartX, setResizeColStartX] = React.useState<number>();
    const [resizeCol, setResizeCol] = React.useState<number>();
    const [dragCol, setDragCol] = React.useState<number>();
    const [dropCol, setDropCol] = React.useState<number>();

    const {
        firstColSticky,
        onColumnMoved,
        onMouseDown,
        onMouseUp,
        onItemHovered,
        isDraggable,
        columns,
        onColumnResized,
    } = p;

    const onItemHoveredImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            const [col] = args.location;
            if (dragCol !== undefined && dropCol !== col && (!firstColSticky || col > 0)) {
                setDropCol(col);
            }
            onItemHovered?.(args);
        },
        [dragCol, dropCol, firstColSticky, onItemHovered]
    );

    const onMouseDownImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            let shouldFireEvent = true;
            const [col] = args.location;
            if (
                !(isDraggable === true) &&
                (args.kind === "header" || args.kind === "cell") &&
                (!firstColSticky || col > 0)
            ) {
                if (args.isEdge) {
                    shouldFireEvent = false;
                    setResizeColStartX(args.bounds.x);
                    setResizeCol(col);
                } else if (args.kind === "header") {
                    setDragCol(col);
                }
            }
            if (shouldFireEvent) onMouseDown?.(args);
        },
        [firstColSticky, isDraggable, onMouseDown]
    );

    const onMouseUpImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            setDragCol(undefined);
            setDropCol(undefined);
            setResizeCol(undefined);
            setResizeColStartX(undefined);
            if (dragCol !== undefined && dropCol !== undefined) {
                if (dropCol !== undefined) {
                    onColumnMoved?.(dragCol, dropCol);
                }
            }
            onMouseUp?.(args);
        },
        [dragCol, dropCol, onColumnMoved, onMouseUp]
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
            if (resizeCol === undefined || resizeColStartX === undefined) return;
            const column = columns[resizeCol];
            const newWidth = clamp(event.clientX - resizeColStartX, 50, 500);
            onColumnResized?.(column, newWidth);
        },
        [resizeCol, resizeColStartX, columns, onColumnResized]
    );

    return (
        <DataGrid
            {...p}
            onItemHovered={onItemHoveredImpl}
            onMouseDown={onMouseDownImpl}
            onMouseUp={onMouseUpImpl}
            dragAndDropState={dragOffset}
            onMouseMove={onMouseMove}
        />
    );
};

export default DataGridDnd;
