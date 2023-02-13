import * as React from "react";
import { fireEvent, render } from "@testing-library/react";

import { GridCellKind } from "@glideapps/glide-data-grid";
import renderer, { DateKind, DatePickerCell, formatValueForHTMLInput } from "../src/cells/date-picker-cell";

describe("formatValueForHTMLInput", () => {
    it.each([
        ["date", new Date("1970-01-01T00:00:00.100Z"), "1970-01-01"],
        ["datetime-local", new Date("1970-01-01T00:00:00.100Z"), "1970-01-01T00:00:00.100"],
        ["time", new Date("1970-01-01T00:00:00.100Z"), "00:00:00.100"],
    ])("check %p format and %p date leads correct format: {%p}", (format: string, date: Date, valueForHTML: string) => {
        expect(formatValueForHTMLInput(format as DateKind, date)).toStrictEqual(valueForHTML);
    });
    it("throws an error when a weird value is passed", () => {
        expect(() => formatValueForHTMLInput("weird" as DateKind, new Date())).toThrow("Unknown date kind weird");
    });
});

describe("editor", () => {
    function getMockDateCell(props: Partial<DatePickerCell> = {}): DatePickerCell {
        return {
            ...props,
            kind: GridCellKind.Custom,
            allowOverlay: true,
            copyData: "4",
            readonly: false,
            data: {
                kind: "date-picker-cell",
                date: new Date("2023-02-06T04:47:44.584Z"),
                displayDate: new Date("2023-02-06T04:47:44.584Z").toISOString(),
                format: "time",
            },
        };
    }

    it("renders into the dom with correct value", () => {
        // @ts-ignore
        const Editor = renderer.provideEditor?.(getMockDateCell()).editor;
        if (Editor === undefined) {
            throw new Error("Editor is invalid");
        }

        const result = render(<Editor isHighlighted={false} value={getMockDateCell()} />);
        // Check if the element is actually there
        const input = result.getByTestId("date-picker-cell");
        expect(input).not.toBeUndefined();

        // @ts-ignore
        expect(result.value === "04:47:44.584");
    });

    it.each([["date"], ["time"], ["datetime-local"]])("renders with correct format", (format: string) => {
        // @ts-ignore
        const Editor = renderer.provideEditor?.(
            getMockDateCell({ data: { format: format } } as DatePickerCell)
            // @ts-ignore
        ).editor;
        if (Editor === undefined) {
            throw new Error("Editor is invalid");
        }

        const result = render(<Editor isHighlighted={false} value={getMockDateCell()} />);
        const input = result.getByTestId("date-picker-cell");
        expect(input).not.toBeUndefined();

        // @ts-ignore
        expect(input.format === format);
    });

    it("renders textarea when readonly is true", () => {
        // @ts-ignore
        const Editor = renderer.provideEditor?.(
            getMockDateCell({ readonly: true } as DatePickerCell)
            // @ts-ignore
        ).editor;
        if (Editor === undefined) {
            throw new Error("Editor is invalid");
        }

        const result = render(<Editor isHighlighted={false} value={getMockDateCell()} />);
        // text-area should be found
        expect(result.findByDisplayValue("2023-02-06T04:47:44.584Z")).not.toBeUndefined();
    });

    it("contains max, min, step when passed in", () => {
        const min = "2018-01-01";
        const max = "2018-12-31";
        const step = ".001";
        const extraProps = {
            data: {
                min,
                max,
                step,
            },
        };

        // @ts-ignore
        const Editor = renderer.provideEditor?.(getMockDateCell(extraProps)).editor;
        if (Editor === undefined) {
            throw new Error("Editor is invalid");
        }

        const result = render(<Editor isHighlighted={false} value={getMockDateCell()} />);
        const input = result.getByTestId("date-picker-cell");
        expect(input).not.toBeUndefined();

        // @ts-ignore
        expect(input.min === min);
        // @ts-ignore
        expect(input.max === max);
        // @ts-ignore
        expect(input.step === step);
    });

    it('properly sets date when value is NOT ""', async () => {
        const valueAsNumber = 100;

        // @ts-ignore
        const Editor = renderer.provideEditor?.(getMockDateCell()).editor;
        if (Editor === undefined) {
            throw new Error("Editor is invalid");
        }

        const mockCellOnChange = jest.fn();
        const result = render(<Editor isHighlighted={false} value={getMockDateCell()} onChange={mockCellOnChange} />);
        const input = await result.findByTestId("date-picker-cell");
        expect(result.findByTestId("date-picker-cell")).not.toBeUndefined();
        fireEvent.change(input, {
            target: {
                value: "2023-02-06T18:15:33.103Z",
                valueAsNumber: valueAsNumber,
            },
        });
        expect(mockCellOnChange).toHaveBeenCalledTimes(1);
        expect(mockCellOnChange).toBeCalledWith({
            kind: GridCellKind.Custom,
            allowOverlay: true,
            copyData: "4",
            readonly: false,
            data: {
                kind: "date-picker-cell",
                date: new Date(valueAsNumber),
                displayDate: new Date("2023-02-06T04:47:44.584Z").toISOString(),
                format: "time",
            },
        });
    });

    it('properly sets new date to undefined when value is ""', async () => {
        // @ts-ignore
        const Editor = renderer.provideEditor?.(getMockDateCell()).editor;
        if (Editor === undefined) {
            throw new Error("Editor is invalid");
        }

        const mockCellOnChange = jest.fn();
        const result = render(<Editor isHighlighted={false} value={getMockDateCell()} onChange={mockCellOnChange} />);
        const input = await result.findByTestId("date-picker-cell");
        expect(result.findByTestId("date-picker-cell")).not.toBeUndefined();
        fireEvent.change(input, { target: { value: "" } });
        expect(mockCellOnChange).toHaveBeenCalledTimes(1);
        expect(mockCellOnChange).toBeCalledWith({
            kind: GridCellKind.Custom,
            allowOverlay: true,
            copyData: "4",
            readonly: false,
            data: {
                kind: "date-picker-cell",
                // should be undefined since value is ''
                date: undefined,
                displayDate: new Date("2023-02-06T04:47:44.584Z").toISOString(),
                format: "time",
            },
        });
    });
});

describe("onPaste", () => {
    it.each([
        ["2023-02-06T04:47:44.584Z", "2023-02-06T04:47:44.584Z"],
        ["1995-12-17", "1995-12-17T00:00:00.000Z"],
        ["1995-12-17T03:24:00Z", "1995-12-17T03:24:00.000Z"],
        ["1995-12-17T03:24:00", "1995-12-17T03:24:00.000Z"],
        ["Sun Dec 17 1995 03:24:00 GMT", "1995-12-17T03:24:00.000Z"],
        [new Date(1995, 11, 17), "1995-12-17T00:00:00.000Z"],
        [100, "1970-01-01T00:00:00.100Z"],
        [-1, "1969-12-31T23:59:59.999Z"],
    ])("correctly interprets pasted value %p as %p", (input: string | number | Date, expected: string) => {
        // @ts-ignore
        const { date } = renderer.onPaste(input, {});
        expect(date.toISOString()).toStrictEqual(expected);
    });

    it.each([[""], ["invalid"], ["2020-20-12"], ["2020/20/12"], [undefined], [null], ["2020-12-10-10"]])(
        "correctly returns no value when onPaste is called with invalid value: %p",
        (input: string | undefined | null) => {
            // @ts-ignore
            const { date } = renderer.onPaste(input, {});
            expect(date).toBe(undefined);
        }
    );

    it("support time strings in onPaste", () => {
        // @ts-ignore
        const { date } = renderer.onPaste("01:02:03.400", { format: "time" });
        expect(date).toStrictEqual(new Date("1970-01-01T01:02:03.400Z"));
    });
});
