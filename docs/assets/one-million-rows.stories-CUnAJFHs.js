import{R as e}from"./iframe-Dd6OpQOh.js";import{D as l}from"./data-editor-all-DnL8PgHF.js";import{B as i,D as m,u as p,d as c}from"./utils-BTHbXs7V.js";import{S as u}from"./story-utils-CZmETFWx.js";import"./image-window-loader-4ZW-M2LR.js";import"./throttle-BmLG7BA2.js";import"./marked.esm-BfKkQEKz.js";import"./flatten-BeCGFNPF.js";import"./scrolling-data-grid-DoiCMXuh.js";import"./index-D_kXk1yT.js";import"./index.esm-B-UqG69q.js";import"./index-0xPpBsfT.js";const O={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(u,null,e.createElement(i,{title:"One Million Rows",description:e.createElement(m,null,"Data grid supports over 1 million rows. Your limit is mostly RAM.")},e.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:n}=p(6);return e.createElement(l,{...c,getCellContent:n,columns:t,rowHeight:31,rows:1e6,rowMarkers:"number"})};var o,s,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowHeight={31} rows={1_000_000} rowMarkers="number" />;
}`,...(a=(s=r.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const h=["OneMillionRows"];export{r as OneMillionRows,h as __namedExportsOrder,O as default};
