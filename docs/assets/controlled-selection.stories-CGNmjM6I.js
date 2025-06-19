import{R as e}from"./iframe-BXRknidJ.js";import{D as w}from"./data-editor-all-QfsIbUYs.js";import{u as v,B as f,D as E,P as p,d as y}from"./utils-BREjQ189.js";import{C as d}from"./image-window-loader-Djj-9oAY.js";import{S as D}from"./story-utils-D-Z8vSQ6.js";import"./throttle-ByDdYhAX.js";import"./flatten-H4cRlZPR.js";import"./scrolling-data-grid-Dq05oQvq.js";import"./marked.esm-BvgFc-C8.js";import"./index-D_kXk1yT.js";import"./index.esm-BGKO__4_.js";import"./index-4ZqA6a1q.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[c=>e.createElement(D,null,e.createElement(c,null))]},l=()=>{var u,m;const{cols:c,getCellContent:h}=v(30,!0,!0),[a,i]=e.useState({columns:d.empty(),rows:d.empty()});return e.createElement(f,{title:"Controlled Selection",description:e.createElement(E,null,"The selection of the grid can be controlled via ",e.createElement(p,null,"GridSelection")," and"," ",e.createElement(p,null,"onGridSelectionChange"),".",e.createElement("input",{type:"range",min:0,max:29,value:((u=a.current)==null?void 0:u.cell[0])??0,onChange:s=>{const n=s.target.valueAsNumber;i(t=>{var r,o;return{...t,current:{cell:[n,((r=t.current)==null?void 0:r.cell[1])??0],range:{x:n,y:((o=t.current)==null?void 0:o.cell[1])??0,width:1,height:1},rangeStack:[]}}})}}),e.createElement("input",{type:"range",min:0,max:99,value:((m=a.current)==null?void 0:m.cell[1])??0,onChange:s=>{const n=s.target.valueAsNumber;i(t=>{var r,o;return{...t,current:{cell:[((r=t.current)==null?void 0:r.cell[0])??0,n],range:{x:((o=t.current)==null?void 0:o.cell[0])??0,y:n,width:1,height:1},rangeStack:[]}}})}}))},e.createElement(w,{...y,getCellContent:h,gridSelection:a,onGridSelectionChange:i,columns:c,rows:100,rowMarkers:"both"}))};var g,S,C;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
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
}`,...(C=(S=l.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};const O=["ControlledSelection"];export{l as ControlledSelection,O as __namedExportsOrder,_ as default};
