import styled from "styled-components";

const TextContainer = styled.div`
  ${({ $gap, $tracks }) =>
    $gap &&
    $tracks &&
    `display: grid !important; grid-template-columns: repeat(${$tracks}, 1fr); gap: ${$gap}px;`};
  text-align: ${({ $textAlign }) => $textAlign};
`;

export { TextContainer };
