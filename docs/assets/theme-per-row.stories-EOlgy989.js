import{R as e}from"./iframe-zllvizKV.js";import{D as d}from"./data-editor-all-TtktUvjC.js";import{B as u,D as p,P as C,u as f,d as g}from"./utils-CPb9Dy3W.js";import{S as h}from"./story-utils-Bq5TKRmG.js";import"./image-window-loader-pF5atNMS.js";import"./throttle-BjyYQ5NM.js";import"./marked.esm-D9WPxsEN.js";import"./flatten-C1Ps98hX.js";import"./scrolling-data-grid-B0GnSjR5.js";import"./index-D_kXk1yT.js";import"./index.esm-D_4T59sk.js";import"./index-CHkWWjXc.js";const M={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(h,null,e.createElement(u,{title:"Theme per row",description:e.createElement(e.Fragment,null,e.createElement(p,null,"Each row can provide theme overrides for rendering that row using the"," ",e.createElement(C,null,"getRowThemeOverride")," callback."))},e.createElement(r,null)))]},o=()=>{const{cols:r,getCellContent:s,onColumnResize:i,setCellValue:m}=f(5),c=e.useMemo(()=>{const t=[...r];return t[3]={...t[3],themeOverride:{bgCell:"#d6fafd"}},t},[r]);return e.createElement(d,{...g,getCellContent:s,columns:c,height:"100%",getRowThemeOverride:t=>t%2===0?void 0:{bgCell:"#e0f0ff88"},onCellEdited:m,onColumnResize:i,rows:10})};var n,l,a;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
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
}`,...(a=(l=o.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};const S=["ThemePerRow"];export{o as ThemePerRow,S as __namedExportsOrder,M as default};
