/**
 * Secure Upload API Route
 * Only authenticated users can upload; images are validated and stored safely.
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const { secureUpload } = require('../middleware/upload');
const { verifyToken } = require('../middleware/auth');

// POST /api/upload/single - Upload single image (requires auth)
router.post('/single', verifyToken, (req, res, next) => {
  secureUpload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(err.status || 400).json({
        success: false,
        error: {
          code: err.code || 'UPLOAD_ERROR',
          message: err.message || 'Lỗi tải tệp lên'
        }
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NO_FILE',
          message: 'Vui lòng chọn tệp ảnh để tải lên'
        }
      });
    }

    // Relative URL for serving
    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(201).json({
      success: true,
      data: {
        filename: req.file.filename,
        url: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  });
});

module.exports = router;
