import{j as n,F as p,a as l,s as y}from"./marked.esm-dbrxtycE.js";import{R as d}from"./index-BMVQvedj.js";import{u as H}from"./react-laag.esm-PpDllAFI.js";import{D as x}from"./data-editor-all-50ixdI5b.js";import{B as O,D as w,P as D,a as R,d as S}from"./utils-79SXuv2L.js";import{S as A}from"./story-utils-K2EZnGjM.js";import"./index-wocATsGp.js";import"./iframe-O3X4YIA0.js";import"../sb-preview/runtime.js";import"./image-window-loader-14Ewq8Gv.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-2HuByfij.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";const J={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>n(A,{children:n(O,{title:"Header menus",description:n(p,{children:l(w,{children:["Headers on the data grid can be configured to support menus. We provide the events and the menu icon, you provide the menu. The menu icon can be modified via the"," ",n(D,{children:"menuIcon"})," prop."]})}),children:n(s,{})})})]},I=y("div")({name:"SimpleMenu",class:"s7szcfi",propsAsIs:!1}),i=()=>{const{cols:s,getCellContent:h,onColumnResize:C,setCellValue:g}=R(),f=d.useMemo(()=>s.map((t,r)=>r===2?{...t,hasMenu:!0,menuIcon:"dots",overlayIcon:"rowOwnerOverlay"}:r===3?{...t,hasMenu:!0,menuIcon:"headerUri"}:{...t,hasMenu:!0}),[s]),[e,o]=d.useState(),a=e!==void 0,{layerProps:b,renderLayer:M}=H({isOpen:a,auto:!0,placement:"bottom-end",triggerOffset:2,onOutsideClick:()=>o(void 0),trigger:{getBounds:()=>({left:(e==null?void 0:e.bounds.x)??0,top:(e==null?void 0:e.bounds.y)??0,width:(e==null?void 0:e.bounds.width)??0,height:(e==null?void 0:e.bounds.height)??0,right:((e==null?void 0:e.bounds.x)??0)+((e==null?void 0:e.bounds.width)??0),bottom:((e==null?void 0:e.bounds.y)??0)+((e==null?void 0:e.bounds.height)??0)})}}),v=d.useCallback((t,r)=>{o({col:t,bounds:r})},[]),k=d.useCallback(()=>{console.log("Header clicked")},[]);return l(p,{children:[n(x,{...S,getCellContent:h,onHeaderMenuClick:v,onHeaderClicked:k,columns:f,onCellContextMenu:(t,r)=>r.preventDefault(),onCellEdited:g,onColumnResize:C,rows:1e3}),a&&M(l(I,{...b,children:[n("div",{onClick:()=>o(void 0),children:"These do nothing"}),n("div",{onClick:()=>o(void 0),children:"Add column right"}),n("div",{onClick:()=>o(void 0),children:"Add column left"}),n("div",{className:"danger",onClick:()=>o(void 0),children:"Delete"})]}))]})};var u,c,m;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
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
          menuIcon: "dots",
          overlayIcon: "rowOwnerOverlay"
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
