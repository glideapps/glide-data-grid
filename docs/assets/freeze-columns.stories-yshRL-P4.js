import{R as e}from"./iframe-B_Q06Dca.js";import{D as m}from"./data-editor-all-ClUqzqIV.js";import{B as i,D as u,P as c,u as p,d as f}from"./utils-CCjQfXGC.js";import{S as C}from"./story-utils-DDLeMfpA.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-D7sQ27jY.js";import"./throttle-Co5oNmeu.js";import"./marked.esm-CcrTC-0Z.js";import"./flatten-DXL8hG6G.js";import"./scrolling-data-grid-DvEd2NXF.js";import"./index-D_kXk1yT.js";import"./index.esm-mFikWORe.js";import"./index-CZXiV8zI.js";const P={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(C,null,e.createElement(i,{title:"Freeze columns",description:e.createElement(u,null,"Columns at the start of your grid can be frozen in place by settings"," ",e.createElement(c,null,"freezeColumns")," to a number greater than 0.")},e.createElement(t,null)))]},r=t=>{const{cols:s,getCellContent:l}=p(100);return e.createElement(m,{...f,rowMarkers:"both",freezeColumns:t.freezeColumns,getCellContent:l,columns:s,verticalBorder:!1,rows:1e3})};r.argTypes={freezeColumns:{control:{type:"range",min:0,max:10}}};r.args={freezeColumns:1};var o,a,n;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`(p: {
  freezeColumns: number;
}) => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  return <DataEditor {...defaultProps} rowMarkers="both" freezeColumns={p.freezeColumns} getCellContent={getCellContent} columns={cols} verticalBorder={false} rows={1000} />;
}`,...(n=(a=r.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const x=["FreezeColumns"];export{r as FreezeColumns,x as __namedExportsOrder,P as default};
