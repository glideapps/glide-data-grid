/* eslint-disable unicorn/prefer-ternary */
import { itemIsInRect } from "../internal/data-grid/data-grid-lib.js";
import type { Rectangle } from "../internal/data-grid/data-grid-types.js";

export function getClosestRect(rect: Rectangle, px: number, py: number): Rectangle | undefined {
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
    const minDistance = Math.min(distanceToLeft, distanceToRight, distanceToTop, distanceToBottom);

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
