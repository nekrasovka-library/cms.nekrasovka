import React from "react";
import { useSelector } from "react-redux";
import Text from "../../components/Text/text.jsx";
import Image from "../../components/Image/image.preview.jsx";
import Carousel from "../../components/Carousel/carousel.preview.jsx";
import Divider from "../../components/Divider/divider.jsx";
import TypeBlock from "../Block/components/type.block.jsx";
import { PreviewContainer } from "./preview.styles.js";
import Button from "../../components/Button/button.preview.jsx";
import HeaderPreview from "../../components/Header/header.preview";
import FooterPreview from "../../components/Footer/footer.preview";

const Preview = () => {
  const { blocks, totalBlocks } = useSelector((state) => state.blocks);

  const CONSTRUCTOR_COMPONENTS = {
    text: Text,
    image: Image,
    carousel: Carousel,
    divider: Divider,
    button: Button,
    header: HeaderPreview,
    footer: FooterPreview,
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
            totalBlocks={totalBlocks}
            CONSTRUCTOR_COMPONENTS={CONSTRUCTOR_COMPONENTS}
          />
        );
      })}
    </PreviewContainer>
  );
};

export default Preview;
