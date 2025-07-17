import styled from "styled-components";
import { AFISHA_THEME } from "../AfishaMain/afisha.main.constants";

// Извлеченные переменные для медиа-запросов
const DESKTOP_TABLET_MEDIA = `@media (min-width: ${AFISHA_THEME.breakpointTablet})`;
const TABLET_ONLY_MEDIA = `@media (max-width: ${AFISHA_THEME.breakpointLarge}) and (min-width: ${AFISHA_THEME.breakpointTablet})`;
const MOBILE_MEDIA = `@media (max-width: ${AFISHA_THEME.breakpointMobile})`;

// Извлеченные переменные для анимаций
const SKELETON_LOADING_ANIMATION = `
  @keyframes skeleton-loading {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const SKELETON_PULSE_ANIMATION = `
  @keyframes skeleton-pulse {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
`;

// Извлеченные переменные для повторяющихся стилей
const SKELETON_BASE_STYLES = `
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: transparent;
  filter: blur(1px);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
`;

const SKELETON_LOADING_OVERLAY = `
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
`;

const ERROR_OVERLAY_STYLES = `
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
`;

const RESPONSIVE_FONT_STYLES = `
  ${DESKTOP_TABLET_MEDIA} {
    font-size: 14px;
  }
  ${MOBILE_MEDIA} {
    font-size: 12px;
  }
`;

const EventCardStyled = styled.div`
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

  ${(props) => props.$isError && ERROR_OVERLAY_STYLES};
  ${({ $loading }) => $loading && SKELETON_LOADING_OVERLAY};

  ${SKELETON_LOADING_ANIMATION}
  ${SKELETON_PULSE_ANIMATION}
  
  ${DESKTOP_TABLET_MEDIA} {
    height: 400px;
    min-width: 380px;
    max-width: 380px;
    padding: ${AFISHA_THEME.spacingLg};
  }

  ${TABLET_ONLY_MEDIA} {
    &:first-child {
      margin-left: ${AFISHA_THEME.spacingLg};
    }
    &:last-child {
      margin-right: ${AFISHA_THEME.spacingLg};
    }
  }

  ${MOBILE_MEDIA} {
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

const DateTextStyled = styled.span`
  font-weight: ${AFISHA_THEME.fontWeightMedium};
  margin-right: 5px;
  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION}
`;

const WeekdayStyled = styled.span`
  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION}
`;

const TimeStyled = styled.time`
  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION}
`;

const LocationTextStyled = styled.span`
  ${RESPONSIVE_FONT_STYLES}
  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION}
`;

const TitleSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${AFISHA_THEME.spacingXs};
  margin-top: ${AFISHA_THEME.spacingXl};
`;

const PriceTagStyled = styled.div`
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

const TagsSectionStyled = styled.div`
  display: flex;
  justify-content: space-between;
  font-style: normal;
  font-weight: ${AFISHA_THEME.fontWeightNormal};
  line-height: 17px;
  ${RESPONSIVE_FONT_STYLES}
`;

const EventTitleStyled = styled.span`
  font-style: normal;
  font-weight: ${AFISHA_THEME.fontWeightMedium};

  ${DESKTOP_TABLET_MEDIA} {
    font-size: 24px;
    line-height: 28px;
  }

  ${MOBILE_MEDIA} {
    font-size: 14px;
    line-height: 17px;
  }

  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION}
`;

const EventSubtitleStyled = styled.span`
  font-style: normal;
  font-weight: ${AFISHA_THEME.fontWeightNormal};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${DESKTOP_TABLET_MEDIA} {
    font-size: 21px;
    line-height: 25px;
  }

  ${MOBILE_MEDIA} {
    font-size: 12px;
    line-height: 14px;
  }

  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION}
`;

const FooterSectionStyled = styled.section`
  margin-top: auto;
  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION}
`;

const DateTimeSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: ${AFISHA_THEME.spacingXs};

  ${DESKTOP_TABLET_MEDIA} {
    font-size: 18px;
  }

  ${MOBILE_MEDIA} {
    font-size: 14px;
  }
`;

const DateTimeHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

export {
  EventCardStyled,
  DateTextStyled,
  LocationTextStyled,
  TitleSectionStyled,
  PriceTagStyled,
  TagsSectionStyled,
  EventTitleStyled,
  EventSubtitleStyled,
  FooterSectionStyled,
  DateTimeSectionStyled,
  DateTimeHeaderStyled,
  WeekdayStyled,
  TimeStyled,
};
