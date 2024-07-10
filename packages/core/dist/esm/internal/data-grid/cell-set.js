import { packColRowToNumber, unpackNumberToColRow, unpackRow } from "../../common/render-state-provider.js";
export class CellSet {
    cells;
    constructor(items = []) {
        this.cells = new Set(items.map(x => packColRowToNumber(x[0], x[1])));
    }
    add(cell) {
        this.cells.add(packColRowToNumber(cell[0], cell[1]));
    }
    has(cell) {
        if (cell === undefined)
            return false;
        return this.cells.has(packColRowToNumber(cell[0], cell[1]));
    }
    remove(cell) {
        this.cells.delete(packColRowToNumber(cell[0], cell[1]));
    }
    clear() {
        this.cells.clear();
    }
    get size() {
        return this.cells.size;
    }
    hasHeader() {
        for (const cellNumber of this.cells) {
            const row = unpackRow(cellNumber);
            if (row < 0)
                return true;
        }
        return false;
    }
    hasItemInRectangle(rect) {
        for (let row = rect.y; row < rect.y + rect.height; row++) {
            for (let col = rect.x; col < rect.x + rect.width; col++) {
                if (this.cells.has(packColRowToNumber(col, row))) {
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
            yield unpackNumberToColRow(cellNumber);
        }
    }
}
//# sourceMappingURL=cell-set.js.map