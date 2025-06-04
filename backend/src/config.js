const { resolve, join } = require("node:path");
const dotenv = require("dotenv");

// Инициализация dotenv
dotenv.config();

// Конфигурация приложения
const CONFIG = {
  PORT: process.env.PORT || 3013,
  PATHS: {
    INDEX_HTML: join(resolve(__dirname, "../../frontend/build"), "index.html"),
    IMAGES_DIR: resolve(__dirname, "../../../../images"),
    DATABASE_FILE: resolve(__dirname, "../../../../database/projects.json"),
    // IMAGES_DIR: resolve(__dirname, "../../images"),
    // DATABASE_FILE: resolve(__dirname, "../../database/projects.json"),
  },
};

module.exports = CONFIG;
