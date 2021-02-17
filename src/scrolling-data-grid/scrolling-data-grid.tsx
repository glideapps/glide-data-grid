import * as React from "react";
import { Subtract } from "utility-types";
import DataGridDnd, { DataGridDndProps } from "../data-grid-dnd/data-grid-dnd";
import { Rectangle } from "../data-grid/data-grid-types";
import ScrollRegion, { ScrollRegionUpdateArgs } from "../scroll-region/scroll-region";

interface Handled {
    readonly width: number;
    readonly height: number;
}

export interface ScrollingDataGridProps extends Subtract<DataGridDndProps, Handled> {
    readonly onVisibleRegionChanged?: (range: Rectangle) => void;
    readonly scrollToEnd?: boolean;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
}

const GridScroller: React.FunctionComponent<ScrollingDataGridProps> = p => {
    const { columns, rows, rowHeight, headerHeight, firstColSticky } = p;
    const { className, onVisibleRegionChanged, scrollToEnd, scrollRef, ...dateGridProps } = p;

    const [clientWidth, setClientWidth] = React.useState<number>(10);
    const [clientHeight, setClientHeight] = React.useState<number>(10);
    const last = React.useRef<Rectangle | undefined>();

    let width = 0;
    columns.forEach(c => (width += c.width));

    let height = headerHeight;
    if (typeof rowHeight === "number") {
        height += rows * rowHeight;
    } else {
        for (let r = 0; r < rows; r++) {
            height += rowHeight(r);
        }
    }

    const onScrollUpdate = React.useCallback(
        (args: ScrollRegionUpdateArgs) => {
            setClientHeight(args.clientHeight);
            setClientWidth(args.clientWidth);

            let x = 0;
            let cellRight = 0;
            let cellX = 0;

            const stickyColWidth = firstColSticky ? columns[0].width : 0;

            for (const c of columns) {
                if (args.scrollLeft > x - stickyColWidth) {
                    x += c.width;
                    cellX++;
                    cellRight++;
                } else if (args.scrollLeft + args.clientWidth > x - stickyColWidth) {
                    x += c.width;
                    cellRight++;
                } else {
                    break;
                }
            }

            let cellY = 0;
            let cellBottom = 0;
            if (typeof rowHeight === "number") {
                cellY = Math.ceil(args.scrollTop / rowHeight);
                cellBottom = Math.ceil(args.clientHeight / rowHeight) + cellY;
            } else {
                let y = 0;
                for (let row = 0; row < rows; row++) {
                    const rh = rowHeight(row);
                    if (args.scrollTop > rh / 2 + y) {
                        y += rh;
                        cellY++;
                        cellBottom++;
                    } else if (args.scrollTop + args.clientHeight > rh / 2 + y) {
                        y += rh;
                        cellBottom++;
                    } else {
                        break;
                    }
                }
            }

            const rect: Rectangle = {
                x: cellX,
                y: cellY,
                width: cellRight - cellX,
                height: cellBottom - cellY,
            };

            const oldRect = last.current;

            if (
                oldRect === undefined ||
                oldRect.y !== rect.y ||
                oldRect.x !== rect.x ||
                oldRect.height !== rect.height ||
                oldRect.width !== rect.width
            ) {
                onVisibleRegionChanged?.({
                    x: cellX,
                    y: cellY,
                    width: cellRight - cellX,
                    height: cellBottom - cellY,
                });
                last.current = rect;
            }
        },
        [columns, rowHeight, rows, onVisibleRegionChanged, firstColSticky]
    );

    return (
        <ScrollRegion
            scrollRef={scrollRef}
            className={className}
            scrollWidth={width}
            scrollHeight={height}
            update={onScrollUpdate}
            scrollToEnd={scrollToEnd}>
            <DataGridDnd width={clientWidth} height={clientHeight} {...dateGridProps} />
        </ScrollRegion>
    );
};

export default GridScroller;
