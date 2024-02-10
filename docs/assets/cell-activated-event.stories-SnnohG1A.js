import{j as e,a as o,F as g}from"./marked.esm-dbrxtycE.js";import{R as i}from"./index-BMVQvedj.js";import{D as k}from"./data-editor-all-vh5PYcJs.js";import{a as B,B as E,D as y,K as s,P as D,M as S,d as M}from"./utils-O3xu-yRM.js";import{S as R}from"./story-utils-K2EZnGjM.js";import"./iframe-qD4w8K__.js";import"../sb-preview/runtime.js";import"./image-window-loader-ae1-l40w.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-GIDCmpe8.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const G={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e(R,{children:e(n,{})})]},t=n=>{const{cols:m,getCellContent:c,onColumnResize:p,setCellValue:C}=B(),A=i.useCallback(l=>{const r=c(l);return l[0]===3?{...r,activationBehaviorOverride:"single-click",hoverEffect:!0}:r},[c]),[a,h]=i.useState(void 0),f=i.useCallback(l=>{h(l)},[]);return e(E,{title:"Cell Activated event",description:o(g,{children:[o(y,{children:["When you tap ",e(s,{children:"Enter"}),", ",e(s,{children:"Space"})," or double click a cell, that cell is activated. You can track this with ",e(D,{children:"onCellActivated"}),"."]}),o(S,{children:["Last activated cell:"," ",a===void 0?"none":`(${a[0]}, ${a[1]})`]})]}),children:e(k,{...M,cellActivationBehavior:n.cellActivationBehavior,getCellContent:A,getCellsForSelection:!0,columns:m,onCellEdited:C,onColumnResize:p,onCellActivated:f,rows:1e4})})};t.argTypes={cellActivationBehavior:{control:{type:"select"},options:["double-click","single-click","second-click"]}};t.args={cellActivationBehavior:"second-click"};var d,u,v;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const getCellContentMangled = React.useCallback((item: Item): GridCell => {
    const result = getCellContent(item);
    if (item[0] === 3) {
      return ({
        ...result,
        activationBehaviorOverride: "single-click",
        hoverEffect: true
      } as any);
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
}`,...(v=(u=t.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};const V=["CellActivatedEvent"];export{t as CellActivatedEvent,V as __namedExportsOrder,G as default};
