import React, { useState } from "react";
import { getComponentParams } from "../../helpers";
import {
  BlankBlockActionButtons,
  BlankBlockAddButton,
  BlankBlockDots,
  BlockConstructorContainer,
} from "./block.styles";
import Tooltip from "../../nekrasovka-ui/Tooltip/tooltip";
import Icon from "../../nekrasovka-ui/Icon/icon";
import { useDispatch, useSelector } from "react-redux";

const BlockConstructor = ({
  blockIndex,
  blockId,
  items,
  styles,
  isItems,
  totalBlocks,
  CONSTRUCTOR_COMPONENTS,
}) => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.menu);
  const { isSettingsOpen } = useSelector((state) => state.settings);
  const [isBlankBlockFocused, setIsBlankBlockFocused] = useState(false);
  const FIXED_BLOCK_TYPES = ["header", "footer"];
  const blockType = items?.[0]?.type;

  const canMoveUp = () => blockIndex !== 0;
  const canMoveDown = () => blockIndex + 1 !== totalBlocks;
  const isFixedBlock = (type = blockType) => FIXED_BLOCK_TYPES.includes(type);

  const isBlankBlockActive =
    (isBlankBlockFocused && !isMenuOpen && !isSettingsOpen) ||
    totalBlocks === 0;

  const dispatchAction = (type, payload = null) => {
    dispatch({ type, payload });
  };

  const handleAddBlock = () => {
    dispatchAction("RESET_MENU");
    dispatchAction("TOGGLE_MENU");
    dispatchAction("CHANGE_EDITOR", null);
    dispatchAction("SET_BLOCK", { blockIndex });
  };

  const handleDeleteBlock = () => {
    dispatchAction("DELETE_BLOCK", { id: blockId });
  };

  const handleCopyBlock = () => {
    dispatchAction("COPY_BLOCK", { items, styles, blockIndex });
  };

  const handleBlockSettings = () => {
    dispatchAction("TOGGLE_SETTINGS");
    dispatchAction("CHANGE_EDITOR", null);
    dispatchAction("SET_BLOCK", { blockIndex });
  };

  const handleBlockMove = (direction) => {
    const actionType = direction === "up" ? "MOVE_BLOCK_UP" : "MOVE_BLOCK_DOWN";
    dispatchAction(actionType, { blockIndex });
  };

  const handleMouseOut = () => setIsBlankBlockFocused(false);
  const handleMouseOver = () => setIsBlankBlockFocused(true);

  return (
    <BlockConstructorContainer
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
    >
      {isItems &&
        items.map(({ text, type, id }, itemIndex) => {
          const ItemComponent = CONSTRUCTOR_COMPONENTS[type];
          const params = getComponentParams({
            type,
            blockId,
            itemId: id,
            styles,
            text,
          });

          return <ItemComponent key={itemIndex} {...params} />;
        })}

      {isItems && (
        <BlankBlockActionButtons $isBlankBlockFocused={isBlankBlockActive}>
          {!isFixedBlock() && (
            <Tooltip text="Настройки">
              <Icon
                icon="settings"
                type="button"
                onClick={handleBlockSettings}
              />
            </Tooltip>
          )}

          {!isFixedBlock() && (
            <Tooltip text="Копировать блок">
              <Icon icon="copy" type="button" onClick={handleCopyBlock} />
            </Tooltip>
          )}

          <Tooltip text="Удалить блок">
            <Icon icon="trash" type="button" onClick={handleDeleteBlock} />
          </Tooltip>

          {canMoveUp() && (
            <Tooltip text="Переместить вверх">
              <Icon
                icon="arrowUp"
                type="button"
                onClick={() => handleBlockMove("up")}
              />
            </Tooltip>
          )}

          {canMoveDown() && (
            <Tooltip text="Переместить вниз">
              <Icon
                icon="arrowDown"
                type="button"
                onClick={() => handleBlockMove("down")}
              />
            </Tooltip>
          )}
        </BlankBlockActionButtons>
      )}
      <BlankBlockAddButton $isBlankBlockFocused={isBlankBlockActive}>
        <Tooltip text="Добавить блок">
          <Icon icon="add" type="button" onClick={handleAddBlock} />
        </Tooltip>
      </BlankBlockAddButton>
      <BlankBlockDots $isBlankBlockFocused={isBlankBlockActive} />
    </BlockConstructorContainer>
  );
};

export default BlockConstructor;
