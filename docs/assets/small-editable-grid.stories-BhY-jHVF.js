import{R as e}from"./iframe-DZSq2JGj.js";import{D as i}from"./data-editor-all-u-hICfLE.js";import{B as m,D as d,u as p,d as c}from"./utils-61VB0CtO.js";import{S as u}from"./story-utils-COSp9RSv.js";import"./image-window-loader-YKrs8S9Y.js";import"./throttle-BcmITwxY.js";import"./marked.esm-CZzuroS4.js";import"./flatten-FVnj_Y6s.js";import"./scrolling-data-grid-BPikos3D.js";import"./index-D_kXk1yT.js";import"./index.esm-CrTdcu7p.js";import"./index-CJ3Q-leR.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(m,{title:"Editable Grid",description:e.createElement(d,null,"Data grid supports overlay editors for changing values. There are bespoke editors for numbers, strings, images, booleans, markdown, and uri.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:s,setCellValue:n}=p(6,!1);return e.createElement(i,{...c,getCellContent:s,columns:r,rows:20,onCellEdited:n})};var o,a,l;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(6, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={20} onCellEdited={setCellValue} />;
}`,...(l=(a=t.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const v=["SmallEditableGrid"];export{t as SmallEditableGrid,v as __namedExportsOrder,_ as default};
