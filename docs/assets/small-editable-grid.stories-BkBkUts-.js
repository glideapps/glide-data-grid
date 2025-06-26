import{R as e}from"./iframe-BkJplrCJ.js";import{D as i}from"./data-editor-all-CHti_Z3R.js";import{B as m,D as d,u as p,d as c}from"./utils-CLY805-a.js";import{S as u}from"./story-utils-Dbktg-JT.js";import"./image-window-loader-BuGJtyvD.js";import"./throttle-Yz_SvrLW.js";import"./marked.esm-BiocIhzN.js";import"./flatten-BH6MXGjY.js";import"./scrolling-data-grid-mqeGi0hk.js";import"./index-D_kXk1yT.js";import"./index.esm-CZ1r46WD.js";import"./index-BFxesp4f.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(m,{title:"Editable Grid",description:e.createElement(d,null,"Data grid supports overlay editors for changing values. There are bespoke editors for numbers, strings, images, booleans, markdown, and uri.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:s,setCellValue:n}=p(6,!1);return e.createElement(i,{...c,getCellContent:s,columns:r,rows:20,onCellEdited:n})};var o,a,l;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(6, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={20} onCellEdited={setCellValue} />;
}`,...(l=(a=t.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const v=["SmallEditableGrid"];export{t as SmallEditableGrid,v as __namedExportsOrder,_ as default};
