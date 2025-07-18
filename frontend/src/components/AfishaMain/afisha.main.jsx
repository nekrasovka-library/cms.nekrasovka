import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  AfishaContainerStyled,
  AfishaWrapperStyled,
  AfishaHeaderStyled,
  AfishaHeaderTitleStyled,
  AfishaHeaderLinkStyled,
  AfishaMainStyled,
  AfishaButtonLeftStyled,
  AfishaButtonRightStyled,
  EventsContainerStyled,
  ErrorMessageStyled,
} from "./afisha.main.styles";
import EventCard from "../EventCard/event.card";
import Icon from "../../nekrasovka-ui/Icon/icon";
import { Link } from "react-router";
import { CONFIG } from "./afisha.main.constants";

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

const AfishaMain = ({
  gap = CONFIG.DEFAULT_GAP,
  tracks = CONFIG.DEFAULT_TRACKS,
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
  const [scrollIndex, setScrollIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const eventsContainerRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const scrollAmountRef = useRef(0);

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Навигация
  const updateNavigationButtons = useCallback(() => {
    if (windowWidth > CONFIG.DESKTOP_BREAKPOINT) {
      const showPrev = scrollIndex > 1;
      const showNext =
        events.length > CONFIG.ITEMS_PER_PAGE &&
        scrollIndex < Math.ceil(events.length / CONFIG.ITEMS_PER_PAGE);

      if (prevButtonRef.current) {
        prevButtonRef.current.style.display = showPrev ? "flex" : "none";
      }
      if (nextButtonRef.current) {
        nextButtonRef.current.style.display = showNext ? "flex" : "none";
      }
    }
  }, [scrollIndex, events.length, windowWidth]);

  const handleScroll = useCallback((scrollAmount) => {
    if (eventsContainerRef.current) {
      eventsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  const navigateToNext = useCallback(() => {
    handleScroll(scrollAmountRef.current);
    setScrollIndex((prev) => prev + 1);
  }, [handleScroll]);

  const navigateToPrev = useCallback(() => {
    handleScroll(-scrollAmountRef.current);
    setScrollIndex((prev) => prev - 1);
  }, [handleScroll]);

  // Предотвращение прокрутки на десктопе
  useEffect(() => {
    const container = eventsContainerRef.current;
    if (container && windowWidth > CONFIG.DESKTOP_BREAKPOINT) {
      const preventScrollEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };

      const preventMouseDrag = (e) => {
        e.preventDefault();
      };

      container.addEventListener("wheel", preventScrollEvent, {
        passive: false,
      });
      container.addEventListener("mousedown", preventMouseDrag);
      container.addEventListener("touchmove", preventScrollEvent, {
        passive: false,
      });

      return () => {
        container.removeEventListener("wheel", preventScrollEvent);
        container.removeEventListener("mousedown", preventMouseDrag);
        container.removeEventListener("touchmove", preventScrollEvent);
      };
    }
  }, [windowWidth]);

  // Обновление количества прокрутки
  useEffect(() => {
    if (eventsContainerRef.current) {
      scrollAmountRef.current = eventsContainerRef.current.clientWidth + +gap;
    }
  }, [gap, windowWidth]);

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
        console.error("Ошибка при загрузке событий:", error);
        setError(CONFIG.ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [tracks]);

  // Обновление навигации
  useEffect(() => {
    updateNavigationButtons();
  }, [updateNavigationButtons]);

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
    <AfishaContainerStyled
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <AfishaWrapperStyled $maxWidth={maxWidth}>
        <AfishaHeaderStyled>
          <AfishaHeaderTitleStyled>Афиша</AfishaHeaderTitleStyled>
          <AfishaHeaderLinkStyled as={Link} to="afisha">
            <span>Все события</span>
            <Icon icon="arrowRightLong" />
          </AfishaHeaderLinkStyled>
        </AfishaHeaderStyled>
        <AfishaMainStyled>
          <AfishaButtonLeftStyled
            ref={prevButtonRef}
            onClick={navigateToPrev}
            style={{ display: "none" }}
          >
            <Icon icon="arrowCarousel" />
          </AfishaButtonLeftStyled>
          <AfishaButtonRightStyled
            ref={nextButtonRef}
            onClick={navigateToNext}
            style={{ display: "none" }}
          >
            <Icon icon="arrowCarousel" />
          </AfishaButtonRightStyled>
          <EventsContainerStyled ref={eventsContainerRef} $gap={gap}>
            {events.map((event, index) => (
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
          </EventsContainerStyled>
        </AfishaMainStyled>
      </AfishaWrapperStyled>
    </AfishaContainerStyled>
  );
};

export default AfishaMain;
