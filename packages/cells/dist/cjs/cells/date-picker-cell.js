"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatValueForHTMLInput = exports.StyledInputBox = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@linaria/react");
const glide_data_grid_1 = require("@glideapps/glide-data-grid");
exports.StyledInputBox = /*#__PURE__*/react_2.styled('input')({
  name: "date-picker-cell0",
  class: "gdg-d1wtovjx",
  propsAsIs: false
});
const formatValueForHTMLInput = (dateKind, date) => {
  if (date === undefined || date === null) {
    return "";
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
exports.formatValueForHTMLInput = formatValueForHTMLInput;
const Editor = cell => {
  const cellData = cell.value.data;
  const {
    format,
    displayDate
  } = cellData;
  const step = cellData.step !== undefined && !Number.isNaN(Number(cellData.step)) ? Number(cellData.step) : undefined;
  const minValue = cellData.min instanceof Date ? (0, exports.formatValueForHTMLInput)(format, cellData.min) : cellData.min;
  const maxValue = cellData.max instanceof Date ? (0, exports.formatValueForHTMLInput)(format, cellData.max) : cellData.max;
  let date = cellData.date;
  // Convert timezone offset to milliseconds
  const timezoneOffsetMs = cellData.timezoneOffset ? cellData.timezoneOffset * 60 * 1000 : 0;
  if (timezoneOffsetMs && date) {
    // Adjust based on the timezone offset
    date = new Date(date.getTime() + timezoneOffsetMs);
  }
  const value = (0, exports.formatValueForHTMLInput)(format, date);
  if (cell.value.readonly) {
    return react_1.default.createElement(glide_data_grid_1.TextCellEntry, {
      highlight: true,
      autoFocus: false,
      disabled: true,
      value: displayDate ?? "",
      onChange: () => undefined
    });
  }
  return react_1.default.createElement(exports.StyledInputBox, {
    "data-testid": "date-picker-cell",
    required: true,
    type: format,
    defaultValue: value,
    min: minValue,
    max: maxValue,
    step: step,
    autoFocus: true,
    onChange: event => {
      if (isNaN(event.target.valueAsNumber)) {
        // The user has cleared the date, contribute as undefined
        cell.onChange({
          ...cell.value,
          data: {
            ...cell.value.data,
            date: undefined
          }
        });
      } else {
        cell.onChange({
          ...cell.value,
          data: {
            ...cell.value.data,
            // use valueAsNumber because valueAsDate is null for "datetime-local"
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#technical_summary
            date: new Date(event.target.valueAsNumber - timezoneOffsetMs)
          }
        });
      }
    }
  });
};
const renderer = {
  kind: glide_data_grid_1.GridCellKind.Custom,
  isMatch: cell => cell.data.kind === "date-picker-cell",
  draw: (args, cell) => {
    const {
      displayDate
    } = cell.data;
    (0, glide_data_grid_1.drawTextCell)(args, displayDate, cell.contentAlign);
    return true;
  },
  measure: (ctx, cell, theme) => {
    const {
      displayDate
    } = cell.data;
    return ctx.measureText(displayDate).width + theme.cellHorizontalPadding * 2;
  },
  provideEditor: () => ({
    editor: Editor
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
      date: Number.isNaN(parseDateTimestamp) ? undefined : new Date(parseDateTimestamp)
    };
  }
};
exports.default = renderer;

