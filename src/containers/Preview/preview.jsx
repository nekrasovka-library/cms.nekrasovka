import React from "react";
import { useSelector } from "react-redux";
import Text from "../Text/text.jsx";
import Image from "../../components/Image/image.preview.jsx";
import Carousel from "../../components/Carousel/carousel.preview.jsx";
import Divider from "../../components/Divider/divider.jsx";
import TypeBlock from "../Block/components/type.block.jsx";
import { PreviewContainer } from "./preview.styles.js";
import Button from "../../components/Button/button.preview.jsx";

const Preview = () => {
  const { blocks } = useSelector((state) => state.blocks);

  const CONSTRUCTOR_COMPONENTS = {
    text: Text,
    image: Image,
    carousel: Carousel,
    divider: Divider,
    button: Button,
  };

  return (
    <PreviewContainer>
      {blocks.map(({ id, items, styles }, blockIndex) => {
        return (
          <TypeBlock
            key={id}
            isItems={!!items}
            items={items}
            styles={styles}
            blockId={blockIndex}
            CONSTRUCTOR_COMPONENTS={CONSTRUCTOR_COMPONENTS}
          />
        );
      })}
    </PreviewContainer>
  );
};

export default Preview;
