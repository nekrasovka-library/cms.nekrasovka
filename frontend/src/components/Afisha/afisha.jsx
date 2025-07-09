import React, { useState, useEffect, useRef } from "react";
import {
  AfishaButtonLeft,
  AfishaButtonRight,
  AfishaContainer,
  AfishaHeader,
  EventsContainer,
} from "./afisha.styles";
import Icon from "../../nekrasovka-ui/Icon/icon";

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

const DAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

const SCROLL_AMOUNT = 410;
const API_URL = "https://api.electro.nekrasovka.ru/api/calendars";

const Afisha = ({ text, gap, tracks }) => {
  const [events, setEvents] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const eventsContainerRef = useRef(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const eventsData = data.response.data.calendars;
      const limitedEvents = eventsData.slice(0, tracks);
      setEvents(limitedEvents);
    } catch (err) {
      console.error("Ошибка при загрузке событий:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [tracks]);

  useEffect(() => {
    const container = eventsContainerRef.current;
    if (!container) return;

    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const preventMouseDrag = (e) => {
      e.preventDefault();
    };

    // Блокируем прокрутку колесиком мыши
    container.addEventListener("wheel", preventScroll, { passive: false });
    // Блокируем перетаскивание
    container.addEventListener("mousedown", preventMouseDrag);
    // Блокируем прокрутку на touch устройствах
    container.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      container.removeEventListener("wheel", preventScroll);
      container.removeEventListener("mousedown", preventMouseDrag);
      container.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const weekday = DAYS[date.getDay()];
    return { dateText: `${day} ${month}`, weekday };
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const createUniqueClassName = (index) => `event-card-${index}`;

  const createBackgroundImageUrl = (pictureId) => {
    return pictureId ? `//nekrasovka.ru/img/${pictureId}/medium` : `none`;
  };

  const replaceEventContent = (htmlContent, event, dateText, weekday, time) => {
    const eventText = event.text.replace(/<[^>]*>/g, "");
    const isEventCancelled = event.geo === "Отменено";

    return htmlContent
      .replace(
        /<span class="date-text js-event-date">[^<]*<\/span>/,
        `<span class="date-text js-event-date">${dateText}</span>`,
      )
      .replace(
        /<span class="js-event-weekday">[^<]*<\/span>/,
        `<span class="js-event-weekday">${weekday}</span>`,
      )
      .replace(
        /<time class="js-event-time">[^<]*<\/time>/,
        `<time class="js-event-time">${time}</time>`,
      )
      .replace(
        /<address class="location-text js-event-location">[^<]*<\/address>/,
        `<address class="location-text js-event-location ${isEventCancelled && "error"}">${isEventCancelled ? "Мероприятие отменено" : event.geo}</address>`,
      )
      .replace(
        /<span class="event-title js-event-title">[^<]*<\/span>/,
        `<span class="event-title js-event-title">${event.title}</span>`,
      )
      .replace(
        /<span class="event-subtitle js-event-subtitle">[^<]*<\/span>/,
        isEventCancelled
          ? ""
          : `<span class="event-subtitle js-event-subtitle">${eventText}</span>`,
      )
      .replace(
        /<div class="price-tag js-event-price">[^<]*<\/div>/,
        !!event.price
          ? `<div class="price-tag js-event-price">Платное</div>`
          : "",
      )
      .replace(/<div class="series-text js-event-series">[^<]*<\/div>/, ``)
      .replace(/<span class="js-event-category">[^<]*<\/span>/, ``)
      .replace(/<span class="js-event-tag">[^<]*<\/span>/, ``)
      .replace(
        /<span class="js-event-restriction">[^<]*<\/span>/,
        `<span class="js-event-restriction">${event.restriction}</span>`,
      );
  };

  const generateEventHTML = (event, index) => {
    const { dateText, weekday } = formatDate(event.date);
    const time = formatTime(event.time_start);
    const uniqueClassName = createUniqueClassName(index);
    const backgroundImageUrl = createBackgroundImageUrl(event.picture_id);

    let htmlContent = text.replace(
      /class="event-card"/,
      `class="${uniqueClassName}"`,
    );
    htmlContent = replaceEventContent(
      htmlContent,
      event,
      dateText,
      weekday,
      time,
    );

    htmlContent = htmlContent.replace(
      `class="${uniqueClassName}"`,
      `class="${uniqueClassName}" style="background-image: url('${backgroundImageUrl}');"`,
    );

    return htmlContent;
  };

  const handleScroll = (scrollAmount) => {
    if (eventsContainerRef.current) {
      const container = eventsContainerRef.current;
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <AfishaContainer>
      {scrollIndex > 0 && (
        <AfishaButtonLeft
          onClick={() => {
            handleScroll(-SCROLL_AMOUNT);
            setScrollIndex(scrollIndex - 1);
          }}
        >
          <Icon icon="arrowCarousel" />
        </AfishaButtonLeft>
      )}
      <AfishaHeader>
        <span>Афиша</span>
        <a href="">
          <span>Все события</span>
          <Icon icon="arrowRightLong" fill="#346178" />
        </a>
      </AfishaHeader>
      <EventsContainer $gap={gap} $tracks={tracks} ref={eventsContainerRef}>
        {events.map((event, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{
              __html: generateEventHTML(event, index),
            }}
          />
        ))}
      </EventsContainer>
      {events.length > 3 && scrollIndex < events.length - 1 && (
        <AfishaButtonRight
          onClick={() => {
            handleScroll(SCROLL_AMOUNT);
            setScrollIndex(scrollIndex + 1);
          }}
        >
          <Icon icon="arrowCarousel" />
        </AfishaButtonRight>
      )}
    </AfishaContainer>
  );
};

export default Afisha;
