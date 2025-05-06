import React from "react";
import Editor from "../Editor/editor.jsx";
import { TypeBlockContainer } from "./block.styles.js";

const calculateBlockWidth = (columns) => {
  const MIN_WIDTH = 60;
  const MAX_WIDTH = 1160;
  const COLUMN_BASE_WIDTH = (MAX_WIDTH - MIN_WIDTH) / 11;
  return MIN_WIDTH + COLUMN_BASE_WIDTH * (columns - 1);
};

const generateBlockStyles = (styles) => {
  const maxWidth = styles?.maxWidth ? calculateBlockWidth(styles.maxWidth) : 0;

  return `& {background-color: ${styles?.backgroundColor};} 
   width: 100%; 
   > div {margin: 0 auto; 
   max-width: ${maxWidth}px; 
   padding-top: ${styles?.paddingTop}; 
   padding-bottom: ${styles?.paddingBottom}; 
   p {text-align: ${styles?.textAlign};}}`;
};

const getComponentParams = ({
  type,
  blockIndex,
  elementIndex,
  editorFocused,
  setEditorFocused,
}) => {
  if (type === "text") {
    return {
      blockIndex,
      elementIndex,
      setEditorFocused,
      isEditorFocused: editorFocused === `${blockIndex}-${elementIndex}`,
    };
  }
  return {};
};

const CONSTRUCTOR_COMPONENTS = {
  text: Editor,
  image: null,
};

const TypeBlock = ({
  isItems,
  items,
  styles,
  editorFocused,
  blockIndex,
  setEditorFocused,
}) => {
  const computedBlockStyles = generateBlockStyles(styles);

  return (
    isItems && (
      <TypeBlockContainer $typeBlockStyles={computedBlockStyles}>
        <div>
          {items.map(({ text, type }, elementIndex) => {
            const ItemComponent = CONSTRUCTOR_COMPONENTS[type];
            const params = getComponentParams({
              type,
              blockIndex,
              elementIndex,
              editorFocused,
              setEditorFocused,
            });

            return <ItemComponent key={elementIndex} text={text} {...params} />;
          })}
        </div>
      </TypeBlockContainer>
    )
  );
};

export default TypeBlock;
