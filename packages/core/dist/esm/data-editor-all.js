import * as React from "react";
import { DataEditor } from "./data-editor/data-editor.js";
import { AllCellRenderers } from "./cells/index.js";
import { sprites } from "./internal/data-grid/sprites.js";
import ImageWindowLoaderImpl from "./common/image-window-loader.js";
const DataEditorAllImpl = (p, ref) => {
    const allSprites = React.useMemo(() => {
        return { ...sprites, ...p.headerIcons };
    }, [p.headerIcons]);
    const imageWindowLoader = React.useMemo(() => {
        return p.imageWindowLoader ?? new ImageWindowLoaderImpl();
    }, [p.imageWindowLoader]);
    return (React.createElement(DataEditor, { ...p, renderers: AllCellRenderers, headerIcons: allSprites, ref: ref, imageWindowLoader: imageWindowLoader }));
};
export const DataEditorAll = React.forwardRef(DataEditorAllImpl);
//# sourceMappingURL=data-editor-all.js.map