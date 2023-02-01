import React from "react";
import { assertNever } from "../../../core/src/common/support";
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
    readonly dateKind: DateType;
}

export type DateType = "date" | "time" | "datetime-local";

export const formatValueForHTMLInput = (dateKind: DateType, date: Date): string => {
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
    const { date, displayDate, dateKind } = cellData;
    const cellDataDate =
        cellData.date ??
        // now as date with adjusted timezone to allow for displayDate to be correct
        new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    const value = formatValueForHTMLInput(dateKind, cellDataDate);

    return (
        <input
            required
            style={{ minHeight: 26, border: "none", outline: "none" }}
            type={dateKind}
            value={value}
            autoFocus={true}
            onChange={event => {
                // handle when clear is clicked and value has been wiped
                if (event.target.value === "") {
                    cell.onChange({
                        ...cell.value,
                        data: {
                            ...cell.value.data,
                            // attempt to reset to cached date
                            date: date !== undefined ? date : new Date(displayDate),
                        },
                    });
                } else {
                    cell.onChange({
                        ...cell.value,
                        data: {
                            ...cell.value.data,
                            // use valueAsNumber because valueAsDate is null for "datetime-local"
                            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#technical_summary
                            date: new Date(event.target.valueAsNumber) ?? cellDataDate,
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
