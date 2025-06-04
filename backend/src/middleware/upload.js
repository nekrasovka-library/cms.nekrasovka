const multer = require("multer");
const { extname } = require("node:path");
const CONFIG = require("../config.js");

/**
 * Создание хранилища для загрузки файлов
 * @returns {Object} конфигурация хранилища multer
 */
const createFileStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, CONFIG.PATHS.IMAGES_DIR),
    filename: (req, file, cb) =>
      cb(null, `${Date.now()}${extname(file.originalname)}`),
  });
};

/**
 * Middleware для загрузки файлов
 */
const upload = multer({ storage: createFileStorage() });

module.exports = { createFileStorage, upload };
