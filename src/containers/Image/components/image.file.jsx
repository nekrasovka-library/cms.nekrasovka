import React from "react";
import { ImageFileContainer } from "../image.styles.js";

const ImageFile = ({ ref, handleFileChange }) => {
  return (
    <ImageFileContainer
      type="file"
      accept="image/*"
      ref={ref}
      onChange={handleFileChange}
    />
  );
};

export default ImageFile;
