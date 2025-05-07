import React from "react";
import {
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  HeaderRightPreview,
} from "./header.styles.js";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { isPreview } = useSelector((state) => state.preview);

  const toggleView = () => {
    dispatch({ type: "TOGGLE_PREVIEW" });
  };

  return (
    <HeaderContainer>
      <HeaderLeft></HeaderLeft>
      <HeaderRight>
        <HeaderRightPreview onClick={toggleView}>
          {isPreview ? "Редактирование" : "Предпросмотр"}
        </HeaderRightPreview>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
