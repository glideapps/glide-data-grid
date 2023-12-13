import { useEffect, useRef } from "react";

const useKineticScroll = (
    isEnabled: boolean,
    callback: () => void,
    targetScroller: React.MutableRefObject<HTMLDivElement | null>
) => {
    const rafId = useRef<number | null>(null);
    const isTouching = useRef(false);
    const lastScrollPosition = useRef<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!isTouching.current) {
                const currentScrollPosition = targetScroller.current?.scrollTop ?? 0;
                if (lastScrollPosition.current === currentScrollPosition) {
                    // Scroll position hasn't changed, stop the animation frame
                    lastScrollPosition.current = null;
                    return;
                }

                lastScrollPosition.current = currentScrollPosition;
                callback();
                rafId.current = requestAnimationFrame(handleScroll);
            }
        };

        const startTouch = () => {
            isTouching.current = true;
            lastScrollPosition.current = null; // Reset last scroll position on touch start
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current);
                rafId.current = null;
            }
        };

        const endTouch = (event: TouchEvent) => {
            if (event.touches.length === 0) {
                // All touches have ended
                isTouching.current = false;
                rafId.current = requestAnimationFrame(handleScroll);
            }
        };

        if (isEnabled && targetScroller.current !== null) {
            const element = targetScroller.current;
            element.addEventListener("touchstart", startTouch);
            element.addEventListener("touchend", endTouch);
            element.addEventListener("scroll", handleScroll, { passive: true });

            return () => {
                element.removeEventListener("touchstart", startTouch);
                element.removeEventListener("touchend", endTouch);
                element.removeEventListener("scroll", handleScroll);
                if (rafId.current !== null) {
                    cancelAnimationFrame(rafId.current);
                }
            };
        }
    }, [isEnabled, targetScroller, callback]);
};

export default useKineticScroll;
