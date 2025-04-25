import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 240px;
  position: fixed;
  left: 0;
  top: 0;
  transition-duration: 0.3s;
  transition-property: opacity, transform;
  transition-timing-function: ease-in-out;
  z-index: 1120;
  color: #333;
  background-color: #fff;

  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? "1" : "0")};
  transform: translateX(${({ $isMenuOpen }) => ($isMenuOpen ? "0" : "-100%")});
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

export { Container, Header, Main, MainItem, CloseMenuButton };
