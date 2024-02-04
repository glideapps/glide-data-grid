import{j as o}from"./marked.esm-dbrxtycE.js";import{R as s}from"./index-BMVQvedj.js";import{D as u}from"./data-editor-all-9PcyoUjw.js";import{B as f,D as x,u as g,d as C}from"./utils-8-qrEoNW.js";import{S as y}from"./story-utils-K2EZnGjM.js";import"./iframe-3J6k5XWx.js";import"../sb-preview/runtime.js";import"./image-window-loader-wgODAEJI.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-glPoAFs4.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const B={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>o(y,{children:o(f,{title:"Custom Drawing",description:o(x,{children:"You can draw over or under most objects in the grid."}),children:o(n,{})})})]},a=()=>{const{cols:n,getCellContent:p}=g(1e3,!0,!0),w=s.useCallback((c,l)=>{const{ctx:e,rect:t}=c;e.beginPath(),e.rect(t.x,t.y,t.width,t.height);const r=e.createLinearGradient(0,t.y,0,t.y+t.height);r.addColorStop(0,"#ff00d934"),r.addColorStop(1,"#00a2ff34"),e.fillStyle=r,e.fill(),l()},[]),h=s.useCallback((c,l)=>{l();const{ctx:e,rect:t}=c,r=7;e.beginPath(),e.moveTo(t.x+t.width-r,t.y+1),e.lineTo(t.x+t.width,t.y+r+1),e.lineTo(t.x+t.width,t.y+1),e.closePath(),e.save(),e.fillStyle="#ff0000",e.fill(),e.restore()},[]);return o(u,{...C,getCellContent:p,columns:n,drawHeader:w,drawCell:h,rows:3e3,rowMarkers:"both"})};var i,d,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
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
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const L=["CustomDrawing"];export{a as CustomDrawing,L as __namedExportsOrder,B as default};
