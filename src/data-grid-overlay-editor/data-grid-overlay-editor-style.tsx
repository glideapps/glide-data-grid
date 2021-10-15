import { styled } from "../common/styles";
import { Rectangle } from "../data-grid/data-grid-types";
import { GrowingEntryStyle } from "../growing-entry/growing-entry-style";

interface Props {
    targetRect: Rectangle;
}
export const DataGridOverlayEditorStyle = styled.div<Props>`
    position: absolute;

    box-sizing: border-box;

    --overlay-top: ${p => p.targetRect.y}px;

    left: ${p => p.targetRect.x - 1}px;
    top: ${p => p.targetRect.y - 1}px;
    min-width: ${p => p.targetRect.width + 2}px;
    min-height: ${p => p.targetRect.height + 2}px;
    width: max-content;
    max-width: 400px;
    max-height: calc(100vh - ${p => p.targetRect.y + 10}px);

    border-radius: 2px;
    background-color: ${p => p.theme.bgCell};

    box-shadow: 0 0 0 1px ${p => p.theme.accentColor}, 0px 0px 1px rgba(62, 65, 86, 0.4),
        0px 6px 12px rgba(62, 65, 86, 0.15);

    font-family: ${p => p.theme.fontFamily};
    font-size: 13px;

    padding: ${p => Math.max(0, (p.targetRect.height - 28) / 2)}px 8.5px 3px;

    .clip-region {
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        overflow-y: auto;
        overflow-x: hidden;
        input {
            width: 100%;

            border: none;
            border-width: 0;
            outline: none;
        }

        textarea {
            border: none;
            border-width: 0;
            outline: none;
        }

        ${GrowingEntryStyle} {
            height: 100%;
        }
    }

    text-align: start;
`;
