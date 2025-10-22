import clamp from "lodash/clamp.js";
import { itemsAreEqual } from "./render/data-grid-lib.js";
const hoverTime = 80;
function easeOutCubic(x) {
    const x1 = x - 1;
    return x1 * x1 * x1 + 1;
}
export class AnimationManager {
    callback;
    constructor(callback) {
        this.callback = callback;
    }
    currentHoveredItem = undefined;
    leavingItems = [];
    lastAnimationTime;
    addToLeavingItems = (item) => {
        const isAlreadyLeaving = this.leavingItems.some(i => itemsAreEqual(i.item, item.item));
        if (isAlreadyLeaving) {
            return;
        }
        this.leavingItems.push(item);
    };
    /**
     * @returns the hover amount of the item, if it was leaving (0 if not).
     */
    removeFromLeavingItems = (item) => {
        const leavingItem = this.leavingItems.find(e => itemsAreEqual(e.item, item));
        this.leavingItems = this.leavingItems.filter(i => i !== leavingItem);
        return leavingItem?.hoverAmount ?? 0;
    };
    cleanUpLeavingElements = () => {
        this.leavingItems = this.leavingItems.filter(i => i.hoverAmount > 0);
    };
    shouldStep = () => {
        const hasLeavingItems = this.leavingItems.length > 0;
        const currentHoveredIsAnimating = this.currentHoveredItem !== undefined && this.currentHoveredItem.hoverAmount < 1;
        return hasLeavingItems || currentHoveredIsAnimating;
    };
    getAnimatingItems = () => {
        // this is horrible. We shoudl be mutating the array in place. The reason we don't right now is because the
        // hoveramount is used as both the tweened value and the raw value. We should separate these two things.
        // Then we can stop doing the allocation insanity dance.
        if (this.currentHoveredItem !== undefined) {
            return [...this.leavingItems, this.currentHoveredItem];
        }
        return this.leavingItems.map(x => ({ ...x, hoverAmount: easeOutCubic(x.hoverAmount) }));
    };
    step = (timestamp) => {
        if (this.lastAnimationTime === undefined) {
            this.lastAnimationTime = timestamp;
        }
        else {
            const step = timestamp - this.lastAnimationTime;
            const delta = step / hoverTime;
            for (const item of this.leavingItems) {
                item.hoverAmount = clamp(item.hoverAmount - delta, 0, 1);
            }
            if (this.currentHoveredItem !== undefined) {
                this.currentHoveredItem.hoverAmount = clamp(this.currentHoveredItem.hoverAmount + delta, 0, 1);
            }
            const animating = this.getAnimatingItems();
            this.callback(animating);
            this.cleanUpLeavingElements();
        }
        if (this.shouldStep()) {
            this.lastAnimationTime = timestamp;
            window.requestAnimationFrame(this.step);
        }
        else {
            this.lastAnimationTime = undefined;
        }
    };
    setHovered = (item) => {
        if (itemsAreEqual(this.currentHoveredItem?.item, item)) {
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
        }
        else {
            this.currentHoveredItem = undefined;
        }
        if (this.lastAnimationTime === undefined) {
            window.requestAnimationFrame(this.step);
        }
    };
}
//# sourceMappingURL=animation-manager.js.map