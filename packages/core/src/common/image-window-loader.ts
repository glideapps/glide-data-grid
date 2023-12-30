import { type Rectangle } from "../internal/data-grid/data-grid-types.js";
import { CellSet } from "../internal/data-grid/cell-set.js";
import throttle from "lodash/throttle.js";
import { unpackCol, unpackRow, packColRowToNumber, unpackNumberToColRow } from "./render-state-provider.js";
import type { ImageWindowLoader } from "../internal/data-grid/image-window-loader-interface.js";

interface LoadResult {
    img: HTMLImageElement | undefined;
    cancel: () => void;
    url: string;
    cells: number[];
}

const imgPool: HTMLImageElement[] = [];

class ImageWindowLoaderImpl implements ImageWindowLoader {
    private imageLoaded: (locations: CellSet) => void = () => undefined;
    private loadedLocations: [number, number][] = [];

    public visibleWindow: Rectangle = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    public freezeCols: number = 0;
    public freezeRows: number[] = [];

    private isInWindow = (packed: number) => {
        const col = unpackCol(packed);
        const row = unpackRow(packed);
        const w = this.visibleWindow;
        const colInWindow = (col >= w.x && col <= w.x + w.width) || col < this.freezeCols;
        const rowInWindow = (row >= w.y && row <= w.y + w.height) || this.freezeRows.includes(row);
        return colInWindow && rowInWindow;
    };

    private cache: Record<string, LoadResult> = {};

    public setCallback(imageLoaded: (locations: CellSet) => void) {
        this.imageLoaded = imageLoaded;
    }

    // eslint-disable-next-line unicorn/consistent-function-scoping
    private sendLoaded = throttle(() => {
        this.imageLoaded(new CellSet(this.loadedLocations));
        this.loadedLocations = [];
    }, 20);

    private clearOutOfWindow = () => {
        const keys = Object.keys(this.cache);
        for (const key of keys) {
            const obj = this.cache[key];

            let keep = false;
            for (let j = 0; j < obj.cells.length; j++) {
                const packed = obj.cells[j];
                if (this.isInWindow(packed)) {
                    keep = true;
                    break;
                }
            }

            if (keep) {
                obj.cells = obj.cells.filter(this.isInWindow);
            } else {
                obj.cancel();
                delete this.cache[key];
            }
        }
    };

    public setWindow(newWindow: Rectangle, freezeCols: number, freezeRows: number[]): void {
        if (
            this.visibleWindow.x === newWindow.x &&
            this.visibleWindow.y === newWindow.y &&
            this.visibleWindow.width === newWindow.width &&
            this.visibleWindow.height === newWindow.height &&
            this.freezeCols === freezeCols &&
            this.freezeRows === freezeRows
        )
            return;
        this.visibleWindow = newWindow;
        this.freezeCols = freezeCols;
        this.freezeRows = freezeRows;
        this.clearOutOfWindow();
    }

    private loadImage(url: string, col: number, row: number, key: string) {
        let loaded = false;
        const img = imgPool.pop() ?? new Image();

        let canceled = false;
        const result: LoadResult = {
            img: undefined,
            cells: [packColRowToNumber(col, row)],
            url,
            cancel: () => {
                if (canceled) return;
                canceled = true;
                if (imgPool.length < 12) {
                    imgPool.unshift(img); // never retain more than 12
                } else if (!loaded) {
                    img.src = "";
                }
            },
        };

        const loadPromise = new Promise(r => img.addEventListener("load", () => r(null)));
        // use request animation time to avoid paying src set costs during draw calls
        requestAnimationFrame(async () => {
            try {
                img.src = url;
                await loadPromise;
                await img.decode();
                const toWrite = this.cache[key];
                if (toWrite !== undefined && !canceled) {
                    toWrite.img = img;
                    for (const packed of toWrite.cells) {
                        this.loadedLocations.push(unpackNumberToColRow(packed));
                    }
                    loaded = true;
                    this.sendLoaded();
                }
            } catch {
                result.cancel();
            }
        });
        this.cache[key] = result;
    }

    public loadOrGetImage(url: string, col: number, row: number): HTMLImageElement | ImageBitmap | undefined {
        const key = url;

        const current = this.cache[key];
        if (current !== undefined) {
            const packed = packColRowToNumber(col, row);
            if (!current.cells.includes(packed)) {
                current.cells.push(packed);
            }
            return current.img;
        } else {
            this.loadImage(url, col, row, key);
        }
        return undefined;
    }
}

export default ImageWindowLoaderImpl;
