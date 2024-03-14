import{j as t,a as c}from"./marked.esm-dbrxtycE.js";import{R as d}from"./index-BMVQvedj.js";import{D as f}from"./data-editor-all-GpgGLgAp.js";import{B as w,D as S,P as C,M as x,u as G,d as v}from"./utils-7mONzaSM.js";import{G as m}from"./image-window-loader-EipmoZrG.js";import{S as D}from"./story-utils-K2EZnGjM.js";import"./iframe-IBA1fIo6.js";import"../sb-preview/runtime.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-x65Jn_nE.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const W={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>t(D,{children:t(w,{title:"Spans",description:c(S,{children:["By setting the ",t(C,{children:"span"})," of a cell you can create spans in your grid. All cells within a span must return consistent data for defined behavior.",c(x,{children:["Spans will always be split if they span frozen and non-frozen columns. By default selections are always expanded to include a span. This can be disabled using the"," ",t(C,{children:"spanRangeBehavior"})," prop."]})]}),children:t(o,{})})})]},a=()=>{const{cols:o,getCellContent:i}=G(100,!0,!0),r=d.useCallback(e=>{const[n,l]=e;return l===6&&n>=3&&n<=4?{kind:m.Text,allowOverlay:!1,data:"Span Cell that is very long and will go past the cell limits",span:[3,4],displayData:"Span Cell that is very long and will go past the cell limits"}:l===5?{kind:m.Text,allowOverlay:!1,data:"Span Cell that is very long and will go past the cell limits",span:[0,99],displayData:"Span Cell that is very long and will go past the cell limits"}:i(e)},[i]),y=d.useCallback(e=>{const n=[];for(let l=e.y;l<e.y+e.height;l++){const p=[];for(let s=e.x;s<e.x+e.width;s++)p.push(r([s,l]));n.push(p)}return n},[r]);return t(f,{...v,getCellContent:r,getCellsForSelection:y,columns:o,freezeColumns:2,rows:300,rowMarkers:"both"})};var u,h,g;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
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
}`,...(g=(h=a.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const I=["SpanCell"];export{a as SpanCell,I as __namedExportsOrder,W as default};
