import type { Item, Rectangle } from "../internal/data-grid/data-grid-types.js";
export declare function packColRowToNumber(col: number, row: number): number;
export declare function unpackCol(packed: number): number;
export declare function unpackRow(packed: number): number;
export declare function unpackNumberToColRow(packed: number): [number, number];
export declare abstract class WindowingTrackerBase {
    visibleWindow: Rectangle;
    freezeCols: number;
    freezeRows: number[];
    protected isInWindow: (packed: number) => boolean;
    protected abstract clearOutOfWindow: () => void;
    setWindow(newWindow: Rectangle, freezeCols: number, freezeRows: number[]): void;
}
export declare class RenderStateProvider extends WindowingTrackerBase {
    private cache;
    setValue: (location: Item, state: any) => void;
    getValue: (location: Item) => any;
    protected clearOutOfWindow: () => void;
}
//# sourceMappingURL=render-state-provider.d.ts.map