import React from "react";
import Editor from "../Editor/editor.jsx";
import { TypeBlockContainer } from "./blank.block.styles.js";

const CONSTRUCTOR_TYPES = {
  text: Editor,
};

const TypeBlock = ({
  isItems,
  items,
  styles,
  editorFocused,
  blockIndex,
  setEditorFocused,
}) => {
  const typeBlockStyles = `width: 100%; max-width: ${styles?.maxWidth}; padding-top: ${styles?.paddingTop}; padding-bottom: ${styles?.paddingBottom};`;

  return (
    isItems && (
      <TypeBlockContainer $typeBlockStyles={typeBlockStyles}>
        {items.map(({ text, type }, elementIndex) => {
          const ItemComponent = CONSTRUCTOR_TYPES[type];
          const isEditorFocused =
            editorFocused === `${blockIndex}-${elementIndex}`;

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
        })}
      </TypeBlockContainer>
    )
  );
};

export default TypeBlock;
