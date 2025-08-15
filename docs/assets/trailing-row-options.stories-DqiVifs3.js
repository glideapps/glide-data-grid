import{R as n}from"./iframe-DEB48SRF.js";import{D as g}from"./data-editor-all-BmHrOGhF.js";import{B as O,D as x,P as I,u as h,c as f,d as E}from"./utils-BS2L_WIh.js";import{a as i}from"./image-window-loader-EVQTWTwV.js";import{S as D}from"./story-utils-BPcW-dYq.js";import"./throttle-B0y0PPFT.js";import"./flatten-C8dAZ1b9.js";import"./scrolling-data-grid-CPCBm3k8.js";import"./marked.esm-BmIu7KBL.js";import"./index-D_kXk1yT.js";import"./index.esm-Cp3_DO_w.js";import"./index-HZH32G8C.js";const z={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>n.createElement(D,null,n.createElement(O,{title:"Trailing row options",description:n.createElement(x,null,"You can customize the trailing row in each column by setting a"," ",n.createElement(I,null,"trailingRowOptions")," in your columns.")},n.createElement(t,null)))]},b={2:"Smol text",3:"Add",5:"New"},k={2:i.HeaderArray,3:i.HeaderEmoji,5:i.HeaderNumber},T={2:0,3:0,5:0},A={3:!0},S={2:{baseFontStyle:"10px"}},l=()=>{const{cols:t,getCellContent:s,setCellValueRaw:a,setCellValue:p}=h(60,!1),[r,d]=n.useState(50),w=n.useCallback(()=>{const o=r;for(let e=0;e<6;e++){const C=s([e,o]);a([e,o],f(C))}d(e=>e+1)},[s,r,a]),R=n.useMemo(()=>t.map((o,e)=>({...o,trailingRowOptions:{hint:b[e],addIcon:k[e],targetColumn:T[e],disabled:A[e],themeOverride:S[e]}})),[t]);return n.createElement(g,{...E,getCellContent:s,columns:R,rowMarkers:"both",onCellEdited:p,trailingRowOptions:{tint:!0,sticky:!0},rows:r,onRowAppended:w})};var c,m,u;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = useMockDataGenerator(60, false);
  const [numRows, setNumRows] = React.useState(50);
  const onRowAppended = React.useCallback(() => {
    const newRow = numRows;
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, newRow]);
      setCellValueRaw([c, newRow], clearCell(cell));
    }
    setNumRows(cv => cv + 1);
  }, [getCellContent, numRows, setCellValueRaw]);
  const columnsWithRowOptions: GridColumn[] = React.useMemo(() => {
    return cols.map((c, idx) => ({
      ...c,
      trailingRowOptions: {
        hint: trailingRowOptionsColumnIndexesHint[idx],
        addIcon: trailingRowOptionsColumnIndexesIcon[idx],
        targetColumn: trailingRowOptionsColumnIndexesTarget[idx],
        disabled: trailingRowOptionsColumnIndexesDisabled[idx],
        themeOverride: trailingRowOptionsColumnIndexesTheme[idx]
      }
    }));
  }, [cols]);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={columnsWithRowOptions} rowMarkers={"both"} onCellEdited={setCellValue} trailingRowOptions={{
    tint: true,
    sticky: true
  }} rows={numRows} onRowAppended={onRowAppended} />;
}`,...(u=(m=l.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const F=["TrailingRowOptions"];export{l as TrailingRowOptions,F as __namedExportsOrder,z as default};
