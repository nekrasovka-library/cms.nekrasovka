import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CONFIG } from "./event.page.constants";
import {
  AfishaContainerStyled,
  ErrorMessageStyled,
  EventPageContainerStyled,
  EventPageStyled,
} from "./event.page.styles";
import EventPagePreview from "./event.page.preview";
import EventPageConstructor from "./event.page.constructor";
import { useParams } from "react-router";
import {
  calculateBlockWidth,
  formatDate,
  formatTime,
  formatUrl,
} from "../../helpers";

const EventPage = () => {
  const today = new Date();
  const dispatch = useDispatch();
  const [page, setPage] = useState(null);
  const [event, setEvent] = useState({
    id: 1,
    date: today,
    text: "<div>Текстовый блок</div>",
    geo: "Выберите местоположение",
    price: 0,
    restriction: "0+",
    og_image: null,
    picture_id: null,
    dateText: formatDate(today).dateText,
    weekday: formatDate(today).weekday,
    time: formatTime(new Date()),
    canceled: false,
    author: {
      img: "",
      text: "<div>Текстовый блок</div>",
    },
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { eventId, pageId } = useParams();
  const { isPreview } = useSelector((state) => state.preview);
  const { isPageLoaded, pageData } = useSelector((state) => state.page);

  const fetchEvents = async (id) => {
    try {
      const response = await fetch(CONFIG.API_URL);
      const data = await response.json();
      const eventData = data.response.data.calendars.find(
        (calendar) => calendar.id === +id,
      );

      const { dateText, weekday } = formatDate(eventData.date); // Используем eventData.date
      const time = formatTime(eventData.time_start);
      const url = formatUrl(eventData.date, eventData.id);

      setEvent({
        ...eventData,
        dateText,
        weekday,
        url,
        time,
        text: eventData.text,
        canceled: eventData.geo === CONFIG.CANCELLED_EVENT_TEXT,
        author: {
          img: "",
          text: event.author.text,
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

  // Загрузка событий
  useEffect(() => {
    if (!!eventId) fetchEvents(eventId);
  }, [eventId]);

  // Обработка загруженных данных страницы
  useEffect(() => {
    if (isPageLoaded) {
      const { id, styles } = pageData.blocks.find((block) =>
        block.items.find((item) => item.type === "afishaEvent"),
      );

      setLoaded(true);
      setPage({
        blockId: id,
        backgroundColor: styles.backgroundColor,
        paddingTop: styles.paddingTop,
        paddingBottom: styles.paddingBottom,
        maxWidth: calculateBlockWidth(styles.maxWidth),
      });
    } else dispatch({ type: "GET_PROJECT_PAGE_REQUEST", pageId });
  }, [isPageLoaded, pageId, dispatch]);

  if (error) {
    return (
      <AfishaContainerStyled>
        <ErrorMessageStyled>{error}</ErrorMessageStyled>
      </AfishaContainerStyled>
    );
  }

  return (
    loaded && (
      <EventPageStyled
        $backgroundColor={page.backgroundColor}
        $paddingTop={page.paddingTop}
        $paddingBottom={page.paddingBottom}
      >
        <EventPageContainerStyled $maxWidth={page.maxWidth}>
          {isPreview ? (
            <EventPagePreview loading={loading} event={event} />
          ) : (
            loaded && (
              <EventPageConstructor
                blockId={page.blockId}
                event={event}
                setEvent={setEvent}
                backgroundColor={page.backgroundColor}
                formatDate={formatDate}
                formatTime={formatTime}
                formatUrl={formatUrl}
              />
            )
          )}
        </EventPageContainerStyled>
      </EventPageStyled>
    )
  );
};

export default EventPage;
