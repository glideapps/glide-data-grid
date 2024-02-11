import{j as e,a as p}from"./marked.esm-dbrxtycE.js";import{R as l}from"./index-BMVQvedj.js";import{D as u}from"./data-editor-all-kwt0I9Kc.js";import{B as S,D as C,P as f,u as w,d as D}from"./utils-rXlmyYaC.js";import{C as s}from"./image-window-loader-aMebukIX.js";import{S as y}from"./story-utils-K2EZnGjM.js";import"./iframe-lQqvcp2b.js";import"../sb-preview/runtime.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-AbyJF5mC.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const W={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e(y,{children:e(S,{title:"HighlightCells",description:p(C,{children:["The ",e(f,{children:"highlightRegions"})," prop can be set to provide additional hinting or context for the current selection."]}),children:e(n,{})})})]},r=()=>{const{cols:n,getCellContent:d}=w(100),[t,g]=l.useState({columns:s.empty(),rows:s.empty()}),m=l.useMemo(()=>{if(t.current===void 0)return;const[o,i]=t.current.cell;return[{color:"#44BB0022",range:{x:o+2,y:i,width:10,height:10},style:"solid"},{color:"#b000b021",range:{x:o,y:i+2,width:1,height:1}}]},[t]);return e(u,{...D,rowMarkers:"both",freezeColumns:1,highlightRegions:m,gridSelection:t,onGridSelectionChange:g,getCellContent:d,columns:n,verticalBorder:o=>o>0,rows:1e3})};var c,a,h;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  const [gridSelection, setGridSelection] = React.useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });
  const highlights = React.useMemo<DataEditorProps["highlightRegions"]>(() => {
    if (gridSelection.current === undefined) return undefined;
    const [col, row] = gridSelection.current.cell;
    return [{
      color: "#44BB0022",
      range: {
        x: col + 2,
        y: row,
        width: 10,
        height: 10
      },
      style: "solid"
    }, {
      color: "#b000b021",
      range: {
        x: col,
        y: row + 2,
        width: 1,
        height: 1
      }
    }];
  }, [gridSelection]);
  return <DataEditor {...defaultProps} rowMarkers="both" freezeColumns={1} highlightRegions={highlights} gridSelection={gridSelection} onGridSelectionChange={setGridSelection} getCellContent={getCellContent} columns={cols} verticalBorder={c => c > 0} rows={1000} />;
}`,...(h=(a=r.parameters)==null?void 0:a.docs)==null?void 0:h.source}}};const A=["HighlightCells"];export{r as HighlightCells,A as __namedExportsOrder,W as default};
