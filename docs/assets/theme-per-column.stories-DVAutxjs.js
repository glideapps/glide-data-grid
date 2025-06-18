import{R as n}from"./iframe-DCmqBHsd.js";import{D as i}from"./data-editor-all-CNoPZX2I.js";import{B as F,D as d,a as u,d as A}from"./utils-lFZWkupu.js";import{S as p}from"./story-utils-CbH2gJX6.js";import"./image-window-loader-ZcixKqIc.js";import"./throttle-D_XvKYTL.js";import"./marked.esm-Dw9qRKvL.js";import"./flatten-B7VXlg9S.js";import"./scrolling-data-grid-muDDf5NC.js";import"./index-D_kXk1yT.js";import"./index.esm-DIES499Q.js";import"./index-CVAp31et.js";const L={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>n.createElement(p,null,n.createElement(F,{title:"Theme per column",description:n.createElement(n.Fragment,null,n.createElement(d,null,"Each column can provide theme overrides for rendering that column."))},n.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:l,onColumnResize:s,setCellValue:C}=u(),m=n.useMemo(()=>{const e=[...t];return e[3]={...e[3],themeOverride:{textDark:"#009CA6",bgIconHeader:"#009CA6",accentColor:"#009CA6",accentLight:"#009CA620",fgIconHeader:"#FFFFFF",baseFontStyle:"600 13px"}},e[4]={...e[4],themeOverride:{textDark:"#009CA6",bgIconHeader:"#009CA6",accentColor:"#009CA6",accentLight:"#009CA620",fgIconHeader:"#FFFFFF",baseFontStyle:"600 13px"}},e[9]={...e[9],themeOverride:{textDark:"#009CA6",bgIconHeader:"#009CA6",accentColor:"#009CA6",accentLight:"#009CA620",fgIconHeader:"#FFFFFF"}},e[10]={...e[10],themeOverride:{textDark:"#009CA6",bgIconHeader:"#009CA6",accentColor:"#009CA6",accentLight:"#009CA620",fgIconHeader:"#FFFFFF"}},e},[t]);return n.createElement(i,{...A,getCellContent:l,columns:m,onCellEdited:C,onColumnResize:s,rows:1e3})};var o,c,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const realCols = React.useMemo(() => {
    const c = [...cols];
    c[3] = {
      ...c[3],
      themeOverride: {
        textDark: "#009CA6",
        bgIconHeader: "#009CA6",
        accentColor: "#009CA6",
        accentLight: "#009CA620",
        fgIconHeader: "#FFFFFF",
        baseFontStyle: "600 13px"
      }
    };
    c[4] = {
      ...c[4],
      themeOverride: {
        textDark: "#009CA6",
        bgIconHeader: "#009CA6",
        accentColor: "#009CA6",
        accentLight: "#009CA620",
        fgIconHeader: "#FFFFFF",
        baseFontStyle: "600 13px"
      }
    };
    c[9] = {
      ...c[9],
      themeOverride: {
        textDark: "#009CA6",
        bgIconHeader: "#009CA6",
        accentColor: "#009CA6",
        accentLight: "#009CA620",
        fgIconHeader: "#FFFFFF"
      }
    };
    c[10] = {
      ...c[10],
      themeOverride: {
        textDark: "#009CA6",
        bgIconHeader: "#009CA6",
        accentColor: "#009CA6",
        accentLight: "#009CA620",
        fgIconHeader: "#FFFFFF"
      }
    };
    return c;
  }, [cols]);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={realCols} onCellEdited={setCellValue} onColumnResize={onColumnResize} rows={1000} />;
}`,...(a=(c=r.parameters)==null?void 0:c.docs)==null?void 0:a.source}}};const R=["ThemePerColumn"];export{r as ThemePerColumn,R as __namedExportsOrder,L as default};
