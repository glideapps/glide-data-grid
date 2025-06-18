import{R as e}from"./iframe-DCmqBHsd.js";import{D as i}from"./data-editor-all-CNoPZX2I.js";import{B as m,D as c,u as p,d}from"./utils-lFZWkupu.js";import{S as u}from"./story-utils-CbH2gJX6.js";import"./image-window-loader-ZcixKqIc.js";import"./throttle-D_XvKYTL.js";import"./marked.esm-Dw9qRKvL.js";import"./flatten-B7VXlg9S.js";import"./scrolling-data-grid-muDDf5NC.js";import"./index-D_kXk1yT.js";import"./index.esm-DIES499Q.js";import"./index-CVAp31et.js";const M={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(u,null,e.createElement(m,{title:"Scaled view",description:e.createElement(c,null,"The data editor supports being scaled."),scale:"0.5"},e.createElement(o,null)))]},t=()=>{const{cols:o,getCellContent:n,onColumnResize:l}=p(60);return e.createElement(i,{...d,getCellContent:n,columns:o,rowMarkers:"both",rows:500,onColumnResize:l})};var r,a,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(60);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers="both" rows={500} onColumnResize={onColumnResize} />;
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const b=["ScaledView"];export{t as ScaledView,b as __namedExportsOrder,M as default};
