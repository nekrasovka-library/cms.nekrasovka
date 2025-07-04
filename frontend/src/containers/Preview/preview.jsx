import React from "react";
import { useSelector } from "react-redux";
import Text from "../../components/Text/text.jsx";
import Image from "../../components/Image/image.preview.jsx";
import Carousel from "../../components/Carousel/carousel.preview.jsx";
import Divider from "../../components/Divider/divider.jsx";
import TypeBlock from "../Block/components/type.block.jsx";
import { PreviewContainer } from "./preview.styles.js";
import Button from "../../components/Button/button.preview.jsx";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";

const Preview = () => {
  const { blocks, totalBlocks } = useSelector((state) => state.blocks);

  const CONSTRUCTOR_COMPONENTS = {
    text: Text,
    image: Image,
    carousel: Carousel,
    divider: Divider,
    button: Button,
    header: Header,
    footer: Footer,
  };

  const sortedBlocks = [...blocks].sort((a, b) => {
    if (a.items?.[0]?.type === "header") return -1;
    if (b.items?.[0]?.type === "header") return 1;
    if (a.items?.[0]?.type === "footer") return 1;
    if (b.items?.[0]?.type === "footer") return -1;
    return 0;
  });

  return (
    <PreviewContainer>
      {sortedBlocks.map(({ id, items, styles }, blockIndex) => {
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
