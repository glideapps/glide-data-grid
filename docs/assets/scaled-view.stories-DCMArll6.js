import{R as e}from"./iframe-Cq2XwzQG.js";import{D as i}from"./data-editor-all-D1hvqgCa.js";import{B as m,D as c,u as p,d}from"./utils-DXyvUh4P.js";import{S as u}from"./story-utils-DDO4w2I3.js";import"./image-window-loader-Dki_Eadk.js";import"./throttle-BMnevX76.js";import"./marked.esm-B228vmBx.js";import"./flatten-DU0DyfAv.js";import"./scrolling-data-grid-BxxzxFU_.js";import"./index-D_kXk1yT.js";import"./index.esm-DzhhbikV.js";import"./index-BvhnotYc.js";const M={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(u,null,e.createElement(m,{title:"Scaled view",description:e.createElement(c,null,"The data editor supports being scaled."),scale:"0.5"},e.createElement(o,null)))]},t=()=>{const{cols:o,getCellContent:n,onColumnResize:l}=p(60);return e.createElement(i,{...d,getCellContent:n,columns:o,rowMarkers:"both",rows:500,onColumnResize:l})};var r,a,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(60);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers="both" rows={500} onColumnResize={onColumnResize} />;
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const b=["ScaledView"];export{t as ScaledView,b as __namedExportsOrder,M as default};
