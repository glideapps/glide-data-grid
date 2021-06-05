import * as React from "react";
import { Theme } from "../common/styles";
import { GridColumn, GridCell, Rectangle, GridSelection, GridMouseEventArgs, GridDragEventArgs, GridKeyEventArgs } from "./data-grid-types";
export interface DataGridProps {
    readonly width: number;
    readonly height: number;
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX?: number;
    readonly translateY?: number;
    readonly firstColSticky: boolean;
    readonly allowResize?: boolean;
    readonly columns: readonly GridColumn[];
    readonly rows: number;
    readonly headerHeight: number;
    readonly rowHeight: number | ((index: number) => number);
    readonly canvasRef?: React.MutableRefObject<HTMLCanvasElement | null>;
    readonly eventTargetRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly className?: string;
    readonly getCellContent: (cell: readonly [number, number]) => GridCell;
    readonly onHeaderMenuClick?: (col: number, screenPosition: Rectangle) => void;
    readonly selectedRows?: readonly number[];
    readonly selectedColumns?: readonly number[];
    readonly selectedCell?: GridSelection;
    readonly prelightCells?: readonly (readonly [number, number])[];
    readonly onItemHovered?: (args: GridMouseEventArgs) => void;
    readonly onMouseDown?: (args: GridMouseEventArgs) => void;
    readonly onMouseUp?: (args: GridMouseEventArgs) => void;
    readonly onCellFocused?: (args: readonly [number, number]) => void;
    readonly onMouseMove?: (event: MouseEvent) => void;
    readonly onKeyDown?: (event: GridKeyEventArgs) => void;
    readonly onKeyUp?: (event: GridKeyEventArgs) => void;
    readonly isDraggable?: boolean;
    readonly onDragStart?: (args: GridDragEventArgs) => void;
    readonly drawCustomCell?: (ctx: CanvasRenderingContext2D, cell: GridCell, theme: Theme, rect: Rectangle) => boolean;
    readonly dragAndDropState?: {
        src: number;
        dest: number;
    };
}
interface Props extends DataGridProps {
    readonly theme: Theme;
}
export interface DataGridRef {
    focus: () => void;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<Props & React.RefAttributes<DataGridRef>, "height" | "width" | "columns" | "ref" | "key" | "className" | "onKeyDown" | "onKeyUp" | "onDragStart" | "onMouseDown" | "onMouseMove" | "onMouseUp" | "rows" | "cellXOffset" | "cellYOffset" | "translateX" | "translateY" | "firstColSticky" | "allowResize" | "headerHeight" | "rowHeight" | "canvasRef" | "eventTargetRef" | "getCellContent" | "onHeaderMenuClick" | "selectedRows" | "selectedColumns" | "selectedCell" | "prelightCells" | "onItemHovered" | "onCellFocused" | "isDraggable" | "drawCustomCell" | "dragAndDropState"> & {
    theme?: any;
}>>;
export default _default;
//# sourceMappingURL=data-grid.d.ts.map