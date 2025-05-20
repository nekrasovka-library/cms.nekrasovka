import React from "react";
import { ButtonContainer } from "./button.styles.js";

const Button = ({ text, border, color, borderRadius, height, textAlign }) => {
  return (
    <ButtonContainer
      dangerouslySetInnerHTML={{ __html: text }}
      $border={border}
      $color={color}
      $borderRadius={borderRadius}
      $height={height}
      $textAlign={textAlign}
    />
  );
};

export default Button;
