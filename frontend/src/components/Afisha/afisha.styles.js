import styled from "styled-components";

const AfishaContainer = styled.div`
  position: relative;

  & .events-container {
    column-gap: ${({ $gap }) => $gap}px;
  }
`;

export { AfishaContainer };
