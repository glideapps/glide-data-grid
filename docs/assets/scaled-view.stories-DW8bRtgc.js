import{R as e}from"./iframe-C9FNI4m0.js";import{D as i}from"./data-editor-all-CHbkwdka.js";import{B as m,D as c,u as p,d}from"./utils-CqcLcTat.js";import{S as u}from"./story-utils-D7boojzF.js";import"./image-window-loader-DYJfv2GP.js";import"./throttle-Ba3AGMok.js";import"./marked.esm-DDeLBihO.js";import"./flatten-B4LMMRSZ.js";import"./scrolling-data-grid-CGfYI2PI.js";import"./index-D_kXk1yT.js";import"./index.esm-BvVvgvCB.js";import"./index-kACBoQx9.js";const M={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(u,null,e.createElement(m,{title:"Scaled view",description:e.createElement(c,null,"The data editor supports being scaled."),scale:"0.5"},e.createElement(o,null)))]},t=()=>{const{cols:o,getCellContent:n,onColumnResize:l}=p(60);return e.createElement(i,{...d,getCellContent:n,columns:o,rowMarkers:"both",rows:500,onColumnResize:l})};var r,a,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(60);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers="both" rows={500} onColumnResize={onColumnResize} />;
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const b=["ScaledView"];export{t as ScaledView,b as __namedExportsOrder,M as default};
