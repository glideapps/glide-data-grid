import * as React from "react";
interface StayOnScreen {
    ref: React.RefCallback<HTMLElement | null>;
    style: React.CSSProperties;
}
export declare function useStayOnScreen(): StayOnScreen;
export {};
