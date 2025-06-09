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

const ProjectMainCardPageName = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  > div {
    display: flex;
  }

  > a {
    display: flex;
    column-gap: 10px;
  }

  input {
    border: none;
    outline: none;
    font-family: inherit;
    padding: 0;
  }

  span,
  input {
    font-size: 17px;
  }

  > div {
    display: flex;
    column-gap: 10px;

    svg {
      visibility: hidden;
      opacity: 0.3;
    }
  }
`;

const ProjectMainCardContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  height: 60px;
  border-bottom: 1px solid #d5d5d5;
  cursor: pointer;

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
    > :nth-child(1):hover a,
    > :last-child > div:hover {
      color: #f4846b;
    }

    > :nth-child(1) > div svg:hover {
      opacity: 1;
    }

    &:hover > div:last-child,
    &:hover > :nth-child(1) > div svg {
      visibility: visible;
    }
  }

  a {
    color: #000;
  }
`;

const ProjectSettingsContainer = styled.div`
  display: grid;
  grid-template-columns: 225px 1fr;
  background: #fff;
  border: 1px solid #e7e7e7;
`;

const ProjectSettingsTitles = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
`;

const ProjectSettingsTitlesTitle = styled.div`
  padding: 18px 30px;
  transition-duration: 0.1s;
  transition-property: background-color, color;
  transition-timing-function: ease-in-out;
  font-weight: 400;
  font-size: 18px;

  ${({ $isTitleActive }) =>
    $isTitleActive && "background-color: #fa876b; color: #fff;"};

  @media (hover: hover) {
    &:hover {
      ${({ $isTitleActive }) =>
        !$isTitleActive &&
        "background-color: rgba(0, 0, 0, 0.03); color: #fa876b; cursor: pointer;"};
    }
  }
`;

const ProjectSettingsActions = styled.div`
  padding: 60px 150px;
  display: flex;
  justify-content: center;
`;

const ProjectSettingsProjectMain = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 45px;
  width: 100%;

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    input {
      font-size: 24px;
      font-weight: 300;
      color: #000;
    }
  }
`;

const ProjectSettingsFontsAndColors = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 45px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    select, input {
      font-size: 24px;
      font-weight: 300;
      color: #000;
    }
  }
`;

const ProjectSettingsMainPage = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;

  select {
    font-size: 24px;
    font-weight: 300;
    color: #000;
    cursor: pointer;
  }

  > div:last-child {
    font-size: 15px;
    font-weight: 300;
    color: #333;
    padding: 20px 0 10px;
  }
`;

export {
  ProjectContainer,
  ProjectHeaderContainer,
  ProjectMainContainer,
  ProjectMainCardContainer,
  ProjectMainContainerHeader,
  ProjectSettingsContainer,
  ProjectSettingsTitles,
  ProjectSettingsTitlesTitle,
  ProjectSettingsActions,
  ProjectSettingsMainPage,
  ProjectMainCardPageName,
  ProjectSettingsProjectMain,
  ProjectSettingsFontsAndColors,
};
