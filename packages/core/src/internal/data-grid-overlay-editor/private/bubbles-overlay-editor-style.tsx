import { styled } from "@linaria/react";

const BUBBLE_HEIGHT = 20;

export const BubblesOverlayEditorStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: auto;
    margin-bottom: auto;

    .boe-bubble {
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: var(--gdg-rounding-radius, ${BUBBLE_HEIGHT / 2}px);

        padding: 0 8px;
        height: ${BUBBLE_HEIGHT}px;
        background-color: var(--gdg-bg-bubble);
        color: var(--gdg-text-dark);
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
