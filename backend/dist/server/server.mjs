import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import process$1 from "process";
import { fileURLToPath } from "url";
import { dirname, resolve, join, extname } from "node:path";
import dotenv from "dotenv";
import multer from "multer";
import { readFileSync, writeFileSync } from "node:fs";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONFIG = {
  PORT: process.env.PORT,
  PATHS: {
    BUILD_DIR: resolve(__dirname, "frontend/dist"),
    IMAGES_DIR: resolve(__dirname, "images"),
    DATABASE_DIR: resolve(__dirname, "database"),
    DATABASE_FILE: resolve(__dirname, "database/projects.json"),
    INDEX_HTML: join(resolve(__dirname, "frontend/dist"), "index.html")
  }
};
const createFileStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, CONFIG.PATHS.IMAGES_DIR),
    filename: (req, file, cb) => cb(null, `${Date.now()}${extname(file.originalname)}`)
  });
};
const upload = multer({ storage: createFileStorage() });
const router$2 = express.Router();
router$2.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({
      error: "No file uploaded",
      success: false
    });
  }
  return res.json({
    success: true,
    file
  });
});
const readDatabase = () => {
  return JSON.parse(readFileSync(CONFIG.PATHS.DATABASE_FILE, "utf8"));
};
const writeDatabase = (data) => {
  writeFileSync(CONFIG.PATHS.DATABASE_FILE, JSON.stringify(data, null, 2));
};
const findProject = (projects, projectId) => {
  return projects.find((p) => p.projectId === +projectId);
};
const handleApiError = (res, error) => {
  console.error("API Error:", error);
  return res.status(500).json({
    success: false,
    error: error.message
  });
};
const router$1 = express.Router();
router$1.get("/", (req, res) => {
  try {
    const projects = readDatabase();
    return res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});
router$1.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  try {
    const projects = readDatabase();
    const project = findProject(projects, projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found"
      });
    }
    return res.json({
      success: true,
      data: {
        ...project,
        pages: project.pages.map(
          ({ name, pageId, position, projectId: projectId2, url }) => ({
            name,
            pageId,
            position,
            projectId: projectId2,
            url
          })
        )
      }
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});
router$1.put("/create", (req, res) => {
  const { project } = req.body;
  try {
    const projects = readDatabase();
    const maxId = Math.max(...projects.map((p) => p.projectId), 0);
    const newProject = {
      ...project,
      projectId: maxId + 1,
      pages: []
    };
    projects.push(newProject);
    writeDatabase(projects);
    return res.json({
      success: true
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});
const router = express.Router();
router.get("/:pageId", (req, res) => {
  const { pageId } = req.params;
  try {
    const projects = readDatabase();
    let page;
    for (const project of projects) {
      const foundPage = project.pages.find((p) => p.pageId === +pageId);
      if (foundPage) {
        page = foundPage;
        break;
      }
    }
    if (!page) {
      return res.status(404).json({
        success: false,
        error: "Page not found"
      });
    }
    return res.json({
      success: true,
      data: page
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});
router.post("/update", (req, res) => {
  const { projectId, pageId, blocks, name } = req.body;
  try {
    const projects = readDatabase();
    const project = findProject(projects, projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found"
      });
    }
    project.pages = project.pages.map((page) => {
      if (page.pageId === pageId) {
        return {
          ...page,
          blocks: blocks || page.blocks,
          name: name || page.name
        };
      }
      return page;
    });
    writeDatabase(projects);
    return res.json({
      success: true
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});
router.post("/delete", (req, res) => {
  const { projectId, pageId } = req.body;
  try {
    const projects = readDatabase();
    const project = findProject(projects, projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found"
      });
    }
    project.pages = project.pages.filter((page) => page.pageId !== +pageId);
    if (project.pages.length > 0 && !project.pages.some((page) => page.position === 1)) {
      project.pages[0].position = 1;
      project.pages[0].url = "/";
    }
    writeDatabase(projects);
    return res.json({
      success: true
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});
router.put("/create", (req, res) => {
  const { projectId } = req.body;
  try {
    const projects = readDatabase();
    const project = findProject(projects, projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found"
      });
    }
    const maxPageId = Math.max(
      ...projects.flatMap((p) => p.pages.map((page) => page.pageId)),
      0
    );
    const newPage = {
      name: "Blank page",
      pageId: maxPageId + 1,
      projectId: project.projectId,
      position: project.pages.length > 0 ? 2 : 1,
      blocks: [],
      url: project.pages.length > 0 ? `/page${maxPageId + 1}` : "/"
    };
    project.pages.push(newPage);
    writeDatabase(projects);
    return res.json({
      success: true
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});
const initializeApp = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/images", express.static(CONFIG.PATHS.IMAGES_DIR));
  return app;
};
const configureRoutes = (app) => {
  app.use("/api/images", router$2);
  app.use("/api/projects", router$1);
  app.use("/api/page", router);
  app.use((req, res) => {
    res.sendFile(CONFIG.PATHS.INDEX_HTML);
  });
};
const startServer = (app) => {
  app.listen(CONFIG.PORT, () => {
    console.log(`Server started on port ${CONFIG.PORT}`);
  });
};
const main = () => {
  try {
    const app = initializeApp();
    configureRoutes(app);
    startServer(app);
  } catch (error) {
    console.error("Failed to start server:", error);
    process$1.exit(1);
  }
};
main();
