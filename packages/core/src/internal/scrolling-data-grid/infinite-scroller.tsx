import { styled } from "@linaria/react";
import type { Rectangle } from "../../index.js";
import * as React from "react";
import { useResizeDetector } from "../../common/resize-detector.js";
import { browserIsSafari } from "../../common/browser-detect.js";
import { useEventListener } from "../../common/utils.js";
import useKineticScroll from "./use-kinetic-scroll.js";

interface Props {
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
    readonly scrollRef?: (el: HTMLDivElement | null) => void;
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

    const offsetY = React.useRef(0);
    const lastScrollY = React.useRef(0);
    const scroller = React.useRef<HTMLDivElement | null>(null);

    const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio;

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

            if (
                scrollableHeight > 0 &&
                (Math.abs(delta) > 2000 || newY === 0 || newY === scrollableHeight) &&
                scrollHeight > el.scrollHeight + 5
            ) {
                const prog = newY / scrollableHeight;
                const recomputed = (scrollHeight - cHeight) * prog;
                offsetY.current = recomputed - newY;
            }

            if (lock !== undefined) {
                window.clearTimeout(idleTimer.current);
                setIsIdle(false);
                idleTimer.current = window.setTimeout(() => setIsIdle(true), 200);
            }

            update({
                x: scrollLeft,
                y: newY + offsetY.current,
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
                scrollRef(instance);
            }
        },
        [scrollRef]
    );

    let key = 0;
    let h = 0;
    padders.push(<div key={key++} style={{ width: scrollWidth, height: 0 }} />);
    while (h < scrollHeight) {
        const toAdd = Math.min(5_000_000, scrollHeight - h);
        padders.push(<div key={key++} style={{ width: 0, height: toAdd }} />);
        h += toAdd;
    }

    const { ref, width, height } = useResizeDetector<HTMLDivElement>(initialSize);

    // this is done so that the visible region gets updated in the DataEditor any time the size changes
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
                                        right: rightElementSticky ? paddingRight ?? 0 : undefined,
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
