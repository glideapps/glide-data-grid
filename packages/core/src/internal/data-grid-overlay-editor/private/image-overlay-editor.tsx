import * as React from "react";
import { ImageOverlayEditorStyle } from "./image-overlay-editor-style.js";
import { Carousel } from "react-responsive-carousel";
import { EditPencil } from "../../../common/utils.js";

/** @category Types */
export interface OverlayImageEditorProps {
    readonly urls: readonly string[];
    readonly canWrite: boolean;
    readonly onCancel: () => void;
    readonly onChange: (newImage: string) => void;
    readonly onEditClick?: () => void;
    readonly renderImage?: (url: string) => React.ReactNode;
}

/** @category Renderers */
export const ImageOverlayEditor: React.FunctionComponent<OverlayImageEditorProps> = p => {
    const { urls, canWrite, onEditClick, renderImage } = p;

    const filtered = urls.filter(u => u !== "");

    if (filtered.length === 0) {
        return null;
    }

    const allowMove = filtered.length > 1;
    return (
        <ImageOverlayEditorStyle data-testid="GDG-default-image-overlay-editor">
            <Carousel
                showArrows={allowMove}
                showThumbs={false}
                swipeable={allowMove}
                emulateTouch={allowMove}
                infiniteLoop={allowMove}>
                {filtered.map(url => {
                    const innerContent = renderImage?.(url) ?? <img draggable={false} src={url} />;
                    return (
                        <div className="gdg-centering-container" key={url}>
                            {innerContent}
                        </div>
                    );
                })}
            </Carousel>
            {canWrite && onEditClick && (
                <button className="gdg-edit-icon" onClick={onEditClick}>
                    <EditPencil />
                </button>
            )}
        </ImageOverlayEditorStyle>
    );
};
