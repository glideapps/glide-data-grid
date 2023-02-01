import React from "react";
import { assertNever } from "./common/support";
import {
    CustomCell,
    CustomRenderer,
    drawTextCell,
    GridCellKind,
    ProvideEditorCallback,
} from "@glideapps/glide-data-grid";

interface DatePickerCellProps {
    readonly kind: "date-picker-cell";
    readonly date: Date | undefined;
    readonly displayDate: string;
    readonly format: DateKind;
}

export type DateKind = "date" | "time" | "datetime-local";

export const formatValueForHTMLInput = (dateKind: DateKind, date: Date | undefined): string => {
    if (date === undefined) {
        return "";
    }
    switch (dateKind) {
        case "date":
            return date.toISOString().split("T")[0];
        case "datetime-local":
            return date.toISOString().replace("Z", "");
        case "time":
            return date.toISOString().split("T")[1].replace("Z", "");
        default:
            assertNever(dateKind);
    }
};

export type DatePickerCell = CustomCell<DatePickerCellProps>;

const Editor: ReturnType<ProvideEditorCallback<DatePickerCell>> = cell => {
    const cellData = cell.value.data;
    const { date, displayDate, format } = cellData;
    const value = formatValueForHTMLInput(format, cellData.date);

    return (
        <input
            required
            style={{ minHeight: 26, border: "none", outline: "none" }}
            type={format}
            value={value}
            autoFocus={true}
            onChange={event => {
                // handle when clear is clicked and value has been wiped
                if (event.target.value === "") {
                    try {
                        cell.onChange({
                            ...cell.value,
                            data: {
                                ...cell.value.data,
                                // attempt to reset to cached date
                                date: date !== undefined ? date : new Date(displayDate),
                            },
                        });
                    } catch (error) {
                        cell.onChange({
                            ...cell.value,
                            data: {
                                ...cell.value.data,
                                displayDate: String(error),
                            },
                        });
                    }
                } else {
                    cell.onChange({
                        ...cell.value,
                        data: {
                            ...cell.value.data,
                            // use valueAsNumber because valueAsDate is null for "datetime-local"
                            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#technical_summary
                            date: new Date(event.target.valueAsNumber) ?? cellData.date,
                        },
                    });
                }
            }}
        />
    );
};

const renderer: CustomRenderer<DatePickerCell> = {
    kind: GridCellKind.Custom,
    isMatch: (cell: CustomCell): cell is DatePickerCell => (cell.data as any).kind === "date-picker-cell",
    draw: (args, cell) => {
        const { displayDate } = cell.data;
        drawTextCell(args, displayDate, cell.contentAlign);
        return true;
    },
    provideEditor: () => ({
        editor: Editor,
    }),
    onPaste: (v, d) => {
        let newDate: Date | undefined;
        try {
            newDate = new Date(v);
        } catch {
            /* do nothing */
        }
        return {
            ...d,
            date: Number.isNaN(newDate) ? undefined : newDate,
        };
    },
};

export default renderer;
