import{R as e}from"./iframe-BZv_-3oC.js";import{D as i}from"./data-editor-all-DHZhRUj8.js";import{B as c,D as m,P as d,u as p,d as u}from"./utils-Da6JC8lc.js";import{S as b}from"./story-utils-DyPFJ-Gb.js";import"./image-window-loader-BOKErPH_.js";import"./throttle-B38uoKju.js";import"./marked.esm-DFf-CCl8.js";import"./flatten-DvEpS0mN.js";import"./scrolling-data-grid-Cgtw8mio.js";import"./index-D_kXk1yT.js";import"./index.esm-C8aluT1_.js";import"./index-DTOmIdR0.js";const S={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(b,null,e.createElement(c,{title:"Row markers",description:e.createElement(e.Fragment,null,e.createElement(m,null,"Row Markers can be controlled by setting the ",e.createElement(d,null,"rowMarkers")," prop."))},e.createElement(t,null)))]},r=t=>{const{cols:l,getCellContent:n}=p(10,!1);return e.createElement(i,{...u,getCellContent:n,verticalBorder:!1,rowMarkers:{kind:t.markers,checkboxStyle:"square",headerAlwaysVisible:!0,headerDisabled:t.headerDisabled,headerTheme:{textMedium:"rgba(51, 51, 51, 0.50)"}},columns:l,rows:400})};r.args={markers:"both",headerDisabled:!1};r.argTypes={markers:{control:{type:"select"},options:["both","checkbox","number","none","clickable-number","checkbox-visible"]},headerDisabled:{control:{type:"boolean"}}};var a,o,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(10, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} verticalBorder={false} rowMarkers={{
    kind: p.markers,
    checkboxStyle: "square",
    headerAlwaysVisible: true,
    headerDisabled: p.headerDisabled,
    headerTheme: {
      textMedium: "rgba(51, 51, 51, 0.50)"
    }
  }} columns={cols} rows={400} />;
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const B=["RowMarkers"];export{r as RowMarkers,B as __namedExportsOrder,S as default};
