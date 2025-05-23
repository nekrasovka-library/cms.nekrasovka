import React, { useRef } from "react";
import { ImageContainer } from "./image.styles.js";
import ImageFile from "./components/image.file.jsx";
import { useDispatch } from "react-redux";

const ImageConstructor = ({ text, blockId, itemId, borderRadius = 0 }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileName = file.name;

      dispatch({
        type: "UPDATE_BLOCK",
        payload: {
          blockId,
          itemId,
          text: fileName,
        },
      });
    }
  };

  return (
    <ImageContainer $borderRadius={borderRadius}>
      <img src={text} alt="картинка" onClick={handleFileClick} />
      <ImageFile
        ref={fileInputRef}
        blockId={blockId}
        itemId={itemId}
        handleFileChange={handleFileChange}
      />
    </ImageContainer>
  );
};

export default ImageConstructor;
