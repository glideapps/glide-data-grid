"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllCellRenderers = void 0;
const boolean_cell_js_1 = require("./boolean-cell.js");
const bubble_cell_js_1 = require("./bubble-cell.js");
const drilldown_cell_js_1 = require("./drilldown-cell.js");
const image_cell_js_1 = require("./image-cell.js");
const loading_cell_js_1 = require("./loading-cell.js");
const markdown_cell_js_1 = require("./markdown-cell.js");
const marker_cell_js_1 = require("./marker-cell.js");
const new_row_cell_js_1 = require("./new-row-cell.js");
const number_cell_js_1 = require("./number-cell.js");
const protected_cell_js_1 = require("./protected-cell.js");
const row_id_cell_js_1 = require("./row-id-cell.js");
const text_cell_js_1 = require("./text-cell.js");
const uri_cell_js_1 = require("./uri-cell.js");
exports.AllCellRenderers = [
    marker_cell_js_1.markerCellRenderer,
    new_row_cell_js_1.newRowCellRenderer,
    boolean_cell_js_1.booleanCellRenderer,
    bubble_cell_js_1.bubbleCellRenderer,
    drilldown_cell_js_1.drilldownCellRenderer,
    image_cell_js_1.imageCellRenderer,
    loading_cell_js_1.loadingCellRenderer,
    markdown_cell_js_1.markdownCellRenderer,
    number_cell_js_1.numberCellRenderer,
    protected_cell_js_1.protectedCellRenderer,
    row_id_cell_js_1.rowIDCellRenderer,
    text_cell_js_1.textCellRenderer,
    uri_cell_js_1.uriCellRenderer,
];
//# sourceMappingURL=index.js.map