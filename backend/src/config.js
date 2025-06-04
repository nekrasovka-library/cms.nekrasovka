import { fileURLToPath } from "url";
import { resolve, join, dirname } from "node:path";
import dotenv from "dotenv";

// Инициализация dotenv
dotenv.config();

// Получение __dirname для ES модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Конфигурация приложения
const CONFIG = {
  PORT: process.env.PORT,
  PATHS: {
    BUILD_DIR: resolve(__dirname, "frontend/dist"),
    IMAGES_DIR: resolve(__dirname, "images"),
    DATABASE_DIR: resolve(__dirname, "database"),
    DATABASE_FILE: resolve(__dirname, "database/projects.json"),
    INDEX_HTML: join(resolve(__dirname, "frontend/dist"), "index.html"),
  },
};

export default CONFIG;
