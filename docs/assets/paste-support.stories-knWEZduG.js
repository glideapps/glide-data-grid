import{j as e,a,F as d}from"./marked.esm-dbrxtycE.js";import"./index-BMVQvedj.js";import{D as m}from"./data-editor-all-ZqeXZrI7.js";import{B as u,D as c,P as g,M as h,u as f,d as C}from"./utils-Eaa2yR9r.js";import{S as y}from"./story-utils-K2EZnGjM.js";import"./iframe-CHucUuiQ.js";import"../sb-preview/runtime.js";import"./image-window-loader-KuvgVtpW.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-Lq0bpFDr.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const F={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e(y,{children:e(u,{title:"Paste support",description:a(d,{children:[a(c,{children:["The data grid can handle paste automatically by returning true from"," ",e(g,{children:"onPaste"}),". You can also return false and handle paste yourself. If paste is undefined the DataEditor will do its best to paste to the current cell."]}),e(h,{children:"Paste supports the copy format of Google Sheets and Excel. Below is an example of data copied from excel with some escaped text."}),e("textarea",{value:`Sunday	Dogs	https://google.com
Monday	Cats	https://google.com
Tuesday	Turtles	https://google.com
Wednesday	Bears	https://google.com
Thursday	"L  ions"	https://google.com
Friday	Pigs	https://google.com
Saturday	"Turkeys and some ""quotes"" and
a new line char ""more quotes"" plus a tab  ."	https://google.com`,style:{width:"100%",marginBottom:20,borderRadius:9,minHeight:200,padding:10}})]}),children:e(o,{})})})]},t=()=>{const{cols:o,getCellContent:n,onColumnResize:i,setCellValue:p}=f(50,!1);return e(m,{...C,getCellContent:n,rowMarkers:"both",columns:o,onCellEdited:p,onColumnResize:i,onPaste:!0,rows:400})};var r,s,l;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useMockDataGenerator(50, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} rowMarkers="both" columns={cols} onCellEdited={setCellValue} onColumnResize={onColumnResize} onPaste={true} rows={400} />;
}`,...(l=(s=t.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const V=["PasteSupport"];export{t as PasteSupport,V as __namedExportsOrder,F as default};
