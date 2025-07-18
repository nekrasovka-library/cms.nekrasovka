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
} from "./afisha.page.styles";
import EventCard from "../EventCard/event.card";
import Icon from "../../nekrasovka-ui/Icon/icon";
import EventList from "../EventList/event.list";
import { CONFIG } from "./afisha.page.constants";

// Константы
const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const WEEKDAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

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
      text: "«Бабушкины квадраты». Мастер-класс по вязанию",
      geo: "Аудитория 502 / 5 этаж",
      price: 0,
      restriction: "12+",
    },
    {
      id: 2,
      date: "2025-07-20 00:00:00",
      title: "«Бабушкины квадраты». Мастер-класс по вязанию",
      text: "«Бабушкины квадраты». Мастер-класс по вязанию",
      geo: "Аудитория 502 / 5 этаж",
      price: 0,
      restriction: "12+",
    },
    {
      id: 3,
      date: "2025-07-20 00:00:00",
      title: "«Бабушкины квадраты». Мастер-класс по вязанию",
      text: "«Бабушкины квадраты». Мастер-класс по вязанию",
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
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `afisha/${day}-${month}-${year}/${id}`;
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
        <LoadMoreButton>+ Показать ещё</LoadMoreButton>
      </AfishaContainerStyled>
    </AfishaPageStyled>
  );
};

export default AfishaPage;
