import * as React from "react";
export declare function useEventListener<K extends keyof HTMLElementEventMap>(eventName: K, handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, element: HTMLElement | Window | Document | null, passive: boolean, capture?: boolean): void;
export declare function whenDefined<T>(obj: any, result: T): T | undefined;
export declare function degreesToRadians(degrees: number): number;
export declare const getSquareBB: (posX: number, posY: number, squareSideLength: number) => {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
export declare const getSquareXPosFromAlign: (alignment: "left" | "center" | "right", containerX: number, containerWidth: number, horizontalPadding: number, squareWidth: number) => number;
export declare const getSquareWidth: (maxSize: number, containerHeight: number, verticalPadding: number) => number;
type BoundingBox = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
export declare const pointIsWithinBB: (x: number, y: number, bb: BoundingBox) => boolean;
/**
 * The input provided to a sprite function.
 *
 * @category Columns
 */
export interface SpriteProps {
    fgColor: string;
    bgColor: string;
}
export declare const EditPencil: React.FunctionComponent<Partial<SpriteProps>>;
export declare const Checkmark: React.FunctionComponent<Partial<SpriteProps>>;
export declare function useDebouncedMemo<T>(factory: () => T, deps: React.DependencyList | undefined, time: number): T;
export declare function direction(value: string): "rtl" | "not-rtl";
export declare function getScrollBarWidth(): number;
export declare function useStateWithReactiveInput<T>(inputState: T): [T, React.Dispatch<React.SetStateAction<T>>, () => void];
export declare function makeAccessibilityStringForArray(arr: readonly string[]): string;
export declare function useDeepMemo<T>(value: T): T;
export {};
