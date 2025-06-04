import styled from "styled-components";

const Container = styled.div`
  width: 100%;

  .sun-editor,
  .se-submenu {
    border: none;
  }

  .se-list-layer,
  .se-menu-list li button {
    border-radius: 0;
  }

  .se-submenu {
    min-width: 60px;
  }

  .se-btn-select.se-btn-tool-size,
  .se-btn-select.se-btn-tool-font {
    width: 100%;

    svg {
      margin-left: 10px;
    }
  }

  .sun-editor-editable {
    padding: 0;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    text-align: ${({ $textAlign }) => $textAlign};
    line-height: normal;
    height: 100%;

    ${({ $gap, $tracks }) =>
      $gap &&
      $tracks &&
      `display: grid !important; grid-template-columns: repeat(${$tracks}, 1fr); gap: ${$gap}px;`};
    ${({ $isEditorFocused }) =>
      $isEditorFocused && " > div {background-color: rgba(0, 0, 0, 0.05);}"};
  }

  .se-btn-tray {
    padding: 0;
  }

  .se-toolbar {
    display: ${({ $isModal }) => ($isModal ? "none" : "flex")};
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 60px;
    width: 100%;
    background-color: #fff;
    transition-duration: 0.4s;
    transition-property: opacity, transform;
    transition-timing-function: ease-in-out;
    opacity: ${({ $isEditorFocused }) => ($isEditorFocused ? "1" : "0")};
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
