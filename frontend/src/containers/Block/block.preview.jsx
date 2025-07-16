import React from "react";
import { getComponentParams } from "../../helpers";

const BlockPreview = ({
  blockId,
  items,
  styles,
  isItems,
  CONSTRUCTOR_COMPONENTS,
}) => {
  return (
    isItems &&
    items.map(({ text, type, id }) => {
      const ItemComponent = CONSTRUCTOR_COMPONENTS[type];
      const params = getComponentParams({
        type,
        blockId,
        itemId: id,
        styles,
        text,
      });

      return <ItemComponent key={id} {...params} />;
    })
  );
};

export default BlockPreview;
