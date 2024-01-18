import * as React from "react";
import type { Item } from "./data-grid-types";

function hasItem(arr: readonly Item[], item: Item) {
    for (const element of arr) {
        if (element[0] === item[0] && element[1] === item[1]) return true;
    }
    return false;
}

export function useAnimationQueue(draw: (items: readonly Item[]) => void) {
    const queue = React.useRef<Item[]>([]);
    const seq = React.useRef(0);
    const drawRef = React.useRef(draw);
    drawRef.current = draw;

    const loop = React.useCallback(() => {
        const requeue = () => window.requestAnimationFrame(fn);

        const fn = () => {
            const toDraw = queue.current;
            queue.current = [];
            drawRef.current(toDraw);
            if (queue.current.length > 0) {
                seq.current++;
            } else {
                seq.current = 0;
            }
        };

        window.requestAnimationFrame(seq.current > 600 ? requeue : fn);
    }, []);

    return React.useCallback(
        (item: Item) => {
            if (hasItem(queue.current, item)) return;
            if (queue.current.length === 0) {
                loop();
            }
            queue.current.push(item);
        },
        [loop]
    );
}
