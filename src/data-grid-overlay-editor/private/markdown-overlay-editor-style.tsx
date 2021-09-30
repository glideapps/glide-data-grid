import { Rectangle } from "data-grid/data-grid-types";
import { styled } from "../../common/styles";

interface Props {
    targetRect: Rectangle;
}
export const MarkdownOverlayEditorStyle = styled.div<Props>`
    min-width: ${p => p.targetRect.width}px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    color: ${p => p.theme.fgColorDark};

    .edit-icon {
        position: relative;
        width: 24px;
        height: 24px;
        color: ${p => p.theme.acceptColor};
        border-radius: 6px;

        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        > * {
            width: 24px;
            height: 24px;
        }
        margin: 10px 0px 0px 10px;
    }

    .edit-hover {
        :hover {
            background-color: ${p => p.theme.b300};
        }
    }

    .checkmark-hover {
        :hover {
            color: #ffffff;
            background-color: ${p => p.theme.acceptColor};
        }
    }

    .md-edit-textarea {
        position: relative;
        top: 0px;
        left: 0px;
        width: 0px;
        height: 0px;
        margin-top: 25px;
        opacity: 0;
        padding: 0;
    }
`;
