import React from "react";
import { useSelector } from "react-redux";
import TextConstructor from "./text.constructor";
import TextPreview from "./text.preview";

const Text = ({ blockId, text, backgroundColor, textAlign, gap, tracks }) => {
  const { isPreview } = useSelector((state) => state.preview);

  return isPreview ? (
    <TextPreview
      backgroundColor={backgroundColor}
      textAlign={textAlign}
      gap={gap}
      tracks={tracks}
      text={text}
    />
  ) : (
    <TextConstructor
      text={text}
      blockId={blockId}
      backgroundColor={backgroundColor}
      textAlign={textAlign}
      gap={gap}
      tracks={tracks}
    />
  );
};

export default Text;
