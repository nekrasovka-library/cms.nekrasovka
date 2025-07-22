import React from "react";
import Editor from "../Editor/editor";

const TextConstructor = ({ text, backgroundColor, blockId }) => {
  const updateText = (newText) => {
    console.log("❗updateText", newText);
  };

  return (
    <Editor
      text={text}
      backgroundColor={backgroundColor}
      blockId={blockId}
      updateText={updateText}
    />
  );
};

export default TextConstructor;
