import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BlankBlockButtons = styled.div`
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  opacity: ${({ $isBlankBlockFocused }) => ($isBlankBlockFocused ? "1" : "0")};
`;

const BlankBlockActionButtons = styled(BlankBlockButtons)`
  display: flex;
  position: absolute;
  top: 0;
  right: 10px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    height: 35px;
    width: 35px;
    transition: background-color 0.2s ease-in-out;

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

export { Container, BlankBlockButtons, BlankBlockActionButtons };
