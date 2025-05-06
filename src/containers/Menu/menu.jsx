import React from "react";
import {
  CloseMenuButton,
  Container1,
  Container2,
  Header,
  Main,
  MainItem1,
  MainItem2,
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
    const item = variant.find((item) => item.id === id);

    dispatch({
      type: "ADD_BLOCK",
      payload: {
        items: [{ text: item.text, type: item.type }],
        styles: item.styles,
      },
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
              <MainItem1
                $isMenuItemActive={isMenuItemActive}
                key={index}
                onClick={() => handleActive(id)}
              >
                {name}
              </MainItem1>
            );
          })}
        </Main>
      </Container1>
      <Container2 $isMenuOpen={isVariantOpen && isMenuOpen}>
        <Main>
          {variant.map(({ id, image }, index) => {
            return (
              <MainItem2 key={index} onClick={() => handleVariant(id)}>
                <img src={image} alt="preview" />
              </MainItem2>
            );
          })}
        </Main>
      </Container2>
    </>
  );
};

export default Menu;
