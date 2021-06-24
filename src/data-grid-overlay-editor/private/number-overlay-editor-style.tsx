import { styled } from "../../common/styles";

export const NumberOverlayEditorStyle = styled.div`
    display: flex;
    color: ${p => p.theme.fgColorDark};

    > input {
        color: ${p => p.theme.fgColorDark};
    }
`;
