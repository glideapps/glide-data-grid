import * as React from "react";
import type { SelectionRange } from "../../data-grid/data-grid-types.js";
import type { NumberFormatValues } from "react-number-format/types/types.js";
interface Props {
    readonly value: number | undefined;
    readonly disabled?: boolean;
    readonly onChange: (values: NumberFormatValues) => void;
    readonly highlight: boolean;
    readonly validatedSelection?: SelectionRange;
    readonly fixedDecimals?: number;
    readonly allowNegative?: boolean;
    readonly thousandSeparator?: boolean | string;
    readonly decimalSeparator?: string;
}
declare const NumberOverlayEditor: React.FunctionComponent<Props>;
export default NumberOverlayEditor;
