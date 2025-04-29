import React from "react";
import Editor from "../Editor/editor.jsx";

const CONSTRUCTOR_TYPES = {
  text: Editor,
};

const TypeBlock = ({
  isItems,
  items,
  editorFocused,
  blockIndex,
  setEditorFocused,
}) => {
  return (
    isItems &&
    items.map(({ text, type }, elementIndex) => {
      const ItemComponent = CONSTRUCTOR_TYPES[type];
      const isEditorFocused = editorFocused === `${blockIndex}-${elementIndex}`;

      return (
        <ItemComponent
          key={elementIndex}
          text={text}
          blockIndex={blockIndex}
          elementIndex={elementIndex}
          isEditorFocused={isEditorFocused}
          setEditorFocused={setEditorFocused}
        />
      );
    })
  );
};

export default TypeBlock;
