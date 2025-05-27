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
  column-gap: 10px;

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
  cursor: pointer;
  padding: 5px;
`;

const HeaderLeftBlankPageLink = styled(HeaderLeftBlankPage)`
  a {
    text-decoration: none;
    color: #000;
  }

  @media (hover: hover) {
    &:hover {
      a {
        color: #f4846b;
      }

      svg path {
        stroke: #f4846b;
      }
    }
  }
`;

const HeaderLeftBlankPageList = styled(HeaderLeftBlankPage)`
  &:after {
    border-color: currentcolor transparent transparent;
    border-style: solid;
    border-width: 4px 4px 0;
    content: "";
    height: 0;
    margin-top: 2px;
    transition: border-color 0.2s ease-in-out;
    width: 0;
  }

  @media (hover: hover) {
    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

const HeaderLeftHome = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 8px;
  text-decoration: none;
  color: #000;
  padding: 5px 5px 5px 0;

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
  HeaderLeftBlankPageLink,
  HeaderLeftBlankPageList,
};
