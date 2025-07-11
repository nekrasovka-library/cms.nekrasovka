import React, { useRef } from "react";
import { ImageContainer } from "./image.styles.js";
import ImageFile from "./components/image.file.jsx";
import { useDispatch } from "react-redux";
import axios from "axios";

const DEFAULT_IMAGE = `imgfish.jpg`;

const ImageConstructor = ({ text, blockId, height, borderRadius = 0 }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

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

      dispatch({
        type: "UPDATE_BLOCK",
        payload: {
          blockId,
          text: response.data.file.filename,
        },
      });
    }
  };

  return (
    <ImageContainer $borderRadius={borderRadius} $height={height}>
      <img
        src={`${process.env.REACT_APP_IMAGES_URL}${text}`}
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
    </ImageContainer>
  );
};

export default ImageConstructor;
