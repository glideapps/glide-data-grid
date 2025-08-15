import{g as A,R as a}from"./iframe-DEB48SRF.js";import{G as D,C as S}from"./image-window-loader-EVQTWTwV.js";import{S as $}from"./story-utils-BPcW-dYq.js";import{D as B}from"./data-editor-all-BmHrOGhF.js";import{o as W,p as F,r as y}from"./throttle-B0y0PPFT.js";import{B as O}from"./utils-BS2L_WIh.js";import{a as V}from"./doc-wrapper-CHdrkZcb.js";import"./marked.esm-BmIu7KBL.js";import"./flatten-C8dAZ1b9.js";import"./scrolling-data-grid-CPCBm3k8.js";import"./index-D_kXk1yT.js";import"./index.esm-Cp3_DO_w.js";import"./index-HZH32G8C.js";import"./toConsumableArray-Cg7-Q_9P.js";function K(e,t,o){var c=-1,r=e.length;t<0&&(t=-t>r?0:r+t),o=o>r?r:o,o<0&&(o+=r),r=t>o?0:o-t>>>0,t>>>=0;for(var s=Array(r);++c<r;)s[c]=e[c+t];return s}var L=K,j=W;function q(e){var t=j(e),o=t%1;return t===t?o?t-o:t:0}var H=q,J=L,N=F,Q=H,U=Math.ceil,X=Math.max;function Y(e,t,o){(o?N(e,t,o):t===void 0)?t=1:t=X(Q(t),0);var c=e==null?0:e.length;if(!c||t<1)return[];for(var r=0,s=0,m=Array(U(c/t));r<c;)m[s++]=J(e,r,r+=t);return m}var Z=Y;const z=A(Z),we={title:"Glide-Data-Grid/DataEditor Demos",decorators:[e=>a.createElement($,null,a.createElement(e,null))]};function ee(e,t,o,c,r,s){e=Math.max(e,1);const m=a.useRef(S.empty()),h=a.useRef([]),[f,I]=a.useState({x:0,y:0,width:0,height:0}),C=a.useRef(f);C.current=f;const P=a.useCallback(n=>{I(l=>n.x===l.x&&n.y===l.y&&n.width===l.width&&n.height===l.height?l:n)},[]),k=a.useCallback(n=>{const[l,d]=n,i=h.current[d];return i!==void 0?c(i,l):{kind:D.Loading,allowOverlay:!1}},[c]),x=a.useCallback(async n=>{var p;m.current=m.current.add(n);const l=n*e,d=await o([l,(n+1)*e]),i=C.current,u=[],w=h.current;for(const[b,_]of d.entries()){w[b+l]=_;for(let v=i.x;v<=i.x+i.width;v++)u.push({cell:[v,b+l]})}(p=s.current)==null||p.updateCells(u)},[o,s,e]),G=a.useCallback(n=>async()=>{const l=Math.max(0,Math.floor(n.y/e)),d=Math.floor((n.y+n.height)/e);for(const u of z(y(l,d+1).filter(w=>!m.current.hasIndex(w)),t))await Promise.allSettled(u.map(x));const i=[];for(let u=n.y;u<n.y+n.height;u++){const w=[];for(let p=n.x;p<n.x+n.width;p++)w.push(k([p,u]));i.push(w)}return i},[k,x,t,e]);a.useEffect(()=>{const n=f,l=Math.max(0,Math.floor((n.y-e/2)/e)),d=Math.floor((n.y+n.height+e/2)/e);for(const i of y(l,d+1))m.current.hasIndex(i)||x(i)},[x,e,f]);const T=a.useCallback((n,l)=>{const[,d]=n,i=h.current[d];if(i===void 0)return;const u=r(n,l,i);u!==void 0&&(h.current[d]=u)},[r]);return{getCellContent:k,onVisibleRegionChanged:P,onCellEdited:T,getCellsForSelection:G}}const g=()=>{const e=a.useRef(null),t=a.useCallback(async r=>(await new Promise(s=>setTimeout(s,300)),y(r[0],r[1]).map(s=>[`1, ${s}`,`2, ${s}`])),[]),o=a.useMemo(()=>[{title:"A",width:150},{title:"B",width:200}],[]),c=ee(50,5,t,a.useCallback((r,s)=>({kind:D.Text,data:r[s],allowOverlay:!0,displayData:r[s]}),[]),a.useCallback((r,s,m)=>{const[h]=r;if(s.kind!==D.Text)return;const f=[...m];return f[h]=s.data,f},[]),e);return a.createElement(O,{title:"Server Side Data",description:a.createElement(V,null,"Glide data grid is fully ready to handle your server side data needs. This example condenses the implementation into a single custom hook and loads in pages of 50. We are using 300ms sleeps, but network transactions should work the same.")},a.createElement(B,{ref:e,...c,width:"100%",columns:o,rows:3e3,rowMarkers:"both"}))};g.parameters={options:{showPanel:!1}};var R,M,E;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const ref = React.useRef<DataEditorRef | null>(null);
  const getRowData = React.useCallback(async (r: Item) => {
    await new Promise(res => setTimeout(res, 300));
    return range(r[0], r[1]).map(rowIndex => [\`1, \${rowIndex}\`, \`2, \${rowIndex}\`]);
  }, []);
  const columns = React.useMemo<readonly GridColumn[]>(() => {
    return [{
      title: "A",
      width: 150
    }, {
      title: "B",
      width: 200
    }];
  }, []);
  const args = useAsyncData<string[]>(50, 5, getRowData, React.useCallback((rowData, col) => ({
    kind: GridCellKind.Text,
    data: rowData[col],
    allowOverlay: true,
    displayData: rowData[col]
  }), []), React.useCallback((cell, newVal, rowData) => {
    const [col] = cell;
    if (newVal.kind !== GridCellKind.Text) return undefined;
    const newRow: string[] = [...rowData];
    newRow[col] = newVal.data;
    return newRow;
  }, []), ref);
  return <BeautifulWrapper title="Server Side Data" description={<Description>
                    Glide data grid is fully ready to handle your server side data needs. This example condenses the
                    implementation into a single custom hook and loads in pages of 50. We are using 300ms sleeps, but
                    network transactions should work the same.
                </Description>}>
            <DataEditor ref={ref} {...args} width="100%" columns={columns} rows={3000} rowMarkers="both" />
        </BeautifulWrapper>;
}`,...(E=(M=g.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};const pe=["ServerSideData"];export{g as ServerSideData,pe as __namedExportsOrder,we as default};
