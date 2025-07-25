import styled from "styled-components";

const ImageContainer = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const ImageComponent = styled.div`
  display: flex;
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  ${({ $maxWidth }) => $maxWidth && `margin: 0 auto;`};

  img {
    width: 100%;
    height: ${({ $height }) => $height};
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    object-fit: cover;
  }
`;

const ImageFileContainer = styled.input`
  visibility: hidden;
  position: absolute;
`;

export { ImageComponent, ImageFileContainer, ImageContainer };
