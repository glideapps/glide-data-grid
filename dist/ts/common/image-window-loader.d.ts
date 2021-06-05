import { Rectangle } from "../data-grid/data-grid-types";
export interface LoadResult {
    img: HTMLImageElement | undefined;
    url: string;
    col: number;
    row: number;
}
declare class ImageWindowLoader {
    private imageLoaded;
    private loadedLocations;
    private window;
    private isInWindow;
    private cache;
    setCallback(imageLoaded: (locations: readonly (readonly [number, number])[]) => void): void;
    private sendLoaded;
    private clearOutOfWindow;
    setWindow(window: Rectangle): void;
    loadOrGetImage(url: string, col: number, row: number): HTMLImageElement | undefined;
}
export default ImageWindowLoader;
//# sourceMappingURL=image-window-loader.d.ts.map