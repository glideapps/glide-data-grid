import * as React from "react";
import MarkdownDiv from "../../markdown-div/markdown-div";
import GrowingEntry from "../../growing-entry/growing-entry";
import { MarkdownOverlayEditorStyle } from "./markdown-overlay-editor-style";
import { EditPencil, Checkmark } from "../../common/utils";
import { Rectangle } from "data-grid/data-grid-types";

interface Props {
    readonly targetRect: Rectangle;
    readonly markdown: string;
    readonly onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    readonly onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly forceEditMode: boolean;
    createNode?: (content: string) => DocumentFragment;
}

const MarkdownOverlayEditor: React.FunctionComponent<Props> = p => {
    const { markdown, onChange, onKeyDown, forceEditMode, createNode, targetRect } = p;

    const [editMode, setEditMode] = React.useState<boolean>(markdown === "" || forceEditMode);

    const onEditClick = React.useCallback(() => {
        setEditMode(!editMode);
    }, [editMode]);

    if (editMode) {
        return (
            // <MarkdownOverlayEditorStyle targetRect={targetRect}>
            <MarkdownOverlayEditorStyle style={{ paddingRight: 36 }} targetRect={targetRect}>
                <GrowingEntry
                    style={{ marginTop: 10 }}
                    autoFocus={true}
                    onKeyDown={onKeyDown}
                    value={markdown}
                    onChange={onChange}
                />
                <div className="edit-icon" onClick={onEditClick}>
                    <Checkmark />
                </div>
            </MarkdownOverlayEditorStyle>
        );
    }

    return (
        <MarkdownOverlayEditorStyle targetRect={targetRect}>
            <MarkdownDiv contents={markdown} createNode={createNode} />
            <div className="edit-icon" onClick={onEditClick}>
                <EditPencil />
            </div>
            <textarea className="md-edit-textarea" autoFocus={true} onKeyDown={onKeyDown} />
        </MarkdownOverlayEditorStyle>
    );
};

export default MarkdownOverlayEditor;
