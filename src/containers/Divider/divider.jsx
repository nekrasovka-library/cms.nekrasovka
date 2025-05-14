import React from "react";
import { DividerContainer } from "./divider.styles.js";

const Divider = ({ color }) => {
  return (
    <DividerContainer $backgroundColor={color}>
      <hr />
    </DividerContainer>
  );
};

export default Divider;
