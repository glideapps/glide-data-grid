import clamp from "lodash/clamp";

type Item = readonly [number, number | undefined];
type StateItem = { item: Item; hoverAmount: number };
export type HoverValues = readonly Readonly<StateItem>[];
export type StepCallback = (values: HoverValues) => void;

const hoverTime = 150;

export class AnimationManager {
    constructor(private callback: StepCallback) {}

    private state: StateItem[] = [];
    private hoveredItem: Item | undefined;
    private lastAnimationTime = 0;

    private areSame(left: Item | undefined, right: Item | undefined) {
        return left?.[0] === right?.[0] && left?.[1] === right?.[1];
    }

    private indexOf(item: Item): number {
        return this.state.findIndex(x => x.item[0] === item[0] && x.item[1] === item[1]);
    }

    private step = (timestamp: number): void => {
        if (this.lastAnimationTime === 0) {
            this.lastAnimationTime = timestamp;
        } else {
            const step = timestamp - this.lastAnimationTime;
            const delta = step / hoverTime;

            for (const s of this.state) {
                const scalar = this.areSame(this.hoveredItem, s.item) ? 1 : -1;
                s.hoverAmount = clamp(s.hoverAmount + delta * scalar, 0, 1);
            }

            this.callback(this.state);

            this.state = this.state.filter(s => s.hoverAmount > 0);
        }
        if (this.state.length > 0) {
            window.requestAnimationFrame(this.step);
            this.lastAnimationTime = timestamp;
        } else {
            this.lastAnimationTime = 0;
        }
    };

    private startAnimationIfNeeded() {
        if (this.lastAnimationTime !== 0 && this.state.length > 0) return;

        window.requestAnimationFrame(this.step);
    }

    public setHovered(item: Item | undefined): void {
        this.hoveredItem = item;
        if (item !== undefined) {
            const index = this.indexOf(item);
            if (index === -1) {
                this.state.push({
                    item,
                    hoverAmount: 0,
                });
            }
        }

        this.startAnimationIfNeeded();
    }
}
