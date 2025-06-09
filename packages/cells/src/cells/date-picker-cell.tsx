import React from "react";
import { styled } from "@linaria/react";

import {
    type CustomCell,
    type CustomRenderer,
    drawTextCell,
    GridCellKind,
    type ProvideEditorCallback,
    TextCellEntry,
    measureTextCached,
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
    /* The current value of the datetime cell. */
    readonly date: Date | undefined | null;
    /* The current display value of the datetime cell. */
    readonly displayDate: string;
    /* Defines the type of the HTML input element. */
    readonly format: DateKind;
    /* Timezone offset in minutes.
    This can be used to adjust the date by a given timezone offset. */
    readonly timezoneOffset?: number;
    /* Minimum value that can be entered by the user.
    This is passed to the min attribute of the HTML input element. */
    readonly min?: string | Date;
    /* Maximum value that can be entered by the user.
    This is passed to the max attribute of the HTML input element. */
    readonly max?: string | Date;
    /* Granularity that the date must adhere.
    This is passed to the step attribute of the HTML input element. */
    readonly step?: string;
}

export type DateKind = "date" | "time" | "datetime-local";

export const formatValueForHTMLInput = (
    dateKind: DateKind,
    date: Date | undefined | null,
    timezoneOffsetMs?: number
): string => {
    if (date === undefined || date === null) {
        return "";
    }

    if (timezoneOffsetMs) {
        // Adjust based on the configured timezone offset:
        date = new Date(date.getTime() + timezoneOffsetMs);
    }

    const isoDate = date.toISOString();
    switch (dateKind) {
        case "date":
            return isoDate.split("T")[0];
        case "datetime-local":
            return isoDate.replace("Z", "");
        case "time":
            return isoDate.split("T")[1].replace("Z", "");
        default:
            throw new Error(`Unknown date kind ${dateKind}`);
    }
};

export type DatePickerCell = CustomCell<DatePickerCellProps>;

const Editor: ReturnType<ProvideEditorCallback<DatePickerCell>> = cell => {
    const cellData = cell.value.data;
    const { format, displayDate } = cellData;
    const step =
        cellData.step !== undefined && !Number.isNaN(Number(cellData.step)) ? Number(cellData.step) : undefined;

    // Convert timezone offset from minutes to milliseconds:
    const timezoneOffsetMs = cellData.timezoneOffset ? cellData.timezoneOffset * 60 * 1000 : 0;

    // We need to convert the min and max to iso strings. Thereby, we are also
    // adjusting the values to the given timezone offset.
    const minValue =
        cellData.min instanceof Date ? formatValueForHTMLInput(format, cellData.min, timezoneOffsetMs) : cellData.min;
    const maxValue =
        cellData.max instanceof Date ? formatValueForHTMLInput(format, cellData.max, timezoneOffsetMs) : cellData.max;

    const value = formatValueForHTMLInput(format, cellData.date, timezoneOffsetMs);

    if (cell.value.readonly) {
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
            defaultValue={value}
            min={minValue}
            max={maxValue}
            step={step}
            autoFocus={true}
            onChange={event => {
                if (isNaN(event.target.valueAsNumber)) {
                    // The user has cleared the date, contribute as undefined
                    cell.onChange({
                        ...cell.value,
                        data: {
                            ...cell.value.data,
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
                            date: new Date(event.target.valueAsNumber - timezoneOffsetMs),
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
    measure: (ctx, cell, theme) => {
        const { displayDate } = cell.data;
        return measureTextCached(displayDate, ctx).width + theme.cellHorizontalPadding * 2;
    },
    provideEditor: () => ({
        editor: Editor,
    }),
    onPaste: (v, d) => {
        let parseDateTimestamp = NaN;
        // We only try to parse the value if it is not empty/undefined/null:
        if (v) {
            // Support for unix timestamps (milliseconds since 1970-01-01):
            parseDateTimestamp = Number(v).valueOf();

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
