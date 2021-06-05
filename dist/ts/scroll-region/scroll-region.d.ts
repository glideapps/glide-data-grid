import * as React from "react";
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
    readonly scrollWidth: number;
    readonly scrollToEnd?: boolean;
    readonly style?: React.CSSProperties;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly update: (args: ScrollRegionUpdateArgs) => void;
}
declare const ScrollRegion: React.FunctionComponent<Props>;
export default ScrollRegion;
//# sourceMappingURL=scroll-region.d.ts.map