/**
 * VOLTOR Vietnam - Hardened Backend API Server
 * Express + PostgreSQL + Production Security Suite
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import middleware
const { cacheMiddleware, cacheInvalidationRoutes } = require('./middleware/cache');
const { generalLimiter, authLimiter, lenientLimiter } = require('./middleware/rateLimit');

const app = express();
const PORT = process.env.PORT || 3001;
const IS_PROD = process.env.NODE_ENV === 'production';

// Trust proxy for rate limiting & secure cookie / HTTPS detection (Cloudflare / Nginx)
app.set('trust proxy', 1);

// ============================================
// 1. SECURITY & HTTPS ENFORCEMENT
// ============================================

// Enforce HTTPS behind reverse proxy in production
if (IS_PROD) {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, `https://${req.hostname}${req.originalUrl}`);
    }
    next();
  });
}

// Security headers with Helmet (HSTS, NoSniff, Frameguard, XSSFilter)
app.use(helmet({
  contentSecurityPolicy: false, // Managed via CDN/frontend for SPA flexibility
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  hsts: IS_PROD ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false
}));

// ============================================
// 2. CORS & COMPRESSION
// ============================================

const defaultAllowed = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3002'];
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : defaultAllowed;

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile clients, server-to-server) or in whitelist
    if (!origin || allowedOrigins.includes(origin) || !IS_PROD) {
      return callback(null, true);
    }
    return callback(new Error('CORS block: Tên miền không được cấp quyền truy cập API.'));
  },
  credentials: true
}));

app.use(compression());

// Logging: Dev format in development; Combined format in production
if (!IS_PROD) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    skip: (req, res) => res.statusCode < 400 // Only log 4xx/5xx in production
  }));
}

// Body parsers with payload size limits (protect against large body DoS)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Static uploads serving
app.use('/uploads', express.static(path.join(__dirname, 'data/uploads')));

// Cache middleware (apply globally for GET requests)
app.use(cacheMiddleware);

// Global general rate limiter
app.use('/api/', generalLimiter);

// ============================================
// 3. ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'VOLTOR API',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Cache management routes
cacheInvalidationRoutes(app);

// API Routes
app.use('/api/products', lenientLimiter, require('./routes/products'));
app.use('/api/categories', lenientLimiter, require('./routes/categories'));
app.use('/api/users', require('./routes/users'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));

// ============================================
// 4. ERROR HANDLERS (SANITIZED & SAFE)
// ============================================

// Centralized error handler - NEVER leaks internal SQL or stack traces in production
app.use((err, req, res, next) => {
  if (!IS_PROD) {
    console.error('❌ [DEV ERROR]', err);
  } else {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - Error:`, err.message);
  }

  const statusCode = err.status || 500;
  const isInternal = statusCode === 500;

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || (isInternal ? 'INTERNAL_SERVER_ERROR' : 'BAD_REQUEST'),
      message: (isInternal && IS_PROD)
        ? 'Đã xảy ra sự cố phía máy chủ. Vui lòng liên hệ quản trị viên.'
        : (err.message || 'Lỗi xử lý yêu cầu'),
      ...(!IS_PROD && { stack: err.stack })
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Đường dẫn API không tồn tại.'
    }
  });
});

// ============================================
// 5. START SERVER
// ============================================

const server = app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ========================================');
  console.log('🚀 VOLTOR Hardened Backend API Server');
  console.log('🚀 ========================================');
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔒 Security: Helmet, Rate-Limit, IDOR Protection, Strict CORS active`);
  console.log('🚀 ========================================');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

module.exports = app;