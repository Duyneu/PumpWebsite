/**
 * Rate Limiting Middleware (Server-side backup)
 * 
 * Sử dụng nếu KHÔNG dùng Cloudflare Worker
 * Hoặc làm layer bảo vệ thứ 2
 */

const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
// const redis = require('redis');

// ============================================
// SIMPLE IN-MEMORY RATE LIMITER
// ============================================

const createRateLimiter = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs || 60 * 1000, // 1 minute
    max: options.max || 100, // 100 requests per windowMs
    message: {
      success: false,
      error: {
        message: 'Too many requests from this IP, please try again later.',
        retryAfter: Math.ceil((options.windowMs || 60000) / 1000),
      }
    },
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    
    // Custom key generator (sử dụng IP)
    keyGenerator: (req) => {
      return req.ip || req.connection.remoteAddress;
    },
    
    // Skip successful requests (optional)
    skip: (req) => {
      // Skip OPTIONS requests
      return req.method === 'OPTIONS';
    },
    
    // Handler khi vượt quá limit
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        error: {
          message: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((options.windowMs || 60000) / 1000),
        }
      });
    },
  });
};

// ============================================
// REDIS-BASED RATE LIMITER (Recommended for production)
// ============================================

const createRedisRateLimiter = (options = {}) => {
  // Uncomment khi setup Redis
  /*
  const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
  });

  return rateLimit({
    store: new RedisStore({
      client: redisClient,
      prefix: 'rl:', // Rate limit prefix
    }),
    windowMs: options.windowMs || 60 * 1000,
    max: options.max || 100,
    message: {
      success: false,
      error: {
        message: 'Too many requests from this IP, please try again later.',
      }
    },
  });
  */
  
  // Fallback to memory store nếu chưa có Redis
  return createRateLimiter(options);
};

// ============================================
// PRESET RATE LIMITERS
// ============================================

// General API - 100 requests/minute
const generalLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 100,
});

// Strict API (Auth, Payment) - 10 requests/minute
const strictLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 10,
});

// Lenient API (Public data) - 200 requests/minute
const lenientLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 200,
});

// Auth endpoints - 5 attempts/15 minutes
const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: {
      message: 'Too many login attempts. Please try again after 15 minutes.',
      retryAfter: 15 * 60,
    }
  },
});

// ============================================
// IP WHITELIST
// ============================================

const whitelist = [
  '127.0.0.1',
  '::1',
  // Add trusted IPs here
];

const skipWhitelist = (req) => {
  const ip = req.ip || req.connection.remoteAddress;
  return whitelist.includes(ip);
};

// ============================================
// EXPORTS
// ============================================

module.exports = {
  createRateLimiter,
  createRedisRateLimiter,
  generalLimiter,
  strictLimiter,
  lenientLimiter,
  authLimiter,
  skipWhitelist,
};
