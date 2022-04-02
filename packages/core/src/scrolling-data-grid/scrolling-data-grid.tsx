import * as React from "react";
import styled from "styled-components";
import DataGridDnd, { DataGridDndProps } from "../data-grid-dnd/data-grid-dnd";
import { Rectangle } from "../data-grid/data-grid-types";
import { InfiniteScroller } from "./infinite-scroller";
import clamp from "lodash/clamp";

type Props = Omit<DataGridDndProps, "width" | "height" | "eventTargetRef">;

export interface ScrollingDataGridProps extends Props {
    readonly onVisibleRegionChanged?: (range: Rectangle, tx?: number, ty?: number) => void;
    readonly scrollToEnd?: boolean;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly smoothScrollX?: boolean;
    readonly smoothScrollY?: boolean;
    readonly overscrollX?: number;
    readonly overscrollY?: number;
    readonly preventDiagonalScrolling?: boolean;
    readonly rightElementSticky?: boolean;
    readonly rightElement?: React.ReactNode;
    readonly showMinimap?: boolean;
}

const MinimapStyle = styled.div`
    position: absolute;
    right: 44px;
    bottom: 44px;
    background-color: ${p => p.theme.bgCell};
    background: linear-gradient(${p => p.theme.bgCell}, ${p => p.theme.bgCellMedium});
    border-radius: 4px;
    z-index: 1;
    box-shadow: 0 0 0 1px ${p => p.theme.borderColor}, 0 2px 5px rgba(0, 0, 0, 0.08);

    overflow: hidden;

    .header {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 4px;
        background-color: ${p => p.theme.bgHeader};
        box-shadow: 0 0 0 1px ${p => p.theme.borderColor};
    }

    .locationMarker {
        position: absolute;

        border: 1px solid ${p => p.theme.accentColor};
        background-color: ${p => p.theme.accentLight};
    }
`;

const GridScroller: React.FunctionComponent<ScrollingDataGridProps> = p => {
    const { columns, rows, rowHeight, headerHeight, groupHeaderHeight, enableGroups, freezeColumns, experimental } = p;
    const { paddingRight, paddingBottom } = experimental ?? {};
    const {
        className,
        onVisibleRegionChanged,
        scrollToEnd,
        scrollRef,
        preventDiagonalScrolling,
        rightElement,
        rightElementSticky,
        overscrollX,
        overscrollY,
        showMinimap = false,
        ...dataGridProps
    } = p;
    const { smoothScrollX = false, smoothScrollY = false } = p;

    const [clientWidth, setClientWidth] = React.useState<number>(10);
    const [clientHeight, setClientHeight] = React.useState<number>(10);
    const last = React.useRef<Rectangle | undefined>();
    const lastX = React.useRef<number | undefined>();
    const lastY = React.useRef<number | undefined>();

    const width = React.useMemo(() => {
        let r = Math.max(0, overscrollX ?? 0);
        for (const c of columns) {
            r += c.width;
        }
        return r;
    }, [columns, overscrollX]);

    let height = enableGroups ? headerHeight + groupHeaderHeight : headerHeight;
    if (typeof rowHeight === "number") {
        height += rows * rowHeight;
    } else {
        for (let r = 0; r < rows; r++) {
            height += rowHeight(r);
        }
    }
    if (overscrollY !== undefined) {
        height += overscrollY;
    }

    const lastArgs = React.useRef<Rectangle>();

    const processArgs = React.useCallback(() => {
        const args = lastArgs.current;
        if (args === undefined) return;

        let x = 0;
        let tx = 0;
        let cellRight = 0;
        let cellX = 0;

        let stickyColWidth = 0;
        for (let i = 0; i < freezeColumns; i++) {
            stickyColWidth += columns[i].width;
        }

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

        setClientHeight(args.height);
        setClientWidth(args.width);
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

    const scroller = scrollRef?.current ?? undefined;
    const aspect = clamp(width / height, 2 / 3, 1.5);
    const maxSize = 200;
    const w = aspect > 1 ? maxSize : Math.ceil(maxSize * aspect);
    const h = aspect > 1 ? Math.ceil(maxSize / aspect) : maxSize;
    const hRatio = w / width;
    const vRatio = h / height;
    const vWidth = Math.min(clientWidth * Math.max(hRatio, 0.01), w);
    const vHeight = Math.min(clientHeight * Math.max(vRatio, 0.01), h);
    const left = ((scroller?.scrollLeft ?? 0) / (width - clientWidth)) * (w - vWidth);
    const top = ((scroller?.scrollTop ?? 0) / (height - clientHeight)) * (h - vHeight);

    const minimap: React.ReactNode = React.useMemo(() => {
        if (!showMinimap || vWidth === 0 || vHeight === 0) return undefined;

        const handleMouse = (e: React.MouseEvent) => {
            if (scroller === undefined) return;
            const bounds = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - bounds.x - vWidth / 2;
            const y = e.clientY - bounds.y - vHeight / 2;

            const newScrollLeft = (width - scroller.clientWidth) * (x / (w - vWidth));
            const newScrollTop = (height - scroller.clientHeight) * (y / (h - vHeight));

            scroller.scrollTo({
                left: newScrollLeft,
                top: newScrollTop,
                behavior: e.type === "mousemove" ? "auto" : "smooth",
            });
        };

        return (
            <MinimapStyle
                style={{ width: w, height: h }}
                data-testid="minimap-container"
                onMouseMove={e => {
                    if (e.buttons !== 1) return;
                    handleMouse(e);
                }}
                onClick={handleMouse}>
                <div className="header" />
                <div
                    className="locationMarker"
                    onDragStart={e => e.preventDefault()}
                    style={{
                        left,
                        top,
                        width: vWidth,
                        height: vHeight,
                        borderRadius: Math.min(vWidth, vHeight * 0.2, 9),
                    }}></div>
            </MinimapStyle>
        );
    }, [h, height, left, scroller, showMinimap, top, vHeight, vWidth, w, width]);

    return (
        <InfiniteScroller
            scrollRef={scrollRef}
            minimap={minimap}
            className={className}
            preventDiagonalScrolling={preventDiagonalScrolling}
            draggable={dataGridProps.isDraggable === true}
            scrollWidth={width + (paddingRight ?? 0)}
            scrollHeight={height + (paddingBottom ?? 0)}
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
