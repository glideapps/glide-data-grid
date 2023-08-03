import React from "react";
import { useEventListener } from "../common/utils";
import type { MappedGridColumn } from "../data-grid/data-grid-lib";
import type { DataGridProps } from "../data-grid/data-grid";
import type {
    DrawHeaderCallback,
    GridMouseEventArgs,
    ImageWindowLoader,
    Item,
    Rectangle,
} from "../data-grid/data-grid-types";
import type { SpriteManager } from "../data-grid/data-grid-sprites";
import { assert } from "../common/support";
import { drawCell, drawHeader } from "../data-grid/data-grid-render";
import { throttle } from "lodash";

const SCROLL_MOVEMENT = 100;
const SCROLL_LEFT_FREEZE_THRESHOLD = 50;
const SCROLL_RIGHT_THRESHOLD = 200;
const SCROLL_LEFT_THRESHOLD = 200;

interface IProps
    extends Pick<
        DataGridProps,
        | "lockColumns"
        | "isResizing"
        | "isDraggable"
        | "canvasRef"
        | "disabledDragColsAndRows"
        | "onDragEnd"
        | "onDragLeave"
        | "onDragOverCell"
        | "onDragStart"
        | "onDrop"
        | "theme"
        | "getCellContent"
        | "drawCustomCell"
        | "getCellRenderer"
        | "freezeColumns"
        | "firstColAccessible"
        | "width"
    > {
    readonly canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    readonly eventTargetRef: React.MutableRefObject<HTMLDivElement | null> | undefined;
    readonly getMouseArgsForPosition: (
        canvas: HTMLCanvasElement,
        posX: number,
        posY: number,
        ev?: MouseEvent | TouchEvent
    ) => GridMouseEventArgs;
    readonly getBoundsForItem: (canvas: HTMLCanvasElement, col: number, row: number) => Rectangle | undefined;
    readonly mappedColumns: readonly MappedGridColumn[];
    readonly spriteManager: SpriteManager;
    readonly drawHeaderCallback: DrawHeaderCallback | undefined;
    readonly imageLoader: ImageWindowLoader;
}

const useDragAndDrop = ({
    canvasRef,
    isDraggable,
    isResizing,
    getMouseArgsForPosition,
    disabledDragColsAndRows,
    lockColumns,
    onDragStart,
    getBoundsForItem,
    theme,
    mappedColumns,
    spriteManager,
    drawHeaderCallback,
    getCellContent,
    drawCustomCell,
    imageLoader,
    getCellRenderer,
    freezeColumns,
    firstColAccessible,
    onDragOverCell,
    onDrop,
    onDragEnd,
    onDragLeave,
    width,
    eventTargetRef,
}: IProps) => {
    const activeDropTarget = React.useRef<Item | undefined>();

    const onDragStartImpl = React.useCallback(
        (event: DragEvent) => {
            const canvas = canvasRef.current;
            if (canvas === null || isDraggable === false || isResizing) {
                event.preventDefault();
                return;
            }

            let dragMime: string | undefined = "text/plain";
            let dragData: string | undefined = "";

            const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);

            if (disabledDragColsAndRows?.cols?.includes(args.location[0] - lockColumns) === true) {
                event.preventDefault();
                return;
            }

            if (isDraggable !== true && args.kind !== isDraggable) {
                event.preventDefault();
                return;
            }

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

            let prevented = false;

            onDragStart?.({
                ...args,
                setData,
                setDragImage,
                preventDefault: () => (prevented = true),
                defaultPrevented: () => prevented,
            });
            if (!prevented && dragMime !== undefined && dragData !== undefined && event.dataTransfer !== null) {
                /**
                 * there is a but in chrome that set to cursor to grabbing don't affect the drag cursor
                 * https://bugs.chromium.org/p/chromium/issues/detail?id=1232555
                 */
                event.dataTransfer.effectAllowed = "copyLink";
                event.dataTransfer.setData(dragMime, dragData);

                if (dragImage !== undefined && dragImageX !== undefined && dragImageY !== undefined) {
                    event.dataTransfer.setDragImage(dragImage, dragImageX, dragImageY);
                } else {
                    const [col, row] = args.location;
                    if (row !== undefined) {
                        const offscreen = document.createElement("canvas");
                        const boundsForDragTarget = getBoundsForItem(canvas, col, row);

                        assert(boundsForDragTarget !== undefined);
                        offscreen.width = boundsForDragTarget.width;
                        offscreen.height = canvas.clientHeight;

                        const ratio = window.devicePixelRatio || 1;

                        offscreen.width = boundsForDragTarget.width * ratio;
                        offscreen.height = canvas.clientHeight * ratio;
                        offscreen.style.width = boundsForDragTarget.width + "px";
                        offscreen.style.height = canvas.clientHeight + "px";
                        const ctx = offscreen.getContext("2d");
                        ctx?.scale(ratio, ratio);

                        if (ctx !== null) {
                            ctx.textBaseline = "middle";
                            if (row === -1) {
                                ctx.font = `${theme.headerFontStyle} ${theme.fontFamily}`;
                                ctx.fillStyle = theme.bgHeader;
                                ctx.fillRect(0, 0, offscreen.width, canvas.clientHeight);
                                drawHeader(
                                    ctx,
                                    0,
                                    0,
                                    boundsForDragTarget.width,
                                    boundsForDragTarget.height,
                                    mappedColumns[col],
                                    false,
                                    theme,
                                    false,
                                    false,
                                    0,
                                    spriteManager,
                                    drawHeaderCallback,
                                    false
                                );
                            } else {
                                ctx.font = `${theme.baseFontStyle} ${theme.fontFamily}`;
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
                                    false,
                                    0,
                                    undefined,
                                    undefined,
                                    getCellRenderer
                                );
                            }
                        }

                        offscreen.style.left = "-100%";
                        offscreen.style.position = "absolute";

                        document.body.append(offscreen);

                        event.dataTransfer.setDragImage(
                            offscreen,
                            boundsForDragTarget.width / 2,
                            boundsForDragTarget.height / 2
                        );

                        window.setTimeout(() => {
                            offscreen.remove();
                        }, 0);
                    }
                }
            } else {
                event.preventDefault();
            }
        },
        [
            canvasRef,
            disabledDragColsAndRows?.cols,
            drawCustomCell,
            drawHeaderCallback,
            getBoundsForItem,
            getCellContent,
            getCellRenderer,
            getMouseArgsForPosition,
            imageLoader,
            isDraggable,
            isResizing,
            lockColumns,
            mappedColumns,
            onDragStart,
            spriteManager,
            theme,
        ]
    );

    const updateScrollPosition = React.useCallback(
        (position: number) => {
            eventTargetRef?.current?.scrollBy({
                left: SCROLL_MOVEMENT * position,
                top: 0,
                behavior: "smooth",
            });
        },
        [eventTargetRef]
    );

    const handleScrollThrottled = React.useMemo(
        () => throttle((position: number) => updateScrollPosition(position), 100),
        [updateScrollPosition]
    );

    const freezeColumnsWidth = React.useMemo(() => {
        let freezeColumnsWidthInPx = 0;
        for (let i = 0; i < freezeColumns; i++) {
            freezeColumnsWidthInPx += mappedColumns[i].width;
        }
        return freezeColumnsWidthInPx;
    }, [freezeColumns, mappedColumns]);

    const onDragOverImpl = React.useCallback(
        (event: DragEvent) => {
            const canvas = canvasRef.current;
            if (onDrop !== undefined) {
                // Need to preventDefault to allow drop
                event.preventDefault();
            }

            if (canvas === null || onDragOverCell === undefined) {
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const scale = rect.width / width;
            const mouseX = (event.clientX - rect.left) / scale;

            const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);

            const [rawCol, row] = args.location;
            const col = rawCol - (firstColAccessible ? 0 : 1);
            const [activeCol, activeRow] = activeDropTarget.current ?? [];

            if (activeCol !== col || activeRow !== row) {
                activeDropTarget.current = [col, row];
                onDragOverCell([col + lockColumns, row], event.dataTransfer);
            }

            if (mouseX + SCROLL_RIGHT_THRESHOLD > rect.width) {
                handleScrollThrottled(1);
            }

            if (
                freezeColumnsWidth
                    ? mouseX < freezeColumnsWidth + SCROLL_LEFT_FREEZE_THRESHOLD
                    : mouseX < SCROLL_LEFT_THRESHOLD
            ) {
                handleScrollThrottled(-1);
            }
        },
        [
            canvasRef,
            firstColAccessible,
            freezeColumnsWidth,
            getMouseArgsForPosition,
            lockColumns,
            onDragOverCell,
            onDrop,
            handleScrollThrottled,
            width,
        ]
    );

    const onDragEndImpl = React.useCallback(() => {
        activeDropTarget.current = undefined;
        onDragEnd?.();
    }, [onDragEnd]);

    const onDropImpl = React.useCallback(
        (event: DragEvent) => {
            const canvas = canvasRef.current;
            if (canvas === null || onDrop === undefined) {
                return;
            }

            // Default can mess up sometimes.
            event.preventDefault();

            const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);

            const [rawCol, row] = args.location;
            const col = rawCol - (firstColAccessible ? 0 : 1) + lockColumns;

            if (disabledDragColsAndRows?.cols?.includes(col) === true) {
                return;
            }

            onDrop([col, row], event.dataTransfer);
        },
        [canvasRef, disabledDragColsAndRows?.cols, firstColAccessible, getMouseArgsForPosition, lockColumns, onDrop]
    );

    const onDragLeaveImpl = React.useCallback(() => {
        onDragLeave?.();
    }, [onDragLeave]);

    useEventListener("dragstart", onDragStartImpl, eventTargetRef?.current ?? null, false, false);
    useEventListener("dragover", onDragOverImpl, eventTargetRef?.current ?? null, false, false);
    useEventListener("drop", onDropImpl, eventTargetRef?.current ?? null, false, false);
    useEventListener("dragend", onDragEndImpl, eventTargetRef?.current ?? null, false, false);
    useEventListener("dragleave", onDragLeaveImpl, eventTargetRef?.current ?? null, false, false);
};

export default useDragAndDrop;
