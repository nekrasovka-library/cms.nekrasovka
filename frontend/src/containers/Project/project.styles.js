import styled from "styled-components";

const ProjectContainer = styled.main`
  max-width: 1160px;
  margin: 0 auto;

  a {
    text-decoration: none;
  }
`;

const ProjectHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  row-gap: 30px;

  > div {
    display: flex;
    align-items: center;
    width: 100%;

    &:nth-child(1) {
      visibility: ${({ $isProjectSettingsOpen }) =>
        $isProjectSettingsOpen ? "hidden" : "visible"};
      justify-content: flex-end;

      > div {
        display: flex;
        column-gap: 5px;
        font-size: 16px;
        font-weight: 300;
        width: 471.39px;

        span:nth-child(2) {
          color: #000;
        }
      }

      span {
        color: #999;
      }

      a {
        color: ${({ $isHref }) => ($isHref ? "#999" : "#f4846b")};
      }
    }

    &:nth-child(2) {
      justify-content: space-between;

      h3 {
        font-size: 50px;
        margin: 0;
        font-weight: 300;

        &:nth-child(2) {
          opacity: 0.3;
        }
      }

      > div {
        display: flex;
        column-gap: 20px;
        align-items: center;

        > div {
          display: flex;
          align-items: center;
          column-gap: 10px;
          font-size: 18px;
          color: #000;
          cursor: pointer;

          &:nth-child(1) {
            svg {
              width: 27px;
              height: 27px;
            }
          }
        }
      }
    }
  }

  @media (hover: hover) {
    > div:nth-child(2) > div > div span:hover,
    > div:nth-child(2) > div > div div:hover {
      color: #f4846b;
    }
  }
`;

const ProjectMainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectMainContainerHeader = styled.div`
  font-size: 18px;
  font-weight: 300;
  opacity: 0.5;
  padding: 35px 0 30px;
`;

const ProjectMainCardContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  height: 60px;
  border-bottom: 1px solid #d5d5d5;
  cursor: pointer;

  > :nth-child(1) {
    display: flex;
    width: 100%;
    column-gap: 10px;
  }

  > :nth-child(2) {
    color: #979797;
    text-align: left;
  }

  > :last-child {
    visibility: hidden;
    display: flex;
    justify-content: flex-end;

    > div {
      display: flex;
      align-items: center;
      column-gap: 10px;
      font-size: 10px;
    }
  }

  @media (hover: hover) {
    a:hover,
    > :last-child > div:hover {
      color: #f4846b;
    }

    &:hover > div:last-child {
      visibility: visible;
    }
  }

  a {
    color: #000;
  }
`;

const ProjectSettingsContainer = styled.div`
  background: #fff;
  border: 1px solid #e7e7e7;

  > div {
    display: flex;

    &:nth-child(1) {
      width: 225px;
      border-right: 1px solid #ddd;
    }

    &:nth-child(2) {
    }
  }
`;

export {
  ProjectContainer,
  ProjectHeaderContainer,
  ProjectMainContainer,
  ProjectMainCardContainer,
  ProjectMainContainerHeader,
  ProjectSettingsContainer,
};
