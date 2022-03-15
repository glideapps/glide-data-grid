import { ProvideEditorComponent } from "@glideapps/glide-data-grid";
import * as React from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import styled from "styled-components";
import type { ArticleCell } from "./article-cell-types";

const Wrapper = styled.div`
    .footer {
        display: flex;
        justify-content: flex-end;
        padding: 20px;

        button {
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            border-radius: 9px;
            font-weight: 500;
            font-family: ${p => p.theme.fontFamily};
            cursor: pointer;
        }
    }
    .save-button {
        background-color: ${p => p.theme.accentColor};
        color: ${p => p.theme.accentFg};
    }

    .close-button {
        background-color: ${p => p.theme.bgHeader};
        color: ${p => p.theme.textMedium};
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
            <div className="footer">
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
                <button className="save-button" onClick={onSave}>
                    Save
                </button>
            </div>
        </Wrapper>
    );
};

export default ArticleCellEditor;
