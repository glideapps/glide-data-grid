import { styled } from "../../common/styles";

export const NumberOverlayEditorStyle = styled.div`
    display: flex;
    margin-top: 6px;
    color: ${p => p.theme.textDark};

    > input {
        font-size: ${p => p.theme.fontSize};
        padding: 0;
        font-family: ${p => p.theme.fontFamily};
        color: ${p => p.theme.textDark};
    }
`;
