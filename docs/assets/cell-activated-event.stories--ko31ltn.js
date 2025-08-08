import{R as e}from"./iframe-W7nT-une.js";import{D as f}from"./data-editor-all-b4eVW96P.js";import{a as g,B as E,D as h,K as c,P as k,M as B,d as y}from"./utils-l0xD9wTy.js";import{S as D}from"./story-utils-BabapSXl.js";import"./image-window-loader-p5sb_Hv2.js";import"./throttle-DhMr-Hmh.js";import"./marked.esm-Ctu65qa8.js";import"./flatten-CrIpYtya.js";import"./scrolling-data-grid-B54Ymk1K.js";import"./index-D_kXk1yT.js";import"./index.esm-vFkYHBzR.js";import"./index-Div0F0Kz.js";const w={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(D,null,e.createElement(n,null))]},t=n=>{const{cols:u,getCellContent:o,onColumnResize:m,setCellValue:v}=g(),p=e.useCallback(l=>{const i=o(l);return l[0]===3?{...i,activationBehaviorOverride:"single-click",hoverEffect:!0}:i},[o]),[a,C]=e.useState(void 0),A=e.useCallback(l=>{C(l)},[]);return e.createElement(E,{title:"Cell Activated event",description:e.createElement(e.Fragment,null,e.createElement(h,null,"When you tap ",e.createElement(c,null,"Enter"),", ",e.createElement(c,null,"Space"),", start typing, or double click a cell, that cell is activated. You can track this with ",e.createElement(k,null,"onCellActivated"),"."),e.createElement(B,null,"Last activated cell:"," ",a===void 0?"none":`(${a[0]}, ${a[1]})`))},e.createElement(f,{...y,cellActivationBehavior:n.cellActivationBehavior,getCellContent:p,getCellsForSelection:!0,columns:u,onCellEdited:v,onColumnResize:m,onCellActivated:A,rows:1e4}))};t.argTypes={cellActivationBehavior:{control:{type:"select"},options:["double-click","single-click","second-click"]}};t.args={cellActivationBehavior:"second-click"};var r,s,d;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const getCellContentMangled = React.useCallback((item: Item): GridCell => {
    const result = getCellContent(item);
    if (item[0] === 3) {
      return {
        ...result,
        activationBehaviorOverride: "single-click",
        hoverEffect: true
      } as any;
    }
    return result;
  }, [getCellContent]);
  const [lastActivated, setLastActivated] = React.useState<Item | undefined>(undefined);
  const onCellActivated = React.useCallback((cell: Item) => {
    setLastActivated(cell);
  }, []);
  return <BeautifulWrapper title="Cell Activated event" description={<>
                    <Description>
                        When you tap <KeyName>Enter</KeyName>, <KeyName>Space</KeyName>, start typing, or double click a cell,
                        that cell is activated. You can track this with <PropName>onCellActivated</PropName>.
                    </Description>
                    <MoreInfo>
                        Last activated cell:{" "}
                        {lastActivated === undefined ? "none" : \`(\${lastActivated[0]}, \${lastActivated[1]})\`}
                    </MoreInfo>
                </>}>
            <DataEditor {...defaultProps}
    // editorBloom={[-1, -4]}
    cellActivationBehavior={p.cellActivationBehavior} getCellContent={getCellContentMangled}
    //initialSize={[849, 967]}
    //scrollOffsetY={10_000}
    getCellsForSelection={true} columns={cols} onCellEdited={setCellValue} onColumnResize={onColumnResize} onCellActivated={onCellActivated} rows={10_000} />
        </BeautifulWrapper>;
}`,...(d=(s=t.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};const O=["CellActivatedEvent"];export{t as CellActivatedEvent,O as __namedExportsOrder,w as default};
