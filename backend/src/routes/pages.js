const express = require("express");
const {
  readDatabase,
  writeDatabase,
  findProject,
  handleApiError,
} = require("../utils/database.js");

const router = express.Router();

/**
 * Получение страницы по ID
 */
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
        error: "Page not found",
      });
    }

    return res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});

/**
 * Обновление страницы
 */
router.post("/update", (req, res) => {
  const { projectId, pageId, blocks, name } = req.body;

  try {
    const projects = readDatabase();
    const project = findProject(projects, projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    project.pages = project.pages.map((page) => {
      if (page.pageId === pageId) {
        return {
          ...page,
          blocks: blocks || page.blocks,
          name: name || page.name,
        };
      }

      return page;
    });

    writeDatabase(projects);

    return res.json({
      success: true,
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});

/**
 * Удаление страницы
 */
router.post("/delete", (req, res) => {
  const { projectId, pageId } = req.body;

  try {
    const projects = readDatabase();
    const project = findProject(projects, projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    project.pages = project.pages.filter((page) => page.pageId !== +pageId);

    // Если есть страницы и нет домашней, делаем первую страницу домашней
    if (project.pages.length > 0 && project.mainPage !== null) {
      project.mainPage = project.pages[0].pageId;
      project.pages[0].url = "/";
    }

    if (project.pages.length === 0 && project.mainPage !== null) {
      project.mainPage = null;
    }

    writeDatabase(projects);

    return res.json({
      success: true,
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});

/**
 * Создание страницы
 */
router.put("/create", (req, res) => {
  const { projectId } = req.body;

  try {
    const projects = readDatabase();
    const project = findProject(projects, projectId);

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
      blocks: [],
      url: project.pages.length > 0 ? `/page${maxPageId + 1}` : "/",
    };

    project.pages.push(newPage);
    writeDatabase(projects);

    return res.json({
      success: true,
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});

module.exports = router;
