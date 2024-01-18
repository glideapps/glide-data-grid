import * as React from "react";
import debounce from "lodash/debounce.js";
import type { GridMouseHeaderEventArgs } from '../data-grid/data-grid-types';

export function useEventListener<K extends keyof HTMLElementEventMap>(
    eventName: K,
    handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    element: HTMLElement | Window | null,
    passive: boolean,
    capture = false
) {
    // Create a ref that stores handler
    const savedHandler = React.useRef<(this: HTMLElement, ev: HTMLElementEventMap[K]) => any>();

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    savedHandler.current = handler;
    React.useEffect(
        () => {
            // Make sure element supports addEventListener
            if (element === null || element.addEventListener === undefined) return;
            const el = element as HTMLElement;

            // Create event listener that calls handler function stored in ref
            const eventListener = (event: HTMLElementEventMap[K]) => {
                savedHandler.current?.call(el, event);
            };

            el.addEventListener(eventName, eventListener, { passive, capture });

            // Remove event listener on cleanup
            return () => {
                el.removeEventListener(eventName, eventListener, { capture });
            };
        },
        [eventName, element, passive, capture] // Re-run if eventName or element changes
    );
}

export function whenDefined<T>(obj: any, result: T) {
    return obj === undefined ? undefined : result;
}

const PI = Math.PI;
export function degreesToRadians(degrees: number) {
    return (degrees * PI) / 180;
}

export const getSquareWidth = (maxSize: number, containerHeight: number, verticalPadding: number) => {
    const width = Math.min(maxSize, containerHeight - verticalPadding * 2);
    return width > 0 ? width : maxSize;
};

export const getSquareXPosFromAlign = (
    alignment: "left" | "center" | "right",
    containerX: number,
    containerWidth: number,
    horizontalPadding: number,
    squareWidth: number
) => {
    switch (alignment) {
        case "left":
            return Math.floor(containerX) + horizontalPadding + squareWidth / 2;
        case "center":
            return Math.floor(containerX + containerWidth / 2);
        case "right":
            return Math.floor(containerX + containerWidth) - horizontalPadding - squareWidth / 2;
    }
};

export const getSquareBB = (posX: number, posY: number, squareSideLength: number) => ({
    x1: posX - squareSideLength / 2,
    y1: posY - squareSideLength / 2,
    x2: posX + squareSideLength / 2,
    y2: posY + squareSideLength / 2,
});

type BoundingBox = { x1: number; y1: number; x2: number; y2: number };
export const pointIsWithinBB = (x: number, y: number, bb: BoundingBox) =>
    bb.x1 <= x && x <= bb.x2 && bb.y1 <= y && y <= bb.y2;

export interface SpriteProps {
    fgColor: string;
    bgColor: string;
}

export const EditPencil: React.FunctionComponent<Partial<SpriteProps>> = (props: Partial<SpriteProps>) => {
    const fg = props.fgColor ?? "currentColor";
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.7073 7.05029C7.87391 11.8837 10.4544 9.30322 6.03024 13.7273C5.77392 13.9836 5.58981 14.3071 5.50189 14.6587L4.52521 18.5655C4.38789 19.1148 4.88543 19.6123 5.43472 19.475L9.34146 18.4983C9.69313 18.4104 10.0143 18.2286 10.2706 17.9722L16.9499 11.2929"
                stroke={fg}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d="M20.4854 4.92901L19.0712 3.5148C18.2901 2.73375 17.0238 2.73375 16.2428 3.5148L14.475 5.28257C15.5326 7.71912 16.4736 8.6278 18.7176 9.52521L20.4854 7.75744C21.2665 6.97639 21.2665 5.71006 20.4854 4.92901Z"
                stroke={fg}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
};

export const Checkmark: React.FunctionComponent<Partial<SpriteProps>> = (props: Partial<SpriteProps>) => {
    const fg = props.fgColor ?? "currentColor";

    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19 6L10.3802 17L5.34071 11.8758"
                vectorEffect="non-scaling-stroke"
                stroke={fg}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export function useDebouncedMemo<T>(factory: () => T, deps: React.DependencyList | undefined, time: number): T {
    const [state, setState] = React.useState(factory);

    const mountedRef = React.useRef(true);
    React.useEffect(
        () => () => {
            mountedRef.current = false;
        },
        []
    );

    const debouncedSetState = React.useRef<typeof setState>(
        debounce(x => {
            if (mountedRef.current) {
                setState(x);
            }
        }, time)
    );

    React.useLayoutEffect(() => {
        if (mountedRef.current) {
            debouncedSetState.current(() => factory());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return state;
}

// Shamelessly inline direction to avoid conflicts with 1.0 and 2.0.
const rtlRange = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
const ltrRange =
    "A-Za-z\u00C0-\u00D6\u00D8-\u00F6" +
    "\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C" +
    "\uFE00-\uFE6F\uFEFD-\uFFFF";

/* eslint-disable no-misleading-character-class */
const rtl = new RegExp("^[^" + ltrRange + "]*[" + rtlRange + "]");
const ltr = new RegExp("^[^" + rtlRange + "]*[" + ltrRange + "]");
/* eslint-enable no-misleading-character-class */

export function direction(value: string): "rtl" | "ltr" | "neutral" {
    return rtl.test(value) ? "rtl" : ltr.test(value) ? "ltr" : "neutral";
}

let scrollbarWidthCache: number | undefined = undefined;
export function getScrollBarWidth(): number {
    if (scrollbarWidthCache !== undefined) return scrollbarWidthCache;
    const inner = document.createElement("p");
    inner.style.width = "100%";
    inner.style.height = "200px";

    const outer = document.createElement("div");
    outer.id = "testScrollbar";

    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.append(inner);

    document.body.append(outer);
    const w1 = inner.offsetWidth;
    outer.style.overflow = "scroll";
    let w2 = inner.offsetWidth;
    if (w1 === w2) {
        w2 = outer.clientWidth;
    }

    outer.remove();

    scrollbarWidthCache = w1 - w2;
    return scrollbarWidthCache;
}

// Dear future reader,
// This dumb hook is to make sure if the inputState changes, that effectively behaves like an instant "setState" call.
// This is useful in a wide variety of situations. I'm too dumb to know if this is a good idea or a really dumb one.
// I can't tell. It's like poes law but for code.
//
// I'm sorry.
const empty = Symbol();
export function useStateWithReactiveInput<T>(inputState: T): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
    // When [0] is not empty we will return it, [1] is always the last value we saw
    const inputStateRef = React.useRef<[T | typeof empty, T]>([empty, inputState]);
    if (inputStateRef.current[1] !== inputState) {
        // it changed, we must use thee!
        inputStateRef.current[0] = inputState;
    }
    inputStateRef.current[1] = inputState;

    const [state, setState] = React.useState(inputState);
    // crimes against humanity here
    const [, forceRender] = React.useState<{} | undefined>();
    const setStateOuter = React.useCallback<typeof setState>(nv => {
        // this takes care of the case where the inputState was set, then setState gets called again but back to what
        // the state was before the inputState changed. Since the useState effect wont trigger a render in this case
        // we need to be very naughty and force it to see the change. Technically this may not be needed some chunk of
        // the time (in fact most of it) but checking for it is likely to be more expensive than just over-doing it
        const s = inputStateRef.current[0];
        if (s !== empty) {
            nv = typeof nv === "function" ? (nv as (pv: T) => T)(s) : nv;
            if (nv === s) return; // they are setting it to what the inputState is anyway so we can just do nothing
        }
        if (s !== empty) forceRender({});
        setState(pv => {
            if (typeof nv === "function") {
                return (nv as (pv: T) => T)(s === empty ? pv : s);
            }
            return nv;
        });
        inputStateRef.current[0] = empty;
    }, []);

    const onEmpty = React.useCallback(() => {
        inputStateRef.current[0] = empty;
        forceRender({});
    }, []);

    return [inputStateRef.current[0] === empty ? state : inputStateRef.current[0], setStateOuter, onEmpty];
}

export const isColumnIconHovered = (
  args: GridMouseHeaderEventArgs,
  hoverParameterStart: number,
  hoverParameterEnd: number
): boolean => {
  const { width } = args.bounds;
  const { localEventX } = args;
  const hoverPosition = width - localEventX;
  return hoverPosition > hoverParameterStart && hoverPosition < hoverParameterEnd;
};
