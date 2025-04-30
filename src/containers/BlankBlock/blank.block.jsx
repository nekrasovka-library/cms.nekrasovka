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
import TypeBlock from "./type.block.jsx";

const BlankBlock = ({
  blockIndex,
  id,
  items,
  styles,
  isItems,
  setEditorFocused,
  editorFocused,
}) => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.menu);
  const { isSettingsOpen } = useSelector((state) => state.settings);
  const [isBlankBlockFocused, setIsBlankBlockFocused] = useState(false);
  const isBlankBlockActive =
    isBlankBlockFocused && !isMenuOpen && !isSettingsOpen;

  const handleAddBlock = () => {
    dispatch({ type: "RESET_MENU" });
    dispatch({ type: "TOGGLE_MENU" });
    dispatch({ type: "SET_BLOCK", payload: { blockIndex } });
  };

  const handleDeleteBlock = () => {
    dispatch({ type: "DELETE_BLOCK", payload: { id } });
  };

  const handleCopyBlock = () => {
    dispatch({ type: "COPY_BLOCK", payload: { items, styles, blockIndex } });
  };

  const handleBlockSettings = () => {
    dispatch({ type: "TOGGLE_SETTINGS" });
    dispatch({ type: "SET_BLOCK", payload: { blockIndex } });
  };

  const handleMouseOut = () => {
    setIsBlankBlockFocused(false);
  };

  const handleMouseOver = () => {
    setIsBlankBlockFocused(true);
  };

  return (
    <Container onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
      <TypeBlock
        isItems={isItems}
        items={items}
        editorFocused={editorFocused}
        blockIndex={blockIndex}
        setEditorFocused={setEditorFocused}
        styles={styles}
      />
      <BlankBlockButtons $isBlankBlockFocused={isBlankBlockActive}>
        <Tooltip text="Добавить блок">
          <Icon icon="add" type="button" onClick={handleAddBlock} />
        </Tooltip>
      </BlankBlockButtons>
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
      </BlankBlockActionButtons>
      <BlankBlockDots $isBlankBlockFocused={isBlankBlockActive} />
    </Container>
  );
};

export default BlankBlock;
