import React from "react";
import Editor from "../Editor/editor.jsx";
import Image from "../Image/image.jsx";
import { TypeBlockContainer } from "./block.styles.js";
import { calculateBlockWidth } from "../../helpers/index.js";
import Carousel from "../../nekrasovka-ui/Carousel/index.jsx";

const generateBlockStyles = ({
  maxWidth,
  backgroundColor,
  paddingTop,
  paddingBottom,
  borderRadius,
  textAlign,
}) => {
  const computedMaxWidth = maxWidth ? calculateBlockWidth(maxWidth) : 0;
  const computedTextAlign = textAlign
    ? `.sun-editor-editable {text-align: ${textAlign};}`
    : "";
  const computedBorderRadius = borderRadius
    ? `img {border-radius: ${borderRadius}px;}`
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

const getComponentParams = ({ text, type, blockId, itemId, styles }) => {
  if (type === "text") {
    return {
      blockId,
      itemId,
      backgroundColor: styles.backgroundColor,
    };
  }

  if (type === "image") {
    return { blockId, itemId };
  }

  if (type === "carousel") {
    return {
      children: text,
      maxWidth: calculateBlockWidth(styles.maxWidth),
      blockId,
      itemId,
    };
  }

  return {};
};

const CONSTRUCTOR_COMPONENTS = {
  text: Editor,
  image: Image,
  carousel: Carousel,
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
              styles,
              text,
            });

            return <ItemComponent key={elementIndex} text={text} {...params} />;
          })}
        </div>
      </TypeBlockContainer>
    )
  );
};

export default TypeBlock;
