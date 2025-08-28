import{r as i}from"./iframe-DvQ8_lQU.js";import{B as Ye}from"./story-utils-rfSg_w8P.js";import{C as g,G as a}from"./image-window-loader-B2G_WoyH.js";import{D as d}from"./data-editor-all-KwlQitOx.js";import"./preload-helper-C1FmrZbK.js";import"./marked.esm-Chqd-LbM.js";import"./throttle-CxLmvQkw.js";import"./flatten-B4uaeP2E.js";import"./scrolling-data-grid-ieZ08qph.js";const{useState:c,useCallback:m,useMemo:h}=__STORYBOOK_MODULE_PREVIEW_API__,nt={title:"Tests/TestCases",decorators:[e=>i.createElement(Ye,{width:1e3,height:800},i.createElement(e,null))]};function w([e,t]){return e===0?{kind:a.RowID,data:`RowID ${e}, ${t}`,allowOverlay:!1}:e===1?{kind:a.Bubble,data:[`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`],allowOverlay:!0}:e===2?{kind:a.Image,data:["https://i.imgur.com/5J0BftG.jpg","https://preview.redd.it/7jlqkp2cyap51.jpg?width=575&auto=webp&s=26fa9ed15b16fb450ee08ed1f2f0ccb5e0223581"],allowOverlay:!0,readonly:!1}:e===3?{kind:a.Markdown,data:`## Markdown has titles

And supports newline chars and automatic wrapping text that just needs to be long enough to trigger it.


[Google](https://google.com)

- with
- lists
- that
- can
- be
- pretty
- long
                    `,allowOverlay:!0}:e===4?{kind:a.Number,displayData:"$10,352",allowOverlay:!0,data:10352,readonly:!0}:e===5?{kind:a.Uri,data:"https://www.google.com",allowOverlay:!0}:e===6?{kind:a.Boolean,data:t%3===0||t%5===0,readonly:!0,allowOverlay:!1}:e===7?{kind:a.Text,displayData:"הרפתקה חדשה",data:"הרפתקה חדשה",allowOverlay:!0,readonly:!0}:e===8?{kind:a.Drilldown,data:[{text:"Test",img:"https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg"},{text:"No Image"}],allowOverlay:!0}:{kind:a.Text,displayData:`${e}, ${t} 🦝`,data:`${e}, ${t} 🦝`,allowOverlay:!0}}function S(){return[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(e=>({title:e.toString()+" is the longest header in the world",width:120+e%4*10,icon:"headerString",hasMenu:!0}))}function y(){const[e,t]=c(S),n=m((o,r)=>{const l=e.indexOf(o),s=[...e];s[l]={...s[l],width:r},t(s)},[e]);return i.createElement(d,{width:"100%",getCellContent:w,getCellsForSelection:!0,columns:e,rows:1e3,onColumnResize:n})}function Ke(){return[{title:"Relation",width:360,icon:"headerString",hasMenu:!0}]}function Xe([e,t]){return{kind:a.Drilldown,data:[{text:`Image ${e}-${t}`,img:"https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg"},{text:`Text ${e}-${t}`},{text:`More text ${e}-${t}`}],allowOverlay:!0}}function D(){const[e,t]=c(Ke),n=m((o,r)=>{const l=e.indexOf(o),s=[...e];s[l]={...s[l],width:r},t(s)},[e]);return i.createElement(d,{width:"100%",getCellContent:Xe,columns:e,rows:1e3,onColumnResize:n,smoothScrollX:!0,smoothScrollY:!0})}const N=[{title:"Number",width:100,icon:"headerArray",overlayIcon:"rowOwnerOverlay"},{title:"Square",width:100}];function f([e,t]){const n=Math.pow(t,e+1);return{kind:a.Number,data:n,displayData:n.toString(),allowOverlay:!1}}function b(){return i.createElement(d,{width:"100%",getCellContent:f,columns:N,rows:1e3})}function v(){const[e,t]=c(S),n=m((o,r)=>{const l=e.indexOf(o);if(l!==-1){const s={...o,width:r},u=[...e];u.splice(l,1,s),t(u)}},[e]);return i.createElement(d,{width:"100%",getCellContent:w,onColumnResize:n,columns:e,rows:1e3,smoothScrollY:!0,smoothScrollX:!0})}function k(){const[e,t]=c(void 0),n=o=>{var r;(((r=o.current)==null?void 0:r.cell[0])??0)%2===0&&t(o)};return i.createElement(d,{width:"100%",gridSelection:e,onGridSelectionChange:n,getCellContent:f,columns:N,rows:1e3})}function G(){return i.createElement(d,{width:"100%",isDraggable:!0,onDragStart:e=>{e.setData("text","testing")},getCellContent:f,columns:N,rows:1e3})}function E(){const e=[{title:"Number",width:250},{title:"Square",width:250}];return i.createElement("div",{style:{width:500,height:500,position:"relative"}},i.createElement(d,{width:500,height:500,isDraggable:!0,onDragStart:t=>{t.setData("text","testing")},getCellContent:f,columns:e,smoothScrollX:!0,smoothScrollY:!0,rowHeight:50,headerHeight:50,rows:9}))}function p({columnCount:e}){const t=[{title:"Number",width:250},{title:"Square",width:250}];for(let n=2;n<e;n++)t.push({title:"Foo",width:250});return i.createElement(d,{width:"100%",isDraggable:!0,getCellContent:f,columns:t,smoothScrollX:!0,smoothScrollY:!0,rowHeight:50,headerHeight:50,rows:9})}p.args={columnCount:2};function R(){const e=h(()=>S().map(s=>({...s,width:300,title:"Making column smaller used to crash!"})),[]),[t,n]=c({current:{cell:[2,8],range:{width:1,height:1,x:2,y:8},rangeStack:[]},columns:g.empty(),rows:g.empty()}),[o,r]=c(e),l=m(s=>{n(s)},[]);return i.createElement(d,{width:"100%",getCellContent:w,columns:o,rows:1e3,onGridSelectionChange:l,gridSelection:t,onColumnResize:(s,u)=>{u>300?r(e):r([])}})}function je(){return{"resize me 0":120,"resize me 1":120,"resize me 2":120,"resize me 3":120,"resize me 4":120,"resize me 5":120,"resize me 6":120,"resize me 7":120}}function qe(e){return Object.entries(e).map(([t,n])=>({title:t,width:n,icon:"headerString",hasMenu:!0}))}function x(){const[e,t]=c(je),n=h(()=>qe(e),[e]),o=m((r,l)=>{t(s=>({...s,[r.title]:l}))},[]);return i.createElement(d,{width:"100%",getCellContent:w,columns:n,rows:20,isDraggable:!1,smoothScrollX:!0,smoothScrollY:!0,onColumnResize:o})}function z(){const e=h(()=>S().map(s=>({...s,width:300,title:"Making column smaller used to crash!"})),[]),[t,n]=c({current:{cell:[2,8],range:{width:1,height:1,x:2,y:8},rangeStack:[]},columns:g.empty(),rows:g.empty()}),[o,r]=c(e),l=m(s=>{n(s)},[]);return i.createElement(d,{width:"100%",getCellContent:w,columns:o,rows:1e3,onGridSelectionChange:l,gridSelection:t,onColumnResize:(s,u)=>{u>300?r(e):r([e[0]])}})}function O(){const e=h(S,[]),[t,n]=c(10),o=m(()=>{n(u=>u+1)},[]),[r,l]=c(void 0),s=m(u=>{l(u)},[]);return i.createElement(d,{width:"100%",getCellContent:w,columns:e,rows:t,onRowAppended:o,onGridSelectionChange:s,gridSelection:r})}function M(){const e=h(S,[]),[t,n]=c(void 0),o=m(r=>{n(r)},[]);return i.createElement(d,{width:"100%",getCellContent:w,columns:e,rows:100,onGridSelectionChange:o,gridSelection:t})}function B(){const e=h(()=>[{title:"MD short",width:50},{title:"MD long",width:50}],[]),t=m(([l,s])=>l===0?{data:"text",allowOverlay:!0,kind:a.Markdown}:l===1?{data:`text really really really long
## H1

- this
- is
- a
- longer
- example
- to
- test
- scroll
- of
- preview
                `,allowOverlay:!0,kind:a.Markdown}:{data:"text",allowOverlay:!0,kind:a.Markdown},[]),[n,o]=c({current:{cell:[2,8],range:{width:1,height:1,x:2,y:8},rangeStack:[]},columns:g.empty(),rows:g.empty()}),r=m(l=>{o(l)},[]);return i.createElement(d,{width:"100%",getCellContent:t,columns:e,rows:1e3,onGridSelectionChange:r,gridSelection:n})}const A=()=>{const[e,t]=c([!1,!1]);return i.createElement(d,{width:"100%",columns:[{title:"Editable",width:100},{title:"Readonly",width:100}],rows:1,getCellContent:([n])=>({kind:a.Boolean,readonly:n!==0,allowOverlay:!1,data:e[n]}),onCellEdited:([n],o)=>{o.kind===a.Boolean&&t(r=>{const l=[...r];return l.splice(n,1,o.data),l})}})},$=()=>{const[e,t]=c(()=>{const n=[];for(let o=0;o<2e3;o++)n.push(["Edit","Me"]);return n});return i.createElement(d,{width:"100%",columns:[{title:"Column A",width:250},{title:"Column B",width:250}],rows:e.length,getCellContent:([n,o])=>({kind:a.Text,allowOverlay:!0,data:e[o][n],displayData:e[o][n]}),onCellEdited:([n,o],r)=>{const l=[...e],s=[...l[o]];typeof r.data=="string"&&(s[n]=r.data),l[o]=s,t(l)}})};function V(){const e=[{title:"Col1",width:100,grow:1,group:"Group"}],[t,n]=c(0);return i.createElement("div",null,i.createElement("h3",null,"Click count: ",t),i.createElement(d,{width:500,height:500,rows:0,columns:e,getCellContent:()=>({kind:a.Text,data:"",displayData:"",allowOverlay:!1}),getGroupDetails:o=>({name:o,actions:[{icon:"headerString",title:"Action",onClick:r=>n(l=>l+1)}]})}))}function _(){const[e,t]=c(["col-a","col-b"]),n=e.map(C=>({id:C,title:C,width:100})),o=i.useCallback(()=>({kind:a.Loading,allowOverlay:!1}),[]),r=()=>{const C=Math.random().toString(36).slice(2,8);t(H=>[...H,C])},l=C=>{t(H=>H.filter((Le,Ie)=>!C.includes(Ie)))},[s,u]=c(void 0),T=C=>C.columns.length>0?(u(void 0),l(C.columns.toArray()),!1):!0;return i.createElement("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},i.createElement("div",{style:{marginBottom:8}},i.createElement("button",{onClick:r},"Add")),i.createElement("div",{style:{flex:1,position:"relative"}},i.createElement(d,{width:"100%",height:"100%",columns:n,rows:0,getCellContent:o,gridSelection:s,onGridSelectionChange:u,onDelete:T})))}var I,Y,K;y.parameters={...y.parameters,docs:{...(I=y.parameters)==null?void 0:I.docs,source:{originalSource:`function Simplenotest() {
  const [cols, setColumns] = useState(getDummyCols);
  const onColumnResize = useCallback((col: GridColumn, newSize: number) => {
    const index = cols.indexOf(col);
    const newCols = [...cols];
    newCols[index] = {
      ...newCols[index],
      width: newSize
    };
    setColumns(newCols);
  }, [cols]);
  return <DataEditor width="100%" getCellContent={getDummyData} getCellsForSelection={true} columns={cols} rows={1000} onColumnResize={onColumnResize} />;
}`,...(K=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:K.source}}};var X,j,q;D.parameters={...D.parameters,docs:{...(X=D.parameters)==null?void 0:X.docs,source:{originalSource:`function RelationColumn() {
  const [cols, setColumns] = useState(getDummyRelationColumn);
  const onColumnResize = useCallback((col: GridColumn, newSize: number) => {
    const index = cols.indexOf(col);
    const newCols = [...cols];
    newCols[index] = {
      ...newCols[index],
      width: newSize
    };
    setColumns(newCols);
  }, [cols]);
  return <DataEditor width="100%" getCellContent={getDummyRelationData} columns={cols} rows={1000} onColumnResize={onColumnResize} smoothScrollX={true} smoothScrollY={true} />;
}`,...(q=(j=D.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};var L,F,P;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`function Minimal() {
  return <DataEditor width="100%" getCellContent={getData} columns={columns} rows={1000} />;
}`,...(P=(F=b.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};var U,W,J;v.parameters={...v.parameters,docs:{...(U=v.parameters)==null?void 0:U.docs,source:{originalSource:`function Smooth() {
  const [cols, setCols] = useState(getDummyCols);
  const onColumnResize = useCallback((column: GridColumn, newSize: number) => {
    const index = cols.indexOf(column);
    if (index !== -1) {
      const newCol: GridColumn = {
        ...column,
        width: newSize
      };
      const newCols = [...cols];
      newCols.splice(index, 1, newCol);
      setCols(newCols);
    }
  }, [cols]);
  return <DataEditor width="100%" getCellContent={getDummyData} onColumnResize={onColumnResize} columns={cols} rows={1000} smoothScrollY={true} smoothScrollX={true} />;
}`,...(J=(W=v.parameters)==null?void 0:W.docs)==null?void 0:J.source}}};var Q,Z,ee;k.parameters={...k.parameters,docs:{...(Q=k.parameters)==null?void 0:Q.docs,source:{originalSource:`function ManualControl() {
  const [gridSelection, setGridSelection] = useState<GridSelection | undefined>(undefined);
  const cb = (newVal: GridSelection) => {
    if ((newVal.current?.cell[0] ?? 0) % 2 === 0) {
      setGridSelection(newVal);
    }
  };
  return <DataEditor width="100%" gridSelection={gridSelection} onGridSelectionChange={cb} getCellContent={getData} columns={columns} rows={1000} />;
}`,...(ee=(Z=k.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,ne,oe;G.parameters={...G.parameters,docs:{...(te=G.parameters)==null?void 0:te.docs,source:{originalSource:`function Draggable() {
  return <DataEditor width="100%" isDraggable={true} onDragStart={args => {
    args.setData("text", "testing");
  }} getCellContent={getData} columns={columns} rows={1000} />;
}`,...(oe=(ne=G.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var le,re,se;E.parameters={...E.parameters,docs:{...(le=E.parameters)==null?void 0:le.docs,source:{originalSource:`function IdealSize() {
  // trying to be 500x500
  const cols: GridColumn[] = [{
    title: "Number",
    width: 250
  }, {
    title: "Square",
    width: 250
  }];
  return <div style={{
    width: 500,
    height: 500,
    position: "relative"
  }}>
            <DataEditor width={500} height={500} isDraggable={true} onDragStart={args => {
      args.setData("text", "testing");
    }} getCellContent={getData} columns={cols} smoothScrollX={true} smoothScrollY={true} rowHeight={50} headerHeight={50} rows={9} />
        </div>;
}`,...(se=(re=E.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var ie,ae,ce;p.parameters={...p.parameters,docs:{...(ie=p.parameters)==null?void 0:ie.docs,source:{originalSource:`function DynamicAddRemoveColumns({
  columnCount
}: {
  columnCount: number;
}) {
  // trying to be 500x500
  const cols: GridColumn[] = [{
    title: "Number",
    width: 250
  }, {
    title: "Square",
    width: 250
  }];
  for (let i = 2; i < columnCount; i++) {
    cols.push({
      title: "Foo",
      width: 250
    });
  }
  return <DataEditor width="100%" isDraggable={true} getCellContent={getData} columns={cols} smoothScrollX={true} smoothScrollY={true} rowHeight={50} headerHeight={50} rows={9} />;
}`,...(ce=(ae=p.parameters)==null?void 0:ae.docs)==null?void 0:ce.source}}};var de,ue,me;R.parameters={...R.parameters,docs:{...(de=R.parameters)==null?void 0:de.docs,source:{originalSource:`function GridSelectionOutOfRangeNoColumns() {
  const dummyCols = useMemo(() => getDummyCols().map(v => ({
    ...v,
    width: 300,
    title: "Making column smaller used to crash!"
  })), []);
  const [selected, setSelected] = useState<GridSelection | undefined>({
    current: {
      cell: [2, 8],
      range: {
        width: 1,
        height: 1,
        x: 2,
        y: 8
      },
      rangeStack: []
    },
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });
  const [cols, setCols] = useState(dummyCols);
  const onSelected = useCallback((newSel?: GridSelection) => {
    setSelected(newSel);
  }, []);
  return <DataEditor width="100%" getCellContent={getDummyData} columns={cols} rows={1000} onGridSelectionChange={onSelected} gridSelection={selected} onColumnResize={(_col, newSize) => {
    if (newSize > 300) {
      setCols(dummyCols);
    } else {
      setCols([]);
    }
  }} />;
}`,...(me=(ue=R.parameters)==null?void 0:ue.docs)==null?void 0:me.source}}};var Ce,we,ge;x.parameters={...x.parameters,docs:{...(Ce=x.parameters)==null?void 0:Ce.docs,source:{originalSource:`function ResizableColumns() {
  const [colSizes, setColSizes] = useState(getResizableColumnsInitSize);
  const cols = useMemo(() => {
    return getResizableColumns(colSizes);
  }, [colSizes]);
  const onColumnResize = useCallback((column: GridColumn, newSize: number) => {
    setColSizes(prevColSizes => {
      return {
        ...prevColSizes,
        [column.title]: newSize
      };
    });
  }, []);
  return <DataEditor width="100%" getCellContent={getDummyData} columns={cols} rows={20} isDraggable={false} smoothScrollX={true} smoothScrollY={true} onColumnResize={onColumnResize} />;
}`,...(ge=(we=x.parameters)==null?void 0:we.docs)==null?void 0:ge.source}}};var he,Se,pe;z.parameters={...z.parameters,docs:{...(he=z.parameters)==null?void 0:he.docs,source:{originalSource:`function GridSelectionOutOfRangeLessColumnsThanSelection() {
  const dummyCols = useMemo(() => getDummyCols().map(v => ({
    ...v,
    width: 300,
    title: "Making column smaller used to crash!"
  })), []);
  const [selected, setSelected] = useState<GridSelection | undefined>({
    current: {
      cell: [2, 8],
      range: {
        width: 1,
        height: 1,
        x: 2,
        y: 8
      },
      rangeStack: []
    },
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });
  const [cols, setCols] = useState(dummyCols);
  const onSelected = useCallback((newSel?: GridSelection) => {
    setSelected(newSel);
  }, []);
  return <DataEditor width="100%" getCellContent={getDummyData} columns={cols} rows={1000} onGridSelectionChange={onSelected} gridSelection={selected} onColumnResize={(_col, newSize) => {
    if (newSize > 300) {
      setCols(dummyCols);
    } else {
      setCols([dummyCols[0]]);
    }
  }} />;
}`,...(pe=(Se=z.parameters)==null?void 0:Se.docs)==null?void 0:pe.source}}};var fe,ye,De;O.parameters={...O.parameters,docs:{...(fe=O.parameters)==null?void 0:fe.docs,source:{originalSource:`function GridAddNewRows() {
  const cols = useMemo(getDummyCols, []);
  const [rowsCount, setRowsCount] = useState(10);
  const onRowAppended = useCallback(() => {
    setRowsCount(r => r + 1);
  }, []);
  const [selected, setSelected] = useState<GridSelection | undefined>(undefined);
  const onSelected = useCallback((newSel?: GridSelection) => {
    setSelected(newSel);
  }, []);
  return <DataEditor width="100%" getCellContent={getDummyData} columns={cols} rows={rowsCount} onRowAppended={onRowAppended} onGridSelectionChange={onSelected} gridSelection={selected} />;
}`,...(De=(ye=O.parameters)==null?void 0:ye.docs)==null?void 0:De.source}}};var be,ve,ke;M.parameters={...M.parameters,docs:{...(be=M.parameters)==null?void 0:be.docs,source:{originalSource:`function GridNoTrailingBlankRow() {
  const cols = useMemo(getDummyCols, []);
  const [selected, setSelected] = useState<GridSelection | undefined>(undefined);
  const onSelected = useCallback((newSel?: GridSelection) => {
    setSelected(newSel);
  }, []);
  return <DataEditor width="100%" getCellContent={getDummyData} columns={cols} rows={100} onGridSelectionChange={onSelected} gridSelection={selected} />;
}`,...(ke=(ve=M.parameters)==null?void 0:ve.docs)==null?void 0:ke.source}}};var Ge,Ee,Re;B.parameters={...B.parameters,docs:{...(Ge=B.parameters)==null?void 0:Ge.docs,source:{originalSource:`function MarkdownEdits() {
  const dummyCols: GridColumn[] = useMemo(() => {
    return [{
      title: "MD short",
      width: 50
    }, {
      title: "MD long",
      width: 50
    }];
  }, []);
  const dummyCells = useCallback(([col, _row]: Item) => {
    if (col === 0) {
      const editable: EditableGridCell = {
        data: "text",
        allowOverlay: true,
        kind: GridCellKind.Markdown
      };
      return editable;
    } else if (col === 1) {
      const editable: EditableGridCell = {
        data: \`text really really really long
## H1

- this
- is
- a
- longer
- example
- to
- test
- scroll
- of
- preview
                \`,
        allowOverlay: true,
        kind: GridCellKind.Markdown
      };
      return editable;
    }
    const editable: EditableGridCell = {
      data: "text",
      allowOverlay: true,
      kind: GridCellKind.Markdown
    };
    return editable;
  }, []);
  const [selected, setSelected] = useState<GridSelection | undefined>({
    current: {
      cell: [2, 8],
      range: {
        width: 1,
        height: 1,
        x: 2,
        y: 8
      },
      rangeStack: []
    },
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });
  const onSelected = useCallback((newSel?: GridSelection) => {
    setSelected(newSel);
  }, []);
  return <DataEditor width="100%" getCellContent={dummyCells} columns={dummyCols} rows={1000} onGridSelectionChange={onSelected} gridSelection={selected} />;
}`,...(Re=(Ee=B.parameters)==null?void 0:Ee.docs)==null?void 0:Re.source}}};var xe,ze,Oe;A.parameters={...A.parameters,docs:{...(xe=A.parameters)==null?void 0:xe.docs,source:{originalSource:`() => {
  const [vals, setVals] = useState<[boolean | null | undefined, boolean | null | undefined]>([false, false]);
  return <DataEditor width="100%" columns={[{
    title: "Editable",
    width: 100
  }, {
    title: "Readonly",
    width: 100
  }]} rows={1} getCellContent={([col]) => {
    return {
      kind: GridCellKind.Boolean,
      readonly: col !== 0,
      allowOverlay: false,
      data: vals[col]
    };
  }} onCellEdited={([col], newVal) => {
    if (newVal.kind === GridCellKind.Boolean) {
      setVals(cv => {
        const f = [...cv];
        f.splice(col, 1, newVal.data);
        return f as [boolean, boolean];
      });
    }
  }} />;
}`,...(Oe=(ze=A.parameters)==null?void 0:ze.docs)==null?void 0:Oe.source}}};var Me,Be,Ae;$.parameters={...$.parameters,docs:{...(Me=$.parameters)==null?void 0:Me.docs,source:{originalSource:`() => {
  const [vals, setVals] = useState<[string, string][]>(() => {
    const result: [string, string][] = [];
    for (let i = 0; i < 2000; i++) {
      result.push(["Edit", "Me"]);
    }
    return result;
  });
  return <DataEditor width="100%" columns={[{
    title: "Column A",
    width: 250
  }, {
    title: "Column B",
    width: 250
  }]} rows={vals.length} getCellContent={([col, row]) => ({
    kind: GridCellKind.Text,
    allowOverlay: true,
    data: vals[row][col],
    displayData: vals[row][col]
  })} onCellEdited={([col, row], newVal) => {
    const newVals = [...vals];
    const newRow: [string, string] = [...newVals[row]];
    if (typeof newVal.data === "string") {
      newRow[col] = newVal.data;
    }
    newVals[row] = newRow;
    setVals(newVals);
  }} />;
}`,...(Ae=(Be=$.parameters)==null?void 0:Be.docs)==null?void 0:Ae.source}}};var $e,Ve,_e;V.parameters={...V.parameters,docs:{...($e=V.parameters)==null?void 0:$e.docs,source:{originalSource:`function GroupHeaderActionClick() {
  const cols = [{
    title: "Col1",
    width: 100,
    grow: 1,
    group: "Group"
  }];
  const [clickCount, setClickCount] = useState(0);
  return <div>
            <h3>Click count: {clickCount}</h3>
            <DataEditor width={500} height={500} rows={0} columns={cols} getCellContent={() => ({
      kind: GridCellKind.Text,
      data: "",
      displayData: "",
      allowOverlay: false
    })} getGroupDetails={name => ({
      name,
      actions: [{
        icon: "headerString",
        title: "Action",
        onClick: _e => setClickCount(c => c + 1)
      }]
    })} />
        </div>;
}`,...(_e=(Ve=V.parameters)==null?void 0:Ve.docs)==null?void 0:_e.source}}};var Te,He,Ne;_.parameters={..._.parameters,docs:{...(Te=_.parameters)==null?void 0:Te.docs,source:{originalSource:`function DeleteColumnsViaOnDelete() {
  const [headers, setHeaders] = useState<string[]>(["col-a", "col-b"]);
  const dynColumns: GridColumn[] = headers.map(value => ({
    id: value,
    title: value,
    width: 100
  }));
  const renderCell = React.useCallback((): GridCell => {
    return {
      kind: GridCellKind.Loading,
      allowOverlay: false
    };
  }, []);
  const addColumn = () => {
    const str = Math.random().toString(36).slice(2, 8);
    setHeaders(prev => [...prev, str]);
  };
  const removeColumns = (indices: number[]) => {
    setHeaders(prev => prev.filter((_, i) => !indices.includes(i)));
  };
  const [selection, setSelection] = useState<GridSelection | undefined>(undefined);
  const onDelete = (sel: GridSelection) => {
    if (sel.columns.length > 0) {
      setSelection(undefined);
      removeColumns(sel.columns.toArray());
      return false;
    }
    return true;
  };
  return <div style={{
    display: "flex",
    flexDirection: "column",
    height: "100%"
  }}>
            <div style={{
      marginBottom: 8
    }}>
                <button onClick={addColumn}>Add</button>
            </div>
            <div style={{
      flex: 1,
      position: "relative"
    }}>
                <DataEditor width="100%" height="100%" columns={dynColumns} rows={0} getCellContent={renderCell} gridSelection={selection} onGridSelectionChange={setSelection} onDelete={onDelete} />
            </div>
        </div>;
}`,...(Ne=(He=_.parameters)==null?void 0:He.docs)==null?void 0:Ne.source}}};const ot=["Simplenotest","RelationColumn","Minimal","Smooth","ManualControl","Draggable","IdealSize","DynamicAddRemoveColumns","GridSelectionOutOfRangeNoColumns","ResizableColumns","GridSelectionOutOfRangeLessColumnsThanSelection","GridAddNewRows","GridNoTrailingBlankRow","MarkdownEdits","CanEditBoolean","SimpleEditable","GroupHeaderActionClick","DeleteColumnsViaOnDelete"];export{A as CanEditBoolean,_ as DeleteColumnsViaOnDelete,G as Draggable,p as DynamicAddRemoveColumns,O as GridAddNewRows,M as GridNoTrailingBlankRow,z as GridSelectionOutOfRangeLessColumnsThanSelection,R as GridSelectionOutOfRangeNoColumns,V as GroupHeaderActionClick,E as IdealSize,k as ManualControl,B as MarkdownEdits,b as Minimal,D as RelationColumn,x as ResizableColumns,$ as SimpleEditable,y as Simplenotest,v as Smooth,ot as __namedExportsOrder,nt as default};
