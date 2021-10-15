import clamp from "lodash/clamp";

type Item = readonly [number, number | undefined];
type StateItem = { item: Item; hoverAmount: number };
export type HoverValues = readonly Readonly<StateItem>[];
export type StepCallback = (values: HoverValues) => void;

const hoverTime = 120;

export class AnimationManager {
    constructor(private callback: StepCallback) {}

    private currentHoveredItem: StateItem | undefined = undefined;
    private leavingItems: StateItem[] = [];

    private lastAnimationTime: number | undefined;

    private areSameItems = (left: Item | undefined, right: Item | undefined) => {
        return left?.[0] === right?.[0] && left?.[1] === right?.[1];
    };

    private addToLeavingItems = (item: StateItem) => {
        const isAlreadyLeaving = this.leavingItems.find(i => this.areSameItems(i.item, item.item)) !== undefined;

        if (isAlreadyLeaving) {
            return;
        }

        this.leavingItems.push(item);
    };

    /**
     * @returns the hover amount of the item, if it was leaving (0 if not).
     */
    private removeFromLeavingItems = (item: Item): number => {
        const leavingItem = this.leavingItems.find(e => this.areSameItems(e.item, item));

        this.leavingItems = this.leavingItems.filter(i => i !== leavingItem);

        return leavingItem?.hoverAmount ?? 0;
    };

    private cleanUpLeavingElements = () => {
        this.leavingItems = this.leavingItems.filter(i => i.hoverAmount > 0);
    };

    private shouldStep = () => {
        const hasLeavingItems = this.leavingItems.length > 0;
        const currentHoveredIsAnimating =
            this.currentHoveredItem !== undefined && this.currentHoveredItem.hoverAmount < 1;

        return hasLeavingItems || currentHoveredIsAnimating;
    };

    private getAnimatingItems = () => {
        if (this.currentHoveredItem !== undefined) {
            return [...this.leavingItems, this.currentHoveredItem];
        }
        return this.leavingItems;
    };

    private step = (timestamp: number): void => {
        if (this.lastAnimationTime === undefined) {
            this.lastAnimationTime = timestamp;
        } else {
            const step = timestamp - this.lastAnimationTime;
            const delta = step / hoverTime;

            for (const item of this.leavingItems) {
                item.hoverAmount = clamp(item.hoverAmount - delta, 0, 1);
            }

            if (this.currentHoveredItem !== undefined) {
                this.currentHoveredItem.hoverAmount = clamp(this.currentHoveredItem.hoverAmount + delta, 0, 1);
            }

            this.callback(this.getAnimatingItems());

            this.cleanUpLeavingElements();
        }

        if (this.shouldStep()) {
            this.lastAnimationTime = timestamp;
            window.requestAnimationFrame(this.step);
        } else {
            this.lastAnimationTime = undefined;
        }
    };

    public setHovered = (item: Item | undefined): void => {
        if (this.areSameItems(this.currentHoveredItem?.item, item)) {
            return;
        }

        if (this.currentHoveredItem !== undefined) {
            this.addToLeavingItems(this.currentHoveredItem);
        }

        if (item !== undefined) {
            const hoverAmount = this.removeFromLeavingItems(item);
            this.currentHoveredItem = {
                item,
                hoverAmount,
            };
        } else {
            this.currentHoveredItem = undefined;
        }

        if (this.lastAnimationTime === undefined) {
            window.requestAnimationFrame(this.step);
        }
    };
}
