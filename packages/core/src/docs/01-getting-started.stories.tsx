import * as React from "react";

import { GridCell, GridCellKind, GridColumn, Item } from "../data-grid/data-grid-types";
import { DataEditor } from "../data-editor/data-editor";

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

const data: DummyItem[] = [
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
];

export const GettingStarted: React.VFC = () => {
    const getContent = React.useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const dataRow = data[row];
        const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
        const d = dataRow[indexes[col]];
        return {
            kind: GridCellKind.Text,
            allowOverlay: false,
            displayData: d,
            data: d,
        };
    }, []);

    const [rowMarkers, setRowMarkers] = React.useState(false);
    const [smoothScroll, setSmoothScroll] = React.useState(false);
    const [verticalBorder, setVerticalBorder] = React.useState(true);

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

    return (
        <DocWrapper>
            <Marked>
                {`
# Getting Started

Glide data grid is a powerful but flexible library requiring very few concepts required to get started. The grid will need data, columns, and a \`getCellContent\` callback to convert our data into cells on demand. Because the callback is used, there is no need to pre-format the data in any particular way, so long as it can be transformed into a cell. This example uses a flat array of objects.`}
            </Marked>
            <Highlight>
                {`
const data = [
    {
      "name": "Hines Fowler",
      "company": "BUZZNESS",
      "email": "hinesfowler@buzzness.com",
      "phone": "+1 (869) 405-3127"
    },
    ...rest
]
`}
            </Highlight>
            <Marked>
                {`
The columns of the data grid may contain many options, including icons, menus, theme overrides, however at their most basic they only require a \`title\` and an \`id\`. The id is technically optional but it is best not to omit it.`}
            </Marked>
            <Highlight>
                {`
const columns: GridColumn[] = [
    {
        title: "Name",
        id: "name"
    },
    {
        title: "Company",
        id: "company"
    },
    {
        title: "Email",
        id: "email"
    },
    {
        title: "Phone",
        id: "phone"
    }
]
`}
            </Highlight>
            <Marked>
                {`
Each column will automatically size based on its contents. If desired the sise of each column can be overridden by setting the width parameter.

Finally the data grid requires a cell fetch callback. This callback should be memoized using \`React.useCallback\` or be a static function.`}
            </Marked>
            <Highlight>
                {`
const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    // dumb but simple way to do this
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]]
    return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: d,
        data: d,
    };
}, []);
`}
            </Highlight>
            <Marked>
                {`
> Avoid excessive changes to the identity of the \`getCellContent\` callback as the grid will re-render from scratch every time it changes.

That is all the basic requirements put together.`}
            </Marked>
            <Highlight>
                {`
return <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />;
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />
            </Wrapper>
            <Marked>
                {`
# Going further

There is so much more that can be done:

- Header icons
- Smooth scrolling
- Header menus
- Grouping
- Row markers
- Freeze Columns
- Column reordering and resizing
- Cell spans
- Search
- Copy/paste support

Here are a few to play with.`}
            </Marked>
            <label style={{ display: "block" }}>
                <input type="checkbox" checked={rowMarkers} onChange={e => setRowMarkers(e.target.checked)} /> Row
                Markers
            </label>
            <label style={{ display: "block" }}>
                <input type="checkbox" checked={smoothScroll} onChange={e => setSmoothScroll(e.target.checked)} />{" "}
                Smooth Scroll
            </label>
            <label style={{ display: "block" }}>
                <input type="checkbox" checked={verticalBorder} onChange={e => setVerticalBorder(e.target.checked)} />{" "}
                Vetical Borders
            </label>
            <Wrapper height={200}>
                <DataEditor
                    getCellContent={getContent}
                    verticalBorder={verticalBorder}
                    smoothScrollX={smoothScroll}
                    smoothScrollY={smoothScroll}
                    rowMarkers={rowMarkers ? "both" : "none"}
                    columns={columns}
                    rows={data.length}
                />
            </Wrapper>
        </DocWrapper>
    );
};
(GettingStarted as any).storyName = "01. Getting Started";
(GettingStarted as any).parameters = {
    options: {
        showPanel: false,
    },
};
