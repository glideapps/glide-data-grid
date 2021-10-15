import { styled } from "../../common/styles";

export const NumberOverlayEditorStyle = styled.div`
    display: flex;
    color: ${p => p.theme.textDark};

    > input {
        color: ${p => p.theme.textDark};
    }
`;
