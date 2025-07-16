import React from "react";
import { DividerComponent, DividerContainer } from "./divider.styles.js";

const Divider = ({
  color,
  opacity,
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  return (
    <DividerContainer
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <DividerComponent
        $color={color}
        $opacity={opacity}
        $maxWidth={maxWidth}
      />
    </DividerContainer>
  );
};

export default Divider;
