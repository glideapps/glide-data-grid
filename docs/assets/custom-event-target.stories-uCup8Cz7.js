import{R as e}from"./iframe-BXRknidJ.js";import{D as w}from"./data-editor-all-QfsIbUYs.js";import{G as g}from"./image-window-loader-Djj-9oAY.js";import{B as k,D as h,d as b}from"./utils-BREjQ189.js";import{S as C}from"./story-utils-D-Z8vSQ6.js";import"./throttle-ByDdYhAX.js";import"./flatten-H4cRlZPR.js";import"./scrolling-data-grid-Dq05oQvq.js";import"./marked.esm-BvgFc-C8.js";import"./index-D_kXk1yT.js";import"./index.esm-BGKO__4_.js";import"./index-4ZqA6a1q.js";const G={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>e.createElement(C,null,e.createElement(k,{title:"Custom Event Target",description:e.createElement(h,null,"This example demonstrates using a custom event target for the data grid. All window events are blocked, but the grid still works because it's using the container div as its event target instead of window.")},e.createElement(l,null)))]},i=()=>{const[l]=e.useState(()=>[{title:"Column A",id:"a",width:150},{title:"Column B",id:"b",width:150},{title:"Column C",id:"c",width:150}]),d=e.useCallback(r=>{const[o,t]=r;return{kind:g.Text,allowOverlay:!0,displayData:`${o}, ${t}`,data:`${o}, ${t}`}},[]),n=e.useRef(null),[u,m]=e.useState(!1),[p,f]=e.useState(0);return e.useEffect(()=>{n.current!==null&&m(!0)},[]),e.useEffect(()=>{const r=t=>{n.current&&t.target instanceof Node&&n.current.contains(t.target)||(t.stopPropagation(),t.stopImmediatePropagation(),t.cancelable&&t.preventDefault(),t.type==="click"&&f(v=>v+1))},o=["mousedown","mouseup","mousemove","click","touchstart","touchend","touchmove"];for(const t of o)window.addEventListener(t,r,!0);return()=>{for(const t of o)window.removeEventListener(t,r,!0)}},[]),e.createElement("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},e.createElement("div",{style:{marginBottom:10,padding:10,backgroundColor:"#f0f0f0",borderRadius:4}},e.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},e.createElement("span",{style:{color:"#666"}},"Window click attempts blocked: ",p),e.createElement("button",{onClick:()=>alert("This button should not work if window events are blocked!"),style:{padding:"5px 10px"}},"Try clicking me (should not work)")),e.createElement("div",{style:{marginTop:10,fontSize:14,color:"#666"}},"Try clicking outside the grid or on the button above - these clicks should be blocked. But the grid below should still be fully interactive!")),e.createElement("div",{ref:n,style:{flex:1,position:"relative",border:"2px solid #3c78d8",borderRadius:4,padding:15}},u&&e.createElement(w,{...b,width:"100%",height:"100%",rows:1e3,columns:l,getCellContent:d,experimental:{eventTarget:n.current}})))};var a,s,c;i.parameters={...i.parameters,docs:{...(a=i.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  // Create columns
  const [cols] = React.useState<GridColumn[]>(() => {
    return [{
      title: "Column A",
      id: "a",
      width: 150
    }, {
      title: "Column B",
      id: "b",
      width: 150
    }, {
      title: "Column C",
      id: "c",
      width: 150
    }];
  });

  // Create data
  const getCellContent = React.useCallback((cell: Item): TextCell => {
    const [col, row] = cell;
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: \`\${col}, \${row}\`,
      data: \`\${col}, \${row}\`
    };
  }, []);

  // Create a ref for our custom event target container
  const containerRef = React.useRef<HTMLDivElement>(null);

  // State to track if the container is mounted
  const [containerMounted, setContainerMounted] = React.useState(false);

  // State to track window click attempts
  const [windowClickAttempts, setWindowClickAttempts] = React.useState(0);

  // Update containerMounted state after the component mounts
  React.useEffect(() => {
    if (containerRef.current !== null) {
      setContainerMounted(true);
    }
  }, []);

  // Block all window events
  React.useEffect(() => {
    const blockEvent = (e: Event) => {
      // Don't block events if they're inside our container
      if (containerRef.current && e.target instanceof Node && containerRef.current.contains(e.target)) {
        return;
      }
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (e.cancelable) {
        e.preventDefault();
      }

      // Count click attempts outside the grid
      if (e.type === "click") {
        setWindowClickAttempts(prev => prev + 1);
      }
    };

    // Block all mouse and touch events on window
    const events = ["mousedown", "mouseup", "mousemove", "click", "touchstart", "touchend", "touchmove"];

    // Add event blockers to window
    for (const event of events) {
      window.addEventListener(event, blockEvent, true);
    }
    return () => {
      // Clean up event blockers
      for (const event of events) {
        window.removeEventListener(event, blockEvent, true);
      }
    };
  }, []);
  return <div style={{
    display: "flex",
    flexDirection: "column",
    height: "100%"
  }}>
            <div style={{
      marginBottom: 10,
      padding: 10,
      backgroundColor: "#f0f0f0",
      borderRadius: 4
    }}>
                <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
                    <span style={{
          color: "#666"
        }}>Window click attempts blocked: {windowClickAttempts}</span>
                    <button onClick={() => alert("This button should not work if window events are blocked!")} style={{
          padding: "5px 10px"
        }}>
                        Try clicking me (should not work)
                    </button>
                </div>
                <div style={{
        marginTop: 10,
        fontSize: 14,
        color: "#666"
      }}>
                    Try clicking outside the grid or on the button above - these clicks should be blocked. But the grid
                    below should still be fully interactive!
                </div>
            </div>

            <div ref={containerRef} style={{
      flex: 1,
      position: "relative",
      border: "2px solid #3c78d8",
      borderRadius: 4,
      padding: 15
    }}>
                {containerMounted && <DataEditor {...defaultProps} width="100%" height="100%" rows={1000} columns={cols} getCellContent={getCellContent} experimental={{
        eventTarget: containerRef.current as HTMLElement
      }} />}
            </div>
        </div>;
}`,...(c=(s=i.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const L=["CustomEventTarget"];export{i as CustomEventTarget,L as __namedExportsOrder,G as default};
