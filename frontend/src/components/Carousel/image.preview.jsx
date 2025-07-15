import React from "react";

const ImagePreview = ({ DEFAULT_IMAGE, imageName }) => {
  return (
    <img
      src={`${process.env.REACT_APP_IMAGES_URL}${imageName}`}
      alt="картинка"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `${process.env.REACT_APP_URL}${DEFAULT_IMAGE}`;
      }}
    />
  );
};

export default ImagePreview;
