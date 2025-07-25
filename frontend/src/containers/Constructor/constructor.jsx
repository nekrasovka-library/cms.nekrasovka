import React from "react";
import Block from "../Block/block.jsx";
import { useSelector } from "react-redux";
import { ConstructorContainer } from "./constructor.styles.js";
import Image from "../../components/Image/image";
import Carousel from "../../components/Carousel/carousel.jsx";
import Divider from "../../components/Divider/divider.jsx";
import Header from "../../components/Header/header.jsx";
import Footer from "../../components/Footer/footer.jsx";
import Button from "../../components/Button/button.jsx";
import AfishaMain from "../../components/AfishaMain/afisha.main";
import AfishaPage from "../../components/AfishaPage/afisha.page";
import Transition from "../../components/Transition/transition.jsx";
import Text from "../../components/Text/text";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router";
import EventPage from "../../components/EventPage/event.page";

const Constructor = () => {
  const { blocks, totalBlocks } = useSelector((state) => state.blocks);
  const hasBlocks = totalBlocks > 0;
  const { pageId } = useParams();

  const CONSTRUCTOR_COMPONENTS = {
    text: Text,
    image: Image,
    carousel: Carousel,
    divider: Divider,
    button: Button,
    header: Header,
    footer: Footer,
    afishaMain: AfishaMain,
    afishaPage: AfishaPage,
    afishaEvent: EventPage,
  };

  return (
    <AnimatePresence mode="wait">
      <Transition key={pageId}>
        <ConstructorContainer>
          {hasBlocks ? (
            blocks.map(({ id, items, styles }, blockIndex) => (
              <Block
                key={id}
                blockId={id}
                blockIndex={blockIndex}
                items={items}
                styles={styles}
                isItems={!!items}
                totalBlocks={totalBlocks}
                CONSTRUCTOR_COMPONENTS={CONSTRUCTOR_COMPONENTS}
              />
            ))
          ) : (
            <Block />
          )}
        </ConstructorContainer>
      </Transition>
    </AnimatePresence>
  );
};

export default Constructor;
