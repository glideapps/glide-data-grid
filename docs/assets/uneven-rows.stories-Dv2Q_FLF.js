import{R as e}from"./iframe-DlbH6TZd.js";import{D as m}from"./data-editor-all-gNJTBrDe.js";import{B as i,D as c,P as p,u,d}from"./utils-hKXYf6CI.js";import{S as w}from"./story-utils-lBtw0jMk.js";import"./image-window-loader-CatdxkGc.js";import"./throttle-rutI1J7k.js";import"./marked.esm-UD0tUBJq.js";import"./flatten-5e5vWIDz.js";import"./scrolling-data-grid-fRwl0nLm.js";import"./index-D_kXk1yT.js";import"./index.esm-NCgT2Goi.js";import"./index-Dwdk5Co-.js";const H={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(w,null,e.createElement(i,{title:"Uneven Rows",description:e.createElement(c,null,"Rows can be made uneven by passing a callback to the ",e.createElement(p,null,"rowHeight")," prop")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:l}=u(6);return e.createElement(m,{...d,rowHeight:o=>o%3===0?30:o%2?50:60,getCellContent:l,columns:r,rows:1e3})};var a,n,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  return <DataEditor {...defaultProps} rowHeight={r => r % 3 === 0 ? 30 : r % 2 ? 50 : 60} getCellContent={getCellContent} columns={cols} rows={1000} />;
}`,...(s=(n=t.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const S=["UnevenRows"];export{t as UnevenRows,S as __namedExportsOrder,H as default};
