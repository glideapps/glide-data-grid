import { styled } from "../../common/styles";

export const MarkdownOverlayEditorStyle = styled.div`
    display: flex;

    position: relative;

    .edit-icon {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 40px;
        height: 40px;
        color: ${p => p.theme.acceptColor};

        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        > * {
            width: 24px;
            height: 24px;
        }
    }

    textarea {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 0px;
        height: 0px;

        opacity: 0;
    }
`;
