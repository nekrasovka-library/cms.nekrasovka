import styled from "styled-components";

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  height: 100vh;
  position: fixed;
  top: 0;
  transition-duration: 0.3s;
  transition-property: opacity, transform;
  transition-timing-function: ease-in-out;
  color: #333;
  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? "1" : "0")};
  transform: translateX(${({ $isMenuOpen }) => ($isMenuOpen ? "0" : "-100%")});
  border-right: 1px solid #eee;
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
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.2);
  color: #000;
  font-size: 16px;
  font-weight: 300;
  height: 40px;
  outline: none !important;
  padding: 0;
  width: 100%;

  transition-duration: 0.3s;
  transition-property: border-color;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);

  @media (hover: hover) {
    &:hover {
      border-color: #ff855d;
    }
  }
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
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#ff855d" : "#d4d4d4"};
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

const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 15px;
`;

const ColorChange = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;

  transition-duration: 0.3s;
  transition-property: border-color, scale;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);

  button {
    margin-left: auto;
    visibility: hidden;
  }

  @media (hover: hover) {
    &:hover {
      border-color: #ff855d;

      button {
        visibility: visible;
      }
    }

    button:hover {
      scale: 0.9;
    }
  }
`;

const ColorCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  ${({ $backgroundColor }) =>
    $backgroundColor === "transparent"
      ? `background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath fill='%23CCC' d='M0 0h5v5H0zM5 5h5v5H5z'/%3E%3Cpath fill='%23fff' d='M5 0h5v5H5zM0 5h5v5H0z'/%3E%3C/svg%3E")`
      : `background-color: ${$backgroundColor}`}
`;

const ColorInput = styled.input`
  padding: 5px;
  font-size: 16px;
  border: none;
  outline: none;

  &::placeholder {
    opacity: 0.6;
  }
`;

const AlignContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 15px;
`;

const RadiusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 15px;
`;

const RadiusInput = styled.input`
  padding: 5px;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.2);

  transition-duration: 0.3s;
  transition-property: border-color, scale;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);

  &::-webkit-inner-spin-button {
    display: none;
  }

  &::placeholder {
    opacity: 0.6;
  }

  @media (hover: hover) {
    &:hover {
      border-color: #ff855d;
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
  ColorContainer,
  ColorChange,
  ColorCircle,
  ColorInput,
  AlignContainer,
  RadiusContainer,
  RadiusInput,
};
