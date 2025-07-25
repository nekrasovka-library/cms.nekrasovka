import React, { useState } from "react";
import {
  AuthorStyled,
  ButtonsCalendarContainerMobileStyled,
  DateTextStyled,
  DateTimeStyled,
  EditInputComponentStyled,
  EditInputDateStyled,
  EditInputRestrictionStyled,
  EditSelectStyled,
  EventCanceled,
  EventImageMobileStyled,
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
import ImageConstructor from "../Image/image.constructor";
import Editor from "../Editor/editor";

const EventPageConstructor = ({
  setEvent,
  event,
  blockId,
  backgroundColor,
  formatDate,
  formatTime,
  formatUrl,
}) => {
  const [elementFocused, setElementFocused] = useState(null);
  const updateCalendar = (newDate) => {
    const { dateText, weekday } = formatDate(newDate);
    const time = formatTime(newDate);
    const url = formatUrl(newDate, event.id);

    setEvent({ ...event, date: newDate, dateText, weekday, time, url });
  };

  const updateAuthor = (newText) => {
    setEvent({ ...event, author: { ...event.author, text: newText } });
  };

  const updateText = (newText) => {
    setEvent({ ...event, text: newText });
  };

  return (
    <>
      <LeftSectionStyled $isEventCancelled={event.canceled}>
        {event.canceled && (
          <EventCanceled>
            Мероприятие отменено. Приносим извинения за возможные неудобства
          </EventCanceled>
        )}
        <DateTimeStyled>
          {elementFocused === "date" ? (
            <EditInputComponentStyled>
              <EditInputDateStyled
                type="datetime-local"
                name="date"
                value={event.date}
                onBlur={() => setElementFocused(null)}
                onChange={(e) => updateCalendar(e.target.value)}
              />
            </EditInputComponentStyled>
          ) : (
            <div onClick={() => setElementFocused("date")}>
              <DateTextStyled>{event.dateText}</DateTextStyled>
              <WeekdayStyled>{event.weekday}</WeekdayStyled>
              <TimeStyled>{event.time}</TimeStyled>
            </div>
          )}
          {elementFocused === "restriction" ? (
            <EditInputComponentStyled>
              <EditInputRestrictionStyled
                type="text"
                name="restriction"
                value={event.restriction}
                onBlur={() => setElementFocused(null)}
                onChange={(e) =>
                  setEvent({ ...event, restriction: e.target.value })
                }
              />
            </EditInputComponentStyled>
          ) : (
            <RestrictionStyled onClick={() => setElementFocused("restriction")}>
              {event.restriction}
            </RestrictionStyled>
          )}
        </DateTimeStyled>
        {elementFocused === "geo" ? (
          <EditSelectStyled
            as="select"
            name="geo"
            value={event.geo}
            onBlur={() => setElementFocused(null)}
            onChange={(e) => setEvent({ ...event, geo: e.target.value })}
          >
            <option value="">Выберите событие</option>
            <option value="Мастер-класс по вязанию">
              Мастер-класс по вязанию
            </option>
            <option value="Философская лекция">Философская лекция</option>
          </EditSelectStyled>
        ) : (
          <LocationTextStyled onClick={() => setElementFocused("geo")}>
            {event.geo}
          </LocationTextStyled>
        )}
        <EventImageMobileStyled $isEventCancelled={event.canceled}>
          <ImageConstructor
            blockId={blockId}
            text={event.og_image}
            borderRadius="5"
            updateImage={(newImage) =>
              setEvent({ ...event, og_image: newImage })
            }
          />
        </EventImageMobileStyled>
        <TextStyled>
          <Editor
            text={event.text}
            backgroundColor={backgroundColor}
            blockId={blockId}
            updateText={updateText}
          />
        </TextStyled>
        <AuthorStyled>
          <ImageConstructor
            blockId={blockId}
            text={event.author.img}
            borderRadius="50"
            updateImage={(newImage) =>
              setEvent({ ...event, author: { ...event.author, img: newImage } })
            }
          />
          <Editor
            text={event.author.text}
            blockId={blockId}
            updateText={updateAuthor}
          />
        </AuthorStyled>
      </LeftSectionStyled>
      <RightSectionStyled $isEventCancelled={event.canceled}>
        <ImageConstructor
          blockId={blockId}
          text={event.picture_id}
          borderRadius="5"
          updateImage={(newImage) =>
            setEvent({ ...event, picture_id: newImage })
          }
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

export default EventPageConstructor;
