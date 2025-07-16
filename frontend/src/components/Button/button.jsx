import React from "react";
import { ButtonContainer } from "./button.styles.js";
import { useSelector } from "react-redux";
import ButtonPreview from "./button.preview";
import ButtonConstructor from "./button.constructor";

const Button = ({
  text,
  border,
  color,
  borderRadius,
  height,
  textAlign,
  blockId,
  backgroundColor,
  elementBackgroundColor,
  elementFontSize,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  const { isPreview } = useSelector((state) => state.preview);

  return (
    <ButtonContainer
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      {isPreview ? (
        <ButtonPreview
          maxWidth={maxWidth}
          elementBackgroundColor={elementBackgroundColor}
          text={text}
          border={border}
          color={color}
          borderRadius={borderRadius}
          height={height}
          textAlign={textAlign}
          elementFontSize={elementFontSize}
        />
      ) : (
        <ButtonConstructor
          maxWidth={maxWidth}
          elementBackgroundColor={elementBackgroundColor}
          text={text}
          border={border}
          color={color}
          borderRadius={borderRadius}
          height={height}
          textAlign={textAlign}
          blockId={blockId}
          elementFontSize={elementFontSize}
        />
      )}
    </ButtonContainer>
  );
};

export default Button;
