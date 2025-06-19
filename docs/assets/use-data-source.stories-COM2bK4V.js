var ie=Object.defineProperty;var le=(n,e,t)=>e in n?ie(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var $=(n,e,t)=>le(n,typeof e!="symbol"?e+"":e,t);import{s as B}from"./marked.esm-DAjvWwlD.js";import{R,g as ce,r as s}from"./iframe-DP2Cy3oG.js";import{u as ue}from"./index.esm-DGfrhf2x.js";import{y as F}from"./index-D_kXk1yT.js";import{q as de,s as pe,u as fe,w as me,x as ge,i as te,y as Ce,z as ye,A as he,r as T,n as G}from"./throttle-xBCR_LDJ.js";import{G as g,f as be,h as O,j as x,D as re}from"./data-editor-all-hDvAZC5r.js";import"./index-BkGQT0qr.js";import"./flatten-DyjghEx7.js";function ke(n){const[e,t]=R.useState([]),[o,a]=R.useState(void 0),{columns:r,onGroupHeaderClicked:i,onGridSelectionChange:f,getGroupDetails:d,gridSelection:l,freezeColumns:p=0,theme:h}=n,b=l??o,c=R.useMemo(()=>{const u=[];let C=[-1,-1],S;for(let w=p;w<r.length;w++){const E=r[w].group??"",_=e.includes(E);S!==E&&C[0]!==-1&&(u.push(C),C=[-1,-1]),_&&C[0]!==-1?C[1]+=1:_?C=[w,1]:C[0]!==-1&&(u.push(C),C=[-1,-1]),S=E}return C[0]!==-1&&u.push(C),u},[e,r,p]),y=R.useMemo(()=>c.length===0?r:r.map((u,C)=>{for(const[S,w]of c)if(C>=S&&C<S+w){let A=8;return C===S+w-1&&(A=36),{...u,width:A,themeOverride:{bgCell:h.bgCellMedium}}}return u}),[r,c,h.bgCellMedium]),m=R.useCallback((u,C)=>{var w;i==null||i(u,C);const S=((w=y[u])==null?void 0:w.group)??"";S!==""&&(C.preventDefault(),t(A=>A.includes(S)?A.filter(E=>E!==S):[...A,S]))},[y,i]),v=R.useCallback(u=>{if(u.current!==void 0){const C=u.current.cell[0],S=y[C];t(w=>w.includes((S==null?void 0:S.group)??"")?w.filter(A=>A!==S.group):w)}f!==void 0?f(u):a(u)},[y,f]),k=R.useCallback(u=>({...d==null?void 0:d(u),name:u,overrideTheme:e.includes(u??"")?{bgHeader:h.bgHeaderHasFocus}:void 0}),[e,d,h.bgHeaderHasFocus]);return{columns:y,onGroupHeaderClicked:m,onGridSelectionChange:v,getGroupDetails:k,gridSelection:b}}var Se=pe,ve=de;function we(n,e){var t=-1,o=ve(n)?Array(n.length):[];return Se(n,function(a,r,i){o[++t]=e(a,r,i)}),o}var Fe=we;function Ae(n,e){var t=n.length;for(n.sort(e);t--;)n[t]=n[t].value;return n}var Re=Ae,z=fe;function xe(n,e){if(n!==e){var t=n!==void 0,o=n===null,a=n===n,r=z(n),i=e!==void 0,f=e===null,d=e===e,l=z(e);if(!f&&!l&&!r&&n>e||r&&i&&d&&!f&&!l||o&&i&&d||!t&&d||!a)return 1;if(!o&&!r&&!l&&n<e||l&&t&&a&&!o&&!r||f&&t&&a||!i&&a||!d)return-1}return 0}var Me=xe,Ee=Me;function He(n,e,t){for(var o=-1,a=n.criteria,r=e.criteria,i=a.length,f=t.length;++o<i;){var d=Ee(a[o],r[o]);if(d){if(o>=f)return d;var l=t[o];return d*(l=="desc"?-1:1)}}return n.index-e.index}var De=He,I=me,Ue=Ce,Ge=he,Be=Fe,Te=Re,Ie=ye,_e=De,$e=ge,Oe=te;function ze(n,e,t){e.length?e=I(e,function(r){return Oe(r)?function(i){return Ue(i,r.length===1?r[0]:r)}:r}):e=[$e];var o=-1;e=I(e,Ie(Ge));var a=Be(n,function(r,i,f){var d=I(e,function(l){return l(r)});return{criteria:d,index:++o,value:r}});return Te(a,function(r,i){return _e(r,i,t)})}var Ne=ze,Le=Ne,N=te;function Ke(n,e,t,o){return n==null?[]:(N(e)||(e=e==null?[]:[e]),t=o?void 0:t,N(t)||(t=t==null?[]:[t]),Le(n,e,t))}var Pe=Ke;const L=ce(Pe);function U(n){return n.id??`${n.group??""}/${n.title}`}function K(n,e){return typeof e=="string"?U(n)===e:U(n)===U(e)}function P(n,e,t){const o=e.indexOf(n);if(o===-1)return Number.MAX_SAFE_INTEGER;const a=t.findIndex(r=>K(n,r));if(a!==-1)return a;for(let r=o;r>=0;r--){const i=t.findIndex(f=>K(e[r],f));if(i!==-1)return i+.5}return-1}function Ve(n){const{columns:e,getCellContent:t,onColumnMoved:o}=n,[a,r]=s.useState(()=>e.map(U)),i=s.useMemo(()=>L(e,p=>P(p,e,a)),[a,e]),f=s.useRef(o);f.current=o;const d=s.useCallback((p,h)=>{var b;r(c=>{const y=[...c],[m]=y.splice(p,1);return y.splice(h,0,m),y}),(b=f.current)==null||b.call(f,p,h)},[]);s.useEffect(()=>{r(p=>L(e,h=>P(h,e,p)).map(U))},[e]);const l=s.useCallback(p=>{const[h,b]=p,c=i[h],y=e.indexOf(c);return t([y,b])},[i,e,t]);return{columns:i,onColumnMoved:d,getCellContent:l}}function We(n){var e,t;switch(n.kind){case g.Number:return((e=n.data)==null?void 0:e.toString())??"";case g.Boolean:return((t=n.data)==null?void 0:t.toString())??"";case g.Markdown:case g.RowID:case g.Text:case g.Uri:return n.data??"";case g.Bubble:case g.Image:return n.data.join("");case g.Drilldown:return n.data.map(o=>o.text).join("");case g.Protected:case g.Loading:return"";case g.Custom:return n.copyData}}function V(n){if(typeof n=="number")return n;if(n.length>0){const e=Number(n);isNaN(e)||(n=e)}return n}function Ze(n,e){return n=V(n),e=V(e),typeof n=="string"&&typeof e=="string"?n.localeCompare(e):typeof n=="number"&&typeof e=="number"?n===e?0:n>e?1:-1:n==e?0:n>e?1:-1}function je(n,e){return n>e?1:n===e?0:-1}function Ye(n){const{sort:e,rows:t,getCellContent:o}=n;let a=e===void 0?void 0:n.columns.findIndex(l=>e.column===l||l.id!==void 0&&e.column.id===l.id);a===-1&&(a=void 0);const r=(e==null?void 0:e.direction)??"asc",i=s.useMemo(()=>{if(a===void 0)return;const l=new Array(t),p=[a,0];for(let b=0;b<t;b++)p[1]=b,l[b]=We(o(p));let h;return(e==null?void 0:e.mode)==="raw"?h=T(t).sort((b,c)=>je(l[b],l[c])):(e==null?void 0:e.mode)==="smart"?h=T(t).sort((b,c)=>Ze(l[b],l[c])):h=T(t).sort((b,c)=>l[b].localeCompare(l[c])),r==="desc"&&h.reverse(),h},[o,t,e==null?void 0:e.mode,r,a]),f=s.useCallback(l=>i===void 0?l:i[l],[i]),d=s.useCallback(([l,p])=>i===void 0?o([l,p]):(p=i[p],o([l,p])),[o,i]);return i===void 0?{getCellContent:n.getCellContent,getOriginalIndex:f}:{getOriginalIndex:f,getCellContent:d}}const Xe={undoHistory:[],redoHistory:[],canUndo:!1,canRedo:!1,isApplyingUndo:!1,isApplyingRedo:!1};function qe(n,e){const t={...n};switch(e.type){case"undo":if(n.canUndo){t.undoHistory=[...n.undoHistory];const o=t.undoHistory.pop();return t.operation=o,t.canUndo=t.undoHistory.length>0,t.isApplyingUndo=!0,t}return n;case"redo":if(n.canRedo){t.redoHistory=[...n.redoHistory];const o=t.redoHistory.pop();return t.operation=o,t.canRedo=t.redoHistory.length>0,t.isApplyingRedo=!0,t}return n;case"operationApplied":return t.operation=void 0,t.isApplyingRedo=!1,t.isApplyingUndo=!1,t;case"edit":return!n.isApplyingRedo&&!n.isApplyingUndo&&(t.undoHistory=[...n.undoHistory,e.batch],t.redoHistory=[],t.canUndo=!0,t.canRedo=!1),n.isApplyingUndo&&(t.redoHistory=[...n.redoHistory,e.batch],t.canRedo=!0),n.isApplyingRedo&&(t.undoHistory=[...n.undoHistory,e.batch],t.canUndo=!0),t;default:throw new Error("Invalid action")}}function Je(n,e,t,o){const[a,r]=s.useReducer(qe,Xe),i=s.useRef(null),f=s.useRef(null),d=s.useRef(!1),l=s.useRef(!1);s.useEffect(()=>{d.current=a.isApplyingUndo,l.current=a.isApplyingRedo},[a.isApplyingUndo,a.isApplyingRedo]);const[p,h]=s.useState(null),b=s.useRef(null),c=s.useCallback(k=>{h(k),b.current=k},[o]),y=s.useCallback((k,u)=>{if(!(d.current||l.current)&&b.current){clearTimeout(f.current);const S=e(k);i.current===null&&(i.current={edits:[],selection:b.current}),i.current.edits.push({cell:k,newValue:S}),f.current=setTimeout(()=>{i.current&&(r({type:"edit",batch:i.current}),i.current=null)},0)}t(k,u)},[t,e]),m=s.useCallback(()=>{r({type:"undo"})},[r]),v=s.useCallback(()=>{r({type:"redo"})},[r]);return s.useEffect(()=>{if(a.operation&&b.current&&n.current){const k=[],u={edits:[],selection:b.current};for(const C of a.operation.edits){const S=e(C.cell);u.edits.push({cell:C.cell,newValue:S}),t(C.cell,C.newValue),k.push({cell:C.cell})}h(a.operation.selection),b.current=a.operation.selection,n.current.updateCells(k),r({type:"edit",batch:u}),r({type:"operationApplied"})}},[a.operation,n,t,h,e]),s.useEffect(()=>{const k=u=>{u.key==="z"&&(u.metaKey||u.ctrlKey)&&(u.shiftKey?v():m()),u.key==="y"&&(u.metaKey||u.ctrlKey)&&v()};return window.addEventListener("keydown",k),()=>{window.removeEventListener("keydown",k)}},[m,v]),s.useMemo(()=>({undo:m,redo:v,canUndo:a.canUndo,canRedo:a.canRedo,onCellEdited:y,onGridSelectionChange:c,gridSelection:p}),[m,v,y,a.canUndo,a.canRedo,c,p])}F.seed(1337);function Qe(n){return!!n}function en(n,e){var o;const t=n.data;if(typeof t==typeof e.data)return{...e,data:t};switch(e.kind){case g.Uri:return G(t)?{...e,data:t[0]}:{...e,data:(t==null?void 0:t.toString())??""};case g.Boolean:return G(t)?{...e,data:t[0]!==void 0}:n.kind===g.Boolean?{...e,data:n.data}:{...e,data:!!Qe(t)};case g.Image:return G(t)?{...e,data:[t[0]]}:{...e,data:[(t==null?void 0:t.toString())??""]};case g.Number:return{...e,data:0};case g.Text:case g.Markdown:return G(t)?{...e,data:t[0].toString()??""}:{...e,data:((o=n.data)==null?void 0:o.toString())??""};case g.Custom:return e}sn()}function nn(n){const{getContent:e,...t}=n;return t}function W(n,e){const t=[{title:"First name",id:"First name",group:e?"Name":void 0,icon:x.HeaderString,hasMenu:!1,getContent:()=>{const r=F.name.firstName();return{kind:g.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"Last name",id:"Last name",group:e?"Name":void 0,icon:x.HeaderString,hasMenu:!1,getContent:()=>{const r=F.name.lastName();return{kind:g.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"Avatar",id:"Avatar",group:e?"Info":void 0,icon:x.HeaderImage,hasMenu:!1,getContent:()=>{const r=Math.round(Math.random()*100);return{kind:g.Image,data:[`https://picsum.photos/id/${r}/900/900`],displayData:[`https://picsum.photos/id/${r}/40/40`],allowOverlay:!0,readonly:!0}}},{title:"Email",id:"Email",group:e?"Info":void 0,icon:x.HeaderString,hasMenu:!1,getContent:()=>{const r=F.internet.email();return{kind:g.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"Title",id:"Title",group:e?"Info":void 0,icon:x.HeaderString,hasMenu:!1,getContent:()=>{const r=F.name.jobTitle();return{kind:g.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"More Info",id:"More Info",group:e?"Info":void 0,icon:x.HeaderUri,hasMenu:!1,getContent:()=>{const r=F.internet.url();return{kind:g.Uri,displayData:r,data:r,allowOverlay:!0,readonly:!0}}}];if(n<t.length)return t.slice(0,n);const o=n-t.length,a=[...new Array(o)].map((r,i)=>tn(i+t.length,e));return[...t,...a]}function tn(n,e){return{title:`Column ${n}`,id:`Column ${n}`,group:e?`Group ${Math.round(n/3)}`:void 0,icon:x.HeaderString,hasMenu:!1,getContent:()=>{const t=F.lorem.word();return{kind:g.Text,data:t,displayData:t,allowOverlay:!0,readonly:!0}}}}class rn{constructor(){$(this,"cachedContent",new Map)}get(e,t){const o=this.cachedContent.get(e);if(o!==void 0)return o[t]}set(e,t,o){let a=this.cachedContent.get(e);a===void 0&&this.cachedContent.set(e,a=[]),a[t]=o}}function on(n,e=!0,t=!1){const o=s.useRef(new rn),[a,r]=s.useState(()=>W(n,t));s.useEffect(()=>{r(W(n,t))},[t,n]);const i=s.useCallback((c,y)=>{r(m=>{const v=m.findIndex(u=>u.title===c.title),k=[...m];return k.splice(v,1,{...m[v],width:y}),k})},[]),f=s.useMemo(()=>a.map(nn),[a]),d=s.useRef(a);d.current=a;const l=s.useCallback(([c,y])=>{let m=o.current.get(c,y);return m===void 0&&(m=d.current[c].getContent(),!e&&be(m)&&(m={...m,readonly:e}),o.current.set(c,y,m)),m},[e]),p=s.useCallback(c=>{const y=[];for(let m=c.y;m<c.y+c.height;m++){const v=[];for(let k=c.x;k<c.x+c.width;k++)v.push(l([k,m]));y.push(v)}return y},[l]),h=s.useCallback(([c,y],m)=>{o.current.set(c,y,m)},[]),b=s.useCallback(([c,y],m)=>{let v=o.current.get(c,y);if(v===void 0&&(v=a[c].getContent()),O(m)&&O(v)){const k=en(m,v);o.current.set(c,y,{...k,displayData:typeof k.data=="string"?k.data:k.displayData,lastUpdated:performance.now()})}},[a]);return{cols:f,getCellContent:l,onColumnResize:i,setCellValue:b,getCellsForSelection:p,setCellValueRaw:h}}function an(n="This should not happen"){throw new Error(n)}function sn(n){return an("Hell froze over")}F.seed(1337);const ln=B("div")({name:"SimpleWrapper",class:"ss4kmn3",propsAsIs:!1}),cn=n=>s.createElement(ln,null,s.createElement("div",{className:"content"},n.children)),vn={title:"Extra Packages/Source",decorators:[n=>s.createElement(cn,null,s.createElement(n,null))]},un=B("div")({name:"BeautifulStyle",class:"bkh67gx",propsAsIs:!1}),oe=n=>{const{title:e,children:t,description:o}=n,{ref:a,width:r,height:i}=ue();return s.createElement(un,null,s.createElement("h1",null,e),o,s.createElement("div",{className:"sizer"},s.createElement("div",{className:"sizer-clip",ref:a},s.createElement("div",{style:{position:"relative",width:r??100,height:i??100}},t))))},ae=B("p")({name:"Description",class:"d1deot3s",propsAsIs:!1}),M=B("p")({name:"MoreInfo",class:"m1ml0sw1",propsAsIs:!1}),se={smoothScrollX:!0,smoothScrollY:!0,isDraggable:!1,rowMarkers:"none",width:"100%"},dn={accentColor:"#4F5DFF",accentFg:"#FFFFFF",accentLight:"rgba(62, 116, 253, 0.1)",textDark:"#313139",textMedium:"#737383",textLight:"#B2B2C0",textBubble:"#313139",bgIconHeader:"#737383",fgIconHeader:"#FFFFFF",textHeader:"#313139",textGroupHeader:"#313139BB",textHeaderSelected:"#FFFFFF",bgCell:"#FFFFFF",bgCellMedium:"#FAFAFB",bgHeader:"#F7F7F8",bgHeaderHasFocus:"#E9E9EB",bgHeaderHovered:"#EFEFF1",bgBubble:"#EDEDF3",bgBubbleSelected:"#FFFFFF",headerIconSize:20,markerFontStyle:"13px",bgSearchResult:"#fff9e3",borderColor:"rgba(115, 116, 131, 0.16)",horizontalBorderColor:"rgba(115, 116, 131, 0.16)",drilldownBorder:"rgba(0, 0, 0, 0)",linkColor:"#4F5DFF",cellHorizontalPadding:8,cellVerticalPadding:3,headerFontStyle:"600 13px",baseFontStyle:"13px",editorFontSize:"13px",lineHeight:1.4,fontFamily:"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif"},pn=[{title:"A",width:200,group:"Group 1"},{title:"B",width:200,group:"Group 1"},{title:"C",width:200,group:"Group 2"},{title:"D",width:200,group:"Group 2"},{title:"E",width:200,group:"Group 2"}],H=()=>{const n=s.useRef({}),e=1e5,t=Ve({columns:pn,getCellContent:s.useCallback(([d,l])=>{if(d===0)return{kind:g.Text,allowOverlay:!0,data:`${l}`,displayData:`${l}`};const p=`${d},${l}`;n.current[p]===void 0&&(n.current[p]=F.name.firstName()+" "+F.name.lastName());const h=n.current[p];return{kind:g.Text,allowOverlay:!0,data:h,displayData:h}},[])}),[o,a]=s.useState(),r=Ye({columns:t.columns,getCellContent:t.getCellContent,rows:e,sort:o===void 0?void 0:{column:t.columns[o],direction:"desc",mode:"smart"}}),i=ke({columns:t.columns,theme:dn,freezeColumns:0}),f=s.useCallback(d=>{a(d)},[]);return s.createElement(oe,{title:"Custom source extensions",description:s.createElement(ae,null,"Fixme.")},s.createElement(re,{...se,...t,...r,...i,rows:e,onColumnMoved:t.onColumnMoved,onHeaderClicked:f}))};H.parameters={options:{showPanel:!1}};const D=()=>{const{cols:n,getCellContent:e,setCellValue:t}=on(6),o=s.useRef(null),{gridSelection:a,onCellEdited:r,onGridSelectionChange:i,undo:f,canRedo:d,canUndo:l,redo:p}=Je(o,e,t);return s.createElement(oe,{title:"Undo / Redo Support",description:s.createElement(ae,null,"A simple undo/redo implementation",s.createElement(M,null,"Use keyboard shortcuts CMD+Z and CMD+SHIFT+Z / CTRL+Z and CTRL+Y. Or click these buttons:",s.createElement("button",{onClick:f,disabled:!l,style:{opacity:l?1:.4}},"Undo"),s.createElement("button",{onClick:p,disabled:!d,style:{opacity:d?1:.4}},"Redo")),s.createElement(M,null,"It works by taking a snapshot of the content of a cell before it is edited and replaying any edits back."))},s.createElement(re,{...se,ref:o,onCellEdited:r,getCellContent:e,gridSelection:a??void 0,onGridSelectionChange:i,columns:n,rows:1e3}))};D.parameters={options:{showPanel:!1}};var Z,j,Y;M.parameters={...M.parameters,docs:{...(Z=M.parameters)==null?void 0:Z.docs,source:{originalSource:`styled.p\`
    font-size: 14px;
    flex-shrink: 0;
    margin: 0 0 20px 0;

    button {
        background-color: #f4f4f4;
        color: #2b2b2b;
        padding: 2px 6px;
        font-family: monospace;
        font-size: 14px;
        border-radius: 4px;
        box-shadow: 0px 1px 2px #00000040;
        margin: 0 0.1em;
        border: none;
        cursor: pointer;
    }
\``,...(Y=(j=M.parameters)==null?void 0:j.docs)==null?void 0:Y.source}}};var X,q,J;H.parameters={...H.parameters,docs:{...(X=H.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  const cache = React.useRef<Record<string, string>>({});
  const rows = 100_000;
  const moveArgs = useMoveableColumns({
    columns: cols,
    getCellContent: React.useCallback(([col, row]) => {
      if (col === 0) {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          data: \`\${row}\`,
          displayData: \`\${row}\`
        };
      }
      const key = \`\${col},\${row}\`;
      if (cache.current[key] === undefined) {
        cache.current[key] = faker.name.firstName() + " " + faker.name.lastName();
      }
      const d = cache.current[key];
      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        data: d,
        displayData: d
      };
    }, [])
  });
  const [sort, setSort] = React.useState<number>();
  const sortArgs = useColumnSort({
    columns: moveArgs.columns,
    getCellContent: moveArgs.getCellContent,
    rows,
    sort: sort === undefined ? undefined : {
      column: moveArgs.columns[sort],
      direction: "desc",
      mode: "smart"
    }
  });
  const collapseArgs = useCollapsingGroups({
    columns: moveArgs.columns,
    theme: testTheme,
    freezeColumns: 0
  });
  const onHeaderClick = React.useCallback((index: number) => {
    setSort(index);
  }, []);
  return <BeautifulWrapper title="Custom source extensions" description={<Description>Fixme.</Description>}>
            <DataEditor {...defaultProps} {...moveArgs} {...sortArgs} {...collapseArgs} rows={rows} onColumnMoved={moveArgs.onColumnMoved} onHeaderClicked={onHeaderClick} />
        </BeautifulWrapper>;
}`,...(J=(q=H.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var Q,ee,ne;D.parameters={...D.parameters,docs:{...(Q=D.parameters)==null?void 0:Q.docs,source:{originalSource:`() => {
  const {
    cols: columns,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(6);
  const gridRef = React.useRef<DataEditorRef>(null);
  const {
    gridSelection,
    onCellEdited,
    onGridSelectionChange,
    undo,
    canRedo,
    canUndo,
    redo
  } = useUndoRedo(gridRef, getCellContent, setCellValue);
  return <BeautifulWrapper title="Undo / Redo Support" description={<Description>
                    A simple undo/redo implementation
                    <MoreInfo>
                        Use keyboard shortcuts CMD+Z and CMD+SHIFT+Z / CTRL+Z and CTRL+Y. Or click these buttons:
                        <button onClick={undo} disabled={!canUndo} style={{
        opacity: canUndo ? 1 : 0.4
      }}>
                            Undo
                        </button>
                        <button onClick={redo} disabled={!canRedo} style={{
        opacity: canRedo ? 1 : 0.4
      }}>
                            Redo
                        </button>
                    </MoreInfo>
                    <MoreInfo>
                        It works by taking a snapshot of the content of a cell before it is edited and replaying any
                        edits back.
                    </MoreInfo>
                </Description>}>
            <DataEditor {...defaultProps} ref={gridRef} onCellEdited={onCellEdited} getCellContent={getCellContent} gridSelection={gridSelection ?? undefined} onGridSelectionChange={onGridSelectionChange} columns={columns} rows={1000} />
        </BeautifulWrapper>;
}`,...(ne=(ee=D.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};const wn=["MoreInfo","UseDataSource","UndoRedo"];export{M as MoreInfo,D as UndoRedo,H as UseDataSource,wn as __namedExportsOrder,vn as default};
