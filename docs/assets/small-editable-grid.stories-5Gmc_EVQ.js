import{R as e}from"./iframe-Ct4YGx9l.js";import{D as i}from"./data-editor-all-Cxe8jGyh.js";import{B as m,D as d,u as p,d as c}from"./utils-DFGMVL-Y.js";import{S as u}from"./story-utils-elPKrpV5.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-CoTKZDWm.js";import"./throttle-DbZwvn6g.js";import"./marked.esm-D3YJm0Ly.js";import"./flatten-BLEtJkWA.js";import"./scrolling-data-grid-Byyqpnb1.js";import"./index-D_kXk1yT.js";import"./index.esm-C_38YiKS.js";import"./index-9bE69qXv.js";const v={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(m,{title:"Editable Grid",description:e.createElement(d,null,"Data grid supports overlay editors for changing values. There are bespoke editors for numbers, strings, images, booleans, markdown, and uri.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:s,setCellValue:n}=p(6,!1);return e.createElement(i,{...c,getCellContent:s,columns:r,rows:20,onCellEdited:n})};var o,a,l;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(6, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={20} onCellEdited={setCellValue} />;
}`,...(l=(a=t.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const x=["SmallEditableGrid"];export{t as SmallEditableGrid,x as __namedExportsOrder,v as default};
