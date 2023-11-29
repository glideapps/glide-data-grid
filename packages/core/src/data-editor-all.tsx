import * as React from "react";
import { DataEditor, type DataEditorProps, type DataEditorRef } from "./data-editor/data-editor.js";
import { AllCellRenderers } from "./cells/index.js";
import { sprites } from "./internal/data-grid/sprites.js";

export type DataEditorAllProps = Omit<DataEditorProps, "renderers">;

const DataEditorAllImpl: React.ForwardRefRenderFunction<DataEditorRef, DataEditorAllProps> = (p, ref) => {
    const allSprites = React.useMemo(() => {
        return { ...sprites, ...p.headerIcons };
    }, [p.headerIcons]);

    return <DataEditor {...p} renderers={AllCellRenderers} headerIcons={allSprites} ref={ref} />;
};

export const DataEditorAll = React.forwardRef(DataEditorAllImpl);
