import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CONFIG, MONTHS, WEEKDAYS } from "./event.page.constants";
import {
  AfishaContainerStyled,
  AfishaWrapperStyled,
  ErrorMessageStyled,
  EventPageContainerStyled,
  EventPageStyled,
} from "./event.page.styles";
import EventPagePreview from "./event.page.preview";
import EventPageConstructor from "./event.page.constructor";

const EventPage = ({
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
  blockId,
}) => {
  const [event, setEvent] = useState({
    id: 1,
    date: "2025-07-20 00:00:00",
    title: "«Бабушкины квадраты». Мастер-класс по вязанию",
    text: '<div><p>Многоцветные бабушкины квадраты — это эффективный способ использовать небольшое количество пряжи, оставшейся от других проектов, а базовые мотивы бабушкиных квадратов не требуют особых навыков для выполнения.</p><p>Название технологии отсылает к изделиям пожилых мастериц, но не всё так просто!</p><p>Модели одежды с использованием бабушкиных квадратов не раз представлялись на неделях высокой моды, печатались в глянцевых журналах и циркулировали в массмаркетах. А квадраты-модули соединяются в юбки, платья, гольфы, пледы и даже в чехлы для табуреток!</p><p>Приходите на мастер-класс, чтобы научиться премудростям техники и хорошо провести время. Чтобы вам было комфортно, желательно иметь хотя бы начальный уровень навыков вязания.</p><p>Если у вас есть крючки и вязаные вещи, которые не жалко распустить, — приносите!</p><p>Ведущая мастер-класса — Наталья Сенаторова, эксперт Санкт-Петербургского культурного форума, основательница бренда вязаных изделий «Блаж Борисовны».<br></p><p class="">Пожалуйста, не забудьте зарегистрироваться на встречу. В случае переноса или отмены мастер-класса мы отправим вам письмо на указанный электронный адрес.</p></div>',
    geo: "Аудитория 502 / 5 этаж",
    price: 0,
    restriction: "12+",
    og_image: null,
    picture_id: null,
    dateText: "2025-07-20",
    weekday: "2025-07-20",
    time: "00:00",
    canceled: false,
    author: {
      img: "https://nekrasovka.ru/img/1/medium",
      text: "<div>Дмитрий Круглых, выпускник философского факультета МГУ, автор и ведущий youtube-канала «Философское Мнение»</div>",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isPreview } = useSelector((state) => state.preview);

  // Утилиты для форматирования
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const weekday = WEEKDAYS[date.getDay()];
    return { dateText: `${day} ${month}`, weekday };
  }, []);

  const formatTime = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const formatUrl = useCallback((dateString, id) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `afisha/${day}-${month}-${year}/${id}`;
  }, []);

  // Загрузка событий
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(CONFIG.API_URL);
        const data = await response.json();
        const eventData = { ...data.response.data.calendars[1] };

        const { dateText, weekday } = formatDate(event.date);
        const time = !!event.time_start ? formatTime(event.time_start) : "";
        const url = formatUrl(event.date, event.id);

        setEvent({
          ...eventData,
          dateText,
          weekday,
          url,
          time,
          text: eventData.text,
          canceled: event.geo === CONFIG.CANCELLED_EVENT_TEXT,
          author: {
            img: "",
            text: "<div>Дмитрий Круглых, выпускник философского факультета МГУ, автор и ведущий youtube-канала «Философское Мнение»</div>",
          },
        });
        setError(null);
      } catch (error) {
        console.error(`${CONFIG.ERROR_MESSAGE}:`, error);
        setError(CONFIG.ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (error) {
    return (
      <AfishaContainerStyled>
        <AfishaWrapperStyled>
          <ErrorMessageStyled>{error}</ErrorMessageStyled>
        </AfishaWrapperStyled>
      </AfishaContainerStyled>
    );
  }

  return (
    <EventPageStyled
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <EventPageContainerStyled $maxWidth={maxWidth}>
        {isPreview ? (
          <EventPagePreview
            loading={loading}
            event={event}
            backgroundColor={backgroundColor}
          />
        ) : (
          <EventPageConstructor
            blockId={blockId}
            event={event}
            setEvent={setEvent}
            backgroundColor={backgroundColor}
            formatDate={formatDate}
            formatTime={formatTime}
            formatUrl={formatUrl}
          />
        )}
      </EventPageContainerStyled>
    </EventPageStyled>
  );
};

export default EventPage;
