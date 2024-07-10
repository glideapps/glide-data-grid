import { useEffect, useRef } from "react";
const useKineticScroll = (isEnabled, callback, targetScroller) => {
    const rafId = useRef(null);
    const isTouching = useRef(null);
    const lastScrollPosition = useRef(null);
    const sameCount = useRef(0);
    const callbackRef = useRef(callback);
    callbackRef.current = callback;
    const scrollEl = targetScroller.current;
    useEffect(() => {
        const handleScroll = () => {
            if (isTouching.current === false && scrollEl !== null) {
                const currentScrollPosition = [scrollEl.scrollLeft, scrollEl.scrollTop];
                if (lastScrollPosition.current?.[0] === currentScrollPosition[0] &&
                    lastScrollPosition.current?.[1] === currentScrollPosition[1]) {
                    if (sameCount.current > 10) {
                        // Scroll position hasn't changed, stop the animation frame
                        lastScrollPosition.current = null;
                        isTouching.current = null;
                        return;
                    }
                    else {
                        sameCount.current++;
                    }
                }
                else {
                    sameCount.current = 0;
                    callbackRef.current(currentScrollPosition[0], currentScrollPosition[1]);
                    lastScrollPosition.current = currentScrollPosition;
                }
                rafId.current = window.setTimeout(handleScroll, 1000 / 120);
            }
        };
        const startTouch = () => {
            isTouching.current = true;
            lastScrollPosition.current = null; // Reset last scroll position on touch start
            if (rafId.current !== null) {
                window.clearTimeout(rafId.current);
                rafId.current = null;
            }
        };
        const endTouch = (event) => {
            if (event.touches.length === 0) {
                // All touches have ended
                isTouching.current = false;
                sameCount.current = 0;
                rafId.current = window.setTimeout(handleScroll, 1000 / 120);
            }
        };
        if (isEnabled && scrollEl !== null) {
            const element = scrollEl;
            element.addEventListener("touchstart", startTouch);
            element.addEventListener("touchend", endTouch);
            return () => {
                element.removeEventListener("touchstart", startTouch);
                element.removeEventListener("touchend", endTouch);
                if (rafId.current !== null) {
                    window.clearTimeout(rafId.current);
                }
            };
        }
    }, [isEnabled, scrollEl]);
};
export default useKineticScroll;
//# sourceMappingURL=use-kinetic-scroll.js.map