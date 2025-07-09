import React from "react";
import { TypeBlockContainer } from "../block.styles.js";
import { generateBlockStyles, getComponentParams } from "../../../helpers";

const TypeBlock = ({
  isItems,
  items,
  styles,
  blockId,
  CONSTRUCTOR_COMPONENTS,
}) => {
  const computedBlockStyles = styles ? generateBlockStyles(styles) : "";

  return (
    isItems && (
      <TypeBlockContainer $typeBlockStyles={computedBlockStyles}>
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
      </TypeBlockContainer>
    )
  );
};

export default TypeBlock;
