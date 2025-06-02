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
  row-gap: 30px;
  min-height: 150px;
  padding: 15px;
  position: absolute;
  top: calc(100% + 10px);
  ${({ $textAlign }) => $textAlign === "left" && { left: "0" }};
  ${({ $textAlign }) => $textAlign === "right" && { right: "0" }};
  ${({ $textAlign }) =>
    $textAlign === "center" && { left: "calc(50% - 140px)" }};
  width: 280px;
  z-index: 109011;

  > div {
    display: flex;

    &:not(:last-child) {
      flex-direction: column;
      row-gap: 10px;

      input {
        font-size: 14px;
        font-weight: 300;

        &[type="checkbox"] {
          appearance: none;
          width: 15px;
          height: 15px;
          background-color: #fff;
          border-width: 1px;
          border-style: solid;
          border-color: #000;
          border-radius: 3px;
          cursor: pointer;
          display: inline-block;
          position: relative;
          transition: border-color 0.1s ease-in-out;
          opacity: 0.5;

          &:checked::after {
            content: "";
            position: absolute;
            top: calc(50% - 5.5px);
            left: calc(50% - 2.5px);
            width: 3px;
            height: 7px;
            border: solid #fa8669; /* Цвет галочки */
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }

          &:checked {
            border-color: #fa8669;
            border-width: 2px;
          }
        }
      }
    }

    &:last-child {
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
          color: #000;
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

  @media (hover: hover) {
    input[type="checkbox"]:hover {
      border-color: #fa8669 !important;
      opacity: 1;
    }
  }
`;

const ButtonFormCheckbox = styled.label`
  display: flex;
  column-gap: 5px;
  align-items: center;

  span {
    font-size: 11px;
    font-weight: 400;
  }
`;

export { ButtonContainer, Button, ButtonForm, ButtonFormCheckbox };
