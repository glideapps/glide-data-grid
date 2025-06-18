import{R as e}from"./iframe-BBBy_AkU.js";import{D as c}from"./data-editor-all-BxWmfAOW.js";import{u as m,B as p,D as u,P as d,M as k,K as o,d as E}from"./utils-B80uFzAe.js";import{S as w}from"./story-utils-BhsGCgNU.js";import"./image-window-loader-Cx6vAMGX.js";import"./throttle-ClFDa5jN.js";import"./marked.esm-CGVwgHtb.js";import"./flatten-B_CFh3vs.js";import"./scrolling-data-grid-D4MgCw1b.js";import"./index-D_kXk1yT.js";import"./index.esm-CZMHO-l4.js";import"./index-b6Pw4WN-.js";const P={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(w,null,e.createElement(t,null))]},r=()=>{const{cols:t,getCellContent:l}=m(6),i=e.createElement(c,{...E,rowMarkers:"checkbox-visible",getCellContent:l,columns:t,rows:1e3});return e.createElement(p,{title:"Automatic Row Markers",description:e.createElement(e.Fragment,null,e.createElement(u,null,"You can enable row markers with rich selection behavior using the"," ",e.createElement(d,null,"rowMarkers")," prop."),e.createElement(k,null,"Use ",e.createElement(o,null,"⇧")," + click to make range selections, and ",e.createElement(o,null,"Ctrl")," (",e.createElement(o,null,"⌘")," on Mac) + click to add/remove individual rows."))},i)};var a,n,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  const dataEditor = <DataEditor {...defaultProps} rowMarkers={"checkbox-visible"} getCellContent={getCellContent} columns={cols} rows={1000} />;
  return <BeautifulWrapper title="Automatic Row Markers" description={<>
                    <Description>
                        You can enable row markers with rich selection behavior using the{" "}
                        <PropName>rowMarkers</PropName> prop.
                    </Description>
                    <MoreInfo>
                        Use <KeyName>⇧</KeyName> + click to make range selections, and <KeyName>Ctrl</KeyName> (
                        <KeyName>⌘</KeyName> on Mac) + click to add/remove individual rows.
                    </MoreInfo>
                </>}>
            {dataEditor}
        </BeautifulWrapper>;
}`,...(s=(n=r.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const A=["AutomaticRowMarkers"];export{r as AutomaticRowMarkers,A as __namedExportsOrder,P as default};
