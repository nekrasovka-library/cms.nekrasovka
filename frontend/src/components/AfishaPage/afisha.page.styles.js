import styled from "styled-components";
import { AFISHA_THEME } from "./afisha.page.constants";

const AfishaPageStyled = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    padding-right: 15px;
    padding-left: 15px;
  }
`;

const AfishaContainerStyled = styled.div`
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;
`;

const AfishaHeaderStyled = styled.div`
  /* Large desktop styles */
  @media (min-width: ${AFISHA_THEME.breakpointDesktop}) {
    margin-bottom: ${AFISHA_THEME.spacingXxl};
  }

  /* Medium desktop styles */
  @media (max-width: ${AFISHA_THEME.breakpointLarge}) {
    margin-bottom: ${AFISHA_THEME.spacingLg};
  }

  /* Tablet styles */
  @media (max-width: ${AFISHA_THEME.breakpointLarge}) and (min-width: ${AFISHA_THEME.breakpointTablet}) {
    padding-left: ${AFISHA_THEME.spacingLg};
    padding-right: ${AFISHA_THEME.spacingLg};
  }

  /* Desktop and tablet shared styles */

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    padding-left: ${AFISHA_THEME.spacingMd};
    padding-right: ${AFISHA_THEME.spacingMd};
  }
`;

const AfishaHeaderTitleStyled = styled.div`
  display: flex;
  column-gap: 10px;
  color: ${AFISHA_THEME.primaryColor};

  > span {
    &:first-child {
      font-weight: ${AFISHA_THEME.fontWeightMedium};
    }
  }

  /* Desktop and tablet shared styles */
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    margin-bottom: 30px;

    > span {
      font-size: 24px;
    }
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    margin-bottom: 20px;

    > span {
      font-size: 16px;
    }
  }
`;

const AfishaWrapperStyled = styled.div`
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;
`;

const ErrorMessageStyled = styled.div`
  text-align: center;
  padding: ${AFISHA_THEME.spacingXxxl};
  color: ${AFISHA_THEME.errorColor};
`;

const AfishaMainStyled = styled.div`
  ${({ $view }) =>
    $view === "mozaic" &&
    `
  @media (min-width: ${AFISHA_THEME.breakpointDesktop}) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    & > div {
      height: 400px;
    }
  }
  @media (max-width: ${AFISHA_THEME.breakpointLarge}) and (min-width: ${AFISHA_THEME.breakpointTablet}) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    gap: 20px;

    & > div {
      height: 400px;
    }
  }
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    gap: 15px;

    & > div {
      height: 290px;
    }
  }`};

  ${({ $view }) =>
    $view === "list" &&
    `
    display: flex;
    flex-direction: column;
  `}
`;

const LoadMoreButton = styled.button`
  font-family: Rubik, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  height: 40px;
  width: 100%;
  text-align: center;
  color: #346178;
  border: 1px solid #346178;
  border-radius: 5px;
  cursor: pointer;

  /* Tablet styles */
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    margin-top: 40px;
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    margin-top: 25px;
  }

  @media (hover: hover) {
    &:hover {
      background: #346178;
      color: #edeee9;
    }
  }
`;

const AfishaHeaderTagsAndSortStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AfishaHeaderTagsStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  > div {
    &:nth-child(1) {
      display: flex;
      column-gap: 10px;
    }

    &:nth-child(2) {
      display: flex;
      column-gap: 15px;

      & > div {
        display: flex;
        column-gap: 5px;

        & > span {
          font-family: Rubik, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 21px;
          color: #346178;
        }

        &:last-child {
          font-family: Rubik, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 21px;
          color: #777777;
        }
      }
    }
  }
`;

const TagStyled = styled.div`
  border: 1px solid #346178;
  border-radius: 5px;

  font-family: Rubik, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  width: fit-content;
  padding: 0 10px;
  height: 30px;
  display: flex;
  align-items: center;
  color: #346178;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background: #346178;
      color: #edeee9;
    }
  }
`;

const AfishaHeaderViewStyled = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: flex-start;

  button:nth-child(1) {
    svg {
      rect {
        fill: ${({ $view }) => ($view === "mozaic" ? "#346178" : "#777777")};
      }
    }
  }

  button:nth-child(2) {
    svg {
      path {
        fill: ${({ $view }) => ($view === "list" ? "#346178" : "#777777")};
      }
    }
  }

  @media (hover: hover) {
    button:nth-child(1):hover {
      svg {
        rect {
          fill: #346178;
        }
      }
    }

    button:nth-child(2):hover {
      svg {
        path {
          fill: #346178;
        }
      }
    }
  }
`;

export {
  AfishaPageStyled,
  AfishaContainerStyled,
  AfishaHeaderStyled,
  AfishaHeaderTitleStyled,
  AfishaMainStyled,
  LoadMoreButton,
  AfishaHeaderTagsAndSortStyled,
  AfishaHeaderTagsStyled,
  AfishaHeaderViewStyled,
  TagStyled,
  AfishaWrapperStyled,
  ErrorMessageStyled,
};
