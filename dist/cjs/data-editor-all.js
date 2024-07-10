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
exports.DataEditorAll = void 0;
const React = __importStar(require("react"));
const data_editor_js_1 = require("./data-editor/data-editor.js");
const index_js_1 = require("./cells/index.js");
const sprites_js_1 = require("./internal/data-grid/sprites.js");
const image_window_loader_js_1 = __importDefault(require("./common/image-window-loader.js"));
const DataEditorAllImpl = (p, ref) => {
    const allSprites = React.useMemo(() => {
        return { ...sprites_js_1.sprites, ...p.headerIcons };
    }, [p.headerIcons]);
    const imageWindowLoader = React.useMemo(() => {
        return p.imageWindowLoader ?? new image_window_loader_js_1.default();
    }, [p.imageWindowLoader]);
    return (React.createElement(data_editor_js_1.DataEditor, { ...p, renderers: index_js_1.AllCellRenderers, headerIcons: allSprites, ref: ref, imageWindowLoader: imageWindowLoader }));
};
exports.DataEditorAll = React.forwardRef(DataEditorAllImpl);
//# sourceMappingURL=data-editor-all.js.map