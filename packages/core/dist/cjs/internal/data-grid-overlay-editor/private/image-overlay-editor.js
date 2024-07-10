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
exports.ImageOverlayEditor = void 0;
const React = __importStar(require("react"));
const image_overlay_editor_style_js_1 = require("./image-overlay-editor-style.js");
const react_responsive_carousel_1 = require("react-responsive-carousel");
const utils_js_1 = require("../../../common/utils.js");
/** @category Renderers */
const ImageOverlayEditor = p => {
    const { urls, canWrite, onEditClick, renderImage } = p;
    const filtered = urls.filter(u => u !== "");
    if (filtered.length === 0) {
        return null;
    }
    const allowMove = filtered.length > 1;
    return (React.createElement(image_overlay_editor_style_js_1.ImageOverlayEditorStyle, { "data-testid": "GDG-default-image-overlay-editor" },
        React.createElement(react_responsive_carousel_1.Carousel, { showArrows: allowMove, showThumbs: false, swipeable: allowMove, emulateTouch: allowMove, infiniteLoop: allowMove }, filtered.map(url => {
            const innerContent = renderImage?.(url) ?? React.createElement("img", { draggable: false, src: url });
            return (React.createElement("div", { className: "gdg-centering-container", key: url }, innerContent));
        })),
        canWrite && onEditClick && (React.createElement("button", { className: "gdg-edit-icon", onClick: onEditClick },
            React.createElement(utils_js_1.EditPencil, null)))));
};
exports.ImageOverlayEditor = ImageOverlayEditor;
//# sourceMappingURL=image-overlay-editor.js.map