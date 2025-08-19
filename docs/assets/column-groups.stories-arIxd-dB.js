import{R as e}from"./iframe-DuKzhFAV.js";import{D as i}from"./data-editor-all-h01LK8X1.js";import{B as p,D as u,P as d,u as c,d as g}from"./utils-CXj6_Jia.js";import{a as C}from"./image-window-loader-D4WXs3fS.js";import{S as G}from"./story-utils-BbqVCsEB.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-C9zA5J5l.js";import"./flatten-mmeTaiPx.js";import"./scrolling-data-grid-BBESFY1a.js";import"./marked.esm-B1hMdrV8.js";import"./index-D_kXk1yT.js";import"./index.esm-CRvNmNkt.js";import"./index-Cfg5Tl68.js";const $={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(G,null,e.createElement(p,{title:"Column Grouping",description:e.createElement(u,null,"Columns in the data grid may be grouped by setting their ",e.createElement(d,null,"group")," ","property.")},e.createElement(t,null)))]},o=()=>{const{cols:t,getCellContent:l}=c(20,!0,!0);return e.createElement(i,{...g,getCellContent:l,onGroupHeaderRenamed:(r,m)=>window.alert(`Please rename group ${r} to ${m}`),columns:t,rows:1e3,getGroupDetails:r=>({name:r,icon:r===""?void 0:C.HeaderCode}),rowMarkers:"both"})};var a,n,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(20, true, true);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} onGroupHeaderRenamed={(x, y) => window.alert(\`Please rename group \${x} to \${y}\`)} columns={cols} rows={1000} getGroupDetails={g => ({
    name: g,
    icon: g === "" ? undefined : GridColumnIcon.HeaderCode
  })} rowMarkers="both" />;
}`,...(s=(n=o.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const S=["ColumnGroups"];export{o as ColumnGroups,S as __namedExportsOrder,$ as default};
