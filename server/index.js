import express from "express";
import { join, resolve, extname } from "node:path";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import * as path from "node:path";
import process from "process";
import { readFileSync, writeFileSync } from "node:fs";

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

  app.get("/api/projects", async (req, res) => {
    try {
      const projectsData = readFileSync(
        join(__dirname, "projects.json"),
        "utf8",
      );

      const projects = JSON.parse(projectsData);
      return res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });

  app.get("/api/projects/:projectId", async (req, res) => {
    try {
      const projectsData = readFileSync(
        join(__dirname, "projects.json"),
        "utf8",
      );
      const projects = JSON.parse(projectsData);
      const project = projects.find(
        (project) => project.projectId === +req.params.projectId,
      );

      if (!project) {
        return res.status(404).json({
          success: false,
          error: "Project not found",
        });
      }

      return res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });

  app.put("/api/projects/create", async (req, res) => {
    try {
      const projectsData = readFileSync(
        join(__dirname, "projects.json"),
        "utf8",
      );
      const projects = JSON.parse(projectsData);

      const maxId = Math.max(...projects.map((p) => p.projectId), 0);
      const newProject = {
        ...req.body.project,
        projectId: maxId + 1,
        pages: [],
      };

      projects.push(newProject);
      writeFileSync(
        join(__dirname, "projects.json"),
        JSON.stringify(projects, null, 2),
      );

      return res.json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });

  app.get("/api/projects/:projectId/:pageId/delete", async (req, res) => {
    try {
      const projectsData = readFileSync(
        join(__dirname, "projects.json"),
        "utf8",
      );
      const projects = JSON.parse(projectsData);
      const project = projects.find(
        (p) => p.projectId === +req.params.projectId,
      );

      if (!project) {
        return res.status(404).json({
          success: false,
          error: "Project not found",
        });
      }

      project.pages = project.pages.filter(
        (page) => page.pageId !== +req.params.pageId,
      );

      const isNotHome = !project.pages.some((page) => page.position === 1);
      if (isNotHome) project.pages[0].position = 1;

      writeFileSync(
        join(__dirname, "projects.json"),
        JSON.stringify(projects, null, 2),
      );

      return res.json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });

  app.get("/api/projects/:projectId/page/create", async (req, res) => {
    try {
      const projectsData = readFileSync(
        join(__dirname, "projects.json"),
        "utf8",
      );
      const projects = JSON.parse(projectsData);
      const project = projects.find(
        (p) => p.projectId === +req.params.projectId,
      );

      if (!project) {
        return res.status(404).json({
          success: false,
          error: "Project not found",
        });
      }

      const maxPageId = Math.max(
        ...projects.flatMap((p) => p.pages.map((page) => page.pageId)),
        0,
      );
      const newPage = {
        name: "Blank page",
        pageId: maxPageId + 1,
        projectId: project.projectId,
        position: project.pages.length > 0 ? 2 : 1,
      };

      project.pages.push(newPage);
      writeFileSync(
        join(__dirname, "projects.json"),
        JSON.stringify(projects, null, 2),
      );

      return res.json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
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
