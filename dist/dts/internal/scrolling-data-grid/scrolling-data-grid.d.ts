import * as React from "react";
import { type DataGridDndProps } from "../data-grid-dnd/data-grid-dnd.js";
import type { Rectangle } from "../data-grid/data-grid-types.js";
type Props = Omit<DataGridDndProps, "width" | "height" | "eventTargetRef">;
export interface ScrollingDataGridProps extends Props {
    readonly className: string | undefined;
    readonly onVisibleRegionChanged: ((range: Rectangle, clientWidth: number, clientHeight: number, rightElWidth: number, tx: number, ty: number) => void) | undefined;
    readonly scrollRef: React.MutableRefObject<HTMLDivElement | null> | undefined;
    /**
     * The overscroll properties are used to allow the grid to scroll past the logical end of the content by a fixed
     * number of pixels. This is useful particularly on the X axis if you allow for resizing columns as it can make
     * resizing the final column significantly easier.
     *
     * @group Advanced
     */
    readonly overscrollX: number | undefined;
    /** {@inheritDoc overscrollX}
     * @group Advanced
     */
    readonly overscrollY: number | undefined;
    /**
     * Provides an initial size for the grid which can prevent a flicker on load if the initial size is known prior to
     * layout.
     *
     * @group Advanced
     */
    readonly initialSize: readonly [width: number, height: number] | undefined;
    /**
     * Set to true to prevent any diagonal scrolling.
     * @group Advanced
     */
    readonly preventDiagonalScrolling: boolean | undefined;
    /**
     * If `rightElementProps.sticky` is set to true the right element will be visible at all times, otherwise the user
     * will need to scroll to the end to reveal it.
     *
     * If `rightElementProps.fill` is set, the right elements container will fill to consume all remaining space (if
     * any) at the end of the grid. This does not play nice with growing columns.
     *
     * @group Advanced
     */
    readonly rightElementProps: {
        readonly sticky?: boolean;
        readonly fill?: boolean;
    } | undefined;
    /**
     * The right element is a DOM node which can be inserted at the end of the horizontal scroll region. This can be
     * used to create a right handle panel, make a big add button, or display messages.
     * @group Advanced
     */
    readonly rightElement: React.ReactNode | undefined;
    readonly clientSize: readonly [number, number, number];
    readonly nonGrowWidth: number;
}
declare const GridScroller: React.FunctionComponent<ScrollingDataGridProps>;
export default GridScroller;
//# sourceMappingURL=scrolling-data-grid.d.ts.map