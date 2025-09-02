import{R as e}from"./iframe-BR7xuyxq.js";import{D as m}from"./data-editor-all-CYc0zstB.js";import{B as u,D as c,P as i,u as p,d as f}from"./utils-Cimubnom.js";import{S as C}from"./story-utils-CIsdngZT.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-CxzDuQ9s.js";import"./throttle-Ddt7N8Q3.js";import"./marked.esm-GWu2Uyfc.js";import"./flatten-Db_qbC0f.js";import"./scrolling-data-grid-B5dbQ4nv.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const M={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(C,null,e.createElement(u,{title:"Freeze columns",description:e.createElement(c,null,"Columns at the start of your grid can be frozen in place by settings"," ",e.createElement(i,null,"freezeColumns")," to a number greater than 0.")},e.createElement(t,null)))]},r=t=>{const{cols:s,getCellContent:l}=p(100);return e.createElement(m,{...f,rowMarkers:"both",freezeColumns:t.freezeColumns,getCellContent:l,columns:s,verticalBorder:!1,rows:1e3})};r.argTypes={freezeColumns:{control:{type:"range",min:0,max:10}}};r.args={freezeColumns:1};var o,a,n;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`(p: {
  freezeColumns: number;
}) => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  return <DataEditor {...defaultProps} rowMarkers="both" freezeColumns={p.freezeColumns} getCellContent={getCellContent} columns={cols} verticalBorder={false} rows={1000} />;
}`,...(n=(a=r.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const P=["FreezeColumns"];export{r as FreezeColumns,P as __namedExportsOrder,M as default};
