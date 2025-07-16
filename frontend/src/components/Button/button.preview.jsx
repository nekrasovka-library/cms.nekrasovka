import React from "react";
import { ButtonComponent, Button } from "./button.styles";

const ButtonPreview = ({
  maxWidth,
  elementBackgroundColor,
  text,
  border,
  color,
  borderRadius,
  height,
  textAlign,
}) => {
  return (
    <ButtonComponent $maxWidth={maxWidth} $textAlign={textAlign}>
      <Button
        $backgroundColor={elementBackgroundColor}
        $border={border}
        $color={color}
        $borderRadius={borderRadius}
        $height={height}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </ButtonComponent>
  );
};

export default ButtonPreview;
