import { type BaseGridCell, type ImageCell } from "../internal/data-grid/data-grid-types.js";
import type { BaseDrawArgs, InternalCellRenderer } from "./cell-types.js";
export declare const imageCellRenderer: InternalCellRenderer<ImageCell>;
export declare function drawImage(args: BaseDrawArgs, data: readonly string[], rounding: number, contentAlign?: BaseGridCell["contentAlign"]): void;
//# sourceMappingURL=image-cell.d.ts.map