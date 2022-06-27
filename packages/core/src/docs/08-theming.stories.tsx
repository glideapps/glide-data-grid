import * as React from "react";

import { GridCell, GridCellKind, GridColumn, Item } from "../data-grid/data-grid-types";
import { DataEditor } from "../data-editor/data-editor";

import { SimpleThemeWrapper } from "../stories/story-utils";
import { DocWrapper, Highlight, Marked, Wrapper } from "./doc-wrapper";
import { Theme } from "../common/styles";

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

export const Theming: React.VFC = () => {
    const getContent = React.useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const dataRow = data[row];
        const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
        const d = dataRow[indexes[col]];
        return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            displayData: d,
            data: d,
        };
    }, []);

    const getContentThemed = React.useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const dataRow = data[row];
        const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
        const d = dataRow[indexes[col]];

        let theme: Partial<Theme> | undefined = undefined;

        if (col === 1 && row === 1) {
            theme = {
                textDark: "#FF0000",
            };
        }

        return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            displayData: d,
            data: d,
            themeOverride: theme,
        };
    }, []);

    const getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {
        if (row % 2 === 0) {
            return {
                bgCell: "#F9FDFF",
            };
        }
        return undefined;
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

    const themeColumns = React.useMemo<GridColumn[]>(() => {
        return [
            {
                title: "Name",
                id: "name",
            },
            {
                title: "Company",
                themeOverride: {
                    textDark: "#225588",
                    baseFontStyle: "600 13px",
                },
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
# Theming

Theming the Glide Data Grid is a cascaded through 5 levels

0. Default theme
1. Global
2. Group
3. Column
4. Row
5. Cell

At each level parts of the theme can be overridden. This example will pro

## Global Theming

The global theme is provided by the DataEditor by default and can be overriden by setting the \`theme\` prop. All themes contain the following properties.

| Property | Type | Description |
|---|---|----|
| accentColor | string | The primary accent color of the grid. This will show up in focus rings and selected rows/headers. |
| accentFg | string | A foreground color which works well on top of the accent color. |
| accentLight | string | A lighter version of the accent color used to hint selection. |
| textDark | string | The standard text color. |
| textMedium | string | A lighter text color used for non-editable data in some cases. |
| textLight | string | An even lighter text color |
| textBubble | string | The text color used in bubbles |
| bgIconHeader | string | The background color for header icons |
| fgIconHeader | string | The foreground color for header icons |
| textHeader | string | The header text color |
| textGroupHeader | string \\| undefined | The group header text color, if none provided the \`textHeader\` is used instead. |
| textHeaderSelected | string | The text color used for selected headers |
| bgCell | string | The primary background color of the data grid. |
| bgCellMedium | string | Used for disabled or otherwise off colored cells. |
| bgHeader | string | The header background color |
| bgHeaderHasFocus | string | The header background color when its column contains the selected cell |
| bgHeaderHovered | string | The header background color when it is hovered |
| bgBubble | string | The background color used in bubbles |
| bgBubbleSelected | string | The background color used in bubbles when the cell is selected |
| bgSearchResult | string | The background color used for cells which match the search string |
| borderColor | string | The color of all vertical borders and horizontal borders if a horizontal override is not provided |
| horizontalBorderColor | string \\| undefined | The horizontal border color override |
| drilldownBorder | string | The ring color of a drilldown cell |
| linkColor | string | What color to render links |
| cellHorizontalPadding | number | The internal horizontal padding size of a cell. |
| cellVerticalPadding | number | The internal vertical padding size of a cell. |
| headerFontStyle | string | The font style of the header. e.g. \`bold 15px\` |
| baseFontStyle | string | The font style used for cells by default, e.g. \`13px\` |
| fontFamily | string | The font family used by the data grid. |
| editorFontSize | string | The font size used by overlay editors. |

If an option is missing from any theme it will be filled in with the default theme.
`}
            </Marked>
            <Highlight>
                {`
return <ThemeProvider theme={{
    bgCell: "#F2F9FF"
}}>
    <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />
</ThemeProvider>
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor
                    theme={{
                        bgCell: "#F2F9FF",
                    }}
                    getCellContent={getContent}
                    columns={columns}
                    rows={data.length}
                />
            </Wrapper>
            <Marked>
                {`### Column themes
Themes can be applied at the column level as well by setting the \`themeOverride\` on the \`GridColumn\`.`}
            </Marked>
            <Highlight>
                {`
const columns = React.useMemo<GridColumn[]>(() => {
    return [
        {
            title: "Name",
            id: "name",
        },
        {
            title: "Company",
            themeOverride: {
                textDark: "#225588",
                baseFontStyle: "600 13px",
            },
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
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor
                    theme={{
                        bgCell: "#F2F9FF",
                    }}
                    getCellContent={getContent}
                    columns={themeColumns}
                    rows={data.length}
                />
            </Wrapper>
            <Marked>{`### Row themes`}</Marked>
            <Highlight>
                {`
const getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {
    if (row % 2 === 0) {
        return {
            bgCell: "#F9FDFF"
        }
    }
    return undefined;
}, []);

return <DataEditor {...rest} getRowThemeOverride={getRowThemeOverride} />
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor
                    theme={{
                        bgCell: "#F2F9FF",
                    }}
                    getRowThemeOverride={getRowThemeOverride}
                    getCellContent={getContent}
                    columns={themeColumns}
                    rows={data.length}
                />
            </Wrapper>
            <Marked>{`### Cell themes`}</Marked>
            <Highlight>
                {`
const getContent = React.useCallback((cell: Item): GridCell => {
    let theme: Partial<Theme> | undefined = undefined;
    if (col === 1 && row === 1) {
        theme = {
            textDark: "#FF0000",
        }
    }
    
    const d = getDataForCell(col, row);
    return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: d,
        data: d,
        themeOverride: theme
    };
}, []);
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor
                    theme={{
                        bgCell: "#F2F9FF",
                    }}
                    getRowThemeOverride={getRowThemeOverride}
                    getCellContent={getContentThemed}
                    columns={themeColumns}
                    rows={data.length}
                />
            </Wrapper>
        </DocWrapper>
    );
};
(Theming as any).storyName = "08. Theming";
(Theming as any).parameters = {
    options: {
        showPanel: false,
    },
};
