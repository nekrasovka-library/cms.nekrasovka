import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Container, EditorContainer } from "./editor.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { TOOLBAR_OPTIONS } from "./editor.constants.js";
import { ru } from "suneditor/src/lang";

const Editor = ({ text, blockId, backgroundColor, textAlign, gap, tracks }) => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.menu);
  const { isSettingsOpen } = useSelector((state) => state.settings);
  const { fontsData } = useSelector((state) => state.fonts);
  const { editorFocused } = useSelector((state) => state.editor);
  const [blockFocused, setBlockFocused] = useState(null);
  const [content, setContent] = useState("");
  const [isContentChanged, setIsContentChanged] = useState(false);
  const { projectData, isProjectLoaded } = useSelector(
    (state) => state.project,
  );
  const isModal = isSettingsOpen || isMenuOpen;
  const options = {
    defaultStyle: `height: 100%; font-size: 16px; color: ${projectData.color}; font-family: ${projectData.fontFamily}, sans-serif;`,
    font: fontsData.map((font) => font.name),
    resizingBar: false,
    buttonList: TOOLBAR_OPTIONS,
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    setIsContentChanged(true);
  };

  const handleEditorFocused = (index) => {
    setBlockFocused(index);
    dispatch({ type: "CHANGE_EDITOR", payload: `${blockId}` });
  };

  useEffect(() => {
    if (isContentChanged && blockFocused !== null) {
      setIsContentChanged(false);
      const newContents = [...text];
      newContents[blockFocused] = content;

      dispatch({
        type: "UPDATE_BLOCK",
        payload: { blockId, text: newContents },
      });
    }
  }, [isContentChanged, blockFocused]);

  return (
    <Container $gap={gap} $tracks={tracks}>
      {isProjectLoaded &&
        text.map((content, index) => {
          const isEditorFocused =
            editorFocused === `${blockId}` && blockFocused === index;

          return (
            <EditorContainer
              key={index}
              $isModal={isModal}
              $textAlign={textAlign}
              $isEditorFocused={isEditorFocused}
              $backgroundColor={backgroundColor}
            >
              <SunEditor
                lang={ru}
                setContents={content}
                onClick={() => handleEditorFocused(index)}
                onChange={handleContentChange}
                setOptions={options}
                enterMode="br"
                blockTag="br"
                paragraphTag="div"
              />
            </EditorContainer>
          );
        })}
    </Container>
  );
};

export default Editor;
