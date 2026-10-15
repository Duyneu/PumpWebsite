/**
 * Cache Middleware (Server-side)
 * 
 * In-memory cache cho API responses
 * Sử dụng nếu KHÔNG dùng Cloudflare Worker
 */

const NodeCache = require('node-cache');

// ============================================
// CACHE CONFIGURATION
// ============================================

const cache = new NodeCache({
  stdTTL: 300, // Default TTL: 5 minutes
  checkperiod: 60, // Check for expired keys every 60 seconds
  useClones: false, // Don't clone objects (faster)
});

// Cache TTL by route pattern
const CACHE_TTL = {
  '/api/products': 300,        // 5 minutes
  '/api/categories': 3600,     // 1 hour
  '/api/reviews': 600,         // 10 minutes
  default: 60,                 // 1 minute
};

// ============================================
// CACHE MIDDLEWARE
// ============================================

const cacheMiddleware = (req, res, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next();
  }
  
  // Don't cache auth, cart, orders
  const excludePatterns = ['/api/auth', '/api/cart', '/api/orders', '/api/users'];
  if (excludePatterns.some(pattern => req.path.startsWith(pattern))) {
    return next();
  }
  
  // Generate cache key
  const key = getCacheKey(req);
  
  // Check cache
  const cachedResponse = cache.get(key);
  
  if (cachedResponse) {
    // Cache HIT
    console.log(`🎯 Cache HIT: ${key}`);
    
    return res.json({
      ...cachedResponse,
      _cache: {
        hit: true,
        key,
        ttl: cache.getTtl(key),
      }
    });
  }
  
  // Cache MISS - override res.json to cache response
  console.log(`❌ Cache MISS: ${key}`);
  
  const originalJson = res.json.bind(res);
  
  res.json = (data) => {
    // Only cache successful responses
    if (res.statusCode === 200 && data.success !== false) {
      const ttl = getTTL(req.path);
      cache.set(key, data, ttl);
      
      console.log(`💾 Cached: ${key} (TTL: ${ttl}s)`);
    }
    
    return originalJson({
      ...data,
      _cache: {
        hit: false,
        key,
      }
    });
  };
  
  next();
};

// ============================================
// CACHE KEY GENERATOR
// ============================================

function getCacheKey(req) {
  // Include pathname and important query params
  const url = new URL(req.originalUrl, `http://${req.headers.host}`);
  
  // Sort query params for consistent keys
  const params = new URLSearchParams();
  const importantParams = ['category', 'search', 'page', 'limit', 'sort'];
  
  importantParams.forEach(param => {
    if (url.searchParams.has(param)) {
      params.set(param, url.searchParams.get(param));
    }
  });
  
  const queryString = params.toString();
  return `cache:${url.pathname}${queryString ? '?' + queryString : ''}`;
}

// ============================================
// TTL GETTER
// ============================================

function getTTL(pathname) {
  // Check exact match
  if (CACHE_TTL[pathname]) {
    return CACHE_TTL[pathname];
  }
  
  // Check pattern match
  for (const [pattern, ttl] of Object.entries(CACHE_TTL)) {
    if (pathname.startsWith(pattern)) {
      return ttl;
    }
  }
  
  return CACHE_TTL.default;
}

// ============================================
// CACHE MANAGEMENT FUNCTIONS
// ============================================

// Clear all cache
function clearCache() {
  cache.flushAll();
  console.log('🗑️  Cache cleared');
}

// Clear cache by pattern
function clearCacheByPattern(pattern) {
  const keys = cache.keys();
  const matchedKeys = keys.filter(key => key.includes(pattern));
  
  matchedKeys.forEach(key => {
    cache.del(key);
  });
  
  console.log(`🗑️  Cleared ${matchedKeys.length} cache entries matching: ${pattern}`);
}

// Get cache stats
function getCacheStats() {
  return {
    keys: cache.keys().length,
    hits: cache.getStats().hits,
    misses: cache.getStats().misses,
    ksize: cache.getStats().ksize,
    vsize: cache.getStats().vsize,
  };
}

// ============================================
// CACHE INVALIDATION ROUTES
// ============================================

const cacheInvalidationRoutes = (app) => {
  // Clear all cache
  app.post('/api/cache/clear', (req, res) => {
    clearCache();
    res.json({
      success: true,
      data: { message: 'Cache cleared successfully' }
    });
  });
  
  // Clear cache by pattern
  app.post('/api/cache/clear/:pattern', (req, res) => {
    const { pattern } = req.params;
    clearCacheByPattern(pattern);
    res.json({
      success: true,
      data: { message: `Cache cleared for pattern: ${pattern}` }
    });
  });
  
  // Get cache stats
  app.get('/api/cache/stats', (req, res) => {
    res.json({
      success: true,
      data: getCacheStats()
    });
  });
};

// ============================================
// EXPORTS
// ============================================

module.exports = {
  cacheMiddleware,
  clearCache,
  clearCacheByPattern,
  getCacheStats,
  cacheInvalidationRoutes,
  cache, // Export cache instance
};
