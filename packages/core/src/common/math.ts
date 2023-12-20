/* eslint-disable unicorn/prefer-ternary */
import { itemIsInRect } from "../internal/data-grid/data-grid-lib.js";
import type { FillHandleDirection, Rectangle } from "../internal/data-grid/data-grid-types.js";

export function getClosestRect(
    rect: Rectangle,
    px: number,
    py: number,
    allowedDirections: FillHandleDirection
): Rectangle | undefined {
    if (allowedDirections === "any") return combineRects(rect, { x: px, y: py, width: 1, height: 1 });
    if (allowedDirections === "vertical") px = rect.x;
    if (allowedDirections === "horizontal") py = rect.y;
    // Check if the point is inside the rectangle
    if (itemIsInRect([px, py], rect)) {
        return undefined;
    }

    // Calculate distances to the closest edges
    const distanceToLeft = px - rect.x;
    const distanceToRight = rect.x + rect.width - px;
    const distanceToTop = py - rect.y + 1;
    const distanceToBottom = rect.y + rect.height - py;

    // Find the minimum distance
    const minDistance = Math.min(
        allowedDirections === "vertical" ? Number.MAX_SAFE_INTEGER : distanceToLeft,
        allowedDirections === "vertical" ? Number.MAX_SAFE_INTEGER : distanceToRight,
        allowedDirections === "horizontal" ? Number.MAX_SAFE_INTEGER : distanceToTop,
        allowedDirections === "horizontal" ? Number.MAX_SAFE_INTEGER : distanceToBottom
    );

    // eslint-disable-next-line unicorn/prefer-switch
    if (minDistance === distanceToBottom) {
        return { x: rect.x, y: rect.y + rect.height, width: rect.width, height: py - rect.y - rect.height + 1 };
    } else if (minDistance === distanceToTop) {
        return { x: rect.x, y: py, width: rect.width, height: rect.y - py };
    } else if (minDistance === distanceToRight) {
        return { x: rect.x + rect.width, y: rect.y, width: px - rect.x - rect.width + 1, height: rect.height };
    } else {
        return { x: px, y: rect.y, width: rect.x - px, height: rect.height };
    }
}

export function combineRects(a: Rectangle, b: Rectangle): Rectangle {
    const x = Math.min(a.x, b.x);
    const y = Math.min(a.y, b.y);
    const width = Math.max(a.x + a.width, b.x + b.width) - x;
    const height = Math.max(a.y + a.height, b.y + b.height) - y;
    return { x, y, width, height };
}

/**
 * This function is absolutely critical for the performance of the fill handle and highlight regions. If you don't
 * hug rectanges when they are dashed and they are huge you will get giant GPU stalls. The reason for the mod is
 * if you don't respect the dash stroke size you will get weird artificts as the rectangle changes sizes (the dashes
 * won't line up from one frame to the next)
 */
export function hugRectToTarget(rect: Rectangle, width: number, height: number, mod: number): Rectangle | undefined {
    // Combine checks for early return
    if (
        rect.x > width ||
        rect.y > height ||
        (rect.x < 0 && rect.y < 0 && rect.x + rect.width > width && rect.y + rect.height > height)
    ) {
        return undefined;
    }

    // Direct return if the rectangle is completely within bounds
    if (rect.x >= 0 && rect.y >= 0 && rect.x + rect.width <= width && rect.y + rect.height <= height) {
        return rect;
    }

    // Pre-compute constants for boundaries, we are giving ourselves slop here because we don't want to have weird
    // issues when scaling is applied. 4px is more than enough slop.
    const leftMax = -4;
    const topMax = -4;
    const rightMax = width + 4;
    const bottomMax = height + 4;

    // Pre-compute boundary overflows
    const leftOverflow = leftMax - rect.x;
    const rightOverflow = rect.x + rect.width - rightMax;
    const topOverflow = topMax - rect.y;
    const bottomOverflow = rect.y + rect.height - bottomMax;

    // Adjust if necessary, using simplified calculations
    const left = leftOverflow > 0 ? rect.x + Math.floor(leftOverflow / mod) * mod : rect.x;
    const right = rightOverflow > 0 ? rect.x + rect.width - Math.floor(rightOverflow / mod) * mod : rect.x + rect.width;
    const top = topOverflow > 0 ? rect.y + Math.floor(topOverflow / mod) * mod : rect.y;
    const bottom =
        bottomOverflow > 0 ? rect.y + rect.height - Math.floor(bottomOverflow / mod) * mod : rect.y + rect.height;

    return { x: left, y: top, width: right - left, height: bottom - top };
}
