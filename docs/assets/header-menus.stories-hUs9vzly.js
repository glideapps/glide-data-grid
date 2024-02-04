import{j as n,F as p,a as l,s as y}from"./marked.esm-dbrxtycE.js";import{R as d}from"./index-BMVQvedj.js";import{u as H}from"./react-laag.esm-PpDllAFI.js";import{D as x}from"./data-editor-all-dpbiIcgh.js";import{B as D,D as R,P as O,a as S,d as w}from"./utils-SZqflNs-.js";import{S as A}from"./story-utils-K2EZnGjM.js";import"./index-wocATsGp.js";import"./iframe-X6AJfRqk.js";import"../sb-preview/runtime.js";import"./image-window-loader-dU4qzvAw.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-efMrkhNM.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";const J={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>n(A,{children:n(D,{title:"Header menus",description:n(p,{children:l(R,{children:["Headers on the data grid can be configured to support menus. We provide the events and the menu icon, you provide the menu. The menu icon can be modified via the"," ",n(O,{children:"menuIcon"})," prop."]})}),children:n(r,{})})})]},P=y("div")({name:"SimpleMenu",class:"s7szcfi",propsAsIs:!1}),i=()=>{const{cols:r,getCellContent:h,onColumnResize:C,setCellValue:g}=S(),f=d.useMemo(()=>r.map((t,s)=>s===2?{...t,hasMenu:!0,menuIcon:"dots"}:s===3?{...t,hasMenu:!0,menuIcon:"headerUri"}:{...t,hasMenu:!0}),[r]),[e,o]=d.useState(),u=e!==void 0,{layerProps:b,renderLayer:M}=H({isOpen:u,auto:!0,placement:"bottom-end",triggerOffset:2,onOutsideClick:()=>o(void 0),trigger:{getBounds:()=>({left:(e==null?void 0:e.bounds.x)??0,top:(e==null?void 0:e.bounds.y)??0,width:(e==null?void 0:e.bounds.width)??0,height:(e==null?void 0:e.bounds.height)??0,right:((e==null?void 0:e.bounds.x)??0)+((e==null?void 0:e.bounds.width)??0),bottom:((e==null?void 0:e.bounds.y)??0)+((e==null?void 0:e.bounds.height)??0)})}}),k=d.useCallback((t,s)=>{o({col:t,bounds:s})},[]),v=d.useCallback(()=>{console.log("Header clicked")},[]);return l(p,{children:[n(x,{...w,getCellContent:h,onHeaderMenuClick:k,onHeaderClicked:v,columns:f,onCellContextMenu:(t,s)=>s.preventDefault(),onCellEdited:g,onColumnResize:C,rows:1e3}),u&&M(l(P,{...b,children:[n("div",{onClick:()=>o(void 0),children:"These do nothing"}),n("div",{onClick:()=>o(void 0),children:"Add column right"}),n("div",{onClick:()=>o(void 0),children:"Add column left"}),n("div",{className:"danger",onClick:()=>o(void 0),children:"Delete"})]}))]})};var a,c,m;i.parameters={...i.parameters,docs:{...(a=i.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const realCols = React.useMemo(() => {
    return cols.map((c, index) => {
      if (index === 2) {
        return {
          ...c,
          hasMenu: true,
          menuIcon: "dots"
        };
      } else if (index === 3) {
        return {
          ...c,
          hasMenu: true,
          menuIcon: "headerUri"
        };
      }
      return {
        ...c,
        hasMenu: true
      };
    });
  }, [cols]);
  const [menu, setMenu] = React.useState<{
    col: number;
    bounds: Rectangle;
  }>();
  const isOpen = menu !== undefined;
  const {
    layerProps,
    renderLayer
  } = useLayer({
    isOpen,
    auto: true,
    placement: "bottom-end",
    triggerOffset: 2,
    onOutsideClick: () => setMenu(undefined),
    trigger: {
      getBounds: () => ({
        left: menu?.bounds.x ?? 0,
        top: menu?.bounds.y ?? 0,
        width: menu?.bounds.width ?? 0,
        height: menu?.bounds.height ?? 0,
        right: (menu?.bounds.x ?? 0) + (menu?.bounds.width ?? 0),
        bottom: (menu?.bounds.y ?? 0) + (menu?.bounds.height ?? 0)
      })
    }
  });
  const onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {
    setMenu({
      col,
      bounds
    });
  }, []);
  const onHeaderClicked = React.useCallback(() => {
    // eslint-disable-next-line no-console
    console.log("Header clicked");
  }, []);
  return <>
            <DataEditor {...defaultProps} getCellContent={getCellContent} onHeaderMenuClick={onHeaderMenuClick} onHeaderClicked={onHeaderClicked} columns={realCols} onCellContextMenu={(_, e) => e.preventDefault()} onCellEdited={setCellValue} onColumnResize={onColumnResize} rows={1000} />
            {isOpen && renderLayer(<SimpleMenu {...layerProps}>
                        <div onClick={() => setMenu(undefined)}>These do nothing</div>
                        <div onClick={() => setMenu(undefined)}>Add column right</div>
                        <div onClick={() => setMenu(undefined)}>Add column left</div>
                        <div className="danger" onClick={() => setMenu(undefined)}>
                            Delete
                        </div>
                    </SimpleMenu>)}
        </>;
}`,...(m=(c=i.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const Q=["HeaderMenus"];export{i as HeaderMenus,Q as __namedExportsOrder,J as default};
