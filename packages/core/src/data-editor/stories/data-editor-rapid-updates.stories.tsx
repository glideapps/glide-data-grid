import * as React from "react";
import { BeautifulWrapper, Description, MoreInfo, useMockDataGenerator } from "./utils";
import { DataEditor, DataEditorProps, DataEditorRef } from "../data-editor";
import { GridCellKind, Item } from "../../data-grid/data-grid-types";
import { SimpleThemeWrapper } from "../../stories/story-utils";
import { styled } from "@linaria/react";


const KeyName = styled.kbd`
    background-color: #f4f4f4;
    color: #2b2b2b;
    padding: 2px 6px;
    font-family: monospace;
    font-size: 14px;
    border-radius: 4px;
    box-shadow: 0px 1px 2px #00000040;
    margin: 0 0.1em;
`;
export default {
    title: "Glide-Data-Grid/Rapid Updates",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

let num: number = 1;
function rand(): number {
    return (num = (num * 16_807) % 2_147_483_647);
}

const defaultProps: Partial<DataEditorProps> = {
    smoothScrollX: true,
    smoothScrollY: true,
    isDraggable: false,
    getCellsForSelection: true,
    rowMarkers: "none",
    width: "100%",
};

export const RapidUpdates: React.VFC = () => {
    const { cols, getCellContent, setCellValueRaw, getCellsForSelection } = useMockDataGenerator(100);

    const ref = React.useRef<DataEditorRef>(null);

    const countRef = React.useRef(0);
    const displayCountRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        let rafID = 0;

        const sendUpdate = () => {
            const cells: {
                cell: Item;
            }[] = [];
            const now = performance.now();
            for (let x = 0; x < 5000; x++) {
                const col = Math.max(10, rand() % 100);
                const row = rand() % 10_000;

                setCellValueRaw([col, row], {
                    kind: GridCellKind.Text,
                    data: x.toString(),
                    displayData: `${x}k`,
                    themeOverride:
                        x % 5 !== 0
                            ? {
                                bgCell: "#f2fff4",
                                textDark: "#00d41c",
                            }
                            : {
                                bgCell: "#fff6f6",
                                textDark: "#d40000",
                            },
                    allowOverlay: true,
                    lastUpdated: now,
                });
                cells.push({ cell: [col, row] });
            }
            countRef.current += 5000;
            if (displayCountRef.current !== null) {
                displayCountRef.current.textContent = `${countRef.current}`;
            }

            ref.current?.updateCells(cells);

            rafID = window.requestAnimationFrame(sendUpdate);
        };

        sendUpdate();

        return () => {
            cancelAnimationFrame(rafID);
        };
    }, [setCellValueRaw]);

    return (
        <BeautifulWrapper
            title="Rapid updating"
            description={
                <>
                    <Description>
                        Data grid can support many thousands of updates per seconds. The data grid can easily update
                        data faster than a human can read it, more importantly the faster the data grid can update, the
                        more time your code can spend doing more valuable work.
                    </Description>
                    <MoreInfo>
                        Updates processed: <KeyName ref={displayCountRef} /> We could do this faster but we wrote a
                        really crappy data store for this demo which is actually slowing down the data grid.
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                ref={ref}
                getCellContent={getCellContent}
                getCellsForSelection={getCellsForSelection}
                columns={cols}
                rows={10_000}
            />
        </BeautifulWrapper>
    );
};
(RapidUpdates as any).parameters = {
    options: {
        showPanel: false,
    },
};
