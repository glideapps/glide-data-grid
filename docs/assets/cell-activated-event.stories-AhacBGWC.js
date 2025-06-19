import{R as e}from"./iframe-BXRknidJ.js";import{D as f}from"./data-editor-all-QfsIbUYs.js";import{a as E,B as g,D as h,K as c,P as k,M as B,d as y}from"./utils-BREjQ189.js";import{S as D}from"./story-utils-D-Z8vSQ6.js";import"./image-window-loader-Djj-9oAY.js";import"./throttle-ByDdYhAX.js";import"./marked.esm-BvgFc-C8.js";import"./flatten-H4cRlZPR.js";import"./scrolling-data-grid-Dq05oQvq.js";import"./index-D_kXk1yT.js";import"./index.esm-BGKO__4_.js";import"./index-4ZqA6a1q.js";const w={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(D,null,e.createElement(n,null))]},t=n=>{const{cols:u,getCellContent:o,onColumnResize:m,setCellValue:v}=E(),p=e.useCallback(l=>{const i=o(l);return l[0]===3?{...i,activationBehaviorOverride:"single-click",hoverEffect:!0}:i},[o]),[a,C]=e.useState(void 0),A=e.useCallback(l=>{C(l)},[]);return e.createElement(g,{title:"Cell Activated event",description:e.createElement(e.Fragment,null,e.createElement(h,null,"When you tap ",e.createElement(c,null,"Enter"),", ",e.createElement(c,null,"Space")," or double click a cell, that cell is activated. You can track this with ",e.createElement(k,null,"onCellActivated"),"."),e.createElement(B,null,"Last activated cell:"," ",a===void 0?"none":`(${a[0]}, ${a[1]})`))},e.createElement(f,{...y,cellActivationBehavior:n.cellActivationBehavior,getCellContent:p,getCellsForSelection:!0,columns:u,onCellEdited:v,onColumnResize:m,onCellActivated:A,rows:1e4}))};t.argTypes={cellActivationBehavior:{control:{type:"select"},options:["double-click","single-click","second-click"]}};t.args={cellActivationBehavior:"second-click"};var r,s,d;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`p => {
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
                        When you tap <KeyName>Enter</KeyName>, <KeyName>Space</KeyName> or double click a cell, that
                        cell is activated. You can track this with <PropName>onCellActivated</PropName>.
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
