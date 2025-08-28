import{R as e}from"./iframe-DvQ8_lQU.js";import{u as g}from"./react-laag.esm-CHS3iT4N.js";import{D as b}from"./data-editor-all-KwlQitOx.js";import{B as h,D as w,P as y,u as T,d as v}from"./utils-DbfckF8m.js";import{S as R}from"./story-utils-rfSg_w8P.js";import"./preload-helper-C1FmrZbK.js";import"./index-Di5Jo-Lf.js";import"./image-window-loader-B2G_WoyH.js";import"./throttle-CxLmvQkw.js";import"./marked.esm-Chqd-LbM.js";import"./flatten-B4uaeP2E.js";import"./scrolling-data-grid-ieZ08qph.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>e.createElement(R,null,e.createElement(h,{title:"Tooltips",className:"double",description:e.createElement(w,null,"Using the ",e.createElement(y,null,"onItemHovered")," event makes it easy to create tooltips. This story is intentionally forced to scroll vertically so layout in scrolling documents can be confirmed.")},e.createElement(s,null)))]},E={left:0,top:0,width:0,height:0,bottom:0,right:0},r=()=>{const{cols:s,getCellContent:p}=T(6),[o,i]=e.useState(),n=e.useRef(0),m=e.useCallback(t=>{t.kind==="cell"?(window.clearTimeout(n.current),i(void 0),n.current=window.setTimeout(()=>{i({val:`Tooltip for ${t.location[0]}, ${t.location[1]}`,bounds:{left:t.bounds.x,top:t.bounds.y,width:t.bounds.width,height:t.bounds.height,right:t.bounds.x+t.bounds.width,bottom:t.bounds.y+t.bounds.height}})},1e3)):(window.clearTimeout(n.current),n.current=0,i(void 0))},[]);e.useEffect(()=>()=>window.clearTimeout(n.current),[]);const a=o!==void 0,{renderLayer:f,layerProps:l}=g({isOpen:a,triggerOffset:4,auto:!0,container:"portal",trigger:{getBounds:()=>(o==null?void 0:o.bounds)??E}});return e.createElement(e.Fragment,null,e.createElement(b,{...v,onItemHovered:m,getCellContent:p,columns:s,rowMarkers:"both",rows:1e3}),a&&f(e.createElement("div",{...l,style:{...l.style,padding:"8px 12px",color:"white",font:"500 13px Inter",backgroundColor:"rgba(0, 0, 0, 0.85)",borderRadius:9}},o.val)))};var u,d,c;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
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
}`,...(c=(d=r.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const z=["Tooltips"];export{r as Tooltips,z as __namedExportsOrder,_ as default};
