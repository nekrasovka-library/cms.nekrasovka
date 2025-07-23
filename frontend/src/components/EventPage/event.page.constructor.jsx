import React from "react";
import {
  AuthorStyled,
  ButtonsCalendarContainerMobileStyled,
  DateTimeStyled,
  EditInputStyled,
  EditSelectStyled,
  EventCanceled,
  EventImageMobileStyled,
  LeftSectionStyled,
  RightSectionButtonCalendarStyled,
  RightSectionButtonRegistrationStyled,
  RightSectionStyled,
  TextStyled,
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
  const updateCalendar = (newDate) => {
    console.log("❗", newDate);
    const { dateText, weekday } = formatDate(newDate);
    const time = formatTime(newDate);
    const url = formatUrl(newDate, event.id);

    setEvent({ ...event, date: newDate, dateText, weekday, time, url });
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
          <EditInputStyled
            type="datetime-local"
            value={event.date}
            onChange={(e) => updateCalendar(e.target.value)}
          />
          <EditInputStyled
            type="text"
            value={event.restriction}
            onChange={(e) =>
              setEvent({ ...event, restriction: e.target.value })
            }
          />
        </DateTimeStyled>
        <EditSelectStyled
          as="select"
          value={event.geo}
          onChange={(e) => setEvent({ ...event, geo: e.target.value })}
        >
          <option value="">Выберите событие</option>
          <option value="event1">Мастер-класс по вязанию</option>
          <option value="event2">Философская лекция</option>
        </EditSelectStyled>
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
            updateText={(newText) => setEvent({ ...event, text: newText })}
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
            updateText={(newText) =>
              setEvent({ ...event, author: { ...event.author, text: newText } })
            }
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
