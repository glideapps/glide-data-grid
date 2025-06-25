import{R as e}from"./iframe-D7FHW40z.js";import{D as p}from"./data-editor-all-C4aIH9_k.js";import{B as i,D as u,P as c,M as d,u as g,d as h}from"./utils-CeUnu-5F.js";import{S as f}from"./story-utils-D9-AhIIx.js";import"./image-window-loader-CfjEfam9.js";import"./throttle-BuZcW-Cs.js";import"./marked.esm-CvBPnlRB.js";import"./flatten-BqZvmjtX.js";import"./scrolling-data-grid-DZP9PJTz.js";import"./index-D_kXk1yT.js";import"./index.esm-B2SDAOL2.js";import"./index-AksxiiM8.js";const k={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(f,null,e.createElement(i,{title:"Paste support",description:e.createElement(e.Fragment,null,e.createElement(u,null,"The data grid can handle paste automatically by returning true from"," ",e.createElement(c,null,"onPaste"),". You can also return false and handle paste yourself. If paste is undefined the DataEditor will do its best to paste to the current cell."),e.createElement(d,null,"Paste supports the copy format of Google Sheets and Excel. Below is an example of data copied from excel with some escaped text."),e.createElement("textarea",{value:`Sunday	Dogs	https://google.com
Monday	Cats	https://google.com
Tuesday	Turtles	https://google.com
Wednesday	Bears	https://google.com
Thursday	"L  ions"	https://google.com
Friday	Pigs	https://google.com
Saturday	"Turkeys and some ""quotes"" and
a new line char ""more quotes"" plus a tab  ."	https://google.com`,style:{width:"100%",marginBottom:20,borderRadius:9,minHeight:200,padding:10}}))},e.createElement(o,null)))]},t=()=>{const{cols:o,getCellContent:l,onColumnResize:n,setCellValue:m}=g(50,!1);return e.createElement(p,{...h,getCellContent:l,rowMarkers:"both",columns:o,onCellEdited:m,onColumnResize:n,onPaste:!0,rows:400})};var a,r,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useMockDataGenerator(50, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} rowMarkers="both" columns={cols} onCellEdited={setCellValue} onColumnResize={onColumnResize} onPaste={true} rows={400} />;
}`,...(s=(r=t.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const B=["PasteSupport"];export{t as PasteSupport,B as __namedExportsOrder,k as default};
