import { type GridCell, BooleanEmpty, BooleanIndeterminate } from "../internal/data-grid/data-grid-types.js";
type StringArrayCellBuffer = {
    formatted: string[];
    rawValue: string[];
    format: "string-array";
};
type BasicCellBuffer = {
    formatted: string;
    rawValue: string | number | boolean | BooleanEmpty | BooleanIndeterminate | undefined;
    format: "string" | "number" | "boolean" | "url";
};
export type CellBuffer = StringArrayCellBuffer | BasicCellBuffer;
export type CopyBuffer = CellBuffer[][];
export declare function getCopyBufferContents(cells: readonly (readonly GridCell[])[], columnIndexes: readonly number[]): {
    readonly textPlain: string;
    readonly textHtml: string;
};
export declare function decodeHTML(html: string): CopyBuffer | undefined;
export {};
//# sourceMappingURL=copy-paste.d.ts.map