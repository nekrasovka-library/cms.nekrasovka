import React from "react";
import { useSelector } from "react-redux";
import ImagePreview from "./image.preview";
import ImageConstructor from "./image.constructor";
import { ImageContainer } from "./image.styles";

const Image = ({
  text,
  blockId,
  tracks,
  imgIndex,
  height,
  borderRadius,
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  const { isPreview } = useSelector((state) => state.preview);

  return (
    <ImageContainer
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      {isPreview ? (
        <ImagePreview
          text={text}
          height={height}
          borderRadius={borderRadius}
          imgIndex={imgIndex}
          maxWidth={maxWidth}
        />
      ) : (
        <ImageConstructor
          blockId={blockId}
          tracks={tracks}
          text={text}
          imgIndex={imgIndex}
          height={height}
          borderRadius={borderRadius}
          maxWidth={maxWidth}
        />
      )}
    </ImageContainer>
  );
};

export default Image;
