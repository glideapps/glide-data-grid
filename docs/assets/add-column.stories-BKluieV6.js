import{R as e}from"./iframe-DrAFbx-1.js";import{D as m}from"./data-editor-all-tnYynvwe.js";import{B as c,D as u,M as i,u as p,d}from"./utils-lRxTA1An.js";import{S as C}from"./story-utils-ClA9aQsW.js";import"./image-window-loader-B_8mPMRZ.js";import"./throttle-DevZGRQD.js";import"./marked.esm-BFtelUbM.js";import"./flatten-CD7Jkdwx.js";import"./scrolling-data-grid-DmdraDW9.js";import"./index-D_kXk1yT.js";import"./index.esm-Bs9lJmGf.js";import"./index-Joh_3uW9.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(C,null,e.createElement(c,{title:"Add and remove columns",description:e.createElement(e.Fragment,null,e.createElement(u,null,"You can add and remove columns at your disposal"),e.createElement(i,null,"Use the story's controls to change the number of columns"))},e.createElement(r,null)))]},t=r=>{const{cols:s,getCellContent:l}=p(r.columnsCount);return e.createElement(m,{...d,rowMarkers:"number",getCellContent:l,experimental:{strict:!0},columns:s,rows:1e4})};t.args={columnsCount:10};t.argTypes={columnsCount:{control:{type:"range",min:2,max:200}}};var o,n,a;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(p.columnsCount);
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContent} experimental={{
    strict: true
  }} columns={cols} rows={10_000} />;
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const b=["AddColumns"];export{t as AddColumns,b as __namedExportsOrder,_ as default};
