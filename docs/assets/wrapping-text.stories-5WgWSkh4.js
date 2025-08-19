import{R as e}from"./iframe-Ct4YGx9l.js";import{D as f}from"./data-editor-all-Cxe8jGyh.js";import{B as d,D as C,P as h,u as x,d as w}from"./utils-DFGMVL-Y.js";import{G as y}from"./image-window-loader-CoTKZDWm.js";import{S as W}from"./story-utils-elPKrpV5.js";import{r as D}from"./throttle-DbZwvn6g.js";import{y as E}from"./index-D_kXk1yT.js";import"./preload-helper-C1FmrZbK.js";import"./flatten-BLEtJkWA.js";import"./scrolling-data-grid-Byyqpnb1.js";import"./marked.esm-D3YJm0Ly.js";import"./index.esm-C_38YiKS.js";import"./index-9bE69qXv.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(W,null,e.createElement(d,{title:"Wrapping Text",description:e.createElement(C,null,"Text cells can have wrapping text by setting the ",e.createElement(h,null,"allowWrapping")," prop to true.")},e.createElement(t,null)))]},n=t=>{const{cols:m,getCellContent:a,onColumnResize:c}=x(6),r=e.useMemo(()=>D(0,100).map(()=>E.lorem.sentence(t.length)),[t.length]),g=e.useCallback(l=>{const[u,o]=l;return u===0?{kind:y.Text,allowOverlay:!0,displayData:`${o},
${r[o%r.length]}`,data:`${o}, 
${r}`,allowWrapping:!0,contentAlign:t.alignment}:a(l)},[a,t.alignment,r]);return e.createElement(f,{...w,rowHeight:80,getCellContent:g,columns:m,rows:1e3,onColumnResize:c,experimental:{hyperWrapping:t.hyperWrapping}})};n.args={alignment:"left",length:20,hyperWrapping:!1};n.argTypes={alignment:{control:{type:"select"},options:["left","center","right"]},length:{control:{type:"range",min:2,max:200}}};var i,p,s;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`p => {
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
}`,...(s=(p=n.parameters)==null?void 0:p.docs)==null?void 0:s.source}}};const B=["WrappingText"];export{n as WrappingText,B as __namedExportsOrder,_ as default};
