import styled from "styled-components";

const ButtonContainer = styled.div`
  text-align: ${({ $textAlign }) => $textAlign};

  a {
    text-decoration: none;
  }

  a,
  button {
    color: ${({ $color }) => $color};
    border-width: ${({ $border }) => $border.width}px;
    border-style: ${({ $border }) => $border.style};
    border-color: ${({ $border }) => $border.color};
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    height: ${({ $height }) => $height}px;
    padding-left: 60px;
    padding-right: 60px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

export { ButtonContainer };
