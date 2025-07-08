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
  const [contents, setContents] = useState([]);
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

  const handleContentChange = (index, newContent) => {
    const newContents = [...contents];
    newContents[index] = newContent;
    setContents(newContents);

    dispatch({
      type: "UPDATE_BLOCK",
      payload: { blockId, text: newContents.join("") },
    });
  };

  const handleEditorFocused = (index) => {
    setBlockFocused(index);
    dispatch({ type: "CHANGE_EDITOR", payload: `${blockId}` });
  };

  // Функция для разделения контента на части
  const splitContent = (html) => {
    const divs = html.match(/<div[^>]*>.*?<\/div>/gs);
    return divs || [];
  };

  useEffect(() => {
    // Получаем начальный контент и разделяем его
    const parts = splitContent(text);
    setContents(parts);
  }, []);

  return (
    <Container $isModal={isModal} $gap={gap} $tracks={tracks}>
      {isProjectLoaded &&
        contents.map((content, index) => {
          const isEditorFocused =
            editorFocused === `${blockId}` && blockFocused === index;

          return (
            <EditorContainer
              key={index}
              $textAlign={textAlign}
              $isEditorFocused={isEditorFocused}
              $backgroundColor={backgroundColor}
            >
              <SunEditor
                key={index}
                lang={ru}
                setContents={content}
                onChange={handleContentChange}
                onClick={() => handleEditorFocused(index)}
                setOptions={options}
              />
            </EditorContainer>
          );
        })}
    </Container>
  );
};

export default Editor;
