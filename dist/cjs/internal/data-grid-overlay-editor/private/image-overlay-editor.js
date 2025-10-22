import * as React from "react";
import { ImageOverlayEditorStyle } from "./image-overlay-editor-style.js";
import { Carousel } from "react-responsive-carousel";
import { EditPencil } from "../../../common/utils.js";
/** @category Renderers */
export const ImageOverlayEditor = p => {
    const { urls, canWrite, onEditClick, renderImage } = p;
    const filtered = urls.filter(u => u !== "");
    if (filtered.length === 0) {
        return null;
    }
    const allowMove = filtered.length > 1;
    return (React.createElement(ImageOverlayEditorStyle, { "data-testid": "GDG-default-image-overlay-editor" },
        React.createElement(Carousel, { showArrows: allowMove, showThumbs: false, swipeable: allowMove, emulateTouch: allowMove, infiniteLoop: allowMove }, filtered.map(url => {
            const innerContent = renderImage?.(url) ?? React.createElement("img", { draggable: false, src: url });
            return (React.createElement("div", { className: "gdg-centering-container", key: url }, innerContent));
        })),
        canWrite && onEditClick && (React.createElement("button", { className: "gdg-edit-icon", onClick: onEditClick },
            React.createElement(EditPencil, null)))));
};
//# sourceMappingURL=image-overlay-editor.js.map