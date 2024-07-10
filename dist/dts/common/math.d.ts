import type { FillHandleDirection, Rectangle } from "../internal/data-grid/data-grid-types.js";
export declare function getClosestRect(rect: Rectangle, px: number, py: number, allowedDirections: FillHandleDirection): Rectangle | undefined;
export declare function intersectRect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean;
export declare function pointInRect(rect: Rectangle, x: number, y: number): boolean;
export declare function combineRects(a: Rectangle, b: Rectangle): Rectangle;
export declare function rectContains(a: Rectangle, b: Rectangle): boolean;
/**
 * This function is absolutely critical for the performance of the fill handle and highlight regions. If you don't
 * hug rectanges when they are dashed and they are huge you will get giant GPU stalls. The reason for the mod is
 * if you don't respect the dash stroke size you will get weird artificts as the rectangle changes sizes (the dashes
 * won't line up from one frame to the next)
 */
export declare function hugRectToTarget(rect: Rectangle, width: number, height: number, mod: number): Rectangle | undefined;
interface SplitRect {
    rect: Rectangle;
    clip: Rectangle;
}
export declare function splitRectIntoRegions(rect: Rectangle, splitIndicies: readonly [number, number, number, number], width: number, height: number, splitLocations: readonly [number, number, number, number]): SplitRect[];
export {};
