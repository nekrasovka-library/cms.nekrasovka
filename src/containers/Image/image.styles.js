import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;

  > div {
    min-width: 100%;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const ImageFile = styled.input`
  visibility: hidden;
`;

export { ImageContainer, ImageFile };
