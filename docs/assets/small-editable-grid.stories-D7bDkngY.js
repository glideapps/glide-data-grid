import{R as e}from"./iframe-BD0eKhF8.js";import{D as i}from"./data-editor-all-D02BNocp.js";import{B as m,D as d,u as p,d as c}from"./utils-rSYmcjfd.js";import{S as u}from"./story-utils-DgK64KSU.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-Bm1DKFJt.js";import"./throttle-D-ql-BMU.js";import"./marked.esm-BUdFeI_T.js";import"./flatten-DNC6PUAS.js";import"./scrolling-data-grid-BXHgCJL9.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(m,{title:"Editable Grid",description:e.createElement(d,null,"Data grid supports overlay editors for changing values. There are bespoke editors for numbers, strings, images, booleans, markdown, and uri.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:s,setCellValue:n}=p(6,!1);return e.createElement(i,{...c,getCellContent:s,columns:r,rows:20,onCellEdited:n})};var o,a,l;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(6, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={20} onCellEdited={setCellValue} />;
}`,...(l=(a=t.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const v=["SmallEditableGrid"];export{t as SmallEditableGrid,v as __namedExportsOrder,_ as default};
