import{R as e}from"./iframe-Cqo63yo3.js";import{D as g}from"./data-editor-all-D3T75ras.js";import{u as E,c as k,B as D,D as N,P as c,M as h,K as y,d as A}from"./utils-BlBewSG9.js";import{S as b}from"./story-utils-BkEGE2aa.js";import"./image-window-loader-De8MY_b-.js";import"./throttle-NWrFwzYk.js";import"./marked.esm-CtAQBFcC.js";import"./flatten-Oepxq_uR.js";import"./scrolling-data-grid-u8yI1oRg.js";import"./index-D_kXk1yT.js";import"./index.esm-BgiIToY8.js";import"./index-BZKVpdfq.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>e.createElement(b,null,e.createElement(a,null))]},o=()=>{const{cols:a,getCellContent:r,setCellValueRaw:p,setCellValue:m}=E(60,!1),[l,w]=e.useState(50),s=e.useRef(null),R=e.useCallback(()=>{var n;(n=s.current)==null||n.appendRow(3,!1)},[s]),f=e.useCallback(()=>{const n=l;for(let t=0;t<6;t++){const C=r([t,n]);p([t,n],k(C))}w(t=>t+1)},[r,l,p]);return e.createElement(D,{title:"appendRow Ref",description:e.createElement(e.Fragment,null,e.createElement(N,null,"Adding data can also be triggered from outside of ",e.createElement(c,null,"DataEditor")),e.createElement(h,null,"By calling ",e.createElement(c,null,"appendRow")," on a ",e.createElement(c,null,"ref")," to your grid, you can trigger the append elsewhere, like this ",e.createElement(y,{onClick:R},"Append")," button"))},e.createElement(g,{...A,ref:s,getCellContent:r,columns:a,rowMarkers:"both",onCellEdited:m,trailingRowOptions:{hint:"New row...",sticky:!0,tint:!0},rows:l,onRowAppended:f}))};var i,u,d;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = useMockDataGenerator(60, false);
  const [numRows, setNumRows] = React.useState(50);
  const ref = React.useRef<DataEditorRef>(null);
  const onClick = React.useCallback(() => {
    void ref.current?.appendRow(3, false);
  }, [ref]);
  const onRowAppended = React.useCallback(() => {
    const newRow = numRows;
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, newRow]);
      setCellValueRaw([c, newRow], clearCell(cell));
    }
    setNumRows(cv => cv + 1);
  }, [getCellContent, numRows, setCellValueRaw]);
  return <BeautifulWrapper title="appendRow Ref" description={<>
                    <Description>
                        Adding data can also be triggered from outside of <PropName>DataEditor</PropName>
                    </Description>
                    <MoreInfo>
                        By calling <PropName>appendRow</PropName> on a <PropName>ref</PropName> to your grid, you can
                        trigger the append elsewhere, like this <KeyName onClick={onClick}>Append</KeyName> button
                    </MoreInfo>
                </>}>
            <DataEditor {...defaultProps} ref={ref} getCellContent={getCellContent} columns={cols} rowMarkers={"both"} onCellEdited={setCellValue} trailingRowOptions={{
      hint: "New row...",
      sticky: true,
      tint: true
    }} rows={numRows} onRowAppended={onRowAppended} />
        </BeautifulWrapper>;
}`,...(d=(u=o.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const x=["AppendRowHandle"];export{o as AppendRowHandle,x as __namedExportsOrder,_ as default};
