import * as React from "react";
import { type Item } from "./data-grid-types.js";
import { CellSet } from "./cell-set.js";
import { packColRowToNumber, unpackNumberToColRow } from "../../common/render-state-provider.js";

export type EnqueueCallback = (item: Item) => void;

export function useAnimationQueue(draw: (items: CellSet) => void): EnqueueCallback {
    const queue = React.useRef<number[]>([]);
    const seq = React.useRef(0);
    const drawRef = React.useRef(draw);
    drawRef.current = draw;

    const loop = React.useCallback(() => {
        const requeue = () => window.requestAnimationFrame(fn);

        const fn = () => {
            const toDraw = queue.current.map(unpackNumberToColRow);

            queue.current = [];
            drawRef.current(new CellSet(toDraw));
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
            if (queue.current.length === 0) loop();
            const packed = packColRowToNumber(item[0], item[1]);
            if (queue.current.includes(packed)) return;
            queue.current.push(packed);
        },
        [loop]
    );
}
