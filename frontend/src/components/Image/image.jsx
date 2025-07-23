import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();

  const updateImage = (newText) => {
    dispatch({
      type: "UPDATE_BLOCK",
      payload: {
        blockId,
        text: newText,
      },
    });
  };

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
          updateImage={updateImage}
        />
      )}
    </ImageContainer>
  );
};

export default Image;
