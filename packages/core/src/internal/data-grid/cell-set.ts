import { packColRowToNumber, unpackNumberToColRow, unpackRow } from "../../common/render-state-provider.js";
import type { Item, Rectangle } from "./data-grid-types.js";

export class CellSet {
    private readonly cells: Set<number>;

    constructor(items: Item[] = []) {
        this.cells = new Set<number>(items.map(x => packColRowToNumber(x[0], x[1])));
    }

    public add(cell: Item): void {
        this.cells.add(packColRowToNumber(cell[0], cell[1]));
    }

    public has(cell: Item | undefined): boolean {
        if (cell === undefined) return false;
        return this.cells.has(packColRowToNumber(cell[0], cell[1]));
    }

    public remove(cell: Item): void {
        this.cells.delete(packColRowToNumber(cell[0], cell[1]));
    }

    public clear(): void {
        this.cells.clear();
    }

    public get size(): number {
        return this.cells.size;
    }

    public hasHeader(): boolean {
        for (const cellNumber of this.cells) {
            const row = unpackRow(cellNumber);
            if (row < 0) return true;
        }
        return false;
    }

    public hasItemInRectangle(rect: Rectangle): boolean {
        for (let row = rect.y; row < rect.y + rect.height; row++) {
            for (let col = rect.x; col < rect.x + rect.width; col++) {
                if (this.cells.has(packColRowToNumber(col, row))) {
                    return true;
                }
            }
        }
        return false;
    }

    public hasItemInRegion(rect: readonly (Rectangle & { when?: boolean })[]): boolean {
        for (const r of rect) {
            if (this.hasItemInRectangle(r)) {
                return true;
            }
        }
        return false;
    }

    public *values(): IterableIterator<Item> {
        for (const cellNumber of this.cells) {
            yield unpackNumberToColRow(cellNumber);
        }
    }
}
