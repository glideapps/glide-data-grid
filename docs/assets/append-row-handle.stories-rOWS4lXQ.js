import{j as e,a as c,F as k}from"./marked.esm-dbrxtycE.js";import{R as n}from"./index-BMVQvedj.js";import{D}from"./data-editor-all-ZeeWpldS.js";import{u as N,c as y,B as A,D as b,P as p,M as P,K as E,d as M}from"./utils-MADpeXg5.js";import{S as V}from"./story-utils-K2EZnGjM.js";import"./iframe-alOpk4ZG.js";import"../sb-preview/runtime.js";import"./image-window-loader-ggeJlWLo.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-wnX0bxop.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const z={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>e(V,{children:e(a,{})})]},r=()=>{const{cols:a,getCellContent:l,setCellValueRaw:d,setCellValue:R}=N(60,!1),[s,f]=n.useState(50),i=n.useRef(null),C=n.useCallback(()=>{var t;(t=i.current)==null||t.appendRow(3,!1)},[i]),g=n.useCallback(()=>{const t=s;for(let o=0;o<6;o++){const h=l([o,t]);d([o,t],y(h))}f(o=>o+1)},[l,s,d]);return e(A,{title:"appendRow Ref",description:c(k,{children:[c(b,{children:["Adding data can also be triggered from outside of ",e(p,{children:"DataEditor"})]}),c(P,{children:["By calling ",e(p,{children:"appendRow"})," on a ",e(p,{children:"ref"})," to your grid, you can trigger the append elsewhere, like this ",e(E,{onClick:C,children:"Append"})," button"]})]}),children:e(D,{...M,ref:i,getCellContent:l,columns:a,rowMarkers:"both",onCellEdited:R,trailingRowOptions:{hint:"New row...",sticky:!0,tint:!0},rows:s,onRowAppended:g})})};var u,m,w;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
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
}`,...(w=(m=r.parameters)==null?void 0:m.docs)==null?void 0:w.source}}};const J=["AppendRowHandle"];export{r as AppendRowHandle,J as __namedExportsOrder,z as default};
