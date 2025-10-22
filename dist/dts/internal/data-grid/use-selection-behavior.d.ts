import { CompactSelection, type GridSelection, type Slice } from "./data-grid-types.js";
type SetCallback = (newVal: GridSelection, expand: boolean) => void;
/**
 * The type of selection blending to use:
 * - `exclusive`: Only one type of selection can be made at a time.
 * - `mixed`: Multiple types of selection can be made at a time, but only when a multi-key (e.g., Cmd/Ctrl) is held.
 * - `additive`: Multiple types of selection can be made at a time, and selections accumulate without a modifier.
 */
export type SelectionBlending = "exclusive" | "mixed" | "additive";
type SelectionTrigger = "click" | "drag" | "keyboard-nav" | "keyboard-select" | "edit";
export declare function useSelectionBehavior(gridSelection: GridSelection, setGridSelection: SetCallback, rangeBehavior: SelectionBlending, columnBehavior: SelectionBlending, rowBehavior: SelectionBlending, rangeSelect: "none" | "cell" | "rect" | "multi-cell" | "multi-rect", rangeSelectionColumnSpanning: boolean): readonly [(value: Pick<NonNullable<GridSelection["current"]>, "cell" | "range"> | undefined, expand: boolean, append: boolean, trigger: SelectionTrigger) => void, (newRows: CompactSelection | undefined, append: Slice | number | undefined, allowMixed: boolean) => void, (newCols: CompactSelection | undefined, append: number | Slice | undefined, allowMixed: boolean) => void];
export {};
//# sourceMappingURL=use-selection-behavior.d.ts.map