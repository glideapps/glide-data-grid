import type { Item, Rectangle } from "./data-grid-types.js";
export declare class CellSet {
    private readonly cells;
    constructor(items?: Item[]);
    add(cell: Item): void;
    has(cell: Item | undefined): boolean;
    remove(cell: Item): void;
    clear(): void;
    get size(): number;
    hasHeader(): boolean;
    hasItemInRectangle(rect: Rectangle): boolean;
    hasItemInRegion(rect: readonly (Rectangle & {
        when?: boolean;
    })[]): boolean;
    values(): IterableIterator<Item>;
}
//# sourceMappingURL=cell-set.d.ts.map