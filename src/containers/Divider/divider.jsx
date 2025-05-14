import React from "react";
import { DividerContainer } from "./divider.styles.js";

const Divider = ({ color, opacity }) => {
  return (
    <DividerContainer $backgroundColor={color} $opacity={opacity}>
      <div></div>
    </DividerContainer>
  );
};

export default Divider;
