import { deepEqual } from "./support.js";
// max safe int 2^53 - 1 (minus 1 omitted from here on)
// max safe columns is 2^21 or 2,097,151
// max safe rows is 2^32 or 4,294,967,295
// If 3 rows render as an inch, then the max safe height is 1,431,655,765 inches or 22,426,868 miles
// the distance to the moon is 238,900 miles, so this would give you a data grid that goes to the moon and back 94 times
// seems fine
const rowShift = 1 << 21;
export function packColRowToNumber(col, row) {
    return (row + 2) * rowShift + col;
}
export function unpackCol(packed) {
    return packed % rowShift;
}
export function unpackRow(packed) {
    return Math.floor(packed / rowShift) - 2;
}
export function unpackNumberToColRow(packed) {
    const col = unpackCol(packed);
    const row = unpackRow(packed);
    return [col, row];
}
export class WindowingTrackerBase {
    visibleWindow = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    freezeCols = 0;
    freezeRows = [];
    isInWindow = (packed) => {
        const col = unpackCol(packed);
        const row = unpackRow(packed);
        const w = this.visibleWindow;
        const colInWindow = (col >= w.x && col <= w.x + w.width) || col < this.freezeCols;
        const rowInWindow = (row >= w.y && row <= w.y + w.height) || this.freezeRows.includes(row);
        return colInWindow && rowInWindow;
    };
    setWindow(newWindow, freezeCols, freezeRows) {
        if (this.visibleWindow.x === newWindow.x &&
            this.visibleWindow.y === newWindow.y &&
            this.visibleWindow.width === newWindow.width &&
            this.visibleWindow.height === newWindow.height &&
            this.freezeCols === freezeCols &&
            deepEqual(this.freezeRows, freezeRows))
            return;
        this.visibleWindow = newWindow;
        this.freezeCols = freezeCols;
        this.freezeRows = freezeRows;
        this.clearOutOfWindow();
    }
}
export class RenderStateProvider extends WindowingTrackerBase {
    cache = new Map();
    setValue = (location, state) => {
        this.cache.set(packColRowToNumber(location[0], location[1]), state);
    };
    getValue = (location) => {
        return this.cache.get(packColRowToNumber(location[0], location[1]));
    };
    clearOutOfWindow = () => {
        for (const [key] of this.cache.entries()) {
            if (!this.isInWindow(key)) {
                this.cache.delete(key);
            }
        }
    };
}
//# sourceMappingURL=render-state-provider.js.map