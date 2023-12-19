import { useEffect, useRef } from "react";

const useKineticScroll = (
    isEnabled: boolean,
    callback: () => void,
    targetScroller: React.MutableRefObject<HTMLDivElement | null>
) => {
    const rafId = useRef<number | null>(null);
    const isTouching = useRef<boolean | null>(null);
    const lastScrollPosition = useRef<number | null>(null);
    const sameCount = useRef(0);

    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    const scrollEl = targetScroller.current;

    useEffect(() => {
        const handleScroll = () => {
            if (isTouching.current === false) {
                const currentScrollPosition = scrollEl?.scrollTop ?? 0;
                if (lastScrollPosition.current === currentScrollPosition) {
                    if (sameCount.current > 3) {
                        // Scroll position hasn't changed, stop the animation frame
                        lastScrollPosition.current = null;
                        isTouching.current = null;
                        return;
                    } else {
                        sameCount.current++;
                    }
                } else {
                    sameCount.current = 0;
                }

                lastScrollPosition.current = currentScrollPosition;
                callbackRef.current();
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

        const endTouch = (event: TouchEvent) => {
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
