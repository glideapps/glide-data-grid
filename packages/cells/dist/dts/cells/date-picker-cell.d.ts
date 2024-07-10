import React from "react";
import { type CustomCell, type CustomRenderer } from "@glideapps/glide-data-grid";
export declare const StyledInputBox: import("@linaria/react").StyledComponent<React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement> & Record<never, unknown>>;
export interface DatePickerCellProps {
    readonly kind: "date-picker-cell";
    readonly date: Date | undefined | null;
    readonly displayDate: string;
    readonly format: DateKind;
    readonly timezoneOffset?: number;
    readonly min?: string | Date;
    readonly max?: string | Date;
    readonly step?: string;
}
export type DateKind = "date" | "time" | "datetime-local";
export declare const formatValueForHTMLInput: (dateKind: DateKind, date: Date | undefined | null) => string;
export type DatePickerCell = CustomCell<DatePickerCellProps>;
declare const renderer: CustomRenderer<DatePickerCell>;
export default renderer;
//# sourceMappingURL=date-picker-cell.d.ts.map