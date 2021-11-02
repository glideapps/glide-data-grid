import styled from "styled-components";
import * as React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { DataEditor, DataEditorContainer, DataEditorProps, GridCellKind } from "@glideapps/glide-data-grid";
import { useExtraCells } from ".";
import { StarCell } from "./star-cell";

const SimpleWrapper = styled.div`
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;

    box-sizing: border-box;

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
`;

const SimpleThemeWrapper: React.FC = p => {
    return (
        <SimpleWrapper>
            <div className="content">{p.children}</div>
        </SimpleWrapper>
    );
};

export default {
    title: "Extra Cells",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

const BeautifulStyle = styled.div`
    background-color: #2790b9;
    background: linear-gradient(90deg, #2790b9, #2070a9);
    color: white;

    padding: 32px 48px;

    display: flex;
    flex-direction: column;
    height: 100vh;

    font-family: sans-serif;

    & > h1 {
        font-size: 50px;
        font-weight: 600;
        flex-shrink: 0;
        margin: 0 0 12px 0;
    }

    .sizer {
        flex-grow: 1;

        background-color: white;

        border-radius: 12px;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

        .sizer-clip {
            border-radius: 12px;
            overflow: hidden;
            transform: translateZ(0);

            height: 100%;
        }
    }
`;

interface BeautifulProps {
    title: string;
    description?: React.ReactNode;
}

const BeautifulWrapper: React.FC<BeautifulProps> = p => {
    const { title, children, description } = p;
    return (
        <BeautifulStyle>
            <h1>{title}</h1>
            {description}
            <div className="sizer">
                <div className="sizer-clip">
                    <AutoSizer>
                        {(props: { width?: number; height?: number }) => (
                            <DataEditorContainer width={props.width ?? 100} height={props.height ?? 100}>
                                {children}
                            </DataEditorContainer>
                        )}
                    </AutoSizer>
                </div>
            </div>
        </BeautifulStyle>
    );
};

const PropName = styled.span`
    font-family: monospace;
    font-weight: 500;
    color: #ffe394;
`;

const Description = styled.p`
    font-size: 18px;
    flex-shrink: 0;
    margin: 0 0 20px 0;
`;

const defaultProps: Partial<DataEditorProps> = {
    smoothScrollX: true,
    smoothScrollY: true,
    isDraggable: false,
    rowMarkers: "none",
};

export const ResizableColumns: React.VFC = () => {
    const { drawCustomCell } = useExtraCells();

    return (
        <BeautifulWrapper
            title="Resizable columns"
            description={
                <Description>
                    You can resize columns by dragging their edges, as long as you respond to the{" "}
                    <PropName>onColumnResized</PropName> prop.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                drawCustomCell={drawCustomCell}
                getCellContent={() =>
                    ({
                        kind: GridCellKind.Custom,
                        allowOverlay: false,
                        copyData: "",
                        data: {
                            kind: "star-cell",
                            label: "Test",
                            rating: 4,
                        },
                    } as StarCell)
                }
                columns={[
                    {
                        title: "Test",
                        width: 200,
                    },
                ]}
                rows={500}
            />
        </BeautifulWrapper>
    );
};
(ResizableColumns as any).parameters = {
    options: {
        showPanel: false,
    },
};
