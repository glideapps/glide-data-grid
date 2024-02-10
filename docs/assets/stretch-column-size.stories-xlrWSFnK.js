import{j as e,a as C}from"./marked.esm-dbrxtycE.js";import{R as a}from"./index-BMVQvedj.js";import{D as w}from"./data-editor-all-vh5PYcJs.js";import{B as z,D as R,P as S,u as f,d as g}from"./utils-O3xu-yRM.js";import{S as D}from"./story-utils-K2EZnGjM.js";import"./iframe-qD4w8K__.js";import"../sb-preview/runtime.js";import"./image-window-loader-ae1-l40w.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-GIDCmpe8.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const N={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e(D,{children:e(z,{title:"Column Grow",description:C(R,{children:["Columns in the data grid may be set to grow to fill space by setting the"," ",e(S,{children:"grow"})," prop."]}),children:e(o,{})})})]},r=()=>{const{cols:o,getCellContent:l,onColumnResize:u}=f(5,!0,!0),s=a.useRef(new Set),p=a.useMemo(()=>o.map((t,n)=>({...t,grow:s.current.has(n)?void 0:(5+n)/5})),[o]);return e(w,{...g,getCellContent:l,columns:p,rows:1e3,onColumnResize:(t,n,d,h)=>{s.current.add(d),u(t,h)},rowMarkers:"both"})};var i,m,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(5, true, true);
  const hasResized = React.useRef(new Set<number>());
  const columns = React.useMemo(() => {
    return cols.map((x, i) => ({
      ...x,
      grow: hasResized.current.has(i) ? undefined : (5 + i) / 5
    }));
  }, [cols]);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={columns} rows={1000} onColumnResize={(col, _newSize, colIndex, newSizeWithGrow) => {
    hasResized.current.add(colIndex);
    onColumnResize(col, newSizeWithGrow);
  }} rowMarkers="both" />;
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const O=["StretchColumnSize"];export{r as StretchColumnSize,O as __namedExportsOrder,N as default};
