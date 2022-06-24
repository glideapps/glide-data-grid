import { styled } from "../common/styles";
import { Rectangle } from "../data-grid/data-grid-types";
import { GrowingEntryStyle } from "../growing-entry/growing-entry-style";

interface Props {
    targetRect: Rectangle;
    pad: boolean;
}
export const DataGridOverlayEditorStyle = styled.div<Props>`
    position: absolute;

    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;

    --overlay-top: ${p => p.targetRect.y}px;

    left: ${p => p.targetRect.x - 1}px;
    top: ${p => p.targetRect.y - 1}px;
    min-width: ${p => p.targetRect.width + 2}px;
    min-height: ${p => p.targetRect.height + 2}px;
    width: max-content;
    max-width: 400px;
    max-height: calc(100vh - ${p => p.targetRect.y + 10}px);

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
        ${p => p.pad && `padding: ${Math.max(0, (p.targetRect.height - 28) / 2)}px 8.5px 3px;`}

        box-shadow: 0 0 0 1px var(--gdg-accent-color), 0px 0px 1px rgba(62, 65, 86, 0.4),
            0px 6px 12px rgba(62, 65, 86, 0.15);

        animation: glide_fade_in 60ms 1;
    }

    .clip-region {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 2px;
        flex-grow: 1;

        ${GrowingEntryStyle} {
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
