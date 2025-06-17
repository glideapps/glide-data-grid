import{R as e}from"./iframe-D5HE2UKG.js";import{D as i}from"./data-editor-all-UASgj79e.js";import{B as c,D as u,P as r,M as p,u as d,d as h}from"./utils-y5tSATXB.js";import{S as C}from"./story-utils-CaR2zbvP.js";import"./image-window-loader-CXmGoB74.js";import"./throttle-B-JxAl_x.js";import"./marked.esm-DYGK_00c.js";import"./flatten-LpFP8MBL.js";import"./scrolling-data-grid-xNBDxzG1.js";import"./index-D_kXk1yT.js";import"./index.esm-539hGnvP.js";import"./index-DndffQvu.js";const W={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(C,null,e.createElement(c,{title:"Resizable columns",description:e.createElement(e.Fragment,null,e.createElement(u,null,"You can resize columns by dragging their edges, as long as you respond to the"," ",e.createElement(r,null,"onColumnResize")," prop."),e.createElement(p,null,"By setting the ",e.createElement(r,null,"overscrollX")," property extra space can be allocated at the end of the grid to allow for easier resizing of the final column. You can highlight multiple columns to resize them all at once."))},e.createElement(t,null)))]},o=()=>{const{cols:t,getCellContent:s,onColumnResize:m}=d(60);return e.createElement(i,{...h,getCellContent:s,columns:t,rowMarkers:"both",overscrollX:200,overscrollY:200,maxColumnAutoWidth:500,maxColumnWidth:2e3,rows:50,scaleToRem:!0,theme:e.useMemo(()=>({baseFontStyle:"0.8125rem",headerFontStyle:"600 0.8125rem",editorFontSize:"0.8125rem"}),[]),onColumnResize:m})};var l,n,a;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(60);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers="both" overscrollX={200} overscrollY={200} maxColumnAutoWidth={500} maxColumnWidth={2000} rows={50} scaleToRem={true} theme={React.useMemo(() => ({
    baseFontStyle: "0.8125rem",
    headerFontStyle: "600 0.8125rem",
    editorFontSize: "0.8125rem"
  }), [])} onColumnResize={onColumnResize} />;
}`,...(a=(n=o.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const v=["ResizableColumns"];export{o as ResizableColumns,v as __namedExportsOrder,W as default};
