import { styled } from "../../common/styles";

export const ImageOverlayEditorStyle = styled.div`
    display: flex;

    height: 100%;

    .centering-container {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;

        img,
        canvas {
            max-height: calc(100vh - var(--overlay-top) - 20px);
            object-fit: contain;
            user-select: none;
        }

        canvas {
            max-width: 380px;
        }
    }

    .edit-icon {
        position: absolute;
        top: 12px;
        right: 0;
        width: 48px;
        height: 48px;
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
