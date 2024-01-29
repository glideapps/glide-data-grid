import { styled } from "@linaria/react";

interface Props {
    targetX: number;
    targetY: number;
    targetWidth: number;
    targetHeight: number;
}
export const DataGridOverlayEditorStyle = styled.div<Props>`
    position: absolute;

    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;

    --overlay-top: ${p => p.targetY}px;

    left: ${p => p.targetX}px;
    top: ${p => p.targetY}px;
    min-width: ${p => p.targetWidth}px;
    min-height: ${p => p.targetHeight}px;
    width: max-content;
    max-width: 400px;
    max-height: calc(100vh - ${p => p.targetY + 10}px);

    font-family: var(--gdg-font-family);
    font-size: var(--gdg-editor-font-size);

    @keyframes glide_fade_in {
        from {
            opacity: 0%;
        }

        to {
            opacity: 100%;
        }
    }

    &.gdg-style {
        border-radius: 2px;
        background-color: var(--gdg-bg-cell);

        box-shadow:
            0 0 0 1px var(--gdg-accent-color),
            0px 0px 1px rgba(62, 65, 86, 0.4),
            0px 6px 12px rgba(62, 65, 86, 0.15);

        animation: glide_fade_in 60ms 1;
    }

    &.gdg-pad {
        padding: ${p => Math.max(0, (p.targetHeight - 28) / 2)}px 8.5px 3px;
    }

    .gdg-clip-region {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 2px;
        flex-grow: 1;

        .gdg-growing-entry {
            height: 100%;
        }

        & input.gdg-input {
            width: 100%;
            border: none;
            border-width: 0;
            outline: none;
        }

        & textarea.gdg-input {
            border: none;
            border-width: 0;
            outline: none;
        }
    }

    text-align: start;
`;
