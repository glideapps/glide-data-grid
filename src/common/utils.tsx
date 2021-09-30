import * as React from "react";
import { css } from "styled-components";
import debounce from "lodash/debounce";

export function useEventListener<K extends keyof HTMLElementEventMap>(
    eventName: K,
    handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    element: HTMLElement | Window | null,
    passive: boolean,
    capture?: boolean
) {
    capture = capture ?? false;
    // Create a ref that stores handler
    const savedHandler = React.useRef<(this: HTMLElement, ev: HTMLElementEventMap[K]) => any>();

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    React.useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

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
const PI = Math.PI;
export function degreesToRadians(degrees: number) {
    return (degrees * PI) / 180;
}

export interface IconProps {
    fgColor?: string;
    bgColor?: string;
    accentColor?: string;
}

export const disabledProps = css`
    opacity: 0.4;
    pointer-events: none;
`;

export const EditPencil: React.FunctionComponent<IconProps> = (props: IconProps) => {
    const fg = props.fgColor ?? "currentColor";
    const bg = props.bgColor ?? "#ffffff";
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill={bg} id="icon-import" xmlns="http://www.w3.org/2000/svg">
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

export const Checkmark: React.FunctionComponent<IconProps> = (props: IconProps) => {
    const fg = props.fgColor ?? "currentColor";
    // const bg = props.bgColor ?? "#ffffff";

    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" id="icon-import" xmlns="http://www.w3.org/2000/svg">
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
    const [state, setState] = React.useState(factory());

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSetState = React.useCallback(debounce(setState, time), []);

    React.useEffect(() => {
        debouncedSetState(factory());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return state;
}
