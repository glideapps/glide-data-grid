import{j as e,a as t,F as c}from"./marked.esm-dbrxtycE.js";import{R as u}from"./index-BMVQvedj.js";import{D as p}from"./data-editor-all-BRJ4jo8P.js";import{B as d,D as h,P as s,M as C,u as g,d as f}from"./utils-Pc9bIpez.js";import{S as z}from"./story-utils-K2EZnGjM.js";import"./iframe-bMSjurlU.js";import"../sb-preview/runtime.js";import"./image-window-loader-kcFVuRwy.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-QSoV3kaN.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const Y={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e(z,{children:e(d,{title:"Resizable columns",description:t(c,{children:[t(h,{children:["You can resize columns by dragging their edges, as long as you respond to the"," ",e(s,{children:"onColumnResize"})," prop."]}),t(C,{children:["By setting the ",e(s,{children:"overscrollX"})," property extra space can be allocated at the end of the grid to allow for easier resizing of the final column. You can highlight multiple columns to resize them all at once."]})]}),children:e(r,{})})})]},o=()=>{const{cols:r,getCellContent:i,onColumnResize:m}=g(60);return e(p,{...f,getCellContent:i,columns:r,rowMarkers:"both",overscrollX:200,overscrollY:200,maxColumnAutoWidth:500,maxColumnWidth:2e3,rows:50,scaleToRem:!0,theme:u.useMemo(()=>({baseFontStyle:"0.8125rem",headerFontStyle:"600 0.8125rem",editorFontSize:"0.8125rem"}),[]),onColumnResize:m})};var a,n,l;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
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
}`,...(l=(n=o.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};const j=["ResizableColumns"];export{o as ResizableColumns,j as __namedExportsOrder,Y as default};
