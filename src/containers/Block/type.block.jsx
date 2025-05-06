import React from "react";
import Editor from "../Editor/editor.jsx";
import Image from "../Image/image.jsx";
import { TypeBlockContainer } from "./block.styles.js";

const calculateBlockWidth = (columns) => {
  const MIN_WIDTH = 60;
  const MAX_WIDTH = 1160;
  const COLUMN_BASE_WIDTH = (MAX_WIDTH - MIN_WIDTH) / 11;
  return MIN_WIDTH + COLUMN_BASE_WIDTH * (columns - 1);
};

const generateBlockStyles = ({
  maxWidth,
  backgroundColor,
  paddingTop,
  paddingBottom,
  textAlign,
  borderRadius,
}) => {
  const computedMaxWidth = maxWidth ? calculateBlockWidth(maxWidth) : 0;
  const computedTextAlign = textAlign ? `* {text-align: ${textAlign};}` : "";
  const computedBorderRadius = borderRadius
    ? `* {border-radius: ${borderRadius}px;}`
    : "";

  return `
  width: 100%; 
  & {
    background-color: ${backgroundColor};
  } 
  > div {
    margin: 0 auto; 
    max-width: ${computedMaxWidth}px; 
    padding-top: ${paddingTop}; 
    padding-bottom: ${paddingBottom}; 
    ${computedTextAlign}
    ${computedBorderRadius}
  }`;
};

const getComponentParams = ({
  type,
  blockId,
  itemId,
  editorFocused,
  setEditorFocused,
}) => {
  if (type === "text") {
    return {
      blockId,
      itemId,
      setEditorFocused,
      isEditorFocused: editorFocused === `${blockId}-${itemId}`,
    };
  }
  if (type === "image") {
    return { blockId, itemId };
  }

  return {};
};

const CONSTRUCTOR_COMPONENTS = {
  text: Editor,
  image: Image,
};

const TypeBlock = ({
  isItems,
  items,
  styles,
  editorFocused,
  setEditorFocused,
  blockId,
}) => {
  const computedBlockStyles = styles ? generateBlockStyles(styles) : "";

  return (
    isItems && (
      <TypeBlockContainer $typeBlockStyles={computedBlockStyles}>
        <div>
          {items.map(({ text, type, id }, elementIndex) => {
            const ItemComponent = CONSTRUCTOR_COMPONENTS[type];
            const params = getComponentParams({
              type,
              blockId,
              itemId: id,
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
