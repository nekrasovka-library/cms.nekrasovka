const { readFileSync, writeFileSync } = require("node:fs");
const CONFIG = require("../config.js");

/**
 * Чтение базы данных проектов
 * @returns {Array} массив проектов
 */
const readDatabase = () => {
  return JSON.parse(readFileSync(CONFIG.PATHS.DATABASE_FILE, "utf8"));
};

/**
 * Запись в базу данных проектов
 * @param {Array} data - данные для записи
 */
const writeDatabase = (data) => {
  writeFileSync(CONFIG.PATHS.DATABASE_FILE, JSON.stringify(data, null, 2));
};

/**
 * Поиск проекта по ID
 * @param {Array} projects - массив проектов
 * @param {number|string} projectId - ID проекта
 * @returns {Object|undefined} найденный проект или undefined
 */
const findProject = (projects, projectId) => {
  return projects.find((p) => p.projectId === +projectId);
};

/**
 * Обработка ошибок API
 * @param {Object} res - объект ответа Express
 * @param {Error} error - объект ошибки
 * @returns {Object} ответ с ошибкой
 */
const handleApiError = (res, error) => {
  console.error("API Error:", error);
  return res.status(500).json({
    success: false,
    error: error.message,
  });
};

module.exports = { handleApiError, readDatabase, writeDatabase, findProject };
