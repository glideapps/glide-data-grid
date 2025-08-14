var ae=Object.defineProperty;var ie=(n,e,t)=>e in n?ae(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var _=(n,e,t)=>ie(n,typeof e!="symbol"?e+"":e,t);import{s as B}from"./marked.esm-B4q_PBrm.js";import{R as x,g as le,r as s}from"./iframe-Iifyoimw.js";import{u as ce}from"./index.esm-pZ0ZBnMd.js";import{y as A}from"./index-D_kXk1yT.js";import{q as ue,s as de,u as pe,w as fe,x as me,i as ne,y as ge,z as Ce,A as ye,r as he,n as G}from"./throttle-BVHd-xO2.js";import{G as h,f as be,h as $,j as M,D as te}from"./data-editor-all-BqAFx8WH.js";import"./index-qADYP8W1.js";import"./flatten-Dm8ntmsO.js";function ke(n){const[e,t]=x.useState([]),[o,a]=x.useState(void 0),{columns:r,onGroupHeaderClicked:i,onGridSelectionChange:y,getGroupDetails:g,gridSelection:l,freezeColumns:p=0,theme:d}=n,S=l??o,c=x.useMemo(()=>{const m=[];let b=[-1,-1],v;for(let w=p;w<r.length;w++){const E=r[w].group??"",I=e.includes(E);v!==E&&b[0]!==-1&&(m.push(b),b=[-1,-1]),I&&b[0]!==-1?b[1]+=1:I?b=[w,1]:b[0]!==-1&&(m.push(b),b=[-1,-1]),v=E}return b[0]!==-1&&m.push(b),m},[e,r,p]),u=x.useMemo(()=>c.length===0?r:r.map((m,b)=>{for(const[v,w]of c)if(b>=v&&b<v+w){let F=8;return b===v+w-1&&(F=36),{...m,width:F,themeOverride:{bgCell:d.bgCellMedium}}}return m}),[r,c,d.bgCellMedium]),C=x.useCallback((m,b)=>{var w;i==null||i(m,b);const v=((w=u[m])==null?void 0:w.group)??"";v!==""&&(b.preventDefault(),t(F=>F.includes(v)?F.filter(E=>E!==v):[...F,v]))},[u,i]),k=x.useCallback(m=>{if(m.current!==void 0){const b=m.current.cell[0],v=u[b];t(w=>w.includes((v==null?void 0:v.group)??"")?w.filter(F=>F!==v.group):w)}y!==void 0?y(m):a(m)},[u,y]),f=x.useCallback(m=>({...g==null?void 0:g(m),name:m,overrideTheme:e.includes(m??"")?{bgHeader:d.bgHeaderHasFocus}:void 0}),[e,g,d.bgHeaderHasFocus]);return{columns:u,onGroupHeaderClicked:C,onGridSelectionChange:k,getGroupDetails:f,gridSelection:S}}var Se=de,ve=ue;function we(n,e){var t=-1,o=ve(n)?Array(n.length):[];return Se(n,function(a,r,i){o[++t]=e(a,r,i)}),o}var Ae=we;function Fe(n,e){var t=n.length;for(n.sort(e);t--;)n[t]=n[t].value;return n}var xe=Fe,O=pe;function Me(n,e){if(n!==e){var t=n!==void 0,o=n===null,a=n===n,r=O(n),i=e!==void 0,y=e===null,g=e===e,l=O(e);if(!y&&!l&&!r&&n>e||r&&i&&g&&!y&&!l||o&&i&&g||!t&&g||!a)return 1;if(!o&&!r&&!l&&n<e||l&&t&&a&&!o&&!r||y&&t&&a||!i&&a||!g)return-1}return 0}var Re=Me,Ee=Re;function He(n,e,t){for(var o=-1,a=n.criteria,r=e.criteria,i=a.length,y=t.length;++o<i;){var g=Ee(a[o],r[o]);if(g){if(o>=y)return g;var l=t[o];return g*(l=="desc"?-1:1)}}return n.index-e.index}var De=He,T=fe,Ue=ge,Ge=ye,Be=Ae,Te=xe,Ie=Ce,_e=De,$e=me,Oe=ne;function ze(n,e,t){e.length?e=T(e,function(r){return Oe(r)?function(i){return Ue(i,r.length===1?r[0]:r)}:r}):e=[$e];var o=-1;e=T(e,Ie(Ge));var a=Be(n,function(r,i,y){var g=T(e,function(l){return l(r)});return{criteria:g,index:++o,value:r}});return Te(a,function(r,i){return _e(r,i,t)})}var Ne=ze,Le=Ne,z=ne;function Ke(n,e,t,o){return n==null?[]:(z(e)||(e=e==null?[]:[e]),t=o?void 0:t,z(t)||(t=t==null?[]:[t]),Le(n,e,t))}var Pe=Ke;const N=le(Pe);function U(n){return n.id??`${n.group??""}/${n.title}`}function L(n,e){return typeof e=="string"?U(n)===e:U(n)===U(e)}function K(n,e,t){const o=e.indexOf(n);if(o===-1)return Number.MAX_SAFE_INTEGER;const a=t.findIndex(r=>L(n,r));if(a!==-1)return a;for(let r=o;r>=0;r--){const i=t.findIndex(y=>L(e[r],y));if(i!==-1)return i+.5}return-1}function Ve(n){const{columns:e,getCellContent:t,onColumnMoved:o}=n,[a,r]=s.useState(()=>e.map(U)),i=s.useMemo(()=>N(e,p=>K(p,e,a)),[a,e]),y=s.useRef(o);y.current=o;const g=s.useCallback((p,d)=>{var S;r(c=>{const u=[...c],[C]=u.splice(p,1);return u.splice(d,0,C),u}),(S=y.current)==null||S.call(y,p,d)},[]);s.useEffect(()=>{r(p=>N(e,d=>K(d,e,p)).map(U))},[e]);const l=s.useCallback(p=>{const[d,S]=p,c=i[d],u=e.indexOf(c);return t([u,S])},[i,e,t]);return{columns:i,onColumnMoved:g,getCellContent:l}}function We(n){var e,t;switch(n.kind){case h.Number:return((e=n.data)==null?void 0:e.toString())??"";case h.Boolean:return((t=n.data)==null?void 0:t.toString())??"";case h.Markdown:case h.RowID:case h.Text:case h.Uri:return n.data??"";case h.Bubble:case h.Image:return n.data.join("");case h.Drilldown:return n.data.map(o=>o.text).join("");case h.Protected:case h.Loading:return"";case h.Custom:return n.copyData}}function P(n){if(typeof n=="number")return n;if(n.length>0){const e=Number(n);isNaN(e)||(n=e)}return n}function Ze(n,e){return n=P(n),e=P(e),typeof n=="string"&&typeof e=="string"?n.localeCompare(e):typeof n=="number"&&typeof e=="number"?n===e?0:n>e?1:-1:n==e?0:n>e?1:-1}function je(n,e){return n>e?1:n===e?0:-1}function Ye(n){const{sort:e,rows:t,getCellContent:o}=n,a=s.useMemo(()=>e===void 0?[]:Array.isArray(e)?e:[e],[e]),r=s.useMemo(()=>a.map(l=>{const p=n.columns.findIndex(d=>l.column===d||d.id!==void 0&&l.column.id===d.id);return p===-1?void 0:p}),[a,n.columns]),i=s.useMemo(()=>{const l=a.map((d,S)=>({sort:d,col:r[S]})).filter(d=>d.col!==void 0);if(l.length===0)return;const p=l.map(()=>new Array(t));for(let d=0;d<l.length;d++){const{col:S}=l[d],c=[S,0];for(let u=0;u<t;u++)c[1]=u,p[d][u]=We(o(c))}return he(t).sort((d,S)=>{for(let c=0;c<l.length;c++){const{sort:u}=l[c],C=p[c][d],k=p[c][S];let f;if(u.mode==="raw"?f=je(C,k):u.mode==="smart"?f=Ze(C,k):f=C.localeCompare(k),f!==0)return(u.direction??"asc")==="desc"&&(f=-f),f}return 0})},[o,t,a,r]),y=s.useCallback(l=>i===void 0?l:i[l],[i]),g=s.useCallback(([l,p])=>i===void 0?o([l,p]):(p=i[p],o([l,p])),[o,i]);return i===void 0?{getCellContent:n.getCellContent,getOriginalIndex:y}:{getOriginalIndex:y,getCellContent:g}}const Xe={undoHistory:[],redoHistory:[],canUndo:!1,canRedo:!1,isApplyingUndo:!1,isApplyingRedo:!1};function qe(n,e){const t={...n};switch(e.type){case"undo":if(n.canUndo){t.undoHistory=[...n.undoHistory];const o=t.undoHistory.pop();return t.operation=o,t.canUndo=t.undoHistory.length>0,t.isApplyingUndo=!0,t}return n;case"redo":if(n.canRedo){t.redoHistory=[...n.redoHistory];const o=t.redoHistory.pop();return t.operation=o,t.canRedo=t.redoHistory.length>0,t.isApplyingRedo=!0,t}return n;case"operationApplied":return t.operation=void 0,t.isApplyingRedo=!1,t.isApplyingUndo=!1,t;case"edit":return!n.isApplyingRedo&&!n.isApplyingUndo&&(t.undoHistory=[...n.undoHistory,e.batch],t.redoHistory=[],t.canUndo=!0,t.canRedo=!1),n.isApplyingUndo&&(t.redoHistory=[...n.redoHistory,e.batch],t.canRedo=!0),n.isApplyingRedo&&(t.undoHistory=[...n.undoHistory,e.batch],t.canUndo=!0),t;default:throw new Error("Invalid action")}}function Je(n,e,t,o){const[a,r]=s.useReducer(qe,Xe),i=s.useRef(null),y=s.useRef(null),g=s.useRef(!1),l=s.useRef(!1);s.useEffect(()=>{g.current=a.isApplyingUndo,l.current=a.isApplyingRedo},[a.isApplyingUndo,a.isApplyingRedo]);const[p,d]=s.useState(null),S=s.useRef(null),c=s.useCallback(f=>{d(f),S.current=f},[o]),u=s.useCallback((f,m)=>{if(!(g.current||l.current)&&S.current){clearTimeout(y.current);const v=e(f);i.current===null&&(i.current={edits:[],selection:S.current}),i.current.edits.push({cell:f,newValue:v}),y.current=setTimeout(()=>{i.current&&(r({type:"edit",batch:i.current}),i.current=null)},0)}t(f,m)},[t,e]),C=s.useCallback(()=>{r({type:"undo"})},[r]),k=s.useCallback(()=>{r({type:"redo"})},[r]);return s.useEffect(()=>{if(a.operation&&S.current&&n.current){const f=[],m={edits:[],selection:S.current};for(const b of a.operation.edits){const v=e(b.cell);m.edits.push({cell:b.cell,newValue:v}),t(b.cell,b.newValue),f.push({cell:b.cell})}d(a.operation.selection),S.current=a.operation.selection,n.current.updateCells(f),r({type:"edit",batch:m}),r({type:"operationApplied"})}},[a.operation,n,t,d,e]),s.useEffect(()=>{const f=m=>{m.key==="z"&&(m.metaKey||m.ctrlKey)&&(m.shiftKey?k():C()),m.key==="y"&&(m.metaKey||m.ctrlKey)&&k()};return window.addEventListener("keydown",f),()=>{window.removeEventListener("keydown",f)}},[C,k]),s.useMemo(()=>({undo:C,redo:k,canUndo:a.canUndo,canRedo:a.canRedo,onCellEdited:u,onGridSelectionChange:c,gridSelection:p}),[C,k,u,a.canUndo,a.canRedo,c,p])}A.seed(1337);function Qe(n){return!!n}function en(n,e){var o;const t=n.data;if(typeof t==typeof e.data)return{...e,data:t};switch(e.kind){case h.Uri:return G(t)?{...e,data:t[0]}:{...e,data:(t==null?void 0:t.toString())??""};case h.Boolean:return G(t)?{...e,data:t[0]!==void 0}:n.kind===h.Boolean?{...e,data:n.data}:{...e,data:!!Qe(t)};case h.Image:return G(t)?{...e,data:[t[0]]}:{...e,data:[(t==null?void 0:t.toString())??""]};case h.Number:return{...e,data:0};case h.Text:case h.Markdown:return G(t)?{...e,data:t[0].toString()??""}:{...e,data:((o=n.data)==null?void 0:o.toString())??""};case h.Custom:return e}an()}function nn(n){const{getContent:e,...t}=n;return t}function V(n,e){const t=[{title:"First name",id:"First name",group:e?"Name":void 0,icon:M.HeaderString,hasMenu:!1,getContent:()=>{const r=A.name.firstName();return{kind:h.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"Last name",id:"Last name",group:e?"Name":void 0,icon:M.HeaderString,hasMenu:!1,getContent:()=>{const r=A.name.lastName();return{kind:h.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"Avatar",id:"Avatar",group:e?"Info":void 0,icon:M.HeaderImage,hasMenu:!1,getContent:()=>{const r=Math.round(Math.random()*100);return{kind:h.Image,data:[`https://picsum.photos/id/${r}/900/900`],displayData:[`https://picsum.photos/id/${r}/40/40`],allowOverlay:!0,readonly:!0}}},{title:"Email",id:"Email",group:e?"Info":void 0,icon:M.HeaderString,hasMenu:!1,getContent:()=>{const r=A.internet.email();return{kind:h.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"Title",id:"Title",group:e?"Info":void 0,icon:M.HeaderString,hasMenu:!1,getContent:()=>{const r=A.name.jobTitle();return{kind:h.Text,displayData:r,data:r,allowOverlay:!0,readonly:!0}}},{title:"More Info",id:"More Info",group:e?"Info":void 0,icon:M.HeaderUri,hasMenu:!1,getContent:()=>{const r=A.internet.url();return{kind:h.Uri,displayData:r,data:r,allowOverlay:!0,readonly:!0}}}];if(n<t.length)return t.slice(0,n);const o=n-t.length,a=[...new Array(o)].map((r,i)=>tn(i+t.length,e));return[...t,...a]}function tn(n,e){return{title:`Column ${n}`,id:`Column ${n}`,group:e?`Group ${Math.round(n/3)}`:void 0,icon:M.HeaderString,hasMenu:!1,getContent:()=>{const t=A.lorem.word();return{kind:h.Text,data:t,displayData:t,allowOverlay:!0,readonly:!0}}}}class rn{constructor(){_(this,"cachedContent",new Map)}get(e,t){const o=this.cachedContent.get(e);if(o!==void 0)return o[t]}set(e,t,o){let a=this.cachedContent.get(e);a===void 0&&this.cachedContent.set(e,a=[]),a[t]=o}}function on(n,e=!0,t=!1){const o=s.useRef(new rn),[a,r]=s.useState(()=>V(n,t));s.useEffect(()=>{r(V(n,t))},[t,n]);const i=s.useCallback((c,u)=>{r(C=>{const k=C.findIndex(m=>m.title===c.title),f=[...C];return f.splice(k,1,{...C[k],width:u}),f})},[]),y=s.useMemo(()=>a.map(nn),[a]),g=s.useRef(a);g.current=a;const l=s.useCallback(([c,u])=>{let C=o.current.get(c,u);return C===void 0&&(C=g.current[c].getContent(),!e&&be(C)&&(C={...C,readonly:e}),o.current.set(c,u,C)),C},[e]),p=s.useCallback(c=>{const u=[];for(let C=c.y;C<c.y+c.height;C++){const k=[];for(let f=c.x;f<c.x+c.width;f++)k.push(l([f,C]));u.push(k)}return u},[l]),d=s.useCallback(([c,u],C)=>{o.current.set(c,u,C)},[]),S=s.useCallback(([c,u],C)=>{let k=o.current.get(c,u);if(k===void 0&&(k=a[c].getContent()),$(C)&&$(k)){const f=en(C,k);o.current.set(c,u,{...f,displayData:typeof f.data=="string"?f.data:f.displayData,lastUpdated:performance.now()})}},[a]);return{cols:y,getCellContent:l,onColumnResize:i,setCellValue:S,getCellsForSelection:p,setCellValueRaw:d}}function sn(n="This should not happen"){throw new Error(n)}function an(n){return sn("Hell froze over")}A.seed(1337);const ln=B("div")({name:"SimpleWrapper",class:"ss4kmn3",propsAsIs:!1}),cn=n=>s.createElement(ln,null,s.createElement("div",{className:"content"},n.children)),vn={title:"Extra Packages/Source",decorators:[n=>s.createElement(cn,null,s.createElement(n,null))]},un=B("div")({name:"BeautifulStyle",class:"bkh67gx",propsAsIs:!1}),re=n=>{const{title:e,children:t,description:o}=n,{ref:a,width:r,height:i}=ce();return s.createElement(un,null,s.createElement("h1",null,e),o,s.createElement("div",{className:"sizer"},s.createElement("div",{className:"sizer-clip",ref:a},s.createElement("div",{style:{position:"relative",width:r??100,height:i??100}},t))))},oe=B("p")({name:"Description",class:"d1deot3s",propsAsIs:!1}),R=B("p")({name:"MoreInfo",class:"m1ml0sw1",propsAsIs:!1}),se={smoothScrollX:!0,smoothScrollY:!0,isDraggable:!1,rowMarkers:"none",width:"100%"},dn={accentColor:"#4F5DFF",accentFg:"#FFFFFF",accentLight:"rgba(62, 116, 253, 0.1)",textDark:"#313139",textMedium:"#737383",textLight:"#B2B2C0",textBubble:"#313139",bgIconHeader:"#737383",fgIconHeader:"#FFFFFF",textHeader:"#313139",textGroupHeader:"#313139BB",textHeaderSelected:"#FFFFFF",bgCell:"#FFFFFF",bgCellMedium:"#FAFAFB",bgHeader:"#F7F7F8",bgHeaderHasFocus:"#E9E9EB",bgHeaderHovered:"#EFEFF1",bgBubble:"#EDEDF3",bgBubbleSelected:"#FFFFFF",bubbleHeight:20,bubblePadding:6,bubbleMargin:4,headerIconSize:20,markerFontStyle:"13px",bgSearchResult:"#fff9e3",borderColor:"rgba(115, 116, 131, 0.16)",horizontalBorderColor:"rgba(115, 116, 131, 0.16)",drilldownBorder:"rgba(0, 0, 0, 0)",linkColor:"#4F5DFF",cellHorizontalPadding:8,cellVerticalPadding:3,headerFontStyle:"600 13px",baseFontStyle:"13px",editorFontSize:"13px",lineHeight:1.4,fontFamily:"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif"},pn=[{title:"A",width:200,group:"Group 1"},{title:"B",width:200,group:"Group 1"},{title:"C",width:200,group:"Group 2"},{title:"D",width:200,group:"Group 2"},{title:"E",width:200,group:"Group 2"}],H=()=>{const n=s.useRef({}),e=1e5,t=Ve({columns:pn,getCellContent:s.useCallback(([g,l])=>{if(g===0)return{kind:h.Text,allowOverlay:!0,data:`${l}`,displayData:`${l}`};const p=`${g},${l}`;n.current[p]===void 0&&(n.current[p]=A.name.firstName()+" "+A.name.lastName());const d=n.current[p];return{kind:h.Text,allowOverlay:!0,data:d,displayData:d}},[])}),[o,a]=s.useState(),r=Ye({columns:t.columns,getCellContent:t.getCellContent,rows:e,sort:o===void 0?void 0:{column:t.columns[o],direction:"desc",mode:"smart"}}),i=ke({columns:t.columns,theme:dn,freezeColumns:0}),y=s.useCallback(g=>{a(g)},[]);return s.createElement(re,{title:"Custom source extensions",description:s.createElement(oe,null,"Fixme.")},s.createElement(te,{...se,...t,...r,...i,rows:e,onColumnMoved:t.onColumnMoved,onHeaderClicked:y}))};H.parameters={options:{showPanel:!1}};const D=()=>{const{cols:n,getCellContent:e,setCellValue:t}=on(6),o=s.useRef(null),{gridSelection:a,onCellEdited:r,onGridSelectionChange:i,undo:y,canRedo:g,canUndo:l,redo:p}=Je(o,e,t);return s.createElement(re,{title:"Undo / Redo Support",description:s.createElement(oe,null,"A simple undo/redo implementation",s.createElement(R,null,"Use keyboard shortcuts CMD+Z and CMD+SHIFT+Z / CTRL+Z and CTRL+Y. Or click these buttons:",s.createElement("button",{onClick:y,disabled:!l,style:{opacity:l?1:.4}},"Undo"),s.createElement("button",{onClick:p,disabled:!g,style:{opacity:g?1:.4}},"Redo")),s.createElement(R,null,"It works by taking a snapshot of the content of a cell before it is edited and replaying any edits back."))},s.createElement(te,{...se,ref:o,onCellEdited:r,getCellContent:e,gridSelection:a??void 0,onGridSelectionChange:i,columns:n,rows:1e3}))};D.parameters={options:{showPanel:!1}};var W,Z,j;R.parameters={...R.parameters,docs:{...(W=R.parameters)==null?void 0:W.docs,source:{originalSource:`styled.p\`
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
\``,...(j=(Z=R.parameters)==null?void 0:Z.docs)==null?void 0:j.source}}};var Y,X,q;H.parameters={...H.parameters,docs:{...(Y=H.parameters)==null?void 0:Y.docs,source:{originalSource:`() => {
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
}`,...(q=(X=H.parameters)==null?void 0:X.docs)==null?void 0:q.source}}};var J,Q,ee;D.parameters={...D.parameters,docs:{...(J=D.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
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
}`,...(ee=(Q=D.parameters)==null?void 0:Q.docs)==null?void 0:ee.source}}};const wn=["MoreInfo","UseDataSource","UndoRedo"];export{R as MoreInfo,D as UndoRedo,H as UseDataSource,wn as __namedExportsOrder,vn as default};
