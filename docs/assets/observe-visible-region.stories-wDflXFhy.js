import{j as e,a as t,F as g}from"./marked.esm-dbrxtycE.js";import{R as p}from"./index-BMVQvedj.js";import{D as d}from"./data-editor-all-ATY7qU3b.js";import{u as h,B as b,D as u,P as R,M as v,K as n,d as y}from"./utils-wFAOo4Dx.js";import{S as f}from"./story-utils-K2EZnGjM.js";import"./iframe-ni8xiI1Q.js";import"../sb-preview/runtime.js";import"./image-window-loader-hgJATaim.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-ta-GKPbC.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const W={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e(f,{children:e(r,{})})]},o=()=>{const{cols:r,getCellContent:c}=h(100),[i,m]=p.useState({x:0,y:0,width:0,height:0});return e(b,{title:"Observe Visible Region",description:t(g,{children:[t(u,{children:["The visible region can be observed using ",e(R,{children:"onVisibleRegionChanged"})]}),t(v,{children:["Then current visible region is x:",e(n,{children:i.x})," y:",e(n,{children:i.y})," width:",e(n,{children:i.width})," height:",e(n,{children:i.height})]})]}),children:e(d,{...y,getCellContent:c,columns:r,rows:1e3,onVisibleRegionChanged:m})})};var s,a,l;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  const [visibleRegion, setVisibleRegion] = React.useState<Rectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  return <BeautifulWrapper title="Observe Visible Region" description={<>
                    <Description>
                        The visible region can be observed using <PropName>onVisibleRegionChanged</PropName>
                    </Description>
                    <MoreInfo>
                        Then current visible region is x:<KeyName>{visibleRegion.x}</KeyName> y:
                        <KeyName>{visibleRegion.y}</KeyName> width:
                        <KeyName>{visibleRegion.width}</KeyName> height:<KeyName>{visibleRegion.height}</KeyName>
                    </MoreInfo>
                </>}>
            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={1000} onVisibleRegionChanged={setVisibleRegion} />
        </BeautifulWrapper>;
}`,...(l=(a=o.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const j=["ObserveVisibleRegion"];export{o as ObserveVisibleRegion,j as __namedExportsOrder,W as default};
