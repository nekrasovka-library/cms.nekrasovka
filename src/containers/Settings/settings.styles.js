import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
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
  width: 320px;
  left: 0;
  z-index: 1120;
  background-color: #fff;
`;

const HeaderContainer = styled.div`
  margin-bottom: 10px;
`;

const HeaderButtons = styled.div`
  display: flex;
`;

const HeaderButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border: none;
  border-radius: 0;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  height: 60px;
  outline: none;
  padding-left: 20px;
  padding-right: 20px;
  white-space: nowrap;
  transition-duration: 0.3s;
  transition-property: font-size;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      font-size: 13px;
    }
  }
`;

const HeaderButtonSave = styled(HeaderButton)`
  background-color: #000;
`;

const HeaderButtonSaveAndExit = styled(HeaderButton)`
  background-color: #ff855d;
`;

const PaddingContainer = styled.div`
  align-items: flex-end;
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 0 15px;

  > div {
    width: 100%;
  }
`;

const SettingsLabel = styled.label`
  align-items: flex-start;
  color: #000;
  display: flex;
  gap: 5px;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const PaddingSelect = styled.select`
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  color: #000;
  font-size: 16px;
  font-weight: 300;
  height: 40px;
  outline: none !important;
  padding: 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 5px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const GridColumn = styled.div`
  height: 60px;
  background-color: ${({ isSelected }) => (isSelected ? "#ff855d" : "#d4d4d4")};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;

  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 9.5px;

    label:last-child span {
      text-transform: lowercase;
    }
  }
`;

export {
  Container,
  Container1,
  HeaderContainer,
  HeaderButtons,
  HeaderButtonSave,
  HeaderButtonSaveAndExit,
  SettingsLabel,
  PaddingSelect,
  PaddingContainer,
  GridContainer,
  GridColumn,
  ColumnsContainer,
};
