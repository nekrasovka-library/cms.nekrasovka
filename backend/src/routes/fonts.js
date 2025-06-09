const express = require("express");
const { upload } = require("../middleware/upload.js");
const { readDatabase, handleApiError } = require("../utils/fonts");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const fonts = readDatabase();
    return res.json({
      success: true,
      data: fonts,
    });
  } catch (error) {
    return handleApiError(res, error);
  }
});

module.exports = router;
