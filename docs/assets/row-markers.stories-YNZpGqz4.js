import{R as e}from"./iframe-DP2Cy3oG.js";import{D as m}from"./data-editor-all-nHNSaI91.js";import{B as c,D as i,P as p,u,d}from"./utils-DOe6Dv0J.js";import{S as k}from"./story-utils-Q6JxRjGS.js";import"./image-window-loader-BYBI60yr.js";import"./throttle-xBCR_LDJ.js";import"./marked.esm-DAjvWwlD.js";import"./flatten-DyjghEx7.js";import"./scrolling-data-grid-AUX7pIUX.js";import"./index-D_kXk1yT.js";import"./index.esm-DGfrhf2x.js";import"./index-BkGQT0qr.js";const S={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(k,null,e.createElement(c,{title:"Row markers",description:e.createElement(e.Fragment,null,e.createElement(i,null,"Row Markers can be controlled by setting the ",e.createElement(p,null,"rowMarkers")," prop."))},e.createElement(t,null)))]},r=t=>{const{cols:l,getCellContent:n}=u(10,!1);return e.createElement(m,{...d,getCellContent:n,verticalBorder:!1,rowMarkers:{kind:t.markers,checkboxStyle:"square",headerAlwaysVisible:!0,headerTheme:{textMedium:"rgba(51, 51, 51, 0.50)"}},columns:l,rows:400})};r.args={markers:"both"};r.argTypes={markers:{control:{type:"select"},options:["both","checkbox","number","none","clickable-number","checkbox-visible"]}};var a,o,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(10, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} verticalBorder={false} rowMarkers={{
    kind: p.markers,
    checkboxStyle: "square",
    headerAlwaysVisible: true,
    headerTheme: {
      textMedium: "rgba(51, 51, 51, 0.50)"
    }
  }} columns={cols} rows={400} />;
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const B=["RowMarkers"];export{r as RowMarkers,B as __namedExportsOrder,S as default};
