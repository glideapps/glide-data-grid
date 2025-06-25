import{R as e}from"./iframe-D7FHW40z.js";import{D as n}from"./data-editor-all-C4aIH9_k.js";import{B as i,D as m,u as p,d as c}from"./utils-CeUnu-5F.js";import{S as u}from"./story-utils-D9-AhIIx.js";import"./image-window-loader-CfjEfam9.js";import"./throttle-BuZcW-Cs.js";import"./marked.esm-CvBPnlRB.js";import"./flatten-BqZvmjtX.js";import"./scrolling-data-grid-DZP9PJTz.js";import"./index-D_kXk1yT.js";import"./index.esm-B2SDAOL2.js";import"./index-AksxiiM8.js";const S={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(i,{title:"Ten Million Cells",description:e.createElement(m,null,"Data grid supports over 10 million cells. Go nuts with it.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:a}=p(100);return e.createElement(n,{...c,rowMarkers:"number",getCellContent:a,columns:r,rows:1e5})};var o,l,s;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContent} columns={cols} rows={100_000} />;
}`,...(s=(l=t.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};const b=["TenMillionCells"];export{t as TenMillionCells,b as __namedExportsOrder,S as default};
