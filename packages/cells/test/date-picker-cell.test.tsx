import {
  GridCellKind,
  isObjectEditorCallbackResult,
} from "@glideapps/glide-data-grid";
import * as React from "react";
import { assert } from "console";
import { fireEvent, render } from "@testing-library/react";
import renderer, {
  DateKind,
  DatePickerCell,
  formatValueForHTMLInput,
} from "../src/cells/date-picker-cell";

describe("formatValueForHTMLInput", () => {
  it.each([
    ["date", new Date("1970-01-01T00:00:00.100Z"), "1970-01-01"],
    [
      "datetime-local",
      new Date("1970-01-01T00:00:00.100Z"),
      "1970-01-01T00:00:00.100",
    ],
    ["time", new Date("1970-01-01T00:00:00.100Z"), "00:00:00.100"],
  ])(
    "check %p format and %p date leads correct format: {%p}",
    (format: string, date: Date, valueForHTML: string) => {
      expect(formatValueForHTMLInput(format as DateKind, date)).toStrictEqual(
        valueForHTML
      );
    }
  );
  it("throws an error when a weird value is passed", () => {
    expect(() =>
      formatValueForHTMLInput("weird" as DateKind, new Date())
    ).toThrow("Hell froze over");
  });
});

describe("editor", () => {
  function getMockDateCell(
    props: Partial<DatePickerCell> = {}
  ): DatePickerCell {
    return {
      ...props,
      kind: GridCellKind.Custom,
      allowOverlay: true,
      copyData: "4",
      data: {
        kind: "date-picker-cell",
        date: new Date("2023-02-06T04:47:44.584Z"),
        displayDate: new Date("2023-02-06T04:47:44.584Z").toISOString(),
        format: "time",
        readonly: false,
      },
    };
  }

  it("renders into the dom with correct value", () => {
    // @ts-ignore
    const Editor = renderer.provideEditor?.(getMockDateCell()).editor;
    // const target = getMockEditorTarget();
    assert(Editor !== undefined);
    assert(!isObjectEditorCallbackResult(Editor));

    assert(Editor !== undefined);
    const result = render(
      <Editor isHighlighted={false} value={getMockDateCell()} />
    );
    // Check if the element is actually there
    const input = result.getByTestId("test-id");
    expect(input).not.toBeUndefined();

    // @ts-ignore
    expect(result.value === "04:47:44.584");
  });

  it("renders textarea when readonly is true", () => {
    // @ts-ignore
    const Editor = renderer.provideEditor?.(
      getMockDateCell({ data: { readonly: true } })
    ).editor;
    // const target = getMockEditorTarget();
    assert(Editor !== undefined);
    assert(!isObjectEditorCallbackResult(Editor));

    assert(Editor !== undefined);
    const result = render(
      <Editor isHighlighted={false} value={getMockDateCell()} />
    );
    // text-area should be found
    expect(
      result.findByDisplayValue("2023-02-06T04:47:44.584Z")
    ).not.toBeUndefined();
  });

  it("contains max, min, step when passed in", () => {
    const extraProps = {
      data: {
        min: "2018-01-01",
        max: "2018-12-31",
        step: ".001",
      },
    };

    // @ts-ignore
    const Editor = renderer.provideEditor?.(getMockDateCell(extraProps)).editor;
    // const target = getMockEditorTarget();
    assert(Editor !== undefined);
    assert(!isObjectEditorCallbackResult(Editor));

    assert(Editor !== undefined);
    const result = render(
      <Editor isHighlighted={false} value={getMockDateCell()} />
    );
    // Check if the element is actually there
    const input = result.getByTestId("test-id");
    expect(input).not.toBeUndefined();

    // @ts-ignore
    expect(input.min === "2018-01-01");
    // @ts-ignore
    expect(input.max === "2018-12-31");
    // @ts-ignore
    expect(input.step === ".001");
  });

  it('properly sets date when value is NOT ""', async () => {
    const valueAsNumber = 100;

    // @ts-ignore
    const Editor = renderer.provideEditor?.(getMockDateCell()).editor;
    // const target = getMockEditorTarget();
    assert(Editor !== undefined);
    assert(!isObjectEditorCallbackResult(Editor));

    assert(Editor !== undefined);
    const mockCellOnChange = jest.fn();
    const result = render(
      <Editor
        isHighlighted={false}
        value={getMockDateCell()}
        onChange={mockCellOnChange}
      />
    );
    const input = await result.findByTestId("test-id");
    expect(result.findByTestId("test-id")).not.toBeUndefined();
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
      data: {
        kind: "date-picker-cell",
        date: new Date(valueAsNumber),
        displayDate: new Date("2023-02-06T04:47:44.584Z").toISOString(),
        format: "time",
        readonly: false,
      },
    });
  });

  it('properly sets new date to undefined when value is ""', async () => {
    // @ts-ignore
    const Editor = renderer.provideEditor?.(getMockDateCell()).editor;
    // const target = getMockEditorTarget();
    assert(Editor !== undefined);
    assert(!isObjectEditorCallbackResult(Editor));

    assert(Editor !== undefined);
    const mockCellOnChange = jest.fn();
    const result = render(
      <Editor
        isHighlighted={false}
        value={getMockDateCell()}
        onChange={mockCellOnChange}
      />
    );
    const input = await result.findByTestId("test-id");
    expect(result.findByTestId("test-id")).not.toBeUndefined();
    fireEvent.change(input, { target: { value: "" } });
    expect(mockCellOnChange).toHaveBeenCalledTimes(1);
    expect(mockCellOnChange).toBeCalledWith({
      kind: GridCellKind.Custom,
      allowOverlay: true,
      copyData: "4",
      data: {
        kind: "date-picker-cell",
        // should be undefined since value is ''
        date: undefined,
        displayDate: new Date("2023-02-06T04:47:44.584Z").toISOString(),
        format: "time",
        readonly: false,
      },
    });
  });
});

describe("onPaste", () => {
  it("correctly returns a value when onPaste is called with valid value", () => {
    // @ts-ignore
    const { date } = renderer.onPaste("2023-02-06T04:47:44.584Z", {});
    expect(date).toStrictEqual(new Date("2023-02-06T04:47:44.584Z"));
  });

  it("correctly returns no value when onPaste is called with invalid value", () => {
    // @ts-ignore
    const { date } = renderer.onPaste("", {});
    expect(date.getTime()).toBe(Number.NaN);
  });
});
