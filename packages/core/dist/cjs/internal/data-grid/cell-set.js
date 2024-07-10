"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellSet = void 0;
const render_state_provider_js_1 = require("../../common/render-state-provider.js");
class CellSet {
    cells;
    constructor(items = []) {
        this.cells = new Set(items.map(x => (0, render_state_provider_js_1.packColRowToNumber)(x[0], x[1])));
    }
    add(cell) {
        this.cells.add((0, render_state_provider_js_1.packColRowToNumber)(cell[0], cell[1]));
    }
    has(cell) {
        if (cell === undefined)
            return false;
        return this.cells.has((0, render_state_provider_js_1.packColRowToNumber)(cell[0], cell[1]));
    }
    remove(cell) {
        this.cells.delete((0, render_state_provider_js_1.packColRowToNumber)(cell[0], cell[1]));
    }
    clear() {
        this.cells.clear();
    }
    get size() {
        return this.cells.size;
    }
    hasHeader() {
        for (const cellNumber of this.cells) {
            const row = (0, render_state_provider_js_1.unpackRow)(cellNumber);
            if (row < 0)
                return true;
        }
        return false;
    }
    hasItemInRectangle(rect) {
        for (let row = rect.y; row < rect.y + rect.height; row++) {
            for (let col = rect.x; col < rect.x + rect.width; col++) {
                if (this.cells.has((0, render_state_provider_js_1.packColRowToNumber)(col, row))) {
                    return true;
                }
            }
        }
        return false;
    }
    hasItemInRegion(rect) {
        for (const r of rect) {
            if (this.hasItemInRectangle(r)) {
                return true;
            }
        }
        return false;
    }
    *values() {
        for (const cellNumber of this.cells) {
            yield (0, render_state_provider_js_1.unpackNumberToColRow)(cellNumber);
        }
    }
}
exports.CellSet = CellSet;
//# sourceMappingURL=cell-set.js.map