import{R as e}from"./iframe-BBBy_AkU.js";import{D as n}from"./data-editor-all-BxWmfAOW.js";import{B as c,D as m,P as i,u as p,d as f}from"./utils-B80uFzAe.js";import{S as u}from"./story-utils-BhsGCgNU.js";import"./lodash-CAutItRE.js";import"./image-window-loader-Cx6vAMGX.js";import"./throttle-ClFDa5jN.js";import"./marked.esm-CGVwgHtb.js";import"./flatten-B_CFh3vs.js";import"./scrolling-data-grid-D4MgCw1b.js";import"./index-D_kXk1yT.js";import"./index.esm-CZMHO-l4.js";import"./index-b6Pw4WN-.js";const B={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(u,null,e.createElement(c,{title:"Scroll Offset",description:e.createElement(m,null,"The ",e.createElement(i,null,"rowGrouping")," prop can be used to group and even fold rows.")},e.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:l}=p(100);return e.createElement(n,{...f,height:"100%",rowMarkers:"both",scrollOffsetY:400,getCellContent:l,columns:t,rows:1e3})};var o,s,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  const rows = 1000;
  return <DataEditor {...defaultProps} height="100%" rowMarkers="both" scrollOffsetY={400} getCellContent={getCellContent} columns={cols}
  // verticalBorder={false}
  rows={rows} />;
}`,...(a=(s=r.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const _=["ScrollOffset"];export{r as ScrollOffset,_ as __namedExportsOrder,B as default};
