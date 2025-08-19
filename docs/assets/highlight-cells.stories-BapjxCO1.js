import{R as e}from"./iframe-DuKzhFAV.js";import{D as d}from"./data-editor-all-h01LK8X1.js";import{B as p,D as u,P as S,u as C,d as f}from"./utils-CXj6_Jia.js";import{C as l}from"./image-window-loader-D4WXs3fS.js";import{S as w}from"./story-utils-BbqVCsEB.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-C9zA5J5l.js";import"./flatten-mmeTaiPx.js";import"./scrolling-data-grid-BBESFY1a.js";import"./marked.esm-B1hMdrV8.js";import"./index-D_kXk1yT.js";import"./index.esm-CRvNmNkt.js";import"./index-Cfg5Tl68.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(w,null,e.createElement(p,{title:"HighlightCells",description:e.createElement(u,null,"The ",e.createElement(S,null,"highlightRegions")," prop can be set to provide additional hinting or context for the current selection.")},e.createElement(n,null)))]},r=()=>{const{cols:n,getCellContent:h}=C(100),[t,g]=e.useState({columns:l.empty(),rows:l.empty()}),m=e.useMemo(()=>{if(t.current===void 0)return;const[o,i]=t.current.cell;return[{color:"#44BB0022",range:{x:o+2,y:i,width:10,height:10},style:"solid"},{color:"#b000b021",range:{x:o,y:i+2,width:1,height:1}}]},[t]);return e.createElement(d,{...f,rowMarkers:"both",freezeColumns:1,highlightRegions:m,gridSelection:t,onGridSelectionChange:g,getCellContent:h,columns:n,verticalBorder:o=>o>0,rows:1e3})};var s,c,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
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
}`,...(a=(c=r.parameters)==null?void 0:c.docs)==null?void 0:a.source}}};const z=["HighlightCells"];export{r as HighlightCells,z as __namedExportsOrder,_ as default};
