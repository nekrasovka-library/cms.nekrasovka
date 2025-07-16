import React from "react";
import { useSelector } from "react-redux";
import TextConstructor from "./text.constructor";
import TextPreview from "./text.preview";
import { TextContainer } from "./text.styles";

const Text = ({
  blockId,
  text,
  backgroundColor,
  textAlign,
  gap,
  tracks,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  const { isPreview } = useSelector((state) => state.preview);

  return (
    <TextContainer
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
      $backgroundColor={backgroundColor}
    >
      {isPreview ? (
        <TextPreview
          backgroundColor={backgroundColor}
          textAlign={textAlign}
          gap={gap}
          tracks={tracks}
          text={text}
          maxWidth={maxWidth}
        />
      ) : (
        <TextConstructor
          text={text}
          blockId={blockId}
          backgroundColor={backgroundColor}
          textAlign={textAlign}
          gap={gap}
          tracks={tracks}
          maxWidth={maxWidth}
        />
      )}
    </TextContainer>
  );
};

export default Text;
