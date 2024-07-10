import * as React from "react";
import type { SelectionRange } from "../../data-grid/data-grid-types.js";
interface Props {
    readonly uri: string;
    readonly onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly forceEditMode: boolean;
    readonly readonly: boolean;
    readonly preview: string;
    readonly validatedSelection?: SelectionRange;
}
declare const UriOverlayEditor: React.FunctionComponent<Props>;
export default UriOverlayEditor;
