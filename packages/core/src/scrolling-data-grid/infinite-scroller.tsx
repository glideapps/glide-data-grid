import { styled } from "../common/styles";
import type { Rectangle } from "..";
import * as React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { browserIsSafari } from "../common/browser-detect";

interface Props {
    readonly className?: string;
    readonly draggable: boolean;
    readonly paddingRight?: number;
    readonly paddingBottom?: number;
    readonly clientHeight: number;
    readonly scrollWidth: number;
    readonly scrollHeight: number;
    readonly scrollToEnd?: boolean;
    readonly rightElementSticky?: boolean;
    readonly rightElement?: React.ReactNode;
    readonly minimap?: React.ReactNode;
    readonly style?: React.CSSProperties;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly update: (region: Rectangle) => void;
}

export const ScrollRegionStyle = styled.div`
    .dvn-scroller {
        overflow: ${browserIsSafari ? "scroll" : "auto"};
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

export const InfiniteScroller: React.FC<Props> = p => {
    const {
        children,
        clientHeight,
        scrollHeight,
        scrollWidth,
        update,
        draggable,
        className,
        paddingBottom = 0,
        paddingRight = 0,
        rightElement,
        rightElementSticky = false,
        scrollRef,
        scrollToEnd,
        minimap,
        style,
    } = p;
    const padders: React.ReactNode[] = [];

    const offsetY = React.useRef(0);
    const lastScrollY = React.useRef(0);
    const scroller = React.useRef<HTMLDivElement | null>(null);

    const dpr = window.devicePixelRatio;

    React.useEffect(() => {
        const el = scroller.current;
        if (el === null || scrollToEnd !== true) return;

        el.scrollLeft = el.scrollWidth - el.clientWidth;
    }, [scrollToEnd]);

    const onScroll = React.useCallback(() => {
        const el = scroller.current;
        if (el === null) return;

        const newY = el.scrollTop;
        const delta = lastScrollY.current - newY;
        const scrollableHeight = el.scrollHeight - el.clientHeight;
        const maxFakeY = Math.max(0, scrollHeight - el.clientHeight);
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

        update({
            x: Math.max(0, el.scrollLeft),
            y: Math.min(maxFakeY, newY + offsetY.current),
            width: el.clientWidth - paddingRight,
            height: el.clientHeight - paddingBottom,
        });
    }, [paddingBottom, paddingRight, scrollHeight, update]);

    const onScrollRef = React.useRef(onScroll);
    onScrollRef.current = onScroll;

    const lastProps = React.useRef<{ width?: number; height?: number }>();

    const nomEvent = React.useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    React.useEffect(() => {
        onScroll();
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

    return (
        <div style={style}>
            <AutoSizer>
                {(props: { width?: number; height?: number }) => {
                    if (props.width === 0 || props.height === 0) return null;
                    if (lastProps.current?.height !== props.height || lastProps.current?.width !== props.width) {
                        window.setTimeout(() => onScrollRef.current(), 0);
                        lastProps.current = props;
                    }

                    return (
                        <ScrollRegionStyle>
                            {minimap}
                            <div className="dvn-underlay">{children}</div>
                            <div
                                ref={setRefs}
                                style={props}
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
                                            <div className="dvn-spacer" />
                                            <div
                                                onMouseDown={nomEvent}
                                                onMouseUp={nomEvent}
                                                onMouseMove={nomEvent}
                                                style={{
                                                    height: props.height,
                                                    maxHeight: clientHeight - Math.ceil(dpr % 1),
                                                    position: "sticky",
                                                    top: 0,
                                                    marginBottom: -40,
                                                    marginRight: paddingRight,
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
                    );
                }}
            </AutoSizer>
        </div>
    );
};
