import React from "react";
import Editor from "../Editor/editor.jsx";
import Image from "../Image/image.jsx";
import { TypeBlockContainer } from "./block.styles.js";
import { calculateBlockWidth } from "../../helpers/index.js";

const generateBlockStyles = ({
  maxWidth,
  backgroundColor,
  paddingTop,
  paddingBottom,
  borderRadius,
  textAlign,
}) => {
  const computedMaxWidth = maxWidth ? calculateBlockWidth(maxWidth) : 0;
  const computedTextAlign = textAlign ? `* {text-align: ${textAlign};}` : "";
  const computedBorderRadius = borderRadius
    ? `* {border-radius: ${borderRadius}px;}`
    : "";

  return `
  width: 100%; 
  & {
    background-color: ${backgroundColor} !important;
  } 
  > div {
    margin: 0 auto; 
    max-width: ${computedMaxWidth}px; 
    padding-top: ${paddingTop}; 
    padding-bottom: ${paddingBottom}; 
    ${computedBorderRadius}
    ${computedTextAlign}
  }`;
};

const getComponentParams = ({ type, blockId, itemId, backgroundColor }) => {
  if (type === "text") {
    return {
      blockId,
      itemId,
      backgroundColor,
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

const TypeBlock = ({ isItems, items, styles, blockId }) => {
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
              backgroundColor: styles.backgroundColor,
            });

            return <ItemComponent key={elementIndex} text={text} {...params} />;
          })}
        </div>
      </TypeBlockContainer>
    )
  );
};

export default TypeBlock;
