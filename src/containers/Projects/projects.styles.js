import styled from "styled-components";

const ProjectsContainer = styled.main`
  max-width: 1160px;
  margin: 0 auto;
`;

const ProjectsHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 35px 0 30px;

  > div {
    font-size: 18px;

    &:nth-child(1) {
      font-weight: 300;
      opacity: 0.5;
    }

    &:nth-child(2) {
      display: flex;
      align-items: center;
      column-gap: 10px;
    }
  }

  @media (hover: hover) {
    > div:nth-child(2) {
      cursor: pointer;

      &:hover {
        color: #f4846b;
      }
    }
  }
`;

const ProjectsCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const ProjectCardContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  transition: background-color 0.2s ease-in-out;
  position: relative;
  padding: 20px 30px 0;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: #000;
  }

  > div {
    &:nth-child(1) {
      display: flex;
      height: 140px;
      border-bottom: 1px solid #d9d9d9;
      cursor: pointer;

      a {
        font-size: 36px;
        line-height: 1.2;
        font-weight: 300;
        text-overflow: ellipsis;
      }
    }

    &:nth-child(2) {
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: space-between;

      > div {
        cursor: pointer;

        &:nth-child(1) {
          font-size: 12px;
          font-weight: 500;
        }

        &:nth-child(2) {
          font-size: 14px;
        }
      }
    }
  }

  @media (hover: hover) {
    &:hover {
      background-color: #eee;
    }

    > div:nth-child(1):hover a,
    > div:nth-child(2) > div a:hover {
      color: #f4846b;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 111111;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 600px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 30px 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 30px 15px 15px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &.primary {
    background-color: #fa8669;
    color: white;
  }

  &.secondary {
    background: #fff;
    border: 1px solid #b7b7b7;
    color: #000;
  }

  @media (hover: hover) {
    &.secondary:hover {
      border-color: #fa8669;
    }
  }
`;

export {
  ProjectCardContainer,
  ProjectsContainer,
  ProjectsHeaderContainer,
  ProjectsCardsContainer,
  ButtonGroup,
  Form,
  ModalContent,
  ModalOverlay,
  Button,
  FormTitle,
};
