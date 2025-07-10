import{R as e}from"./iframe-DwLDHopF.js";import{D as u}from"./data-editor-all-C-j6qqTg.js";import{B as C,D as g,P as l,a as p,d}from"./utils-DrwdpcMM.js";import{S as f}from"./story-utils-F_Js-uw-.js";import"./image-window-loader-CjomNWqI.js";import"./throttle-8qIMkzPD.js";import"./marked.esm-CNwiN7tY.js";import"./flatten-DbQfLfVW.js";import"./scrolling-data-grid-BWLkKURC.js";import"./index-D_kXk1yT.js";import"./index.esm-DtUvd_zx.js";import"./index-C6oAC5fS.js";const y={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(f,null,e.createElement(C,{title:"Content Alignment",description:e.createElement(g,null,"You can customize the content alignment by setting ",e.createElement(l,null,"contentAlign")," of a cell to ",e.createElement(l,null,"left"),", ",e.createElement(l,null,"right")," or ",e.createElement(l,null,"center"),".")},e.createElement(r,null)))]},o=()=>{const{cols:r,getCellContent:t}=p(),m=e.useCallback(n=>{const[c,A]=n;return c===3?{...t(n),contentAlign:"center"}:c===4?{...t(n),contentAlign:"right"}:c===5?{...t(n),contentAlign:"left"}:t(n)},[t]);return e.createElement(u,{...d,getCellContent:m,columns:r,rows:300})};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
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
}`,...(s=(i=o.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const B=["ContentAlignment"];export{o as ContentAlignment,B as __namedExportsOrder,y as default};
