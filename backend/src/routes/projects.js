const express = require("express");
const {
  readDatabase,
  writeDatabase,
  findProject,
  handleApiError,
} = require("../utils/database.js");

const router = express.Router();

/**
 * Получение всех проектов
 */
router.get("/", (req, res) => {
  try {
    const projects = readDatabase();
    return res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});

/**
 * Получение проекта по ID
 */
router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;

  try {
    const projects = readDatabase();
    const project = findProject(projects, projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    return res.json({
      success: true,
      data: {
        ...project,
        pages: project.pages.map(
          ({ name, pageId, position, projectId, url }) => ({
            name,
            pageId,
            position,
            projectId,
            url,
          }),
        ),
      },
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});

/**
 * Создание нового проекта
 */
router.put("/create", (req, res) => {
  const { project } = req.body;

  try {
    const projects = readDatabase();
    const maxId = Math.max(...projects.map((p) => p.projectId), 0);

    const newProject = {
      ...project,
      projectId: maxId + 1,
      mainPage: null,
      pages: [],
      fontFamily: "",
    };

    projects.push(newProject);
    writeDatabase(projects);

    return res.json({
      success: true,
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});

router.post("/update", (req, res) => {
  const { mainPage, fontFamily, name, href, projectId } = req.body;

  try {
    const projects = readDatabase();

    const newProjects = projects.map((project) => {
      if (project.projectId === projectId) {
        project.pages.map((page) => {
          if (project.mainPage === page.pageId) {
            page.url = `/page${page.pageId}`;
          } else if (page.pageId === +mainPage) {
            page.url = "/";
          }

          return page;
        });

        return {
          ...project,
          mainPage: +mainPage || project.mainPage,
          name: name || project.name,
          href: href || project.href,
          fontFamily: fontFamily || project.fontFamily,
        };
      } else return project;
    });

    writeDatabase(newProjects);

    return res.json({
      success: true,
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});

module.exports = router;
