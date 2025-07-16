import React from "react";
import Block from "../Block/block.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ConstructorContainer } from "./constructor.styles.js";
import Image from "../../components/Image/image";
import Carousel from "../../components/Carousel/carousel.jsx";
import Divider from "../../components/Divider/divider.jsx";
import Header from "../../components/Header/header.jsx";
import Footer from "../../components/Footer/footer.jsx";
import Button from "../../components/Button/button.jsx";
import Afisha from "../../components/Afisha/afisha.jsx";
import Transition from "../../components/Transition/transition.jsx";
import Text from "../../components/Text/text";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router";

const Constructor = () => {
  const dispatch = useDispatch();
  const { blocks, totalBlocks } = useSelector((state) => state.blocks);
  const hasBlocks = totalBlocks > 0;
  const { pageId } = useParams();

  const EXCLUDED_CLASSES = ["se-container", "se-btn-module", "se-wrapper"];

  const isExcludedClass = (classList) => {
    return EXCLUDED_CLASSES.some((excludedClass) =>
      classList.value.includes(excludedClass),
    );
  };

  const handleContainerClick = ({ target }) => {
    const containerElement = target.parentNode?.parentNode?.parentNode;

    if (!isExcludedClass(containerElement.classList)) {
      dispatch({ type: "RESET_EDITOR" });
    }
  };

  const CONSTRUCTOR_COMPONENTS = {
    text: Text,
    image: Image,
    carousel: Carousel,
    divider: Divider,
    button: Button,
    header: Header,
    footer: Footer,
    afisha: Afisha,
  };

  const renderBlocks = () => {
    return blocks.map(({ id, items, styles }, blockIndex) => (
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
    ));
  };

  return (
    <AnimatePresence mode="wait">
      <Transition key={pageId}>
        <ConstructorContainer onClick={handleContainerClick}>
          {hasBlocks ? renderBlocks() : <Block blockIndex={0} />}
        </ConstructorContainer>
      </Transition>
    </AnimatePresence>
  );
};

export default Constructor;
