import { CellSet } from "../internal/data-grid/cell-set.js";
import throttle from "lodash/throttle.js";
import { packColRowToNumber, unpackNumberToColRow, WindowingTrackerBase } from "./render-state-provider.js";
const imgPool = [];
class ImageWindowLoaderImpl extends WindowingTrackerBase {
    imageLoaded = () => undefined;
    loadedLocations = [];
    cache = {};
    setCallback(imageLoaded) {
        this.imageLoaded = imageLoaded;
    }
    // eslint-disable-next-line unicorn/consistent-function-scoping
    sendLoaded = throttle(() => {
        this.imageLoaded(new CellSet(this.loadedLocations));
        this.loadedLocations = [];
    }, 20);
    clearOutOfWindow = () => {
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
            }
            else {
                obj.cancel();
                delete this.cache[key];
            }
        }
    };
    loadImage(url, col, row, key) {
        let loaded = false;
        const img = imgPool.pop() ?? new Image();
        let canceled = false;
        const result = {
            img: undefined,
            cells: [packColRowToNumber(col, row)],
            url,
            cancel: () => {
                if (canceled)
                    return;
                canceled = true;
                if (imgPool.length < 12) {
                    imgPool.unshift(img); // never retain more than 12
                }
                else if (!loaded) {
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
            }
            catch {
                result.cancel();
            }
        });
        this.cache[key] = result;
    }
    loadOrGetImage(url, col, row) {
        const key = url;
        const current = this.cache[key];
        if (current !== undefined) {
            const packed = packColRowToNumber(col, row);
            if (!current.cells.includes(packed)) {
                current.cells.push(packed);
            }
            return current.img;
        }
        else {
            this.loadImage(url, col, row, key);
        }
        return undefined;
    }
}
export default ImageWindowLoaderImpl;
//# sourceMappingURL=image-window-loader.js.map