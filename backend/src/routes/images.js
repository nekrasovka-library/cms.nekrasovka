import express from 'express';
import { upload } from '../middleware/upload.js';

const router = express.Router();

/**
 * Маршрут для загрузки изображений
 */
router.post('/upload', upload.single('image'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      error: 'No file uploaded',
      success: false
    });
  }

  return res.json({
    success: true,
    file
  });
});

export default router;
