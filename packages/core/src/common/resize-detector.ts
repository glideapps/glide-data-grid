/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useLayoutEffect, useState, useRef, type MutableRefObject } from "react";
interface ReactResizeDetectorDimensions {
    height?: number;
    width?: number;
}

export function useResizeDetector<T extends HTMLElement = HTMLElement>(
    initialSize?: readonly [width: number, height: number]
): UseResizeDetectorReturn<T> {
    const ref = useRef<T>(null);

    const [size, setSize] = useState<ReactResizeDetectorDimensions>({
        width: initialSize?.[0],
        height: initialSize?.[1],
    });

    useLayoutEffect(() => {
        const resizeCallback: ResizeObserverCallback = entries => {
            for (const entry of entries) {
                const { width, height } = (entry && entry.contentRect) || {};
                setSize(cv => (cv.width === width && cv.height === height ? cv : { width, height }));
            }
        };

        const resizeObserver = new window.ResizeObserver(resizeCallback);

        if (ref.current) {
            resizeObserver.observe(ref.current, undefined);
        }

        return () => {
            resizeObserver.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current]);

    return { ref, ...size };
}

export interface UseResizeDetectorReturn<T> extends ReactResizeDetectorDimensions {
    ref: MutableRefObject<T | null>;
}
