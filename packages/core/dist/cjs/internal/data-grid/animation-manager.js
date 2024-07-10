"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationManager = void 0;
const clamp_js_1 = __importDefault(require("lodash/clamp.js"));
const data_grid_lib_js_1 = require("./render/data-grid-lib.js");
const hoverTime = 80;
function easeOutCubic(x) {
    const x1 = x - 1;
    return x1 * x1 * x1 + 1;
}
class AnimationManager {
    callback;
    constructor(callback) {
        this.callback = callback;
    }
    currentHoveredItem = undefined;
    leavingItems = [];
    lastAnimationTime;
    addToLeavingItems = (item) => {
        const isAlreadyLeaving = this.leavingItems.some(i => (0, data_grid_lib_js_1.itemsAreEqual)(i.item, item.item));
        if (isAlreadyLeaving) {
            return;
        }
        this.leavingItems.push(item);
    };
    /**
     * @returns the hover amount of the item, if it was leaving (0 if not).
     */
    removeFromLeavingItems = (item) => {
        const leavingItem = this.leavingItems.find(e => (0, data_grid_lib_js_1.itemsAreEqual)(e.item, item));
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
                item.hoverAmount = (0, clamp_js_1.default)(item.hoverAmount - delta, 0, 1);
            }
            if (this.currentHoveredItem !== undefined) {
                this.currentHoveredItem.hoverAmount = (0, clamp_js_1.default)(this.currentHoveredItem.hoverAmount + delta, 0, 1);
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
        if ((0, data_grid_lib_js_1.itemsAreEqual)(this.currentHoveredItem?.item, item)) {
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
exports.AnimationManager = AnimationManager;
//# sourceMappingURL=animation-manager.js.map