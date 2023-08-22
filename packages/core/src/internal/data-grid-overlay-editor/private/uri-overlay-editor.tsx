import { EditPencil } from "../../../common/utils.js";
import * as React from "react";
import { GrowingEntry } from "../../growing-entry/growing-entry.js";
import { UriOverlayEditorStyle } from "./uri-overlay-editor-style.js";
import type { SelectionRange } from "../../data-grid/data-grid-types.js";

interface Props {
    readonly uri: string;
    readonly onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly forceEditMode: boolean;
    readonly readonly: boolean;
    readonly preview: string;
    readonly validatedSelection?: SelectionRange;
}

const UriOverlayEditor: React.FunctionComponent<Props> = p => {
    const { uri, onChange, forceEditMode, readonly, validatedSelection, preview } = p;

    const [editMode, setEditMode] = React.useState<boolean>(uri === "" || forceEditMode);

    const onEditClick = React.useCallback(() => {
        setEditMode(true);
    }, []);

    if (editMode) {
        return (
            <GrowingEntry
                validatedSelection={validatedSelection}
                highlight={true}
                autoFocus={true}
                value={uri}
                onChange={onChange}
            />
        );
    }

    return (
        <UriOverlayEditorStyle>
            <a className="gdg-link-area" href={uri} target="_blank" rel="noopener noreferrer">
                {preview}
            </a>
            {!readonly && (
                <div className="gdg-edit-icon" onClick={onEditClick}>
                    <EditPencil />
                </div>
            )}
            <textarea className="gdg-input" autoFocus={true} />
        </UriOverlayEditorStyle>
    );
};

export default UriOverlayEditor;
