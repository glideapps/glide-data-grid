import { styled } from "../../common/styles";

export const BubblesOverlayEditorStyle = styled.div`
    display: flex;
    flex-wrap: wrap;

    .boe-bubble {
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 100px;

        padding: 0 8px;
        height: 20px;

        background-color: ${p => p.theme.bgBubble};
        color: ${p => p.theme.textDark};
        margin: 2px;
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
