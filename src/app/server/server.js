/**
 * VOLTOR Vietnam - Backend API Server
 * Express + PostgreSQL
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

// Import middleware
const { cacheMiddleware, cacheInvalidationRoutes } = require('./middleware/cache');
const { generalLimiter, authLimiter, lenientLimiter } = require('./middleware/rateLimit');

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// MIDDLEWARE
// ============================================

app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(morgan('dev')); // Logging
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3002'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cache middleware (apply globally for GET requests)
app.use(cacheMiddleware);

// Rate limiting (apply globally)
app.use('/api/', generalLimiter);

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'VOLTOR API'
  });
});

// Cache management routes (admin only - add auth later)
cacheInvalidationRoutes(app);

// API Routes
app.use('/api/products', lenientLimiter, require('./routes/products'));
app.use('/api/categories', lenientLimiter, require('./routes/categories'));
app.use('/api/users', require('./routes/users'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/auth', authLimiter, require('./routes/auth'));

// ============================================
// ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found'
    }
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ========================================');
  console.log('🚀 VOLTOR Backend API Server');
  console.log('🚀 ========================================');
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Started at: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
  console.log('🚀 ========================================');
  console.log('');
  console.log('📌 Available endpoints:');
  console.log(`   GET  /health`);
  console.log(`   GET  /api/products`);
  console.log(`   GET  /api/categories`);
  console.log(`   GET  /api/users`);
  console.log(`   GET  /api/reviews`);
  console.log(`   POST /api/auth/login`);
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