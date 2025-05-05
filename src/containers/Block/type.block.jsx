import React from "react";
import Editor from "../Editor/editor.jsx";
import { TypeBlockContainer } from "./block.styles.js";

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
  let maxWidth = 0;

  const calculateBlockWidth = (columns) => {
    const minWidth = 60;
    const maxWidth = 1160;
    const columnBaseWidth = (maxWidth - minWidth) / 11;
    return minWidth + columnBaseWidth * (columns - 1);
  };

  if (styles?.maxWidth) {
    maxWidth = calculateBlockWidth(styles.maxWidth);
  }

  const typeBlockStyles = `&, * {background-color: ${styles?.backgroundColor};} .ql-toolbar * {background-color: #fff;} width: 100%; > div {margin: 0 auto; max-width: ${maxWidth}px; padding-top: ${styles?.paddingTop}; padding-bottom: ${styles?.paddingBottom};}`;

  return (
    isItems && (
      <TypeBlockContainer $typeBlockStyles={typeBlockStyles}>
        <div>
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
        </div>
      </TypeBlockContainer>
    )
  );
};

export default TypeBlock;
