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
      justify-content: flex-end;
      column-gap: 5px;
      font-size: 16px;
      font-weight: 300;

      span {
        color: #999;
      }

      a {
        color: ${({ $isHref }) => ($isHref ? "#999" : "#f4846b")};
      }
    }

    &:nth-child(2) {
      justify-content: space-between;
      font-weight: 300;

      span {
        font-size: 50px;
      }

      a {
        color: #000;
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
    > div:nth-child(2) > div > div a:hover,
    > div:nth-child(2) > div > div div:hover {
      color: #f4846b;
    }
  }
`;

const ProjectMainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectMainCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid #d5d5d5;
  cursor: pointer;

  > :nth-child(1) {
    display: flex;
    width: 100%;
    column-gap: 10px;
  }

  > :last-child {
    visibility: hidden;

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

export {
  ProjectContainer,
  ProjectHeaderContainer,
  ProjectMainContainer,
  ProjectMainCardContainer,
};
