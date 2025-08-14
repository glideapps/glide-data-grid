import{r as e}from"./iframe-BoOn4LYH.js";import{G as E}from"./image-window-loader-BPw4el3K.js";import{D as h}from"./data-editor-all-CD5asUdq.js";import{S}from"./story-utils-DREv_L_H.js";import{D as R,M as t,H as l,W as p}from"./doc-wrapper-I9J832f8.js";import"./throttle-iyk7jJUC.js";import"./marked.esm-3FIuRmsv.js";import"./flatten-CkDMYA6f.js";import"./scrolling-data-grid-CgfvknEg.js";import"./toConsumableArray-Cg7-Q_9P.js";const W={title:"Glide-Data-Grid/Docs",decorators:[o=>e.createElement(S,null,e.createElement(o,null))]},i=[{name:"Deidre Morris",company:"GONKLE",email:"deidremorris@gonkle.com",phone:"+1 (867) 507-3332"},{name:"Sheryl Craig",company:"EVENTAGE",email:"sherylcraig@eventage.com",phone:"+1 (869) 520-2227"},{name:"Lidia Bowers",company:"ANOCHA",email:"lidiabowers@anocha.com",phone:"+1 (808) 414-3826"},{name:"Jones Norton",company:"REPETWIRE",email:"jonesnorton@repetwire.com",phone:"+1 (875) 582-3320"},{name:"Lula Bruce",company:"COMDOM",email:"lulabruce@comdom.com",phone:"+1 (873) 452-2472"},{name:"Larsen Montgomery",company:"SQUISH",email:"larsenmontgomery@squish.com",phone:"+1 (893) 482-3651"},{name:"Becky Bright",company:"COMCUR",email:"beckybright@comcur.com",phone:"+1 (879) 494-2331"},{name:"Charlotte Rowland",company:"FROLIX",email:"charlotterowland@frolix.com",phone:"+1 (861) 439-2134"},{name:"Sonya Hensley",company:"GEEKETRON",email:"sonyahensley@geeketron.com",phone:"+1 (802) 553-2194"},{name:"Stephenson Guthrie",company:"EXOSWITCH",email:"stephensonguthrie@exoswitch.com",phone:"+1 (903) 449-3271"},{name:"Mcmillan Cline",company:"TURNLING",email:"mcmillancline@turnling.com",phone:"+1 (982) 496-2454"},{name:"Kemp Davis",company:"TETRATREX",email:"kempdavis@tetratrex.com",phone:"+1 (859) 594-2982"},{name:"Matilda Levy",company:"SLOFAST",email:"matildalevy@slofast.com",phone:"+1 (841) 521-2444"},{name:"Hattie Simpson",company:"COMTRAK",email:"hattiesimpson@comtrak.com",phone:"+1 (962) 587-3805"},{name:"Kinney Munoz",company:"IDETICA",email:"kinneymunoz@idetica.com",phone:"+1 (921) 513-2012"},{name:"Lambert Raymond",company:"TURNABOUT",email:"lambertraymond@turnabout.com",phone:"+1 (919) 519-2442"},{name:"Bryant Dunlap",company:"BYTREX",email:"bryantdunlap@bytrex.com",phone:"+1 (872) 583-2883"}],a=()=>{const o=e.useCallback(n=>{const[w,f]=n,d=i[f][["name","company","email","phone"][w]];return{kind:E.Text,allowOverlay:!1,displayData:d,data:d}},[]),[c,b]=e.useState(!1),[r,k]=e.useState(!1),[s,C]=e.useState(!0),m=e.useMemo(()=>[{title:"Name",id:"name"},{title:"Company",id:"company"},{title:"Email",id:"email"},{title:"Phone",id:"phone"}],[]);return e.createElement(R,null,e.createElement(t,null,`
# Getting Started

Glide data grid is a powerful but flexible library requiring very few concepts required to get started. The grid will need data, columns, and a \`getCellContent\` callback to convert our data into cells on demand. Because the callback is used, there is no need to pre-format the data in any particular way, so long as it can be transformed into a cell. This example uses a flat array of objects.`),e.createElement(l,null,`
const data = [
    {
      "name": "Hines Fowler",
      "company": "BUZZNESS",
      "email": "hinesfowler@buzzness.com",
      "phone": "+1 (869) 405-3127"
    },
    ...rest
]
`),e.createElement(t,null,"\nThe columns of the data grid may contain many options, including icons, menus, theme overrides, however at their most basic they only require a `title` and an `id`. The id is technically optional but it is best not to omit it."),e.createElement(l,null,`
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
`),e.createElement(t,null,`
Each column will automatically size based on its contents. If desired the sise of each column can be overridden by setting the width parameter.

Finally the data grid requires a cell fetch callback. This callback should be memoized using \`React.useCallback\` or be a static function.`),e.createElement(l,null,`
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
`),e.createElement(t,null,`
> Avoid excessive changes to the identity of the \`getCellContent\` callback as the grid will re-render from scratch every time it changes.

That is all the basic requirements put together.`),e.createElement(l,null,`
return <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />;
`),e.createElement(p,{height:200},e.createElement(h,{getCellContent:o,columns:m,rows:i.length})),e.createElement(t,null,`
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

Here are a few to play with.`),e.createElement("label",{style:{display:"block"}},e.createElement("input",{type:"checkbox",checked:c,onChange:n=>b(n.target.checked)})," Row Markers"),e.createElement("label",{style:{display:"block"}},e.createElement("input",{type:"checkbox",checked:r,onChange:n=>k(n.target.checked)})," ","Smooth Scroll"),e.createElement("label",{style:{display:"block"}},e.createElement("input",{type:"checkbox",checked:s,onChange:n=>C(n.target.checked)})," ","Vertical Borders"),e.createElement(p,{height:200},e.createElement(h,{getCellContent:o,verticalBorder:s,smoothScrollX:r,smoothScrollY:r,rowMarkers:c?"both":"none",columns:m,rows:i.length})))};a.storyName="01. Getting Started";var u,y,g;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: false,
      displayData: d,
      data: d
    };
  }, []);
  const [rowMarkers, setRowMarkers] = React.useState(false);
  const [smoothScroll, setSmoothScroll] = React.useState(false);
  const [verticalBorder, setVerticalBorder] = React.useState(true);
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
  return <DocWrapper>
            <Marked>
                {\`
# Getting Started

Glide data grid is a powerful but flexible library requiring very few concepts required to get started. The grid will need data, columns, and a \\\`getCellContent\\\` callback to convert our data into cells on demand. Because the callback is used, there is no need to pre-format the data in any particular way, so long as it can be transformed into a cell. This example uses a flat array of objects.\`}
            </Marked>
            <Highlight>
                {\`
const data = [
    {
      "name": "Hines Fowler",
      "company": "BUZZNESS",
      "email": "hinesfowler@buzzness.com",
      "phone": "+1 (869) 405-3127"
    },
    ...rest
]
\`}
            </Highlight>
            <Marked>
                {\`
The columns of the data grid may contain many options, including icons, menus, theme overrides, however at their most basic they only require a \\\`title\\\` and an \\\`id\\\`. The id is technically optional but it is best not to omit it.\`}
            </Marked>
            <Highlight>
                {\`
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
\`}
            </Highlight>
            <Marked>
                {\`
Each column will automatically size based on its contents. If desired the sise of each column can be overridden by setting the width parameter.

Finally the data grid requires a cell fetch callback. This callback should be memoized using \\\`React.useCallback\\\` or be a static function.\`}
            </Marked>
            <Highlight>
                {\`
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
\`}
            </Highlight>
            <Marked>
                {\`
> Avoid excessive changes to the identity of the \\\`getCellContent\\\` callback as the grid will re-render from scratch every time it changes.

That is all the basic requirements put together.\`}
            </Marked>
            <Highlight>
                {\`
return <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />;
\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />
            </Wrapper>
            <Marked>
                {\`
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

Here are a few to play with.\`}
            </Marked>
            <label style={{
      display: "block"
    }}>
                <input type="checkbox" checked={rowMarkers} onChange={e => setRowMarkers(e.target.checked)} /> Row
                Markers
            </label>
            <label style={{
      display: "block"
    }}>
                <input type="checkbox" checked={smoothScroll} onChange={e => setSmoothScroll(e.target.checked)} />{" "}
                Smooth Scroll
            </label>
            <label style={{
      display: "block"
    }}>
                <input type="checkbox" checked={verticalBorder} onChange={e => setVerticalBorder(e.target.checked)} />{" "}
                Vertical Borders
            </label>
            <Wrapper height={200}>
                <DataEditor getCellContent={getContent} verticalBorder={verticalBorder} smoothScrollX={smoothScroll} smoothScrollY={smoothScroll} rowMarkers={rowMarkers ? "both" : "none"} columns={columns} rows={data.length} />
            </Wrapper>
        </DocWrapper>;
}`,...(g=(y=a.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};const q=["GettingStarted"];export{a as GettingStarted,q as __namedExportsOrder,W as default};
