import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;

  img {
    min-width: 100%;
    width: 100%;
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
  }
`;

const ImageFileContainer = styled.input`
  visibility: hidden;
  position: absolute;
`;

export { ImageContainer, ImageFileContainer };
