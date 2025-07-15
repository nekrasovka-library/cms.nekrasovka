import React from "react";
import { ImageContainer } from "./image.styles.js";

const DEFAULT_IMAGE = `imgfish.jpg`;

const ImageConstructor = ({ text, height, imgIndex = 0, borderRadius = 0 }) => {
  return (
    <ImageContainer $borderRadius={borderRadius} $height={height}>
      <img
        src={`${process.env.REACT_APP_IMAGES_URL}${text[imgIndex]}`}
        alt="картинка"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `${process.env.REACT_APP_URL}${DEFAULT_IMAGE}`;
        }}
      />
    </ImageContainer>
  );
};

export default ImageConstructor;
