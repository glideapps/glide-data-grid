import{R as e}from"./iframe-DzUnzz49.js";import{D as f}from"./data-editor-all-gksW55uT.js";import{B as d,D as C,P as h,u as x,d as w}from"./utils-BAcdM8lM.js";import{G as y}from"./image-window-loader-BJAy_c_3.js";import{S as W}from"./story-utils-DZBHTHu6.js";import{r as D}from"./throttle-BTju9Vi9.js";import{y as E}from"./index-D_kXk1yT.js";import"./flatten-Bb-cl50g.js";import"./scrolling-data-grid-CLTkCsm_.js";import"./marked.esm-_fi_nHnk.js";import"./index.esm-B4c5nbaJ.js";import"./index-V2KuqDje.js";const S={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(W,null,e.createElement(d,{title:"Wrapping Text",description:e.createElement(C,null,"Text cells can have wrapping text by setting the ",e.createElement(h,null,"allowWrapping")," prop to true.")},e.createElement(t,null)))]},n=t=>{const{cols:m,getCellContent:l,onColumnResize:c}=x(6),r=e.useMemo(()=>D(0,100).map(()=>E.lorem.sentence(t.length)),[t.length]),g=e.useCallback(o=>{const[u,a]=o;return u===0?{kind:y.Text,allowOverlay:!0,displayData:`${a},
${r[a%r.length]}`,data:`${a}, 
${r}`,allowWrapping:!0,contentAlign:t.alignment}:l(o)},[l,t.alignment,r]);return e.createElement(f,{...w,rowHeight:80,getCellContent:g,columns:m,rows:1e3,onColumnResize:c,experimental:{hyperWrapping:t.hyperWrapping}})};n.args={alignment:"left",length:20,hyperWrapping:!1};n.argTypes={alignment:{control:{type:"select"},options:["left","center","right"]},length:{control:{type:"range",min:2,max:200}}};var i,s,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`p => {
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
}`,...(p=(s=n.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};const _=["WrappingText"];export{n as WrappingText,_ as __namedExportsOrder,S as default};
