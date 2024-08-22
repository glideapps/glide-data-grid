import { type MutableRefObject } from "react";
interface ReactResizeDetectorDimensions {
    height?: number;
    width?: number;
}
export declare function useResizeDetector<T extends HTMLElement = HTMLElement>(initialSize?: readonly [width: number, height: number]): UseResizeDetectorReturn<T>;
export interface UseResizeDetectorReturn<T> extends ReactResizeDetectorDimensions {
    ref: MutableRefObject<T | null>;
}
export {};
//# sourceMappingURL=resize-detector.d.ts.map