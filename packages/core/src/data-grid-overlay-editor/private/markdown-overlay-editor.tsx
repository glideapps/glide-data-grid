import * as React from "react";
import MarkdownDiv from "../../markdown-div/markdown-div";
import { GrowingEntry } from "../../growing-entry/growing-entry";
import { MarkdownOverlayEditorStyle } from "./markdown-overlay-editor-style";
import { EditPencil, Checkmark } from "../../common/utils";
import type { MarkdownCell, Rectangle, SelectionRange } from "../../data-grid/data-grid-types";

interface Props {
    readonly targetRect: Rectangle;
    readonly onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly forceEditMode: boolean;
    readonly onFinish: (newValue?: MarkdownCell | undefined) => void;
    readonly validatedSelection?: SelectionRange;

    readonly value: MarkdownCell;

    createNode?: (content: string) => DocumentFragment;
}

export const MarkdownOverlayEditor: React.FunctionComponent<Props> = p => {
    const { value, onChange, forceEditMode, createNode, targetRect, onFinish, validatedSelection } = p;

    const markdown = value.data;
    const readonly = value.readonly === true;

    const [editMode, setEditMode] = React.useState<boolean>(markdown === "" || forceEditMode);
    const onEditClick = React.useCallback(() => {
        setEditMode(e => !e);
    }, []);
    const addLeftPad = markdown ? "gdg-ml-6" : "";

    if (editMode) {
        return (
            <MarkdownOverlayEditorStyle targetWidth={targetRect.width - 20}>
                <GrowingEntry
                    autoFocus={true}
                    highlight={false}
                    validatedSelection={validatedSelection}
                    value={markdown}
                    onKeyDown={e => {
                        if (e.key === "Enter") e.stopPropagation();
                    }}
                    onChange={onChange}
                />
                <div className={`gdg-edit-icon gdg-checkmark-hover ${addLeftPad}`} onClick={() => onFinish(value)}>
                    <Checkmark />
                </div>
            </MarkdownOverlayEditorStyle>
        );
    }
    return (
        <MarkdownOverlayEditorStyle targetWidth={targetRect.width}>
            <MarkdownDiv contents={markdown} createNode={createNode} />
            {!readonly && (
                <>
                    <div className="spacer" />
                    <div className={`gdg-edit-icon gdg-edit-hover ${addLeftPad}`} onClick={onEditClick}>
                        <EditPencil />
                    </div>
                </>
            )}
            <textarea className="gdg-md-edit-textarea gdg-input" autoFocus={true} />
        </MarkdownOverlayEditorStyle>
    );
};
