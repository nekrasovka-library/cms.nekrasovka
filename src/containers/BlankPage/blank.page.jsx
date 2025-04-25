import React, { useState } from "react";
import { AddBlankPageButton, Container } from "./blank.page.styles.js";
import Tooltip from "../../nekrasovka-ui/Tooltip/tooltip.jsx";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../Editor/editor.jsx";

const BlankPage = () => {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.menu);
  const [isBlankPageFocused, setIsBlankPageFocused] = useState(false);

  const handleAdd = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  return (
    <Container
      tabIndex="0"
      onMouseOut={() => setIsBlankPageFocused(false)}
      onMouseOver={() => setIsBlankPageFocused(true)}
    >
      <Editor isMenuOpen={isMenuOpen} />
      <AddBlankPageButton
        $isBlankPageFocused={isBlankPageFocused && !isMenuOpen}
      >
        <Tooltip text="Добавить блок">
          <Icon icon="add" type="button" onClick={handleAdd} />
        </Tooltip>
      </AddBlankPageButton>
    </Container>
  );
};

export default BlankPage;
