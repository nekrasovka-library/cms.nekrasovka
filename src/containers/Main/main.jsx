import React, { useState } from "react";
import Block from "../Block/block.jsx";
import { useSelector } from "react-redux";
import { Container } from "./main.styles.js";

const Main = () => {
  const { blocks, totalBlocks } = useSelector((state) => state.blocks);
  const [editorFocused, setEditorFocused] = useState(null);
  const isTotal = totalBlocks > 0;

  const handleContainerClick = ({ target }) => {
    if (!target.parentNode?.parentNode?.classList.value?.includes("ql-")) {
      setEditorFocused(null);
    }
  };

  return (
    <Container onClick={handleContainerClick}>
      {isTotal ? (
        blocks.map(({ id, items, styles }, index) => {
          const isItems = !!items;

          return (
            <Block
              key={id}
              id={id}
              blockIndex={index}
              items={items}
              styles={styles}
              isItems={isItems}
              editorFocused={editorFocused}
              setEditorFocused={setEditorFocused}
            />
          );
        })
      ) : (
        <Block blockIndex={0} />
      )}
    </Container>
  );
};

export default Main;
