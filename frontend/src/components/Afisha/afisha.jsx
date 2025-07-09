import React, { useState, useEffect } from "react";
import {
  AfishaContainer,
  AfishaHeader,
  EventsContainer,
} from "./afisha.styles";

const Afisha = ({ text, gap, tracks }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://api.electro.nekrasovka.ru/api/calendars",
        );

        const data = await response.json();
        const eventsData = data.response.data.calendars;

        const limitedEvents = eventsData.slice(0, tracks);

        setEvents(limitedEvents);
      } catch (err) {
        console.error("Ошибка при загрузке событий:", err);
      }
    };

    fetchEvents();
  }, [tracks]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
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
    const days = [
      "воскресенье",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const weekday = days[date.getDay()];

    return { dateText: `${day} ${month}`, weekday };
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const generateEventHTML = (event, index) => {
    const { dateText, weekday } = formatDate(event.date);
    const time = formatTime(event.time_start);
    const eventText = event.text.replace(/<[^>]*>/g, "");

    // Создаем уникальный ID для события
    const uniqueClassName = `event-card-${index}`;

    // Формируем URL для background-image
    const backgroundImageUrl = event.picture_id
      ? `//nekrasovka.ru/img/${event.picture_id}/medium`
      : `none`;

    // Заменяем содержимое элементов с js-классами
    let htmlContent = text
      .replace(/class="event-card"/, `class="${uniqueClassName}"`)
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
        `<address class="location-text js-event-location ${event.geo === "Отменено" && "error"}">${event.geo === "Отменено" ? "Мероприятие отменено" : event.geo}</address>`,
      )
      .replace(
        /<span class="event-title js-event-title">[^<]*<\/span>/,
        `<span class="event-title js-event-title">${event.title}</span>`,
      )
      .replace(
        /<span class="event-subtitle js-event-subtitle">[^<]*<\/span>/,
        event.geo === "Отменено"
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

    // Заменяем background-image в стилях
    htmlContent = htmlContent.replace(
      `class="${uniqueClassName}"`,
      `class="${uniqueClassName}" style="background-image: url('${backgroundImageUrl}');"`,
    );

    return htmlContent;
  };

  return (
    <AfishaContainer>
      <AfishaHeader>
        <span>Афиша</span>
        <a href="">
          <span>Все события</span>
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM0 4.5H15V3.5H0V4.5Z"
              fill="#346178"
            />
          </svg>
        </a>
      </AfishaHeader>
      <EventsContainer $gap={gap} $tracks={tracks}>
        {events.map((event, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{
              __html: generateEventHTML(event, index),
            }}
          />
        ))}
      </EventsContainer>
      {events.length > 3 && (
        <button onClick={() => window.scrollTo(0, 0)}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="20"
              cy="20"
              r="19"
              fill="#EDEEE9"
              stroke="#346178"
              strokeWidth="2"
            />
            <path
              opacity="0.969"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.8558 12.0055C16.1453 11.9874 16.4297 12.0141 16.7089 12.0855C19.4082 14.3403 22.0919 16.6153 24.7599 18.9102C25.4329 19.4701 25.5217 20.11 25.0265 20.8297C22.3251 23.1401 19.6236 25.4506 16.9222 27.761C16.5236 28.0119 16.0971 28.0653 15.6425 27.921C14.9817 27.4837 14.8306 26.9061 15.1893 26.1881C17.5719 24.1165 19.9623 22.0549 22.3606 20.0032C19.9972 17.9332 17.6245 15.8715 15.2426 13.8183C14.8711 13.0044 15.0755 12.4001 15.8558 12.0055Z"
              fill="#346178"
            />
          </svg>
        </button>
      )}
    </AfishaContainer>
  );
};

export default Afisha;
