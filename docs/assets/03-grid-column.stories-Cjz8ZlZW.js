import{j as e,a as p}from"./marked.esm-dbrxtycE.js";import{r as c}from"./index-BMVQvedj.js";import{G as g,a as n}from"./image-window-loader-h6lJQmfV.js";import{D as r}from"./data-editor-all-Orvb2jqb.js";import{S as w}from"./story-utils-K2EZnGjM.js";import{D as C,M as o,H as a,W as d}from"./doc-wrapper-eGylnU1T.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./iframe-t8ayfGqb.js";import"../sb-preview/runtime.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-6lFEHS8-.js";import"./toConsumableArray-2oaFSNyq.js";const O={title:"Glide-Data-Grid/Docs",decorators:[t=>e(w,{children:e(t,{})})]},i=()=>{const t=c.useCallback(l=>({kind:g.Text,allowOverlay:!1,displayData:l.toString(),data:l.toString()}),[]),u=c.useMemo(()=>[{title:"First",width:150},{title:"Second",width:150}],[]);return p(C,{children:[e(o,{children:"\n# Basic usage\n\n> The `GridColumn[]` passed to the `DataEditor` in the `columns` property should be memoized to avoid excessive re-rendering. These samples may not do this for the sake of brevity.\n\nThere are only two mandatory properties for each `GridColumn`: `title` and `id`. The id should be a stable id and not the index of the column. Additionally a `width` property can be provided which represents the width of the column in pixels. If a width is provided the id may be omited. This may change in a future version."}),e(a,{children:`
const columns: GridColumn[] = [
    { title: "First", id: "first", width: 150 },
    { title: "Second", id: "second", width: 150 }
];

<DataEditor {...rest} columns={columns} />
`}),e(d,{height:200,children:e(r,{getCellContent:t,columns:u,rows:50})}),e(o,{children:`
# Header icons

Default header icons are available. They can also be reaplced by passing a new map to the \`headerIcons\` property.`}),e(a,{children:`
const columns: GridColumn[] = [
    { title: "Name", id: "name", width: 250, icon: GridColumnIcon.HeaderString, 
      overlayIcon: GridColumnIcon.RowOwnerOverlay 
    },
    { title: "Age", id: "age", width: 100, icon: GridColumnIcon.HeaderNumber },
    { title: "Avatar", id: "avatar", width: 80, icon: GridColumnIcon.HeaderImage },
];

<DataEditor {...rest} columns={columns} />
`}),e(d,{height:200,children:e(r,{getCellContent:t,columns:[{title:"Name",width:250,icon:n.HeaderString,overlayIcon:n.RowOwnerOverlay},{title:"Age",width:120,icon:n.HeaderNumber},{title:"Avatar",width:100,icon:n.HeaderImage}],rows:50})}),e(o,{children:`
# Header theming

Headers can be provided with individual theme overrides which themes both the header and its column cells.`}),e(a,{children:`
const columns: GridColumn[] = [
    { title: "Name", id="name", width: 250, icon: GridColumnIcon.HeaderString },
    { title: "Age", id="age", width: 100, icon: GridColumnIcon.HeaderNumber, themeOverride: {
        bgIconHeader: "#00967d",
        textDark: "#00c5a4",
        textHeader: "#00c5a4",
    } },
    { title: "Avatar", id="avatar", width: 80, icon: GridColumnIcon.HeaderImage },
];

<DataEditor {...rest} columns={columns} />
`}),e(d,{height:200,children:e(r,{getCellContent:t,columns:[{title:"Name",width:250,icon:n.HeaderString},{title:"Age",width:100,icon:n.HeaderNumber,themeOverride:{bgIconHeader:"#00967d",textDark:"#00c5a4",textHeader:"#00c5a4"}},{title:"Avatar",width:80,icon:n.HeaderImage}],rows:50})})]})};i.storyName="03. Grid Columns";var s,m,h;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const basicGetCellContent = React.useCallback((cell: Item): GridCell => {
    return {
      kind: GridCellKind.Text,
      allowOverlay: false,
      displayData: cell.toString(),
      data: cell.toString()
    };
  }, []);
  const cols = React.useMemo(() => {
    return [{
      title: "First",
      width: 150
    }, {
      title: "Second",
      width: 150
    }];
  }, []);
  return <DocWrapper>
            <Marked>
                {\`
# Basic usage

> The \\\`GridColumn[]\\\` passed to the \\\`DataEditor\\\` in the \\\`columns\\\` property should be memoized to avoid excessive re-rendering. These samples may not do this for the sake of brevity.

There are only two mandatory properties for each \\\`GridColumn\\\`: \\\`title\\\` and \\\`id\\\`. The id should be a stable id and not the index of the column. Additionally a \\\`width\\\` property can be provided which represents the width of the column in pixels. If a width is provided the id may be omited. This may change in a future version.\`}
            </Marked>
            <Highlight>
                {\`
const columns: GridColumn[] = [
    { title: "First", id: "first", width: 150 },
    { title: "Second", id: "second", width: 150 }
];

<DataEditor {...rest} columns={columns} />
\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor getCellContent={basicGetCellContent} columns={cols} rows={50} />
            </Wrapper>

            <Marked>
                {\`
# Header icons

Default header icons are available. They can also be reaplced by passing a new map to the \\\`headerIcons\\\` property.\`}
            </Marked>
            <Highlight>
                {\`
const columns: GridColumn[] = [
    { title: "Name", id: "name", width: 250, icon: GridColumnIcon.HeaderString, 
      overlayIcon: GridColumnIcon.RowOwnerOverlay 
    },
    { title: "Age", id: "age", width: 100, icon: GridColumnIcon.HeaderNumber },
    { title: "Avatar", id: "avatar", width: 80, icon: GridColumnIcon.HeaderImage },
];

<DataEditor {...rest} columns={columns} />
\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor getCellContent={basicGetCellContent} columns={[{
        title: "Name",
        width: 250,
        icon: GridColumnIcon.HeaderString,
        overlayIcon: GridColumnIcon.RowOwnerOverlay
      }, {
        title: "Age",
        width: 120,
        icon: GridColumnIcon.HeaderNumber
      }, {
        title: "Avatar",
        width: 100,
        icon: GridColumnIcon.HeaderImage
      }]} rows={50} />
            </Wrapper>

            <Marked>
                {\`
# Header theming

Headers can be provided with individual theme overrides which themes both the header and its column cells.\`}
            </Marked>
            <Highlight>
                {\`
const columns: GridColumn[] = [
    { title: "Name", id="name", width: 250, icon: GridColumnIcon.HeaderString },
    { title: "Age", id="age", width: 100, icon: GridColumnIcon.HeaderNumber, themeOverride: {
        bgIconHeader: "#00967d",
        textDark: "#00c5a4",
        textHeader: "#00c5a4",
    } },
    { title: "Avatar", id="avatar", width: 80, icon: GridColumnIcon.HeaderImage },
];

<DataEditor {...rest} columns={columns} />
\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor getCellContent={basicGetCellContent} columns={[{
        title: "Name",
        width: 250,
        icon: GridColumnIcon.HeaderString
      }, {
        title: "Age",
        width: 100,
        icon: GridColumnIcon.HeaderNumber,
        themeOverride: {
          bgIconHeader: "#00967d",
          textDark: "#00c5a4",
          textHeader: "#00c5a4"
        }
      }, {
        title: "Avatar",
        width: 80,
        icon: GridColumnIcon.HeaderImage
      }]} rows={50} />
            </Wrapper>
        </DocWrapper>;
}`,...(h=(m=i.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};const T=["GridColumns"];export{i as GridColumns,T as __namedExportsOrder,O as default};
