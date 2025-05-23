import express from "express";
import { join, resolve, extname } from "node:path";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import * as path from "node:path";
import process from "process";

// Инициализация dotenv
dotenv.config();

// Для ES модулей нужно явно получить __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Константы
const PORT = 3001;
const BUILD_DIR = resolve(__dirname, "../", "dist");
const IMAGES_DIR = resolve(__dirname, "../", "images");
const STATIC_PATHS = {
  index: join(BUILD_DIR, "index.html"),
};

// Конфигурация multer
const createStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, IMAGES_DIR),
    filename: (req, file, cb) =>
      cb(null, `${Date.now()}${extname(file.originalname)}`),
  });
};

// Инициализация приложения
const initializeApp = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Статические файлы
  app.use("/images", express.static(IMAGES_DIR));

  return app;
};

// Роуты
const configureRoutes = (app) => {
  const upload = multer({ storage: createStorage() });

  // API роуты
  app.post("/api/images/upload", upload.single("image"), async (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        error: "No file uploaded",
        success: false,
      });
    }

    return res.json({
      success: true,
      file,
    });
  });

  // Обработка всех остальных маршрутов - отдаем index.html
  app.use((req, res) => {
    res.sendFile(STATIC_PATHS.index);
  });
};

// Запуск сервера
const startServer = (app) => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

// Основная функция
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
