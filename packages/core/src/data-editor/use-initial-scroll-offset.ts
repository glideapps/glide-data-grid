import * as React from "react";
import type { VisibleRegion } from "./visible-region.js";
import type { DataEditorCoreProps } from "../index.js";
import { useStateWithReactiveInput } from "../common/utils.js";

function useCallbackRef<T>(initialValue: T, callback: (newVal: T) => void) {
    const realRef = React.useRef<T>(initialValue);
    const cbRef = React.useRef(callback);
    cbRef.current = callback;

    return React.useMemo(
        () => ({
            get current() {
                return realRef.current;
            },
            set current(value: T) {
                if (realRef.current !== value) {
                    realRef.current = value;
                    cbRef.current(value);
                }
            },
        }),
        []
    );
}

export function useInitialScrollOffset(
    scrollOffsetX: number | undefined,
    scrollOffsetY: number | undefined,
    rowHeight: NonNullable<DataEditorCoreProps["rowHeight"]>,
    visibleRegionRef: React.MutableRefObject<VisibleRegion>,
    onDidScroll: () => void
) {
    const [visibleRegionY, visibleRegionTy] = React.useMemo(() => {
        return [
            scrollOffsetY !== undefined && typeof rowHeight === "number" ? Math.floor(scrollOffsetY / rowHeight) : 0,
            scrollOffsetY !== undefined && typeof rowHeight === "number" ? -(scrollOffsetY % rowHeight) : 0,
        ];
    }, [scrollOffsetY, rowHeight]);

    const visibleRegionInput = React.useMemo<VisibleRegion>(
        () => ({
            x: visibleRegionRef.current.x,
            y: visibleRegionY,
            width: visibleRegionRef.current.width ?? 1,
            height: visibleRegionRef.current.height ?? 1,
            // tx: 'TODO',
            ty: visibleRegionTy,
        }),
        [visibleRegionRef, visibleRegionTy, visibleRegionY]
    );

    const [visibleRegion, setVisibleRegion, empty] = useStateWithReactiveInput<VisibleRegion>(visibleRegionInput);

    const onDidScrollRef = React.useRef(onDidScroll);
    onDidScrollRef.current = onDidScroll;

    const scrollRef = useCallbackRef<HTMLDivElement | null>(null, newVal => {
        if (newVal !== null && scrollOffsetY !== undefined) {
            newVal.scrollTop = scrollOffsetY;
        } else if (newVal !== null && scrollOffsetX !== undefined) {
            newVal.scrollLeft = scrollOffsetX;
        }
    });

    const vScrollReady = (visibleRegion.height ?? 1) > 1;
    React.useLayoutEffect(() => {
        if (scrollOffsetY !== undefined && scrollRef.current !== null && vScrollReady) {
            if (scrollRef.current.scrollTop === scrollOffsetY) return;
            scrollRef.current.scrollTop = scrollOffsetY;
            if (scrollRef.current.scrollTop !== scrollOffsetY) {
                empty();
            }
            onDidScrollRef.current();
        }
    }, [scrollOffsetY, vScrollReady, empty, scrollRef]);

    const hScrollReady = (visibleRegion.width ?? 1) > 1;
    React.useLayoutEffect(() => {
        if (scrollOffsetX !== undefined && scrollRef.current !== null && hScrollReady) {
            if (scrollRef.current.scrollLeft === scrollOffsetX) return;
            scrollRef.current.scrollLeft = scrollOffsetX;
            if (scrollRef.current.scrollLeft !== scrollOffsetX) {
                empty();
            }
            onDidScrollRef.current();
        }
    }, [scrollOffsetX, hScrollReady, empty, scrollRef]);

    return {
        visibleRegion,
        setVisibleRegion,
        scrollRef,
    };
}
