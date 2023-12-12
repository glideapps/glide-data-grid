import * as React from "react";
import DataGridDnd, { type DataGridDndProps } from "../data-grid-dnd/data-grid-dnd.js";
import type { Rectangle } from "../data-grid/data-grid-types.js";
import { InfiniteScroller } from "./infinite-scroller.js";

type Props = Omit<DataGridDndProps, "width" | "height" | "eventTargetRef">;

export interface ScrollingDataGridProps extends Props {
    readonly className: string | undefined;
    readonly onVisibleRegionChanged:
        | ((
              range: Rectangle,
              clientWidth: number,
              clientHeight: number,
              rightElWidth: number,
              tx: number,
              ty: number
          ) => void)
        | undefined;
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
    readonly rightElementProps:
        | {
              readonly sticky?: boolean;
              readonly fill?: boolean;
          }
        | undefined;
    /**
     * The right element is a DOM node which can be inserted at the end of the horizontal scroll region. This can be
     * used to create a right handle panel, make a big add button, or display messages.
     * @group Advanced
     */
    readonly rightElement: React.ReactNode | undefined;
    readonly clientSize: readonly [number, number, number]; // [width, height, rightElSize]
}

const GridScroller: React.FunctionComponent<ScrollingDataGridProps> = p => {
    const {
        columns,
        rows,
        rowHeight,
        headerHeight,
        groupHeaderHeight,
        enableGroups,
        freezeColumns,
        experimental,
        clientSize,
        className,
        onVisibleRegionChanged,
        scrollRef,
        preventDiagonalScrolling,
        rightElement,
        rightElementProps,
        overscrollX,
        overscrollY,
        initialSize,
        smoothScrollX = false,
        smoothScrollY = false,
        isDraggable,
    } = p;
    const { paddingRight, paddingBottom } = experimental ?? {};

    const [clientWidth, clientHeight] = clientSize;
    const last = React.useRef<Rectangle | undefined>();
    const lastX = React.useRef<number | undefined>();
    const lastY = React.useRef<number | undefined>();
    const lastSize = React.useRef<readonly [number, number] | undefined>();

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

    const lastArgs = React.useRef<Rectangle & { paddingRight: number }>();

    const processArgs = React.useCallback(() => {
        if (lastArgs.current === undefined) return;
        const args = { ...lastArgs.current };

        let x = 0;
        let tx = args.x < 0 ? -args.x : 0;
        let cellRight = 0;
        let cellX = 0;

        args.x = args.x < 0 ? 0 : args.x;

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
            lastY.current !== ty ||
            args.width !== lastSize.current?.[0] ||
            args.height !== lastSize.current?.[1]
        ) {
            onVisibleRegionChanged?.(
                {
                    x: cellX,
                    y: cellY,
                    width: cellRight - cellX,
                    height: cellBottom - cellY,
                },
                args.width,
                args.height,
                args.paddingRight ?? 0,
                tx,
                ty
            );
            last.current = rect;
            lastX.current = tx;
            lastY.current = ty;
            lastSize.current = [args.width, args.height];
        }
    }, [columns, rowHeight, rows, onVisibleRegionChanged, freezeColumns, smoothScrollX, smoothScrollY]);

    const onScrollUpdate = React.useCallback(
        (args: Rectangle & { paddingRight: number }) => {
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
            kineticScrollPerfHack={experimental?.kineticScrollPerfHack}
            preventDiagonalScrolling={preventDiagonalScrolling}
            draggable={isDraggable === true || typeof isDraggable === "string"}
            scrollWidth={width + (paddingRight ?? 0)}
            scrollHeight={height + (paddingBottom ?? 0)}
            clientHeight={clientHeight}
            rightElement={rightElement}
            paddingBottom={paddingBottom}
            paddingRight={paddingRight}
            rightElementProps={rightElementProps}
            update={onScrollUpdate}
            initialSize={initialSize}>
            <DataGridDnd
                eventTargetRef={scrollRef}
                width={clientWidth}
                height={clientHeight}
                accessibilityHeight={p.accessibilityHeight}
                canvasRef={p.canvasRef}
                cellXOffset={p.cellXOffset}
                cellYOffset={p.cellYOffset}
                columns={p.columns}
                disabledRows={p.disabledRows}
                enableGroups={p.enableGroups}
                fillHandle={p.fillHandle}
                firstColAccessible={p.firstColAccessible}
                fixedShadowX={p.fixedShadowX}
                fixedShadowY={p.fixedShadowY}
                freezeColumns={p.freezeColumns}
                getCellContent={p.getCellContent}
                getCellRenderer={p.getCellRenderer}
                getGroupDetails={p.getGroupDetails}
                getRowThemeOverride={p.getRowThemeOverride}
                groupHeaderHeight={p.groupHeaderHeight}
                headerHeight={p.headerHeight}
                highlightRegions={p.highlightRegions}
                imageWindowLoader={p.imageWindowLoader}
                isFilling={p.isFilling}
                isFocused={p.isFocused}
                lockColumns={p.lockColumns}
                maxColumnWidth={p.maxColumnWidth}
                minColumnWidth={p.minColumnWidth}
                onHeaderMenuClick={p.onHeaderMenuClick}
                onMouseMove={p.onMouseMove}
                prelightCells={p.prelightCells}
                rowHeight={p.rowHeight}
                rows={p.rows}
                selection={p.selection}
                theme={p.theme}
                trailingRowType={p.trailingRowType}
                translateX={p.translateX}
                translateY={p.translateY}
                verticalBorder={p.verticalBorder}
                drawFocusRing={p.drawFocusRing}
                drawHeader={p.drawHeader}
                drawCell={p.drawCell}
                experimental={p.experimental}
                gridRef={p.gridRef}
                headerIcons={p.headerIcons}
                isDraggable={p.isDraggable}
                onCanvasBlur={p.onCanvasBlur}
                onCanvasFocused={p.onCanvasFocused}
                onCellFocused={p.onCellFocused}
                onColumnMoved={p.onColumnMoved}
                onColumnResize={p.onColumnResize}
                onColumnResizeEnd={p.onColumnResizeEnd}
                onColumnResizeStart={p.onColumnResizeStart}
                onContextMenu={p.onContextMenu}
                onDragEnd={p.onDragEnd}
                onDragLeave={p.onDragLeave}
                onDragOverCell={p.onDragOverCell}
                onDragStart={p.onDragStart}
                onDrop={p.onDrop}
                onItemHovered={p.onItemHovered}
                onKeyDown={p.onKeyDown}
                onKeyUp={p.onKeyUp}
                onMouseDown={p.onMouseDown}
                onMouseUp={p.onMouseUp}
                onRowMoved={p.onRowMoved}
                smoothScrollX={p.smoothScrollX}
                smoothScrollY={p.smoothScrollY}
            />
        </InfiniteScroller>
    );
};

export default GridScroller;
