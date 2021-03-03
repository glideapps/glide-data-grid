import * as React from "react";
import { Subtract } from "utility-types";
import DataGridDnd, { DataGridDndProps } from "../data-grid-dnd/data-grid-dnd";
import { Rectangle } from "../data-grid/data-grid-types";
import ScrollRegion, { ScrollRegionUpdateArgs } from "../scroll-region/scroll-region";

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

const GridScroller: React.FunctionComponent<ScrollingDataGridProps> = p => {
    const { columns, rows, rowHeight, headerHeight, firstColSticky } = p;
    const { className, onVisibleRegionChanged, scrollToEnd, scrollRef, ...dateGridProps } = p;
    const { smoothScrollX, smoothScrollY } = p;

    const [clientWidth, setClientWidth] = React.useState<number>(10);
    const [clientHeight, setClientHeight] = React.useState<number>(10);
    const last = React.useRef<Rectangle | undefined>();
    const lastX = React.useRef<number | undefined>();
    const lastY = React.useRef<number | undefined>();

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
            let tx = 0;
            let cellRight = 0;
            let cellX = 0;

            const stickyColWidth = firstColSticky ? columns[0].width : 0;

            for (const c of columns) {
                const cx = x - stickyColWidth;
                if (args.scrollLeft >= cx + c.width) {
                    x += c.width;
                    cellX++;
                    cellRight++;
                } else if (args.scrollLeft > cx) {
                    x += c.width;
                    if (smoothScrollX) {
                        tx += cx - args.scrollLeft;
                    } else {
                        cellX++;
                    }
                    cellRight++;
                } else if (args.scrollLeft + args.clientWidth > cx) {
                    x += c.width;
                    cellRight++;
                } else {
                    break;
                }
            }

            let ty = 0;
            let cellY = 0;
            let cellBottom = 0;
            if (typeof rowHeight === "number") {
                if (smoothScrollY) {
                    cellY = Math.floor(args.scrollTop / rowHeight);
                    ty = cellY * rowHeight - args.scrollTop;
                } else {
                    cellY = Math.ceil(args.scrollTop / rowHeight);
                }
                cellBottom = Math.ceil(args.clientHeight / rowHeight) + cellY;
                if (ty < 0) cellBottom++;
            } else {
                let y = 0;
                for (let row = 0; row < rows; row++) {
                    const rh = rowHeight(row);
                    const cy = y + (smoothScrollY ? 0 : rh / 2);
                    if (args.scrollTop >= y + rh) {
                        y += rh;
                        cellY++;
                        cellBottom++;
                    } else if (args.scrollTop > cy) {
                        y += rh;
                        if (smoothScrollY) {
                            ty += cy - args.scrollTop;
                        } else {
                            cellY++;
                        }
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
                oldRect.width !== rect.width ||
                lastX.current !== tx ||
                lastY.current !== ty
            ) {
                onVisibleRegionChanged?.(
                    {
                        x: cellX,
                        y: cellY,
                        width: cellRight - cellX,
                        height: cellBottom - cellY,
                    },
                    tx,
                    ty
                );
                last.current = rect;
                lastX.current = tx;
                lastY.current = ty;
            }
        },
        [columns, rowHeight, rows, onVisibleRegionChanged, firstColSticky, smoothScrollX, smoothScrollY]
    );

    return (
        <ScrollRegion
            scrollRef={scrollRef}
            className={className}
            scrollWidth={width}
            scrollHeight={height}
            update={onScrollUpdate}
            scrollToEnd={scrollToEnd}>
            <DataGridDnd eventTargetRef={scrollRef} width={clientWidth} height={clientHeight} {...dateGridProps} />
        </ScrollRegion>
    );
};

export default GridScroller;
