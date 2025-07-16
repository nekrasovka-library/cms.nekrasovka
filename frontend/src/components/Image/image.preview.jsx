import React from "react";
import { ImageComponent } from "./image.styles.js";

const DEFAULT_IMAGE = `imgfish.jpg`;

const ImageConstructor = ({
  text,
  height,
  imgIndex = 0,
  borderRadius = 0,
  maxWidth,
}) => {
  return (
    <ImageComponent
      $borderRadius={borderRadius}
      $height={height}
      $maxWidth={maxWidth}
    >
      <img
        src={`${process.env.REACT_APP_IMAGES_URL}${text[imgIndex]}`}
        alt="картинка"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `${process.env.REACT_APP_URL}${DEFAULT_IMAGE}`;
        }}
      />
    </ImageComponent>
  );
};

export default ImageConstructor;
