import{R as e}from"./iframe-DuKzhFAV.js";import{D as i}from"./data-editor-all-h01LK8X1.js";import{B as m,D as c,u as p,d}from"./utils-CXj6_Jia.js";import{S as u}from"./story-utils-BbqVCsEB.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-D4WXs3fS.js";import"./throttle-C9zA5J5l.js";import"./marked.esm-B1hMdrV8.js";import"./flatten-mmeTaiPx.js";import"./scrolling-data-grid-BBESFY1a.js";import"./index-D_kXk1yT.js";import"./index.esm-CRvNmNkt.js";import"./index-Cfg5Tl68.js";const b={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(u,null,e.createElement(m,{title:"Scaled view",description:e.createElement(c,null,"The data editor supports being scaled."),scale:"0.5"},e.createElement(o,null)))]},t=()=>{const{cols:o,getCellContent:n,onColumnResize:l}=p(60);return e.createElement(i,{...d,getCellContent:n,columns:o,rowMarkers:"both",rows:500,onColumnResize:l})};var r,a,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(60);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers="both" rows={500} onColumnResize={onColumnResize} />;
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const V=["ScaledView"];export{t as ScaledView,V as __namedExportsOrder,b as default};
