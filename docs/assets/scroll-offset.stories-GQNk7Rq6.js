import{R as e}from"./iframe-E18WDqGN.js";import{D as c}from"./data-editor-all-UZfoINIX.js";import{B as m,D as i,P as p,u as f,d as u}from"./utils-s889fhwk.js";import{S as d}from"./story-utils-9f-CcBuH.js";import"./lodash-vLCVQIgq.js";import"./image-window-loader-aVHplOsd.js";import"./throttle-OmRZ_GSL.js";import"./marked.esm-EoQsFayW.js";import"./flatten-dSVB22Sh.js";import"./scrolling-data-grid-UgRf7iQf.js";import"./index-PWBWJyi_.js";import"./index.esm-MBE67sSk.js";import"./index-uJxdELD9.js";const B={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(d,null,e.createElement(m,{title:"Scroll Offset",description:e.createElement(i,null,"The ",e.createElement(p,null,"rowGrouping")," prop can be used to group and even fold rows.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:l}=f(100),n=1e3;return e.createElement(c,{...u,height:"100%",rowMarkers:"both",scrollOffsetY:400,getCellContent:l,columns:r,rows:n})};var o,s,a;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  const rows = 1000;
  return <DataEditor {...defaultProps} height="100%" rowMarkers="both" scrollOffsetY={400} getCellContent={getCellContent} columns={cols}
  // verticalBorder={false}
  rows={rows} />;
}`,...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const _=["ScrollOffset"];export{t as ScrollOffset,_ as __namedExportsOrder,B as default};
