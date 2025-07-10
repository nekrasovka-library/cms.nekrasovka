import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;

  img {
    width: 100%;
    height: ${({ $height }) => $height}px;
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    object-fit: cover;
  }
`;

const ImageFileContainer = styled.input`
  visibility: hidden;
  position: absolute;
`;

export { ImageContainer, ImageFileContainer };
