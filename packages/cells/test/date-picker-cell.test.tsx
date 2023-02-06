import { GridCellKind, isObjectEditorCallbackResult, Rectangle } from "@glideapps/glide-data-grid";
import * as React from "react";
import { assert } from "console";
import { render } from "@testing-library/react";
import renderer, { DateKind, DatePickerCell, DatePickerCellProps, formatValueForHTMLInput } from "../src/cells/date-picker-cell";

describe("formatValueForHTMLInput", () => {
    it.each([
        ["date", new Date("1970-01-01T00:00:00.100Z"), "1970-01-01"],
        ["datetime-local", new Date("1970-01-01T00:00:00.100Z"), "1970-01-01T00:00:00.100"],
        ["time", new Date("1970-01-01T00:00:00.100Z"), "00:00:00.100"],
    ])("check %p format and %p date leads correct format: {%p}", (format: string, date: Date, valueForHTML: string) => {
        expect(formatValueForHTMLInput(format as DateKind, date)).toStrictEqual(valueForHTML);
    });
    it("throws an error when a weird value is passed", () => {
        expect(() => formatValueForHTMLInput("weird" as DateKind, new Date())).toThrow("Hell froze over");
    });
});

describe("editor", () => {
    function getMockDateCell(props: Partial<DatePickerCellProps> = {}): DatePickerCell {
        return ({
        ...props,
        kind: GridCellKind.Custom,
        allowOverlay: true,
        copyData: "4",
        data: {
            kind: "date-picker-cell",
            date: new Date("2023-02-06T04:47:44.584Z"),
            displayDate: new Date("2023-02-06T04:47:44.584Z").toISOString(),
            format: "time",
        }})
    }

    function getMockEditorTarget(): Rectangle {
        return {
            x: 0,
            y: 0,
            width: 100,
            height: 32,
        };
    }

    it('renders into the dom with correct value', async () => {
        // @ts-ignore
        const Editor = renderer.provideEditor?.(getMockDateCell()).editor
        const target = getMockEditorTarget();
        assert(Editor !== undefined)
        assert(!isObjectEditorCallbackResult(Editor));

        assert(Editor !== undefined);
        const result = render(
            <Editor
                isHighlighted={false}
                value={getMockDateCell()}
                target={target}
            />
        );
        // Check if the element is actually there
        const input = result.getByTestId("test-id")
        expect(input).not.toBeUndefined()

        // @ts-ignore
        expect(result.value === "04:47:44.584");
    });
})

describe("onPaste", () => {
    it('correctly returns a value when onPaste is called with valid value', () => {
        // @ts-ignore
        const { date } = renderer.onPaste("2023-02-06T04:47:44.584Z", {})
        expect(date).toStrictEqual(new Date("2023-02-06T04:47:44.584Z"));
    })

    it('correctly returns no value when onPaste is called with invalid value', () => {
        // @ts-ignore
        const { date } = renderer.onPaste("", {})
        expect(date.getTime()).toBe(Number.NaN)
    })
})
