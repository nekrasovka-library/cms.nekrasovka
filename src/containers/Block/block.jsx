import React, { useState } from "react";
import {
  BlankBlockActionButtons,
  BlankBlockAddButton,
  BlankBlockDots,
  Container,
} from "./block.styles.js";
import Tooltip from "../../nekrasovka-ui/Tooltip/tooltip.jsx";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";
import { useDispatch, useSelector } from "react-redux";
import TypeBlock from "./type.block.jsx";

const Block = ({ blockIndex, id, items, styles, isItems }) => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.menu);
  const { isSettingsOpen } = useSelector((state) => state.settings);
  const [isBlankBlockFocused, setIsBlankBlockFocused] = useState(false);
  const isBlankBlockActive =
    isBlankBlockFocused && !isMenuOpen && !isSettingsOpen;

  const handleAddBlock = () => {
    dispatch({ type: "RESET_MENU" });
    dispatch({ type: "TOGGLE_MENU" });
    dispatch({ type: "CHANGE_EDITOR", payload: null });
  };

  const handleDeleteBlock = () => {
    dispatch({ type: "DELETE_BLOCK", payload: { id } });
  };

  const handleCopyBlock = () => {
    dispatch({ type: "COPY_BLOCK", payload: { items, styles, blockIndex } });
  };

  const handleBlockSettings = () => {
    dispatch({ type: "TOGGLE_SETTINGS" });
    dispatch({ type: "CHANGE_EDITOR", payload: null });
  };

  const handleMouseOut = () => {
    setIsBlankBlockFocused(false);
  };

  const handleMouseOver = () => {
    setIsBlankBlockFocused(true);
    dispatch({ type: "SET_BLOCK", payload: { blockIndex } });
  };

  const handleBlockDown = () => {
    dispatch({ type: "MOVE_BLOCK_DOWN", payload: { blockIndex } });
  };

  const handleBlockUp = () => {
    dispatch({ type: "MOVE_BLOCK_UP", payload: { blockIndex } });
  };

  return (
    <Container onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
      <TypeBlock blockId={id} isItems={isItems} items={items} styles={styles} />
      <BlankBlockAddButton $isBlankBlockFocused={isBlankBlockActive}>
        <Tooltip text="Добавить блок">
          <Icon icon="add" type="button" onClick={handleAddBlock} />
        </Tooltip>
      </BlankBlockAddButton>
      {isItems && (
        <BlankBlockActionButtons $isBlankBlockFocused={isBlankBlockActive}>
          <Tooltip text="Настройки">
            <Icon icon="settings" type="button" onClick={handleBlockSettings} />
          </Tooltip>
          <Tooltip text="Копировать блок">
            <Icon icon="copy" type="button" onClick={handleCopyBlock} />
          </Tooltip>
          <Tooltip text="Удалить блок">
            <Icon icon="trash" type="button" onClick={handleDeleteBlock} />
          </Tooltip>
          <Tooltip text="Переместить вверх">
            <Icon icon="arrowUp" type="button" onClick={handleBlockUp} />
          </Tooltip>
          <Tooltip text="Переместить вниз">
            <Icon icon="arrowDown" type="button" onClick={handleBlockDown} />
          </Tooltip>
        </BlankBlockActionButtons>
      )}
      <BlankBlockDots $isBlankBlockFocused={isBlankBlockActive} />
    </Container>
  );
};

export default Block;
