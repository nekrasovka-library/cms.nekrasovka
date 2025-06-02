import React from "react";
import { Button, ButtonContainer } from "./button.styles.js";

const ButtonPreview = ({
  text,
  border,
  color,
  borderRadius,
  height,
  textAlign,
  backgroundColor,
}) => {
  const buttonStyles = {
    $border: border,
    $color: color,
    $borderRadius: borderRadius,
    $height: height,
    $textAlign: textAlign,
    $backgroundColor: backgroundColor,
  };

  return (
    <ButtonContainer>
      <Button {...buttonStyles} dangerouslySetInnerHTML={{ __html: text }} />
    </ButtonContainer>
  );
};

export default ButtonPreview;
