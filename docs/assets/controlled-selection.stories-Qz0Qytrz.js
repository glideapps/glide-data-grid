import{j as e,a as w}from"./marked.esm-dbrxtycE.js";import{R as f}from"./index-BMVQvedj.js";import{D as v}from"./data-editor-all-9PcyoUjw.js";import{u as x,B as y,D,P as p,d as G}from"./utils-8-qrEoNW.js";import{C as d}from"./image-window-loader-wgODAEJI.js";import{S as N}from"./story-utils-K2EZnGjM.js";import"./iframe-3J6k5XWx.js";import"../sb-preview/runtime.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-glPoAFs4.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const F={title:"Glide-Data-Grid/DataEditor Demos",decorators:[c=>e(N,{children:e(c,{})})]},l=()=>{var u,m;const{cols:c,getCellContent:C}=x(30,!0,!0),[a,i]=f.useState({columns:d.empty(),rows:d.empty()});return e(y,{title:"Controlled Selection",description:w(D,{children:["The selection of the grid can be controlled via ",e(p,{children:"GridSelection"})," and"," ",e(p,{children:"onGridSelectionChange"}),".",e("input",{type:"range",min:0,max:29,value:((u=a.current)==null?void 0:u.cell[0])??0,onChange:s=>{const t=s.target.valueAsNumber;i(n=>{var r,o;return{...n,current:{cell:[t,((r=n.current)==null?void 0:r.cell[1])??0],range:{x:t,y:((o=n.current)==null?void 0:o.cell[1])??0,width:1,height:1},rangeStack:[]}}})}}),e("input",{type:"range",min:0,max:99,value:((m=a.current)==null?void 0:m.cell[1])??0,onChange:s=>{const t=s.target.valueAsNumber;i(n=>{var r,o;return{...n,current:{cell:[((r=n.current)==null?void 0:r.cell[0])??0,t],range:{x:((o=n.current)==null?void 0:o.cell[0])??0,y:t,width:1,height:1},rangeStack:[]}}})}})]}),children:e(v,{...G,getCellContent:C,gridSelection:a,onGridSelectionChange:i,columns:c,rows:100,rowMarkers:"both"})})};var g,h,S;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(30, true, true);
  const [selection, setSelection] = React.useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });
  return <BeautifulWrapper title="Controlled Selection" description={<Description>
                    The selection of the grid can be controlled via <PropName>GridSelection</PropName> and{" "}
                    <PropName>onGridSelectionChange</PropName>.
                    <input type="range" min={0} max={29} value={selection.current?.cell[0] ?? 0} onChange={e => {
      const newCol = e.target.valueAsNumber;
      setSelection(cv => ({
        ...cv,
        current: {
          cell: [newCol, cv.current?.cell[1] ?? 0],
          range: {
            x: newCol,
            y: cv.current?.cell[1] ?? 0,
            width: 1,
            height: 1
          },
          rangeStack: []
        }
      }));
    }} />
                    <input type="range" min={0} max={99} value={selection.current?.cell[1] ?? 0} onChange={e => {
      const newRow = e.target.valueAsNumber;
      setSelection(cv => ({
        ...cv,
        current: {
          cell: [cv.current?.cell[0] ?? 0, newRow],
          range: {
            x: cv.current?.cell[0] ?? 0,
            y: newRow,
            width: 1,
            height: 1
          },
          rangeStack: []
        }
      }));
    }} />
                </Description>}>
            <DataEditor {...defaultProps} getCellContent={getCellContent} gridSelection={selection} onGridSelectionChange={setSelection} columns={cols} rows={100} rowMarkers="both" />
        </BeautifulWrapper>;
}`,...(S=(h=l.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};const H=["ControlledSelection"];export{l as ControlledSelection,H as __namedExportsOrder,F as default};
