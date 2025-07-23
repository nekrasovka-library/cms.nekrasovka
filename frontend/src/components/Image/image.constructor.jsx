import React, { useRef } from "react";
import { ImageComponent } from "./image.styles.js";
import ImageFile from "./image.file.jsx";
import axios from "axios";

const DEFAULT_IMAGE = `imgfish.jpg`;

const ImageConstructor = ({
  text,
  blockId,
  height,
  imgIndex = 0,
  borderRadius = 0,
  maxWidth,
  updateImage,
}) => {
  const fileInputRef = useRef(null);
  const isTextArray = Array.isArray(text);
  const images = isTextArray ? text : [text];

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(
        `${process.env.REACT_APP_API}images/upload`,
        formData,
      );

      const newText = [...images];
      newText[imgIndex] = response.data.file.filename;

      updateImage(newText);
    }
  };

  return (
    <ImageComponent
      $borderRadius={borderRadius}
      $height={height}
      $maxWidth={maxWidth}
    >
      <img
        src={`${process.env.REACT_APP_IMAGES_URL}${images[imgIndex]}`}
        alt="картинка"
        onClick={handleFileClick}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `${process.env.REACT_APP_URL}${DEFAULT_IMAGE}`;
        }}
      />
      <ImageFile
        ref={fileInputRef}
        blockId={blockId}
        handleFileChange={handleFileChange}
      />
    </ImageComponent>
  );
};

export default ImageConstructor;
