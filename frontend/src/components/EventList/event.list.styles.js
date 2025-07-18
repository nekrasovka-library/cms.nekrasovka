import styled from "styled-components";
import { AFISHA_THEME } from "./event.list.constants";

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

const EventListStyled = styled.div`
  display: grid;
  grid-template-columns: 270px 1fr auto;
  color: #346178;
  padding: 25px 0;
  border-top: 1px solid #346178;
  column-gap: 45px;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const RestrictionStyled = styled.time`
  font-size: 14px;
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
`;

const LocationTextStyled = styled.span`
  ${RESPONSIVE_FONT_STYLES}
`;

const TitleSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${AFISHA_THEME.spacingXs};
`;

const DateTimeSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: ${AFISHA_THEME.spacingXs};
  width: 270px;

  ${DESKTOP_TABLET_MEDIA} {
    font-size: 18px;
  }

  ${MOBILE_MEDIA} {
    font-size: 14px;
  }
`;

export {
  EventListStyled,
  EventTitleStyled,
  EventSubtitleStyled,
  LocationTextStyled,
  TitleSectionStyled,
  DateTimeSectionStyled,
  RestrictionStyled,
};
