import{R as e}from"./iframe-XBvcsPD6.js";import{D as m}from"./data-editor-all-BGfUQYKw.js";import{B as i,D as c,P as p,u,d}from"./utils-DAlT1Y1o.js";import{S as w}from"./story-utils-BkocOLSk.js";import"./image-window-loader-Cbk2gfyy.js";import"./throttle-CAt_9VN2.js";import"./marked.esm-BUODAhYF.js";import"./flatten-3f2opxF0.js";import"./scrolling-data-grid-wQOsHh0Z.js";import"./index-D_kXk1yT.js";import"./index.esm-BbVfSYX4.js";import"./index-3IhBa9oQ.js";const H={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(w,null,e.createElement(i,{title:"Uneven Rows",description:e.createElement(c,null,"Rows can be made uneven by passing a callback to the ",e.createElement(p,null,"rowHeight")," prop")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:l}=u(6);return e.createElement(m,{...d,rowHeight:o=>o%3===0?30:o%2?50:60,getCellContent:l,columns:r,rows:1e3})};var a,n,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  return <DataEditor {...defaultProps} rowHeight={r => r % 3 === 0 ? 30 : r % 2 ? 50 : 60} getCellContent={getCellContent} columns={cols} rows={1000} />;
}`,...(s=(n=t.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const S=["UnevenRows"];export{t as UnevenRows,S as __namedExportsOrder,H as default};
