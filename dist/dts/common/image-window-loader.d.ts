import { CellSet } from "../internal/data-grid/cell-set.js";
import { WindowingTrackerBase } from "./render-state-provider.js";
import type { ImageWindowLoader } from "../internal/data-grid/image-window-loader-interface.js";
declare class ImageWindowLoaderImpl extends WindowingTrackerBase implements ImageWindowLoader {
    private imageLoaded;
    private loadedLocations;
    private cache;
    setCallback(imageLoaded: (locations: CellSet) => void): void;
    private sendLoaded;
    protected clearOutOfWindow: () => void;
    private loadImage;
    loadOrGetImage(url: string, col: number, row: number): HTMLImageElement | ImageBitmap | undefined;
}
export default ImageWindowLoaderImpl;
