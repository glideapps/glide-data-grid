import * as React from "react";
import { ImageOverlayEditorStyle } from "./image-overlay-editor-style";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { panic } from "../../common/support";
// import { createPortal } from "react-dom";
// import ClickOutsideContainer from "../../click-outside-container/click-outside-container";

interface Props {
    readonly urls: readonly string[];
    readonly canWrite: boolean;
    readonly onCancel: () => void;
    readonly onChange: (newImage: string) => void;
    readonly onKeyDown: (event: React.KeyboardEvent) => void;
}

const ImageOverlayEditor: React.FunctionComponent<Props> = p => {
    const { urls, canWrite, onKeyDown } = p;

    const [editing, setEditing] = React.useState(false);

    const onEditClick = React.useCallback(() => {
        setEditing(true);
    }, []);

    const filtered = urls.filter(u => u !== "");

    if (editing || filtered.length === 0) {
        panic("FIXME");
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
            {canWrite && (
                <button className="edit-icon" onClick={onEditClick}>
                    X
                </button>
            )}
            <textarea autoFocus={true} onKeyDown={onKeyDown} />
        </ImageOverlayEditorStyle>
    );
};

export default ImageOverlayEditor;
