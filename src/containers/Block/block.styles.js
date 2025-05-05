import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const BlankBlockButtons = styled.div`
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  opacity: ${({ $isBlankBlockFocused }) => ($isBlankBlockFocused ? "1" : "0")};
`;

const BlankBlockAddButton = styled(BlankBlockButtons)`
  position: absolute;
  bottom: calc(-37px / 2);
  left: calc(100% / 2 - 37px / 2);
  z-index: 1;
  background-color: #fff;
`;

const BlankBlockDots = styled(BlankBlockButtons)`
  border-bottom: 1px dashed #ccc;
  position: relative;
  bottom: 0;
  width: 100vw;
  z-index: -1;
`;

const BlankBlockActionButtons = styled(BlankBlockButtons)`
  display: flex;
  position: absolute;
  top: 0;
  right: 10px;
  z-index: 1;
  background-color: #fff;

  > div {
    border: 1px solid #ccc;
    transition: background-color 0.2s ease-in-out;

    button {
      height: 35px;
      width: 35px;
    }

    &:not(:first-child) {
      border-left-width: 0;
    }

    &:first-child {
      border-bottom-left-radius: 3px;
      border-top-left-radius: 3px;
    }

    &:last-child {
      border-bottom-right-radius: 3px;
      border-top-right-radius: 3px;
    }
  }

  @media (hover: hover) {
    > div:hover {
      background-color: #eee;
    }
  }
`;

const TypeBlockContainer = styled.div`
  ${({ $typeBlockStyles }) => $typeBlockStyles};
`;

export {
  Container,
  BlankBlockActionButtons,
  BlankBlockDots,
  TypeBlockContainer,
  BlankBlockAddButton,
};
