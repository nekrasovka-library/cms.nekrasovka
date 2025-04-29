import React, { useState } from "react";
import {
  BlankBlockActionButtons,
  BlankBlockButtons,
  BlankBlockDots,
  Container,
} from "./blank.block.styles.js";
import Tooltip from "../../nekrasovka-ui/Tooltip/tooltip.jsx";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../Editor/editor.jsx";

const BlankBlock = ({ blockIndex, id, items }) => {
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

  const handleDelete = () => {
    dispatch({ type: "DELETE_BLOCK", payload: { id } });
  };

  const handleCopy = () => {
    dispatch({ type: "COPY_BLOCK", payload: { items, blockIndex } });
  };

  const handleMouseOut = () => {
    setIsBlankBlockFocused(false);
  };

  const handleMouseOver = () => {
    setIsBlankBlockFocused(true);
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
    <Container onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
      {!!items && renderElements()}
      <BlankBlockButtons
        $isBlankBlockFocused={isBlankBlockFocused && !isMenuOpen}
      >
        <Tooltip text="Добавить блок">
          <Icon icon="add" type="button" onClick={handleAdd} />
        </Tooltip>
      </BlankBlockButtons>
      <BlankBlockActionButtons
        $isBlankBlockFocused={isBlankBlockFocused && !isMenuOpen}
      >
        <Tooltip text="Копировать блок">
          <Icon icon="copy" type="button" onClick={handleCopy} />
        </Tooltip>
        <Tooltip text="Удалить блок">
          <Icon icon="trash" type="button" onClick={handleDelete} />
        </Tooltip>
      </BlankBlockActionButtons>
      <BlankBlockDots
        $isBlankBlockFocused={isBlankBlockFocused && !isMenuOpen}
      />
    </Container>
  );
};

export default BlankBlock;
