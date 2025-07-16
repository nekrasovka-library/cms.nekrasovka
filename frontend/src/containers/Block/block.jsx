import React from "react";
import { useSelector } from "react-redux";
import BlockConstructor from "./block.constructor";
import BlockPreview from "./block.preview";

const Block = ({
  blockIndex,
  blockId,
  items,
  styles,
  isItems,
  totalBlocks,
  CONSTRUCTOR_COMPONENTS,
}) => {
  const { isPreview } = useSelector((state) => state.preview);

  return isPreview ? (
    <BlockPreview
      blockId={blockId}
      items={items}
      styles={styles}
      isItems={isItems}
      CONSTRUCTOR_COMPONENTS={CONSTRUCTOR_COMPONENTS}
    />
  ) : (
    <BlockConstructor
      blockIndex={blockIndex}
      blockId={blockId}
      items={items}
      styles={styles}
      isItems={isItems}
      totalBlocks={totalBlocks}
      CONSTRUCTOR_COMPONENTS={CONSTRUCTOR_COMPONENTS}
    />
  );
};

export default Block;
