import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddBlankBlockButton = styled.div`
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  opacity: ${({ $isBlankBlockFocused }) => ($isBlankBlockFocused ? "1" : "0")};
`;

export { Container, AddBlankBlockButton };
