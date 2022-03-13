import { AnimationManager, HoverValues } from "./animation-manager";

const OG_RAF = window.requestAnimationFrame;
const OG_CAF = window.cancelAnimationFrame;

describe("Animation manager", () => {
    beforeEach(() => {
        // Mock rAF with setTimeout. Not perfect by any means, but at least it mocks the asynchronicity.
        jest.useFakeTimers();

        window.requestAnimationFrame = f => {
            const timeoutID = setTimeout(() => {
                const timestamp = performance.now();
                f(timestamp);
            }, 0);
            return (timeoutID as unknown) as number;
        };

        window.cancelAnimationFrame = (rafID: number) => {
            clearTimeout(rafID);
        };
    });
    afterEach(() => {
        jest.useRealTimers();

        window.requestAnimationFrame = OG_RAF;
        window.cancelAnimationFrame = OG_CAF;
    });

    it("hovers an element from 0 to 1", async () => {
        // As we call the handler, keep track of all the hover amounts we were called with.
        // We can't use spy.mock.calls cause we're passing the same reference with different values
        // so all the calls see the last state of the hover values.
        const hoverAmountsInCallingOrder: number[] = [];
        const spy = jest.fn((hoverValues: HoverValues) => {
            hoverAmountsInCallingOrder.push(hoverValues[0].hoverAmount);
        });

        const manager = new AnimationManager(spy);

        manager.setHovered([1, 2]);
        expect(spy).not.toHaveBeenCalled();

        jest.runAllTimers();

        // Check that we called the handler with the right cell
        expect(spy).toHaveBeenCalledWith([{ item: [1, 2], hoverAmount: 1 }]);

        // Check that we called the handler many times. More than 20, idk.
        expect(hoverAmountsInCallingOrder.length).toBeGreaterThan(20);

        // Now check that each successive call yielded a greater hover amount.
        let previousHoverAmount = 0;
        for (const hoverAmount of hoverAmountsInCallingOrder) {
            expect(hoverAmount).toBeGreaterThan(previousHoverAmount);
            previousHoverAmount = hoverAmount;
        }
    });

    it("unhovers an element back to 0", async () => {
        // Don't track calls while setting up everything
        let trackCalls = false;
        const hoverAmountsInCallingOrder: number[] = [];
        const spy = jest.fn((hoverValues: HoverValues) => {
            if (trackCalls) {
                hoverAmountsInCallingOrder.push(hoverValues[0].hoverAmount);
            }
        });

        const manager = new AnimationManager(spy);

        manager.setHovered([1, 2]);
        jest.runAllTimers();

        // Make sure that the item is right, and that it hovered up to 1.
        expect(spy).toHaveBeenCalledWith([{ item: [1, 2], hoverAmount: 1 }]);

        trackCalls = true;

        manager.setHovered(undefined);
        jest.runAllTimers();

        expect(hoverAmountsInCallingOrder.length).toBeGreaterThan(20);

        let previousHoverAmount = 1;
        for (const hoverAmount of hoverAmountsInCallingOrder) {
            expect(hoverAmount).toBeLessThan(previousHoverAmount);
            previousHoverAmount = hoverAmount;
        }

        // Make sure the last call was done with 0 hover amount. We don't want to end up in a partially hovered state.
        const lastCallHoverAmount = hoverAmountsInCallingOrder[hoverAmountsInCallingOrder.length - 1];
        expect(lastCallHoverAmount).toBe(0);
    });

    it("Crossfades two items", async () => {
        type ItemsHoverAmount = { one: number; two: number };

        let trackCalls = false;
        const hoverAmountsInCallingOrder: ItemsHoverAmount[] = [];
        const spy = jest.fn((hoverValues: HoverValues) => {
            if (trackCalls) {
                const hoverForOne = hoverValues.find(item => item.item[0] === 1)?.hoverAmount ?? 0;
                const hoverForTwo = hoverValues.find(item => item.item[0] === 2)?.hoverAmount ?? 0;

                hoverAmountsInCallingOrder.push({
                    one: hoverForOne,
                    two: hoverForTwo,
                });
            }
        });

        const manager = new AnimationManager(spy);

        manager.setHovered([1, 1]);
        jest.runAllTimers();

        // Make sure that the first item is fully hovered, to start with
        expect(spy).toHaveBeenCalledWith([{ item: [1, 1], hoverAmount: 1 }]);

        trackCalls = true;

        manager.setHovered([2, 2]);
        jest.runAllTimers();

        // Check that we started with one > two
        const { one: startingOne, two: startingTwo } = hoverAmountsInCallingOrder[0];
        expect(startingOne).toBeGreaterThan(startingTwo);

        // Check that we ended with one < one
        const { one: lastOne, two: lastTwo } = hoverAmountsInCallingOrder[hoverAmountsInCallingOrder.length - 1];
        expect(lastOne).toBeLessThan(lastTwo);

        // Now check that both moved monotonically
        let previousOneHoverAmount = 1;
        let previousTwoHoverAmount = 0;
        for (const hoverAmount of hoverAmountsInCallingOrder) {
            const { one, two } = hoverAmount;
            expect(one).toBeLessThan(previousOneHoverAmount);
            previousOneHoverAmount = one;
            expect(two).toBeGreaterThan(previousTwoHoverAmount);
            previousTwoHoverAmount = two;
        }
    });
});
