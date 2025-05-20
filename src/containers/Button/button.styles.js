import styled from "styled-components";

const ButtonContainer = styled.div`
  position: relative;
`;

const Button = styled.div`
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
    background-color: ${({ $backgroundColor }) => $backgroundColor};
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

const ButtonForm = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  font-family: tfutura, Arial, sans-serif;
  gap: 16px;
  min-height: 150px;
  padding: 15px;
  position: absolute;
  top: calc(100% + 10px);
  left: calc(50% - 140px);
  width: 280px;
  z-index: 109011;

  > div {
    &:last-child {
      display: flex;
      column-gap: 10px;

      button {
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 300;
        line-height: 1;
        padding: 10px 16px;
        width: 100%;
        text-align: center;

        &:nth-child(1) {
          background-color: #fff;
          border: 1px solid #b7b7b7;
        }

        &:nth-child(2) {
          background-color: #fa8669;
          border: 1px solid #fa8669;
          color: #fff;
          font-weight: 400;
        }
      }
    }
  }
`;

export { ButtonContainer, Button, ButtonForm };
