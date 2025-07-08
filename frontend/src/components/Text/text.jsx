import React from "react";
import { TextContainer } from "./text.styles.js";

const Text = ({ text, backgroundColor, textAlign, gap, tracks }) => {
  return (
    <TextContainer
      $backgroundColor={backgroundColor}
      $textAlign={textAlign}
      $gap={gap}
      $tracks={tracks}
      dangerouslySetInnerHTML={{
        __html: text.map((t) => `<div>${t}</div>`).join(""),
      }}
    />
  );
};

export default Text;
