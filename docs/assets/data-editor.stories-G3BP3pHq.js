import{j as a}from"./marked.esm-dbrxtycE.js";import"./index-BMVQvedj.js";import{B as Me}from"./story-utils-K2EZnGjM.js";import{C,G as i}from"./image-window-loader-AqdSaR7d.js";import{D as c}from"./data-editor-all-7B89JiwZ.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./iframe-C8A8SeMs.js";import"../sb-preview/runtime.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-ex7RycJy.js";const{useState:d,useCallback:m,useMemo:g}=__STORYBOOK_MODULE_ADDONS__,Fe={title:"Tests/TestCases",decorators:[e=>a(Me,{width:1e3,height:800,children:a(e,{})})]};function w([e,t]){return e===0?{kind:i.RowID,data:`RowID ${e}, ${t}`,allowOverlay:!1}:e===1?{kind:i.Bubble,data:[`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`,`Bub ${e}`,`Bub ${t}`],allowOverlay:!0}:e===2?{kind:i.Image,data:["https://i.imgur.com/5J0BftG.jpg","https://preview.redd.it/7jlqkp2cyap51.jpg?width=575&auto=webp&s=26fa9ed15b16fb450ee08ed1f2f0ccb5e0223581"],allowOverlay:!0,readonly:!1}:e===3?{kind:i.Markdown,data:`## Markdown has titles

And supports newline chars and automatic wrapping text that just needs to be long enough to trigger it.


[Google](https://google.com)

- with
- lists
- that
- can
- be
- pretty
- long
                    `,allowOverlay:!0}:e===4?{kind:i.Number,displayData:"$10,352",allowOverlay:!0,data:10352,readonly:!0}:e===5?{kind:i.Uri,data:"https://www.google.com",allowOverlay:!0}:e===6?{kind:i.Boolean,data:t%3===0||t%5===0,readonly:!0,allowOverlay:!1}:e===7?{kind:i.Text,displayData:"הרפתקה חדשה",data:"הרפתקה חדשה",allowOverlay:!0,readonly:!0}:e===8?{kind:i.Drilldown,data:[{text:"Test",img:"https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg"},{text:"No Image"}],allowOverlay:!0}:{kind:i.Text,displayData:`${e}, ${t} 🦝`,data:`${e}, ${t} 🦝`,allowOverlay:!0}}function S(){return[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(e=>({title:e.toString()+" is the longest header in the world",width:120+e%4*10,icon:"headerString",hasMenu:!0}))}function f(){const[e,t]=d(S),n=m((o,s)=>{const l=e.indexOf(o),r=[...e];r[l]={...r[l],width:s},t(r)},[e]);return a(c,{width:"100%",getCellContent:w,getCellsForSelection:!0,columns:e,rows:1e3,onColumnResize:n})}function Ee(){return[{title:"Relation",width:360,icon:"headerString",hasMenu:!0}]}function Be([e,t]){return{kind:i.Drilldown,data:[{text:`Image ${e}-${t}`,img:"https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg"},{text:`Text ${e}-${t}`},{text:`More text ${e}-${t}`}],allowOverlay:!0}}function y(){const[e,t]=d(Ee),n=m((o,s)=>{const l=e.indexOf(o),r=[...e];r[l]={...r[l],width:s},t(r)},[e]);return a(c,{width:"100%",getCellContent:Be,columns:e,rows:1e3,onColumnResize:n,smoothScrollX:!0,smoothScrollY:!0})}const N=[{title:"Number",width:100,icon:"headerArray",overlayIcon:"rowOwnerOverlay"},{title:"Square",width:100}];function p([e,t]){const n=Math.pow(t,e+1);return{kind:i.Number,data:n,displayData:n.toString(),allowOverlay:!1}}function D(){return a(c,{width:"100%",getCellContent:p,columns:N,rows:1e3})}function b(){const[e,t]=d(S),n=m((o,s)=>{const l=e.indexOf(o);if(l!==-1){const r={...o,width:s},u=[...e];u.splice(l,1,r),t(u)}},[e]);return a(c,{width:"100%",getCellContent:w,onColumnResize:n,columns:e,rows:1e3,smoothScrollY:!0,smoothScrollX:!0})}function R(){const[e,t]=d(void 0);return a(c,{width:"100%",gridSelection:e,onGridSelectionChange:o=>{var s;(((s=o.current)==null?void 0:s.cell[0])??0)%2===0&&t(o)},getCellContent:p,columns:N,rows:1e3})}function k(){return a(c,{width:"100%",isDraggable:!0,onDragStart:e=>{e.setData("text","testing")},getCellContent:p,columns:N,rows:1e3})}function z(){return a("div",{style:{width:500,height:500,position:"relative"},children:a(c,{width:500,height:500,isDraggable:!0,onDragStart:t=>{t.setData("text","testing")},getCellContent:p,columns:[{title:"Number",width:250},{title:"Square",width:250}],smoothScrollX:!0,smoothScrollY:!0,rowHeight:50,headerHeight:50,rows:9})})}function h({columnCount:e}){const t=[{title:"Number",width:250},{title:"Square",width:250}];for(let n=2;n<e;n++)t.push({title:"Foo",width:250});return a(c,{width:"100%",isDraggable:!0,getCellContent:p,columns:t,smoothScrollX:!0,smoothScrollY:!0,rowHeight:50,headerHeight:50,rows:9})}h.args={columnCount:2};function G(){const e=g(()=>S().map(r=>({...r,width:300,title:"Making column smaller used to crash!"})),[]),[t,n]=d({current:{cell:[2,8],range:{width:1,height:1,x:2,y:8},rangeStack:[]},columns:C.empty(),rows:C.empty()}),[o,s]=d(e),l=m(r=>{n(r)},[]);return a(c,{width:"100%",getCellContent:w,columns:o,rows:1e3,onGridSelectionChange:l,gridSelection:t,onColumnResize:(r,u)=>{u>300?s(e):s([])}})}function $e(){return{"resize me 0":120,"resize me 1":120,"resize me 2":120,"resize me 3":120,"resize me 4":120,"resize me 5":120,"resize me 6":120,"resize me 7":120}}function Ne(e){return Object.entries(e).map(([t,n])=>({title:t,width:n,icon:"headerString",hasMenu:!0}))}function v(){const[e,t]=d($e),n=g(()=>Ne(e),[e]),o=m((s,l)=>{t(r=>({...r,[s.title]:l}))},[]);return a(c,{width:"100%",getCellContent:w,columns:n,rows:20,isDraggable:!1,smoothScrollX:!0,smoothScrollY:!0,onColumnResize:o})}function x(){const e=g(()=>S().map(r=>({...r,width:300,title:"Making column smaller used to crash!"})),[]),[t,n]=d({current:{cell:[2,8],range:{width:1,height:1,x:2,y:8},rangeStack:[]},columns:C.empty(),rows:C.empty()}),[o,s]=d(e),l=m(r=>{n(r)},[]);return a(c,{width:"100%",getCellContent:w,columns:o,rows:1e3,onGridSelectionChange:l,gridSelection:t,onColumnResize:(r,u)=>{u>300?s(e):s([e[0]])}})}function O(){const e=g(S,[]),[t,n]=d(10),o=m(()=>{n(u=>u+1)},[]),[s,l]=d(void 0),r=m(u=>{l(u)},[]);return a(c,{width:"100%",getCellContent:w,columns:e,rows:t,onRowAppended:o,onGridSelectionChange:r,gridSelection:s})}function M(){const e=g(S,[]),[t,n]=d(void 0),o=m(s=>{n(s)},[]);return a(c,{width:"100%",getCellContent:w,columns:e,rows:100,onGridSelectionChange:o,gridSelection:t})}function E(){const e=g(()=>[{title:"MD short",width:50},{title:"MD long",width:50}],[]),t=m(([l,r])=>l===0?{data:"text",allowOverlay:!0,kind:i.Markdown}:l===1?{data:`text really really really long
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
                `,allowOverlay:!0,kind:i.Markdown}:{data:"text",allowOverlay:!0,kind:i.Markdown},[]),[n,o]=d({current:{cell:[2,8],range:{width:1,height:1,x:2,y:8},rangeStack:[]},columns:C.empty(),rows:C.empty()}),s=m(l=>{o(l)},[]);return a(c,{width:"100%",getCellContent:t,columns:e,rows:1e3,onGridSelectionChange:s,gridSelection:n})}const B=()=>{const[e,t]=d([!1,!1]);return a(c,{width:"100%",columns:[{title:"Editable",width:100},{title:"Readonly",width:100}],rows:1,getCellContent:([n])=>({kind:i.Boolean,readonly:n!==0,allowOverlay:!1,data:e[n]}),onCellEdited:([n],o)=>{o.kind===i.Boolean&&t(s=>{const l=[...s];return l.splice(n,1,o.data),l})}})},$=()=>{const[e,t]=d(()=>{const n=[];for(let o=0;o<2e3;o++)n.push(["Edit","Me"]);return n});return a(c,{width:"100%",columns:[{title:"Column A",width:250},{title:"Column B",width:250}],rows:e.length,getCellContent:([n,o])=>({kind:i.Text,allowOverlay:!0,data:e[o][n],displayData:e[o][n]}),onCellEdited:([n,o],s)=>{const l=[...e],r=[...l[o]];typeof s.data=="string"&&(r[n]=s.data),l[o]=r,t(l)}})};var V,A,T;f.parameters={...f.parameters,docs:{...(V=f.parameters)==null?void 0:V.docs,source:{originalSource:`function Simplenotest() {
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
}`,...(T=(A=f.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var _,I,Y;y.parameters={...y.parameters,docs:{...(_=y.parameters)==null?void 0:_.docs,source:{originalSource:`function RelationColumn() {
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
}`,...(Y=(I=y.parameters)==null?void 0:I.docs)==null?void 0:Y.source}}};var H,X,j;D.parameters={...D.parameters,docs:{...(H=D.parameters)==null?void 0:H.docs,source:{originalSource:`function Minimal() {
  return <DataEditor width="100%" getCellContent={getData} columns={columns} rows={1000} />;
}`,...(j=(X=D.parameters)==null?void 0:X.docs)==null?void 0:j.source}}};var K,q,F;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`function Smooth() {
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
}`,...(F=(q=b.parameters)==null?void 0:q.docs)==null?void 0:F.source}}};var L,U,J;R.parameters={...R.parameters,docs:{...(L=R.parameters)==null?void 0:L.docs,source:{originalSource:`function ManualControl() {
  const [gridSelection, setGridSelection] = useState<GridSelection | undefined>(undefined);
  const cb = (newVal: GridSelection) => {
    if ((newVal.current?.cell[0] ?? 0) % 2 === 0) {
      setGridSelection(newVal);
    }
  };
  return <DataEditor width="100%" gridSelection={gridSelection} onGridSelectionChange={cb} getCellContent={getData} columns={columns} rows={1000} />;
}`,...(J=(U=R.parameters)==null?void 0:U.docs)==null?void 0:J.source}}};var W,P,Q;k.parameters={...k.parameters,docs:{...(W=k.parameters)==null?void 0:W.docs,source:{originalSource:`function Draggable() {
  return <DataEditor width="100%" isDraggable={true} onDragStart={args => {
    args.setData("text", "testing");
  }} getCellContent={getData} columns={columns} rows={1000} />;
}`,...(Q=(P=k.parameters)==null?void 0:P.docs)==null?void 0:Q.source}}};var Z,ee,te;z.parameters={...z.parameters,docs:{...(Z=z.parameters)==null?void 0:Z.docs,source:{originalSource:`function IdealSize() {
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
}`,...(te=(ee=z.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ne,oe,le;h.parameters={...h.parameters,docs:{...(ne=h.parameters)==null?void 0:ne.docs,source:{originalSource:`function DynamicAddRemoveColumns({
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
}`,...(le=(oe=h.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var se,re,ae;G.parameters={...G.parameters,docs:{...(se=G.parameters)==null?void 0:se.docs,source:{originalSource:`function GridSelectionOutOfRangeNoColumns() {
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
}`,...(ae=(re=G.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var ie,ce,de;v.parameters={...v.parameters,docs:{...(ie=v.parameters)==null?void 0:ie.docs,source:{originalSource:`function ResizableColumns() {
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
}`,...(de=(ce=v.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};var ue,me,we;x.parameters={...x.parameters,docs:{...(ue=x.parameters)==null?void 0:ue.docs,source:{originalSource:`function GridSelectionOutOfRangeLessColumnsThanSelection() {
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
}`,...(we=(me=x.parameters)==null?void 0:me.docs)==null?void 0:we.source}}};var Ce,ge,Se;O.parameters={...O.parameters,docs:{...(Ce=O.parameters)==null?void 0:Ce.docs,source:{originalSource:`function GridAddNewRows() {
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
}`,...(Se=(ge=O.parameters)==null?void 0:ge.docs)==null?void 0:Se.source}}};var he,pe,fe;M.parameters={...M.parameters,docs:{...(he=M.parameters)==null?void 0:he.docs,source:{originalSource:`function GridNoTrailingBlankRow() {
  const cols = useMemo(getDummyCols, []);
  const [selected, setSelected] = useState<GridSelection | undefined>(undefined);
  const onSelected = useCallback((newSel?: GridSelection) => {
    setSelected(newSel);
  }, []);
  return <DataEditor width="100%" getCellContent={getDummyData} columns={cols} rows={100} onGridSelectionChange={onSelected} gridSelection={selected} />;
}`,...(fe=(pe=M.parameters)==null?void 0:pe.docs)==null?void 0:fe.source}}};var ye,De,be;E.parameters={...E.parameters,docs:{...(ye=E.parameters)==null?void 0:ye.docs,source:{originalSource:`function MarkdownEdits() {
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
}`,...(be=(De=E.parameters)==null?void 0:De.docs)==null?void 0:be.source}}};var Re,ke,ze;B.parameters={...B.parameters,docs:{...(Re=B.parameters)==null?void 0:Re.docs,source:{originalSource:`() => {
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
        return (f as [boolean, boolean]);
      });
    }
  }} />;
}`,...(ze=(ke=B.parameters)==null?void 0:ke.docs)==null?void 0:ze.source}}};var Ge,ve,xe;$.parameters={...$.parameters,docs:{...(Ge=$.parameters)==null?void 0:Ge.docs,source:{originalSource:`() => {
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
}`,...(xe=(ve=$.parameters)==null?void 0:ve.docs)==null?void 0:xe.source}}};const Le=["Simplenotest","RelationColumn","Minimal","Smooth","ManualControl","Draggable","IdealSize","DynamicAddRemoveColumns","GridSelectionOutOfRangeNoColumns","ResizableColumns","GridSelectionOutOfRangeLessColumnsThanSelection","GridAddNewRows","GridNoTrailingBlankRow","MarkdownEdits","CanEditBoolean","SimpleEditable"];export{B as CanEditBoolean,k as Draggable,h as DynamicAddRemoveColumns,O as GridAddNewRows,M as GridNoTrailingBlankRow,x as GridSelectionOutOfRangeLessColumnsThanSelection,G as GridSelectionOutOfRangeNoColumns,z as IdealSize,R as ManualControl,E as MarkdownEdits,D as Minimal,y as RelationColumn,v as ResizableColumns,$ as SimpleEditable,f as Simplenotest,b as Smooth,Le as __namedExportsOrder,Fe as default};
