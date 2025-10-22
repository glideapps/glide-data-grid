/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useLayoutEffect, useState, useRef } from "react";
export function useResizeDetector(initialSize) {
    const ref = useRef(null);
    const [size, setSize] = useState({
        width: initialSize?.[0],
        height: initialSize?.[1],
    });
    useLayoutEffect(() => {
        const resizeCallback = entries => {
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
//# sourceMappingURL=resize-detector.js.map