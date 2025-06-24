import { styled } from "@linaria/react";
import type { Rectangle } from "../../index.js";
import * as React from "react";
import { useResizeDetector } from "../../common/resize-detector.js";
import { browserIsSafari } from "../../common/browser-detect.js";
import { useEventListener } from "../../common/utils.js";
import useKineticScroll from "./use-kinetic-scroll.js";

interface Props {
    readonly children: React.ReactNode;
    readonly className?: string;
    readonly preventDiagonalScrolling?: boolean;
    readonly draggable: boolean;
    readonly paddingRight?: number;
    readonly paddingBottom?: number;
    readonly clientHeight: number;
    readonly scrollWidth: number;
    readonly scrollHeight: number;
    readonly initialSize?: readonly [width: number, height: number];
    readonly rightElementProps?: {
        readonly sticky?: boolean;
        readonly fill?: boolean;
    };
    readonly rightElement?: React.ReactNode;
    readonly kineticScrollPerfHack?: boolean;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly update: (region: Rectangle & { paddingRight: number }) => void;
}

const ScrollRegionStyle = styled.div<{ isSafari: boolean }>`
    .dvn-scroller {
        overflow: ${p => (p.isSafari ? "scroll" : "auto")};
        transform: translate3d(0, 0, 0);
    }

    .dvn-hidden {
        visibility: hidden;
    }

    .dvn-scroll-inner {
        display: flex;
        pointer-events: none;

        > * {
            flex-shrink: 0;
        }

        .dvn-spacer {
            flex-grow: 1;
        }

        .dvn-stack {
            display: flex;
            flex-direction: column;
        }
    }

    .dvn-underlay > * {
        position: absolute;
        left: 0;
        top: 0;
    }

    canvas {
        outline: none;

        * {
            height: 0;
        }
    }
`;

// Browser's maximum div height limit

const BROWSER_MAX_DIV_HEIGHT = 33_554_400;
// Maximum height of a single padder segment to avoid browser performance issues.
// Padders are invisible div elements that create the scrollable area in the DOM.
// They trick the browser into showing a scrollbar for the full virtual content height
// without actually rendering millions of rows. We create multiple smaller padders
// (max 5M pixels each) instead of one large padder to avoid browser performance issues.
// The actual grid content is absolutely positioned and rendered on top of these padders
// based on the current scroll position.
const MAX_PADDER_SEGMENT_HEIGHT = 5_000_000;

type ScrollLock = [undefined, number] | [number, undefined] | undefined;

function useTouchUpDelayed(delay: number): boolean {
    const [hasTouches, setHasTouches] = React.useState(false);

    const safeWindow = typeof window === "undefined" ? null : window;

    const cbTimer = React.useRef(0);

    useEventListener(
        "touchstart",
        React.useCallback(() => {
            window.clearTimeout(cbTimer.current);
            setHasTouches(true);
        }, []),
        safeWindow,
        true,
        false
    );

    useEventListener(
        "touchend",
        React.useCallback(
            e => {
                if (e.touches.length === 0) {
                    cbTimer.current = window.setTimeout(() => setHasTouches(false), delay);
                }
            },
            [delay]
        ),
        safeWindow,
        true,
        false
    );

    return hasTouches;
}

/**
 * InfiniteScroller provides virtual scrolling capabilities for the data grid.
 * It handles the mapping between DOM scroll positions and virtual scroll positions
 * when the content height exceeds browser limitations.
 *
 * Browser Limitations:
 * - Most browsers limit div heights to ~33.5 million pixels
 * - With large datasets (e.g., 100M rows × 31px = 3.1B pixels), we exceed this limit
 * - This component uses an offset-based approach to map the limited DOM scroll range
 *   to the full virtual scroll range
 */
export const InfiniteScroller: React.FC<Props> = p => {
    const {
        children,
        clientHeight,
        scrollHeight,
        scrollWidth,
        update,
        draggable,
        className,
        preventDiagonalScrolling = false,
        paddingBottom = 0,
        paddingRight = 0,
        rightElement,
        rightElementProps,
        kineticScrollPerfHack = false,
        scrollRef,
        initialSize,
    } = p;
    const padders: React.ReactNode[] = [];

    const rightElementSticky = rightElementProps?.sticky ?? false;
    const rightElementFill = rightElementProps?.fill ?? false;

    // Track the virtual scroll position directly for smooth scrolling
    const virtualScrollY = React.useRef(0);
    const lastScrollY = React.useRef(0);
    const scroller = React.useRef<HTMLDivElement | null>(null);

    const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio;
    const lastDpr = React.useRef(dpr);

    // Reset scroll tracking when device pixel ratio changes (e.g., browser zoom)
    React.useEffect(() => {
        if (lastDpr.current !== dpr) {
            virtualScrollY.current = 0;
            lastScrollY.current = 0;
            lastDpr.current = dpr;
            const el = scroller.current;
            if (el !== null) {
                onScrollRef.current(el.scrollLeft, el.scrollTop);
            }
        }
    }, [dpr]);

    const lastScrollPosition = React.useRef({
        scrollLeft: 0,
        scrollTop: 0,
        lockDirection: undefined as ScrollLock,
    });

    const rightWrapRef = React.useRef<HTMLDivElement | null>(null);

    const hasTouches = useTouchUpDelayed(200);
    const [isIdle, setIsIdle] = React.useState(true);
    const idleTimer = React.useRef(0);

    React.useLayoutEffect(() => {
        if (!isIdle || hasTouches || lastScrollPosition.current.lockDirection === undefined) return;
        const el = scroller.current;
        if (el === null) return;
        const [lx, ly] = lastScrollPosition.current.lockDirection;
        if (lx !== undefined) {
            el.scrollLeft = lx;
        } else if (ly !== undefined) {
            el.scrollTop = ly;
        }
        lastScrollPosition.current.lockDirection = undefined;
    }, [hasTouches, isIdle]);

    const onScroll = React.useCallback(
        (scrollLeft?: number, scrollTop?: number) => {
            const el = scroller.current;
            if (el === null) return;

            scrollTop = scrollTop ?? el.scrollTop;
            scrollLeft = scrollLeft ?? el.scrollLeft;
            const lastScrollTop = lastScrollPosition.current.scrollTop;
            const lastScrollLeft = lastScrollPosition.current.scrollLeft;

            const dx = scrollLeft - lastScrollLeft;
            const dy = scrollTop - lastScrollTop;

            if (
                hasTouches &&
                dx !== 0 &&
                dy !== 0 &&
                (Math.abs(dx) > 3 || Math.abs(dy) > 3) &&
                preventDiagonalScrolling &&
                lastScrollPosition.current.lockDirection === undefined
            ) {
                lastScrollPosition.current.lockDirection =
                    Math.abs(dx) < Math.abs(dy) ? [lastScrollLeft, undefined] : [undefined, lastScrollTop];
            }

            const lock = lastScrollPosition.current.lockDirection;

            scrollLeft = lock?.[0] ?? scrollLeft;
            scrollTop = lock?.[1] ?? scrollTop;
            lastScrollPosition.current.scrollLeft = scrollLeft;
            lastScrollPosition.current.scrollTop = scrollTop;

            const cWidth = el.clientWidth;
            const cHeight = el.clientHeight;

            const newY = scrollTop;
            const delta = lastScrollY.current - newY;
            const scrollableHeight = el.scrollHeight - cHeight;
            lastScrollY.current = newY;

            // Calculate the virtual Y position
            let virtualY: number;

            // When content height exceeds browser limits, use hybrid approach
            if (scrollableHeight > 0 && scrollHeight > el.scrollHeight + 5) {
                // For large jumps (scrollbar interaction) or edge positions,
                // recalculate position based on percentage
                if (Math.abs(delta) > 2000 || newY === 0 || newY === scrollableHeight) {
                    const scrollProgress = Math.max(0, Math.min(1, newY / scrollableHeight));
                    const virtualScrollableHeight = scrollHeight - cHeight;
                    virtualY = scrollProgress * virtualScrollableHeight;
                    // Update our tracked position for subsequent smooth scrolling
                    virtualScrollY.current = virtualY;
                } else {
                    // For smooth scrolling, apply the delta directly to virtual position
                    // This preserves 1:1 pixel movement for smooth scrolling
                    virtualScrollY.current -= delta;
                    virtualY = virtualScrollY.current;
                }
            } else {
                // Direct mapping when within browser limits
                virtualY = newY;
                virtualScrollY.current = virtualY;
            }

            // Ensure virtual Y is within valid bounds
            virtualY = Math.max(0, Math.min(virtualY, scrollHeight - cHeight));
            virtualScrollY.current = virtualY; // Keep tracked position in bounds too

            if (lock !== undefined) {
                window.clearTimeout(idleTimer.current);
                setIsIdle(false);
                idleTimer.current = window.setTimeout(() => setIsIdle(true), 200);
            }

            update({
                x: scrollLeft,
                y: virtualY,
                width: cWidth - paddingRight,
                height: cHeight - paddingBottom,
                paddingRight: rightWrapRef.current?.clientWidth ?? 0,
            });
        },
        [paddingBottom, paddingRight, scrollHeight, update, preventDiagonalScrolling, hasTouches]
    );

    useKineticScroll(kineticScrollPerfHack && browserIsSafari.value, onScroll, scroller);

    const onScrollRef = React.useRef(onScroll);
    onScrollRef.current = onScroll;

    const lastProps = React.useRef<{ width?: number; height?: number }>();

    const didFirstScroll = React.useRef(false);
    // if this is not a layout effect there will be a flicker when changing the number of freezeColumns
    // we need to document what this is needed at all.
    React.useLayoutEffect(() => {
        if (didFirstScroll.current) onScroll();
        else didFirstScroll.current = true;
    }, [onScroll, paddingBottom, paddingRight]);

    const setRefs = React.useCallback(
        (instance: HTMLDivElement | null) => {
            scroller.current = instance;
            if (scrollRef !== undefined) {
                scrollRef.current = instance;
            }
        },
        [scrollRef]
    );

    let key = 0;
    let h = 0;

    // Ensure we don't create padders that exceed browser limits
    const effectiveScrollHeight = Math.min(scrollHeight, BROWSER_MAX_DIV_HEIGHT);

    padders.push(<div key={key++} style={{ width: scrollWidth, height: 0 }} />);
    while (h < effectiveScrollHeight) {
        const toAdd = Math.min(MAX_PADDER_SEGMENT_HEIGHT, effectiveScrollHeight - h);
        padders.push(<div key={key++} style={{ width: 0, height: toAdd }} />);
        h += toAdd;
    }

    const { ref, width, height } = useResizeDetector<HTMLDivElement>(initialSize);

    if (typeof window !== "undefined" && (lastProps.current?.height !== height || lastProps.current?.width !== width)) {
        window.setTimeout(() => onScrollRef.current(), 0);
        lastProps.current = { width, height };
    }

    if ((width ?? 0) === 0 || (height ?? 0) === 0) return <div ref={ref} />;

    return (
        <div ref={ref}>
            <ScrollRegionStyle isSafari={browserIsSafari.value}>
                <div className="dvn-underlay">{children}</div>
                <div
                    ref={setRefs}
                    style={lastProps.current}
                    draggable={draggable}
                    onDragStart={e => {
                        if (!draggable) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    }}
                    className={"dvn-scroller " + (className ?? "")}
                    onScroll={() => onScroll()}>
                    <div className={"dvn-scroll-inner" + (rightElement === undefined ? " dvn-hidden" : "")}>
                        <div className="dvn-stack">{padders}</div>
                        {rightElement !== undefined && (
                            <>
                                {!rightElementFill && <div className="dvn-spacer" />}
                                <div
                                    ref={rightWrapRef}
                                    style={{
                                        height,
                                        maxHeight: clientHeight - Math.ceil(dpr % 1),
                                        position: "sticky",
                                        top: 0,
                                        paddingLeft: 1,
                                        marginBottom: -40,
                                        marginRight: paddingRight,
                                        flexGrow: rightElementFill ? 1 : undefined,
                                        right: rightElementSticky ? (paddingRight ?? 0) : undefined,
                                        pointerEvents: "auto",
                                    }}>
                                    {rightElement}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </ScrollRegionStyle>
        </div>
    );
};
