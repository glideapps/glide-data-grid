import { styled } from "../../common/styles";

export const UriOverlayEditorStyle = styled.div`
    display: flex;

    flex-grow: 1;

    align-items: center;
    padding-top: 2px;

    .link-area {
        flex-grow: 1;
        flex-shrink: 1;

        margin-right: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        color: ${p => p.theme.linkColor};
        text-decoration: underline !important;
    }

    .edit-icon {
        flex-shrink: 0;
        width: 32px;
        color: ${p => p.theme.accentColor};

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
