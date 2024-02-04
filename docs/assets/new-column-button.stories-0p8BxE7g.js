import{j as t,a as i}from"./marked.esm-dbrxtycE.js";import{R as c}from"./index-BMVQvedj.js";import{D as u}from"./data-editor-all-URz7QgpY.js";import{B as d,D as p,P as C,u as f,d as h,C as w}from"./utils-fHh7-QTb.js";import{S as g}from"./story-utils-K2EZnGjM.js";import"./iframe-8T_ww7sJ.js";import"../sb-preview/runtime.js";import"./image-window-loader--0ktsihR.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-F9iLdN7s.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const y={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>t(g,{children:t(d,{title:"New column button",description:i(p,{children:["A new column button can be created using the ",t(C,{children:"rightElement"}),"."]}),children:t(o,{})})})]},e=()=>{const{cols:o,getCellContent:a}=f(10,!0),l=c.useMemo(()=>o.map(m=>({...m,grow:1})),[o]);return t(u,{...h,getCellContent:a,columns:l,rightElement:t(w,{children:t("button",{onClick:()=>window.alert("Add a column!"),children:"+"})}),rightElementProps:{fill:!1,sticky:!1},rows:3e3,rowMarkers:"both"})};var r,n,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(10, true);
  const columns = React.useMemo(() => cols.map(c => ({
    ...c,
    grow: 1
  })), [cols]);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={columns} rightElement={<ColumnAddButton>
                    <button onClick={() => window.alert("Add a column!")}>+</button>
                </ColumnAddButton>} rightElementProps={{
    fill: false,
    sticky: false
  }} rows={3000} rowMarkers="both" />;
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const W=["NewColumnButton"];export{e as NewColumnButton,W as __namedExportsOrder,y as default};
