const { readFileSync, writeFileSync } = require("node:fs");
const CONFIG = require("../config.js");

/**
 * Чтение базы данных проектов
 * @returns {Array} массив проектов
 */
const readDatabase = () => {
  return JSON.parse(readFileSync(CONFIG.PATHS.DATABASE_FONTS, "utf8"));
};

/**
 * Запись в базу данных проектов
 * @param {Array} data - данные для записи
 */
const writeDatabase = (data) => {
  writeFileSync(CONFIG.PATHS.DATABASE_FONTS, JSON.stringify(data, null, 2));
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

module.exports = { handleApiError, readDatabase, writeDatabase };
