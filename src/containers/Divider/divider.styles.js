import styled from "styled-components";

const DividerContainer = styled.div`
  opacity: ${({ $opacity }) => $opacity};
  transition: opacity 0.3s ease-in-out;
  height: 15px;

  hr {
    height: 1px;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
  }

  @media (hover: hover) {
    &:hover {
      opacity: 0.6;
    }
  }
`;

export { DividerContainer };
