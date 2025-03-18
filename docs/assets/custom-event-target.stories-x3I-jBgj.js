import{j as t,a as s}from"./marked.esm-dbrxtycE.js";import{R as n}from"./index-BMVQvedj.js";import{D as g}from"./data-editor-all-50ixdI5b.js";import{G as k}from"./image-window-loader-14Ewq8Gv.js";import{B as b,D as C,d as y}from"./utils-79SXuv2L.js";import{S as x}from"./story-utils-K2EZnGjM.js";import"./iframe-O3X4YIA0.js";import"../sb-preview/runtime.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-2HuByfij.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const O={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>t(x,{children:t(b,{title:"Custom Event Target",description:t(C,{children:"This example demonstrates using a custom event target for the data grid. All window events are blocked, but the grid still works because it's using the container div as its event target instead of window."}),children:t(a,{})})})]},l=()=>{const[a]=n.useState(()=>[{title:"Column A",id:"a",width:150},{title:"Column B",id:"b",width:150},{title:"Column C",id:"c",width:150}]),m=n.useCallback(r=>{const[i,e]=r;return{kind:k.Text,allowOverlay:!0,displayData:`${i}, ${e}`,data:`${i}, ${e}`}},[]),o=n.useRef(null),[p,f]=n.useState(!1),[v,w]=n.useState(0);return n.useEffect(()=>{o.current!==null&&f(!0)},[]),n.useEffect(()=>{const r=e=>{o.current&&e.target instanceof Node&&o.current.contains(e.target)||(e.stopPropagation(),e.stopImmediatePropagation(),e.cancelable&&e.preventDefault(),e.type==="click"&&w(h=>h+1))},i=["mousedown","mouseup","mousemove","click","touchstart","touchend","touchmove"];for(const e of i)window.addEventListener(e,r,!0);return()=>{for(const e of i)window.removeEventListener(e,r,!0)}},[]),s("div",{style:{display:"flex",flexDirection:"column",height:"100%"},children:[s("div",{style:{marginBottom:10,padding:10,backgroundColor:"#f0f0f0",borderRadius:4},children:[s("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s("span",{style:{color:"#666"},children:["Window click attempts blocked: ",v]}),t("button",{onClick:()=>alert("This button should not work if window events are blocked!"),style:{padding:"5px 10px"},children:"Try clicking me (should not work)"})]}),t("div",{style:{marginTop:10,fontSize:14,color:"#666"},children:"Try clicking outside the grid or on the button above - these clicks should be blocked. But the grid below should still be fully interactive!"})]}),t("div",{ref:o,style:{flex:1,position:"relative",border:"2px solid #3c78d8",borderRadius:4,padding:15},children:p&&t(g,{...y,width:"100%",height:"100%",rows:1e3,columns:a,getCellContent:m,experimental:{eventTarget:o.current}})})]})};var c,d,u;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
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
        eventTarget: (containerRef.current as HTMLElement)
      }} />}
            </div>
        </div>;
}`,...(u=(d=l.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const _=["CustomEventTarget"];export{l as CustomEventTarget,_ as __namedExportsOrder,O as default};
