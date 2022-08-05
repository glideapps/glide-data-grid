import type { DrilldownCellData } from "../../data-grid/data-grid-types";
import * as React from "react";
import { styled } from "@linaria/react";

const DrilldownOverlayEditorStyle = styled.div`
    display: flex;
    flex-wrap: wrap;

    .doe-bubble {
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 100px;

        padding: 0 8px;
        height: 24px;

        background-color: var(--gdg-bg-cell);
        color: var(--gdg-text-dark);
        margin: 2px;

        border-radius: 6px;

        box-shadow: 0 0 1px rgba(62, 65, 86, 0.4), 0 1px 3px rgba(62, 65, 86, 0.4);

        img {
            height: 16px;
            object-fit: contain;

            margin-right: 4px;
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

interface Props {
    readonly drilldowns: readonly DrilldownCellData[];
    readonly onKeyDown: (event: React.KeyboardEvent) => void;
}

const DrilldownOverlayEditor: React.FunctionComponent<Props> = p => {
    const { drilldowns, onKeyDown } = p;
    return (
        <DrilldownOverlayEditorStyle>
            {drilldowns.map((d, i) => (
                <div key={i} className="doe-bubble">
                    {d.img !== undefined && <img src={d.img} />}
                    <div>{d.text}</div>
                </div>
            ))}
            <textarea className="gdg-input" autoFocus={true} onKeyDown={onKeyDown} />
        </DrilldownOverlayEditorStyle>
    );
};
export default DrilldownOverlayEditor;
