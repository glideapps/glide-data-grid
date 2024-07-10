"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cell_set_js_1 = require("../internal/data-grid/cell-set.js");
const throttle_js_1 = __importDefault(require("lodash/throttle.js"));
const render_state_provider_js_1 = require("./render-state-provider.js");
const imgPool = [];
class ImageWindowLoaderImpl extends render_state_provider_js_1.WindowingTrackerBase {
    imageLoaded = () => undefined;
    loadedLocations = [];
    cache = {};
    setCallback(imageLoaded) {
        this.imageLoaded = imageLoaded;
    }
    // eslint-disable-next-line unicorn/consistent-function-scoping
    sendLoaded = (0, throttle_js_1.default)(() => {
        this.imageLoaded(new cell_set_js_1.CellSet(this.loadedLocations));
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
            cells: [(0, render_state_provider_js_1.packColRowToNumber)(col, row)],
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
                        this.loadedLocations.push((0, render_state_provider_js_1.unpackNumberToColRow)(packed));
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
            const packed = (0, render_state_provider_js_1.packColRowToNumber)(col, row);
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
exports.default = ImageWindowLoaderImpl;
//# sourceMappingURL=image-window-loader.js.map