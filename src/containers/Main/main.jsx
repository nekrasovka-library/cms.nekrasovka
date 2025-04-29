import React, { useState } from "react";
import BlankBlock from "../BlankBlock/blank.block.jsx";
import { useSelector } from "react-redux";
import { Container } from "./main.styles.js";

const Main = () => {
  const { data, total } = useSelector((state) => state.block);
  const [editorFocused, setEditorFocused] = useState(null);
  const isTotal = total > 0;

  const handleContainerClick = ({ target }) => {
    if (!target.parentNode?.parentNode?.classList.value?.includes("ql-")) {
      setEditorFocused(null);
    }
  };

  return (
    <Container onClick={handleContainerClick}>
      {isTotal ? (
        data.map(({ id, items }, index) => {
          const isItems = !!items;

          return (
            <BlankBlock
              key={id}
              id={id}
              blockIndex={index}
              items={items}
              isItems={isItems}
              editorFocused={editorFocused}
              setEditorFocused={setEditorFocused}
            />
          );
        })
      ) : (
        <BlankBlock blockIndex={0} />
      )}
    </Container>
  );
};

export default Main;
