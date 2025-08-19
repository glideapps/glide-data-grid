import{R as e}from"./iframe-DuKzhFAV.js";import{D as p}from"./data-editor-all-h01LK8X1.js";import{B as u,D as C,P as f,u as R,d as g}from"./utils-CXj6_Jia.js";import{S as h}from"./story-utils-BbqVCsEB.js";import{O as w,V as a}from"./image-window-loader-D4WXs3fS.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-C9zA5J5l.js";import"./flatten-mmeTaiPx.js";import"./scrolling-data-grid-BBESFY1a.js";import"./marked.esm-B1hMdrV8.js";import"./index-D_kXk1yT.js";import"./index.esm-CRvNmNkt.js";import"./index-Cfg5Tl68.js";const A={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(h,null,e.createElement(u,{title:"Custom renderers",description:e.createElement(C,null,"Override internal cell renderers by passing the "," ",e.createElement(f,null,"renderers")," prop.")},e.createElement(n,null)))]},t=()=>{const{cols:n,getCellContent:i}=R(100,!0,!0),m=e.useMemo(()=>[...w,{...a,draw:l=>{const{ctx:o,rect:r}=l;o.fillStyle="#ffe0e0",o.fillRect(r.x,r.y,r.width,r.height),a.draw(l)}}],[]);return e.createElement(p,{...g,getCellContent:i,columns:n,rows:200,rowMarkers:"both",renderers:m})};var s,c,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100, true, true);
  const renderers = React.useMemo<readonly InternalCellRenderer<InnerGridCell>[]>(() => {
    return [...AllCellRenderers, {
      ...markerCellRenderer,
      draw: args => {
        const {
          ctx,
          rect
        } = args;
        ctx.fillStyle = "#ffe0e0";
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        markerCellRenderer.draw(args as any);
      }
    } as InternalCellRenderer<InnerGridCell>];
  }, []);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={200} rowMarkers="both" renderers={renderers} />;
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const _=["OverrideMarkerRenderer"];export{t as OverrideMarkerRenderer,_ as __namedExportsOrder,A as default};
