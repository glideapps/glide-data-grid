import * as React from "react";
import { CustomCell, AdditionalRenderer, drawTextCell, GridCellKind } from "@glideapps/glide-data-grid";

interface DatePickerCellProps {
    readonly kind: "date-picker-cell";
    readonly date: Date | undefined;
    readonly displayDate: string;
    readonly format: "date" | "datetime-local";
}

export type DatePickerCell = CustomCell<DatePickerCellProps>;

const renderer: AdditionalRenderer<DatePickerCell> = {
    kind: GridCellKind.Custom,
    isMatch: (cell: CustomCell): cell is DatePickerCell => (cell.data as any).kind === "date-picker-cell",
    draw: (args, cell) => {
        const { displayDate } = cell.data;
        drawTextCell(args, displayDate, cell.contentAlign);
        return true;
    },
    // eslint-disable-next-line react/display-name
    provideEditor: () => p => {
        const cellData = p.value.data;
        const { format, date } = cellData;

        let val = "";
        if (date !== undefined) {
            val = date.toISOString();
            if (format === "date") {
                val = val.split("T")[0];
            }
        }
        return (
            <input
                style={{ minHeight: 26, border: "none", outline: "none" }}
                type={format}
                autoFocus={true}
                value={val}
                onChange={e => {
                    p.onChange({
                        ...p.value,
                        data: {
                            ...p.value.data,
                            date: e.target.valueAsDate ?? undefined,
                        },
                    });
                }}
            />
        );
    },
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
