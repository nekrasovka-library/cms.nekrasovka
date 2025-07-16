import styled from "styled-components";
import { AFISHA_THEME } from "./afisha.constants.js";

const AfishaContainer = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const AfishaWrapper = styled.div`
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;
`;

const AfishaHeader = styled.div`
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

const AfishaHeaderTitle = styled.span`
  color: ${AFISHA_THEME.primaryColor};
  font-weight: ${AFISHA_THEME.fontWeightMedium};
`;

const AfishaHeaderLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${AFISHA_THEME.primaryColor};

  span {
    color: ${AFISHA_THEME.primaryColor};
  }
`;

const AfishaMain = styled.div`
  position: relative;
`;

const AfishaButton = styled.div`
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

const AfishaButtonLeft = styled(AfishaButton)`
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    left: -20px;

    svg {
      transform: rotate(180deg);
    }
  }
`;

const AfishaButtonRight = styled(AfishaButton)`
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    right: -20px;
  }
`;

const EventsContainer = styled.div`
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
  }

  /* Tablet styles */
  @media (max-width: ${AFISHA_THEME.breakpointLarge}) and (min-width: ${AFISHA_THEME.breakpointTablet}) {
    column-gap: ${AFISHA_THEME.spacingLg};
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    column-gap: ${AFISHA_THEME.spacingMd};
  }
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${AFISHA_THEME.borderRadius};
  background-image: ${(props) =>
    props.$backgroundImage !== "none"
      ? `url('${props.$backgroundImage}')`
      : "none"};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  color: ${AFISHA_THEME.primaryColor};
  box-sizing: border-box;

  a {
    text-decoration: none;
    color: inherit;
  }

  ${(props) =>
    props.$isError &&
    `
    position: relative;
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: ${AFISHA_THEME.overlayOpacity};
      border-radius: ${AFISHA_THEME.borderRadius};
      z-index: 1;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }

    > * {
      position: relative;
      z-index: 2;
    }
  `};

  /* Desktop and tablet shared styles */
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    height: 400px;
    min-width: 380px;
    max-width: 380px;
    padding: ${AFISHA_THEME.spacingLg};
  }

  /* Tablet styles */
  @media (max-width: ${AFISHA_THEME.breakpointLarge}) and (min-width: ${AFISHA_THEME.breakpointTablet}) {
    &:first-child {
      margin-left: ${AFISHA_THEME.spacingLg};
    }

    &:last-child {
      margin-right: ${AFISHA_THEME.spacingLg};
    }
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    height: 248px;
    min-width: 248px;
    max-width: 248px;
    padding: ${AFISHA_THEME.spacingSm};

    &:first-child {
      margin-left: ${AFISHA_THEME.spacingMd};
    }

    &:last-child {
      margin-right: ${AFISHA_THEME.spacingMd};
    }
  }
`;

const SkeletonCard = styled(EventCard)`
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: skeleton-loading 2s infinite;
  }

  @keyframes skeleton-loading {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const DateTimeSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: ${AFISHA_THEME.spacingXs};

  /* Desktop and tablet shared styles */
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    font-size: 18px;
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    font-size: 14px;
  }
`;

const DateTimeHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateText = styled.span`
  font-weight: ${AFISHA_THEME.fontWeightMedium};
  margin-right: 5px;
`;

const LocationText = styled.span`
  /* Desktop and tablet shared styles */
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    font-size: 14px;
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    font-size: 12px;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${AFISHA_THEME.spacingXs};
  margin-top: ${AFISHA_THEME.spacingXl};
`;

const EventTitle = styled.span`
  font-style: normal;
  font-weight: ${AFISHA_THEME.fontWeightMedium};

  /* Desktop and tablet shared styles */
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    font-size: 24px;
    line-height: 28px;
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    font-size: 14px;
    line-height: 17px;
  }
`;

const EventSubtitle = styled.span`
  font-style: normal;
  font-weight: ${AFISHA_THEME.fontWeightNormal};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  /* Desktop and tablet shared styles */
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    font-size: 21px;
    line-height: 25px;
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    font-size: 12px;
    line-height: 14px;
  }
`;

const FooterSection = styled.section`
  margin-top: auto;
`;

const PriceTag = styled.div`
  width: fit-content;
  padding: ${AFISHA_THEME.spacingSm};
  border: 1px solid ${AFISHA_THEME.primaryColor};
  border-radius: ${AFISHA_THEME.borderRadius};
  font-style: normal;
  font-weight: ${AFISHA_THEME.fontWeightNormal};
  font-size: 15px;
  line-height: 18px;
  margin-bottom: ${AFISHA_THEME.spacingMd};
`;

const SeriesText = styled.span`
  font-style: normal;
  font-weight: ${AFISHA_THEME.fontWeightNormal};
  font-size: 14px;
  line-height: 17px;
  margin-bottom: ${AFISHA_THEME.spacingSm};
`;

const TagsSection = styled.div`
  display: flex;
  justify-content: space-between;
  font-style: normal;
  font-weight: ${AFISHA_THEME.fontWeightNormal};
  line-height: 17px;

  /* Desktop and tablet shared styles */
  @media (min-width: ${AFISHA_THEME.breakpointTablet}) {
    font-size: 14px;
  }

  /* Mobile styles */
  @media (max-width: ${AFISHA_THEME.breakpointMobile}) {
    font-size: 12px;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${AFISHA_THEME.spacingXxxl};
  color: ${AFISHA_THEME.errorColor};
`;

const SkeletonText = styled.span`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: transparent;
  filter: blur(1px);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;

  @keyframes skeleton-pulse {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
`;

export {
  AfishaContainer,
  AfishaWrapper,
  AfishaHeader,
  AfishaHeaderTitle,
  AfishaHeaderLink,
  AfishaMain,
  AfishaButtonLeft,
  AfishaButtonRight,
  EventsContainer,
  EventCard,
  SkeletonCard,
  DateTimeSection,
  DateTimeHeader,
  DateText,
  LocationText,
  TitleSection,
  EventTitle,
  EventSubtitle,
  FooterSection,
  PriceTag,
  SeriesText,
  TagsSection,
  ErrorMessage,
  SkeletonText,
};
