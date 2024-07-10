"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResizeDetector = void 0;
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const react_1 = require("react");
function useResizeDetector(initialSize) {
    const ref = (0, react_1.useRef)(null);
    const [size, setSize] = (0, react_1.useState)({
        width: initialSize?.[0],
        height: initialSize?.[1],
    });
    (0, react_1.useLayoutEffect)(() => {
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
exports.useResizeDetector = useResizeDetector;
//# sourceMappingURL=resize-detector.js.map