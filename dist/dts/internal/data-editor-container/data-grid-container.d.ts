import * as React from "react";
interface WrapperProps {
    inWidth: number | string;
    inHeight: number | string;
}
interface Props extends WrapperProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const DataEditorContainer: React.FunctionComponent<React.PropsWithChildren<Props>>;
export {};
