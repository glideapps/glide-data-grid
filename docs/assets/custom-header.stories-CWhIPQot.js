import{R as r}from"./iframe-BgfFcZ9C.js";import{D as p}from"./data-editor-all-Bnd86m2g.js";import{B as f,D as h,u as x,d as g}from"./utils-DqFEZiEk.js";import{S as C}from"./story-utils-CJEJw97k.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-BrZNY-5H.js";import"./throttle-DtWufps6.js";import"./marked.esm-DQlBXtuN.js";import"./flatten-BwlvJWCG.js";import"./scrolling-data-grid-ifJU8ga0.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const M={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>r.createElement(C,null,r.createElement(f,{title:"Custom Drawing",description:r.createElement(h,null,"You can draw over or under most objects in the grid.")},r.createElement(n,null)))]},o=()=>{const{cols:n,getCellContent:m}=x(1e3,!0,!0),u=r.useCallback((c,l)=>{const{ctx:e,rect:t}=c;e.beginPath(),e.rect(t.x,t.y,t.width,t.height);const a=e.createLinearGradient(0,t.y,0,t.y+t.height);a.addColorStop(0,"#ff00d934"),a.addColorStop(1,"#00a2ff34"),e.fillStyle=a,e.fill(),l()},[]),w=r.useCallback((c,l)=>{l();const{ctx:e,rect:t}=c,a=7;e.beginPath(),e.moveTo(t.x+t.width-a,t.y+1),e.lineTo(t.x+t.width,t.y+a+1),e.lineTo(t.x+t.width,t.y+1),e.closePath(),e.save(),e.fillStyle="#ff0000",e.fill(),e.restore()},[]);return r.createElement(p,{...g,getCellContent:m,columns:n,drawHeader:u,drawCell:w,rows:3e3,rowMarkers:"both"})};var s,i,d;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(1000, true, true);
  const drawHeader: DrawHeaderCallback = React.useCallback((args, draw) => {
    const {
      ctx,
      rect
    } = args;
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    const lg = ctx.createLinearGradient(0, rect.y, 0, rect.y + rect.height);
    lg.addColorStop(0, "#ff00d934");
    lg.addColorStop(1, "#00a2ff34");
    ctx.fillStyle = lg;
    ctx.fill();
    draw(); // draw at end to draw under the header
  }, []);
  const drawCell: DrawCellCallback = React.useCallback((args, draw) => {
    draw(); // draw up front to draw over the cell
    const {
      ctx,
      rect
    } = args;
    const size = 7;
    ctx.beginPath();
    ctx.moveTo(rect.x + rect.width - size, rect.y + 1);
    ctx.lineTo(rect.x + rect.width, rect.y + size + 1);
    ctx.lineTo(rect.x + rect.width, rect.y + 1);
    ctx.closePath();
    ctx.save();
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.restore();
  }, []);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} drawHeader={drawHeader} drawCell={drawCell} rows={3000} rowMarkers="both" />;
}`,...(d=(i=o.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};const R=["CustomDrawing"];export{o as CustomDrawing,R as __namedExportsOrder,M as default};
