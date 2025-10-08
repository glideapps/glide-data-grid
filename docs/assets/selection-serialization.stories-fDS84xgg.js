import{R as e}from"./iframe-BD0eKhF8.js";import{D as S}from"./data-editor-all-D02BNocp.js";import{u as i,B as R,D as k,P as g}from"./utils-rSYmcjfd.js";import{C as n}from"./image-window-loader-Bm1DKFJt.js";import{S as D}from"./story-utils-DgK64KSU.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-D-ql-BMU.js";import"./flatten-DNC6PUAS.js";import"./scrolling-data-grid-BXHgCJL9.js";import"./marked.esm-BUdFeI_T.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const B={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>e.createElement(D,null,e.createElement(l,null))]},u=()=>{const{cols:l,getCellContent:a}=i(30,!0,!0),[t,s]=e.useState(()=>{try{const r=localStorage.getItem("grid-selection-demo");if(r!==null){const o=JSON.parse(r);return{columns:n.create(Array.isArray(o.columns)?o.columns:[]),rows:n.create(Array.isArray(o.rows)?o.rows:[]),current:o.current}}}catch(r){console.error("Failed to restore selection",r)}return{columns:n.empty(),rows:n.empty()}});e.useEffect(()=>{const r={columns:t.columns.items,rows:t.rows.items,current:t.current};localStorage.setItem("grid-selection-demo",JSON.stringify(r))},[t]);const c=()=>{s({columns:n.empty(),rows:n.empty(),current:void 0})},m=()=>{s({columns:n.create([[2,5],[8,10]]),rows:n.create([[1,4],[10,15],[20,23]]),current:{cell:[3,5],range:{x:3,y:5,width:1,height:1},rangeStack:[]}})};return e.createElement(R,{title:"Selection Serialization",description:e.createElement(k,null,"This example demonstrates how to serialize and persist grid selections using the new"," ",e.createElement(g,null,"CompactSelection.create()")," and ",e.createElement(g,null,".items")," APIs. The selection is automatically saved to localStorage and restored when the page refreshes.",e.createElement("br",null),e.createElement("br",null),e.createElement("button",{onClick:m,style:{marginRight:8}},"Create Example Selection"),e.createElement("button",{onClick:c},"Clear Selection"),e.createElement("br",null),e.createElement("br",null),e.createElement("strong",null,"Current selection:")," ",t.rows.length," rows, ",t.columns.length," columns",e.createElement("br",null),e.createElement("strong",null,"Persisted data:")," ",e.createElement("code",null,JSON.stringify({columns:t.columns.items,rows:t.rows.items})))},e.createElement(S,{...i(30,!1),columns:l,getCellContent:a,rows:1e4,gridSelection:t,onGridSelectionChange:s,rowMarkers:"both",columnSelect:"multi"}))},d=()=>{const{cols:l,getCellContent:a}=i(30,!0,!0),[t,s]=e.useState({columns:n.empty(),rows:n.empty()}),[c,m]=e.useState({columns:n.empty(),rows:n.empty()}),r=()=>{const o={columns:t.columns.items,rows:t.rows.items,current:t.current},w=JSON.stringify(o);console.log("Serialized selection:",w);const p=JSON.parse(w),v={columns:n.create(p.columns),rows:n.create(p.rows),current:p.current};m(v)};return e.createElement(R,{title:"Selection Round Trip",description:e.createElement(k,null,"This example demonstrates a complete round trip: create a selection, serialize it to JSON, then deserialize it back to a ",e.createElement(g,null,"CompactSelection")," using the new APIs.",e.createElement("br",null),e.createElement("br",null),e.createElement("button",{onClick:r},"Perform Round Trip"),e.createElement("br",null),e.createElement("br",null),e.createElement("strong",null,"Original equals restored:")," ",t.columns.equals(c.columns)&&t.rows.equals(c.rows)?"✅ Yes":"❌ No")},e.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,height:600}},e.createElement("div",null,e.createElement("h3",null,"Original Selection"),e.createElement(S,{...i(30,!1),columns:l,getCellContent:a,rows:1e3,gridSelection:t,onGridSelectionChange:s,rowMarkers:"both",columnSelect:"multi"})),e.createElement("div",null,e.createElement("h3",null,"Restored Selection"),e.createElement(S,{...i(30,!1),columns:l,getCellContent:a,rows:1e3,gridSelection:c,onGridSelectionChange:m,rowMarkers:"both",columnSelect:"multi"}))))};var C,h,y;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(30, true, true);

  // Load selection from localStorage on mount
  const [selection, setSelection] = React.useState<GridSelection>(() => {
    try {
      const saved = localStorage.getItem("grid-selection-demo");
      if (saved !== null) {
        const parsed = JSON.parse(saved) as {
          columns?: any[];
          rows?: any[];
          current?: any;
        };
        return {
          columns: CompactSelection.create(Array.isArray(parsed.columns) ? parsed.columns : []),
          rows: CompactSelection.create(Array.isArray(parsed.rows) ? parsed.rows : []),
          current: parsed.current
        };
      }
    } catch (error) {
      console.error("Failed to restore selection", error);
    }
    return {
      columns: CompactSelection.empty(),
      rows: CompactSelection.empty()
    };
  });

  // Save selection to localStorage whenever it changes
  React.useEffect(() => {
    const toSave = {
      columns: selection.columns.items,
      rows: selection.rows.items,
      current: selection.current
    };
    localStorage.setItem("grid-selection-demo", JSON.stringify(toSave));
  }, [selection]);
  const clearSelection = () => {
    setSelection({
      columns: CompactSelection.empty(),
      rows: CompactSelection.empty(),
      current: undefined
    });
  };
  const createExampleSelection = () => {
    setSelection({
      columns: CompactSelection.create([[2, 5], [8, 10]]),
      rows: CompactSelection.create([[1, 4], [10, 15], [20, 23]]),
      current: {
        cell: [3, 5],
        range: {
          x: 3,
          y: 5,
          width: 1,
          height: 1
        },
        rangeStack: []
      }
    });
  };
  return <BeautifulWrapper title="Selection Serialization" description={<Description>
                    This example demonstrates how to serialize and persist grid selections using the new{" "}
                    <PropName>CompactSelection.create()</PropName> and <PropName>.items</PropName> APIs. 
                    The selection is automatically saved to localStorage and restored when the page refreshes.
                    <br />
                    <br />
                    <button onClick={createExampleSelection} style={{
      marginRight: 8
    }}>
                        Create Example Selection
                    </button>
                    <button onClick={clearSelection}>Clear Selection</button>
                    <br />
                    <br />
                    <strong>Current selection:</strong> {selection.rows.length} rows, {selection.columns.length} columns
                    <br />
                    <strong>Persisted data:</strong> <code>{JSON.stringify({
        columns: selection.columns.items,
        rows: selection.rows.items
      })}</code>
                </Description>}>
            <DataEditor {...useMockDataGenerator(30, false)} columns={cols} getCellContent={getCellContent} rows={10_000} gridSelection={selection} onGridSelectionChange={setSelection} rowMarkers="both" columnSelect="multi" />
        </BeautifulWrapper>;
}`,...(y=(h=u.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var E,f,b;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(30, true, true);
  const [originalSelection, setOriginalSelection] = React.useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });
  const [restoredSelection, setRestoredSelection] = React.useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });
  const performRoundTrip = () => {
    // Serialize the selection
    const serialized = {
      columns: originalSelection.columns.items,
      rows: originalSelection.rows.items,
      current: originalSelection.current
    };

    // Simulate persistence (e.g., sending to server, storing in database)
    const jsonString = JSON.stringify(serialized);
    console.log("Serialized selection:", jsonString);

    // Deserialize and restore
    const parsed = JSON.parse(jsonString) as {
      columns: CompactSelectionRanges;
      rows: CompactSelectionRanges;
      current?: any;
    };
    const restored = {
      columns: CompactSelection.create(parsed.columns),
      rows: CompactSelection.create(parsed.rows),
      current: parsed.current
    };
    setRestoredSelection(restored);
  };
  return <BeautifulWrapper title="Selection Round Trip" description={<Description>
                    This example demonstrates a complete round trip: create a selection, serialize it to JSON, 
                    then deserialize it back to a <PropName>CompactSelection</PropName> using the new APIs.
                    <br />
                    <br />
                    <button onClick={performRoundTrip}>Perform Round Trip</button>
                    <br />
                    <br />
                    <strong>Original equals restored:</strong> {originalSelection.columns.equals(restoredSelection.columns) && originalSelection.rows.equals(restoredSelection.rows) ? "✅ Yes" : "❌ No"}
                </Description>}>
            <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      height: 600
    }}>
                <div>
                    <h3>Original Selection</h3>
                    <DataEditor {...useMockDataGenerator(30, false)} columns={cols} getCellContent={getCellContent} rows={1000} gridSelection={originalSelection} onGridSelectionChange={setOriginalSelection} rowMarkers="both" columnSelect="multi" />
                </div>
                <div>
                    <h3>Restored Selection</h3>
                    <DataEditor {...useMockDataGenerator(30, false)} columns={cols} getCellContent={getCellContent} rows={1000} gridSelection={restoredSelection} onGridSelectionChange={setRestoredSelection} rowMarkers="both" columnSelect="multi" />
                </div>
            </div>
        </BeautifulWrapper>;
}`,...(b=(f=d.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const W=["SelectionSerialization","SelectionRoundTrip"];export{d as SelectionRoundTrip,u as SelectionSerialization,W as __namedExportsOrder,B as default};
