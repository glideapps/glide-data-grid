import{j as o,a as v}from"./marked.esm-dbrxtycE.js";import{R as p}from"./index-BMVQvedj.js";import{u as x,D as O}from"./data-editor-all-MRDpHEQ_.js";import{B as y,D as I,P as D,u as P,d as B}from"./utils-0sbaJdQp.js";import{S}from"./story-utils-K2EZnGjM.js";import{G as m}from"./image-window-loader-aCHQvgUN.js";import"./lodash-8jIGfDyZ.js";import"./iframe-MICdw5w5.js";import"../sb-preview/runtime.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-UJ5_dX2R.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const U={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>o(S,{children:o(y,{title:"Row Grouping",description:v(I,{children:["The ",o(D,{children:"rowGrouping"})," prop can be used to group and even fold rows."]}),children:o(l,{})})})]},s=l=>{const{cols:f,getCellContent:u}=P(100),d=1e3,[r,R]=p.useState(()=>({groups:[{headerIndex:0,isCollapsed:!1},{headerIndex:10,isCollapsed:!0,subGroups:[{headerIndex:15,isCollapsed:!1},{headerIndex:20,isCollapsed:!1}]},{headerIndex:30,isCollapsed:!1}],height:55,navigationBehavior:"block",selectionBehavior:"block-spanning",themeOverride:{bgCell:"rgba(0, 100, 255, 0.1)"}})),{mapper:t,getRowGroupingForPath:g,updateRowGroupingByPath:c}=x(r,d),b=p.useCallback(n=>{const{path:e,isGroupHeader:a}=t(n);if(a&&n[0]===0){const i=g(r.groups,e);R(C=>({...C,groups:c(C.groups,e,{isCollapsed:!i.isCollapsed})}))}},[g,t,r.groups,c]),k=p.useCallback(n=>{const{path:e,isGroupHeader:a,originalIndex:i}=t(n);return n[0]===0?{kind:m.Text,data:`Row ${JSON.stringify(e)}`,displayData:`Row ${JSON.stringify(e)}`,allowOverlay:!1}:a?{kind:m.Loading,allowOverlay:!1}:u(i)},[u,t]);return o(O,{...B,rowGrouping:r,height:"100%",rowMarkers:"both",freezeColumns:l.freezeColumns,getRowThemeOverride:(n,e,a)=>{if(e%2===0)return{bgCell:"rgba(0, 0, 0, 0.1)"}},onCellClicked:b,getCellContent:k,columns:f,rows:d})};var h,w,G;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`(p: {
  freezeColumns: number;
}) => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  const rows = 1000;
  const [rowGrouping, setRowGrouping] = React.useState<RowGroupingOptions>(() => ({
    groups: [{
      headerIndex: 0,
      isCollapsed: false
    }, {
      headerIndex: 10,
      isCollapsed: true,
      subGroups: [{
        headerIndex: 15,
        isCollapsed: false
      }, {
        headerIndex: 20,
        isCollapsed: false
      }]
    }, {
      headerIndex: 30,
      isCollapsed: false
    }],
    height: 55,
    navigationBehavior: "block",
    selectionBehavior: "block-spanning",
    themeOverride: {
      bgCell: "rgba(0, 100, 255, 0.1)"
    }
  }));
  const {
    mapper,
    getRowGroupingForPath,
    updateRowGroupingByPath
  } = useRowGrouping(rowGrouping, rows);
  const onCellClicked = React.useCallback((item: Item) => {
    const {
      path,
      isGroupHeader
    } = mapper(item);
    if (isGroupHeader && item[0] === 0) {
      const group = getRowGroupingForPath(rowGrouping.groups, path);
      setRowGrouping(prev => {
        const result: RowGroupingOptions = {
          ...prev,
          groups: updateRowGroupingByPath(prev.groups, path, {
            isCollapsed: !group.isCollapsed
          })
        };
        return result;
      });
    }
  }, [getRowGroupingForPath, mapper, rowGrouping.groups, updateRowGroupingByPath]);
  const getCellContentMangled = React.useCallback<DataEditorAllProps["getCellContent"]>(item => {
    const {
      path,
      isGroupHeader,
      originalIndex
    } = mapper(item);
    if (item[0] === 0) {
      return {
        kind: GridCellKind.Text,
        data: \`Row \${JSON.stringify(path)}\`,
        displayData: \`Row \${JSON.stringify(path)}\`,
        allowOverlay: false
      };
    } else if (isGroupHeader) {
      return {
        kind: GridCellKind.Loading,
        allowOverlay: false
        // span: [1, cols.length - 1],
      };
    }

    return getCellContent(originalIndex);
  }, [getCellContent, mapper]);
  return <DataEditor {...defaultProps} rowGrouping={rowGrouping} height="100%" rowMarkers="both" freezeColumns={p.freezeColumns} getRowThemeOverride={(_row, groupRow, _contentRow) => {
    if (groupRow % 2 === 0) {
      return {
        bgCell: "rgba(0, 0, 0, 0.1)"
      };
    }
    return undefined;
  }} onCellClicked={onCellClicked} getCellContent={getCellContentMangled} columns={cols}
  // verticalBorder={false}
  rows={rows} />;
}`,...(G=(w=s.parameters)==null?void 0:w.docs)==null?void 0:G.source}}};const V=["RowGrouping"];export{s as RowGrouping,V as __namedExportsOrder,U as default};
