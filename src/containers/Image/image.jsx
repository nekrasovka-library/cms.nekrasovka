import React, { useMemo, useRef } from "react";
import { ImageContainer, ImageFile } from "./image.styles.js";
import { useDispatch } from "react-redux";

const Image = ({ text, blockId, itemId }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

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
        payload: { blockId, itemId, text: `<img src="${fileName}" alt="" />` },
      });
    }
  };

  const memoizedInnerHTML = useMemo(() => ({ __html: text }), [text]);

  return (
    <ImageContainer>
      <div
        onClick={handleFileClick}
        dangerouslySetInnerHTML={memoizedInnerHTML}
      />
      <ImageFile
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </ImageContainer>
  );
};

export default Image;
