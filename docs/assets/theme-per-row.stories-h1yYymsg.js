import{j as e,F as c,a as p}from"./marked.esm-dbrxtycE.js";import{R as u}from"./index-BMVQvedj.js";import{D as C}from"./data-editor-all-9PcyoUjw.js";import{B as f,D as h,P as g,u as R,d as w}from"./utils-8-qrEoNW.js";import{S as D}from"./story-utils-K2EZnGjM.js";import"./iframe-3J6k5XWx.js";import"../sb-preview/runtime.js";import"./image-window-loader-wgODAEJI.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-glPoAFs4.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const A={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e(D,{children:e(f,{title:"Theme per row",description:e(c,{children:p(h,{children:["Each row can provide theme overrides for rendering that row using the"," ",e(g,{children:"getRowThemeOverride"})," callback."]})}),children:e(o,{})})})]},t=()=>{const{cols:o,getCellContent:i,onColumnResize:a,setCellValue:m}=R(5),d=u.useMemo(()=>{const r=[...o];return r[3]={...r[3],themeOverride:{bgCell:"#d6fafd"}},r},[o]);return e(C,{...w,getCellContent:i,columns:d,height:"100%",getRowThemeOverride:r=>r%2===0?void 0:{bgCell:"#e0f0ff88"},onCellEdited:m,onColumnResize:a,rows:10})};var n,s,l;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useMockDataGenerator(5);
  const realCols = React.useMemo(() => {
    const c = [...cols];
    c[3] = {
      ...c[3],
      themeOverride: {
        bgCell: "#d6fafd"
      }
    };
    return c;
  }, [cols]);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={realCols} height="100%"
  // trailingRowOptions={{
  //     sticky: true,
  //     tint: true,
  // }}
  // onRowAppended={() => undefined}
  getRowThemeOverride={i => i % 2 === 0 ? undefined : {
    bgCell: "#e0f0ff88"
    //   borderColor: "#3f90e0",
  }} onCellEdited={setCellValue} onColumnResize={onColumnResize} rows={10} />;
}`,...(l=(s=t.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const B=["ThemePerRow"];export{t as ThemePerRow,B as __namedExportsOrder,A as default};
