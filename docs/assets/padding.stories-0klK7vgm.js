import{j as t,F as g,a as l}from"./marked.esm-dbrxtycE.js";import"./index-BMVQvedj.js";import{D as c}from"./data-editor-all-x3Z0J_KE.js";import{B as h,D as u,P as e,u as D,d as f}from"./utils-TaWgF9d_.js";import{S as x}from"./story-utils-K2EZnGjM.js";import"./iframe-WiXKo5C8.js";import"../sb-preview/runtime.js";import"./image-window-loader-OdeDDfWK.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-mah7XTYW.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const T={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>t(x,{children:t(h,{title:"Padding",description:t(g,{children:l(u,{children:["You can add padding at the ends of the grid by setting the"," ",t(e,{children:"paddingRight"})," and ",t(e,{children:"paddingBottom"})," props"]})}),children:t(r,{})})})]},o=r=>{const{paddingRight:d,paddingBottom:s}=r,{cols:p,getCellContent:m}=D(20);return t(c,{...f,getCellContent:m,columns:p,rowMarkers:"both",experimental:{paddingRight:d,paddingBottom:s},rows:50})};o.argTypes={paddingRight:{control:{type:"range",min:0,max:600}},paddingBottom:{control:{type:"range",min:0,max:600}}};o.args={paddingRight:200,paddingBottom:200};var a,n,i;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`p => {
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
}`,...(i=(n=o.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const W=["Padding"];export{o as Padding,W as __namedExportsOrder,T as default};
