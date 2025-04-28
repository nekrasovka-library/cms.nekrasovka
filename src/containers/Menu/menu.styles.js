import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  top: 0;
  transition-duration: 0.3s;
  transition-property: opacity, transform;
  transition-timing-function: ease-in-out;
  color: #333;
  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? "1" : "0")};
  transform: translateX(${({ $isMenuOpen }) => ($isMenuOpen ? "0" : "-100%")});
`;

const Container1 = styled(Container)`
  width: 240px;
  left: 0;
  z-index: 1120;
  background-color: ${({ $isVariantOpen }) =>
    $isVariantOpen ? "rgb(242, 242, 242)" : "#fff"};
`;

const Container2 = styled(Container)`
  left: 240px;
  z-index: 1119;
  padding: 0 10px;
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
`;

const MainItemVariant = styled.div`
  padding: 20px 10px;
  border-bottom: 1px solid;
  border-bottom-color: #eee;
  cursor: pointer;
  transition-duration: 0.3s;
  transition-property: border, scale;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);

  img {
    max-width: 320px;
    width: auto;
  }

  @media (hover: hover) {
    &:hover {
      border-bottom-color: #ff855d !important;
      scale: 0.95;
    }
  }
`;

const MainItem = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  height: 45px;
  padding-left: 20px;
  transition-duration: 0.3s;
  transition-property: border, margin;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);
  border-bottom: 1px solid #eee;
  border-right: ${({ $isMenuItemActive }) => ($isMenuItemActive ? "7px" : "0")}
    solid #ff855d;
  margin-left: ${({ $isMenuItemActive }) => ($isMenuItemActive ? "5px" : "0")};

  @media (hover: hover) {
    cursor: pointer;

    &:hover {
      margin-left: 5px;
    }
  }
`;

const CloseMenuButton = styled.div`
  @media (hover: hover) {
    :hover {
      svg {
        scale: 0.9;
      }
    }
  }
`;

export {
  Header,
  Main,
  MainItem,
  CloseMenuButton,
  Container1,
  Container2,
  MainItemVariant,
};
