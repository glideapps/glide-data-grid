import * as React from "react";
import { type DataEditorProps, type DataEditorRef } from "./data-editor/data-editor.js";
import type { ImageWindowLoader } from "./internal/data-grid/image-window-loader-interface.js";
export interface DataEditorAllProps extends Omit<DataEditorProps, "renderers" | "imageWindowLoader"> {
    imageWindowLoader?: ImageWindowLoader;
}
export declare const DataEditorAll: React.ForwardRefExoticComponent<DataEditorAllProps & React.RefAttributes<DataEditorRef>>;
