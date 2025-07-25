import React, { useCallback, useEffect, useState } from "react";
import {
  AfishaPageStyled,
  AfishaContainerStyled,
  AfishaHeaderStyled,
  AfishaHeaderTitleStyled,
  AfishaMainStyled,
  LoadMoreButton,
  AfishaHeaderTagsAndSortStyled,
  AfishaHeaderViewStyled,
  AfishaHeaderTagsStyled,
  TagStyled,
  AfishaWrapperStyled,
  ErrorMessageStyled,
} from "./afisha.page.styles";
import EventCard from "../EventCard/event.card";
import Icon from "../../nekrasovka-ui/Icon/icon";
import EventList from "../EventList/event.list";
import { CONFIG, MONTHS, WEEKDAYS } from "./afisha.page.constants";

const AfishaPage = ({
  tracks,
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      date: "2025-07-20 00:00:00",
      title: "«Бабушкины квадраты». Мастер-класс по вязанию",
      text: '<div><p>Многоцветные бабушкины квадраты — это эффективный способ использовать небольшое количество пряжи, оставшейся от других проектов, а базовые мотивы бабушкиных квадратов не требуют особых навыков для выполнения.</p><p>Название технологии отсылает к изделиям пожилых мастериц, но не всё так просто!</p><p>Модели одежды с использованием бабушкиных квадратов не раз представлялись на неделях высокой моды, печатались в глянцевых журналах и циркулировали в массмаркетах. А квадраты-модули соединяются в юбки, платья, гольфы, пледы и даже в чехлы для табуреток!</p><p>Приходите на мастер-класс, чтобы научиться премудростям техники и хорошо провести время. Чтобы вам было комфортно, желательно иметь хотя бы начальный уровень навыков вязания.</p><p>Если у вас есть крючки и вязаные вещи, которые не жалко распустить, — приносите!</p><p>Ведущая мастер-класса — Наталья Сенаторова, эксперт Санкт-Петербургского культурного форума, основательница бренда вязаных изделий «Блаж Борисовны».<br></p><p class="">Пожалуйста, не забудьте зарегистрироваться на встречу. В случае переноса или отмены мастер-класса мы отправим вам письмо на указанный электронный адрес.</p></div>',
      geo: "Аудитория 502 / 5 этаж",
      price: 0,
      restriction: "12+",
    },
    {
      id: 2,
      date: "2025-07-20 00:00:00",
      title: "«Бабушкины квадраты». Мастер-класс по вязанию",
      text: '<div><p>Многоцветные бабушкины квадраты — это эффективный способ использовать небольшое количество пряжи, оставшейся от других проектов, а базовые мотивы бабушкиных квадратов не требуют особых навыков для выполнения.</p><p>Название технологии отсылает к изделиям пожилых мастериц, но не всё так просто!</p><p>Модели одежды с использованием бабушкиных квадратов не раз представлялись на неделях высокой моды, печатались в глянцевых журналах и циркулировали в массмаркетах. А квадраты-модули соединяются в юбки, платья, гольфы, пледы и даже в чехлы для табуреток!</p><p>Приходите на мастер-класс, чтобы научиться премудростям техники и хорошо провести время. Чтобы вам было комфортно, желательно иметь хотя бы начальный уровень навыков вязания.</p><p>Если у вас есть крючки и вязаные вещи, которые не жалко распустить, — приносите!</p><p>Ведущая мастер-класса — Наталья Сенаторова, эксперт Санкт-Петербургского культурного форума, основательница бренда вязаных изделий «Блаж Борисовны».<br></p><p class="">Пожалуйста, не забудьте зарегистрироваться на встречу. В случае переноса или отмены мастер-класса мы отправим вам письмо на указанный электронный адрес.</p></div>',
      geo: "Аудитория 502 / 5 этаж",
      price: 0,
      restriction: "12+",
    },
    {
      id: 3,
      date: "2025-07-20 00:00:00",
      title: "«Бабушкины квадраты». Мастер-класс по вязанию",
      text: '<div><p>Многоцветные бабушкины квадраты — это эффективный способ использовать небольшое количество пряжи, оставшейся от других проектов, а базовые мотивы бабушкиных квадратов не требуют особых навыков для выполнения.</p><p>Название технологии отсылает к изделиям пожилых мастериц, но не всё так просто!</p><p>Модели одежды с использованием бабушкиных квадратов не раз представлялись на неделях высокой моды, печатались в глянцевых журналах и циркулировали в массмаркетах. А квадраты-модули соединяются в юбки, платья, гольфы, пледы и даже в чехлы для табуреток!</p><p>Приходите на мастер-класс, чтобы научиться премудростям техники и хорошо провести время. Чтобы вам было комфортно, желательно иметь хотя бы начальный уровень навыков вязания.</p><p>Если у вас есть крючки и вязаные вещи, которые не жалко распустить, — приносите!</p><p>Ведущая мастер-класса — Наталья Сенаторова, эксперт Санкт-Петербургского культурного форума, основательница бренда вязаных изделий «Блаж Борисовны».<br></p><p class="">Пожалуйста, не забудьте зарегистрироваться на встречу. В случае переноса или отмены мастер-класса мы отправим вам письмо на указанный электронный адрес.</p></div>',
      geo: "Аудитория 502 / 5 этаж",
      price: 0,
      restriction: "12+",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("mozaic");

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
    return `afisha/${id}`;
  }, []);

  const createBackgroundImageUrl = useCallback((pictureId) => {
    return pictureId ? `//nekrasovka.ru/img/${pictureId}/medium` : "none";
  }, []);

  const isEventCancelled = useCallback((event) => {
    return event.geo === CONFIG.CANCELLED_EVENT_TEXT;
  }, []);

  // Загрузка событий
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(CONFIG.API_URL);
        const data = await response.json();
        const eventsData = data.response.data.calendars;
        setEvents(eventsData.slice(0, tracks));
        setError(null);
      } catch (error) {
        console.error(`${CONFIG.ERROR_MESSAGE}:`, error);
        setError(CONFIG.ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [tracks]);

  const handleLoadMore = () => {};

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
    <AfishaPageStyled
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <AfishaContainerStyled $maxWidth={maxWidth}>
        <AfishaHeaderStyled>
          <AfishaHeaderTitleStyled>
            <span>События</span>
            <span>Афиша</span>
          </AfishaHeaderTitleStyled>
          <AfishaHeaderTagsAndSortStyled>
            <AfishaHeaderTagsStyled>
              <div>
                <TagStyled>Дата</TagStyled>
                <TagStyled>Место проведения</TagStyled>
              </div>
              <div>
                <div>
                  <span>02.01.2024 — 08.01.2024</span>
                  <Icon icon="closeMenu" type="button" height="10" />
                </div>
                <div>Сбросить фильтры</div>
              </div>
            </AfishaHeaderTagsStyled>
            <AfishaHeaderViewStyled $view={view}>
              <Icon
                icon="mozaic"
                type="button"
                onClick={() => setView("mozaic")}
              />
              <Icon icon="list" type="button" onClick={() => setView("list")} />
            </AfishaHeaderViewStyled>
          </AfishaHeaderTagsAndSortStyled>
        </AfishaHeaderStyled>
        <AfishaMainStyled $view={view}>
          {view === "mozaic" &&
            events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                loading={loading}
                index={index}
                formatDate={formatDate}
                formatTime={formatTime}
                formatUrl={formatUrl}
                createBackgroundImageUrl={createBackgroundImageUrl}
                isEventCancelled={isEventCancelled}
              />
            ))}
          {view === "list" &&
            events.map((event, index) => (
              <EventList
                key={event.id}
                event={event}
                loading={loading}
                index={index}
                formatDate={formatDate}
                formatTime={formatTime}
                formatUrl={formatUrl}
                createBackgroundImageUrl={createBackgroundImageUrl}
                isEventCancelled={isEventCancelled}
              />
            ))}
        </AfishaMainStyled>
        <LoadMoreButton onClick={handleLoadMore}>+ Показать ещё</LoadMoreButton>
      </AfishaContainerStyled>
    </AfishaPageStyled>
  );
};

export default AfishaPage;
