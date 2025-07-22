import styled from "styled-components";

const TextContainer = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const TextComponent = styled.div`
  ${({ $gap, $tracks }) =>
    $gap && $tracks
      ? `display: grid !important; grid-template-columns: repeat(${$tracks}, 1fr); gap: ${$gap}px;`
      : "display: flex;"};
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;
`;

export { TextContainer, TextComponent };
