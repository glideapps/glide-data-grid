import type { Item, Rectangle } from "../internal/data-grid/data-grid-types.js";

// max safe int 2^53 - 1
// max safe columns is 2^21 or 2,097,151
// max safe rows is 2^32 - 1 or 4,294,967,295
// If 3 rows render as an inch, then the max safe height is 1,431,655,765 inches or 22,426,868 miles
// the distance to the moon is 238,900 miles, so this would give you a data grid that goes to the moon and back 94 times
// seems fine
const rowShift = 1 << 21;

export function packColRowToNumber(col: number, row: number) {
    return row * rowShift + col;
}

export function unpackCol(packed: number): number {
    return packed % rowShift;
}

export function unpackRow(packed: number, col: number): number {
    return (packed - col) / rowShift;
}

export function unpackNumberToColRow(packed: number): [number, number] {
    const col = unpackCol(packed);
    const row = unpackRow(packed, col);
    return [col, row];
}

export class RenderStateProvider {
    private visibleWindow: Rectangle = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    private freezeCols: number = 0;

    private isInWindow = (packed: number) => {
        const col = unpackCol(packed);
        const row = unpackRow(packed, col);
        const w = this.visibleWindow;
        if (col < this.freezeCols && row >= w.y && row <= w.y + w.height) return true;
        return col >= w.x && col <= w.x + w.width && row >= w.y && row <= w.y + w.height;
    };

    private cache: Map<number, any> = new Map();

    public setValue = (location: Item, state: any): void => {
        this.cache.set(packColRowToNumber(location[0], location[1]), state);
    };

    public getValue = (location: Item): any => {
        return this.cache.get(packColRowToNumber(location[0], location[1]));
    };

    private clearOutOfWindow = () => {
        for (const [key] of this.cache.entries()) {
            if (!this.isInWindow(key)) {
                this.cache.delete(key);
            }
        }
    };

    public setWindow(newWindow: Rectangle, freezeCols: number): void {
        if (
            this.visibleWindow.x === newWindow.x &&
            this.visibleWindow.y === newWindow.y &&
            this.visibleWindow.width === newWindow.width &&
            this.visibleWindow.height === newWindow.height &&
            this.freezeCols === freezeCols
        )
            return;
        this.visibleWindow = newWindow;
        this.freezeCols = freezeCols;
        this.clearOutOfWindow();
    }
}
