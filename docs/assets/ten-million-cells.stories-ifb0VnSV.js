import{j as r}from"./marked.esm-dbrxtycE.js";import"./index-BMVQvedj.js";import{D as n}from"./data-editor-all-BToYTlHW.js";import{B as a,D as m,u as p,d as c}from"./utils-4YxR0oem.js";import{S as d}from"./story-utils-K2EZnGjM.js";import"./iframe-lW6lBOu1.js";import"../sb-preview/runtime.js";import"./image-window-loader-bkTluTgi.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-iY4OluwF.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const b={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>r(d,{children:r(a,{title:"Ten Million Cells",description:r(m,{children:"Data grid supports over 10 million cells. Go nuts with it."}),children:r(o,{})})})]},e=()=>{const{cols:o,getCellContent:l}=p(100);return r(n,{...c,rowMarkers:"number",getCellContent:l,columns:o,rows:1e5})};var t,s,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContent} columns={cols} rows={100_000} />;
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const j=["TenMillionCells"];export{e as TenMillionCells,j as __namedExportsOrder,b as default};
