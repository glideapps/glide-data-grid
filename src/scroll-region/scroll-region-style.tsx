import { browserIsSafari } from "../common/browser-detect";
import { styled } from "../common/styles";

export const ScrollRegionStyle = styled.div`
    overflow: ${browserIsSafari ? "scroll" : "auto"};

    .dvn-scroll-inner > * {
        position: sticky;
        left: 0;
        top: 0;
    }

    canvas {
        outline: none;
    }
`;
