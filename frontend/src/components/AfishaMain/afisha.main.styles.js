import styled from "styled-components";
import { AFISHA_THEME } from "./afisha.main.constants.js";

const AfishaContainerStyled = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const AfishaWrapperStyled = styled.div`
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;
`;

const AfishaHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    color: ${AFISHA_THEME.primaryColor};
  }

  > span {
    font-weight: ${AFISHA_THEME.fontWeightMedium};
  }

  > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${AFISHA_THEME.primaryColor};
  }

  > a svg {
    margin-left: ${AFISHA_THEME.spacingXs};
  }

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
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    > span {
      font-size: 24px;
    }

    > a span {
      font-size: 14px;
    }
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    padding-left: ${AFISHA_THEME.spacingMd};
    padding-right: ${AFISHA_THEME.spacingMd};

    > span {
      font-size: 16px;
    }

    > a span {
      font-size: 12px;
    }
  }
`;

const AfishaHeaderTitleStyled = styled.span`
  color: ${AFISHA_THEME.primaryColor};
  font-weight: ${AFISHA_THEME.fontWeightMedium};
`;

const AfishaHeaderLinkStyled = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${AFISHA_THEME.primaryColor};

  span {
    color: ${AFISHA_THEME.primaryColor};
  }
`;

const AfishaMainStyled = styled.div`
  position: relative;
`;

const AfishaButtonStyled = styled.div`
  /* Desktop and tablet shared styles */
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    position: absolute;
    top: calc(50% - 20px);
    z-index: 100;
    border-radius: 50%;
    cursor: pointer;
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    display: none;
  }
`;

const AfishaButtonLeftStyled = styled(AfishaButtonStyled)`
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    left: -20px;

    svg {
      transform: rotate(180deg);
    }
  }
`;

const AfishaButtonRightStyled = styled(AfishaButtonStyled)`
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    right: -20px;
  }
`;

const EventsContainerStyled = styled.div`
  display: flex;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Large desktop styles */
  @media (min-width: ${AFISHA_THEME.breakpointDesktop}) {
    column-gap: ${({ $gap }) => $gap}px;

    & > div {
      height: 400px;
      min-width: 380px;
    }
  }

  /* Tablet styles */
  @media (max-width: ${AFISHA_THEME.breakpointLarge}) and (min-width: ${AFISHA_THEME.breakpointTablet}) {
    column-gap: ${AFISHA_THEME.spacingLg};

    & > div {
      height: 400px;
      min-width: 380px;
    }
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    column-gap: ${AFISHA_THEME.spacingMd};

    & > div {
      height: 290px;
      min-width: 290px;

      &:first-child {
        margin-left: 15px;
      }

      &:last-child {
        margin-right: 15px;
      }
    }
  }
`;

const ErrorMessageStyled = styled.div`
  text-align: center;
  padding: ${AFISHA_THEME.spacingXxxl};
  color: ${AFISHA_THEME.errorColor};
`;

export {
  AfishaButtonLeftStyled,
  AfishaButtonRightStyled,
  AfishaContainerStyled,
  AfishaHeaderLinkStyled,
  AfishaHeaderStyled,
  AfishaHeaderTitleStyled,
  AfishaMainStyled,
  AfishaWrapperStyled,
  ErrorMessageStyled,
  EventsContainerStyled,
};
