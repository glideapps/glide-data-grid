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
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const glide_data_grid_1 = require("@glideapps/glide-data-grid");
const ArticleCellEditor = React.lazy(async () => await import("./article-cell-editor.js"));
const renderer = {
    kind: glide_data_grid_1.GridCellKind.Custom,
    isMatch: (c) => c.data.kind === "article-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { markdown } = cell.data;
        let data = markdown;
        if (data.includes("\n")) {
            // new lines are rare and split is relatively expensive compared to the search
            // it pays off to not do the split contantly.
            data = data.split(/\r?\n/)[0];
        }
        const max = rect.width / 4; // no need to round, slice will just truncate this
        if (data.length > max) {
            data = data.slice(0, max);
        }
        ctx.fillStyle = theme.textDark;
        ctx.fillText(data, rect.x + theme.cellHorizontalPadding, rect.y + rect.height / 2 + (0, glide_data_grid_1.getMiddleCenterBias)(ctx, theme));
        return true;
    },
    provideEditor: () => ({
        editor: p => {
            return (React.createElement(React.Suspense, { fallback: null },
                React.createElement(ArticleCellEditor, { ...p })));
        },
        styleOverride: {
            position: "fixed",
            left: "12.5vw",
            top: "12.5vh",
            width: "75vw",
            borderRadius: "9px",
            maxWidth: "unset",
            maxHeight: "unset",
        },
        disablePadding: true,
    }),
    onPaste: (val, d) => ({
        ...d,
        markdown: val,
    }),
};
exports.default = renderer;
//# sourceMappingURL=article-cell.js.map