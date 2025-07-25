import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOOLBAR_OPTIONS } from "./editor.constants";
import { EditorComponent, EditorContainer } from "./editor.styles";
import SunEditor from "suneditor-react";
import { ru } from "suneditor/src/lang";
import "suneditor/dist/css/suneditor.min.css";

const Editor = ({
  text,
  blockId,
  backgroundColor,
  tracks,
  updateText,
  gap,
  maxWidth,
}) => {
  const { isMenuOpen } = useSelector((state) => state.menu);
  const { isSettingsOpen } = useSelector((state) => state.settings);
  const { fontsData } = useSelector((state) => state.fonts);
  const [content, setContent] = useState("");
  const [isContentChanged, setIsContentChanged] = useState(false);
  const dispatch = useDispatch();
  const { editorFocused } = useSelector((state) => state.editor);
  const [blockFocused, setBlockFocused] = useState(null);
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
    dispatch({ type: "CHANGE_EDITOR", payload: `${blockId}` });
    setBlockFocused(index);
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

      if (Array.isArray(text)) {
        const newContents = [...text];
        newContents[blockFocused] = content;

        updateText(newContents);
      } else {
        updateText(content);
      }
    }
  }, [isContentChanged, blockFocused]);

  useEffect(() => {
    if (isProjectLoaded) {
      updateTextByTracks();
    }
  }, [tracks, isProjectLoaded]);

  const items = Array.isArray(text) ? text : [text];

  return (
    <EditorContainer $gap={gap} $tracks={tracks} $maxWidth={maxWidth}>
      {items.map((item, index) => {
        const isEditorFocused =
          editorFocused === `${blockId}` && blockFocused === index;

        return (
          <EditorComponent
            key={index}
            $isModal={isModal}
            $isEditorFocused={isEditorFocused}
            $backgroundColor={backgroundColor}
          >
            <SunEditor
              lang={ru}
              setContents={item}
              onClick={() => handleEditorFocused(index)}
              onInput={handleContentChange}
              setOptions={options}
            />
          </EditorComponent>
        );
      })}
    </EditorContainer>
  );
};

export default Editor;
