const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const process = require("process");

// Импорт конфигурации
const CONFIG = require("./config.js");

// Импорт маршрутов
const imagesRoutes = require("./routes/images.js");
const projectsRoutes = require("./routes/projects.js");
const pagesRoutes = require("./routes/pages.js");

/**
 * Инициализация приложения
 * @returns {Object} экземпляр Express приложения
 */
const initializeApp = () => {
  const app = express();

  // Настройка middleware
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Статические файлы
  app.use("/images", express.static(CONFIG.PATHS.IMAGES_DIR));

  return app;
};

/**
 * Конфигурация маршрутов
 * @param {Object} app - экземпляр Express приложения
 */
const configureRoutes = (app) => {
  // Регистрация API маршрутов
  app.use("/api/images", imagesRoutes);
  app.use("/api/projects", projectsRoutes);
  app.use("/api/page", pagesRoutes);

  // Обработка всех остальных маршрутов - отдаем index.html
  app.use((req, res) => {
    res.sendFile(CONFIG.PATHS.INDEX_HTML);
  });
};

/**
 * Запуск сервера
 * @param {Object} app - экземпляр Express приложения
 */
const startServer = (app) => {
  app.listen(CONFIG.PORT, () => {
    console.log(`Server started on port ${CONFIG.PORT}`);
  });
};

/**
 * Основная функция запуска приложения
 */
const main = () => {
  try {
    const app = initializeApp();
    configureRoutes(app);
    startServer(app);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Запуск приложения
main();
