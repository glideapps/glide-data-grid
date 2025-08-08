import{r as a}from"./iframe-BLQqb1c7.js";import{B as Ae}from"./story-utils-BJGTyX_9.js";import{G as i,C as w}from"./image-window-loader-B7G4oHUc.js";import{D as c}from"./data-editor-all-IaNHS9Ps.js";import{u as d,b as m,a as g}from"./chunk-2WNKQWTL-BldXtwAO.js";import"./marked.esm-DzmryCkA.js";import"./throttle-CALbi8un.js";import"./flatten-CIOtrWwG.js";import"./scrolling-data-grid-JkhSjfyd.js";const Je={title:"Tests/TestCases",decorators:[e=>a.createElement(Ae,{width:1e3,height:800},a.createElement(e,null))]};function C([e,t]){return e===0?{kind:i.RowID,data:`RowID ${e}, ${t}`,allowOverlay:!1}:e===1?{kind:i.Bubble,data:[`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`],allowOverlay:!0}:e===2?{kind:i.Image,data:["https://i.imgur.com/5J0BftG.jpg","https://preview.redd.it/7jlqkp2cyap51.jpg?width=575&auto=webp&s=26fa9ed15b16fb450ee08ed1f2f0ccb5e0223581"],allowOverlay:!0,readonly:!1}:e===3?{kind:i.Markdown,data:`## Markdown has titles

And supports newline chars and automatic wrapping text that just needs to be long enough to trigger it.


[Google](https://google.com)

- with
- lists
- that
- can
- be
- pretty
- long
                    `,allowOverlay:!0}:e===4?{kind:i.Number,displayData:"$10,352",allowOverlay:!0,data:10352,readonly:!0}:e===5?{kind:i.Uri,data:"https://www.google.com",allowOverlay:!0}:e===6?{kind:i.Boolean,data:t%3===0||t%5===0,readonly:!0,allowOverlay:!1}:e===7?{kind:i.Text,displayData:"הרפתקה חדשה",data:"הרפתקה חדשה",allowOverlay:!0,readonly:!0}:e===8?{kind:i.Drilldown,data:[{text:"Test",img:"https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg"},{text:"No Image"}],allowOverlay:!0}:{kind:i.Text,displayData:`${e}, ${t} 🦝`,data:`${e}, ${t} 🦝`,allowOverlay:!0}}function S(){return[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(e=>({title:e.toString()+" is the longest header in the world",width:120+e%4*10,icon:"headerString",hasMenu:!0}))}function f(){const[e,t]=d(S),n=m((o,r)=>{const l=e.indexOf(o),s=[...e];s[l]={...s[l],width:r},t(s)},[e]);return a.createElement(c,{width:"100%",getCellContent:C,getCellsForSelection:!0,columns:e,rows:1e3,onColumnResize:n})}function Ne(){return[{title:"Relation",width:360,icon:"headerString",hasMenu:!0}]}function Te([e,t]){return{kind:i.Drilldown,data:[{text:`Image ${e}-${t}`,img:"https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg"},{text:`Text ${e}-${t}`},{text:`More text ${e}-${t}`}],allowOverlay:!0}}function y(){const[e,t]=d(Ne),n=m((o,r)=>{const l=e.indexOf(o),s=[...e];s[l]={...s[l],width:r},t(s)},[e]);return a.createElement(c,{width:"100%",getCellContent:Te,columns:e,rows:1e3,onColumnResize:n,smoothScrollX:!0,smoothScrollY:!0})}const N=[{title:"Number",width:100,icon:"headerArray",overlayIcon:"rowOwnerOverlay"},{title:"Square",width:100}];function p([e,t]){const n=Math.pow(t,e+1);return{kind:i.Number,data:n,displayData:n.toString(),allowOverlay:!1}}function D(){return a.createElement(c,{width:"100%",getCellContent:p,columns:N,rows:1e3})}function b(){const[e,t]=d(S),n=m((o,r)=>{const l=e.indexOf(o);if(l!==-1){const s={...o,width:r},u=[...e];u.splice(l,1,s),t(u)}},[e]);return a.createElement(c,{width:"100%",getCellContent:C,onColumnResize:n,columns:e,rows:1e3,smoothScrollY:!0,smoothScrollX:!0})}function k(){const[e,t]=d(void 0),n=o=>{var r;(((r=o.current)==null?void 0:r.cell[0])??0)%2===0&&t(o)};return a.createElement(c,{width:"100%",gridSelection:e,onGridSelectionChange:n,getCellContent:p,columns:N,rows:1e3})}function G(){return a.createElement(c,{width:"100%",isDraggable:!0,onDragStart:e=>{e.setData("text","testing")},getCellContent:p,columns:N,rows:1e3})}function R(){const e=[{title:"Number",width:250},{title:"Square",width:250}];return a.createElement("div",{style:{width:500,height:500,position:"relative"}},a.createElement(c,{width:500,height:500,isDraggable:!0,onDragStart:t=>{t.setData("text","testing")},getCellContent:p,columns:e,smoothScrollX:!0,smoothScrollY:!0,rowHeight:50,headerHeight:50,rows:9}))}function h({columnCount:e}){const t=[{title:"Number",width:250},{title:"Square",width:250}];for(let n=2;n<e;n++)t.push({title:"Foo",width:250});return a.createElement(c,{width:"100%",isDraggable:!0,getCellContent:p,columns:t,smoothScrollX:!0,smoothScrollY:!0,rowHeight:50,headerHeight:50,rows:9})}h.args={columnCount:2};function z(){const e=g(()=>S().map(s=>({...s,width:300,title:"Making column smaller used to crash!"})),[]),[t,n]=d({current:{cell:[2,8],range:{width:1,height:1,x:2,y:8},rangeStack:[]},columns:w.empty(),rows:w.empty()}),[o,r]=d(e),l=m(s=>{n(s)},[]);return a.createElement(c,{width:"100%",getCellContent:C,columns:o,rows:1e3,onGridSelectionChange:l,gridSelection:t,onColumnResize:(s,u)=>{u>300?r(e):r([])}})}function Ve(){return{"resize me 0":120,"resize me 1":120,"resize me 2":120,"resize me 3":120,"resize me 4":120,"resize me 5":120,"resize me 6":120,"resize me 7":120}}function He(e){return Object.entries(e).map(([t,n])=>({title:t,width:n,icon:"headerString",hasMenu:!0}))}function E(){const[e,t]=d(Ve),n=g(()=>He(e),[e]),o=m((r,l)=>{t(s=>({...s,[r.title]:l}))},[]);return a.createElement(c,{width:"100%",getCellContent:C,columns:n,rows:20,isDraggable:!1,smoothScrollX:!0,smoothScrollY:!0,onColumnResize:o})}function v(){const e=g(()=>S().map(s=>({...s,width:300,title:"Making column smaller used to crash!"})),[]),[t,n]=d({current:{cell:[2,8],range:{width:1,height:1,x:2,y:8},rangeStack:[]},columns:w.empty(),rows:w.empty()}),[o,r]=d(e),l=m(s=>{n(s)},[]);return a.createElement(c,{width:"100%",getCellContent:C,columns:o,rows:1e3,onGridSelectionChange:l,gridSelection:t,onColumnResize:(s,u)=>{u>300?r(e):r([e[0]])}})}function x(){const e=g(S,[]),[t,n]=d(10),o=m(()=>{n(u=>u+1)},[]),[r,l]=d(void 0),s=m(u=>{l(u)},[]);return a.createElement(c,{width:"100%",getCellContent:C,columns:e,rows:t,onRowAppended:o,onGridSelectionChange:s,gridSelection:r})}function O(){const e=g(S,[]),[t,n]=d(void 0),o=m(r=>{n(r)},[]);return a.createElement(c,{width:"100%",getCellContent:C,columns:e,rows:100,onGridSelectionChange:o,gridSelection:t})}function M(){const e=g(()=>[{title:"MD short",width:50},{title:"MD long",width:50}],[]),t=m(([l,s])=>l===0?{data:"text",allowOverlay:!0,kind:i.Markdown}:l===1?{data:`text really really really long
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
                `,allowOverlay:!0,kind:i.Markdown}:{data:"text",allowOverlay:!0,kind:i.Markdown},[]),[n,o]=d({current:{cell:[2,8],range:{width:1,height:1,x:2,y:8},rangeStack:[]},columns:w.empty(),rows:w.empty()}),r=m(l=>{o(l)},[]);return a.createElement(c,{width:"100%",getCellContent:t,columns:e,rows:1e3,onGridSelectionChange:r,gridSelection:n})}const B=()=>{const[e,t]=d([!1,!1]);return a.createElement(c,{width:"100%",columns:[{title:"Editable",width:100},{title:"Readonly",width:100}],rows:1,getCellContent:([n])=>({kind:i.Boolean,readonly:n!==0,allowOverlay:!1,data:e[n]}),onCellEdited:([n],o)=>{o.kind===i.Boolean&&t(r=>{const l=[...r];return l.splice(n,1,o.data),l})}})},$=()=>{const[e,t]=d(()=>{const n=[];for(let o=0;o<2e3;o++)n.push(["Edit","Me"]);return n});return a.createElement(c,{width:"100%",columns:[{title:"Column A",width:250},{title:"Column B",width:250}],rows:e.length,getCellContent:([n,o])=>({kind:i.Text,allowOverlay:!0,data:e[o][n],displayData:e[o][n]}),onCellEdited:([n,o],r)=>{const l=[...e],s=[...l[o]];typeof r.data=="string"&&(s[n]=r.data),l[o]=s,t(l)}})};function A(){const e=[{title:"Col1",width:100,grow:1,group:"Group"}],[t,n]=d(0);return a.createElement("div",null,a.createElement("h3",null,"Click count: ",t),a.createElement(c,{width:500,height:500,rows:0,columns:e,getCellContent:()=>({kind:i.Text,data:"",displayData:"",allowOverlay:!1}),getGroupDetails:o=>({name:o,actions:[{icon:"headerString",title:"Action",onClick:r=>n(l=>l+1)}]})}))}var T,V,H;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`function Simplenotest() {
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
}`,...(H=(V=f.parameters)==null?void 0:V.docs)==null?void 0:H.source}}};var I,X,Y;y.parameters={...y.parameters,docs:{...(I=y.parameters)==null?void 0:I.docs,source:{originalSource:`function RelationColumn() {
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
}`,...(Y=(X=y.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var _,K,j;D.parameters={...D.parameters,docs:{...(_=D.parameters)==null?void 0:_.docs,source:{originalSource:`function Minimal() {
  return <DataEditor width="100%" getCellContent={getData} columns={columns} rows={1000} />;
}`,...(j=(K=D.parameters)==null?void 0:K.docs)==null?void 0:j.source}}};var q,F,L;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:`function Smooth() {
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
}`,...(L=(F=b.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var J,U,W;k.parameters={...k.parameters,docs:{...(J=k.parameters)==null?void 0:J.docs,source:{originalSource:`function ManualControl() {
  const [gridSelection, setGridSelection] = useState<GridSelection | undefined>(undefined);
  const cb = (newVal: GridSelection) => {
    if ((newVal.current?.cell[0] ?? 0) % 2 === 0) {
      setGridSelection(newVal);
    }
  };
  return <DataEditor width="100%" gridSelection={gridSelection} onGridSelectionChange={cb} getCellContent={getData} columns={columns} rows={1000} />;
}`,...(W=(U=k.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var P,Q,Z;G.parameters={...G.parameters,docs:{...(P=G.parameters)==null?void 0:P.docs,source:{originalSource:`function Draggable() {
  return <DataEditor width="100%" isDraggable={true} onDragStart={args => {
    args.setData("text", "testing");
  }} getCellContent={getData} columns={columns} rows={1000} />;
}`,...(Z=(Q=G.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var ee,te,ne;R.parameters={...R.parameters,docs:{...(ee=R.parameters)==null?void 0:ee.docs,source:{originalSource:`function IdealSize() {
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
}`,...(ne=(te=R.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var oe,le,re;h.parameters={...h.parameters,docs:{...(oe=h.parameters)==null?void 0:oe.docs,source:{originalSource:`function DynamicAddRemoveColumns({
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
}`,...(re=(le=h.parameters)==null?void 0:le.docs)==null?void 0:re.source}}};var se,ae,ie;z.parameters={...z.parameters,docs:{...(se=z.parameters)==null?void 0:se.docs,source:{originalSource:`function GridSelectionOutOfRangeNoColumns() {
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
}`,...(ie=(ae=z.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};var ce,de,ue;E.parameters={...E.parameters,docs:{...(ce=E.parameters)==null?void 0:ce.docs,source:{originalSource:`function ResizableColumns() {
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
}`,...(ue=(de=E.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var me,Ce,we;v.parameters={...v.parameters,docs:{...(me=v.parameters)==null?void 0:me.docs,source:{originalSource:`function GridSelectionOutOfRangeLessColumnsThanSelection() {
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
}`,...(we=(Ce=v.parameters)==null?void 0:Ce.docs)==null?void 0:we.source}}};var ge,Se,he;x.parameters={...x.parameters,docs:{...(ge=x.parameters)==null?void 0:ge.docs,source:{originalSource:`function GridAddNewRows() {
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
}`,...(he=(Se=x.parameters)==null?void 0:Se.docs)==null?void 0:he.source}}};var pe,fe,ye;O.parameters={...O.parameters,docs:{...(pe=O.parameters)==null?void 0:pe.docs,source:{originalSource:`function GridNoTrailingBlankRow() {
  const cols = useMemo(getDummyCols, []);
  const [selected, setSelected] = useState<GridSelection | undefined>(undefined);
  const onSelected = useCallback((newSel?: GridSelection) => {
    setSelected(newSel);
  }, []);
  return <DataEditor width="100%" getCellContent={getDummyData} columns={cols} rows={100} onGridSelectionChange={onSelected} gridSelection={selected} />;
}`,...(ye=(fe=O.parameters)==null?void 0:fe.docs)==null?void 0:ye.source}}};var De,be,ke;M.parameters={...M.parameters,docs:{...(De=M.parameters)==null?void 0:De.docs,source:{originalSource:`function MarkdownEdits() {
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
}`,...(ke=(be=M.parameters)==null?void 0:be.docs)==null?void 0:ke.source}}};var Ge,Re,ze;B.parameters={...B.parameters,docs:{...(Ge=B.parameters)==null?void 0:Ge.docs,source:{originalSource:`() => {
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
}`,...(ze=(Re=B.parameters)==null?void 0:Re.docs)==null?void 0:ze.source}}};var Ee,ve,xe;$.parameters={...$.parameters,docs:{...(Ee=$.parameters)==null?void 0:Ee.docs,source:{originalSource:`() => {
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
}`,...(xe=(ve=$.parameters)==null?void 0:ve.docs)==null?void 0:xe.source}}};var Oe,Me,Be;A.parameters={...A.parameters,docs:{...(Oe=A.parameters)==null?void 0:Oe.docs,source:{originalSource:`function GroupHeaderActionClick() {
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
      data: '',
      displayData: '',
      allowOverlay: false
    })} getGroupDetails={name => ({
      name,
      actions: [{
        icon: 'headerString',
        title: "Action",
        onClick: e => setClickCount(c => c + 1)
      }]
    })} />
        </div>;
}`,...(Be=(Me=A.parameters)==null?void 0:Me.docs)==null?void 0:Be.source}}};const Ue=["Simplenotest","RelationColumn","Minimal","Smooth","ManualControl","Draggable","IdealSize","DynamicAddRemoveColumns","GridSelectionOutOfRangeNoColumns","ResizableColumns","GridSelectionOutOfRangeLessColumnsThanSelection","GridAddNewRows","GridNoTrailingBlankRow","MarkdownEdits","CanEditBoolean","SimpleEditable","GroupHeaderActionClick"];export{B as CanEditBoolean,G as Draggable,h as DynamicAddRemoveColumns,x as GridAddNewRows,O as GridNoTrailingBlankRow,v as GridSelectionOutOfRangeLessColumnsThanSelection,z as GridSelectionOutOfRangeNoColumns,A as GroupHeaderActionClick,R as IdealSize,k as ManualControl,M as MarkdownEdits,D as Minimal,y as RelationColumn,E as ResizableColumns,$ as SimpleEditable,f as Simplenotest,b as Smooth,Ue as __namedExportsOrder,Je as default};
