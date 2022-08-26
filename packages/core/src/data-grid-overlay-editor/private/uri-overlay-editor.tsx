import { EditPencil } from "../../common/utils";
import * as React from "react";
import GrowingEntry from "../../growing-entry/growing-entry";
import { UriOverlayEditorStyle } from "./uri-overlay-editor-style";
import type { SelectionRange } from "../../data-grid/data-grid-types";

interface Props {
    readonly uri: string;
    readonly onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly forceEditMode: boolean;
    readonly readonly: boolean;
    readonly validatedSelection?: SelectionRange;
}

const UriOverlayEditor: React.FunctionComponent<Props> = p => {
    const { uri, onChange, forceEditMode, readonly, validatedSelection } = p;

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
            <a className="link-area" href={uri} target="_blank" rel="noopener noreferrer">
                {uri}
            </a>
            {!readonly && (
                <div className="edit-icon" onClick={onEditClick}>
                    <EditPencil />
                </div>
            )}
            <textarea className="gdg-input" autoFocus={true} />
        </UriOverlayEditorStyle>
    );
};

export default UriOverlayEditor;
