import{R as t}from"./iframe-B_Q06Dca.js";import{D as g}from"./data-editor-all-ClUqzqIV.js";import{B as O,D as x,P as I,u as h,c as f,d as E}from"./utils-CCjQfXGC.js";import{a as i}from"./image-window-loader-D7sQ27jY.js";import{S as D}from"./story-utils-DDLeMfpA.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-Co5oNmeu.js";import"./flatten-DXL8hG6G.js";import"./scrolling-data-grid-DvEd2NXF.js";import"./marked.esm-CcrTC-0Z.js";import"./index-D_kXk1yT.js";import"./index.esm-mFikWORe.js";import"./index-CZXiV8zI.js";const F={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>t.createElement(D,null,t.createElement(O,{title:"Trailing row options",description:t.createElement(x,null,"You can customize the trailing row in each column by setting a"," ",t.createElement(I,null,"trailingRowOptions")," in your columns.")},t.createElement(n,null)))]},b={2:"Smol text",3:"Add",5:"New"},k={2:i.HeaderArray,3:i.HeaderEmoji,5:i.HeaderNumber},T={2:0,3:0,5:0},A={3:!0},S={2:{baseFontStyle:"10px"}},l=()=>{const{cols:n,getCellContent:s,setCellValueRaw:a,setCellValue:p}=h(60,!1),[r,d]=t.useState(50),w=t.useCallback(()=>{const o=r;for(let e=0;e<6;e++){const C=s([e,o]);a([e,o],f(C))}d(e=>e+1)},[s,r,a]),R=t.useMemo(()=>n.map((o,e)=>({...o,trailingRowOptions:{hint:b[e],addIcon:k[e],targetColumn:T[e],disabled:A[e],themeOverride:S[e]}})),[n]);return t.createElement(g,{...E,getCellContent:s,columns:R,rowMarkers:"both",onCellEdited:p,trailingRowOptions:{tint:!0,sticky:!0},rows:r,onRowAppended:w})};var c,m,u;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
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
}`,...(u=(m=l.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const Y=["TrailingRowOptions"];export{l as TrailingRowOptions,Y as __namedExportsOrder,F as default};
