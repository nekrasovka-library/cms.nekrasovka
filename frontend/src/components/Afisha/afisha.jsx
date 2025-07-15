import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  AfishaContainer,
  AfishaWrapper,
  AfishaHeader,
  AfishaHeaderTitle,
  AfishaHeaderLink,
  AfishaMain,
  AfishaButtonLeft,
  AfishaButtonRight,
  EventsContainer,
  EventCard,
  SkeletonCard,
  DateTimeSection,
  DateTimeHeader,
  DateText,
  LocationText,
  TitleSection,
  EventTitle,
  EventSubtitle,
  FooterSection,
  PriceTag,
  TagsSection,
  ErrorMessage,
  SkeletonText,
} from "./afisha.styles";
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

const Afisha = ({
  blockId,
  text,
  gap = CONFIG.DEFAULT_GAP,
  tracks = CONFIG.DEFAULT_TRACKS,
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
  const SkeletonCardComponent = () => (
    <SkeletonCard>
      <DateTimeSection>
        <DateTimeHeader>
          <div>
            <SkeletonText as={DateText}>00 месяца</SkeletonText>
            <SkeletonText>день недели</SkeletonText>
          </div>
          <SkeletonText as="time">00:00</SkeletonText>
        </DateTimeHeader>
        <SkeletonText as={LocationText}>Место проведения</SkeletonText>
      </DateTimeSection>
      <TitleSection>
        <SkeletonText as={EventTitle}>Название события</SkeletonText>
        <SkeletonText as={EventSubtitle}>
          Описание события которое может быть достаточно длинным и занимать
          несколько строк текста
        </SkeletonText>
      </TitleSection>
      <FooterSection>
        <TagsSection>
          <div></div>
          <SkeletonText>0+</SkeletonText>
        </TagsSection>
      </FooterSection>
    </SkeletonCard>
  );

  // Компонент карточки события
  const EventCardComponent = ({ event, index }) => {
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
      <EventCard
        $backgroundImage={eventCancelled ? "none" : backgroundImageUrl}
        $isError={eventCancelled}
        className={
          eventCancelled ? `event-card-${index} error` : `event-card-${index}`
        }
      >
        <DateTimeSection>
          <DateTimeHeader>
            <div>
              <DateText>{dateText}</DateText>
              <span>{weekday}</span>
            </div>
            <time>{time}</time>
          </DateTimeHeader>
          {eventCancelled ? (
            <LocationText $isError={eventCancelled}>
              {CONFIG.CANCELLED_EVENT_MESSAGE}
            </LocationText>
          ) : (
            <LocationText
              as="a"
              href={event.geo_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {event.geo}
            </LocationText>
          )}
        </DateTimeSection>
        <TitleSection as="a" href={url}>
          <EventTitle>{event.title}</EventTitle>
          {!eventCancelled && <EventSubtitle>{eventText}</EventSubtitle>}
        </TitleSection>
        <FooterSection>
          {!!event.price && <PriceTag>Платное</PriceTag>}
          <TagsSection>
            <div></div>
            <span>{event.restriction}</span>
          </TagsSection>
        </FooterSection>
      </EventCard>
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
      <AfishaContainer>
        <AfishaWrapper>
          <ErrorMessage>{error}</ErrorMessage>
        </AfishaWrapper>
      </AfishaContainer>
    );
  }

  return (
    <AfishaContainer>
      <AfishaWrapper>
        <AfishaHeader>
          <AfishaHeaderTitle>Афиша</AfishaHeaderTitle>
          <AfishaHeaderLink href="//nekrasovka.ru/afisha">
            <span>Все события</span>
            <Icon icon="arrowRightLong" />
          </AfishaHeaderLink>
        </AfishaHeader>
        <AfishaMain>
          <AfishaButtonLeft
            ref={prevButtonRef}
            onClick={navigateToPrev}
            style={{ display: "none" }}
          >
            <Icon icon="arrowCarousel" />
          </AfishaButtonLeft>
          <AfishaButtonRight
            ref={nextButtonRef}
            onClick={navigateToNext}
            style={{ display: "none" }}
          >
            <Icon icon="arrowCarousel" />
          </AfishaButtonRight>
          <EventsContainer ref={eventsContainerRef} $gap={gap}>
            {loading
              ? Array.from({ length: CONFIG.SKELETON_CARDS_COUNT }).map(
                  (_, index) => <SkeletonCardComponent key={index} />,
                )
              : events.map((event, index) => (
                  <EventCardComponent
                    key={event.id}
                    event={event}
                    index={index}
                  />
                ))}
          </EventsContainer>
        </AfishaMain>
      </AfishaWrapper>
    </AfishaContainer>
  );
};

export default Afisha;
