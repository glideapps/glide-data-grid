import{R as e}from"./iframe-3q3VS4Fw.js";import{D as i}from"./data-editor-all-89B7Vuft.js";import{B as m,D as d,u as p,d as c}from"./utils-A64XP60O.js";import{S as u}from"./story-utils-Cm66S9I4.js";import"./image-window-loader-prVli90G.js";import"./throttle-PntyJ3Ns.js";import"./marked.esm-CoTRTVTr.js";import"./flatten-Ca01_yWf.js";import"./scrolling-data-grid-Cjs0rkEv.js";import"./index-D_kXk1yT.js";import"./index.esm-jDbcwnIw.js";import"./index-CsAd43Aa.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(m,{title:"Editable Grid",description:e.createElement(d,null,"Data grid supports overlay editors for changing values. There are bespoke editors for numbers, strings, images, booleans, markdown, and uri.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:s,setCellValue:n}=p(6,!1);return e.createElement(i,{...c,getCellContent:s,columns:r,rows:20,onCellEdited:n})};var o,a,l;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(6, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={20} onCellEdited={setCellValue} />;
}`,...(l=(a=t.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const v=["SmallEditableGrid"];export{t as SmallEditableGrid,v as __namedExportsOrder,_ as default};
