import React, { useRef } from "react";
import ImageFile from "../Image/components/image.file";
import axios from "axios";
import { useDispatch } from "react-redux";

const ImageConstructor = ({
  DEFAULT_IMAGE,
  blockId,
  tracks,
  children,
  imageName,
  index,
}) => {
  const fileInputRef = useRef([]);
  const dispatch = useDispatch();

  const handleFileUpdate = async (file, imgIndex) => {
    if (!file) return;

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
        text: Array.from({ length: tracks }).map((_, i) =>
          i === imgIndex ? response.data.file.filename : children[i] || "",
        ),
      },
    });
  };
  return (
    <>
      <img
        src={`${process.env.REACT_APP_IMAGES_URL}${imageName}`}
        alt="картинка"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `${process.env.REACT_APP_URL}${DEFAULT_IMAGE}`;
        }}
      />
      <ImageFile
        ref={fileInputRef}
        handleFileChange={(e) => handleFileUpdate(e.target.files[0], index)}
      />
    </>
  );
};

export default ImageConstructor;
