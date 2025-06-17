var ce=Object.defineProperty;var ue=(n,e,t)=>e in n?ce(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var z=(n,e,t)=>(ue(n,typeof e!="symbol"?e+"":e,t),t);import{j as w,s as T,a as $}from"./marked.esm-dbrxtycE.js";import{R,g as de,r as l}from"./index-BMVQvedj.js";import{u as pe}from"./index.esm-Ejw8GwRl.js";import{y as x}from"./index-PWBWJyi_.js";import{m as fe,k as me,x as ge,y as Ce,z as ye,A as he,e as oe,a as be,w as G}from"./_baseIteratee-WTHxv43n.js";import{G as g,e as ke,f as N,h as M,D as se}from"./data-editor-all-wgVIJDEA.js";import{e as Se,r as I}from"./throttle-7EuXLZa7.js";import"./index-wocATsGp.js";import"./iframe-lW6lBOu1.js";import"../sb-preview/runtime.js";import"./flatten-qRvRBp6y.js";function ve(n){const[e,t]=R.useState([]),[o,s]=R.useState(void 0),{columns:r,onGroupHeaderClicked:a,onGridSelectionChange:f,getGroupDetails:d,gridSelection:i,freezeColumns:p=0,theme:b}=n,k=i??o,c=R.useMemo(()=>{const u=[];let C=[-1,-1],S;for(let F=p;F<r.length;F++){const D=r[F].group??"",O=e.includes(D);S!==D&&C[0]!==-1&&(u.push(C),C=[-1,-1]),O&&C[0]!==-1?C[1]+=1:O?C=[F,1]:C[0]!==-1&&(u.push(C),C=[-1,-1]),S=D}return C[0]!==-1&&u.push(C),u},[e,r,p]),y=R.useMemo(()=>c.length===0?r:r.map((u,C)=>{for(const[S,F]of c)if(C>=S&&C<S+F){let A=8;return C===S+F-1&&(A=36),{...u,width:A,themeOverride:{bgCell:b.bgCellMedium}}}return u}),[r,c,b.bgCellMedium]),m=R.useCallback((u,C)=>{var F;a==null||a(u,C);const S=((F=y[u])==null?void 0:F.group)??"";S!==""&&(C.preventDefault(),t(A=>A.includes(S)?A.filter(D=>D!==S):[...A,S]))},[y,a]),v=R.useCallback(u=>{if(u.current!==void 0){const C=u.current.cell[0],S=y[C];t(F=>F.includes((S==null?void 0:S.group)??"")?F.filter(A=>A!==S.group):F)}f!==void 0?f(u):s(u)},[y,f]),h=R.useCallback(u=>({...d==null?void 0:d(u),name:u,overrideTheme:e.includes(u??"")?{bgHeader:b.bgHeaderHasFocus}:void 0}),[e,d,b.bgHeaderHasFocus]);return{columns:y,onGroupHeaderClicked:m,onGridSelectionChange:v,getGroupDetails:h,gridSelection:k}}var we=Se,Fe=fe;function xe(n,e){var t=-1,o=Fe(n)?Array(n.length):[];return we(n,function(s,r,a){o[++t]=e(s,r,a)}),o}var Ae=xe;function Re(n,e){var t=n.length;for(n.sort(e);t--;)n[t]=n[t].value;return n}var Me=Re,L=me;function He(n,e){if(n!==e){var t=n!==void 0,o=n===null,s=n===n,r=L(n),a=e!==void 0,f=e===null,d=e===e,i=L(e);if(!f&&!i&&!r&&n>e||r&&a&&d&&!f&&!i||o&&a&&d||!t&&d||!s)return 1;if(!o&&!r&&!i&&n<e||i&&t&&s&&!o&&!r||f&&t&&s||!a&&s||!d)return-1}return 0}var De=He,Ue=De;function Ee(n,e,t){for(var o=-1,s=n.criteria,r=e.criteria,a=s.length,f=t.length;++o<a;){var d=Ue(s[o],r[o]);if(d){if(o>=f)return d;var i=t[o];return d*(i=="desc"?-1:1)}}return n.index-e.index}var Be=Ee,_=ge,Ge=ye,Te=be,Ie=Ae,_e=Me,$e=he,Oe=Be,ze=Ce,Ne=oe;function Le(n,e,t){e.length?e=_(e,function(r){return Ne(r)?function(a){return Ge(a,r.length===1?r[0]:r)}:r}):e=[ze];var o=-1;e=_(e,$e(Te));var s=Ie(n,function(r,a,f){var d=_(e,function(i){return i(r)});return{criteria:d,index:++o,value:r}});return _e(s,function(r,a){return Oe(r,a,t)})}var Ke=Le,Pe=Ke,K=oe;function Ve(n,e,t,o){return n==null?[]:(K(e)||(e=e==null?[]:[e]),t=o?void 0:t,K(t)||(t=t==null?[]:[t]),Pe(n,e,t))}var We=Ve;const P=de(We);function B(n){return n.id??`${n.group??""}/${n.title}`}function V(n,e){return typeof e=="string"?B(n)===e:B(n)===B(e)}function W(n,e,t){const o=e.indexOf(n);if(o===-1)return Number.MAX_SAFE_INTEGER;const s=t.findIndex(r=>V(n,r));if(s!==-1)return s;for(let r=o;r>=0;r--){const a=t.findIndex(f=>V(e[r],f));if(a!==-1)return a+.5}return-1}function je(n){const{columns:e,getCellContent:t,onColumnMoved:o}=n,[s,r]=l.useState(()=>e.map(B)),a=l.useMemo(()=>P(e,p=>W(p,e,s)),[s,e]),f=l.useRef(o);f.current=o;const d=l.useCallback((p,b)=>{var k;r(c=>{const y=[...c],[m]=y.splice(p,1);return y.splice(b,0,m),y}),(k=f.current)==null||k.call(f,p,b)},[]);l.useEffect(()=>{r(p=>P(e,b=>W(b,e,p)).map(B))},[e]);const i=l.useCallback(p=>{const[b,k]=p,c=a[b],y=e.indexOf(c);return t([y,k])},[a,e,t]);return{columns:a,onColumnMoved:d,getCellContent:i}}function Ze(n){var e,t;switch(n.kind){case g.Number:return((e=n.data)==null?void 0:e.toString())??"";case g.Boolean:return((t=n.data)==null?void 0:t.toString())??"";case g.Markdown:case g.RowID:case g.Text:case g.Uri:return n.data??"";case g.Bubble:case g.Image:return n.data.join("");case g.Drilldown:return n.data.map(o=>o.text).join("");case g.Protected:case g.Loading:return"";case g.Custom:return n.copyData}}function j(n){if(typeof n=="number")return n;if(n.length>0){const e=Number(n);isNaN(e)||(n=e)}return n}function Ye(n,e){return n=j(n),e=j(e),typeof n=="string"&&typeof e=="string"?n.localeCompare(e):typeof n=="number"&&typeof e=="number"?n===e?0:n>e?1:-1:n==e?0:n>e?1:-1}function Xe(n,e){return n>e?1:n===e?0:-1}function qe(n){const{sort:e,rows:t,getCellContent:o}=n;let s=e===void 0?void 0:n.columns.findIndex(i=>e.column===i||i.id!==void 0&&e.column.id===i.id);s===-1&&(s=void 0);const r=(e==null?void 0:e.direction)??"asc",a=l.useMemo(()=>{if(s===void 0)return;const i=new Array(t),p=[s,0];for(let k=0;k<t;k++)p[1]=k,i[k]=Ze(o(p));let b;return(e==null?void 0:e.mode)==="raw"?b=I(t).sort((k,c)=>Xe(i[k],i[c])):(e==null?void 0:e.mode)==="smart"?b=I(t).sort((k,c)=>Ye(i[k],i[c])):b=I(t).sort((k,c)=>i[k].localeCompare(i[c])),r==="desc"&&b.reverse(),b},[o,t,e==null?void 0:e.mode,r,s]),f=l.useCallback(i=>a===void 0?i:a[i],[a]),d=l.useCallback(([i,p])=>a===void 0?o([i,p]):(p=a[p],o([i,p])),[o,a]);return a===void 0?{getCellContent:n.getCellContent,getOriginalIndex:f}:{getOriginalIndex:f,getCellContent:d}}const Je={undoHistory:[],redoHistory:[],canUndo:!1,canRedo:!1,isApplyingUndo:!1,isApplyingRedo:!1};function Qe(n,e){const t={...n};switch(e.type){case"undo":if(n.canUndo){t.undoHistory=[...n.undoHistory];const o=t.undoHistory.pop();return t.operation=o,t.canUndo=t.undoHistory.length>0,t.isApplyingUndo=!0,t}return n;case"redo":if(n.canRedo){t.redoHistory=[...n.redoHistory];const o=t.redoHistory.pop();return t.operation=o,t.canRedo=t.redoHistory.length>0,t.isApplyingRedo=!0,t}return n;case"operationApplied":return t.operation=void 0,t.isApplyingRedo=!1,t.isApplyingUndo=!1,t;case"edit":return!n.isApplyingRedo&&!n.isApplyingUndo&&(t.undoHistory=[...n.undoHistory,e.batch],t.redoHistory=[],t.canUndo=!0,t.canRedo=!1),n.isApplyingUndo&&(t.redoHistory=[...n.redoHistory,e.batch],t.canRedo=!0),n.isApplyingRedo&&(t.undoHistory=[...n.undoHistory,e.batch],t.canUndo=!0),t;default:throw new Error("Invalid action")}}function en(n,e,t,o){const[s,r]=l.useReducer(Qe,Je),a=l.useRef(null),f=l.useRef(null),d=l.useRef(!1),i=l.useRef(!1);l.useEffect(()=>{d.current=s.isApplyingUndo,i.current=s.isApplyingRedo},[s.isApplyingUndo,s.isApplyingRedo]);const[p,b]=l.useState(null),k=l.useRef(null),c=l.useCallback(h=>{o&&o(h),b(h),k.current=h},[o]),y=l.useCallback((h,u)=>{if(!(d.current||i.current)&&k.current){clearTimeout(f.current);const S=e(h);a.current===null&&(a.current={edits:[],selection:k.current}),a.current.edits.push({cell:h,newValue:S}),f.current=setTimeout(()=>{a.current&&(r({type:"edit",batch:a.current}),a.current=null)},0)}t(h,u)},[t,e]),m=l.useCallback(()=>{r({type:"undo"})},[r]),v=l.useCallback(()=>{r({type:"redo"})},[r]);return l.useEffect(()=>{if(s.operation&&k.current&&n.current){const h=[],u={edits:[],selection:k.current};for(const C of s.operation.edits){const S=e(C.cell);u.edits.push({cell:C.cell,newValue:S}),t(C.cell,C.newValue),h.push({cell:C.cell})}b(s.operation.selection),k.current=s.operation.selection,n.current.updateCells(h),r({type:"edit",batch:u}),r({type:"operationApplied"})}},[s.operation,n,t,b,e]),l.useEffect(()=>{const h=u=>{u.key==="z"&&(u.metaKey||u.ctrlKey)&&(u.shiftKey?v():m()),u.key==="y"&&(u.metaKey||u.ctrlKey)&&v()};return window.addEventListener("keydown",h),()=>{window.removeEventListener("keydown",h)}},[m,v]),l.useMemo(()=>({undo:m,redo:v,canUndo:s.canUndo,canRedo:s.canRedo,onCellEdited:y,onGridSelectionChange:c,gridSelection:p}),[m,v,y,s.canUndo,s.canRedo,c,p])}x.seed(1337);function nn(n){return!!n}function tn(n,e){var o;const t=n.data;if(typeof t==typeof e.data)return{...e,data:t};switch(e.kind){case g.Uri:return G(t)?{...e,data:t[0]}:{...e,data:(t==null?void 0:t.toString())??""};case g.Boolean:return G(t)?{...e,data:t[0]!==void 0}:n.kind===g.Boolean?{...e,data:n.data}:{...e,data:!!nn(t)};case g.Image:return G(t)?{...e,data:[t[0]]}:{...e,data:[(t==null?void 0:t.toString())??""]};case g.Number:return{...e,data:0};case g.Text:case g.Markdown:return G(t)?{...e,data:t[0].toString()??""}:{...e,data:((o=n.data)==null?void 0:o.toString())??""};case g.Custom:return e}cn()}function rn(n){const{getContent:e,...t}=n;return t}function Z(n,e){const t=[{title:"First name",id:"First name",group:e?"Name":void 0,icon:M.HeaderString,hasMenu:!1,getContent:()=>{const r=x.name.firstName();return{kind:g.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"Last name",id:"Last name",group:e?"Name":void 0,icon:M.HeaderString,hasMenu:!1,getContent:()=>{const r=x.name.lastName();return{kind:g.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"Avatar",id:"Avatar",group:e?"Info":void 0,icon:M.HeaderImage,hasMenu:!1,getContent:()=>{const r=Math.round(Math.random()*100);return{kind:g.Image,data:[`https://picsum.photos/id/${r}/900/900`],displayData:[`https://picsum.photos/id/${r}/40/40`],allowOverlay:!0,readonly:!0}}},{title:"Email",id:"Email",group:e?"Info":void 0,icon:M.HeaderString,hasMenu:!1,getContent:()=>{const r=x.internet.email();return{kind:g.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"Title",id:"Title",group:e?"Info":void 0,icon:M.HeaderString,hasMenu:!1,getContent:()=>{const r=x.name.jobTitle();return{kind:g.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"More Info",id:"More Info",group:e?"Info":void 0,icon:M.HeaderUri,hasMenu:!1,getContent:()=>{const r=x.internet.url();return{kind:g.Uri,displayData:r,data:r,allowOverlay:!0,readonly:!0}}}];if(n<t.length)return t.slice(0,n);const o=n-t.length,s=[...new Array(o)].map((r,a)=>on(a+t.length,e));return[...t,...s]}function on(n,e){return{title:`Column ${n}`,id:`Column ${n}`,group:e?`Group ${Math.round(n/3)}`:void 0,icon:M.HeaderString,hasMenu:!1,getContent:()=>{const t=x.lorem.word();return{kind:g.Text,data:t,displayData:t,allowOverlay:!0,readonly:!0}}}}class sn{constructor(){z(this,"cachedContent",new Map)}get(e,t){const o=this.cachedContent.get(e);if(o!==void 0)return o[t]}set(e,t,o){let s=this.cachedContent.get(e);s===void 0&&this.cachedContent.set(e,s=[]),s[t]=o}}function an(n,e=!0,t=!1){const o=l.useRef(new sn),[s,r]=l.useState(()=>Z(n,t));l.useEffect(()=>{r(Z(n,t))},[t,n]);const a=l.useCallback((c,y)=>{r(m=>{const v=m.findIndex(u=>u.title===c.title),h=[...m];return h.splice(v,1,{...m[v],width:y}),h})},[]),f=l.useMemo(()=>s.map(rn),[s]),d=l.useRef(s);d.current=s;const i=l.useCallback(([c,y])=>{let m=o.current.get(c,y);return m===void 0&&(m=d.current[c].getContent(),!e&&ke(m)&&(m={...m,readonly:e}),o.current.set(c,y,m)),m},[e]),p=l.useCallback(c=>{const y=[];for(let m=c.y;m<c.y+c.height;m++){const v=[];for(let h=c.x;h<c.x+c.width;h++)v.push(i([h,m]));y.push(v)}return y},[i]),b=l.useCallback(([c,y],m)=>{o.current.set(c,y,m)},[]),k=l.useCallback(([c,y],m)=>{let v=o.current.get(c,y);if(v===void 0&&(v=s[c].getContent()),N(m)&&N(v)){const h=tn(m,v);o.current.set(c,y,{...h,displayData:typeof h.data=="string"?h.data:h.displayData,lastUpdated:performance.now()})}},[s]);return{cols:f,getCellContent:i,onColumnResize:a,setCellValue:k,getCellsForSelection:p,setCellValueRaw:b}}function ln(n="This should not happen"){throw new Error(n)}function cn(n){return ln("Hell froze over")}x.seed(1337);const un=T("div")({name:"SimpleWrapper",class:"ss4kmn3",propsAsIs:!1}),dn=n=>w(un,{children:w("div",{className:"content",children:n.children})}),Rn={title:"Extra Packages/Source",decorators:[n=>w(dn,{children:w(n,{})})]},pn=T("div")({name:"BeautifulStyle",class:"bkh67gx",propsAsIs:!1}),ae=n=>{const{title:e,children:t,description:o}=n,{ref:s,width:r,height:a}=pe();return $(pn,{children:[w("h1",{children:e}),o,w("div",{className:"sizer",children:w("div",{className:"sizer-clip",ref:s,children:w("div",{style:{position:"relative",width:r??100,height:a??100},children:t})})})]})},ie=T("p")({name:"Description",class:"d1deot3s",propsAsIs:!1}),H=T("p")({name:"MoreInfo",class:"m1ml0sw1",propsAsIs:!1}),le={smoothScrollX:!0,smoothScrollY:!0,isDraggable:!1,rowMarkers:"none",width:"100%"},fn={accentColor:"#4F5DFF",accentFg:"#FFFFFF",accentLight:"rgba(62, 116, 253, 0.1)",textDark:"#313139",textMedium:"#737383",textLight:"#B2B2C0",textBubble:"#313139",bgIconHeader:"#737383",fgIconHeader:"#FFFFFF",textHeader:"#313139",textGroupHeader:"#313139BB",textHeaderSelected:"#FFFFFF",bgCell:"#FFFFFF",bgCellMedium:"#FAFAFB",bgHeader:"#F7F7F8",bgHeaderHasFocus:"#E9E9EB",bgHeaderHovered:"#EFEFF1",bgBubble:"#EDEDF3",bgBubbleSelected:"#FFFFFF",headerIconSize:20,markerFontStyle:"13px",bgSearchResult:"#fff9e3",borderColor:"rgba(115, 116, 131, 0.16)",horizontalBorderColor:"rgba(115, 116, 131, 0.16)",drilldownBorder:"rgba(0, 0, 0, 0)",linkColor:"#4F5DFF",cellHorizontalPadding:8,cellVerticalPadding:3,headerFontStyle:"600 13px",baseFontStyle:"13px",editorFontSize:"13px",lineHeight:1.4,fontFamily:"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif"},mn=[{title:"A",width:200,group:"Group 1"},{title:"B",width:200,group:"Group 1"},{title:"C",width:200,group:"Group 2"},{title:"D",width:200,group:"Group 2"},{title:"E",width:200,group:"Group 2"}],U=()=>{const n=l.useRef({}),e=1e5,t=je({columns:mn,getCellContent:l.useCallback(([d,i])=>{if(d===0)return{kind:g.Text,allowOverlay:!0,data:`${i}`,displayData:`${i}`};const p=`${d},${i}`;n.current[p]===void 0&&(n.current[p]=x.name.firstName()+" "+x.name.lastName());const b=n.current[p];return{kind:g.Text,allowOverlay:!0,data:b,displayData:b}},[])}),[o,s]=l.useState(),r=qe({columns:t.columns,getCellContent:t.getCellContent,rows:e,sort:o===void 0?void 0:{column:t.columns[o],direction:"desc",mode:"smart"}}),a=ve({columns:t.columns,theme:fn,freezeColumns:0}),f=l.useCallback(d=>{s(d)},[]);return w(ae,{title:"Custom source extensions",description:w(ie,{children:"Fixme."}),children:w(se,{...le,...t,...r,...a,rows:e,onColumnMoved:t.onColumnMoved,onHeaderClicked:f})})};U.parameters={options:{showPanel:!1}};const E=()=>{const{cols:n,getCellContent:e,setCellValue:t}=an(6),o=l.useRef(null),{gridSelection:s,onCellEdited:r,onGridSelectionChange:a,undo:f,canRedo:d,canUndo:i,redo:p}=en(o,e,t);return w(ae,{title:"Undo / Redo Support",description:$(ie,{children:["A simple undo/redo implementation",$(H,{children:["Use keyboard shortcuts CMD+Z and CMD+SHIFT+Z / CTRL+Z and CTRL+Y. Or click these buttons:",w("button",{onClick:f,disabled:!i,style:{opacity:i?1:.4},children:"Undo"}),w("button",{onClick:p,disabled:!d,style:{opacity:d?1:.4},children:"Redo"})]}),w(H,{children:"It works by taking a snapshot of the content of a cell before it is edited and replaying any edits back."})]}),children:w(se,{...le,ref:o,onCellEdited:r,getCellContent:e,gridSelection:s??void 0,onGridSelectionChange:a,columns:n,rows:1e3})})};E.parameters={options:{showPanel:!1}};var Y,X,q;H.parameters={...H.parameters,docs:{...(Y=H.parameters)==null?void 0:Y.docs,source:{originalSource:`styled.p\`
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
\``,...(q=(X=H.parameters)==null?void 0:X.docs)==null?void 0:q.source}}};var J,Q,ee;U.parameters={...U.parameters,docs:{...(J=U.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
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
}`,...(ee=(Q=U.parameters)==null?void 0:Q.docs)==null?void 0:ee.source}}};var ne,te,re;E.parameters={...E.parameters,docs:{...(ne=E.parameters)==null?void 0:ne.docs,source:{originalSource:`() => {
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
}`,...(re=(te=E.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};const Mn=["MoreInfo","UseDataSource","UndoRedo"];export{H as MoreInfo,E as UndoRedo,U as UseDataSource,Mn as __namedExportsOrder,Rn as default};
