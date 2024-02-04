import{j as t}from"./marked.esm-dbrxtycE.js";import{S as n}from"./story-utils-K2EZnGjM.js";import{D as i,M as d}from"./doc-wrapper-m1-LpzDL.js";import"./index-BMVQvedj.js";import"./toConsumableArray-ppDpjNRJ.js";const m={title:"Glide-Data-Grid/Docs",decorators:[s=>t(n,{children:t(s,{})})]},e=()=>t(i,{children:t(d,{children:`
# FAQ

### Nothing shows up? It crashes when I edit a cell?

Please read the [Prerequisites section in the docs](https://github.com/glideapps/glide-data-grid/blob/main/packages/core/API.md).

### Does it work with screen readers and other a11y tools?

Yes. Unfortunately none of the primary developers are accessibility users so there are likely flaws in the implementation we are not aware of. Bug reports welcome!

### Does it support my data source?

Yes.

Data Grid is agnostic about the way you load/store/generate/mutate your data. What it requires is that you tell it which columns you have, how many rows, and to give it a function it can call to get the data for a cell in a specific row and column.

### Does it do sorting?

Yes through the [glide-data-grid-source](https://www.npmjs.com/package/@glideapps/glide-data-grid-source) package.

### Does it do search?

Yes, built in! There are examples in the storybook.

### Can it filter?

Nothing built in yet. It is planned for the \`glide-data-grid-source\`.

### Can it do frozen columns?

Yes

### Can I render my own cells?

Yes

`})});e.storyName="00. FAQ";var a,o,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  return <DocWrapper>
            <Marked>
                {\`
# FAQ

### Nothing shows up? It crashes when I edit a cell?

Please read the [Prerequisites section in the docs](https://github.com/glideapps/glide-data-grid/blob/main/packages/core/API.md).

### Does it work with screen readers and other a11y tools?

Yes. Unfortunately none of the primary developers are accessibility users so there are likely flaws in the implementation we are not aware of. Bug reports welcome!

### Does it support my data source?

Yes.

Data Grid is agnostic about the way you load/store/generate/mutate your data. What it requires is that you tell it which columns you have, how many rows, and to give it a function it can call to get the data for a cell in a specific row and column.

### Does it do sorting?

Yes through the [glide-data-grid-source](https://www.npmjs.com/package/@glideapps/glide-data-grid-source) package.

### Does it do search?

Yes, built in! There are examples in the storybook.

### Can it filter?

Nothing built in yet. It is planned for the \\\`glide-data-grid-source\\\`.

### Can it do frozen columns?

Yes

### Can I render my own cells?

Yes

\`}
            </Marked>
        </DocWrapper>;
}`,...(r=(o=e.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const g=["FAQ"];export{e as FAQ,g as __namedExportsOrder,m as default};
