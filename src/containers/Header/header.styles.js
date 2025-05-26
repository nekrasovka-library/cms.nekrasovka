import styled from "styled-components";
import { Link } from "react-router";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 0 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  transition-duration: 0.2s;
  transition-property: color;
  transition-timing-function: ease-in-out;

  @media (hover: hover) {
    > div {
      cursor: pointer;

      &:hover {
        color: #ff855d;
      }
    }
  }
`;

const HeaderRightPreview = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;

  span {
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
  }
`;

const HeaderLeftBlankPage = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const HeaderLeftHome = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
  text-decoration: none;
  color: #000;

  @media (hover: hover) {
    &:hover {
      color: #f4846b;

      svg path {
        fill: #f4846b;
      }
    }
  }
`;

export {
  HeaderContainer,
  HeaderRight,
  HeaderRightPreview,
  HeaderLeft,
  HeaderLeftBlankPage,
  HeaderLeftHome,
};
