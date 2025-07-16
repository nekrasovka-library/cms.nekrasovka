import styled from "styled-components";

const DividerContainer = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const DividerComponent = styled.div`
  height: 1px;
  background-color: ${({ $color }) => $color};
  opacity: ${({ $opacity }) => $opacity};
  transition: opacity 0.3s ease-in-out;
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;

  @media (hover: hover) {
    &:hover {
      opacity: 0.6;
    }
  }
`;

export { DividerContainer, DividerComponent };
