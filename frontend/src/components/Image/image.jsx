import React from "react";
import { useSelector } from "react-redux";
import ImagePreview from "./image.preview";
import ImageConstructor from "./image.constructor";

const Image = ({ text, blockId, tracks, imgIndex, height, borderRadius }) => {
  const { isPreview } = useSelector((state) => state.preview);

  return isPreview ? (
    <ImagePreview
      text={text}
      height={height}
      borderRadius={borderRadius}
      imgIndex={imgIndex}
    />
  ) : (
    <ImageConstructor
      blockId={blockId}
      tracks={tracks}
      text={text}
      imgIndex={imgIndex}
      height={height}
      borderRadius={borderRadius}
    />
  );
};

export default Image;
