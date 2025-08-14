import{R as e}from"./iframe-Iifyoimw.js";import{D as m}from"./data-editor-all-CYJZRdiL.js";import{B as c,D as u,M as i,u as p,d}from"./utils-DCrqnqmL.js";import{S as C}from"./story-utils-DST3U7UA.js";import"./image-window-loader-BDCXALa9.js";import"./throttle-BVHd-xO2.js";import"./marked.esm-B4q_PBrm.js";import"./flatten-Dm8ntmsO.js";import"./scrolling-data-grid-CX8tx08F.js";import"./index-D_kXk1yT.js";import"./index.esm-pZ0ZBnMd.js";import"./index-qADYP8W1.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(C,null,e.createElement(c,{title:"Add and remove columns",description:e.createElement(e.Fragment,null,e.createElement(u,null,"You can add and remove columns at your disposal"),e.createElement(i,null,"Use the story's controls to change the number of columns"))},e.createElement(r,null)))]},t=r=>{const{cols:s,getCellContent:l}=p(r.columnsCount);return e.createElement(m,{...d,rowMarkers:"number",getCellContent:l,experimental:{strict:!0},columns:s,rows:1e4})};t.args={columnsCount:10};t.argTypes={columnsCount:{control:{type:"range",min:2,max:200}}};var o,n,a;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(p.columnsCount);
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContent} experimental={{
    strict: true
  }} columns={cols} rows={10_000} />;
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const b=["AddColumns"];export{t as AddColumns,b as __namedExportsOrder,_ as default};
