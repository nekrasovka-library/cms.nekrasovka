import React from "react";
import {
  CloseMenuButton,
  Container1,
  Container2,
  Header,
  Main,
  MainItem,
  MainItemVariant,
} from "./menu.styles.js";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";

const Menu = () => {
  const dispatch = useDispatch();
  const { isMenuOpen, data, selectedMenuId, variant } = useSelector(
    (state) => state.menu,
  );
  const isVariantOpen = variant.length > 0;

  const handleClose = () => {
    dispatch({ type: "RESET_MENU" });
  };

  const handleActive = (id) => {
    dispatch({ type: "SELECT_MENU", payload: { id } });
  };

  const handleVariant = (id) => {
    const text = variant.find((item) => item.id === id).text;

    dispatch({
      type: "ADD_BLOCK",
      payload: { items: [{ text, type: "text" }] },
    });

    handleClose();
  };

  return (
    <>
      <Container1 $isMenuOpen={isMenuOpen} $isVariantOpen={isVariantOpen}>
        <Header>
          <CloseMenuButton>
            <Icon icon="close_menu" type="button" onClick={handleClose} />
          </CloseMenuButton>
        </Header>
        <Main>
          {data.map(({ id, name }, index) => {
            const isMenuItemActive = id === selectedMenuId;

            return (
              <MainItem
                $isMenuItemActive={isMenuItemActive}
                key={index}
                onClick={() => handleActive(id)}
              >
                {name}
              </MainItem>
            );
          })}
        </Main>
      </Container1>
      <Container2 $isMenuOpen={isVariantOpen && isMenuOpen}>
        <Main>
          {variant.map(({ id, image }, index) => {
            return (
              <MainItemVariant key={index} onClick={() => handleVariant(id)}>
                <img src={image} alt="preview" />
              </MainItemVariant>
            );
          })}
        </Main>
      </Container2>
    </>
  );
};

export default Menu;
