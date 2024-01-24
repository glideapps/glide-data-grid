import { styled } from "@linaria/react";

export const UriOverlayEditorStyle = styled.div`
    display: flex;

    flex-grow: 1;

    align-items: center;

    min-height: 21px;

    .link-area {
        flex-grow: 1;
        flex-shrink: 1;

        cursor: pointer;

        margin-right: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        color: var(--gdg-link-color);
        text-decoration: underline !important;
    }

    .edit-icon {
        flex-shrink: 0;
        width: 32px;
        color: var(--gdg-accent-color);

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
