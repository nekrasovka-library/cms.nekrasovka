const { resolve, join } = require("node:path");
const dotenv = require("dotenv");

// Инициализация dotenv
dotenv.config();

// Получение __dirname для ES модулей

// Конфигурация приложения
const CONFIG = {
  PORT: process.env.PORT || 3013,
  PATHS: {
    BUILD_DIR: resolve(__dirname, "../../frontend/dist"),
    IMAGES_DIR: resolve(__dirname, "../../../../images"),
    DATABASE_DIR: resolve(__dirname, "../../../../database"),
    DATABASE_FILE: resolve(__dirname, "../../../../database/projects.json"),
    INDEX_HTML: join(resolve(__dirname, "../../frontend/dist"), "index.html"),
  },
};

module.exports = CONFIG;
