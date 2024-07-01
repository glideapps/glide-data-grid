import type { CellSet } from "./cell-set.js";
import type { Rectangle } from "./data-grid-types.js";

/** @category Types */
export interface ImageWindowLoader {
    setWindow(newWindow: Rectangle, freezeCols: number | [left: number, right: number], freezeRows: number[]): void;
    loadOrGetImage(url: string, col: number, row: number): HTMLImageElement | ImageBitmap | undefined;
    setCallback(imageLoaded: (locations: CellSet) => void): void;
}
