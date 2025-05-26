import React from "react";
import {
  HeaderContainer,
  HeaderLeft,
  HeaderLeftBlankPage,
  HeaderLeftHome,
  HeaderRight,
  HeaderRightPreview,
} from "./header.styles.js";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../nekrasovka-ui/Icon/icon.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const { isPreview } = useSelector((state) => state.preview);

  const toggleView = () => {
    dispatch({ type: "TOGGLE_PREVIEW" });
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderLeftHome to="/projects">
          <Icon icon="home" />
          <span>Мои проекты</span>
        </HeaderLeftHome>
        <HeaderLeftBlankPage>
          <Icon icon="blankPage" />
          <span>Тестовая страница</span>
        </HeaderLeftBlankPage>
      </HeaderLeft>
      <HeaderRight>
        <HeaderRightPreview onClick={toggleView}>
          {isPreview ? "Редактирование" : "Предпросмотр"}
        </HeaderRightPreview>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
