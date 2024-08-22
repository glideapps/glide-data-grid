import { CompactSelection, type GridSelection, type Slice } from "./data-grid-types.js";
type SetCallback = (newVal: GridSelection, expand: boolean) => void;
export type SelectionBlending = "exclusive" | "mixed";
type SelectionTrigger = "click" | "drag" | "keyboard-nav" | "keyboard-select" | "edit";
export declare function useSelectionBehavior(gridSelection: GridSelection, setGridSelection: SetCallback, rangeBehavior: SelectionBlending, columnBehavior: SelectionBlending, rowBehavior: SelectionBlending, rangeSelect: "none" | "cell" | "rect" | "multi-cell" | "multi-rect", rangeSelectionColumnSpanning: boolean): readonly [(value: Pick<NonNullable<GridSelection["current"]>, "cell" | "range"> | undefined, expand: boolean, append: boolean, trigger: SelectionTrigger) => void, (newRows: CompactSelection | undefined, append: Slice | number | undefined, allowMixed: boolean) => void, (newCols: CompactSelection | undefined, append: number | Slice | undefined, allowMixed: boolean) => void];
export {};
