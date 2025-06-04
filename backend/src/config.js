const { resolve, join } = require("node:path");
const dotenv = require("dotenv");

// Инициализация dotenv
dotenv.config();

// Конфигурация приложения
const CONFIG = {
  PORT: process.env.PORT || 3013,
  PATHS: {
    BUILD_DIR: resolve(__dirname, "../../frontend/build"),
    IMAGES_DIR: resolve(__dirname, "../../../../images"),
    DATABASE_DIR: resolve(__dirname, "../../../../database"),
    DATABASE_FILE: resolve(__dirname, "../../../../database/projects.json"),
    INDEX_HTML: join(resolve(__dirname, "../../frontend/build"), "index.html"),
  },
};

module.exports = CONFIG;
