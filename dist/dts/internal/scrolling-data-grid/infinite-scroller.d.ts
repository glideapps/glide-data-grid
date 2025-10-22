import type { Rectangle } from "../../index.js";
import * as React from "react";
interface Props {
    readonly children: React.ReactNode;
    readonly className?: string;
    readonly preventDiagonalScrolling?: boolean;
    readonly draggable: boolean;
    readonly paddingRight?: number;
    readonly paddingBottom?: number;
    readonly clientHeight: number;
    readonly scrollWidth: number;
    readonly scrollHeight: number;
    readonly initialSize?: readonly [width: number, height: number];
    readonly rightElementProps?: {
        readonly sticky?: boolean;
        readonly fill?: boolean;
    };
    readonly rightElement?: React.ReactNode;
    readonly kineticScrollPerfHack?: boolean;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly update: (region: Rectangle & {
        paddingRight: number;
    }) => void;
}
/**
 * InfiniteScroller provides virtual scrolling capabilities for the data grid.
 * It handles the mapping between DOM scroll positions and virtual scroll positions
 * when the content height exceeds browser limitations.
 *
 * Browser Limitations:
 * - Most browsers limit div heights to ~33.5 million pixels
 * - With large datasets (e.g., 100M rows × 31px = 3.1B pixels), we exceed this limit
 * - This component uses an offset-based approach to map the limited DOM scroll range
 *   to the full virtual scroll range
 */
export declare const InfiniteScroller: React.FC<Props>;
export {};
//# sourceMappingURL=infinite-scroller.d.ts.map