import styled from "styled-components";
import { AFISHA_THEME } from "./event.page.constants";

// Извлеченные переменные для медиа-запросов
const DESKTOP_TABLET_MEDIA = `@media (min-width: ${AFISHA_THEME.breakpointTablet})`;
const MOBILE_MEDIA = `@media (max-width: ${AFISHA_THEME.breakpointMobile})`;

const RESPONSIVE_FONT_STYLES = `
  ${DESKTOP_TABLET_MEDIA} {
    font-size: 14px;
  }
  ${MOBILE_MEDIA} {
    font-size: 12px;
  }
`;

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

const AfishaContainerStyled = styled.div`
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;
`;

const ErrorMessageStyled = styled.div`
  text-align: center;
  padding: ${AFISHA_THEME.spacingXxxl};
  color: ${AFISHA_THEME.errorColor};
`;

const DateTextStyled = styled.span`
  font-weight: ${AFISHA_THEME.fontWeightMedium};
  margin-right: 5px;
  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION}
`;

const DateTimeStyled = styled.div`
  display: flex;
  justify-content: space-between;

  ${DESKTOP_TABLET_MEDIA} {
    font-size: 24px;
  }

  ${MOBILE_MEDIA} {
    font-size: 14px;
  }
`;

const RestrictionStyled = styled.div`
  width: 35px;
  
  ${DESKTOP_TABLET_MEDIA} {
    font-size: 18px;


  ${MOBILE_MEDIA} {
    font-size: 12px;
  }

  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION};
`;

const EditInputComponentStyled = styled.div`
  display: flex;
  align-items: flex-start;
`;

const EditInputStyled = styled.input`
  margin: 0;
  border: none;
  outline: none;
  padding: 0;
`;

const EditInputRestrictionStyled = styled(EditInputStyled)`
  width: 35px;

  ${DESKTOP_TABLET_MEDIA} {
    font-size: 18px;
  }

  ${MOBILE_MEDIA} {
    font-size: 12px;
  }
`;

const EditInputDateStyled = styled(EditInputStyled)`
  ${DESKTOP_TABLET_MEDIA} {
    font-size: 24px;
  }

  ${MOBILE_MEDIA} {
    font-size: 14px;
  }
`;

const LocationTextStyled = styled.span`
  ${RESPONSIVE_FONT_STYLES}
  ${({ $loading }) =>
    $loading ? SKELETON_BASE_STYLES : "color: inherit; text-decoration: none;"};
  ${SKELETON_PULSE_ANIMATION};
  margin-top: 5px;
`;

const EditSelectStyled = styled.select`
  padding: 0;
  outline: none;
  border: none;
  width: fit-content;
  margin-top: 5px;
  background-color: rgb(255, 255, 255);
`;

const TimeStyled = styled.time`
  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION}
`;

const WeekdayStyled = styled.span`
  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION};
  margin-right: 5px;
`;

const EventTitleStyled = styled.span`
  font-style: normal;
  font-weight: ${AFISHA_THEME.fontWeightMedium};

  ${DESKTOP_TABLET_MEDIA} {
    font-size: 24px;
    line-height: 28px;
  }

  ${MOBILE_MEDIA} {
    font-size: 16px;
    line-height: 17px;
  }

  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION};
`;

const TextStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${AFISHA_THEME.spacingXl};
`;

const EventPageContainerStyled = styled.div`
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;

  ${DESKTOP_TABLET_MEDIA} {
    display: grid;
    grid-template-columns: 1fr minmax(290px, 350px);
    column-gap: 30px;
  }

  ${MOBILE_MEDIA} {
    display: flex;
    flex-direction: column;
  }
`;

const EventPageStyled = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  color: ${AFISHA_THEME.primaryColor};

  ${(props) => props.$isError && ERROR_OVERLAY_STYLES};
  ${({ $loading }) => $loading && SKELETON_LOADING_OVERLAY};

  ${SKELETON_LOADING_ANIMATION}
  ${SKELETON_PULSE_ANIMATION}

  ${DESKTOP_TABLET_MEDIA} {
    padding: ${AFISHA_THEME.spacingLg};
  }

  ${MOBILE_MEDIA} {
    padding-right: 15px;
    padding-left: 15px;
  }
`;

const RightSectionStyled = styled.section`
  ${DESKTOP_TABLET_MEDIA} {
    display: flex;
    flex-direction: column;

    img {
      border-radius: 5px;
      width: 100%;
    }

    > div {
      &:nth-child(1) {
        position: relative;
        margin-bottom: 30px;

        ${({ $isEventCancelled }) =>
          $isEventCancelled &&
          `&::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #777777;
      mix-blend-mode: multiply;
      border-radius: 5px;
    }`};
      }

      &:nth-child(2) {
        display: flex;
        flex-direction: column;
        row-gap: 25px;

        & > div {
          display: flex;
          flex-direction: column;

          &:nth-child(2) {
            row-gap: 15px;
          }
        }
      }
    }
  }

  ${MOBILE_MEDIA} {
    display: none;
  }
`;

const EventImageMobileStyled = styled.div`
  ${DESKTOP_TABLET_MEDIA} {
    display: none;
  }

  ${MOBILE_MEDIA} {
    position: relative;
    margin: 20px 0 0;

    img {
      border-radius: 5px;
      width: 100%;
    }

    ${({ $isEventCancelled }) =>
      $isEventCancelled &&
      `&::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #777777;
      mix-blend-mode: multiply;
      border-radius: 5px;
    }`}
  }
`;

const ButtonsCalendarContainerMobileStyled = styled.div`
  ${DESKTOP_TABLET_MEDIA} {
    display: none;
  }

  ${MOBILE_MEDIA} {
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    order: 3;
    margin-top: 30px;

    > div {
      &:nth-child(2) {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }
    }
  }
`;

const RightSectionButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 5px;

  ${DESKTOP_TABLET_MEDIA} {
    height: 50px;
  }

  ${MOBILE_MEDIA} {
    height: 40px;
  }
`;

const RightSectionButtonRegistrationStyled = styled(RightSectionButtonStyled)`
  background: #346178;
  color: #ffff;
`;

const RightSectionButtonCalendarStyled = styled(RightSectionButtonStyled)`
  border: 1px solid #346178;
  color: #346178;

  @media (hover: hover) {
    &:hover {
      background: #346178;
      color: #ffff;
    }
  }
`;

const LeftSectionStyled = styled.section`
  display: flex;
  flex-direction: column;

  input,
  select {
    font-family: Roboto, sans-serif;
    line-height: 1;
  }
`;

const EventCanceled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #922d15;
  border: 1px solid #922d15;
  border-radius: 5px;

  ${DESKTOP_TABLET_MEDIA} {
    height: 50px;
    font-size: 18px;
    margin-bottom: 25px;
  }

  ${MOBILE_MEDIA} {
    padding: 10px;
    font-size: 12px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const AuthorStyled = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  margin-top: 25px;

  ${DESKTOP_TABLET_MEDIA} {
    column-gap: 20px;

    div:nth-child(1) {
      img {
        width: 74px;
        height: 74px;
      }
    }
  }

  ${MOBILE_MEDIA} {
    column-gap: 10px;

    div:nth-child(1) {
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
`;

const EventTextStyled = styled.div`
  * {
    font-style: normal;
    font-weight: ${AFISHA_THEME.fontWeightNormal};

    ${DESKTOP_TABLET_MEDIA} {
      font-size: 20px;
      line-height: 25px;
    }

    ${MOBILE_MEDIA} {
      font-size: 14px;
      line-height: 14px;
    }
  }

  a {
    color: inherit;
  }

  ${({ $loading }) =>
    $loading &&
    `
    > div > * {
      ${SKELETON_BASE_STYLES}
    }
  `};

  ${SKELETON_PULSE_ANIMATION}
`;

export {
  AfishaContainerStyled,
  ErrorMessageStyled,
  DateTextStyled,
  DateTimeStyled,
  LocationTextStyled,
  TimeStyled,
  WeekdayStyled,
  EventTitleStyled,
  TextStyled,
  EventPageStyled,
  RightSectionStyled,
  LeftSectionStyled,
  EventTextStyled,
  EventPageContainerStyled,
  AuthorStyled,
  RightSectionButtonCalendarStyled,
  RightSectionButtonRegistrationStyled,
  ButtonsCalendarContainerMobileStyled,
  EventCanceled,
  EventImageMobileStyled,
  RestrictionStyled,
  EditInputStyled,
  EditSelectStyled,
  EditInputDateStyled,
  EditInputRestrictionStyled,
  EditInputComponentStyled,
};
