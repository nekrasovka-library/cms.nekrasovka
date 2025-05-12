import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Container } from "./editor.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { TOOLBAR_OPTIONS } from "./editor.constants.js";

const initializeSunEditor = () => {
  return {
    buttonList: TOOLBAR_OPTIONS,
    defaultStyle: "font-size: 16px; font-family: Roboto, sans-serif;",
    font: ["Arial", "Roboto"],

    resizingBar: false,
  };
};

const Editor = ({
  text,
  itemId,
  blockId,
  setEditorFocused,
  isEditorFocused,
}) => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.menu);

  const handleContentChange = (content) => {
    dispatch({
      type: "UPDATE_BLOCK",
      payload: { blockId, itemId, text: content },
    });
  };

  const handleEditorFocused = () => {
    setEditorFocused(`${blockId}-${itemId}`);
  };

  return (
    <Container $isEditorFocused={isEditorFocused} $isMenuOpen={isMenuOpen}>
      <SunEditor
        setContents={text}
        onChange={handleContentChange}
        onClick={handleEditorFocused}
        setOptions={initializeSunEditor(dispatch, itemId, blockId, text)}
      />
    </Container>
  );
};

export default Editor;
