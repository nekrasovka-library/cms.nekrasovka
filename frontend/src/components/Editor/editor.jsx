import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Container } from "./editor.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { TOOLBAR_OPTIONS } from "./editor.constants.js";
import { ru } from "suneditor/src/lang";

const Editor = ({
  text,
  itemId,
  blockId,
  backgroundColor,
  textAlign,
  gap,
  tracks,
}) => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.menu);
  const { isSettingsOpen } = useSelector((state) => state.settings);
  const { editorFocused } = useSelector((state) => state.editor);
  const { fontsData } = useSelector((state) => state.fonts);
  const { projectData, isProjectLoaded } = useSelector(
    (state) => state.project,
  );
  const isModal = isSettingsOpen || isMenuOpen;
  const isEditorFocused = editorFocused === `${blockId}-${itemId}`;
  const options = {
    defaultStyle: `height: 100%; font-size: 16px; color: ${projectData.color}; font-family: ${projectData.fontFamily}, sans-serif;`,
    font: fontsData.map((font) => font.name),
    resizingBar: false,
    buttonList: TOOLBAR_OPTIONS,
  };

  const handleContentChange = (content) => {
    dispatch({
      type: "UPDATE_BLOCK",
      payload: { blockId, itemId, text: content },
    });
  };

  const handleEditorFocused = () => {
    dispatch({ type: "CHANGE_EDITOR", payload: `${blockId}-${itemId}` });
  };

  return (
    <Container
      $isEditorFocused={isEditorFocused}
      $isModal={isModal}
      $backgroundColor={backgroundColor}
      $textAlign={textAlign}
      $gap={gap}
      $tracks={tracks}
    >
      {isProjectLoaded && (
        <SunEditor
          lang={ru}
          setContents={text}
          onChange={handleContentChange}
          onClick={handleEditorFocused}
          setOptions={options}
        />
      )}
    </Container>
  );
};

export default Editor;
