import * as React from "react";
import { ImageOverlayEditorStyle } from "./image-overlay-editor-style";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { EditPencil } from "../../common/utils";
// import { createPortal } from "react-dom";
// import ClickOutsideContainer from "../../click-outside-container/click-outside-container";

export interface OverlayImageEditorProps {
    readonly urls: readonly string[];
    readonly canWrite: boolean;
    readonly onCancel: () => void;
    readonly onChange: (newImage: string) => void;
    readonly onKeyDown: (event: React.KeyboardEvent) => void;
    readonly onEditClick?: () => void;
}

const ImageOverlayEditor: React.FunctionComponent<OverlayImageEditorProps> = p => {
    const { urls, canWrite, onKeyDown, onEditClick } = p;

    const filtered = urls.filter(u => u !== "");

    if (filtered.length === 0) {
        return null;
    }

    const allowMove = filtered.length > 1;
    return (
        <ImageOverlayEditorStyle onKeyDown={onKeyDown}>
            <Carousel
                showArrows={allowMove}
                showThumbs={false}
                swipeable={allowMove}
                emulateTouch={allowMove}
                infiniteLoop={allowMove}>
                {filtered.map(url => (
                    <div className="centering-container" key={url}>
                        <img draggable={false} src={url} />
                    </div>
                ))}
            </Carousel>
            {canWrite && onEditClick && (
                <button className="edit-icon" onClick={onEditClick}>
                    <EditPencil />
                </button>
            )}
            <textarea autoFocus={true} onKeyDown={onKeyDown} />
        </ImageOverlayEditorStyle>
    );
};

export default ImageOverlayEditor;
