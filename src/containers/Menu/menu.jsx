import React from "react";
import {
  CloseMenuButton,
  Container,
  Header,
  Main,
  MainItem,
} from "./menu.styles.js";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";

const dataMenu = [
  {
    id: 1,
    name: "Заголовок",
  },
  {
    id: 2,
    name: "Текстовый блок",
  },
];

const Menu = () => {
  const dispatch = useDispatch();
  const { isMenuOpen, selectedMenu } = useSelector((state) => state.menu);

  const handleClose = () => {
    dispatch({ type: "RESET_MENU" });
  };

  const handleSelect = (id) => {
    dispatch({ type: "SELECT_MENU", payload: id });
  };

  return (
    <Container $isMenuOpen={isMenuOpen}>
      <Header>
        <CloseMenuButton>
          <Icon icon="close_menu" type="button" onClick={handleClose} />
        </CloseMenuButton>
      </Header>
      <Main>
        {dataMenu.map(({ id, name }) => (
          <MainItem
            $isMenuItemActive={selectedMenu === id}
            key={id}
            onClick={() => handleSelect(id)}
          >
            {name}
          </MainItem>
        ))}
      </Main>
    </Container>
  );
};

export default Menu;
