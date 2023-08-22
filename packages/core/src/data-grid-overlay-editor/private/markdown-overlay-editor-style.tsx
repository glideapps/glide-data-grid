import { GrowingEntryStyle } from "../../growing-entry/growing-entry-style";
import { styled } from "@linaria/react";

interface Props {
    targetWidth: number;
}

export const MarkdownOverlayEditorStyle = styled.div<Props>`
    min-width: ${p => p.targetWidth}px;
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

    .gdg-spacer {
        flex: 1;
    }

    .gdg-edit-icon {
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

    .gdg-edit-hover {
        :hover {
            background-color: var(--gdg-accent-light);
            transition: background-color 150ms;
        }
    }

    .gdg-checkmark-hover {
        :hover {
            color: #ffffff;
            background-color: var(--gdg-accent-color);
        }
    }

    .gdg-md-edit-textarea {
        position: relative;
        top: 0px;
        left: 0px;
        width: 0px;
        height: 0px;
        margin-top: 25px;
        opacity: 0;
        padding: 0;
    }

    .gdg-ml-6 {
        margin-left: 6px;
    }
`;
