import{j as t,a as p}from"./marked.esm-dbrxtycE.js";import{R as C}from"./index-BMVQvedj.js";import{D as d}from"./data-editor-all-BRJ4jo8P.js";import{B as g,D as u,P as o,a as f,d as A}from"./utils-Pc9bIpez.js";import{S as h}from"./story-utils-K2EZnGjM.js";import"./iframe-bMSjurlU.js";import"../sb-preview/runtime.js";import"./image-window-loader-kcFVuRwy.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-QSoV3kaN.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const W={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>t(h,{children:t(g,{title:"Content Alignment",description:p(u,{children:["You can customize the content alignment by setting ",t(o,{children:"contentAlign"})," of a cell to ",t(o,{children:"left"}),", ",t(o,{children:"right"})," or ",t(o,{children:"center"}),"."]}),children:t(l,{})})})]},r=()=>{const{cols:l,getCellContent:n}=f(),m=C.useCallback(e=>{const[i,D]=e;return i===3?{...n(e),contentAlign:"center"}:i===4?{...n(e),contentAlign:"right"}:i===5?{...n(e),contentAlign:"left"}:n(e)},[n]);return t(d,{...A,getCellContent:m,columns:l,rows:300})};var c,s,a;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useAllMockedKinds();
  const mangledGetCellContent = React.useCallback<typeof getCellContent>(cell => {
    const [col, _row] = cell;
    if (col === 3) {
      return {
        ...getCellContent(cell),
        contentAlign: "center"
      };
    }
    if (col === 4) {
      return {
        ...getCellContent(cell),
        contentAlign: "right"
      };
    }
    if (col === 5) {
      return {
        ...getCellContent(cell),
        contentAlign: "left"
      };
    }
    return getCellContent(cell);
  }, [getCellContent]);
  return <DataEditor {...defaultProps} getCellContent={mangledGetCellContent} columns={cols} rows={300} />;
}`,...(a=(s=r.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const z=["ContentAlignment"];export{r as ContentAlignment,z as __namedExportsOrder,W as default};
