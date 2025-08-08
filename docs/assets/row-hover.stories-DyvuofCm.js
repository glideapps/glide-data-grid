import{R as e}from"./iframe-CSTfxI-F.js";import{D as f}from"./data-editor-all-Be_Rh6_Q.js";import{B as p,D as w,P as v,a as R,d as g}from"./utils-lyHgExXo.js";import{S as C}from"./story-utils-BmEGl3jm.js";import"./image-window-loader-D9bY6bPc.js";import"./throttle-hiCRS32s.js";import"./marked.esm-tnn-ZDtv.js";import"./flatten-BjzCxGJb.js";import"./scrolling-data-grid-CKQw9aBU.js";import"./index-D_kXk1yT.js";import"./index.esm-DklcfT2U.js";import"./index-C-ZKpp3l.js";const G={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(C,null,e.createElement(p,{title:"Row Hover Effect",description:e.createElement(w,null,"Through careful usage of the ",e.createElement(v,null,"onItemHovered")," callback it is possible to easily create a row hover effect.")},e.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:c}=R(),[n,i]=e.useState(void 0),m=e.useCallback(o=>{const[h,u]=o.location;i(o.kind!=="cell"?void 0:u)},[]),d=e.useCallback(o=>{if(o===n)return{bgCell:"#f7f7f7",bgCellMedium:"#f0f0f0"}},[n]);return e.createElement(f,{...g,rowMarkers:"both",onItemHovered:m,getCellContent:c,getRowThemeOverride:d,columns:t,rows:300})};var a,l,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useAllMockedKinds();
  const [hoverRow, setHoverRow] = React.useState<number | undefined>(undefined);
  const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
    const [_, row] = args.location;
    setHoverRow(args.kind !== "cell" ? undefined : row);
  }, []);
  const getRowThemeOverride = React.useCallback<GetRowThemeCallback>(row => {
    if (row !== hoverRow) return undefined;
    return {
      bgCell: "#f7f7f7",
      bgCellMedium: "#f0f0f0"
    };
  }, [hoverRow]);
  return <DataEditor {...defaultProps} rowMarkers="both" onItemHovered={onItemHovered} getCellContent={getCellContent} getRowThemeOverride={getRowThemeOverride} columns={cols} rows={300} />;
}`,...(s=(l=r.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};const P=["RowHover"];export{r as RowHover,P as __namedExportsOrder,G as default};
