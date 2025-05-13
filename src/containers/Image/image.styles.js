import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;

  > div {
    min-width: 100%;
  }

  img {
    width: 100%;
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
  }
`;

const ImageFile = styled.input`
  visibility: hidden;
`;

export { ImageContainer, ImageFile };
