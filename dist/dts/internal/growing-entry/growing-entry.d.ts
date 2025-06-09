import * as React from "react";
import type { SelectionRange } from "../data-grid/data-grid-types.js";
interface Props extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    readonly placeholder?: string;
    readonly highlight: boolean;
    readonly altNewline?: boolean;
    readonly validatedSelection?: SelectionRange;
}
/** @category Renderers */
export declare const GrowingEntry: React.FunctionComponent<Props>;
export {};
