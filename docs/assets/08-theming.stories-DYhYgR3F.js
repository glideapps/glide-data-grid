import{r as e}from"./iframe-CtW1CVg1.js";import{G as b}from"./image-window-loader-C_5bZyUb.js";import{D as d}from"./data-editor-all-CUqWUnOy.js";import{S as v}from"./story-utils-DKCi6NPd.js";import{D as k,M as g,H as s,W as h}from"./doc-wrapper-BAv_FHcw.js";import"./throttle-C-KpY_yN.js";import"./marked.esm-BrVFcF7s.js";import"./flatten-DRwPyEc4.js";import"./scrolling-data-grid-BrY_AJhw.js";import"./toConsumableArray-Cg7-Q_9P.js";const A={title:"Glide-Data-Grid/Docs",decorators:[t=>e.createElement(v,null,e.createElement(t,null))]},n=[{name:"Deidre Morris",company:"GONKLE",email:"deidremorris@gonkle.com",phone:"+1 (867) 507-3332"},{name:"Sheryl Craig",company:"EVENTAGE",email:"sherylcraig@eventage.com",phone:"+1 (869) 520-2227"},{name:"Lidia Bowers",company:"ANOCHA",email:"lidiabowers@anocha.com",phone:"+1 (808) 414-3826"},{name:"Jones Norton",company:"REPETWIRE",email:"jonesnorton@repetwire.com",phone:"+1 (875) 582-3320"},{name:"Lula Bruce",company:"COMDOM",email:"lulabruce@comdom.com",phone:"+1 (873) 452-2472"},{name:"Larsen Montgomery",company:"SQUISH",email:"larsenmontgomery@squish.com",phone:"+1 (893) 482-3651"},{name:"Becky Bright",company:"COMCUR",email:"beckybright@comcur.com",phone:"+1 (879) 494-2331"},{name:"Charlotte Rowland",company:"FROLIX",email:"charlotterowland@frolix.com",phone:"+1 (861) 439-2134"},{name:"Sonya Hensley",company:"GEEKETRON",email:"sonyahensley@geeketron.com",phone:"+1 (802) 553-2194"},{name:"Stephenson Guthrie",company:"EXOSWITCH",email:"stephensonguthrie@exoswitch.com",phone:"+1 (903) 449-3271"},{name:"Mcmillan Cline",company:"TURNLING",email:"mcmillancline@turnling.com",phone:"+1 (982) 496-2454"},{name:"Kemp Davis",company:"TETRATREX",email:"kempdavis@tetratrex.com",phone:"+1 (859) 594-2982"},{name:"Matilda Levy",company:"SLOFAST",email:"matildalevy@slofast.com",phone:"+1 (841) 521-2444"},{name:"Hattie Simpson",company:"COMTRAK",email:"hattiesimpson@comtrak.com",phone:"+1 (962) 587-3805"},{name:"Kinney Munoz",company:"IDETICA",email:"kinneymunoz@idetica.com",phone:"+1 (921) 513-2012"},{name:"Lambert Raymond",company:"TURNABOUT",email:"lambertraymond@turnabout.com",phone:"+1 (919) 519-2442"},{name:"Bryant Dunlap",company:"BYTREX",email:"bryantdunlap@bytrex.com",phone:"+1 (872) 583-2883"}],l=()=>{const t=e.useCallback(r=>{const[a,i]=r,o=n[i][["name","company","email","phone"][a]];return{kind:b.Text,allowOverlay:!0,displayData:o,data:o}},[]),T=e.useCallback(r=>{const[a,i]=r,o=n[i][["name","company","email","phone"][a]];let u;return a===1&&i===1&&(u={textDark:"#FF0000"}),{kind:b.Text,allowOverlay:!0,displayData:o,data:o,themeOverride:u}},[]),m=e.useCallback(r=>{if(r%2===0)return{bgCell:"#F9FDFF"}},[]),C=e.useMemo(()=>[{title:"Name",id:"name"},{title:"Company",id:"company"},{title:"Email",id:"email"},{title:"Phone",id:"phone"}],[]),c=e.useMemo(()=>[{title:"Name",id:"name"},{title:"Company",themeOverride:{textDark:"#225588",baseFontStyle:"600 13px"},id:"company"},{title:"Email",id:"email"},{title:"Phone",id:"phone"}],[]);return e.createElement(k,null,e.createElement(g,null,`
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

| Property | CSS Variable | Type | Description |
|---|---|---|----|
| accentColor | --gdg-accent-color | string | The primary accent color of the grid. This will show up in focus rings and selected rows/headers. |
| accentFg | --gdg-accent-fg | string | A foreground color which works well on top of the accent color. |
| accentLight | --gdg-accent-light | string | A lighter version of the accent color used to hint selection. |
| textDark | --gdg-text-dark | string | The standard text color. |
| textMedium | --gdg-text-medium | string | A lighter text color used for non-editable data in some cases. |
| textLight | --gdg-text-light | string | An even lighter text color |
| textBubble | --gdg-text-bubble | string | The text color used in bubbles |
| bgIconHeader | --gdg-bg-icon-header | string | The background color for header icons |
| fgIconHeader | --gdg-fg-icon-header | string | The foreground color for header icons |
| textHeader | --gdg-text-header | string | The header text color |
| bgGroupHeader | --gdg-bg-group-header | string | The group header background color, if none provided the \`bgHeader\` is used instead. |
| bgGroupHeaderHovered | --gdg-bg-group-header-hovered | string | The group header background color when it is hovered, if none provided the \`bgHeaderHovered\` is used instead. |
| textGroupHeader | --gdg-text-group-header | string | The group header text color, if none provided the \`textHeader\` is used instead. |
| textHeaderSelected | --gdg-text-header-selected | string | The text color used for selected headers |
| bgCell | --gdg-bg-cell | string | The primary background color of the data grid. |
| bgCellMedium | --gdg-bg-cell-medium | string | Used for disabled or otherwise off colored cells. |
| bgHeader | --gdg-bg-header | string | The header background color |
| bgHeaderHasFocus | --gdg-bg-header-has | string | The header background color when its column contains the selected cell |
| bgHeaderHovered | --gdg-bg-header-hovered | string | The header background color when it is hovered |
| bgBubble | --gdg-bg-bubble | string | The background color used in bubbles |
| bgBubbleSelected | --gdg-bg-bubble-selected | string | The background color used in bubbles when the cell is selected |
| bgSearchResult | --gdg-bg-search-result | string | The background color used for cells which match the search string |
| borderColor | --gdg-border-color | string | The color of all vertical borders and horizontal borders if a horizontal override is not provided |
| horizontalBorderColor | --gdg-horizontal-border-color | string \\| undefined | The horizontal border color override |
| drilldownBorder | --gdg-drilldown-border | string | The ring color of a drilldown cell |
| linkColor | --gdg-link-color | string | What color to render links |
| cellHorizontalPadding | --gdg-cell-horizontal-padding | number | The internal horizontal padding size of a cell. |
| cellVerticalPadding | --gdg-cell-vertical-padding | number | The internal vertical padding size of a cell. |
| headerFontStyle | --gdg-header-font-style | string | The font style of the header. e.g. \`bold 15px\` |
| baseFontStyle | --gdg-base-font-style | string | The font style used for cells by default, e.g. \`13px\` |
| fontFamily | --gdg-font-family | string | The font family used by the data grid. |
| editorFontSize | --gdg-editor-font-size | string | The font size used by overlay editors. |
| lineHeight | None | number | A unitless scaler which defines the height of a line of text relative to the ink size. |
| checkboxMaxSize | --gdg-checkbox-max-size | number | The maximum size of checkboxes (in pixels), e.g. for boolean cell and row markers. |
| roundingRadius | --gdg-rounding-radius | number | The radius of rounded corners used by various grid elements (in pixels). |

If an option is missing from any theme it will be filled in with the default theme.
`),e.createElement(s,null,`
return <DataEditor
        theme={{
          bgCell: "#F2F9FF"
        }}
        getCellContent={getContent} columns={columns} rows={data.length} />
`),e.createElement(h,{height:200},e.createElement(d,{theme:{bgCell:"#F2F9FF"},getCellContent:t,columns:C,rows:n.length})),e.createElement(g,null,"### Column themes\nThemes can be applied at the column level as well by setting the `themeOverride` on the `GridColumn`."),e.createElement(s,null,`
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
`),e.createElement(h,{height:200},e.createElement(d,{theme:{bgCell:"#F2F9FF"},getCellContent:t,columns:c,rows:n.length})),e.createElement(g,null,"### Row themes"),e.createElement(s,null,`
const getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {
    if (row % 2 === 0) {
        return {
            bgCell: "#F9FDFF"
        }
    }
    return undefined;
}, []);

return <DataEditor {...rest} getRowThemeOverride={getRowThemeOverride} />
`),e.createElement(h,{height:200},e.createElement(d,{theme:{bgCell:"#F2F9FF"},getRowThemeOverride:m,getCellContent:t,columns:c,rows:n.length})),e.createElement(g,null,"### Cell themes"),e.createElement(s,null,`
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
`),e.createElement(h,{height:200},e.createElement(d,{theme:{bgCell:"#F2F9FF"},getRowThemeOverride:m,getCellContent:T,columns:c,rows:n.length})))};l.storyName="08. Theming";var p,f,y;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: d,
      data: d
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
        textDark: "#FF0000"
      };
    }
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: d,
      data: d,
      themeOverride: theme
    };
  }, []);
  const getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {
    if (row % 2 === 0) {
      return {
        bgCell: "#F9FDFF"
      };
    }
    return undefined;
  }, []);
  const columns = React.useMemo<GridColumn[]>(() => {
    return [{
      title: "Name",
      id: "name"
    }, {
      title: "Company",
      id: "company"
    }, {
      title: "Email",
      id: "email"
    }, {
      title: "Phone",
      id: "phone"
    }];
  }, []);
  const themeColumns = React.useMemo<GridColumn[]>(() => {
    return [{
      title: "Name",
      id: "name"
    }, {
      title: "Company",
      themeOverride: {
        textDark: "#225588",
        baseFontStyle: "600 13px"
      },
      id: "company"
    }, {
      title: "Email",
      id: "email"
    }, {
      title: "Phone",
      id: "phone"
    }];
  }, []);
  return <DocWrapper>
            <Marked>
                {\`
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

The global theme is provided by the DataEditor by default and can be overriden by setting the \\\`theme\\\` prop. All themes contain the following properties.

| Property | CSS Variable | Type | Description |
|---|---|---|----|
| accentColor | --gdg-accent-color | string | The primary accent color of the grid. This will show up in focus rings and selected rows/headers. |
| accentFg | --gdg-accent-fg | string | A foreground color which works well on top of the accent color. |
| accentLight | --gdg-accent-light | string | A lighter version of the accent color used to hint selection. |
| textDark | --gdg-text-dark | string | The standard text color. |
| textMedium | --gdg-text-medium | string | A lighter text color used for non-editable data in some cases. |
| textLight | --gdg-text-light | string | An even lighter text color |
| textBubble | --gdg-text-bubble | string | The text color used in bubbles |
| bgIconHeader | --gdg-bg-icon-header | string | The background color for header icons |
| fgIconHeader | --gdg-fg-icon-header | string | The foreground color for header icons |
| textHeader | --gdg-text-header | string | The header text color |
| bgGroupHeader | --gdg-bg-group-header | string | The group header background color, if none provided the \\\`bgHeader\\\` is used instead. |
| bgGroupHeaderHovered | --gdg-bg-group-header-hovered | string | The group header background color when it is hovered, if none provided the \\\`bgHeaderHovered\\\` is used instead. |
| textGroupHeader | --gdg-text-group-header | string | The group header text color, if none provided the \\\`textHeader\\\` is used instead. |
| textHeaderSelected | --gdg-text-header-selected | string | The text color used for selected headers |
| bgCell | --gdg-bg-cell | string | The primary background color of the data grid. |
| bgCellMedium | --gdg-bg-cell-medium | string | Used for disabled or otherwise off colored cells. |
| bgHeader | --gdg-bg-header | string | The header background color |
| bgHeaderHasFocus | --gdg-bg-header-has | string | The header background color when its column contains the selected cell |
| bgHeaderHovered | --gdg-bg-header-hovered | string | The header background color when it is hovered |
| bgBubble | --gdg-bg-bubble | string | The background color used in bubbles |
| bgBubbleSelected | --gdg-bg-bubble-selected | string | The background color used in bubbles when the cell is selected |
| bgSearchResult | --gdg-bg-search-result | string | The background color used for cells which match the search string |
| borderColor | --gdg-border-color | string | The color of all vertical borders and horizontal borders if a horizontal override is not provided |
| horizontalBorderColor | --gdg-horizontal-border-color | string \\\\| undefined | The horizontal border color override |
| drilldownBorder | --gdg-drilldown-border | string | The ring color of a drilldown cell |
| linkColor | --gdg-link-color | string | What color to render links |
| cellHorizontalPadding | --gdg-cell-horizontal-padding | number | The internal horizontal padding size of a cell. |
| cellVerticalPadding | --gdg-cell-vertical-padding | number | The internal vertical padding size of a cell. |
| headerFontStyle | --gdg-header-font-style | string | The font style of the header. e.g. \\\`bold 15px\\\` |
| baseFontStyle | --gdg-base-font-style | string | The font style used for cells by default, e.g. \\\`13px\\\` |
| fontFamily | --gdg-font-family | string | The font family used by the data grid. |
| editorFontSize | --gdg-editor-font-size | string | The font size used by overlay editors. |
| lineHeight | None | number | A unitless scaler which defines the height of a line of text relative to the ink size. |
| checkboxMaxSize | --gdg-checkbox-max-size | number | The maximum size of checkboxes (in pixels), e.g. for boolean cell and row markers. |
| roundingRadius | --gdg-rounding-radius | number | The radius of rounded corners used by various grid elements (in pixels). |

If an option is missing from any theme it will be filled in with the default theme.
\`}
            </Marked>
            <Highlight>
                {\`
return <DataEditor
        theme={{
          bgCell: "#F2F9FF"
        }}
        getCellContent={getContent} columns={columns} rows={data.length} />
\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor theme={{
        bgCell: "#F2F9FF"
      }} getCellContent={getContent} columns={columns} rows={data.length} />
            </Wrapper>
            <Marked>
                {\`### Column themes
Themes can be applied at the column level as well by setting the \\\`themeOverride\\\` on the \\\`GridColumn\\\`.\`}
            </Marked>
            <Highlight>
                {\`
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
\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor theme={{
        bgCell: "#F2F9FF"
      }} getCellContent={getContent} columns={themeColumns} rows={data.length} />
            </Wrapper>
            <Marked>{\`### Row themes\`}</Marked>
            <Highlight>
                {\`
const getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {
    if (row % 2 === 0) {
        return {
            bgCell: "#F9FDFF"
        }
    }
    return undefined;
}, []);

return <DataEditor {...rest} getRowThemeOverride={getRowThemeOverride} />
\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor theme={{
        bgCell: "#F2F9FF"
      }} getRowThemeOverride={getRowThemeOverride} getCellContent={getContent} columns={themeColumns} rows={data.length} />
            </Wrapper>
            <Marked>{\`### Cell themes\`}</Marked>
            <Highlight>
                {\`
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
\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor theme={{
        bgCell: "#F2F9FF"
      }} getRowThemeOverride={getRowThemeOverride} getCellContent={getContentThemed} columns={themeColumns} rows={data.length} />
            </Wrapper>
        </DocWrapper>;
}`,...(y=(f=l.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};const I=["Theming"];export{l as Theming,I as __namedExportsOrder,A as default};
