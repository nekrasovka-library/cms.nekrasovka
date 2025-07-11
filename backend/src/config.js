const { resolve, join } = require("node:path");
const dotenv = require("dotenv");

// Инициализация dotenv
dotenv.config();

// Конфигурация приложения
const CONFIG = {
  PORT: process.env.PORT || 3013,
  PATHS: {
    BUILD_DIR: resolve(__dirname, process.env.FRONTEND),
    INDEX_HTML: join(resolve(__dirname, process.env.FRONTEND), "index.html"),
    IMAGES_DIR: resolve(__dirname, process.env.IMAGES),
    FILES_DIR: resolve(__dirname, process.env.FILES),
    FONTS_DIR: resolve(__dirname, process.env.FONTS),
    DATABASE_DIR: resolve(__dirname, process.env.DATABASE),
    DATABASE_PROJECTS: resolve(
      __dirname,
      process.env.DATABASE,
      "projects.json",
    ),
    DATABASE_FONTS: resolve(__dirname, process.env.DATABASE, "fonts.json"),
  },
};

module.exports = CONFIG;
