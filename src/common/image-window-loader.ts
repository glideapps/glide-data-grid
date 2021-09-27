import { dontAwait } from "./support";
import { Rectangle } from "../data-grid/data-grid-types";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

interface LoadResult {
    img: HTMLImageElement | undefined;
    url: string;
    cells: Set<number>;
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

class ImageWindowLoader {
    private imageLoaded: (locations: readonly (readonly [number, number])[]) => void = () => undefined;
    private loadedLocations: [number, number][] = [];

    private window: Rectangle = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    private isInWindow(col: number, row: number) {
        const w = this.window;
        return col >= w.x && col <= w.x + w.width && row >= w.y && row <= w.y + w.height;
    }

    private cache: Record<string, LoadResult> = {};

    public setCallback(imageLoaded: (locations: readonly (readonly [number, number])[]) => void) {
        this.imageLoaded = imageLoaded;
    }

    private sendLoaded = throttle(() => {
        this.imageLoaded(this.loadedLocations);
        this.loadedLocations = [];
    }, 20);

    private clearOutOfWindow = debounce(() => {
        const old = this.cache;
        this.cache = {};
        Object.values(old)
            .map(v => ({
                ...v,
                cells: new Set(Array.from(v.cells).filter(n => this.isInWindow(...unpackNumberToColRow(n)))),
            }))
            .filter(v => v.cells.size > 0)
            .forEach(v => {
                this.cache[`${v.url}`] = v;
            });
    }, 600);

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
            current.cells.add(packColRowToNumber(col, row));
            return current.img;
        } else {
            const img = new Image();

            // FIXME
            // img.src =
            //     massageImageUrl(
            //         url,
            //         {
            //             height: 34,
            //             thumbnail: true,
            //         },
            //         undefined
            //     ) ?? url;
            img.src = url;

            const result: LoadResult = {
                img: undefined,
                cells: new Set([packColRowToNumber(col, row)]),
                url,
            };

            const load = async () => {
                let errored = false;
                try {
                    await img.decode();
                } catch {
                    errored = true;
                }
                const toWrite = this.cache[key];
                if (toWrite !== undefined && !errored) {
                    toWrite.img = img;
                    for (const packed of Array.from(toWrite.cells)) {
                        this.loadedLocations.push(unpackNumberToColRow(packed));
                    }
                    this.sendLoaded();
                }
            };

            dontAwait(load());
            this.cache[key] = result;
            return undefined;
        }
    }
}

export default ImageWindowLoader;
