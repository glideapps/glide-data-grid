import{j as e,F as d}from"./marked.esm-dbrxtycE.js";import{R as C}from"./index-BMVQvedj.js";import{D as m}from"./data-editor-all-ATY7qU3b.js";import{B as p,D as g,u as E,d as f}from"./utils-wFAOo4Dx.js";import{G as h}from"./image-window-loader-hgJATaim.js";import{S as R}from"./story-utils-K2EZnGjM.js";import"./iframe-ni8xiI1Q.js";import"../sb-preview/runtime.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-ta-GKPbC.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const O={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e(R,{children:e(p,{title:"Right ",description:e(d,{children:e(g,{children:"The data editor automatically detects RTL in text cells and respects it."})}),children:e(o,{})})})]},t=()=>{const{cols:o,getCellContent:r,setCellValue:s,onColumnResize:i}=E(60,!1),D=C.useCallback(l=>{const[c,w]=l;return c!==0?r(l):{kind:h.Text,allowOverlay:!0,data:"אני גדעון, מומחה לאפליקציות גלייד.",displayData:"אני גדעון, מומחה לאפליקציות גלייד.",allowWrapping:!0}},[r]);return e(m,{...f,getCellContent:D,columns:o,onColumnResize:i,getCellsForSelection:!0,rowMarkers:"both",onPaste:!0,onCellEdited:s,rows:1e3})};var u,n,a;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue,
    onColumnResize
  } = useMockDataGenerator(60, false);
  const getCellContentMangled = React.useCallback<typeof getCellContent>(item => {
    const [col, _row] = item;
    if (col !== 0) return getCellContent(item);
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      data: "אני גדעון, מומחה לאפליקציות גלייד.",
      displayData: "אני גדעון, מומחה לאפליקציות גלייד.",
      allowWrapping: true
    };
  }, [getCellContent]);
  return <DataEditor {...defaultProps} getCellContent={getCellContentMangled} columns={cols} onColumnResize={onColumnResize} getCellsForSelection={true} rowMarkers={"both"} onPaste={true} onCellEdited={setCellValue} rows={1000} />;
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const V=["RightToLeft"];export{t as RightToLeft,V as __namedExportsOrder,O as default};
