import * as React from "react";
import { DataEditor, DataEditorProps, DataEditorRef } from "./data-editor/data-editor";
import { CellRenderers } from "./data-grid/cells";
import { sprites } from "./data-grid/sprites";

export type DataEditorAllProps = Omit<DataEditorProps, "renderers">;

const DataEditorAllImpl: React.ForwardRefRenderFunction<DataEditorRef, DataEditorAllProps> = (p, ref) => {
    return <DataEditor {...p} renderers={CellRenderers} headerIcons={sprites} ref={ref} />;
};

export const DataEditorAll = React.forwardRef(DataEditorAllImpl);
