import React, { useCallback, useEffect, useState } from "react";
import { CONFIG, MONTHS, WEEKDAYS } from "./event.page.constants";
import {
  AfishaContainerStyled,
  AfishaWrapperStyled,
  DateTextStyled,
  DateTimeStyled,
  ErrorMessageStyled,
  AuthorStyled,
  EventPageContainerStyled,
  LeftSectionStyled,
  RightSectionStyled,
  EventPageStyled,
  RegistrationStyled,
  EventTextStyled,
  EventTitleStyled,
  LocationTextStyled,
  TimeStyled,
  TextStyled,
  WeekdayStyled,
  RightSectionButtonRegistrationStyled,
  RightSectionButtonCalendarStyled,
  ButtonsCalendarContainerMobileStyled,
} from "./event.page.styles";

const EventPage = ({
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
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
    picture_id: 13082,
    dateText: "2025-07-20",
    weekday: "2025-07-20",
    time: "00:00",
    author: {
      img: "https://nekrasovka.ru/img/1/medium",
      name: "Дмитрий Круглых",
      about:
        "выпускник философского факультета МГУ, автор и ведущий youtube-канала «Философское Мнение»",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const isEventCancelled = useCallback((event) => {
    return event.geo === CONFIG.CANCELLED_EVENT_TEXT;
  }, []);

  const replaceStyles = useCallback((htmlText) => {
    if (!htmlText) return "";

    // Удаляем атрибуты style
    let cleanedText = htmlText.replace(/\s*style\s*=\s*["'][^"']*["']/gi, "");

    // Удаляем пустые теги и теги с только пробелами, &nbsp;, &emsp;, &ensp;, &thinsp;, &#160; и т.д.
    const emptyContentPattern =
      /^\s*(?:&nbsp;|&emsp;|&ensp;|&thinsp;|&#160;|&#8194;|&#8195;|&#8201;|\u00A0|\u2002|\u2003|\u2009)*\s*$/;

    // Повторяем процесс удаления пустых тегов несколько раз для вложенных структур
    let previousText;
    do {
      previousText = cleanedText;

      // Удаляем теги, которые пустые или содержат только различные виды пробелов
      cleanedText = cleanedText.replace(
        /<(\w+)([^>]*)>((?:(?!<\/\1>).)*)<\/\1>/gi,
        (match, tag, attrs, content) => {
          // Проверяем, является ли содержимое пустым или содержит только пробелы
          if (emptyContentPattern.test(content)) {
            return "";
          }
          return match;
        },
      );

      // Удаляем самозакрывающиеся пустые теги без атрибутов
      cleanedText = cleanedText.replace(
        /<(\w+)([^>]*)\s*\/>/gi,
        (match, tag, attrs) => {
          if (!attrs || attrs.trim() === "") {
            return "";
          }
          return match;
        },
      );
    } while (cleanedText !== previousText);

    // Удаляем лишние пробелы и переносы строк между тегами
    cleanedText = cleanedText.replace(/>\s+</g, "><");

    return cleanedText.trim();
  }, []);

  // Загрузка событий
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(CONFIG.API_URL);
        const data = await response.json();
        const eventData = { ...data.response.data.calendars[4] };

        const { dateText, weekday } = formatDate(event.date);
        const time = !!event.time_start ? formatTime(event.time_start) : "";
        const url = formatUrl(event.date, event.id);
        const text = replaceStyles(eventData.text);

        setEvent({
          ...eventData,
          dateText,
          weekday,
          url,
          time,
          text,
          author: {
            img: "https://nekrasovka.ru/img/1/medium",
            name: "Дмитрий Круглых",
            about:
              "выпускник философского факультета МГУ, автор и ведущий youtube-канала «Философское Мнение»",
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
        <LeftSectionStyled>
          <DateTimeStyled>
            <div>
              <DateTextStyled $loading={loading}>
                {event.dateText}
              </DateTextStyled>
              <WeekdayStyled $loading={loading}>{event.weekday}</WeekdayStyled>
            </div>
            <TimeStyled $loading={loading}>{event.time}</TimeStyled>
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
          <TextStyled>
            <EventTitleStyled $loading={loading}>
              {event.title}
            </EventTitleStyled>
            <EventTextStyled
              $loading={loading}
              dangerouslySetInnerHTML={{ __html: event.text }}
            />
          </TextStyled>
          <AuthorStyled>
            <div>
              <img
                src={`//nekrasovka.ru/img/${event.picture_id}/medium`}
                alt=""
              />
            </div>
            <div>
              <span>{event.author.name},</span>
              <span>{event.author.about}</span>
            </div>
          </AuthorStyled>
          <RegistrationStyled>
            Вход свободный по предварительной <a href="">регистрации</a>
          </RegistrationStyled>
        </LeftSectionStyled>
        <RightSectionStyled>
          <div>
            <img
              src={`//nekrasovka.ru/img/${event.picture_id}/medium`}
              alt=""
            />
          </div>
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
        </RightSectionStyled>
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
      </EventPageContainerStyled>
    </EventPageStyled>
  );
};

export default EventPage;
