import type { ProvideEditorComponent } from "@glideapps/glide-data-grid";
import * as React from "react";
import { Editor } from "@toast-ui/react-editor";
import { styled } from "@linaria/react";
import type { ArticleCell } from "./article-cell-types.js";

const Wrapper = styled.div`
    .gdg-footer {
        display: flex;
        justify-content: flex-end;
        padding: 20px;

        button {
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            border-radius: 9px;
            font-weight: 500;
            font-family: var(--gdg-font-family);
            cursor: pointer;
        }
    }
    .gdg-save-button {
        background-color: var(--gdg-accent-color);
        color: var(--gdg-accent-fg);
    }

    .gdg-close-button {
        background-color: var(--gdg-bg-header);
        color: var(--gdg-text-medium);
        margin-right: 8px;
    }
`;

const ArticleCellEditor: ProvideEditorComponent<ArticleCell> = p => {
    const [tempValue, setTempValue] = React.useState(p.value.data.markdown);

    const onKeyDown = React.useCallback((e: React.KeyboardEvent) => {
        e.stopPropagation();
    }, []);

    const onSave = React.useCallback(() => {
        p.onFinishedEditing({
            ...p.value,
            data: {
                ...p.value.data,
                markdown: tempValue,
            },
        });
    }, [p, tempValue]);

    const onClose = React.useCallback(() => {
        p.onFinishedEditing(undefined);
    }, [p]);

    return (
        <Wrapper id="markdown-wysiwyg" onKeyDown={onKeyDown}>
            <Editor
                initialEditType="wysiwyg"
                autofocus={true}
                initialValue={p.value.data.markdown}
                hideModeSwitch={true}
                onChange={setTempValue}
                height="75vh"
                usageStatistics={false}
                toolbarItems={[
                    ["heading", "bold", "italic", "strike"],
                    ["hr", "quote"],
                    ["ul", "ol", "task", "indent", "outdent"],
                    ["table", "link"],
                    ["code", "codeblock"],
                ]}
            />
            <div className="gdg-footer">
                <button className="gdg-close-button" onClick={onClose}>
                    Close
                </button>
                <button className="gdg-save-button" onClick={onSave}>
                    Save
                </button>
            </div>
        </Wrapper>
    );
};

export default ArticleCellEditor;
