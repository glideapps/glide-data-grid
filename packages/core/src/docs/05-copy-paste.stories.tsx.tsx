import * as React from "react";

import { EditableGridCell, GridCell, GridCellKind, GridColumn, Rectangle } from "../data-grid/data-grid-types";
import { DataEditor, DataEditorProps, DataEditorRef } from "../data-editor/data-editor";

import { SimpleThemeWrapper } from "../stories/story-utils";
import { DocWrapper, Highlight, Marked, Wrapper } from "./doc-wrapper";

export default {
    title: "Glide-Data-Grid/Docs",
    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

interface DummyItem {
    name: string;
    company: string;
    phone: string;
    email: string;
}

export const CopyPaste: React.VFC = () => {
    const dataRef = React.useRef([
        {
            name: "Deidre Morris",
            company: "GONKLE",
            email: "deidremorris@gonkle.com",
            phone: "+1 (867) 507-3332",
        },
        {
            name: "Sheryl Craig",
            company: "EVENTAGE",
            email: "sherylcraig@eventage.com",
            phone: "+1 (869) 520-2227",
        },
        {
            name: "Lidia Bowers",
            company: "ANOCHA",
            email: "lidiabowers@anocha.com",
            phone: "+1 (808) 414-3826",
        },
        {
            name: "Jones Norton",
            company: "REPETWIRE",
            email: "jonesnorton@repetwire.com",
            phone: "+1 (875) 582-3320",
        },
        {
            name: "Lula Bruce",
            company: "COMDOM",
            email: "lulabruce@comdom.com",
            phone: "+1 (873) 452-2472",
        },
        {
            name: "Larsen Montgomery",
            company: "SQUISH",
            email: "larsenmontgomery@squish.com",
            phone: "+1 (893) 482-3651",
        },
        {
            name: "Becky Bright",
            company: "COMCUR",
            email: "beckybright@comcur.com",
            phone: "+1 (879) 494-2331",
        },
        {
            name: "Charlotte Rowland",
            company: "FROLIX",
            email: "charlotterowland@frolix.com",
            phone: "+1 (861) 439-2134",
        },
        {
            name: "Sonya Hensley",
            company: "GEEKETRON",
            email: "sonyahensley@geeketron.com",
            phone: "+1 (802) 553-2194",
        },
        {
            name: "Stephenson Guthrie",
            company: "EXOSWITCH",
            email: "stephensonguthrie@exoswitch.com",
            phone: "+1 (903) 449-3271",
        },
        {
            name: "Mcmillan Cline",
            company: "TURNLING",
            email: "mcmillancline@turnling.com",
            phone: "+1 (982) 496-2454",
        },
        {
            name: "Kemp Davis",
            company: "TETRATREX",
            email: "kempdavis@tetratrex.com",
            phone: "+1 (859) 594-2982",
        },
        {
            name: "Matilda Levy",
            company: "SLOFAST",
            email: "matildalevy@slofast.com",
            phone: "+1 (841) 521-2444",
        },
        {
            name: "Hattie Simpson",
            company: "COMTRAK",
            email: "hattiesimpson@comtrak.com",
            phone: "+1 (962) 587-3805",
        },
        {
            name: "Kinney Munoz",
            company: "IDETICA",
            email: "kinneymunoz@idetica.com",
            phone: "+1 (921) 513-2012",
        },
        {
            name: "Lambert Raymond",
            company: "TURNABOUT",
            email: "lambertraymond@turnabout.com",
            phone: "+1 (919) 519-2442",
        },
        {
            name: "Bryant Dunlap",
            company: "BYTREX",
            email: "bryantdunlap@bytrex.com",
            phone: "+1 (872) 583-2883",
        },
    ]);

    const getContent = React.useCallback((cell: readonly [number, number]): GridCell => {
        const [col, row] = cell;
        const dataRow = dataRef.current[row];
        const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
        const d = dataRow[indexes[col]];
        return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            displayData: d as string,
            data: d as string,
        };
    }, []);

    const columns = React.useMemo<GridColumn[]>(() => {
        return [
            {
                title: "Name",
                id: "name",
            },
            {
                title: "Company",
                id: "company",
            },
            {
                title: "Email",
                id: "email",
            },
            {
                title: "Phone",
                id: "phone",
            },
        ];
    }, []);

    const getCellsForSelection = React.useCallback<NonNullable<DataEditorProps["getCellsForSelection"]>>(
        s => {
            const result: GridCell[][] = [];
            for (let y = 0; y < s.height; y++) {
                const row = y + s.y;
                const rowArr: GridCell[] = [];
                for (let x = 0; x < s.width; x++) {
                    const col = x + s.x;
                    rowArr.push(getContent([col, row]));
                }
                result.push(rowArr);
            }
            return result;
        },
        [getContent]
    );

    const onCellEdited = React.useCallback((cell: readonly [number, number], newValue: EditableGridCell) => {
        if (newValue.kind !== GridCellKind.Text) {
            // we only have text cells, might as well just die here.
            return;
        }

        const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
        const [col, row] = cell;
        const key = indexes[col];
        dataRef.current[row][key] = newValue.data;
    }, []);

    return (
        <DocWrapper>
            <Marked>
                {`
# Copy Paste

Copy and Paste support is built in to Glide Data Grid. It is not enabled by default to ensure developers are expecting its behavior.

## Copy

By default copy is not enabled, to enabled copy implement the \`getCellsForSelection\` callback. The callback returns results as row-major ordering.

> \`getCellsForSelection\` is used instead of \`getCellContent\` to allow optimization when fetching large amounts of data outside of the visible region.

This example uses a generic function which simply calls \`getContent\`, which is inefficient but fine for a local data source.`}
            </Marked>
            <Highlight>
                {`
const getCellsForSelection = React.useCallback<NonNullable<DataEditorProps["getCellsForSelection"]>>(
    s => {
        const result: GridCell[][] = [];
        for (let y = 0; y < s.height; y++) {
            const row = y + s.y;
            const rowArr: GridCell[] = [];
            for (let x = 0; x < s.width; x++) {
                const col = x + s.x;
                rowArr.push(getContent([col, row]));
            }
            result.push(rowArr);
        }
        return result;
    },
    [getContent]
);

return <DataEditor {...rest} getCellsForSelection={getCellsForSelection} />
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor
                    getCellContent={getContent}
                    getCellsForSelection={getCellsForSelection}
                    columns={columns}
                    rows={dataRef.current.length}
                />
            </Wrapper>
            <textarea
                style={{ padding: 12, width: "100%", height: "200px", borderRadius: 9 }}
                placeholder="Highlight some stuff up there and paste it here"
            />
            <Marked>
                {`
Implementations may wish to use far more efficient mechanisms for fetching data.

## Paste

The easiest way to enable paste is to set \`onPaste\` to true when \`onCellEdited\` is already working. The Glide Data Grid will automatically parse the paste buffer and send cell update events.`}
            </Marked>
            <Highlight>
                {`
return <DataEditor {...rest} onCellEdited={onCellEdited} onPaste={true} />
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor
                    getCellContent={getContent}
                    onCellEdited={onCellEdited}
                    getCellsForSelection={getCellsForSelection}
                    onPaste={true}
                    columns={columns}
                    rows={dataRef.current.length}
                />
            </Wrapper>
            <Marked>{`Try copying this.`}</Marked>
            <textarea
                style={{ padding: 12, width: "100%", height: "80px", borderRadius: 9 }}
                value="Sheryl Craig	EVENTAGE	sherylcraig@eventage.com
Lidia Bowers	ANOCHA	lidiabowers@anocha.com
Jones Norton	REPETWIRE	jonesnorton@repetwire.com"
            />
            <Marked>
                {`
If desired paste events can be handled manually. Passing a callback to \`onPaste\` will instead receive a parsed verison of the pasted data. Returning \`true\` from the callback will cause the paste event to be handled the same as before, emitting \`onCellEdited\`. Returning \`false\` will prevent the edit callback from being emitted.`}
            </Marked>
            <Highlight>
                {`
return <DataEditor
    {...rest}
    onCellEdited={onCellEdited}
    onPaste={(target, value) => {
        window.alert(JSON.stringify({ target, value }));
        return false;
    }}
/>
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor
                    getCellContent={getContent}
                    onCellEdited={onCellEdited}
                    getCellsForSelection={getCellsForSelection}
                    columns={columns}
                    onPaste={(target, value) => {
                        window.alert(JSON.stringify({ target, value }));
                        return false;
                    }}
                    rows={dataRef.current.length}
                />
            </Wrapper>
        </DocWrapper>
    );
};
(CopyPaste as any).storyName = "05. Copy/Paste Support";
(CopyPaste as any).parameters = {
    options: {
        showPanel: false,
    },
};
