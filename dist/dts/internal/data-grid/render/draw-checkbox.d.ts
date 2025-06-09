import type { Theme } from "../../../index.js";
import { BooleanEmpty, BooleanIndeterminate, type BaseGridCell } from "../data-grid-types.js";
export declare function drawCheckbox(ctx: CanvasRenderingContext2D, theme: Theme, checked: boolean | BooleanEmpty | BooleanIndeterminate, x: number, y: number, width: number, height: number, highlighted: boolean, hoverX?: number, hoverY?: number, maxSize?: number, alignment?: BaseGridCell["contentAlign"], style?: "circle" | "square"): void;
//# sourceMappingURL=draw-checkbox.d.ts.map