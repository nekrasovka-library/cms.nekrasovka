import React from "react";
import {
  AuthorStyled,
  ButtonsCalendarContainerMobileStyled,
  DateTextStyled,
  DateTimeStyled,
  EventCanceled,
  EventImageMobileStyled,
  EventTextStyled,
  LeftSectionStyled,
  LocationTextStyled,
  RestrictionStyled,
  RightSectionButtonCalendarStyled,
  RightSectionButtonRegistrationStyled,
  RightSectionStyled,
  TextStyled,
  TimeStyled,
  WeekdayStyled,
} from "./event.page.styles";
import ImagePreview from "../Image/image.preview";

const EventPagePreview = ({ loading, event }) => {
  return (
    <>
      <LeftSectionStyled $isEventCancelled={event.canceled} $loading={loading}>
        {event.canceled && (
          <EventCanceled>
            Мероприятие отменено. Приносим извинения за возможные неудобства
          </EventCanceled>
        )}
        <DateTimeStyled>
          <div>
            <DateTextStyled $loading={loading}>{event.dateText}</DateTextStyled>
            <WeekdayStyled $loading={loading}>{event.weekday}</WeekdayStyled>
            <TimeStyled $loading={loading}>{event.time}</TimeStyled>
          </div>
          <RestrictionStyled $loading={loading}>
            {event.restriction}
          </RestrictionStyled>
        </DateTimeStyled>
        {loading ? (
          <LocationTextStyled $loading={loading}>
            {event.geo}
          </LocationTextStyled>
        ) : (
          <LocationTextStyled
            as="a"
            href={event.geo_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {event.geo}
          </LocationTextStyled>
        )}
        <EventImageMobileStyled $isEventCancelled={event.canceled}>
          <ImagePreview
            text={`//nekrasovka.ru/img/${event.picture_id}/medium`}
            borderRadius="5"
          />
        </EventImageMobileStyled>
        <TextStyled>
          <EventTextStyled
            $loading={loading}
            dangerouslySetInnerHTML={{ __html: event.text }}
          />
        </TextStyled>
        <AuthorStyled>
          <ImagePreview
            text={`//nekrasovka.ru/img/${event.picture_id}/medium`}
            borderRadius="50"
          />
          <div dangerouslySetInnerHTML={{ __html: event.author.text }} />
        </AuthorStyled>
      </LeftSectionStyled>
      <RightSectionStyled $isEventCancelled={event.canceled}>
        <ImagePreview
          text={`//nekrasovka.ru/img/${event.picture_id}/medium`}
          borderRadius="5"
        />
        {!event.canceled && (
          <div>
            <div>
              <RightSectionButtonRegistrationStyled>
                Регистрация
              </RightSectionButtonRegistrationStyled>
            </div>
            <div>
              <RightSectionButtonCalendarStyled>
                Добавить в Google.Календарь
              </RightSectionButtonCalendarStyled>
              <RightSectionButtonCalendarStyled>
                Добавить в Яндекс.Календарь
              </RightSectionButtonCalendarStyled>
            </div>
          </div>
        )}
      </RightSectionStyled>
      {!event.canceled && (
        <ButtonsCalendarContainerMobileStyled>
          <RightSectionButtonRegistrationStyled>
            Регистрация
          </RightSectionButtonRegistrationStyled>
          <div>
            <RightSectionButtonCalendarStyled>
              Добавить в Google.Календарь
            </RightSectionButtonCalendarStyled>
            <RightSectionButtonCalendarStyled>
              Добавить в Яндекс.Календарь
            </RightSectionButtonCalendarStyled>
          </div>
        </ButtonsCalendarContainerMobileStyled>
      )}
    </>
  );
};

export default EventPagePreview;
