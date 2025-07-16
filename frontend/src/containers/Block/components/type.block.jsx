import React from "react";
import { getComponentParams } from "../../../helpers";

const TypeBlock = ({
  isItems,
  items,
  styles,
  blockId,
  CONSTRUCTOR_COMPONENTS,
}) => {
  return (
    isItems &&
    items.map(({ text, type, id }, elementIndex) => {
      const ItemComponent = CONSTRUCTOR_COMPONENTS[type];
      const params = getComponentParams({
        type,
        blockId,
        itemId: id,
        styles,
        text,
      });

      return <ItemComponent key={elementIndex} {...params} />;
    })
  );
};

export default TypeBlock;
