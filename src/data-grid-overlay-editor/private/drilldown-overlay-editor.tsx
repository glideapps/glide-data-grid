import { DrilldownCellData } from "data-grid/data-grid-types";
import * as React from "react";
import { styled } from "../../common/styles";

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

        background-color: ${p => p.theme.dataViewer.gridColor};
        color: ${p => p.theme.fgColorDark};
        margin: 2px;

        border-radius: 6px;

        box-shadow: 0 0 1px rgba(62, 65, 86, 0.4), 0 1px 3px rgba(62, 65, 86, 0.4);

        .svg-container {
            margin: 0 -3px 0 -10px;
            line-height: 0;
        }

        svg {
            color: ${p => p.theme.fgColorMedium};

            width: 20px;
            height: 20px;

            transform: rotate(-90deg);
        }

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

const Chevron = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8.41421 9C7.52331 9 7.07714 10.0771 7.70711 10.7071L11.2929 14.2929C11.6834 14.6834 12.3166 14.6834 12.7071 14.2929L16.2929 10.7071C16.9229 10.0771 16.4767 9 15.5858 9H8.41421Z"
            fill="currentColor"
        />
    </svg>
);

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
                    <div className="svg-container">
                        <Chevron />
                    </div>
                    {d.img !== undefined && <img src={d.img} />}
                    <div>{d.text}</div>
                </div>
            ))}
            <textarea autoFocus={true} onKeyDown={onKeyDown} />
        </DrilldownOverlayEditorStyle>
    );
};
export default DrilldownOverlayEditor;
