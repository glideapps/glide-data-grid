import{j as x}from"./marked.esm-dbrxtycE.js";import{g as S,R as l}from"./index-BMVQvedj.js";import{G as y,C as $}from"./image-window-loader-wgODAEJI.js";import{S as B}from"./story-utils-K2EZnGjM.js";import{D as W}from"./data-editor-all-9PcyoUjw.js";import{a as F,b as O,r as C}from"./throttle-7EuXLZa7.js";import{B as V}from"./utils-8-qrEoNW.js";import{a as j}from"./doc-wrapper-m1-LpzDL.js";import"./iframe-3J6k5XWx.js";import"../sb-preview/runtime.js";import"./flatten-qRvRBp6y.js";import"./_baseIteratee-WTHxv43n.js";import"./scrolling-data-grid-glPoAFs4.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";import"./toConsumableArray-ppDpjNRJ.js";function K(e,t,a){var c=-1,r=e.length;t<0&&(t=-t>r?0:r+t),a=a>r?r:a,a<0&&(a+=r),r=t>a?0:a-t>>>0,t>>>=0;for(var o=Array(r);++c<r;)o[c]=e[c+t];return o}var L=K,q=F;function H(e){var t=q(e),a=t%1;return t===t?a?t-a:t:0}var J=H,N=L,Q=O,U=J,X=Math.ceil,Y=Math.max;function Z(e,t,a){(a?Q(e,t,a):t===void 0)?t=1:t=Y(U(t),0);var c=e==null?0:e.length;if(!c||t<1)return[];for(var r=0,o=0,m=Array(X(c/t));r<c;)m[o++]=N(e,r,r+=t);return m}var z=Z;const ee=S(z),ke={title:"Glide-Data-Grid/DataEditor Demos",decorators:[e=>x(B,{children:x(e,{})})]};function te(e,t,a,c,r,o){e=Math.max(e,1);const m=l.useRef($.empty()),h=l.useRef([]),[f,G]=l.useState({x:0,y:0,width:0,height:0}),b=l.useRef(f);b.current=f;const T=l.useCallback(n=>{G(s=>n.x===s.x&&n.y===s.y&&n.width===s.width&&n.height===s.height?s:n)},[]),v=l.useCallback(n=>{const[s,d]=n,i=h.current[d];return i!==void 0?c(i,s):{kind:y.Loading,allowOverlay:!1}},[c]),k=l.useCallback(async n=>{var p;m.current=m.current.add(n);const s=n*e,d=await a([s,(n+1)*e]),i=b.current,u=[],w=h.current;for(const[R,E]of d.entries()){w[R+s]=E;for(let D=i.x;D<=i.x+i.width;D++)u.push({cell:[D,R+s]})}(p=o.current)==null||p.updateCells(u)},[a,o,e]),_=l.useCallback(n=>async()=>{const s=Math.max(0,Math.floor(n.y/e)),d=Math.floor((n.y+n.height)/e);for(const u of ee(C(s,d+1).filter(w=>!m.current.hasIndex(w)),t))await Promise.allSettled(u.map(k));const i=[];for(let u=n.y;u<n.y+n.height;u++){const w=[];for(let p=n.x;p<n.x+n.width;p++)w.push(v([p,u]));i.push(w)}return i},[v,k,t,e]);l.useEffect(()=>{const n=f,s=Math.max(0,Math.floor((n.y-e/2)/e)),d=Math.floor((n.y+n.height+e/2)/e);for(const i of C(s,d+1))m.current.hasIndex(i)||k(i)},[k,e,f]);const A=l.useCallback((n,s)=>{const[,d]=n,i=h.current[d];if(i===void 0)return;const u=r(n,s,i);u!==void 0&&(h.current[d]=u)},[r]);return{getCellContent:v,onVisibleRegionChanged:T,onCellEdited:A,getCellsForSelection:_}}const g=()=>{const e=l.useRef(null),t=l.useCallback(async r=>(await new Promise(o=>setTimeout(o,300)),C(r[0],r[1]).map(o=>[`1, ${o}`,`2, ${o}`])),[]),a=l.useMemo(()=>[{title:"A",width:150},{title:"B",width:200}],[]),c=te(50,5,t,l.useCallback((r,o)=>({kind:y.Text,data:r[o],allowOverlay:!0,displayData:r[o]}),[]),l.useCallback((r,o,m)=>{const[h]=r;if(o.kind!==y.Text)return;const f=[...m];return f[h]=o.data,f},[]),e);return x(V,{title:"Server Side Data",description:x(j,{children:"Glide data grid is fully ready to handle your server side data needs. This example condenses the implementation into a single custom hook and loads in pages of 50. We are using 300ms sleeps, but network transactions should work the same."}),children:x(W,{ref:e,...c,width:"100%",columns:a,rows:3e3,rowMarkers:"both"})})};g.parameters={options:{showPanel:!1}};var M,I,P;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
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
}`,...(P=(I=g.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};const ve=["ServerSideData"];export{g as ServerSideData,ve as __namedExportsOrder,ke as default};
