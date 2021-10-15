import { styled } from "../../common/styles";

export const UriOverlayEditorStyle = styled.div`
    display: flex;

    flex-grow: 1;

    align-items: center;

    .link-area {
        flex-grow: 1;
        flex-shrink: 1;

        display: grid;

        margin-right: 8px;
    }

    a {
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
