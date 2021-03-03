import { isFirefox } from "../common/browser-detect";
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
    readonly scrollWidth: number;
    readonly scrollToEnd?: boolean;
    readonly style?: React.CSSProperties;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly update: (args: ScrollRegionUpdateArgs) => void;
}

const ScrollRegion: React.FunctionComponent<Props> = p => {
    const { className, scrollWidth, scrollHeight, style, children, update, scrollToEnd, scrollRef } = p;

    const innerStyle = React.useMemo<React.CSSProperties>(() => ({ width: scrollWidth, height: scrollHeight }), [
        scrollWidth,
        scrollHeight,
    ]);

    const scroller = React.useRef<HTMLDivElement | null>(null);

    const onScroll = React.useCallback(() => {
        const el = scroller.current;
        if (el === null) return;
        update({
            clientHeight: el.clientHeight - (isFirefox ? 4 : 0),
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
                                className={"dvn-scroller " + className}
                                onScroll={onScroll}>
                                <div className="dvn-scroll-inner" style={innerStyle} />
                            </div>
                        </ScrollRegionStyle>
                    );
                }}
            </AutoSizer>
        </div>
    );
};

export default ScrollRegion;
