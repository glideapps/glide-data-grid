"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uriCellRenderer = void 0;
/* eslint-disable react/display-name */
const React = __importStar(require("react"));
const uri_overlay_editor_js_1 = __importDefault(require("../internal/data-grid-overlay-editor/private/uri-overlay-editor.js"));
const data_grid_lib_js_1 = require("../internal/data-grid/render/data-grid-lib.js");
const data_grid_types_js_1 = require("../internal/data-grid/data-grid-types.js");
const math_js_1 = require("../common/math.js");
function getTextRect(metrics, rect, theme, contentAlign) {
    let x = theme.cellHorizontalPadding;
    const y = rect.height / 2 - metrics.actualBoundingBoxAscent / 2;
    const width = metrics.width;
    const height = metrics.actualBoundingBoxAscent;
    if (contentAlign === "right") {
        x = rect.width - width - theme.cellHorizontalPadding;
    }
    else if (contentAlign === "center") {
        x = rect.width / 2 - width / 2;
    }
    return { x, y, width, height };
}
function isOverLinkText(e) {
    const { cell, bounds, posX, posY, theme } = e;
    const txt = cell.displayData ?? cell.data;
    if (cell.hoverEffect !== true || cell.onClickUri === undefined)
        return false;
    const m = (0, data_grid_lib_js_1.getMeasuredTextCache)(txt, theme.baseFontFull);
    if (m === undefined)
        return false;
    const textRect = getTextRect(m, bounds, theme, cell.contentAlign);
    return (0, math_js_1.pointInRect)({
        x: textRect.x - 4,
        y: textRect.y - 4,
        width: textRect.width + 8,
        height: textRect.height + 8,
    }, posX, posY);
}
exports.uriCellRenderer = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: data_grid_types_js_1.GridCellKind.Uri,
    needsHover: uriCell => uriCell.hoverEffect === true,
    needsHoverPosition: true,
    useLabel: true,
    drawPrep: data_grid_lib_js_1.prepTextCell,
    draw: a => {
        const { cell, theme, overrideCursor, hoverX, hoverY, rect, ctx } = a;
        const txt = cell.displayData ?? cell.data;
        const isLinky = cell.hoverEffect === true;
        if (overrideCursor !== undefined && isLinky && hoverX !== undefined && hoverY !== undefined) {
            const m = (0, data_grid_lib_js_1.measureTextCached)(txt, ctx, theme.baseFontFull);
            const textRect = getTextRect(m, rect, theme, cell.contentAlign);
            const { x, y, width: w, height: h } = textRect;
            // check if hoverX and hoverY inside the box
            if (hoverX >= x - 4 && hoverX <= x - 4 + w + 8 && hoverY >= y - 4 && hoverY <= y - 4 + h + 8) {
                const middleCenterBias = (0, data_grid_lib_js_1.getMiddleCenterBias)(ctx, theme.baseFontFull);
                overrideCursor("pointer");
                const underlineOffset = 5;
                const drawY = y - middleCenterBias;
                ctx.beginPath();
                ctx.moveTo(rect.x + x, Math.floor(rect.y + drawY + h + underlineOffset) + 0.5);
                ctx.lineTo(rect.x + x + w, Math.floor(rect.y + drawY + h + underlineOffset) + 0.5);
                ctx.strokeStyle = theme.linkColor;
                ctx.stroke();
                ctx.save();
                ctx.fillStyle = a.cellFillColor;
                (0, data_grid_lib_js_1.drawTextCell)({ ...a, rect: { ...rect, x: rect.x - 1 } }, txt, cell.contentAlign);
                (0, data_grid_lib_js_1.drawTextCell)({ ...a, rect: { ...rect, x: rect.x - 2 } }, txt, cell.contentAlign);
                (0, data_grid_lib_js_1.drawTextCell)({ ...a, rect: { ...rect, x: rect.x + 1 } }, txt, cell.contentAlign);
                (0, data_grid_lib_js_1.drawTextCell)({ ...a, rect: { ...rect, x: rect.x + 2 } }, txt, cell.contentAlign);
                ctx.restore();
            }
        }
        ctx.fillStyle = isLinky ? theme.linkColor : theme.textDark;
        (0, data_grid_lib_js_1.drawTextCell)(a, txt, cell.contentAlign);
    },
    onSelect: e => {
        if (isOverLinkText(e)) {
            e.preventDefault();
        }
    },
    onClick: a => {
        const { cell } = a;
        const didClick = isOverLinkText(a);
        if (didClick) {
            cell.onClickUri?.(a);
        }
        return undefined;
    },
    measure: (ctx, cell, theme) => (0, data_grid_lib_js_1.measureTextCached)(cell.displayData ?? cell.data, ctx, theme.baseFontFull).width +
        theme.cellHorizontalPadding * 2,
    onDelete: c => ({
        ...c,
        data: "",
    }),
    provideEditor: cell => p => {
        const { onChange, value, forceEditMode, validatedSelection } = p;
        return (React.createElement(uri_overlay_editor_js_1.default, { forceEditMode: value.readonly !== true &&
                (forceEditMode || (cell.hoverEffect === true && cell.onClickUri !== undefined)), uri: value.data, preview: value.displayData ?? value.data, validatedSelection: validatedSelection, readonly: value.readonly === true, onChange: e => onChange({
                ...value,
                data: e.target.value,
            }) }));
    },
    onPaste: (toPaste, cell, details) => toPaste === cell.data
        ? undefined
        : { ...cell, data: toPaste, displayData: details.formattedString ?? cell.displayData },
};
//# sourceMappingURL=uri-cell.js.map