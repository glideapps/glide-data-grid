import{R as e}from"./iframe-zllvizKV.js";import{D as m}from"./data-editor-all-TtktUvjC.js";import{B as p,D as u,P as S,u as C,d as f}from"./utils-CPb9Dy3W.js";import{C as l}from"./image-window-loader-pF5atNMS.js";import{S as w}from"./story-utils-Bq5TKRmG.js";import"./throttle-BjyYQ5NM.js";import"./flatten-C1Ps98hX.js";import"./scrolling-data-grid-B0GnSjR5.js";import"./marked.esm-D9WPxsEN.js";import"./index-D_kXk1yT.js";import"./index.esm-D_4T59sk.js";import"./index-CHkWWjXc.js";const H={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(w,null,e.createElement(p,{title:"HighlightCells",description:e.createElement(u,null,"The ",e.createElement(S,null,"highlightRegions")," prop can be set to provide additional hinting or context for the current selection.")},e.createElement(n,null)))]},r=()=>{const{cols:n,getCellContent:h}=C(100),[t,g]=e.useState({columns:l.empty(),rows:l.empty()}),d=e.useMemo(()=>{if(t.current===void 0)return;const[o,i]=t.current.cell;return[{color:"#44BB0022",range:{x:o+2,y:i,width:10,height:10},style:"solid"},{color:"#b000b021",range:{x:o,y:i+2,width:1,height:1}}]},[t]);return e.createElement(m,{...f,rowMarkers:"both",freezeColumns:1,highlightRegions:d,gridSelection:t,onGridSelectionChange:g,getCellContent:h,columns:n,verticalBorder:o=>o>0,rows:1e3})};var s,c,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
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
}`,...(a=(c=r.parameters)==null?void 0:c.docs)==null?void 0:a.source}}};const _=["HighlightCells"];export{r as HighlightCells,_ as __namedExportsOrder,H as default};
