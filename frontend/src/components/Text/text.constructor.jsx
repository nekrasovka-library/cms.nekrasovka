import React from "react";
import { useDispatch } from "react-redux";
import Editor from "../Editor/editor";

const TextConstructor = ({
  text,
  blockId,
  backgroundColor,
  gap,
  tracks,
  maxWidth,
}) => {
  const dispatch = useDispatch();

  const updateText = (newText) => {
    dispatch({
      type: "UPDATE_BLOCK",
      payload: { blockId, text: newText },
    });
  };

  return (
    <Editor
      type="text"
      text={text}
      blockId={blockId}
      updateText={updateText}
      backgroundColor={backgroundColor}
      gap={gap}
      tracks={tracks}
      maxWidth={maxWidth}
    />
  );
};

export default TextConstructor;
