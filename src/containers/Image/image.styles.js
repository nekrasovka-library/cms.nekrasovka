import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  height: 550px;

  img {
    width: 100%;
    height: 100%;
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    object-fit: cover;
  }
`;

const ImageFileContainer = styled.input`
  visibility: hidden;
  position: absolute;
`;

export { ImageContainer, ImageFileContainer };
