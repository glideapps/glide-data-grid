import { Rectangle } from "../data-grid/data-grid-types";
import throttle from "lodash/throttle";

interface LoadResult {
    img: HTMLImageElement | undefined;
    cancel?: () => void;
    url: string;
    cells: number[];
}

const rowShift = 1 << 16;

function packColRowToNumber(col: number, row: number) {
    return row * rowShift + col;
}

function unpackNumberToColRow(packed: number): [number, number] {
    const col = packed % rowShift;
    const row = (packed - col) / rowShift;
    return [col, row];
}

function unpackCol(packed: number): number {
    return packed % rowShift;
}

function unpackRow(packed: number, col: number): number {
    return (packed - col) / rowShift;
}

class ImageWindowLoader {
    private imageLoaded: (locations: readonly (readonly [number, number])[]) => void = () => undefined;
    private loadedLocations: [number, number][] = [];

    private window: Rectangle = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    private isInWindow = (packed: number) => {
        const col = unpackCol(packed);
        const row = unpackRow(packed, col);
        const w = this.window;
        return col >= w.x && col <= w.x + w.width && row >= w.y && row <= w.y + w.height;
    };

    private cache: Record<string, LoadResult> = {};

    public setCallback(imageLoaded: (locations: readonly (readonly [number, number])[]) => void) {
        this.imageLoaded = imageLoaded;
    }

    private sendLoaded = throttle(() => {
        this.imageLoaded(this.loadedLocations);
        this.loadedLocations = [];
    }, 20);

    private clearOutOfWindowImpl = () => {
        for (const key of Object.keys(this.cache)) {
            const obj = this.cache[key];

            let keep = false;
            for (const packed of obj.cells) {
                if (this.isInWindow(packed)) {
                    keep = true;
                    break;
                }
            }

            if (keep) {
                obj.cells = obj.cells.filter(this.isInWindow);
            } else {
                obj.cancel?.();
                delete this.cache[key];
            }
        }
    };

    private clearOutOfWindow = throttle(this.clearOutOfWindowImpl, 600, {
        leading: false,
        trailing: true,
    });

    public setWindow(window: Rectangle): void {
        if (
            this.window.x === window.x &&
            this.window.y === window.y &&
            this.window.width === window.width &&
            this.window.height === window.height
        )
            return;
        this.window = window;
        this.clearOutOfWindow();
    }

    public loadOrGetImage(url: string, col: number, row: number): HTMLImageElement | undefined {
        const key = `${url}`;

        const current = this.cache[key];
        if (current !== undefined) {
            const packed = packColRowToNumber(col, row);
            if (current.img === undefined && !current.cells.includes(packed)) {
                current.cells.push(packed);
            }
            return current.img;
        } else {
            const img = new Image();

            img.src = url;

            let cancelled = false;
            const result: LoadResult = {
                img: undefined,
                cells: [packColRowToNumber(col, row)],
                url,
                cancel: () => {
                    cancelled = true;
                    img.src = "";
                },
            };

            const load = async () => {
                let errored = false;
                try {
                    await img.decode();
                } catch {
                    errored = true;
                }
                const toWrite = this.cache[key];
                if (toWrite !== undefined && !errored && !cancelled) {
                    toWrite.img = img;
                    for (const packed of toWrite.cells) {
                        this.loadedLocations.push(unpackNumberToColRow(packed));
                    }
                    this.sendLoaded();
                }
            };

            void load();
            this.cache[key] = result;
            return undefined;
        }
    }
}

export default ImageWindowLoader;
