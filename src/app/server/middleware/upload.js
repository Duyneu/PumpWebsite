/**
 * Secure File Upload Middleware (Multer)
 * - Restricts file MIME types to safe images only (jpeg, png, webp)
 * - Limits file size to 5MB
 * - Sanitizes filenames to prevent path traversal
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../data/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage engine with sanitized randomized filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Sanitize base name to allow only alphanumeric characters
    const sanitizedBase = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '')
      .slice(0, 30);
    cb(null, `${sanitizedBase}-${uniqueSuffix}${ext}`);
  }
});

// Allowed MIME types and extensions
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype) || !ALLOWED_EXTENSIONS.includes(ext)) {
    const error = new Error('Định dạng tệp không được hỗ trợ. Chỉ chấp nhận ảnh JPG, PNG hoặc WebP.');
    error.status = 400;
    error.code = 'INVALID_FILE_TYPE';
    return cb(error, false);
  }

  cb(null, true);
};

const secureUpload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES, // 5MB limit
    files: 5 // Maximum 5 files per upload
  },
  fileFilter
});

module.exports = {
  secureUpload,
  uploadDir,
  MAX_FILE_SIZE_BYTES,
  ALLOWED_MIME_TYPES
};
