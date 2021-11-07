import * as React from "react";
import DataGridDnd, { DataGridDndProps } from "../data-grid-dnd/data-grid-dnd";
import { Rectangle } from "../data-grid/data-grid-types";
import { InfiniteScroller } from "./infinite-scroller";

type Props = Omit<DataGridDndProps, "width" | "height" | "eventTargetRef">;

export interface ScrollingDataGridProps extends Props {
    readonly onVisibleRegionChanged?: (range: Rectangle, tx?: number, ty?: number) => void;
    readonly scrollToEnd?: boolean;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly smoothScrollX?: boolean;
    readonly smoothScrollY?: boolean;
    readonly rightElementSticky?: boolean;
    readonly rightElement?: React.ReactNode;
}

const GridScroller: React.FunctionComponent<ScrollingDataGridProps> = p => {
    const { columns, rows, rowHeight, headerHeight, freezeColumns, experimental } = p;
    const { paddingRight, paddingBottom } = experimental ?? {};
    const {
        className,
        onVisibleRegionChanged,
        scrollToEnd,
        scrollRef,
        rightElement,
        rightElementSticky,
        ...dataGridProps
    } = p;
    const { smoothScrollX, smoothScrollY } = p;

    const [clientWidth, setClientWidth] = React.useState<number>(10);
    const [clientHeight, setClientHeight] = React.useState<number>(10);
    const last = React.useRef<Rectangle | undefined>();
    const lastX = React.useRef<number | undefined>();
    const lastY = React.useRef<number | undefined>();

    const width = React.useMemo(() => {
        let r = 0;
        for (const c of columns) {
            r += c.width;
        }
        return r;
    }, [columns]);

    let height = headerHeight;
    if (typeof rowHeight === "number") {
        height += rows * rowHeight;
    } else {
        for (let r = 0; r < rows; r++) {
            height += rowHeight(r);
        }
    }

    const lastArgs = React.useRef<Rectangle>();

    const processArgs = React.useCallback(() => {
        const args = lastArgs.current;
        if (args === undefined) return;

        setClientHeight(args.height);
        setClientWidth(args.width);

        let x = 0;
        let tx = 0;
        let cellRight = 0;
        let cellX = 0;

        const stickyColWidth = columns
            .slice(0, freezeColumns)
            .map(c => c.width)
            .reduce((pv, cv) => pv + cv, 0);

        for (const c of columns) {
            const cx = x - stickyColWidth;
            if (args.x >= cx + c.width) {
                x += c.width;
                cellX++;
                cellRight++;
            } else if (args.x > cx) {
                x += c.width;
                if (smoothScrollX) {
                    tx += cx - args.x;
                } else {
                    cellX++;
                }
                cellRight++;
            } else if (args.x + args.width > cx) {
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
                cellY = Math.floor(args.y / rowHeight);
                ty = cellY * rowHeight - args.y;
            } else {
                cellY = Math.ceil(args.y / rowHeight);
            }
            cellBottom = Math.ceil(args.height / rowHeight) + cellY;
            if (ty < 0) cellBottom++;
        } else {
            let y = 0;
            for (let row = 0; row < rows; row++) {
                const rh = rowHeight(row);
                const cy = y + (smoothScrollY ? 0 : rh / 2);
                if (args.y >= y + rh) {
                    y += rh;
                    cellY++;
                    cellBottom++;
                } else if (args.y > cy) {
                    y += rh;
                    if (smoothScrollY) {
                        ty += cy - args.y;
                    } else {
                        cellY++;
                    }
                    cellBottom++;
                } else if (args.y + args.height > rh / 2 + y) {
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
    }, [columns, rowHeight, rows, onVisibleRegionChanged, freezeColumns, smoothScrollX, smoothScrollY]);

    const onScrollUpdate = React.useCallback(
        (args: Rectangle) => {
            lastArgs.current = args;
            processArgs();
        },
        [processArgs]
    );

    React.useEffect(() => {
        processArgs();
    }, [processArgs]);

    return (
        <InfiniteScroller
            scrollRef={scrollRef}
            className={className}
            draggable={dataGridProps.isDraggable === true}
            scrollWidth={width}
            scrollHeight={height}
            clientHeight={clientHeight}
            rightElement={rightElement}
            paddingBottom={paddingBottom}
            paddingRight={paddingRight}
            rightElementSticky={rightElementSticky}
            update={onScrollUpdate}
            scrollToEnd={scrollToEnd}>
            <DataGridDnd eventTargetRef={scrollRef} width={clientWidth} height={clientHeight} {...dataGridProps} />
        </InfiniteScroller>
    );
};

export default GridScroller;
