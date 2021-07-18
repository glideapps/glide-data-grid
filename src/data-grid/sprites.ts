import { withDefault } from "collection-utils";
import { IconProps } from "../common/utils";

const headerRowID = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");

    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path d="M15.75 4h-1.5a.25.25 0 00-.177.074L9.308 8.838a3.75 3.75 0 101.854 1.854l1.155-1.157.967.322a.5.5 0 00.65-.55l-.18-1.208.363-.363.727.331a.5.5 0 00.69-.59l-.254-.904.647-.647A.25.25 0 0016 5.75v-1.5a.25.25 0 00-.25-.25zM7.5 13.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" fill="${fg}"/>
  <defs>
    <clipPath id="clip0">
      <path fill="${fg}" d="M4 4h12v12H4z"/>
    </clipPath>
  </defs>
</svg>
    `;
};

const headerCode = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="16" height="16" rx="4" fill="${bg}" />
        <path
            d="M12.2235 13.3143L15.275 10.4875C15.575 10.2109 15.575 9.78077 15.275 9.50424L12.2235 6.68179C11.9535 6.43159 11.5892 6.44037 11.3578 6.70374C11.1264 6.96711 11.1521 7.34021 11.4135 7.58602L14.015 9.99586L11.4135 12.4057C11.1521 12.6515 11.1264 13.0246 11.3578 13.288C11.5892 13.5514 11.9535 13.5645 12.2235 13.3143ZM7.77916 13.3187C8.04488 13.5689 8.41346 13.5601 8.64489 13.2924C8.87632 13.029 8.85061 12.6559 8.58489 12.4101L5.98342 10.0002L8.58489 7.5948C8.85061 7.3446 8.87632 6.97588 8.64489 6.70812C8.41346 6.44475 8.04917 6.43598 7.77916 6.68618L4.7234 9.50863C4.42339 9.78516 4.42768 10.2197 4.7234 10.4919L7.77916 13.3187Z"
            fill="${fg}"
        />
    </svg>
    `;
};

const headerNumber = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M6.522 12.778H5.506v-4.04l-1.331.477V8.34l2.293-.828h.054v5.266zM11.729 12.778H8.137v-.688l1.704-1.83a6.38 6.38 0 00.336-.394c.092-.118.165-.225.22-.322.059-.099.1-.19.124-.275a.908.908 0 00-.01-.56.63.63 0 00-.146-.232.585.585 0 00-.22-.148.754.754 0 00-.282-.05c-.278 0-.485.076-.623.23-.135.155-.202.37-.202.648h-1.01c0-.234.045-.454.135-.662a1.667 1.667 0 01.965-.918c.232-.092.487-.138.767-.138.268 0 .504.038.709.112.207.075.38.18.517.315.14.135.246.298.319.488.072.188.108.397.108.626 0 .174-.028.34-.083.5a2.05 2.05 0 01-.232.466 4.157 4.157 0 01-.358.473c-.14.16-.295.327-.466.503l-.991 1.05h2.31v.806zM13.525 9.703h.546c.275 0 .479-.068.611-.206a.761.761 0 00.2-.546.806.806 0 00-.048-.282.555.555 0 00-.134-.22.593.593 0 00-.231-.145.93.93 0 00-.322-.051.922.922 0 00-.286.043.719.719 0 00-.231.127.575.575 0 00-.213.456H12.41c0-.215.043-.41.13-.586.09-.176.211-.327.365-.452.155-.128.336-.227.543-.297.21-.07.435-.105.676-.105.26 0 .5.033.716.098.217.063.403.158.557.286.155.125.274.282.359.47.086.185.13.401.13.647a1.151 1.151 0 01-.2.648 1.357 1.357 0 01-.574.488c.147.053.273.12.38.202a1.138 1.138 0 01.423.626c.033.126.05.258.05.398 0 .246-.047.465-.14.658a1.419 1.419 0 01-.388.489c-.164.13-.36.23-.586.3a2.512 2.512 0 01-.727.101c-.224 0-.443-.03-.658-.09a1.809 1.809 0 01-.568-.279 1.43 1.43 0 01-.401-.47 1.411 1.411 0 01-.149-.665h1.006a.664.664 0 00.22.503c.073.06.157.108.254.144.096.034.202.05.318.05.256 0 .456-.067.6-.202.145-.135.217-.318.217-.55a.973.973 0 00-.061-.365.614.614 0 00-.18-.25.745.745 0 00-.283-.144 1.329 1.329 0 00-.369-.047h-.546v-.782z" fill="${fg}"/>
</svg>
    `;
};

const headerString = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M8.182 12.4h3.636l.655 1.6H14l-3.454-8H9.455L6 14h1.527l.655-1.6zM10 7.44l1.36 3.651H8.64L10 7.441z" fill="${fg}"/>
</svg>
    `;
};

const headerBoolean = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.2222 2H3.77778C2.8 2 2 2.8 2 3.77778V16.2222C2 17.2 2.8 18 3.77778 18H16.2222C17.2 18 17.9911 17.2 17.9911 16.2222L18 3.77778C18 2.8 17.2 2 16.2222 2Z"
                fill="${bg}"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.66667 6.66669C5.73368 6.66669 4.16667 8.15907 4.16667 10C4.16667 11.841 5.73368 13.3334 7.66667 13.3334H12.3333C14.2663 13.3334 15.8333 11.841 15.8333 10C15.8333 8.15907 14.2663 6.66669 12.3333 6.66669H7.66667ZM12.5 12.5C13.8807 12.5 15 11.3807 15 10C15 8.61931 13.8807 7.50002 12.5 7.50002C11.1193 7.50002 10 8.61931 10 10C10 11.3807 11.1193 12.5 12.5 12.5Z"
                fill="${fg}"
            />
        </svg>
    `;
};

const headerAudioUri = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.667 6.667c-1.933 0-3.5 1.492-3.5 3.333 0 1.841 1.567 3.333 3.5 3.333h4.666c1.933 0 3.5-1.492 3.5-3.333 0-1.84-1.567-3.333-3.5-3.333H7.667zM12.5 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="${fg}"/>
</svg>
    `;
};

const headerVideoUri = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13.138a.5.5 0 00.748.434l5.492-3.138a.5.5 0 000-.868L7.748 6.427A.5.5 0 007 6.862v6.276z" fill="${fg}"/>
</svg>
    `;
};

const headerEmoji = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 5a5 5 0 100 10 5 5 0 000-10zm0 9.167A4.171 4.171 0 015.833 10 4.171 4.171 0 0110 5.833 4.171 4.171 0 0114.167 10 4.171 4.171 0 0110 14.167z" fill="${fg}"/>
  <path d="M8.333 8.215a.833.833 0 10-.037 1.666.833.833 0 00.037-1.666zm3.334 0a.833.833 0 10-.038 1.666.833.833 0 00.038-1.666z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.526 13.906c-1.04 2.082-4.011 2.082-5.052 0l.767-.383c.724 1.45 2.794 1.45 3.518 0l.767.383z" fill="${fg}"/>
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm0 11c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" fill="${fg}"/>
  <path d="M8 7.857a1 1 0 10-.045 2 1 1 0 00.045-2zm4 0a1 1 0 10-.045 2 1 1 0 00.045-2z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.526 11.906c-1.04 2.082-4.011 2.082-5.052 0l.766-.383c.725 1.45 2.795 1.45 3.52 0l.766.383z" fill="${fg}"/>
</svg>
    `;
};

const headerImage = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path opacity=".5" fill-rule="evenodd" clip-rule="evenodd" d="M12.499 10.801a.5.5 0 01.835 0l2.698 4.098a.5.5 0 01-.418.775H10.22a.5.5 0 01-.417-.775l2.697-4.098z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07 8.934a.5.5 0 01.824 0l4.08 5.958a.5.5 0 01-.412.782h-8.16a.5.5 0 01-.413-.782l4.08-5.958zM13.75 8.333a2.083 2.083 0 100-4.166 2.083 2.083 0 000 4.166z" fill="${fg}"/>
</svg>
    `;
};

const headerUri = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.29 4.947a3.368 3.368 0 014.723.04 3.375 3.375 0 01.041 4.729l-.009.009-1.596 1.597a3.367 3.367 0 01-5.081-.364.71.71 0 011.136-.85 1.95 1.95 0 002.942.21l1.591-1.593a1.954 1.954 0 00-.027-2.733 1.95 1.95 0 00-2.732-.027l-.91.907a.709.709 0 11-1.001-1.007l.915-.911.007-.007z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.55 8.678a3.368 3.368 0 015.082.364.71.71 0 01-1.136.85 1.95 1.95 0 00-2.942-.21l-1.591 1.593a1.954 1.954 0 00.027 2.733 1.95 1.95 0 002.73.028l.906-.906a.709.709 0 111.003 1.004l-.91.91-.008.01a3.368 3.368 0 01-4.724-.042 3.375 3.375 0 01-.041-4.728l.009-.009L6.55 8.678z" fill="${fg}"/>
</svg>
    `;
};

const headerPhone = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="${fg}" d="M3 3h14v14H3z"/>
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2zm-7.244 9.778h1.235c.143 0 .267.062.356.178l.978 1.288a.435.435 0 01-.045.578l-1.209 1.21a.45.45 0 01-.595.035A6.718 6.718 0 017.333 10c0-.613.09-1.209.25-1.778a6.678 6.678 0 012.115-3.298.44.44 0 01.595.036l1.21 1.209c.16.16.177.409.044.578l-.978 1.289a.426.426 0 01-.356.177H8.978a5.377 5.377 0 00-.311 1.778c0 .622.115 1.227.31 1.787z" fill="${bg}"/>
</svg>
    `;
};

const headerMarkdown = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M13.487 13.148l-2.32-3.265h1.4V7h1.866v2.883h1.4l-2.346 3.265zM11 12.998L9 13v-2.999l-1.5 1.922L6 10.001V13H4V7.002h2l1.5 2 1.5-2L11 7v5.998z" fill="${fg}"/>
</svg>
    `;
};

const headerDate = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M14.8 4.182h-.6V3H13v1.182H7V3H5.8v1.182h-.6c-.66 0-1.2.532-1.2 1.182v9.454C4 15.468 4.54 16 5.2 16h9.6c.66 0 1.2-.532 1.2-1.182V5.364c0-.65-.54-1.182-1.2-1.182zm0 10.636H5.2V7.136h9.6v7.682z" fill="${fg}"/>
</svg>
    `;
};

const headerTime = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M9.994 4A5.997 5.997 0 004 10c0 3.312 2.682 6 5.994 6A6.003 6.003 0 0016 10c0-3.312-2.688-6-6.006-6zM10 14.8A4.799 4.799 0 015.2 10c0-2.652 2.148-4.8 4.8-4.8 2.652 0 4.8 2.148 4.8 4.8 0 2.652-2.148 4.8-4.8 4.8z" fill="${fg}"/>
  <path d="M10 7H9v3.934L12.5 13l.5-.807-3-1.75V7z" fill="${fg}"/>
</svg>
    `;
};

const headerEmail = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 8.643a1.357 1.357 0 100 2.714 1.357 1.357 0 000-2.714zM7.357 10a2.643 2.643 0 115.286 0 2.643 2.643 0 01-5.286 0z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.589 4.898A5.643 5.643 0 0115.643 10v.5a2.143 2.143 0 01-4.286 0V8a.643.643 0 011.286 0v2.5a.857.857 0 001.714 0V10a4.357 4.357 0 10-1.708 3.46.643.643 0 01.782 1.02 5.643 5.643 0 11-5.842-9.582z" fill="${fg}"/>
</svg>
    `;
};

const headerReference = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="8" width="10" height="8" rx="2" fill="${bg}"/>
  <rect x="8" y="4" width="10" height="8" rx="2" fill="${bg}"/>
  <path d="M10.676 7.726V6l2.976 3.021-2.976 3.022v-1.77c-2.125 0-3.613.69-4.676 2.201.425-2.158 1.7-4.316 4.676-4.748z" fill="${fg}"/>
</svg>
    `;
};

const headerIfThenElse = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="${fg}" d="M4 3h12v14H4z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.6 2A1.6 1.6 0 002 3.6v12.8A1.6 1.6 0 003.6 18h12.8a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0016.4 2H3.6zm11.3 10.8a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7h-1.4a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.6-.693.117.117 0 00.1-.115V10.35a.117.117 0 00-.117-.116h-2.8a.117.117 0 00-.117.116v2.333c0 .064.053.117.117.117h.117a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7H9.3a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.117a.117.117 0 00.117-.117V10.35a.117.117 0 00-.117-.117h-2.8a.117.117 0 00-.117.117v2.342c0 .058.042.106.1.115a.7.7 0 01.6.693v1.4a.7.7 0 01-.7.7H5.1a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.35a.116.116 0 00.116-.117v-2.45c0-.515.418-.933.934-.933h2.917a.117.117 0 00.117-.117V6.85a.117.117 0 00-.117-.116h-2.45a.7.7 0 01-.7-.7V5.1a.7.7 0 01.7-.7h6.067a.7.7 0 01.7.7v.934a.7.7 0 01-.7.7h-2.45a.117.117 0 00-.118.116v2.333c0 .064.053.117.117.117H13.5c.516 0 .934.418.934.934v2.45c0 .063.052.116.116.116h.35z" fill="${bg}"/>
</svg>
    `;
};

const headerSingleValue = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path d="M9.98 13.327c.448 0 .739-.29.73-.748 0-.038 0-.066-.01-.094l-.16-1.675 1.451 1.048a.81.81 0 00.506.178c.365 0 .711-.319.711-.758 0-.3-.168-.543-.487-.674l-1.628-.777 1.628-.767c.319-.14.487-.375.487-.674 0-.45-.337-.758-.711-.758a.81.81 0 00-.506.178l-1.46 1.038.16-1.74c.009-.028.009-.056.009-.085.01-.458-.271-.758-.72-.758-.46 0-.759.319-.75.758 0 .029 0 .057.01.085l.159 1.74-1.47-1.038a.765.765 0 00-.495-.178c-.375 0-.721.318-.721.758 0 .3.168.533.487.674l1.628.767-1.619.768c-.318.14-.496.374-.496.683 0 .44.346.748.72.748a.776.776 0 00.497-.168l1.469-1.048-.16 1.675c-.008.028-.008.056-.008.094-.01.44.29.748.748.748z" fill="${fg}"/>
</svg>
    `;
};

const headerLookup = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path d="M8 5.833H5.833a.833.833 0 000 1.667H7.52a4.554 4.554 0 01.48-1.667zM7.673 9.167h-1.84a.833.833 0 000 1.666h2.715a4.571 4.571 0 01-.875-1.666zM5.833 12.5a.833.833 0 000 1.667h7.5a.833.833 0 100-1.667h-7.5zM14.63 9.593A3.019 3.019 0 0015.087 8c0-1.66-1.312-3-2.938-3C10.523 5 9.21 6.34 9.21 8s1.312 3 2.931 3c.575 0 1.11-.173 1.56-.467l2.038 2.08.927-.946-2.037-2.074zm-2.481.074c-.901 0-1.632-.747-1.632-1.667s.73-1.667 1.632-1.667c.901 0 1.632.747 1.632 1.667s-.731 1.667-1.632 1.667z" fill="${fg}"/>
</svg>
    `;
};

const headerTextTemplate = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path d="M7.676 4.726V3l2.976 3.021-2.976 3.022v-1.77c-2.125 0-3.613.69-4.676 2.201.425-2.158 1.7-4.316 4.676-4.748zM10.182 14.4h3.636l.655 1.6H16l-3.454-8h-1.091L8 16h1.527l.655-1.6zM12 9.44l1.36 3.65h-2.72L12 9.44z" fill="${fg}"/>
</svg>
    `;
};

const headerMath = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.167 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666H4.167z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.083 4.167a.833.833 0 10-1.666 0v4.166a.833.833 0 101.666 0V4.167zM11.667 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666h-4.166zM5.367 11.688a.833.833 0 00-1.179 1.179l2.947 2.946a.833.833 0 001.178-1.178l-2.946-2.947z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.313 12.867a.833.833 0 10-1.178-1.179l-2.947 2.947a.833.833 0 101.179 1.178l2.946-2.946z" fill="${fg}"/>
  <path d="M10.833 12.5c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833zM10.833 15c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833z" fill="${fg}"/>
</svg>
    `;
};

const headerRollup = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M10 8.837a1.163 1.163 0 100 2.326 1.163 1.163 0 000-2.326zm3.02 3.614a3.915 3.915 0 00.782-3.284.486.486 0 10-.952.198c.19.87-.024 1.78-.583 2.473a2.917 2.917 0 11-4.128-4.083 2.944 2.944 0 012.427-.62.486.486 0 10.177-.956 3.889 3.889 0 102.278 6.27l-.002.002zM10 4.167a5.836 5.836 0 00-5.444 7.93.486.486 0 10.907-.347 4.857 4.857 0 112.5 2.665.486.486 0 10-.408.884c.766.354 1.6.537 2.445.534a5.834 5.834 0 000-11.666zm3.022 3.508a.697.697 0 10-1.394 0 .697.697 0 001.394 0zm-6.974 5.347a.697.697 0 110 1.395.697.697 0 010-1.395z" fill="${fg}"/>
</svg>
    `;
};

const headerJoinStrings = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path d="M12.4 13.565c1.865-.545 3.645-2.083 3.645-4.396 0-1.514-.787-2.604-2.071-2.604C12.69 6.565 12 7.63 12 8.939c1.114.072 1.865.726 1.865 1.683 0 .933-.8 1.647-1.84 2.023l.375.92zM4 5h6v2H4zM4 9h5v2H4zM4 13h4v2H4z" fill="${fg}"/>
</svg>
    `;
};

const headerSplitString = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path d="M8.286 14.314c2.33-.681 4.556-2.604 4.556-5.495 0-1.892-.984-3.254-2.589-3.254-1.604 0-2.467 1.332-2.467 2.967 1.393.09 2.331.908 2.331 2.104 0 1.165-.999 2.058-2.3 2.528l.469 1.15z" fill="${fg}"/>
</svg>
    `;
};

const headerGeoDistance = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${bg}"/>
  <path d="M10 7a1 1 0 100-2v2zm0 6a1 1 0 100 2v-2zm0-8H7v2h3V5zm-3 6h5V9H7v2zm5 2h-2v2h2v-2zm1-1a1 1 0 01-1 1v2a3 3 0 003-3h-2zm-1-1a1 1 0 011 1h2a3 3 0 00-3-3v2zM4 8a3 3 0 003 3V9a1 1 0 01-1-1H4zm3-3a3 3 0 00-3 3h2a1 1 0 011-1V5z" fill="${fg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.856 12.014a.5.5 0 00-.712.702L5.409 14l-1.265 1.284a.5.5 0 00.712.702l1.255-1.274 1.255 1.274a.5.5 0 00.712-.702L6.813 14l1.265-1.284a.5.5 0 00-.712-.702L6.11 13.288l-1.255-1.274zM12.856 4.014a.5.5 0 00-.712.702L13.409 6l-1.265 1.284a.5.5 0 10.712.702l1.255-1.274 1.255 1.274a.5.5 0 10.712-.702L14.813 6l1.265-1.284a.5.5 0 00-.712-.702L14.11 5.288l-1.255-1.274z" fill="${fg}"/>
</svg>
    `;
};

const headerArray = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 7.25a.75.75 0 000-1.5h-6.5a.75.75 0 100 1.5h6.5zM15 10a.75.75 0 01-.75.75h-6.5a.75.75 0 010-1.5h6.5A.75.75 0 0115 10zm-.75 4.25a.75.75 0 000-1.5h-6.5a.75.75 0 000 1.5h6.5zm-8.987-7a.75.75 0 100-1.5.75.75 0 000 1.5zm.75 2.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-.75 4.25a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="${fg}"/>
</svg>
    `;
};

const rowOwnerOverlay = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 15v1h14v-2.5c0-.866-.442-1.55-.978-2.045-.529-.489-1.213-.857-1.9-1.131a12.094 12.094 0 00-2.478-.676A4 4 0 105 6a4 4 0 002.356 3.648c-.815.134-1.69.36-2.479.676-.686.274-1.37.642-1.9 1.13C2.443 11.95 2 12.635 2 13.5V15z" fill="${bg}" stroke="${fg}" stroke-width="2"/>
  <defs>
    <clipPath id="clip0">
      <path fill="#fff" d="M0 0h18v18H0z"/>
    </clipPath>
  </defs>
</svg>
    `;
};

const protectedColumnOverlay = (props: IconProps) => {
    const fg = withDefault(props.fgColor, "white");
    const bg = withDefault(props.bgColor, "currentColor");
    return `
<svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.429 6.043v-.186a3.858 3.858 0 00-7.715 0v.186A2.148 2.148 0 003 8.143v5.714C3 15.038 3.962 16 5.143 16H12c1.18 0 2.143-.962 2.143-2.143V8.143c0-1.034-.738-1.9-1.714-2.1zM7.857 6v-.143c0-.396.318-.714.714-.714.397 0 .715.318.715.714V6H7.857z" fill="${bg}" stroke="${fg}" stroke-width="2"/>
</svg>
`;
};

export const sprites = {
    headerRowID,
    headerNumber,
    headerCode,
    headerString,
    headerBoolean,
    headerAudioUri,
    headerVideoUri,
    headerEmoji,
    headerImage,
    headerUri,
    headerPhone,
    headerMarkdown,
    headerDate,
    headerTime,
    headerEmail,
    headerReference,
    headerIfThenElse,
    headerSingleValue,
    headerLookup,
    headerTextTemplate,
    headerMath,
    headerRollup,
    headerJoinStrings,
    headerSplitString,
    headerGeoDistance,
    headerArray,
    rowOwnerOverlay,
    protectedColumnOverlay,
};
