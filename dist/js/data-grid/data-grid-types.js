"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEditableGridCell = isEditableGridCell;
exports.GridCellKind = void 0;

var _support = require("../common/support");

var GridCellKind;
exports.GridCellKind = GridCellKind;

(function (GridCellKind) {
  GridCellKind["Uri"] = "uri";
  GridCellKind["Text"] = "text";
  GridCellKind["Image"] = "image";
  GridCellKind["RowID"] = "row-id";
  GridCellKind["Number"] = "number";
  GridCellKind["Bubble"] = "bubble";
  GridCellKind["Boolean"] = "boolean";
  GridCellKind["Loading"] = "loading";
  GridCellKind["Markdown"] = "markdown";
  GridCellKind["Drilldown"] = "drilldown";
  GridCellKind["Protected"] = "protected";
})(GridCellKind || (exports.GridCellKind = GridCellKind = {}));

function isEditableGridCell(cell) {
  if (cell.kind === GridCellKind.Loading || cell.kind === GridCellKind.Bubble || cell.kind === GridCellKind.RowID || cell.kind === GridCellKind.Protected || cell.kind === GridCellKind.Drilldown) {
    return false;
  }

  (0, _support.proveType)(cell);
  return true;
}