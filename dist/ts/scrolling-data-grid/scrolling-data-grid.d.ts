import * as React from "react";
import { Subtract } from "utility-types";
import { DataGridDndProps } from "../data-grid-dnd/data-grid-dnd";
import { Rectangle } from "../data-grid/data-grid-types";
interface Handled {
    readonly width: number;
    readonly height: number;
    readonly eventTargetRef?: React.MutableRefObject<HTMLDivElement | null>;
}
export interface ScrollingDataGridProps extends Subtract<DataGridDndProps, Handled> {
    readonly onVisibleRegionChanged?: (range: Rectangle, tx?: number, ty?: number) => void;
    readonly scrollToEnd?: boolean;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly smoothScrollX?: boolean;
    readonly smoothScrollY?: boolean;
}
declare const GridScroller: React.FunctionComponent<ScrollingDataGridProps>;
export default GridScroller;
//# sourceMappingURL=scrolling-data-grid.d.ts.map