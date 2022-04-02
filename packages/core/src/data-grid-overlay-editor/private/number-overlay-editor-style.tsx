import { styled } from "../../common/styles";

export const NumberOverlayEditorStyle = styled.div`
    display: flex;
    margin: 6px 0 3px;
    color: ${p => p.theme.textDark};

    > input {
        font-size: ${p => p.theme.editorFontSize};
        padding: 0;
        font-family: ${p => p.theme.fontFamily};
        color: ${p => p.theme.textDark};
        background-color: ${p => p.theme.bgCell};
    }
`;
