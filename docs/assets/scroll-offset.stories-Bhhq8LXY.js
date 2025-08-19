import{R as e}from"./iframe-DuKzhFAV.js";import{D as n}from"./data-editor-all-h01LK8X1.js";import{B as c,D as m,P as i,u as p,d as f}from"./utils-CXj6_Jia.js";import{S as u}from"./story-utils-BbqVCsEB.js";import"./lodash-BRTPxm83.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-D4WXs3fS.js";import"./throttle-C9zA5J5l.js";import"./marked.esm-B1hMdrV8.js";import"./flatten-mmeTaiPx.js";import"./scrolling-data-grid-BBESFY1a.js";import"./index-D_kXk1yT.js";import"./index.esm-CRvNmNkt.js";import"./index-Cfg5Tl68.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(u,null,e.createElement(c,{title:"Scroll Offset",description:e.createElement(m,null,"The ",e.createElement(i,null,"rowGrouping")," prop can be used to group and even fold rows.")},e.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:l}=p(100);return e.createElement(n,{...f,height:"100%",rowMarkers:"both",scrollOffsetY:400,getCellContent:l,columns:t,rows:1e3})};var o,s,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  const rows = 1000;
  return <DataEditor {...defaultProps} height="100%" rowMarkers="both" scrollOffsetY={400} getCellContent={getCellContent} columns={cols}
  // verticalBorder={false}
  rows={rows} />;
}`,...(a=(s=r.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const v=["ScrollOffset"];export{r as ScrollOffset,v as __namedExportsOrder,_ as default};
