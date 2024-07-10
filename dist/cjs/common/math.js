"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitRectIntoRegions = exports.hugRectToTarget = exports.rectContains = exports.combineRects = exports.pointInRect = exports.intersectRect = exports.getClosestRect = void 0;
/* eslint-disable unicorn/prefer-ternary */
const data_grid_lib_js_1 = require("../internal/data-grid/render/data-grid-lib.js");
function getClosestRect(rect, px, py, allowedDirections) {
    if (allowedDirections === "any")
        return combineRects(rect, { x: px, y: py, width: 1, height: 1 });
    if (allowedDirections === "vertical")
        px = rect.x;
    if (allowedDirections === "horizontal")
        py = rect.y;
    // Check if the point is inside the rectangle
    if ((0, data_grid_lib_js_1.itemIsInRect)([px, py], rect)) {
        return undefined;
    }
    // Calculate distances to the closest edges
    const distanceToLeft = px - rect.x;
    const distanceToRight = rect.x + rect.width - px;
    const distanceToTop = py - rect.y + 1;
    const distanceToBottom = rect.y + rect.height - py;
    // Find the minimum distance
    const minDistance = Math.min(allowedDirections === "vertical" ? Number.MAX_SAFE_INTEGER : distanceToLeft, allowedDirections === "vertical" ? Number.MAX_SAFE_INTEGER : distanceToRight, allowedDirections === "horizontal" ? Number.MAX_SAFE_INTEGER : distanceToTop, allowedDirections === "horizontal" ? Number.MAX_SAFE_INTEGER : distanceToBottom);
    // eslint-disable-next-line unicorn/prefer-switch
    if (minDistance === distanceToBottom) {
        return { x: rect.x, y: rect.y + rect.height, width: rect.width, height: py - rect.y - rect.height + 1 };
    }
    else if (minDistance === distanceToTop) {
        return { x: rect.x, y: py, width: rect.width, height: rect.y - py };
    }
    else if (minDistance === distanceToRight) {
        return { x: rect.x + rect.width, y: rect.y, width: px - rect.x - rect.width + 1, height: rect.height };
    }
    else {
        return { x: px, y: rect.y, width: rect.x - px, height: rect.height };
    }
}
exports.getClosestRect = getClosestRect;
function intersectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 <= x2 + w2 && x2 <= x1 + w1 && y1 <= y2 + h2 && y2 <= y1 + h1;
}
exports.intersectRect = intersectRect;
function pointInRect(rect, x, y) {
    return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}
exports.pointInRect = pointInRect;
function combineRects(a, b) {
    const x = Math.min(a.x, b.x);
    const y = Math.min(a.y, b.y);
    const width = Math.max(a.x + a.width, b.x + b.width) - x;
    const height = Math.max(a.y + a.height, b.y + b.height) - y;
    return { x, y, width, height };
}
exports.combineRects = combineRects;
function rectContains(a, b) {
    return a.x <= b.x && a.y <= b.y && a.x + a.width >= b.x + b.width && a.y + a.height >= b.y + b.height;
}
exports.rectContains = rectContains;
/**
 * This function is absolutely critical for the performance of the fill handle and highlight regions. If you don't
 * hug rectanges when they are dashed and they are huge you will get giant GPU stalls. The reason for the mod is
 * if you don't respect the dash stroke size you will get weird artificts as the rectangle changes sizes (the dashes
 * won't line up from one frame to the next)
 */
function hugRectToTarget(rect, width, height, mod) {
    // Combine checks for early return
    if (rect.x > width ||
        rect.y > height ||
        (rect.x < 0 && rect.y < 0 && rect.x + rect.width > width && rect.y + rect.height > height)) {
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
    const bottom = bottomOverflow > 0 ? rect.y + rect.height - Math.floor(bottomOverflow / mod) * mod : rect.y + rect.height;
    return { x: left, y: top, width: right - left, height: bottom - top };
}
exports.hugRectToTarget = hugRectToTarget;
function splitRectIntoRegions(rect, splitIndicies, width, height, splitLocations) {
    const [lSplit, tSplit, rSplit, bSplit] = splitIndicies;
    const [lClip, tClip, rClip, bClip] = splitLocations;
    const { x: inX, y: inY, width: inW, height: inH } = rect;
    const result = [];
    if (inW <= 0 || inH <= 0)
        return result;
    const inRight = inX + inW;
    const inBottom = inY + inH;
    // The goal is to split the inbound rect into up to 9 regions based on the provided split indicies which are
    // more or less cut lines. The cut lines are whole numbers as is the rect. We are dividing cells on a table.
    // In theory there can be up to 9 regions returned, so we need to be careful to make sure we get them all and
    // not return any empty regions.
    // compute some handy values
    const isOverLeft = inX < lSplit;
    const isOverTop = inY < tSplit;
    const isOverRight = inX + inW > rSplit;
    const isOverBottom = inY + inH > bSplit;
    const isOverCenterVert = (inX >= lSplit && inX < rSplit) ||
        (inRight > lSplit && inRight <= rSplit) ||
        (inX < lSplit && inRight > rSplit);
    const isOverCenterHoriz = (inY >= tSplit && inY < bSplit) ||
        (inBottom > tSplit && inBottom <= bSplit) ||
        (inY < tSplit && inBottom > bSplit);
    const isOverCenter = isOverCenterVert && isOverCenterHoriz;
    // center
    if (isOverCenter) {
        const x = Math.max(inX, lSplit);
        const y = Math.max(inY, tSplit);
        const right = Math.min(inRight, rSplit);
        const bottom = Math.min(inBottom, bSplit);
        result.push({
            rect: { x, y, width: right - x, height: bottom - y },
            clip: {
                x: lClip,
                y: tClip,
                width: rClip - lClip + 1,
                height: bClip - tClip + 1,
            },
        });
    }
    // top left
    if (isOverLeft && isOverTop) {
        const x = inX;
        const y = inY;
        const right = Math.min(inRight, lSplit);
        const bottom = Math.min(inBottom, tSplit);
        result.push({
            rect: {
                x,
                y,
                width: right - x,
                height: bottom - y,
            },
            clip: {
                x: 0,
                y: 0,
                width: lClip + 1,
                height: tClip + 1,
            },
        });
    }
    // top center
    if (isOverTop && isOverCenterVert) {
        const x = Math.max(inX, lSplit);
        const y = inY;
        const right = Math.min(inRight, rSplit);
        const bottom = Math.min(inBottom, tSplit);
        result.push({
            rect: {
                x,
                y,
                width: right - x,
                height: bottom - y,
            },
            clip: {
                x: lClip,
                y: 0,
                width: rClip - lClip + 1,
                height: tClip + 1,
            },
        });
    }
    // top right
    if (isOverTop && isOverRight) {
        const x = Math.max(inX, rSplit);
        const y = inY;
        const right = inRight;
        const bottom = Math.min(inBottom, tSplit);
        result.push({
            rect: {
                x,
                y,
                width: right - x,
                height: bottom - y,
            },
            clip: {
                x: rClip,
                y: 0,
                width: width - rClip + 1,
                height: tClip + 1,
            },
        });
    }
    // center left
    if (isOverLeft && isOverCenterHoriz) {
        const x = inX;
        const y = Math.max(inY, tSplit);
        const right = Math.min(inRight, lSplit);
        const bottom = Math.min(inBottom, bSplit);
        result.push({
            rect: {
                x,
                y,
                width: right - x,
                height: bottom - y,
            },
            clip: {
                x: 0,
                y: tClip,
                width: lClip + 1,
                height: bClip - tClip + 1,
            },
        });
    }
    // center right
    if (isOverRight && isOverCenterHoriz) {
        const x = Math.max(inX, rSplit);
        const y = Math.max(inY, tSplit);
        const right = inRight;
        const bottom = Math.min(inBottom, bSplit);
        result.push({
            rect: {
                x,
                y,
                width: right - x,
                height: bottom - y,
            },
            clip: {
                x: rClip,
                y: tClip,
                width: width - rClip + 1,
                height: bClip - tClip + 1,
            },
        });
    }
    // bottom left
    if (isOverLeft && isOverBottom) {
        const x = inX;
        const y = Math.max(inY, bSplit);
        const right = Math.min(inRight, lSplit);
        const bottom = inBottom;
        result.push({
            rect: {
                x,
                y,
                width: right - x,
                height: bottom - y,
            },
            clip: {
                x: 0,
                y: bClip,
                width: lClip + 1,
                height: height - bClip + 1,
            },
        });
    }
    // bottom center
    if (isOverBottom && isOverCenterVert) {
        const x = Math.max(inX, lSplit);
        const y = Math.max(inY, bSplit);
        const right = Math.min(inRight, rSplit);
        const bottom = inBottom;
        result.push({
            rect: {
                x,
                y,
                width: right - x,
                height: bottom - y,
            },
            clip: {
                x: lClip,
                y: bClip,
                width: rClip - lClip + 1,
                height: height - bClip + 1,
            },
        });
    }
    // bottom right
    if (isOverRight && isOverBottom) {
        const x = Math.max(inX, rSplit);
        const y = Math.max(inY, bSplit);
        const right = inRight;
        const bottom = inBottom;
        result.push({
            rect: {
                x,
                y,
                width: right - x,
                height: bottom - y,
            },
            clip: {
                x: rClip,
                y: bClip,
                width: width - rClip + 1,
                height: height - bClip + 1,
            },
        });
    }
    return result;
}
exports.splitRectIntoRegions = splitRectIntoRegions;
//# sourceMappingURL=math.js.map