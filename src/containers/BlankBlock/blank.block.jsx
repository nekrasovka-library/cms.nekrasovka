import React, { useState } from "react";
import { AddBlankBlockButton, Container } from "./blank.block.styles.js";
import Tooltip from "../../nekrasovka-ui/Tooltip/tooltip.jsx";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../Editor/editor.jsx";

const BlankBlock = ({ blockIndex, items }) => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.menu);
  const [isBlankBlockFocused, setIsBlankBlockFocused] = useState(false);

  const CONSTRUCTOR_TYPES = {
    text: Editor,
  };

  const handleAdd = () => {
    dispatch({ type: "RESET_MENU" });
    dispatch({ type: "TOGGLE_MENU" });
    dispatch({ type: "SET_BLOCK", payload: { blockIndex } });
  };

  const renderElements = () => {
    return items.map(({ text, type }, elementIndex) => {
      const Element = CONSTRUCTOR_TYPES[type];

      return (
        <Element
          key={elementIndex}
          text={text}
          blockIndex={blockIndex}
          elementIndex={elementIndex}
        />
      );
    });
  };

  return (
    <Container
      onMouseOut={() => setIsBlankBlockFocused(false)}
      onMouseOver={() => setIsBlankBlockFocused(true)}
    >
      {!!items && renderElements()}
      <AddBlankBlockButton
        $isBlankBlockFocused={isBlankBlockFocused && !isMenuOpen}
      >
        <Tooltip text="Добавить блок">
          <Icon icon="add" type="button" onClick={handleAdd} />
        </Tooltip>
      </AddBlankBlockButton>
    </Container>
  );
};

export default BlankBlock;
