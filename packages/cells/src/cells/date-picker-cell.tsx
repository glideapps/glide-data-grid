import React from "react";
import { assertNever } from "./common/support";
import {
  CustomCell,
  CustomRenderer,
  drawTextCell,
  GridCellKind,
  ProvideEditorCallback,
  TextCellEntry,
} from "@glideapps/glide-data-grid";

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

export const formatValueForHTMLInput = (
  dateKind: DateKind,
  date: Date | undefined
): string => {
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

const Editor: ReturnType<ProvideEditorCallback<DatePickerCell>> = (cell) => {
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
    <input
      data-testid={"test-id"}
      required
      style={{ minHeight: 26, border: "none", outline: "none" }}
      type={format}
      value={value}
      min={min}
      max={max}
      step={step}
      autoFocus={true}
      onChange={(event) => {
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
  isMatch: (cell: CustomCell): cell is DatePickerCell =>
    (cell.data as any).kind === "date-picker-cell",
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
    if (d.format === "time") {
      v = `1970-01-01T${v}Z`
    }
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
