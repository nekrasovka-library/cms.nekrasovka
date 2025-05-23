import React from "react";
import { ImageContainer } from "./image.styles.js";

const DEFAULT_IMAGE = `imgfish.jpg`;

const ImageConstructor = ({ text, borderRadius = 0 }) => {
  return (
    <ImageContainer $borderRadius={borderRadius}>
      <img
        src={`${import.meta.env.VITE_IMAGES_UR}${text}`}
        alt="картинка"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DEFAULT_IMAGE;
        }}
      />
    </ImageContainer>
  );
};

export default ImageConstructor;
