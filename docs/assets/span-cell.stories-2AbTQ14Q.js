import{R as e}from"./iframe-DuKzhFAV.js";import{D as h}from"./data-editor-all-h01LK8X1.js";import{B as y,D as f,P as p,M as w,u as S,d as x}from"./utils-CXj6_Jia.js";import{G as d}from"./image-window-loader-D4WXs3fS.js";import{S as G}from"./story-utils-BbqVCsEB.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-C9zA5J5l.js";import"./flatten-mmeTaiPx.js";import"./scrolling-data-grid-BBESFY1a.js";import"./marked.esm-B1hMdrV8.js";import"./index-D_kXk1yT.js";import"./index.esm-CRvNmNkt.js";import"./index-Cfg5Tl68.js";const A={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(G,null,e.createElement(y,{title:"Spans",description:e.createElement(f,null,"By setting the ",e.createElement(p,null,"span")," of a cell you can create spans in your grid. All cells within a span must return consistent data for defined behavior.",e.createElement(w,null,"Spans will always be split if they span frozen and non-frozen columns. By default selections are always expanded to include a span. This can be disabled using the"," ",e.createElement(p,null,"spanRangeBehavior")," prop."))},e.createElement(r,null)))]},a=()=>{const{cols:r,getCellContent:i}=S(100,!0,!0),o=e.useCallback(l=>{const[n,t]=l;return t===6&&n>=3&&n<=4?{kind:d.Text,allowOverlay:!1,data:"Span Cell that is very long and will go past the cell limits",span:[3,4],displayData:"Span Cell that is very long and will go past the cell limits"}:t===5?{kind:d.Text,allowOverlay:!1,data:"Span Cell that is very long and will go past the cell limits",span:[0,99],displayData:"Span Cell that is very long and will go past the cell limits"}:i(l)},[i]),g=e.useCallback(l=>{const n=[];for(let t=l.y;t<l.y+l.height;t++){const c=[];for(let s=l.x;s<l.x+l.width;s++)c.push(o([s,t]));n.push(c)}return n},[o]);return e.createElement(h,{...x,getCellContent:o,getCellsForSelection:g,columns:r,freezeColumns:2,rows:300,rowMarkers:"both"})};var u,m,C;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100, true, true);
  const mangledGetCellContent = React.useCallback<typeof getCellContent>(cell => {
    const [col, row] = cell;
    if (row === 6 && col >= 3 && col <= 4) {
      return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        data: "Span Cell that is very long and will go past the cell limits",
        span: [3, 4],
        displayData: "Span Cell that is very long and will go past the cell limits"
      };
    }
    if (row === 5) {
      return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        data: "Span Cell that is very long and will go past the cell limits",
        span: [0, 99],
        displayData: "Span Cell that is very long and will go past the cell limits"
      };
    }
    return getCellContent(cell);
  }, [getCellContent]);
  const getCellsForSelection = React.useCallback((selection: Rectangle): CellArray => {
    const result: GridCell[][] = [];
    for (let y = selection.y; y < selection.y + selection.height; y++) {
      const row: GridCell[] = [];
      for (let x = selection.x; x < selection.x + selection.width; x++) {
        row.push(mangledGetCellContent([x, y]));
      }
      result.push(row);
    }
    return result;
  }, [mangledGetCellContent]);
  return <DataEditor {...defaultProps} getCellContent={mangledGetCellContent} getCellsForSelection={getCellsForSelection} columns={cols} freezeColumns={2} rows={300} rowMarkers="both" />;
}`,...(C=(m=a.parameters)==null?void 0:m.docs)==null?void 0:C.source}}};const K=["SpanCell"];export{a as SpanCell,K as __namedExportsOrder,A as default};
