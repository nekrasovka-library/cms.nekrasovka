import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { EditorComponent, EditorContainer } from "./text.styles";
import { useDispatch, useSelector } from "react-redux";
import { TOOLBAR_OPTIONS } from "./text.constants.js";
import { ru } from "suneditor/src/lang";

const TextConstructor = ({
  text,
  blockId,
  backgroundColor,
  textAlign,
  gap,
  tracks,
}) => {
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

  const updateTextByTracks = () => {
    const divs = [...text];

    if (tracks > divs.length) {
      const count = tracks - divs.length;
      for (let i = 0; i < count; i++) {
        divs.push(`<div>Добавить текст</div>`);
      }
    } else {
      const count = divs.length - tracks;
      for (let i = 0; i < count; i++) {
        divs.pop();
      }
    }

    dispatch({
      type: "UPDATE_BLOCK",
      payload: { blockId, text: divs },
    });
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

  useEffect(() => {
    if (isProjectLoaded) {
      updateTextByTracks();
    }
  }, [tracks, isProjectLoaded]);

  return (
    <EditorContainer $gap={gap} $tracks={tracks}>
      {isProjectLoaded &&
        text.map((content, index) => {
          const isEditorFocused =
            editorFocused === `${blockId}` && blockFocused === index;

          return (
            <EditorComponent
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
              />
            </EditorComponent>
          );
        })}
    </EditorContainer>
  );
};

export default TextConstructor;
