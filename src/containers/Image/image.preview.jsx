import React from "react";
import { ImageContainer } from "./image.styles.js";

const ImageConstructor = ({ text, borderRadius = 0 }) => {
  return (
    <ImageContainer $borderRadius={borderRadius}>
      <img src={text} alt="картинка" />
    </ImageContainer>
  );
};

export default ImageConstructor;
