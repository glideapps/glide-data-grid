import { styled } from "@linaria/react";
import type { Rectangle } from "..";
import * as React from "react";
import { useResizeDetector } from "../common/resize-detector";
import { browserIsSafari } from "../common/browser-detect";
import { useEventListener } from "../common/utils";

interface Props {
    readonly className?: string;
    readonly preventDiagonalScrolling?: boolean;
    readonly draggable: boolean;
    readonly paddingRight?: number;
    readonly paddingBottom?: number;
    readonly clientHeight: number;
    readonly scrollWidth: number;
    readonly scrollHeight: number;
    readonly scrollToEnd?: boolean;
    readonly initialSize?: readonly [width: number, height: number];
    readonly rightElementProps?: {
        readonly sticky?: boolean;
        readonly fill?: boolean;
    };
    readonly rightElement?: React.ReactNode;
    readonly minimap?: React.ReactNode;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly update: (region: Rectangle & { paddingRight: number }) => void;
}

const ScrollRegionStyle = styled.div<{ isSafari: boolean }>`
    .dvn-scroller {
        overflow: ${p => (p.isSafari ? "scroll" : "auto")};
        transform: translate3d(0, 0, 0);
    }

    .hidden {
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

    const cbTimer = React.useRef(0);
    useEventListener(
        "touchstart",
        React.useCallback(() => {
            window.clearTimeout(cbTimer.current);
            setHasTouches(true);
        }, []),
        window,
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
        window,
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
        scrollRef,
        scrollToEnd,
        initialSize,
        minimap,
    } = p;
    const padders: React.ReactNode[] = [];

    const rightElementSticky = rightElementProps?.sticky ?? false;
    const rightElementFill = rightElementProps?.fill ?? false;

    const offsetY = React.useRef(0);
    const lastScrollY = React.useRef(0);
    const scroller = React.useRef<HTMLDivElement | null>(null);

    const dpr = window.devicePixelRatio;

    React.useEffect(() => {
        const el = scroller.current;
        if (el === null || scrollToEnd !== true) return;

        el.scrollLeft = el.scrollWidth - el.clientWidth;
    }, [scrollToEnd]);

    const lastScrollPosition = React.useRef({
        scrollLeft: 0,
        scrollTop: 0,
        lockDirection: undefined as ScrollLock,
    });

    const rightWrapRef = React.useRef<HTMLDivElement | null>(null);

    const hasTouches = useTouchUpDelayed(200);
    const [isIdle, setIsIdle] = React.useState(true);
    const idleTimer = React.useRef(0);

    React.useEffect(() => {
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

    const onScroll = React.useCallback(() => {
        const el = scroller.current;
        if (el === null) return;

        let scrollTop = el.scrollTop;
        let scrollLeft = el.scrollLeft;
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

        const newY = scrollTop;
        const delta = lastScrollY.current - newY;
        const scrollableHeight = el.scrollHeight - el.clientHeight;
        lastScrollY.current = newY;

        if (
            scrollableHeight > 0 &&
            (Math.abs(delta) > 2000 || newY === 0 || newY === scrollableHeight) &&
            scrollHeight > el.scrollHeight + 5
        ) {
            const prog = newY / scrollableHeight;
            const recomputed = (scrollHeight - el.clientHeight) * prog;
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
            width: el.clientWidth - paddingRight,
            height: el.clientHeight - paddingBottom,
            paddingRight: rightWrapRef.current?.clientWidth ?? 0,
        });
    }, [paddingBottom, paddingRight, scrollHeight, update, preventDiagonalScrolling, hasTouches]);

    const onScrollRef = React.useRef(onScroll);
    onScrollRef.current = onScroll;

    const lastProps = React.useRef<{ width?: number; height?: number }>();

    const didFirstScroll = React.useRef(false);
    React.useEffect(() => {
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
    padders.push(<div key={key++} style={{ width: scrollWidth, height: 0 }} />);
    while (h < scrollHeight) {
        const toAdd = Math.min(5_000_000, scrollHeight - h);
        padders.push(<div key={key++} style={{ width: 0, height: toAdd }} />);
        h += toAdd;
    }

    const { ref, width, height } = useResizeDetector<HTMLDivElement>(initialSize);

    if (lastProps.current?.height !== height || lastProps.current?.width !== width) {
        window.setTimeout(() => onScrollRef.current(), 0);
        lastProps.current = { width, height };
    }

    if ((width ?? 0) === 0 || (height ?? 0) === 0) return <div ref={ref} />;

    return (
        <div ref={ref}>
            <ScrollRegionStyle isSafari={browserIsSafari.value}>
                {minimap}
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
                    onScroll={onScroll}>
                    <div className={"dvn-scroll-inner" + (rightElement === undefined ? " hidden" : "")}>
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
