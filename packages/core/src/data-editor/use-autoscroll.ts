import React from "react";
import type { GridMouseCellEventArgs } from "../data-grid/data-grid-types";

const maxPxPerMs = 2;
const msToFullSpeed = 3000;

export function useAutoscroll(
    scrollDirection: GridMouseCellEventArgs["scrollEdge"] | undefined,
    scrollRef: React.MutableRefObject<HTMLDivElement | null>
) {
    const speedScalar = React.useRef(0);
    const [xDir, yDir] = scrollDirection ?? [0, 0];
    React.useEffect(() => {
        if (xDir === 0 && yDir === 0) {
            speedScalar.current = 0;
            return;
        }

        let lastTime = 0;
        const scrollFn = (curTime: number) => {
            if (lastTime === 0) {
                lastTime = curTime;
            } else {
                const step = curTime - lastTime;
                speedScalar.current = Math.min(1, speedScalar.current + step / msToFullSpeed);
                const motion = speedScalar.current * step * maxPxPerMs;
                scrollRef.current?.scrollBy(xDir * motion, yDir * motion);
                lastTime = curTime;
            }
            t = window.requestAnimationFrame(scrollFn);
        };
        let t = window.requestAnimationFrame(scrollFn);
        return () => window.cancelAnimationFrame(t);
    }, [scrollRef, xDir, yDir]);
}
