import{R as e}from"./iframe-BmPJEOAI.js";import{D as m}from"./data-editor-all-CkasmjLB.js";import{B as c,D as u,M as i,u as p,d}from"./utils-B8EIRpIH.js";import{S as C}from"./story-utils-DRDGawh1.js";import"./image-window-loader-BhwKIxz1.js";import"./throttle-DPz_bSRV.js";import"./marked.esm-_Pd0Q7ck.js";import"./flatten-RB_zxSPc.js";import"./scrolling-data-grid-CrcjkWh9.js";import"./index-D_kXk1yT.js";import"./index.esm-CArkWwLl.js";import"./index-8La_XXm5.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(C,null,e.createElement(c,{title:"Add and remove columns",description:e.createElement(e.Fragment,null,e.createElement(u,null,"You can add and remove columns at your disposal"),e.createElement(i,null,"Use the story's controls to change the number of columns"))},e.createElement(r,null)))]},t=r=>{const{cols:s,getCellContent:l}=p(r.columnsCount);return e.createElement(m,{...d,rowMarkers:"number",getCellContent:l,experimental:{strict:!0},columns:s,rows:1e4})};t.args={columnsCount:10};t.argTypes={columnsCount:{control:{type:"range",min:2,max:200}}};var o,n,a;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(p.columnsCount);
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContent} experimental={{
    strict: true
  }} columns={cols} rows={10_000} />;
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const b=["AddColumns"];export{t as AddColumns,b as __namedExportsOrder,_ as default};
