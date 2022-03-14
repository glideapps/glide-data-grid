import { EditPencil } from "../../common/utils";
import * as React from "react";
import GrowingEntry from "../../growing-entry/growing-entry";
import { UriOverlayEditorStyle } from "./uri-overlay-editor-style";

interface Props {
    readonly uri: string;
    readonly onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    readonly onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly forceEditMode: boolean;
    readonly readonly: boolean;
}

const UriOverlayEditor: React.FunctionComponent<Props> = p => {
    const { uri, onChange, onKeyDown, forceEditMode, readonly } = p;

    const [editMode, setEditMode] = React.useState<boolean>(uri === "" || forceEditMode);

    const onEditClick = React.useCallback(() => {
        setEditMode(true);
    }, []);

    if (editMode) {
        return <GrowingEntry highlight={true} autoFocus={true} onKeyDown={onKeyDown} value={uri} onChange={onChange} />;
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
            <textarea className="gdg-input" autoFocus={true} onKeyDown={onKeyDown} />
        </UriOverlayEditorStyle>
    );
};

export default UriOverlayEditor;
