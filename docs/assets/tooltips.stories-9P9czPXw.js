import{j as t,a as m,F as b}from"./marked.esm-dbrxtycE.js";import{R as r}from"./index-BMVQvedj.js";import{u as w}from"./react-laag.esm-PpDllAFI.js";import{D as y}from"./data-editor-all-Orvb2jqb.js";import{B as T,D as v,P as R,u as x,d as C}from"./utils-H5nRE5Sr.js";import{S as k}from"./story-utils-K2EZnGjM.js";import"./index-wocATsGp.js";import"./iframe-t8ayfGqb.js";import"../sb-preview/runtime.js";import"./image-window-loader-h6lJQmfV.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-6lFEHS8-.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";const N={title:"Glide-Data-Grid/DataEditor Demos",decorators:[i=>t(k,{children:t(T,{title:"Tooltips",className:"double",description:m(v,{children:["Using the ",t(R,{children:"onItemHovered"})," event makes it easy to create tooltips. This story is intentionally forced to scroll vertically so layout in scrolling documents can be confirmed."]}),children:t(i,{})})})]},D={left:0,top:0,width:0,height:0,bottom:0,right:0},s=()=>{const{cols:i,getCellContent:f}=x(6),[o,a]=r.useState(),n=r.useRef(0),g=r.useCallback(e=>{e.kind==="cell"?(window.clearTimeout(n.current),a(void 0),n.current=window.setTimeout(()=>{a({val:`Tooltip for ${e.location[0]}, ${e.location[1]}`,bounds:{left:e.bounds.x,top:e.bounds.y,width:e.bounds.width,height:e.bounds.height,right:e.bounds.x+e.bounds.width,bottom:e.bounds.y+e.bounds.height}})},1e3)):(window.clearTimeout(n.current),n.current=0,a(void 0))},[]);r.useEffect(()=>()=>window.clearTimeout(n.current),[]);const d=o!==void 0,{renderLayer:h,layerProps:l}=w({isOpen:d,triggerOffset:4,auto:!0,container:"portal",trigger:{getBounds:()=>(o==null?void 0:o.bounds)??D}});return m(b,{children:[t(y,{...C,onItemHovered:g,getCellContent:f,columns:i,rowMarkers:"both",rows:1e3}),d&&h(t("div",{...l,style:{...l.style,padding:"8px 12px",color:"white",font:"500 13px Inter",backgroundColor:"rgba(0, 0, 0, 0.85)",borderRadius:9},children:o.val}))]})};var u,c,p;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  const [tooltip, setTooltip] = React.useState<{
    val: string;
    bounds: IBounds;
  } | undefined>();
  const timeoutRef = React.useRef(0);
  const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
    if (args.kind === "cell") {
      window.clearTimeout(timeoutRef.current);
      setTooltip(undefined);
      timeoutRef.current = window.setTimeout(() => {
        setTooltip({
          val: \`Tooltip for \${args.location[0]}, \${args.location[1]}\`,
          bounds: {
            // translate to react-laag types
            left: args.bounds.x,
            top: args.bounds.y,
            width: args.bounds.width,
            height: args.bounds.height,
            right: args.bounds.x + args.bounds.width,
            bottom: args.bounds.y + args.bounds.height
          }
        });
      }, 1000);
    } else {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = 0;
      setTooltip(undefined);
    }
  }, []);
  React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);
  const isOpen = tooltip !== undefined;
  const {
    renderLayer,
    layerProps
  } = useLayer({
    isOpen,
    triggerOffset: 4,
    auto: true,
    container: "portal",
    trigger: {
      getBounds: () => tooltip?.bounds ?? zeroBounds
    }
  });
  return <>
            <DataEditor {...defaultProps} onItemHovered={onItemHovered} getCellContent={getCellContent} columns={cols} rowMarkers="both" rows={1000} />
            {isOpen && renderLayer(<div {...layerProps} style={{
      ...layerProps.style,
      padding: "8px 12px",
      color: "white",
      font: "500 13px Inter",
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      borderRadius: 9
    }}>
                        {tooltip.val}
                    </div>)}
        </>;
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const W=["Tooltips"];export{s as Tooltips,W as __namedExportsOrder,N as default};
