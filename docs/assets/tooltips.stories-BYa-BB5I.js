import{R as e}from"./iframe-DP2Cy3oG.js";import{u as g}from"./react-laag.esm-ByitRksI.js";import{D as b}from"./data-editor-all-nHNSaI91.js";import{B as h,D as w,P as y,u as T,d as v}from"./utils-DOe6Dv0J.js";import{S as R}from"./story-utils-Q6JxRjGS.js";import"./index-BkGQT0qr.js";import"./image-window-loader-BYBI60yr.js";import"./throttle-xBCR_LDJ.js";import"./marked.esm-DAjvWwlD.js";import"./flatten-DyjghEx7.js";import"./scrolling-data-grid-AUX7pIUX.js";import"./index-D_kXk1yT.js";import"./index.esm-DGfrhf2x.js";const $={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>e.createElement(R,null,e.createElement(h,{title:"Tooltips",className:"double",description:e.createElement(w,null,"Using the ",e.createElement(y,null,"onItemHovered")," event makes it easy to create tooltips. This story is intentionally forced to scroll vertically so layout in scrolling documents can be confirmed.")},e.createElement(s,null)))]},E={left:0,top:0,width:0,height:0,bottom:0,right:0},r=()=>{const{cols:s,getCellContent:p}=T(6),[o,i]=e.useState(),n=e.useRef(0),m=e.useCallback(t=>{t.kind==="cell"?(window.clearTimeout(n.current),i(void 0),n.current=window.setTimeout(()=>{i({val:`Tooltip for ${t.location[0]}, ${t.location[1]}`,bounds:{left:t.bounds.x,top:t.bounds.y,width:t.bounds.width,height:t.bounds.height,right:t.bounds.x+t.bounds.width,bottom:t.bounds.y+t.bounds.height}})},1e3)):(window.clearTimeout(n.current),n.current=0,i(void 0))},[]);e.useEffect(()=>()=>window.clearTimeout(n.current),[]);const a=o!==void 0,{renderLayer:f,layerProps:l}=g({isOpen:a,triggerOffset:4,auto:!0,container:"portal",trigger:{getBounds:()=>(o==null?void 0:o.bounds)??E}});return e.createElement(e.Fragment,null,e.createElement(b,{...v,onItemHovered:m,getCellContent:p,columns:s,rowMarkers:"both",rows:1e3}),a&&f(e.createElement("div",{...l,style:{...l.style,padding:"8px 12px",color:"white",font:"500 13px Inter",backgroundColor:"rgba(0, 0, 0, 0.85)",borderRadius:9}},o.val)))};var u,d,c;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
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
}`,...(c=(d=r.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const _=["Tooltips"];export{r as Tooltips,_ as __namedExportsOrder,$ as default};
