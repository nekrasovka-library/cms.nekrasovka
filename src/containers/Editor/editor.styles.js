import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  .ql-container,
  .ql-toolbar {
    border: none;
  }

  .ql-editor {
    padding: 0;
    font-size: 14px;
    ${({ $isEditorFocused }) =>
      $isEditorFocused && "background-color: rgba(0, 0, 0, 0.05) !important"};
  }

  .ql-toolbar {
    display: ${({ $isMenuOpen }) => ($isMenuOpen ? "none" : "flex")};
    align-content: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 60px;
    width: 100%;
    background-color: #fff;
    transition-duration: 0.4s;
    transition-property: transform;
    transition-timing-function: ease-in-out;
    transform: translateY(
      ${({ $isEditorFocused }) => ($isEditorFocused ? "0" : "-100%")}
    );
  }

  .ql-size {
    .ql-picker-label[data-value]::before {
      content: attr(data-value);
    }

    .ql-picker-item[data-value]::before {
      content: attr(data-value);
    }
  }
`;

export { Container };
