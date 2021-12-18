import clamp from "lodash/clamp";
import { Item } from "./data-grid-types";

type StateItem = { item: Item; hoverAmount: number };
export type HoverValues = readonly Readonly<StateItem>[];
export type StepCallback = (values: HoverValues) => void;

const hoverTime = 80;
const epsilon = 1e-6;

// Ported from webkit
class Easing {
    private ax = 0;
    private ay = 0;
    private bx = 0;
    private by = 0;
    private cx = 0;
    private cy = 0;
    constructor(p1x: number, p1y: number, p2x: number, p2y: number) {
        this.cx = 3.0 * p1x;
        this.bx = 3.0 * (p2x - p1x) - this.cx;
        this.ax = 1.0 - this.cx - this.bx;

        this.cy = 3.0 * p1y;
        this.by = 3.0 * (p2y - p1y) - this.cy;
        this.ay = 1.0 - this.cy - this.by;
    }

    private sampleCurveX(t: number) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    }

    private sampleCurveY(t: number) {
        return ((this.ay * t + this.by) * t + this.cy) * t;
    }

    private sampleCurveDerivativeX(t: number) {
        return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
    }

    private solveCurveX(x: number) {
        let t0: number;
        let t1: number;
        let t2: number;
        let x2: number;
        let d2: number;
        let i: number;

        // First try a few iterations of Newton's method -- normally very fast.
        for (t2 = x, i = 0; i < 8; i++) {
            x2 = this.sampleCurveX(t2) - x;
            if (Math.abs(x2) < epsilon) return t2;
            d2 = this.sampleCurveDerivativeX(t2);
            if (Math.abs(d2) < epsilon) break;
            t2 = t2 - x2 / d2;
        }

        // No solution found - use bi-section
        t0 = 0.0;
        t1 = 1.0;
        t2 = x;

        if (t2 < t0) return t0;
        if (t2 > t1) return t1;

        while (t0 < t1) {
            x2 = this.sampleCurveX(t2);
            if (Math.abs(x2 - x) < epsilon) return t2;
            if (x > x2) t0 = t2;
            else t1 = t2;

            t2 = (t1 - t0) * 0.5 + t0;
        }

        // Give up
        return t2;
    }

    public solve(x: number) {
        return this.sampleCurveY(this.solveCurveX(x));
    }
}

export const ease = new Easing(0.25, 0.1, 0.25, 1);
// const easeIn = new Easing(0.42, 0, 1, 1);
// const easeOut = new Easing(0, 0, 0.58, 1);
// const easeInOut = new Easing(0.42, 0, 0.58, 1);

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

    private getAnimatingItems = (): StateItem[] => {
        if (this.currentHoveredItem !== undefined) {
            return [...this.leavingItems, this.currentHoveredItem];
        }
        return this.leavingItems.map(x => ({ ...x, hoverAmount: ease.solve(x.hoverAmount) }));
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

            const animating = this.getAnimatingItems();
            this.callback(animating);

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
