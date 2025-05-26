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

  > div {
    &:nth-child(1) {
      display: flex;
      height: 140px;
      border-bottom: 1px solid #d9d9d9;
      font-size: 36px;
      line-height: 1.2;
      font-weight: 300;
      text-overflow: ellipsis;
      cursor: pointer;
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

    > div:nth-child(1):hover,
    > div:nth-child(2) > div:hover {
      color: #f4846b;
    }
  }
`;

export {
  ProjectCardContainer,
  ProjectsContainer,
  ProjectsHeaderContainer,
  ProjectsCardsContainer,
};
