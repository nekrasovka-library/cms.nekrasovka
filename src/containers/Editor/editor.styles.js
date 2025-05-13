import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  .sun-editor {
    border: none;
  }

  .sun-editor-editable {
    padding: 0;
    background-color: ${({ $backgroundColor }) => $backgroundColor};

    ${({ $isEditorFocused }) =>
      $isEditorFocused && " > div {background-color: rgba(0, 0, 0, 0.05);}"};
  }

  .se-toolbar {
    display: ${({ $isModal }) => ($isModal ? "none" : "flex")};
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

  .se-btn-module,
  .se-menu-list,
  .se-menu-list li,
  .se-menu-list li button {
    height: 100%;
  }

  .se-menu-list li button {
    display: flex;
    align-items: center;
    min-width: 60px;
    margin: 0 !important;
  }
`;

export { Container };
