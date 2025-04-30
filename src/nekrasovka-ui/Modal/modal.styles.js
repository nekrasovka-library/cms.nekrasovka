import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;

  ${({ $isModal }) =>
    $isModal &&
    "background-color: rgba(0,0,0,0.05); position: fixed; top: 0; z-index: 1;"}
`;

export { Container };
