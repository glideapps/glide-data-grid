import{R as t}from"./iframe-Cq2XwzQG.js";import{D as m}from"./data-editor-all-D1hvqgCa.js";import{B as c,D as g,P as a,u,d as h}from"./utils-DXyvUh4P.js";import{S as E}from"./story-utils-DDO4w2I3.js";import"./image-window-loader-Dki_Eadk.js";import"./throttle-BMnevX76.js";import"./marked.esm-B228vmBx.js";import"./flatten-DU0DyfAv.js";import"./scrolling-data-grid-BxxzxFU_.js";import"./index-D_kXk1yT.js";import"./index.esm-DzhhbikV.js";import"./index-BvhnotYc.js";const b={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>t.createElement(E,null,t.createElement(c,{title:"Padding",description:t.createElement(t.Fragment,null,t.createElement(g,null,"You can add padding at the ends of the grid by setting the"," ",t.createElement(a,null,"paddingRight")," and ",t.createElement(a,null,"paddingBottom")," props"))},t.createElement(r,null)))]},e=r=>{const{paddingRight:d,paddingBottom:p}=r,{cols:s,getCellContent:l}=u(20);return t.createElement(m,{...h,getCellContent:l,columns:s,rowMarkers:"both",experimental:{paddingRight:d,paddingBottom:p},rows:50})};e.argTypes={paddingRight:{control:{type:"range",min:0,max:600}},paddingBottom:{control:{type:"range",min:0,max:600}}};e.args={paddingRight:200,paddingBottom:200};var n,o,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`p => {
  const {
    paddingRight,
    paddingBottom
  } = p;
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(20);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers={"both"} experimental={{
    paddingRight,
    paddingBottom
  }} rows={50} />;
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};const S=["Padding"];export{e as Padding,S as __namedExportsOrder,b as default};
