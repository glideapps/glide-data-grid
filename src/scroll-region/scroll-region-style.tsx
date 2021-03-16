import { browserIsSafari } from "../common/browser-detect";
import { styled } from "../common/styles";

export const ScrollRegionStyle = styled.div`
    .dvn-scroller {
        overflow: ${browserIsSafari ? "scroll" : "auto"};
        transform: translate3d(0, 0, 0);
    }

    .dvn-scroll-inner {
        pointer-events: none;
    }

    .dvn-underlay > * {
        position: absolute;
        left: 0;
        top: 0;
    }

    canvas {
        outline: none;

        * {
            height: 0;
        }
    }
`;
