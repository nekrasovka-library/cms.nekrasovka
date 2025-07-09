import React from "react";
import { TextContainer } from "./text.styles.js";

const Text = ({ text, backgroundColor, textAlign, gap, tracks }) => {
  return (
    <TextContainer
      $backgroundColor={backgroundColor}
      $textAlign={textAlign}
      $gap={gap}
      $tracks={tracks}
    >
      {text.map((textBlock, index) => {
        return (
          <div key={index} dangerouslySetInnerHTML={{ __html: textBlock }} />
        );
      })}
    </TextContainer>
  );
};

export default Text;
