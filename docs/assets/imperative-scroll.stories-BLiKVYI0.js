import{R as e}from"./iframe-4msE8-cU.js";import{D as u}from"./data-editor-all-BzQm7LQc.js";import{a as g,B as f,D as C,P as E,M as v,d as A}from"./utils-B8PWH02q.js";import{S as D}from"./story-utils-Bw6q9TLO.js";import"./image-window-loader-BSLlpSCR.js";import"./throttle-DuvU7JMG.js";import"./marked.esm-BAK5VOWF.js";import"./flatten-CZnKZPC1.js";import"./scrolling-data-grid-DVv45Fre.js";import"./index-D_kXk1yT.js";import"./index.esm-BysnUvO2.js";import"./index-B7PdLqtn.js";const z={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(D,null,e.createElement(t,null))]},l=t=>{const{cols:s,getCellContent:c,onColumnResize:p,setCellValue:m}=g(),n=e.useRef(null),d=()=>{var o;(o=n.current)==null||o.scrollTo(4,99,"both",t.paddingX,t.paddingY,{vAlign:t.vAlign,hAlign:t.hAlign})};return e.createElement(f,{title:"Imperative scrolling",description:e.createElement(e.Fragment,null,e.createElement(C,null,"You can imperatively scroll to a cell by calling ",e.createElement(E,null,"scrollTo")," on a DataEditor ref."),e.createElement(v,null,"Click ",e.createElement("button",{onClick:d},"Here")," to scroll to column 4 row 100"))},e.createElement(u,{...A,ref:n,rowMarkers:"clickable-number",getCellContent:c,columns:s,onCellEdited:m,onColumnResize:p,rows:1e4}))};l.args={paddingY:0,paddingX:0,vAlign:"start",hAlign:"start"};l.argTypes={paddingY:0,paddingX:0,vAlign:{control:{type:"select"},options:["start","center","end",void 0]},hAlign:{control:{type:"select"},options:["start","center","end",void 0]}};var r,a,i;l.parameters={...l.parameters,docs:{...(r=l.parameters)==null?void 0:r.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const ref = React.useRef<DataEditorRef>(null);
  const onClick = () => {
    ref.current?.scrollTo(4, 99, "both", p.paddingX, p.paddingY, {
      vAlign: p.vAlign,
      hAlign: p.hAlign
    });
  };
  return <BeautifulWrapper title="Imperative scrolling" description={<>
                    <Description>
                        You can imperatively scroll to a cell by calling <PropName>scrollTo</PropName> on a DataEditor
                        ref.
                    </Description>
                    <MoreInfo>
                        Click <button onClick={onClick}>Here</button> to scroll to column 4 row 100
                    </MoreInfo>
                </>}>
            <DataEditor {...defaultProps} ref={ref} rowMarkers="clickable-number" getCellContent={getCellContent} columns={cols} onCellEdited={setCellValue} onColumnResize={onColumnResize} rows={10_000} />
        </BeautifulWrapper>;
}`,...(i=(a=l.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const B=["ImperativeScroll"];export{l as ImperativeScroll,B as __namedExportsOrder,z as default};
