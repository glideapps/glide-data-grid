import * as React from "react";
import { DataEditor, DataEditorProps, DataEditorRef } from "./data-editor/data-editor";
import { CellRenderers } from "./data-grid/cells";
import { sprites } from "./data-grid/sprites";

export type DataEditorAllProps = Omit<DataEditorProps, "renderers">;

const DataEditorAllImpl: React.ForwardRefRenderFunction<DataEditorRef, DataEditorAllProps> = (p, ref) => {
    const allSprites = React.useMemo(() => {
        return { ...sprites, ...p.headerIcons };
    }, [p.headerIcons]);

    return <DataEditor {...p} renderers={CellRenderers} headerIcons={allSprites} ref={ref} />;
};

export const DataEditorAll = React.forwardRef(DataEditorAllImpl);
