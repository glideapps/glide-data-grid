import { Rectangle } from "../../data-grid/data-grid-types";
import { GrowingEntryStyle } from "../../growing-entry/growing-entry-style";
import { styled } from "../../common/styles";

interface Props {
    targetRect: Rectangle;
}
/* buttonVNext 
        variant: accent
        style:   minimal
        size:    xsm
        iconOnly
        toggle to primary
    */

export const MarkdownOverlayEditorStyle = styled.div<Props>`
    min-width: ${p => p.targetRect.width}px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    color: var(--gdg-text-dark);

    ${GrowingEntryStyle} {
        flex-shrink: 1;
        min-width: 0;
    }

    .spacer {
        flex: 1;
    }

    .edit-icon {
        position: relative;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        color: var(--gdg-accent-color);

        padding: 0;

        height: 24px;
        width: 24px;
        flex-shrink: 0;

        transition: all "0.125s ease";

        border-radius: 6px;

        > * {
            width: 16px;
            height: 16px;
        }
    }

    .edit-hover {
        :hover {
            background-color: var(--gdg-accent-light);
            transition: background-color 150ms;
        }
    }

    .checkmark-hover {
        :hover {
            color: #ffffff;
            background-color: var(--gdg-accent-color);
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

    .ml-6 {
        margin-left: 6px;
    }
`;
