import{j as n,a as f}from"./marked.esm-dbrxtycE.js";import{R as i}from"./index-BMVQvedj.js";import{D as C}from"./data-editor-all-ZqeXZrI7.js";import{B as h,D as x,P as w,u as y,d as W}from"./utils-Eaa2yR9r.js";import{G as D}from"./image-window-loader-KuvgVtpW.js";import{S as G}from"./story-utils-K2EZnGjM.js";import{r as T}from"./throttle-7EuXLZa7.js";import{y as R}from"./index-PWBWJyi_.js";import"./iframe-CHucUuiQ.js";import"../sb-preview/runtime.js";import"./flatten-qRvRBp6y.js";import"./_baseIteratee-WTHxv43n.js";import"./scrolling-data-grid-Lq0bpFDr.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const K={title:"Glide-Data-Grid/DataEditor Demos",decorators:[e=>n(G,{children:n(h,{title:"Wrapping Text",description:f(x,{children:["Text cells can have wrapping text by setting the ",n(w,{children:"allowWrapping"})," prop to true."]}),children:n(e,{})})})]},t=e=>{const{cols:c,getCellContent:a,onColumnResize:g}=y(6),r=i.useMemo(()=>T(0,100).map(()=>R.lorem.sentence(e.length)),[e.length]),u=i.useCallback(l=>{const[d,o]=l;return d===0?{kind:D.Text,allowOverlay:!0,displayData:`${o},
${r[o%r.length]}`,data:`${o}, 
${r}`,allowWrapping:!0,contentAlign:e.alignment}:a(l)},[a,e.alignment,r]);return n(C,{...W,rowHeight:80,getCellContent:u,columns:c,rows:1e3,onColumnResize:g,experimental:{hyperWrapping:e.hyperWrapping}})};t.args={alignment:"left",length:20,hyperWrapping:!1};t.argTypes={alignment:{control:{type:"select"},options:["left","center","right"]},length:{control:{type:"range",min:2,max:200}}};var s,p,m;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(6);
  const suffix = React.useMemo(() => {
    return range(0, 100).map(() => faker.lorem.sentence(p.length));
  }, [p.length]);
  const mangledGetCellContent = React.useCallback<typeof getCellContent>(i => {
    const [col, row] = i;
    if (col === 0) {
      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: \`\${row},\\n\${suffix[row % suffix.length]}\`,
        data: \`\${row}, \\n\${suffix}\`,
        allowWrapping: true,
        contentAlign: p.alignment
      };
    }
    return getCellContent(i);
  }, [getCellContent, p.alignment, suffix]);
  return <DataEditor {...defaultProps} rowHeight={80} getCellContent={mangledGetCellContent} columns={cols} rows={1000} onColumnResize={onColumnResize} experimental={{
    hyperWrapping: p.hyperWrapping
  }} />;
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const N=["WrappingText"];export{t as WrappingText,N as __namedExportsOrder,K as default};
