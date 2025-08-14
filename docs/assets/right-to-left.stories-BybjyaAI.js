import{R as e}from"./iframe-Iifyoimw.js";import{D as d}from"./data-editor-all-CYJZRdiL.js";import{B as p,D as g,u as f,d as M}from"./utils-DCrqnqmL.js";import{G as k}from"./image-window-loader-BDCXALa9.js";import{S as D}from"./story-utils-DST3U7UA.js";import"./throttle-BVHd-xO2.js";import"./flatten-Dm8ntmsO.js";import"./scrolling-data-grid-CX8tx08F.js";import"./marked.esm-B4q_PBrm.js";import"./index-D_kXk1yT.js";import"./index.esm-pZ0ZBnMd.js";import"./index-qADYP8W1.js";const P={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>e.createElement(D,null,e.createElement(p,{title:"Right to Left support",description:e.createElement(e.Fragment,null,e.createElement(g,null,"The data editor automatically detects RTL in text cells and respects it."))},e.createElement(l,null)))]},n=()=>{const{cols:l,getCellContent:r,setCellValue:i,onColumnResize:u}=f(60,!1),c=e.useMemo(()=>{const t=[...l];return t[0]={...t[0],title:"גלייד",hasMenu:!0},t},[l]),m=e.useCallback(t=>{const[C,E]=t;return C!==0?r(t):{kind:k.Text,allowOverlay:!0,data:"אני גדעון, מומחה לאפליקציות גלייד.",displayData:"אני גדעון, מומחה לאפליקציות גלייד.",allowWrapping:!0}},[r]);return e.createElement(d,{...M,getCellContent:m,columns:c,onColumnResize:u,getCellsForSelection:!0,rowMarkers:"both",onHeaderMenuClick:()=>alert("menu click"),onPaste:!0,onCellEdited:i,rows:1e3})};var o,a,s;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue,
    onColumnResize
  } = useMockDataGenerator(60, false);
  const realCols = React.useMemo(() => {
    const result = [...cols];
    result[0] = {
      ...result[0],
      title: "גלייד",
      hasMenu: true
    };
    return result;
  }, [cols]);
  const getCellContentMangled = React.useCallback<typeof getCellContent>(item => {
    const [col, _row] = item;
    if (col !== 0) return getCellContent(item);
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      data: "אני גדעון, מומחה לאפליקציות גלייד.",
      displayData: "אני גדעון, מומחה לאפליקציות גלייד.",
      allowWrapping: true
    };
  }, [getCellContent]);
  return <DataEditor {...defaultProps} getCellContent={getCellContentMangled} columns={realCols} onColumnResize={onColumnResize} getCellsForSelection={true} rowMarkers={"both"} onHeaderMenuClick={() => alert("menu click")} onPaste={true} onCellEdited={setCellValue} rows={1000} />;
}`,...(s=(a=n.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const W=["RightToLeft"];export{n as RightToLeft,W as __namedExportsOrder,P as default};
