import{R as e}from"./iframe-BoOn4LYH.js";import{D as m}from"./data-editor-all-CD5asUdq.js";import{B as c,D as u,M as i,u as p,d}from"./utils-DCZm_Szc.js";import{S as C}from"./story-utils-DREv_L_H.js";import"./image-window-loader-BPw4el3K.js";import"./throttle-iyk7jJUC.js";import"./marked.esm-3FIuRmsv.js";import"./flatten-CkDMYA6f.js";import"./scrolling-data-grid-CgfvknEg.js";import"./index-D_kXk1yT.js";import"./index.esm-yBRnM_XV.js";import"./index-HHzigBTA.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(C,null,e.createElement(c,{title:"Add and remove columns",description:e.createElement(e.Fragment,null,e.createElement(u,null,"You can add and remove columns at your disposal"),e.createElement(i,null,"Use the story's controls to change the number of columns"))},e.createElement(r,null)))]},t=r=>{const{cols:s,getCellContent:l}=p(r.columnsCount);return e.createElement(m,{...d,rowMarkers:"number",getCellContent:l,experimental:{strict:!0},columns:s,rows:1e4})};t.args={columnsCount:10};t.argTypes={columnsCount:{control:{type:"range",min:2,max:200}}};var o,n,a;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(p.columnsCount);
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContent} experimental={{
    strict: true
  }} columns={cols} rows={10_000} />;
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const b=["AddColumns"];export{t as AddColumns,b as __namedExportsOrder,_ as default};
