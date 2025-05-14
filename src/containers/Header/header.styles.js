import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 0 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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

const HeaderLeftHome = styled.span`
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
`;

export {
  HeaderContainer,
  HeaderRight,
  HeaderRightPreview,
  HeaderLeft,
  HeaderLeftBlankPage,
  HeaderLeftHome,
};
