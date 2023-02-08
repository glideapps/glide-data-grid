import React from "react";
import { styled } from "@linaria/react";

import {
    CustomCell,
    CustomRenderer,
    drawTextCell,
    GridCellKind,
    ProvideEditorCallback,
    TextCellEntry,
} from "@glideapps/glide-data-grid";

export const StyledInputBox = styled.input`
    min-height: 26px;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: var(--gdg-editor-font-size);
    font-family: var(--gdg-font-family);
    color: var(--gdg-text-dark);
    ::-webkit-calendar-picker-indicator {
        background-color: white;
    }
`;

export interface DatePickerCellProps {
    readonly kind: "date-picker-cell";
    readonly date: Date | undefined;
    readonly displayDate: string;
    readonly format: DateKind;
    readonly readonly?: boolean;
    readonly min?: string;
    readonly max?: string;
    readonly step?: string;
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
            throw new Error(`Unknown date kind ${dateKind}`);
    }
};

export type DatePickerCell = CustomCell<DatePickerCellProps>;

const Editor: ReturnType<ProvideEditorCallback<DatePickerCell>> = cell => {
    const cellData = cell.value.data;
    const { min, max, step, readonly, format, displayDate } = cellData;
    const value = formatValueForHTMLInput(format, cellData.date);
    if (readonly) {
        return (
            <TextCellEntry
                highlight={true}
                autoFocus={false}
                disabled={true}
                value={displayDate ?? ""}
                onChange={() => undefined}
            />
        );
    }
    return (
        <StyledInputBox
            data-testid={"date-picker-cell"}
            required
            type={format}
            value={value}
            min={min}
            max={max}
            step={step}
            autoFocus={true}
            onChange={event => {
                if (event.target.value === "") {
                    cell.onChange({
                        ...cell.value,
                        data: {
                            ...cell.value.data,
                            // just set the value to undefined if submitted (enter or clicking out)
                            // escape still works
                            date: undefined,
                        },
                    });
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
        let parseDateTimestamp: number = NaN;
        // We only try to parse the value if it is not empty/undefined/null:
        if (v) {
            // Support for unix timestamps (milliseconds since 1970-01-01):
            parseDateTimestamp = new Number(v).valueOf();

            if (Number.isNaN(parseDateTimestamp)) {
                // Support for parsing ISO 8601 date strings:
                parseDateTimestamp = Date.parse(v);
                if (d.format === "time" && Number.isNaN(parseDateTimestamp)) {
                    // The pasted value was not a valid date string
                    // Try to interpret value as time string instead (HH:mm:ss)
                    parseDateTimestamp = Date.parse(`1970-01-01T${v}Z`);
                }
            }
        }
        return {
            ...d,
            date: Number.isNaN(parseDateTimestamp) ? undefined : new Date(parseDateTimestamp),
        };
    },
};

export default renderer;
