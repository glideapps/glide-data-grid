"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutoscroll = void 0;
const react_1 = __importDefault(require("react"));
const maxPxPerMs = 2;
const msToFullSpeed = 1300;
function useAutoscroll(scrollDirection, scrollRef, onScroll) {
    const speedScalar = react_1.default.useRef(0);
    const [xDir, yDir] = scrollDirection ?? [0, 0];
    react_1.default.useEffect(() => {
        if (xDir === 0 && yDir === 0) {
            speedScalar.current = 0;
            return;
        }
        let cancelled = false;
        let lastTime = 0;
        const scrollFn = (curTime) => {
            if (cancelled)
                return;
            if (lastTime === 0) {
                lastTime = curTime;
            }
            else {
                const step = curTime - lastTime;
                speedScalar.current = Math.min(1, speedScalar.current + step / msToFullSpeed);
                const motion = speedScalar.current ** 1.618 * step * maxPxPerMs;
                scrollRef.current?.scrollBy(xDir * motion, yDir * motion);
                lastTime = curTime;
                onScroll?.();
            }
            window.requestAnimationFrame(scrollFn);
        };
        window.requestAnimationFrame(scrollFn);
        return () => {
            cancelled = true;
        };
    }, [scrollRef, xDir, yDir, onScroll]);
}
exports.useAutoscroll = useAutoscroll;
//# sourceMappingURL=use-autoscroll.js.map