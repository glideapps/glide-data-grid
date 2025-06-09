import { type Item } from "./data-grid-types.js";
import { CellSet } from "./cell-set.js";
export type EnqueueCallback = (item: Item) => void;
export declare function useAnimationQueue(draw: (items: CellSet) => void): EnqueueCallback;
