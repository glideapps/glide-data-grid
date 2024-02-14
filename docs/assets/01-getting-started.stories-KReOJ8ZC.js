import{j as e,a as l}from"./marked.esm-dbrxtycE.js";import{r as t}from"./index-BMVQvedj.js";import{G as M}from"./image-window-loader-Hk1rG8Sr.js";import{D as u}from"./data-editor-all-3W5wpw6K.js";import{S as x}from"./story-utils-K2EZnGjM.js";import{D as T,M as a,H as i,W as y}from"./doc-wrapper-m1-LpzDL.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./iframe-MU0yo5By.js";import"../sb-preview/runtime.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-6oMlsc5s.js";import"./toConsumableArray-ppDpjNRJ.js";const F={title:"Glide-Data-Grid/Docs",decorators:[r=>e(x,{children:e(r,{})})]},s=[{name:"Deidre Morris",company:"GONKLE",email:"deidremorris@gonkle.com",phone:"+1 (867) 507-3332"},{name:"Sheryl Craig",company:"EVENTAGE",email:"sherylcraig@eventage.com",phone:"+1 (869) 520-2227"},{name:"Lidia Bowers",company:"ANOCHA",email:"lidiabowers@anocha.com",phone:"+1 (808) 414-3826"},{name:"Jones Norton",company:"REPETWIRE",email:"jonesnorton@repetwire.com",phone:"+1 (875) 582-3320"},{name:"Lula Bruce",company:"COMDOM",email:"lulabruce@comdom.com",phone:"+1 (873) 452-2472"},{name:"Larsen Montgomery",company:"SQUISH",email:"larsenmontgomery@squish.com",phone:"+1 (893) 482-3651"},{name:"Becky Bright",company:"COMCUR",email:"beckybright@comcur.com",phone:"+1 (879) 494-2331"},{name:"Charlotte Rowland",company:"FROLIX",email:"charlotterowland@frolix.com",phone:"+1 (861) 439-2134"},{name:"Sonya Hensley",company:"GEEKETRON",email:"sonyahensley@geeketron.com",phone:"+1 (802) 553-2194"},{name:"Stephenson Guthrie",company:"EXOSWITCH",email:"stephensonguthrie@exoswitch.com",phone:"+1 (903) 449-3271"},{name:"Mcmillan Cline",company:"TURNLING",email:"mcmillancline@turnling.com",phone:"+1 (982) 496-2454"},{name:"Kemp Davis",company:"TETRATREX",email:"kempdavis@tetratrex.com",phone:"+1 (859) 594-2982"},{name:"Matilda Levy",company:"SLOFAST",email:"matildalevy@slofast.com",phone:"+1 (841) 521-2444"},{name:"Hattie Simpson",company:"COMTRAK",email:"hattiesimpson@comtrak.com",phone:"+1 (962) 587-3805"},{name:"Kinney Munoz",company:"IDETICA",email:"kinneymunoz@idetica.com",phone:"+1 (921) 513-2012"},{name:"Lambert Raymond",company:"TURNABOUT",email:"lambertraymond@turnabout.com",phone:"+1 (919) 519-2442"},{name:"Bryant Dunlap",company:"BYTREX",email:"bryantdunlap@bytrex.com",phone:"+1 (872) 583-2883"}],o=()=>{const r=t.useCallback(n=>{const[S,R]=n,p=s[R][["name","company","email","phone"][S]];return{kind:M.Text,allowOverlay:!1,displayData:p,data:p}},[]),[m,C]=t.useState(!1),[c,w]=t.useState(!1),[d,f]=t.useState(!0),h=t.useMemo(()=>[{title:"Name",id:"name"},{title:"Company",id:"company"},{title:"Email",id:"email"},{title:"Phone",id:"phone"}],[]);return l(T,{children:[e(a,{children:`
# Getting Started

Glide data grid is a powerful but flexible library requiring very few concepts required to get started. The grid will need data, columns, and a \`getCellContent\` callback to convert our data into cells on demand. Because the callback is used, there is no need to pre-format the data in any particular way, so long as it can be transformed into a cell. This example uses a flat array of objects.`}),e(i,{children:`
const data = [
    {
      "name": "Hines Fowler",
      "company": "BUZZNESS",
      "email": "hinesfowler@buzzness.com",
      "phone": "+1 (869) 405-3127"
    },
    ...rest
]
`}),e(a,{children:"\nThe columns of the data grid may contain many options, including icons, menus, theme overrides, however at their most basic they only require a `title` and an `id`. The id is technically optional but it is best not to omit it."}),e(i,{children:`
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
`}),e(a,{children:`
Each column will automatically size based on its contents. If desired the sise of each column can be overridden by setting the width parameter.

Finally the data grid requires a cell fetch callback. This callback should be memoized using \`React.useCallback\` or be a static function.`}),e(i,{children:`
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
`}),e(a,{children:`
> Avoid excessive changes to the identity of the \`getCellContent\` callback as the grid will re-render from scratch every time it changes.

That is all the basic requirements put together.`}),e(i,{children:`
return <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />;
`}),e(y,{height:200,children:e(u,{getCellContent:r,columns:h,rows:s.length})}),e(a,{children:`
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

Here are a few to play with.`}),l("label",{style:{display:"block"},children:[e("input",{type:"checkbox",checked:m,onChange:n=>C(n.target.checked)})," Row Markers"]}),l("label",{style:{display:"block"},children:[e("input",{type:"checkbox",checked:c,onChange:n=>w(n.target.checked)})," ","Smooth Scroll"]}),l("label",{style:{display:"block"},children:[e("input",{type:"checkbox",checked:d,onChange:n=>f(n.target.checked)})," ","Vertical Borders"]}),e(y,{height:200,children:e(u,{getCellContent:r,verticalBorder:d,smoothScrollX:c,smoothScrollY:c,rowMarkers:m?"both":"none",columns:h,rows:s.length})})]})};o.storyName="01. Getting Started";var g,b,k;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
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
}`,...(k=(b=o.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};const U=["GettingStarted"];export{o as GettingStarted,U as __namedExportsOrder,F as default};
