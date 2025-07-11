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
  RETRY_DELAY: 100,
  CANCELLED_EVENT_TEXT: "Отменено",
  CANCELLED_EVENT_MESSAGE: "Мероприятие отменено",
  LOADING_MESSAGE: "Загрузка событий...",
  ERROR_MESSAGE: "Ошибка загрузки событий",
  SKELETON_CARDS_COUNT: 3,
  LAZY_LOAD_THRESHOLD: 0.1, // Загружать когда 10% элемента видно
  IMAGE_LOAD_DELAY: 200, // Задержка между загрузкой изображений (мс)
};

class AfishaJS {
  constructor() {
    this.events = [];
    this.scrollIndex = 1;
    this.tracks = CONFIG.DEFAULT_TRACKS;
    this.gap = CONFIG.DEFAULT_GAP;
    this.windowWidth = window.innerWidth;
    this.imageLoadQueue = [];
    this.isLoadingImages = false;
    this.intersectionObserver = null;

    if (!this.initializeDOMElements()) {
      console.error("Не найдены необходимые элементы DOM для AfishaJS");
      return;
    }

    this.scrollAmount = this.eventsContainer.clientWidth + this.gap;
    this.init();
  }

  initializeDOMElements() {
    this.eventsContainer = document.getElementById("eventsContainer");
    this.prevButton = document.getElementById("prevButton");
    this.nextButton = document.getElementById("nextButton");

    return this.eventsContainer && this.prevButton && this.nextButton;
  }

  init() {
    this.initIntersectionObserver();
    this.renderSkeletonCards();
    this.fetchEvents();
    this.setupEventListeners();
    if (this.windowWidth > CONFIG.DESKTOP_BREAKPOINT) {
      this.preventScroll();
    }
  }

  initIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const imageUrl = card.dataset.imageUrl;

            if (imageUrl && !card.classList.contains("image-loaded")) {
              this.addToImageQueue(card, imageUrl);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: CONFIG.LAZY_LOAD_THRESHOLD,
      },
    );
  }

  addToImageQueue(card, imageUrl) {
    this.imageLoadQueue.push({ card, imageUrl });

    if (!this.isLoadingImages) {
      this.processImageQueue();
    }
  }

  async processImageQueue() {
    if (this.imageLoadQueue.length === 0) {
      this.isLoadingImages = false;
      return;
    }

    this.isLoadingImages = true;
    const { card, imageUrl } = this.imageLoadQueue.shift();

    try {
      await this.loadImage(imageUrl);
      this.applyImageToCard(card, imageUrl);
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
      this.applyFallbackImage(card);
    }

    // Задержка перед загрузкой следующего изображения
    setTimeout(() => {
      this.processImageQueue();
    }, CONFIG.IMAGE_LOAD_DELAY);
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  applyImageToCard(card, imageUrl) {
    card.style.backgroundImage = `url('${imageUrl}')`;
    card.classList.add("image-loaded");

    // Добавляем плавную анимацию появления
    card.style.transition = "background-image 0.3s ease-in-out";

    // Перестаем наблюдать за этой карточкой
    this.intersectionObserver.unobserve(card);
  }

  applyFallbackImage(card) {
    card.style.backgroundColor = "#f0f0f0";
    card.classList.add("image-loaded", "image-error");
    this.intersectionObserver.unobserve(card);
  }

  renderSkeletonCards() {
    if (!this.eventsContainer) return;

    this.eventsContainer.innerHTML = "";

    for (let i = 0; i < CONFIG.SKELETON_CARDS_COUNT; i++) {
      const skeletonCard = this.createSkeletonCard(i);
      this.eventsContainer.appendChild(skeletonCard);
    }
  }

  createSkeletonCard(index) {
    const skeletonCard = document.createElement("div");
    skeletonCard.className = `event-card skeleton-card skeleton-card-${index}`;

    skeletonCard.innerHTML = `
      <section class="datetime-section">
        <div class="datetime-header">
          <div>
            <span class="date-text skeleton-text">00 месяца</span>
            <span class="skeleton-text">день недели</span>
          </div>
          <time class="skeleton-text">00:00</time>
        </div>
        <span class="location-text skeleton-text">Место проведения</span>
      </section>
      <div class="title-section">
        <span class="event-title skeleton-text">Название события</span>
        <span class="event-subtitle skeleton-text">Описание события которое может быть достаточно длинным и занимать несколько строк текста</span>
      </div>
      <section class="footer-section">
        <div class="tags-section">
          <div></div>
          <span class="skeleton-text">0+</span>
        </div>
      </section>
    `;

    // Добавляем стили для размытия
    this.addSkeletonStyles(index);

    return skeletonCard;
  }

  addSkeletonStyles(index) {
    const existingStyle = document.querySelector(
      `style[data-skeleton="${index}"]`,
    );
    if (existingStyle) return;

    const style = document.createElement("style");
    style.setAttribute("data-skeleton", index);
    style.textContent = `
      .skeleton-card-${index} {
        background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
        position: relative;
        overflow: hidden;
      }
      
      .skeleton-card-${index}::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: skeleton-loading 2s infinite;
      }
      
      .skeleton-card-${index} .skeleton-text {
        background: rgba(0,0,0,0.1);
        border-radius: 4px;
        color: transparent;
        filter: blur(1px);
        animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
      }
      
      @keyframes skeleton-loading {
        0% {
          left: -100%;
        }
        100% {
          left: 100%;
        }
      }
      
      @keyframes skeleton-pulse {
        0% {
          opacity: 0.6;
        }
        100% {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  async fetchEvents() {
    try {
      const response = await fetch(CONFIG.API_URL);
      const data = await response.json();
      const eventsData = data.response.data.calendars;
      this.events = eventsData.slice(0, this.tracks);
      this.renderEvents();
    } catch (error) {
      this.handleFetchError(error);
    }
  }

  handleFetchError(error) {
    console.error("Ошибка при загрузке событий:", error);
    if (this.eventsContainer) {
      this.eventsContainer.innerHTML = `<div class="error-message">${CONFIG.ERROR_MESSAGE}</div>`;
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const weekday = WEEKDAYS[date.getDay()];
    return { dateText: `${day} ${month}`, weekday };
  }

  formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  formatUrl(dateString, id) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `//nekrasovka.ru/afisha/${day}-${month}-${year}/${id}`;
  }

  createBackgroundImageUrl(pictureId) {
    return pictureId ? `//nekrasovka.ru/img/${pictureId}/medium` : "none";
  }

  isEventCancelled(event) {
    return event.geo === CONFIG.CANCELLED_EVENT_TEXT;
  }

  createEventCard(event, index) {
    const eventCard = document.createElement("div");
    eventCard.className = `event-card event-card-${index}`;
    return eventCard;
  }

  applyEventCardStyles(eventCard, backgroundImageUrl, isEventCancelled, index) {
    if (isEventCancelled) {
      eventCard.classList.add("error");
      eventCard.style.position = "relative";
      this.addCancelledEventStyles(index, backgroundImageUrl);
    } else {
      // Не устанавливаем фон сразу - это будет делать lazy loading
      eventCard.dataset.imageUrl = backgroundImageUrl;
      eventCard.style.backgroundColor = "#f5f5f5"; // Временный фон

      // Добавляем карточку в наблюдение
      this.intersectionObserver.observe(eventCard);
    }
  }

  addCancelledEventStyles(index, backgroundImageUrl) {
    const style = document.createElement("style");
    style.textContent = `.event-card-${index}.error::before { background-image: url('${backgroundImageUrl}'); }`;
    document.head.appendChild(style);
  }

  generateLocationSection(event, isEventCancelled) {
    return isEventCancelled
      ? `<span class="location-text">${CONFIG.CANCELLED_EVENT_MESSAGE}</span>`
      : `<a href="${event.geo_link}" target="_blank" class="location-text">${event.geo}</a>`;
  }

  generateEventHTML(event, index) {
    const { dateText, weekday } = this.formatDate(event.date);
    const time = this.formatTime(event.time_start);
    const url = this.formatUrl(event.date, event.id);
    const backgroundImageUrl = this.createBackgroundImageUrl(event.picture_id);
    const isEventCancelled = this.isEventCancelled(event);
    const eventText = event.text.replace(/<[^>]*>/g, "");

    const eventCard = this.createEventCard(event, index);
    this.applyEventCardStyles(
      eventCard,
      backgroundImageUrl,
      isEventCancelled,
      index,
    );

    eventCard.innerHTML = `
      <section class="datetime-section">
        <div class="datetime-header">
          <div>
            <span class="date-text">${dateText}</span>
            <span>${weekday}</span>
          </div>
          <time>${time}</time>
        </div>
        ${this.generateLocationSection(event, isEventCancelled)}
      </section>
      <a href="${url}" class="title-section">
        <span class="event-title">${event.title}</span>
        ${isEventCancelled ? "" : `<span class="event-subtitle">${eventText}</span>`}
      </a>
      <section class="footer-section">
        ${event.price ? '<div class="price-tag">Платное</div>' : ""}
        <div class="tags-section">
          <div></div>
          <span>${event.restriction}</span>
        </div>
      </section>
    `;

    return eventCard;
  }

  renderEvents() {
    if (!this.eventsContainer) return;

    // Очищаем скелетоны
    this.clearSkeletonStyles();
    this.eventsContainer.innerHTML = "";

    // Рендерим реальные события
    this.events.forEach((event, index) => {
      const eventElement = this.generateEventHTML(event, index);
      this.eventsContainer.appendChild(eventElement);
    });

    if (this.windowWidth > CONFIG.DESKTOP_BREAKPOINT) {
      this.updateNavigationButtons();
    }
  }

  clearSkeletonStyles() {
    // Удаляем стили скелетонов
    const skeletonStyles = document.querySelectorAll("style[data-skeleton]");
    skeletonStyles.forEach((style) => style.remove());
  }

  updateNavigationButtons() {
    if (!this.prevButton || !this.nextButton) return;

    this.prevButton.style.display = this.scrollIndex > 1 ? "flex" : "none";
    this.nextButton.style.display =
      this.events.length > CONFIG.ITEMS_PER_PAGE &&
      this.scrollIndex < Math.ceil(this.events.length / CONFIG.ITEMS_PER_PAGE)
        ? "flex"
        : "none";
  }

  handleScroll(scrollAmount) {
    if (!this.eventsContainer) return;

    this.eventsContainer.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  navigateToPrev() {
    this.handleScroll(this.scrollAmount);
    this.scrollIndex++;
    this.updateNavigationButtons();
  }

  navigateToNext() {
    this.handleScroll(-this.scrollAmount);
    this.scrollIndex--;
    this.updateNavigationButtons();
  }

  setupEventListeners() {
    if (!this.prevButton || !this.nextButton) return;

    this.prevButton.addEventListener("click", () => this.navigateToNext());
    this.nextButton.addEventListener("click", () => this.navigateToPrev());
  }

  preventScroll() {
    const container = this.eventsContainer;
    const preventScrollEvent = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const preventMouseDrag = (e) => {
      e.preventDefault();
    };

    container.addEventListener("wheel", preventScrollEvent, { passive: false });
    container.addEventListener("mousedown", preventMouseDrag);
    container.addEventListener("touchmove", preventScrollEvent, {
      passive: false,
    });
  }

  // Метод для очистки при уничтожении компонента
  destroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.clearSkeletonStyles();
  }
}

function initializeAfisha() {
  const requiredElements = {
    eventsContainer: document.getElementById("eventsContainer"),
    prevButton: document.getElementById("prevButton"),
    nextButton: document.getElementById("nextButton"),
  };

  const allElementsFound = Object.values(requiredElements).every(
    (element) => element,
  );

  if (allElementsFound) {
    console.log("Все элементы найдены - инициализация Afisha");
    new AfishaJS();
  } else {
    console.log("Не все элементы найдены, повторная попытка через 100ms");
    setTimeout(initializeAfisha, CONFIG.RETRY_DELAY);
  }
}

// Инициализация при загрузке страницы ИЛИ немедленно, если DOM уже готов
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded - попытка инициализации Afisha");
    initializeAfisha();
  });
} else {
  console.log("DOM уже готов - попытка инициализации Afisha");
  initializeAfisha();
}
