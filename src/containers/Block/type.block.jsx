import React from "react";
import Editor from "../Editor/editor.jsx";
import Image from "../Image/image.jsx";
import { TypeBlockContainer } from "./block.styles.js";
import { calculateBlockWidth } from "../../helpers/index.js";
import Carousel from "../../nekrasovka-ui/Carousel/index.jsx";
import Divider from "../Divider/divider.jsx";

const generateBlockStyles = ({
  maxWidth,
  backgroundColor,
  paddingTop,
  paddingBottom,
}) => {
  const computedMaxWidth = maxWidth ? calculateBlockWidth(maxWidth) : 0;

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
  }`;
};

const getComponentParams = ({ text, type, blockId, itemId, styles }) => {
  if (type === "text") {
    return {
      blockId,
      itemId,
      backgroundColor: styles.backgroundColor,
      textAlign: styles.textAlign,
      text,
    };
  }

  if (type === "image") {
    return { blockId, itemId, text, borderRadius: styles.borderRadius };
  }

  if (type === "carousel") {
    return {
      children: text,
      maxWidth: calculateBlockWidth(styles.maxWidth),
      borderRadius: styles.borderRadius,
      blockId,
      itemId,
    };
  }

  if (type === "divider") return { blockId, itemId, text, color: styles.color };

  return {};
};

const CONSTRUCTOR_COMPONENTS = {
  text: Editor,
  image: Image,
  carousel: Carousel,
  divider: Divider,
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

            return <ItemComponent key={elementIndex} {...params} />;
          })}
        </div>
      </TypeBlockContainer>
    )
  );
};

export default TypeBlock;
