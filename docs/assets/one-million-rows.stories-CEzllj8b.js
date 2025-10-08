import{R as e}from"./iframe-BD0eKhF8.js";import{D as l}from"./data-editor-all-D02BNocp.js";import{B as i,D as m,u as p,d as c}from"./utils-rSYmcjfd.js";import{S as u}from"./story-utils-DgK64KSU.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-Bm1DKFJt.js";import"./throttle-D-ql-BMU.js";import"./marked.esm-BUdFeI_T.js";import"./flatten-DNC6PUAS.js";import"./scrolling-data-grid-BXHgCJL9.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const O={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(u,null,e.createElement(i,{title:"One Million Rows",description:e.createElement(m,null,"Data grid supports over 1 million rows. Your limit is mostly RAM.")},e.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:n}=p(6);return e.createElement(l,{...c,getCellContent:n,columns:t,rowHeight:31,rows:1e6,rowMarkers:"number"})};var o,s,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowHeight={31} rows={1_000_000} rowMarkers="number" />;
}`,...(a=(s=r.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const h=["OneMillionRows"];export{r as OneMillionRows,h as __namedExportsOrder,O as default};
