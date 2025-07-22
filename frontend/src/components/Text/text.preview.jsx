import React from "react";
import { TextComponent } from "./text.styles";

const TextPreview = ({ text, backgroundColor, gap, tracks, maxWidth }) => {
  return (
    <TextComponent
      $backgroundColor={backgroundColor}
      $gap={gap}
      $tracks={tracks}
      $maxWidth={maxWidth}
    >
      {text.map((textBlock, index) => {
        return (
          <div key={index} dangerouslySetInnerHTML={{ __html: textBlock }} />
        );
      })}
    </TextComponent>
  );
};

export default TextPreview;
