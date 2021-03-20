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
                el.removeEventListener(eventName, eventListener);
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
    const bg = props.bgColor ?? "currentColor";
    const fg = props.fgColor ?? "#ffffff";
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" fill={bg} />
            <path
                d="M4.25 10.1874V11.7499H5.8125L10.4208 7.14161L8.85833 5.57911L4.25 10.1874ZM11.6292 5.93328C11.7917 5.77078 11.7917 5.50828 11.6292 5.34578L10.6542 4.37078C10.4917 4.20828 10.2292 4.20828 10.0667 4.37078L9.30417 5.13328L10.8667 6.69578L11.6292 5.93328V5.93328Z"
                fill={fg}
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
