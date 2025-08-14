import{R as e}from"./iframe-Iifyoimw.js";import{D as i}from"./data-editor-all-CYJZRdiL.js";import{B as m,D as c,u as p,d}from"./utils-DCrqnqmL.js";import{S as u}from"./story-utils-DST3U7UA.js";import"./image-window-loader-BDCXALa9.js";import"./throttle-BVHd-xO2.js";import"./marked.esm-B4q_PBrm.js";import"./flatten-Dm8ntmsO.js";import"./scrolling-data-grid-CX8tx08F.js";import"./index-D_kXk1yT.js";import"./index.esm-pZ0ZBnMd.js";import"./index-qADYP8W1.js";const M={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(u,null,e.createElement(m,{title:"Scaled view",description:e.createElement(c,null,"The data editor supports being scaled."),scale:"0.5"},e.createElement(o,null)))]},t=()=>{const{cols:o,getCellContent:n,onColumnResize:l}=p(60);return e.createElement(i,{...d,getCellContent:n,columns:o,rowMarkers:"both",rows:500,onColumnResize:l})};var r,a,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(60);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers="both" rows={500} onColumnResize={onColumnResize} />;
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const b=["ScaledView"];export{t as ScaledView,b as __namedExportsOrder,M as default};
