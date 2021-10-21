import * as React from "react";
import { ScrollRegionStyle } from "./scroll-region-style";
import AutoSizer from "react-virtualized-auto-sizer";

export interface ScrollRegionUpdateArgs {
    readonly clientWidth: number;
    readonly clientHeight: number;
    readonly scrollLeft: number;
    readonly scrollTop: number;
}

interface Props {
    readonly className?: string;
    readonly scrollHeight: number;
    readonly draggable: boolean;
    readonly clientHeight: number;
    readonly scrollWidth: number;
    readonly scrollToEnd?: boolean;
    readonly rightElementSticky?: boolean;
    readonly rightElement?: React.ReactNode;
    readonly style?: React.CSSProperties;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly update: (args: ScrollRegionUpdateArgs) => void;
}

const ScrollRegion: React.FunctionComponent<Props> = p => {
    const {
        className,
        scrollWidth,
        scrollHeight,
        style,
        children,
        update,
        scrollToEnd,
        clientHeight,
        scrollRef,
        draggable,
        rightElement,
        rightElementSticky = false,
    } = p;

    const innerStyle = React.useMemo<React.CSSProperties>(
        () => ({
            width: scrollWidth,
            height: scrollHeight,
            contain: "size paint layout",
        }),
        [scrollWidth, scrollHeight]
    );

    const scroller = React.useRef<HTMLDivElement | null>(null);

    const onScroll = React.useCallback(() => {
        const el = scroller.current;
        if (el === null) return;
        update({
            clientHeight: el.clientHeight,
            clientWidth: el.clientWidth,
            scrollLeft: Math.max(0, el.scrollLeft),
            scrollTop: Math.max(0, el.scrollTop),
        });
    }, [update]);

    React.useEffect(() => {
        const el = scroller.current;
        if (el === null || scrollToEnd !== true) return;

        el.scrollLeft = el.scrollWidth - el.clientWidth;
    }, [scrollToEnd]);

    const setRefs = React.useCallback(
        (instance: HTMLDivElement | null) => {
            scroller.current = instance;
            if (scrollRef !== undefined) {
                scrollRef.current = instance;
            }
        },
        [scrollRef]
    );

    const lastProps = React.useRef<{ width?: number; height?: number }>();

    const nomEvent = React.useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    return (
        <div style={style}>
            <AutoSizer>
                {(props: { width?: number; height?: number }) => {
                    if (props.width === 0 || props.height === 0) return null;
                    if (lastProps.current?.height !== props.height || lastProps.current?.width !== props.width) {
                        window.setTimeout(onScroll, 0);
                        lastProps.current = props;
                    }

                    return (
                        <ScrollRegionStyle>
                            <div className="dvn-underlay">{children}</div>
                            <div
                                ref={setRefs}
                                style={props}
                                draggable={draggable}
                                className={"dvn-scroller " + className}
                                onScroll={onScroll}>
                                <div className="dvn-scroll-inner">
                                    <div style={innerStyle} />
                                    {rightElement !== undefined && (
                                        <>
                                            <div className="dvn-spacer" />
                                            <div
                                                onMouseDown={nomEvent}
                                                onMouseUp={nomEvent}
                                                onMouseMove={nomEvent}
                                                style={{
                                                    height: props.height,
                                                    maxHeight: clientHeight,
                                                    position: "sticky",
                                                    top: 0,
                                                    marginBottom: -40,
                                                    right: rightElementSticky ? 0 : undefined,
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

export default ScrollRegion;
