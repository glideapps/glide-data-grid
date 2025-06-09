import type { Item } from "./data-grid-types.js";
type StateItem = {
    item: Item;
    hoverAmount: number;
};
export type HoverValues = readonly Readonly<StateItem>[];
export type StepCallback = (values: HoverValues) => void;
export declare class AnimationManager {
    private callback;
    constructor(callback: StepCallback);
    private currentHoveredItem;
    private leavingItems;
    private lastAnimationTime;
    private addToLeavingItems;
    /**
     * @returns the hover amount of the item, if it was leaving (0 if not).
     */
    private removeFromLeavingItems;
    private cleanUpLeavingElements;
    private shouldStep;
    private getAnimatingItems;
    private step;
    setHovered: (item: Item | undefined) => void;
}
export {};
