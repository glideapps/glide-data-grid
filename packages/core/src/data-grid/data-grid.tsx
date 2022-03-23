import * as React from "react";
import { Theme } from "../common/styles";
import { useTheme } from "styled-components";
import ImageWindowLoader from "../common/image-window-loader";
import {
    computeBounds,
    getColumnIndexForX,
    getEffectiveColumns,
    getRowIndexForY,
    getStickyWidth,
    isGroupEqual,
    useMappedColumns,
} from "./data-grid-lib";
import {
    GridCellKind,
    Rectangle,
    GridSelection,
    GridMouseEventArgs,
    GridDragEventArgs,
    GridKeyEventArgs,
    InnerGridCell,
    InnerGridCellKind,
    CompactSelection,
    DrawCustomCellCallback,
    CellList,
    Item,
    DrawHeaderCallback,
    SizedGridColumn,
} from "./data-grid-types";
import { SpriteManager, SpriteMap } from "./data-grid-sprites";
import { useDebouncedMemo, useEventListener } from "../common/utils";
import makeRange from "lodash/range";
import {
    drawCell,
    drawGrid,
    getActionBoundsForGroup,
    getHeaderMenuBounds,
    GetRowThemeCallback,
    GroupDetailsCallback,
    Highlight,
    pointInRect,
} from "./data-grid-render";
import { AnimationManager, StepCallback } from "./animation-manager";
import { browserIsFirefox } from "../common/browser-detect";
import { CellRenderers } from "./cells";
import { useAnimationQueue } from "./use-animation-queue";

export interface DataGridProps {
    readonly width: number;
    readonly height: number;

    readonly cellXOffset: number;
    readonly cellYOffset: number;

    readonly translateX?: number;
    readonly translateY?: number;

    readonly accessibilityHeight: number;

    readonly freezeColumns: number;
    readonly lastRowSticky: boolean;
    readonly firstColAccessible: boolean;
    readonly allowResize?: boolean;
    readonly isResizing: boolean;
    readonly isDragging: boolean;

    readonly columns: readonly SizedGridColumn[];
    readonly rows: number;

    readonly headerHeight: number;
    readonly groupHeaderHeight: number;
    readonly enableGroups: boolean;
    readonly rowHeight: number | ((index: number) => number);

    readonly canvasRef?: React.MutableRefObject<HTMLCanvasElement | null>;

    readonly eventTargetRef?: React.MutableRefObject<HTMLDivElement | null>;

    readonly className?: string;

    readonly getCellContent: (cell: readonly [number, number]) => InnerGridCell;
    readonly getGroupDetails?: GroupDetailsCallback;
    readonly getRowThemeOverride?: GetRowThemeCallback;
    readonly onHeaderMenuClick?: (col: number, screenPosition: Rectangle) => void;

    readonly selection: GridSelection;
    readonly prelightCells?: readonly (readonly [number, number])[];
    readonly highlightRegions?: readonly Highlight[];

    readonly disabledRows?: CompactSelection;

    readonly onItemHovered?: (args: GridMouseEventArgs) => void;
    readonly onMouseMove: (args: GridMouseEventArgs) => void;
    readonly onMouseDown?: (args: GridMouseEventArgs) => void;
    readonly onMouseUp?: (args: GridMouseEventArgs, isOutside: boolean) => void;

    readonly onCellFocused?: (args: readonly [number, number]) => void;

    readonly onMouseMoveRaw?: (event: MouseEvent) => void;

    readonly onKeyDown?: (event: GridKeyEventArgs) => void;
    readonly onKeyUp?: (event: GridKeyEventArgs) => void;

    readonly verticalBorder: (col: number) => boolean;

    readonly isDraggable?: boolean;
    readonly onDragStart?: (args: GridDragEventArgs) => void;

    readonly drawCustomCell?: DrawCustomCellCallback;
    readonly drawHeader?: DrawHeaderCallback;

    readonly dragAndDropState?: {
        src: number;
        dest: number;
    };

    readonly experimental?: {
        readonly paddingRight?: number;
        readonly paddingBottom?: number;
        readonly enableFirefoxRescaling?: boolean;
        readonly isSubGrid?: boolean;
        readonly strict?: boolean;
    };

    readonly headerIcons?: SpriteMap;
}

interface BlitData {
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number;
    readonly translateY: number;
}

type DamageUpdateList = readonly {
    cell: readonly [number, number];
    // newValue: GridCell,
}[];

export interface DataGridRef {
    focus: () => void;
    getBounds: (col: number, row?: number) => Rectangle | undefined;
    damage: (cells: DamageUpdateList) => void;
}

const DataGrid: React.ForwardRefRenderFunction<DataGridRef, DataGridProps> = (p, forwardedRef) => {
    const {
        width,
        height,
        accessibilityHeight,
        className,
        columns,
        cellXOffset: cellXOffsetReal,
        cellYOffset,
        headerHeight,
        groupHeaderHeight,
        rowHeight,
        rows,
        getCellContent,
        getRowThemeOverride,
        onHeaderMenuClick,
        enableGroups,
        selection,
        freezeColumns,
        lastRowSticky,
        onMouseDown,
        onMouseUp,
        onMouseMoveRaw,
        onMouseMove,
        onItemHovered,
        dragAndDropState,
        firstColAccessible,
        onKeyDown,
        onKeyUp,
        highlightRegions,
        canvasRef,
        onDragStart,
        eventTargetRef,
        isResizing,
        isDragging,
        isDraggable = false,
        allowResize,
        disabledRows,
        getGroupDetails,
        prelightCells,
        headerIcons,
        verticalBorder,
        drawHeader,
        drawCustomCell,
        onCellFocused,
    } = p;
    const translateX = p.translateX ?? 0;
    const translateY = p.translateY ?? 0;
    const cellXOffset = Math.max(freezeColumns, Math.min(columns.length - 1, cellXOffsetReal));

    const theme = useTheme() as Theme;
    const ref = React.useRef<HTMLCanvasElement | null>(null);
    const imageLoader = React.useMemo<ImageWindowLoader>(() => new ImageWindowLoader(), []);
    const canBlit = React.useRef<boolean>();
    const damageRegion = React.useRef<readonly Item[] | undefined>(undefined);
    const [scrolling, setScrolling] = React.useState<boolean>(false);
    const hoverValues = React.useRef<readonly { item: Item; hoverAmount: number }[]>([]);
    const lastBlitData = React.useRef<BlitData>({ cellXOffset, cellYOffset, translateX, translateY });
    const [hoveredItemInfo, setHoveredItemInfo] = React.useState<[Item, readonly [number, number]] | undefined>();
    const [hoveredOnEdge, setHoveredOnEdge] = React.useState<boolean>();
    const overlayRef = React.useRef<HTMLCanvasElement | null>(null);

    const [lastWasTouch, setLastWasTouch] = React.useState(false);
    const lastWasTouchRef = React.useRef(lastWasTouch);
    lastWasTouchRef.current = lastWasTouch;

    const spriteManager = React.useMemo(() => new SpriteManager(headerIcons), [headerIcons]);
    const totalHeaderHeight = enableGroups ? groupHeaderHeight + headerHeight : headerHeight;

    const scrollingStopRef = React.useRef(-1);
    const disableFirefoxRescaling = p.experimental?.enableFirefoxRescaling !== true;
    React.useLayoutEffect(() => {
        if (!browserIsFirefox || window.devicePixelRatio === 1 || disableFirefoxRescaling) return;
        // We don't want to go into scroll mode for a single repaint
        if (scrollingStopRef.current !== -1) {
            setScrolling(true);
        }
        window.clearTimeout(scrollingStopRef.current);
        scrollingStopRef.current = window.setTimeout(() => {
            setScrolling(false);
            scrollingStopRef.current = -1;
        }, 200);
    }, [cellYOffset, cellXOffset, translateX, translateY, disableFirefoxRescaling]);

    React.useLayoutEffect(() => {
        const fn = async () => {
            const changed = await spriteManager.buildSpriteMap(theme, columns);
            if (changed) {
                lastDrawRef.current();
            }
        };
        void fn();
    }, [columns, spriteManager, theme]);

    const mappedColumns = useMappedColumns(columns, freezeColumns);

    // row: -1 === columnHeader, -2 === groupHeader
    const getBoundsForItem = React.useCallback(
        (canvas: HTMLCanvasElement, col: number, row: number): Rectangle => {
            const rect = canvas.getBoundingClientRect();

            const result = computeBounds(
                col,
                row,
                width,
                height,
                groupHeaderHeight,
                totalHeaderHeight,
                cellXOffset,
                cellYOffset,
                translateX,
                translateY,
                rows,
                freezeColumns,
                lastRowSticky,
                mappedColumns,
                rowHeight
            );

            result.x += rect.x;
            result.y += rect.y;

            return result;
        },
        [
            width,
            height,
            groupHeaderHeight,
            totalHeaderHeight,
            cellXOffset,
            cellYOffset,
            translateX,
            translateY,
            rows,
            freezeColumns,
            lastRowSticky,
            mappedColumns,
            rowHeight,
        ]
    );

    const getMouseArgsForPosition = React.useCallback(
        (canvas: HTMLCanvasElement, posX: number, posY: number, ev?: MouseEvent | TouchEvent): GridMouseEventArgs => {
            const rect = canvas.getBoundingClientRect();
            const x = posX - rect.left;
            const y = posY - rect.top;
            const edgeDetectionBuffer = 5;

            const effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, undefined, translateX);

            let button = 0;
            if (ev instanceof MouseEvent) {
                button = ev.button;
            }

            // -1 === off right edge
            const col = getColumnIndexForX(x, effectiveCols, translateX);

            // -1: header or above
            // undefined: offbottom
            const row = getRowIndexForY(
                y,
                height,
                enableGroups,
                headerHeight,
                groupHeaderHeight,
                rows,
                rowHeight,
                cellYOffset,
                translateY,
                lastRowSticky
            );

            const shiftKey = ev?.shiftKey === true;
            const ctrlKey = ev?.ctrlKey === true;
            const metaKey = ev?.metaKey === true;
            const isTouch = ev !== undefined && !(ev instanceof MouseEvent);

            let result: GridMouseEventArgs;
            if (col === -1 || y < 0 || x < 0 || row === undefined || x > width || y > height) {
                const horizontal = x > width ? -1 : x < 0 ? 1 : 0;
                const vertical = y > height ? 1 : y < 0 ? -1 : 0;

                let isEdge = false;
                if (col === -1 && row === -1) {
                    const b = getBoundsForItem(canvas, mappedColumns.length - 1, -1);
                    isEdge = posX < b.x + b.width + edgeDetectionBuffer;
                }

                result = {
                    kind: "out-of-bounds",
                    location: [col !== -1 ? col : x < 0 ? 0 : mappedColumns.length - 1, row ?? rows - 1],
                    direction: [horizontal, vertical],
                    shiftKey,
                    ctrlKey,
                    metaKey,
                    isEdge,
                    isTouch,
                    button,
                };
            } else if (row <= -1) {
                let bounds = getBoundsForItem(canvas, col, row);
                let isEdge = bounds !== undefined && bounds.x + bounds.width - posX <= edgeDetectionBuffer;

                const previousCol = col - 1;
                if (posX - bounds.x <= edgeDetectionBuffer && previousCol >= 0) {
                    isEdge = true;
                    bounds = getBoundsForItem(canvas, previousCol, row);
                    result = {
                        kind: enableGroups && row === -2 ? "group-header" : "header",
                        location: [previousCol, row] as any,
                        bounds: bounds,
                        group: mappedColumns[previousCol].group ?? "",
                        isEdge,
                        shiftKey,
                        ctrlKey,
                        metaKey,
                        isTouch,
                        localEventX: posX - bounds.x,
                        localEventY: posY - bounds.y,
                        button,
                    };
                } else {
                    result = {
                        kind: enableGroups && row === -2 ? "group-header" : "header",
                        group: mappedColumns[col].group ?? "",
                        location: [col, row] as any,
                        bounds: bounds,
                        isEdge,
                        shiftKey,
                        ctrlKey,
                        metaKey,
                        isTouch,
                        localEventX: posX - bounds.x,
                        localEventY: posY - bounds.y,
                        button,
                    };
                }
            } else {
                const bounds = getBoundsForItem(canvas, col, row);
                const isEdge = bounds !== undefined && bounds.x + bounds.width - posX < edgeDetectionBuffer;
                result = {
                    kind: "cell",
                    location: [col, row],
                    bounds: bounds,
                    isEdge,
                    shiftKey,
                    ctrlKey,
                    metaKey,
                    isTouch,
                    localEventX: posX - bounds.x,
                    localEventY: posY - bounds.y,
                    button,
                };
            }
            return result;
        },
        [
            mappedColumns,
            cellXOffset,
            width,
            translateX,
            height,
            enableGroups,
            headerHeight,
            groupHeaderHeight,
            rows,
            rowHeight,
            cellYOffset,
            translateY,
            lastRowSticky,
            getBoundsForItem,
        ]
    );

    function isSameItem(item: GridMouseEventArgs | undefined, other: GridMouseEventArgs | undefined) {
        if (item === other) return true;
        return (
            item?.kind === other?.kind &&
            item?.location[0] === other?.location[0] &&
            item?.location[1] === other?.location[1]
        );
    }

    const [hoveredItem] = hoveredItemInfo ?? [];

    const enqueueRef = React.useRef((_item: Item) => {
        // do nothing
    });
    const hoverInfoRef = React.useRef(hoveredItemInfo);
    hoverInfoRef.current = hoveredItemInfo;
    const draw = React.useCallback(() => {
        const canvas = ref.current;
        const overlay = overlayRef.current;
        if (canvas === null || overlay === null) return;

        drawGrid(
            canvas,
            {
                overlay,
            },
            width,
            height,
            cellXOffset,
            cellYOffset,
            Math.round(translateX),
            Math.round(translateY),
            columns,
            mappedColumns,
            enableGroups,
            freezeColumns,
            dragAndDropState,
            theme,
            headerHeight,
            groupHeaderHeight,
            selection.rows,
            disabledRows ?? CompactSelection.empty(),
            rowHeight,
            verticalBorder,
            selection.columns,
            isResizing,
            selection,
            lastRowSticky,
            rows,
            getCellContent,
            getGroupDetails ?? (name => ({ name })),
            getRowThemeOverride,
            drawCustomCell,
            drawHeader,
            prelightCells,
            highlightRegions,
            imageLoader,
            lastBlitData,
            canBlit.current ?? false,
            damageRegion.current,
            hoverValues.current,
            hoverInfoRef.current,
            spriteManager,
            scrolling,
            lastWasTouch,
            enqueueRef.current
        );
    }, [
        width,
        height,
        cellXOffset,
        cellYOffset,
        translateX,
        translateY,
        columns,
        mappedColumns,
        enableGroups,
        freezeColumns,
        dragAndDropState,
        theme,
        headerHeight,
        groupHeaderHeight,
        selection,
        disabledRows,
        rowHeight,
        verticalBorder,
        isResizing,
        lastRowSticky,
        rows,
        getCellContent,
        getGroupDetails,
        getRowThemeOverride,
        drawCustomCell,
        drawHeader,
        prelightCells,
        highlightRegions,
        imageLoader,
        spriteManager,
        scrolling,
        lastWasTouch,
    ]);

    canBlit.current = canBlit.current !== undefined;
    React.useLayoutEffect(() => {
        canBlit.current = false;
    }, [
        width,
        height,
        columns,
        theme,
        headerHeight,
        rowHeight,
        rows,
        isResizing,
        verticalBorder,
        getCellContent,
        lastWasTouch,
        selection,
        dragAndDropState,
        prelightCells,
        scrolling,
    ]);

    const lastDrawRef = React.useRef(draw);
    React.useLayoutEffect(() => {
        draw();
        lastDrawRef.current = draw;
    }, [draw]);

    React.useLayoutEffect(() => {
        const fn = async () => {
            if (document?.fonts?.ready === undefined) return;
            await document.fonts.ready;
            const prev = canBlit.current;
            canBlit.current = false;
            lastDrawRef.current();
            canBlit.current = prev;
        };
        void fn();
    }, []);

    const damageInternal = React.useCallback((locations: CellList) => {
        const last = canBlit.current;
        canBlit.current = false;
        damageRegion.current = locations;
        lastDrawRef.current();
        damageRegion.current = undefined;
        canBlit.current = last;
    }, []);

    const enqueue = useAnimationQueue(damageInternal);
    enqueueRef.current = enqueue;

    const damage = React.useCallback(
        (cells: DamageUpdateList) => {
            damageInternal(cells.map(x => x.cell));
        },
        [damageInternal]
    );

    imageLoader.setCallback(damageInternal);

    const [hCol, hRow] = hoveredItem ?? [];
    const headerHovered = hCol !== undefined && hRow === -1;
    const groupHeaderHovered = hCol !== undefined && hRow === -2;
    let clickableInnerCellHovered = false;
    let editableBoolHovered = false;
    if (hCol !== undefined && hRow !== undefined && hRow > 0) {
        const cell = getCellContent([hCol, hRow]);
        clickableInnerCellHovered =
            cell.kind === InnerGridCellKind.NewRow ||
            (cell.kind === InnerGridCellKind.Marker && cell.markerKind !== "number");
        editableBoolHovered = cell.kind === GridCellKind.Boolean && cell.allowEdit === true;
    }
    const canDrag = hoveredOnEdge ?? false;
    const cursor = isDragging
        ? "grabbing"
        : canDrag || isResizing
        ? "col-resize"
        : headerHovered || clickableInnerCellHovered || editableBoolHovered || groupHeaderHovered
        ? "pointer"
        : "default";
    const style = React.useMemo(
        () => ({
            // width,
            // height,
            contain: "strict",
            display: "block",
            cursor,
        }),
        [cursor]
    );

    const target = eventTargetRef?.current;
    if (target !== null && target !== undefined) {
        // because we have an event target we need to set its cursor instead.
        target.style.cursor = style.cursor;
    }

    const groupHeaderActionForEvent = React.useCallback(
        (group: string, bounds: Rectangle, localEventX: number, localEventY: number) => {
            if (getGroupDetails === undefined) return undefined;
            const groupDesc = getGroupDetails(group);
            if (groupDesc.actions !== undefined) {
                const boxes = getActionBoundsForGroup(bounds, groupDesc.actions);
                for (let i = 0; i < boxes.length; i++) {
                    const box = boxes[i];
                    if (pointInRect(box, localEventX + bounds.x, localEventY + box.y)) {
                        return groupDesc.actions[i];
                    }
                }
            }
            return undefined;
        },
        [getGroupDetails]
    );

    const isOverHeaderMenu = React.useCallback(
        (canvas: HTMLCanvasElement, col: number, clientX: number, clientY: number) => {
            const header = columns[col];

            if (!isDragging && !isResizing && header.hasMenu === true && !(hoveredOnEdge ?? false)) {
                const headerBounds = getBoundsForItem(canvas, col, -1);
                const menuBounds = getHeaderMenuBounds(
                    headerBounds.x,
                    headerBounds.y,
                    headerBounds.width,
                    headerBounds.height
                );
                if (
                    clientX > menuBounds.x &&
                    clientX < menuBounds.x + menuBounds.width &&
                    clientY > menuBounds.y &&
                    clientY < menuBounds.y + menuBounds.height
                ) {
                    return headerBounds;
                }
            }
            return undefined;
        },
        [columns, getBoundsForItem, hoveredOnEdge, isDragging, isResizing]
    );

    const downTime = React.useRef(0);
    const onMouseDownImpl = React.useCallback(
        (ev: MouseEvent | TouchEvent) => {
            const canvas = ref.current;
            const eventTarget = eventTargetRef?.current;
            if (canvas === null || (ev.target !== canvas && ev.target !== eventTarget)) return;

            let clientX: number;
            let clientY: number;
            if (ev instanceof MouseEvent) {
                clientX = ev.clientX;
                clientY = ev.clientY;
            } else {
                clientX = ev.touches[0].clientX;
                clientY = ev.touches[0].clientY;
            }
            if (ev.target === eventTarget && eventTarget !== null) {
                const bounds = eventTarget.getBoundingClientRect();
                if (clientX > bounds.left + eventTarget.clientWidth) return;
                if (clientY > bounds.top + eventTarget.clientHeight) return;
            }

            const args = getMouseArgsForPosition(canvas, clientX, clientY, ev);

            if (args.isTouch) {
                downTime.current = Date.now();
            }
            if (lastWasTouchRef.current !== args.isTouch) {
                setLastWasTouch(args.isTouch);
            }

            if (args.kind === "header" && isOverHeaderMenu(canvas, args.location[0], clientX, clientY) !== undefined) {
                return;
            } else if (args.kind === "group-header") {
                const action = groupHeaderActionForEvent(args.group, args.bounds, args.localEventX, args.localEventY);
                if (action !== undefined) {
                    return;
                }
            }

            onMouseDown?.(args);
            if (!args.isTouch) {
                // preventing default in touch events stops scroll
                ev.preventDefault();
            }
        },
        [eventTargetRef, getMouseArgsForPosition, groupHeaderActionForEvent, isOverHeaderMenu, onMouseDown]
    );
    useEventListener("touchstart", onMouseDownImpl, window, false);
    useEventListener("mousedown", onMouseDownImpl, window, false);

    const onMouseUpImpl = React.useCallback(
        (ev: MouseEvent | TouchEvent) => {
            const canvas = ref.current;
            if (onMouseUp === undefined || canvas === null) return;
            const eventTarget = eventTargetRef?.current;

            const isOutside = ev.target !== canvas && ev.target !== eventTarget;

            let clientX: number;
            let clientY: number;
            if (ev instanceof MouseEvent) {
                clientX = ev.clientX;
                clientY = ev.clientY;
            } else {
                clientX = ev.changedTouches[0].clientX;
                clientY = ev.changedTouches[0].clientY;
            }

            let args = getMouseArgsForPosition(canvas, clientX, clientY, ev);

            if (args.isTouch && downTime.current !== 0 && Date.now() - downTime.current > 500) {
                args = {
                    ...args,
                    isLongTouch: true,
                };
            }

            if (lastWasTouchRef.current !== args.isTouch) {
                setLastWasTouch(args.isTouch);
            }

            if (!isOutside && ev.cancelable) {
                ev.preventDefault();
            }

            if (args.kind === "header" && isOverHeaderMenu(canvas, args.location[0], clientX, clientY)) {
                const [col] = args.location;
                const headerBounds = isOverHeaderMenu(canvas, col, clientX, clientY);
                if (headerBounds !== undefined) {
                    if (args.button === 0) {
                        onHeaderMenuClick?.(col, headerBounds);
                    }
                    return;
                }
            } else if (args.kind === "group-header") {
                const action = groupHeaderActionForEvent(args.group, args.bounds, args.localEventX, args.localEventY);
                if (action !== undefined) {
                    if (args.button === 0) {
                        action.onClick(args);
                    }
                    return;
                }
            }

            onMouseUp(args, isOutside);
        },
        [
            onMouseUp,
            eventTargetRef,
            getMouseArgsForPosition,
            isOverHeaderMenu,
            onHeaderMenuClick,
            groupHeaderActionForEvent,
        ]
    );
    useEventListener("mouseup", onMouseUpImpl, window, false);
    useEventListener("touchend", onMouseUpImpl, window, false);

    const onAnimationFrame = React.useCallback<StepCallback>(values => {
        const last = canBlit.current;
        canBlit.current = false;
        damageRegion.current = values.map(x => x.item);
        hoverValues.current = values;
        lastDrawRef.current();
        damageRegion.current = undefined;
        canBlit.current = last;
    }, []);

    const animManagerValue = React.useMemo(() => new AnimationManager(onAnimationFrame), [onAnimationFrame]);
    const animationManager = React.useRef(animManagerValue);
    animationManager.current = animManagerValue;
    React.useLayoutEffect(() => {
        const am = animationManager.current;
        if (hoveredItem === undefined || hoveredItem[1] < 0) {
            am.setHovered(hoveredItem);
            return;
        }
        const cell = getCellContent(hoveredItem as [number, number]);
        am.setHovered(
            cell.kind === GridCellKind.Custom || CellRenderers[cell.kind].needsHover ? hoveredItem : undefined
        );
    }, [getCellContent, hoveredItem]);

    const hoveredRef = React.useRef<GridMouseEventArgs>();
    const onMouseMoveImpl = React.useCallback(
        (ev: MouseEvent) => {
            const canvas = ref.current;
            if (canvas === null) return;

            const args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);
            if (!isSameItem(args, hoveredRef.current)) {
                onItemHovered?.(args);
                setHoveredItemInfo(
                    args.kind === "out-of-bounds" ? undefined : [args.location, [args.localEventX, args.localEventY]]
                );
                hoveredRef.current = args;
            } else if (args.kind === "cell" || args.kind === "header" || args.kind === "group-header") {
                const newInfo: typeof hoverInfoRef.current = [args.location, [args.localEventX, args.localEventY]];
                setHoveredItemInfo(newInfo);
                hoverInfoRef.current = newInfo;

                if (args.kind === "cell") {
                    const toCheck = getCellContent(args.location);
                    if (toCheck.kind === GridCellKind.Custom || CellRenderers[toCheck.kind].needsHoverPosition) {
                        damageInternal([args.location]);
                    }
                } else if (args.kind === "group-header") {
                    damageInternal([args.location]);
                }
            }

            setHoveredOnEdge(args.kind === "header" && args.isEdge && allowResize === true);

            onMouseMoveRaw?.(ev);
            onMouseMove(args);
        },
        [
            getMouseArgsForPosition,
            allowResize,
            onMouseMoveRaw,
            onMouseMove,
            onItemHovered,
            getCellContent,
            damageInternal,
        ]
    );
    useEventListener("mousemove", onMouseMoveImpl, window, true);

    const onKeyDownImpl = React.useCallback(
        (event: React.KeyboardEvent<HTMLCanvasElement>) => {
            const canvas = ref.current;
            if (canvas === null) return;

            let bounds: Rectangle | undefined;
            if (selection.current !== undefined) {
                bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
            }

            onKeyDown?.({
                bounds,
                cancel: () => {
                    event.stopPropagation();
                    event.preventDefault();
                },
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
                shiftKey: event.shiftKey,
                altKey: event.altKey,
                key: event.key,
                keyCode: event.keyCode,
            });
        },
        [onKeyDown, selection, getBoundsForItem]
    );

    const onKeyUpImpl = React.useCallback(
        (event: React.KeyboardEvent<HTMLCanvasElement>) => {
            const canvas = ref.current;
            if (canvas === null) return;

            let bounds: Rectangle | undefined;
            if (selection.current !== undefined) {
                bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
            }

            onKeyUp?.({
                bounds,
                cancel: () => {
                    event.stopPropagation();
                    event.preventDefault();
                },
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
                shiftKey: event.shiftKey,
                altKey: event.altKey,
                key: event.key,
                keyCode: event.keyCode,
            });
        },
        [onKeyUp, selection, getBoundsForItem]
    );

    const refImpl = React.useCallback(
        (instance: HTMLCanvasElement | null) => {
            ref.current = instance;
            if (canvasRef !== undefined) {
                canvasRef.current = instance;
            }
        },
        [canvasRef]
    );

    const onDragStartImpl = React.useCallback(
        (event: DragEvent) => {
            const canvas = ref.current;
            if (canvas === null || !isDraggable) return false;

            let dragMime: string | undefined;
            let dragData: string | undefined;

            const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);

            const setData = (mime: string, payload: string) => {
                dragMime = mime;
                dragData = payload;
            };

            let dragImage: Element | undefined;
            let dragImageX: number | undefined;
            let dragImageY: number | undefined;
            const setDragImage = (image: Element, x: number, y: number) => {
                dragImage = image;
                dragImageX = x;
                dragImageY = y;
            };

            onDragStart?.({
                ...args,
                setData,
                setDragImage,
            });
            if (dragMime !== undefined && dragData !== undefined && event.dataTransfer !== null) {
                event.dataTransfer.setData(dragMime, dragData);
                event.dataTransfer.effectAllowed = "link";

                if (dragImage !== undefined && dragImageX !== undefined && dragImageY !== undefined) {
                    event.dataTransfer.setDragImage(dragImage, dragImageX, dragImageY);
                } else {
                    const [col, row] = args.location;
                    if (row !== undefined) {
                        const offscreen = document.createElement("canvas");
                        const boundsForDragTarget = getBoundsForItem(canvas, col, row);

                        offscreen.width = boundsForDragTarget.width;
                        offscreen.height = boundsForDragTarget.height;

                        const ctx = offscreen.getContext("2d");
                        if (ctx !== null) {
                            ctx.fillStyle = theme.bgCell;
                            ctx.fillRect(0, 0, offscreen.width, offscreen.height);
                            drawCell(
                                ctx,
                                row,
                                getCellContent([col, row]),
                                0,
                                0,
                                0,
                                boundsForDragTarget.width,
                                boundsForDragTarget.height,
                                false,
                                theme,
                                drawCustomCell,
                                imageLoader,
                                spriteManager,
                                1,
                                undefined,
                                0
                            );
                        }

                        offscreen.style.left = "-100%";
                        offscreen.style.position = "absolute";

                        document.body.appendChild(offscreen);

                        event.dataTransfer.setDragImage(
                            offscreen,
                            boundsForDragTarget.width / 2,
                            boundsForDragTarget.height / 2
                        );

                        window.setTimeout(() => {
                            document.body.removeChild(offscreen);
                        }, 0);
                    }
                }
            } else {
                event.preventDefault();
            }
        },
        [
            isDraggable,
            getMouseArgsForPosition,
            onDragStart,
            getBoundsForItem,
            theme,
            getCellContent,
            drawCustomCell,
            imageLoader,
            spriteManager,
        ]
    );
    useEventListener("dragstart", onDragStartImpl, eventTargetRef?.current ?? null, false, false);

    const focusRef = React.useRef<HTMLElement | null>(null);
    const focusElement = React.useCallback(
        (el: HTMLElement | null) => {
            // We don't want to steal the focus if we don't currently own the focus.
            if (ref.current === null || !ref.current.contains(document.activeElement)) return;
            if (el === null) {
                canvasRef?.current?.focus({
                    preventScroll: true,
                });
            } else {
                el.focus({
                    preventScroll: true,
                });
            }
            focusRef.current = el;
        },
        [canvasRef]
    );

    React.useImperativeHandle(
        forwardedRef,
        () => ({
            focus: () => {
                const el = focusRef.current;
                // The element in the ref may have been removed however our callback method ref
                // won't see the removal so bad things happen. Checking to see if the element is
                // no longer attached is enough to resolve the problem. In the future this
                // should be replaced with something much more robust.
                if (el === null || !document.contains(el)) {
                    canvasRef?.current?.focus({
                        preventScroll: true,
                    });
                } else {
                    el.focus({
                        preventScroll: true,
                    });
                }
            },
            getBounds: (col: number, row?: number) => {
                if (canvasRef === undefined || canvasRef.current === null) {
                    return undefined;
                }

                return getBoundsForItem(canvasRef.current, col, row ?? -1);
            },
            damage,
        }),
        [canvasRef, damage, getBoundsForItem]
    );

    const accessibilityTree = useDebouncedMemo(
        () => {
            if (width < 50) return null;
            let effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
            const colOffset = firstColAccessible ? 0 : -1;
            if (!firstColAccessible && effectiveCols[0]?.sourceIndex === 0) {
                effectiveCols = effectiveCols.slice(1);
            }

            const getRowData = (cell: InnerGridCell) => {
                if (cell.kind === GridCellKind.Custom) {
                    return cell.copyData;
                } else {
                    return CellRenderers[cell.kind].getAccessibilityString(cell);
                }
            };
            const [fCol, fRow] = selection.current?.cell ?? [];
            const range = selection.current?.range;

            return (
                <table
                    key="access-tree"
                    role="grid"
                    aria-rowcount={rows + 1}
                    aria-multiselectable="true"
                    aria-colcount={mappedColumns.length + colOffset}>
                    <thead role="rowgroup">
                        <tr role="row" aria-rowindex={1} row-index={1}>
                            {effectiveCols.map(c => (
                                <th
                                    role="columnheader"
                                    aria-colindex={c.sourceIndex + 1 + colOffset}
                                    key={c.sourceIndex}>
                                    {c.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody role="rowgroup">
                        {makeRange(cellYOffset, Math.min(rows, cellYOffset + accessibilityHeight)).map(row => (
                            <tr role="row" key={row} aria-rowindex={row + 2} row-index={row + 2}>
                                {effectiveCols.map(c => {
                                    const col = c.sourceIndex;
                                    const key = `${col},${row}`;
                                    const focused = fCol === col && fRow === row;
                                    const selected =
                                        range !== undefined &&
                                        col >= range.x &&
                                        col < range.x + range.width &&
                                        row >= range.y &&
                                        row < range.y + range.height;
                                    const id = `glide-cell-${col}-${row}`;
                                    return (
                                        <td
                                            key={key}
                                            role="gridcell"
                                            aria-colindex={col + 1 + colOffset}
                                            aria-selected={selected}
                                            id={id}
                                            data-testid={id}
                                            onClick={() => {
                                                const canvas = canvasRef?.current;
                                                if (canvas === null || canvas === undefined) return;
                                                return onKeyDown?.({
                                                    bounds: getBoundsForItem(canvas, col, row),
                                                    cancel: () => undefined,
                                                    ctrlKey: false,
                                                    key: "Enter",
                                                    keyCode: 13,
                                                    metaKey: false,
                                                    shiftKey: false,
                                                    altKey: false,
                                                });
                                            }}
                                            onFocusCapture={e => {
                                                if (e.target === focusRef.current) return;
                                                return onCellFocused?.([col, row]);
                                            }}
                                            ref={focused ? focusElement : undefined}
                                            tabIndex={-1}>
                                            {getRowData(getCellContent([col, row]))}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        },
        [
            width,
            mappedColumns,
            cellXOffset,
            dragAndDropState,
            translateX,
            rows,
            cellYOffset,
            accessibilityHeight,
            selection,
            focusElement,
            getCellContent,
            canvasRef,
            onKeyDown,
            getBoundsForItem,
            onCellFocused,
        ],
        200
    );

    const stickyShadow = React.useMemo(() => {
        if (!mappedColumns[0].sticky) {
            return null;
        }
        const stickyX = getStickyWidth(mappedColumns, dragAndDropState);
        const props: React.CSSProperties = {
            position: "absolute",
            top: 0,
            left: stickyX,
            width: width - stickyX,
            height: height,
            opacity: cellXOffset > freezeColumns || translateX !== 0 ? 1 : 0,
            pointerEvents: "none",
            boxShadow: "inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)",
            transition: "opacity 150ms",
        };
        return <div style={props} />;
    }, [cellXOffset, dragAndDropState, freezeColumns, mappedColumns, height, width, translateX]);

    const overlayStyle = React.useMemo<React.CSSProperties>(
        () => ({
            position: "absolute",
            top: 0,
            left: 0,
        }),
        []
    );

    return (
        <>
            <canvas
                data-testid="data-grid-canvas"
                tabIndex={0}
                onKeyDown={onKeyDownImpl}
                onKeyUp={onKeyUpImpl}
                className={className}
                ref={refImpl}
                style={style}>
                {accessibilityTree}
            </canvas>
            <canvas ref={overlayRef} style={overlayStyle} />
            {stickyShadow}
        </>
    );
};

export default React.memo(React.forwardRef(DataGrid));
