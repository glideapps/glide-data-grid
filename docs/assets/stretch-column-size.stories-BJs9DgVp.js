import{R as e}from"./iframe-Ct4YGx9l.js";import{D as C}from"./data-editor-all-Cxe8jGyh.js";import{B as w,D as h,P as z,u as R,d as S}from"./utils-DFGMVL-Y.js";import{S as f}from"./story-utils-elPKrpV5.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-CoTKZDWm.js";import"./throttle-DbZwvn6g.js";import"./marked.esm-D3YJm0Ly.js";import"./flatten-BLEtJkWA.js";import"./scrolling-data-grid-Byyqpnb1.js";import"./index-D_kXk1yT.js";import"./index.esm-C_38YiKS.js";import"./index-9bE69qXv.js";const I={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(f,null,e.createElement(w,{title:"Column Grow",description:e.createElement(h,null,"Columns in the data grid may be set to grow to fill space by setting the"," ",e.createElement(z,null,"grow")," prop.")},e.createElement(t,null)))]},o=()=>{const{cols:t,getCellContent:m,onColumnResize:c}=R(5,!0,!0),s=e.useRef(new Set),u=e.useMemo(()=>t.map((r,n)=>({...r,grow:s.current.has(n)?void 0:(5+n)/5})),[t]);return e.createElement(C,{...S,getCellContent:m,columns:u,rows:1e3,onColumnResize:(r,n,p,d)=>{s.current.add(p),c(r,d)},rowMarkers:"both"})};var a,l,i;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
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
}`,...(i=(l=o.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};const v=["StretchColumnSize"];export{o as StretchColumnSize,v as __namedExportsOrder,I as default};
