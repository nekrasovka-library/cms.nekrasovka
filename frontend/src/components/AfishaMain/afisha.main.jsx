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
  EventCardStyled,
  SkeletonCardStyled,
  DateTimeSectionStyled,
  DateTimeHeaderStyled,
  DateTextStyled,
  LocationTextStyled,
  TitleSectionStyled,
  EventTitleStyled,
  EventSubtitleStyled,
  FooterSectionStyled,
  PriceTagStyled,
  TagsSectionStyled,
  ErrorMessageStyled,
  SkeletonTextStyled,
} from "./afisha.main.styles";
import Icon from "../../nekrasovka-ui/Icon/icon";

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

const CONFIG = {
  API_URL: "https://api.electro.nekrasovka.ru/api/calendars",
  DEFAULT_TRACKS: 7,
  DEFAULT_GAP: 30,
  DESKTOP_BREAKPOINT: 1240,
  ITEMS_PER_PAGE: 3,
  CANCELLED_EVENT_TEXT: "Отменено",
  CANCELLED_EVENT_MESSAGE: "Мероприятие отменено",
  ERROR_MESSAGE: "Ошибка загрузки событий",
  SKELETON_CARDS_COUNT: 3,
};

const AfishaMain = ({
  gap = CONFIG.DEFAULT_GAP,
  tracks = CONFIG.DEFAULT_TRACKS,
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  const [events, setEvents] = useState([]);
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
    return `//nekrasovka.ru/afisha/${day}-${month}-${year}/${id}`;
  }, []);

  const createBackgroundImageUrl = useCallback((pictureId) => {
    return pictureId ? `//nekrasovka.ru/img/${pictureId}/medium` : "none";
  }, []);

  const isEventCancelled = useCallback((event) => {
    return event.geo === CONFIG.CANCELLED_EVENT_TEXT;
  }, []);

  // Компонент скелетона
  const SkeletonCard = () => (
    <SkeletonCardStyled>
      <DateTimeSectionStyled>
        <DateTimeHeaderStyled>
          <div>
            <SkeletonTextStyled as={DateTextStyled}>
              00 месяца
            </SkeletonTextStyled>
            <SkeletonTextStyled>день недели</SkeletonTextStyled>
          </div>
          <SkeletonTextStyled as="time">00:00</SkeletonTextStyled>
        </DateTimeHeaderStyled>
        <SkeletonTextStyled as={LocationTextStyled}>
          Место проведения
        </SkeletonTextStyled>
      </DateTimeSectionStyled>
      <TitleSectionStyled>
        <SkeletonTextStyled as={EventTitleStyled}>
          Название события
        </SkeletonTextStyled>
        <SkeletonTextStyled as={EventSubtitleStyled}>
          Описание события которое может быть достаточно длинным и занимать
          несколько строк текста
        </SkeletonTextStyled>
      </TitleSectionStyled>
      <FooterSectionStyled>
        <TagsSectionStyled>
          <div></div>
          <SkeletonTextStyled>0+</SkeletonTextStyled>
        </TagsSectionStyled>
      </FooterSectionStyled>
    </SkeletonCardStyled>
  );

  // Компонент карточки события
  const EventCard = ({ event, index }) => {
    const { dateText, weekday } = formatDate(event.date);
    const time = formatTime(event.time_start);
    const url = formatUrl(event.date, event.id);
    const backgroundImageUrl = createBackgroundImageUrl(event.picture_id);
    const eventCancelled = isEventCancelled(event);
    const eventText = event.text.replace(/<[^>]*>/g, "");

    useEffect(() => {
      if (eventCancelled) {
        // Добавляем стили для отмененного события
        const style = document.createElement("style");
        style.textContent = `.event-card-${index}.error::before { background-image: url('${backgroundImageUrl}'); }`;
        document.head.appendChild(style);

        return () => {
          document.head.removeChild(style);
        };
      }
    }, [eventCancelled, backgroundImageUrl, index]);

    return (
      <EventCardStyled
        $backgroundImage={eventCancelled ? "none" : backgroundImageUrl}
        $isError={eventCancelled}
        className={
          eventCancelled ? `event-card-${index} error` : `event-card-${index}`
        }
      >
        <DateTimeSectionStyled>
          <DateTimeHeaderStyled>
            <div>
              <DateTextStyled>{dateText}</DateTextStyled>
              <span>{weekday}</span>
            </div>
            <time>{time}</time>
          </DateTimeHeaderStyled>
          {eventCancelled ? (
            <LocationTextStyled $isError={eventCancelled}>
              {CONFIG.CANCELLED_EVENT_MESSAGE}
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
        </DateTimeSectionStyled>
        <TitleSectionStyled as="a" href={url}>
          <EventTitleStyled>{event.title}</EventTitleStyled>
          {!eventCancelled && (
            <EventSubtitleStyled>{eventText}</EventSubtitleStyled>
          )}
        </TitleSectionStyled>
        <FooterSectionStyled>
          {!!event.price && <PriceTagStyled>Платное</PriceTagStyled>}
          <TagsSectionStyled>
            <div></div>
            <span>{event.restriction}</span>
          </TagsSectionStyled>
        </FooterSectionStyled>
      </EventCardStyled>
    );
  };

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
          <AfishaHeaderLinkStyled href="//nekrasovka.ru/afisha">
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
            {loading
              ? Array.from({ length: CONFIG.SKELETON_CARDS_COUNT }).map(
                  (_, index) => <SkeletonCard key={index} />,
                )
              : events.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
          </EventsContainerStyled>
        </AfishaMainStyled>
      </AfishaWrapperStyled>
    </AfishaContainerStyled>
  );
};

export default AfishaMain;
