/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useLayoutEffect, useState, useRef, MutableRefObject } from "react";

const createNotifier =
    (setSize: React.Dispatch<React.SetStateAction<ReactResizeDetectorDimensions>>) =>
    ({ width, height }: ReactResizeDetectorDimensions): void => {
        setSize(prev => {
            if (prev.width === width && prev.height === height) {
                // skip if dimensions haven't changed
                return prev;
            }

            return { width, height };
        });
    };

interface ReactResizeDetectorDimensions {
    height?: number;
    width?: number;
}

// TODO accept `parentSize` as optional argument
export function useResizeDetector<T extends HTMLElement = HTMLElement>(): UseResizeDetectorReturn<T> {
    const ref = useRef<T>(null);

    const [size, setSize] = useState<ReactResizeDetectorDimensions>({
        width: undefined,
        height: undefined,
    });

    useLayoutEffect(() => {
        const notifyResize = createNotifier(setSize);

        const resizeCallback: ResizeObserverCallback = entries => {
            for (const entry of entries) {
                const { width, height } = (entry && entry.contentRect) || {};
                notifyResize({ width, height });
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
