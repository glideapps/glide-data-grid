# Glide Data Grid

```shell
$ npm install @glideapps/glide-data-grid
# Install peer dependencies
$ npm install direction marked react-responsive-carousel styled-components
```

## FAQ

**It crashes when I try to edit a cell**  
Currently the data grid depends on there being a root level "portal" div in your HTML. Insert this snippet as the last child of your `<body>` tag.

```HTML
<div id="portal" />
```

**Nothing shows up**  
The data editor has no intrinisic size. This is likely to change in a future version, for now however the quickest way to give it a size is by wrapping it in a div with CSS like:

```CSS
.gridWrapper > :first-child {
  width: 800px;
  height: 500px;
}
```
