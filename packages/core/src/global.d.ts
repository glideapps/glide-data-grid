import { CSSProp } from "styled-components";

declare module "react" {
    interface DOMAttributes<T> {
        css?: CSSProp;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicAttributes {
            css?: CSSProp;
        }
    }
}
