/**
 * Cloudflare Worker - API Proxy với Cache & Rate Limiting
 * 
 * Chức năng:
 * - Cache API responses (Cloudflare KV)
 * - Rate limiting per IP
 * - DDoS protection
 * - Analytics
 * 
 * Deploy: wrangler publish
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  // Backend API origin
  BACKEND_URL: 'https://your-backend-api.com', // Thay bằng URL backend thật
  // hoặc: 'http://your-vps-ip:3001'
  
  // Rate limiting
  RATE_LIMIT: {
    requests: 100,        // 100 requests
    window: 60 * 1000,    // per 60 seconds
    blockDuration: 300,   // Block 5 minutes nếu vượt quá
  },
  
  // Cache TTL (seconds)
  CACHE_TTL: {
    products: 300,        // 5 minutes
    categories: 3600,     // 1 hour
    reviews: 600,         // 10 minutes
    default: 60,          // 1 minute
  },
  
  // CORS
  CORS_ORIGINS: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://voltor.com',
    'https://www.voltor.com',
  ],
};

// ============================================
// MAIN HANDLER
// ============================================

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return handleCORS(request);
  }
  
  // Health check
  if (url.pathname === '/health') {
    return jsonResponse({ status: 'OK', worker: 'Cloudflare', timestamp: Date.now() });
  }
  
  // Rate limiting check
  const rateLimitResponse = await checkRateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }
  
  // Check cache
  const cachedResponse = await getCache(request);
  if (cachedResponse) {
    return addCORSHeaders(cachedResponse, request);
  }
  
  // Forward to backend
  const backendResponse = await forwardToBackend(request);
  
  // Cache response (nếu GET và success)
  if (request.method === 'GET' && backendResponse.ok) {
    await setCache(request, backendResponse.clone());
  }
  
  return addCORSHeaders(backendResponse, request);
}

// ============================================
// RATE LIMITING
// ============================================

async function checkRateLimit(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `ratelimit:${ip}`;
  
  // Check if IP is blocked
  const blocked = await RATE_LIMIT_KV.get(`blocked:${ip}`);
  if (blocked) {
    return jsonResponse(
      {
        success: false,
        error: {
          message: 'Too many requests. Please try again later.',
          retryAfter: CONFIG.RATE_LIMIT.blockDuration,
        }
      },
      429,
      { 'Retry-After': CONFIG.RATE_LIMIT.blockDuration }
    );
  }
  
  // Get current request count
  const data = await RATE_LIMIT_KV.get(key, { type: 'json' });
  const now = Date.now();
  
  if (!data) {
    // First request
    await RATE_LIMIT_KV.put(key, JSON.stringify({
      count: 1,
      resetTime: now + CONFIG.RATE_LIMIT.window,
    }), { expirationTtl: Math.ceil(CONFIG.RATE_LIMIT.window / 1000) });
    
    return null;
  }
  
  // Check if window expired
  if (now > data.resetTime) {
    // Reset window
    await RATE_LIMIT_KV.put(key, JSON.stringify({
      count: 1,
      resetTime: now + CONFIG.RATE_LIMIT.window,
    }), { expirationTtl: Math.ceil(CONFIG.RATE_LIMIT.window / 1000) });
    
    return null;
  }
  
  // Check if limit exceeded
  if (data.count >= CONFIG.RATE_LIMIT.requests) {
    // Block IP
    await RATE_LIMIT_KV.put(
      `blocked:${ip}`,
      'blocked',
      { expirationTtl: CONFIG.RATE_LIMIT.blockDuration }
    );
    
    return jsonResponse(
      {
        success: false,
        error: {
          message: 'Rate limit exceeded. IP blocked temporarily.',
          retryAfter: CONFIG.RATE_LIMIT.blockDuration,
        }
      },
      429,
      { 'Retry-After': CONFIG.RATE_LIMIT.blockDuration }
    );
  }
  
  // Increment count
  await RATE_LIMIT_KV.put(key, JSON.stringify({
    count: data.count + 1,
    resetTime: data.resetTime,
  }), { expirationTtl: Math.ceil((data.resetTime - now) / 1000) });
  
  return null;
}

// ============================================
// CACHE MANAGEMENT
// ============================================

async function getCache(request) {
  if (request.method !== 'GET') return null;
  
  const cacheKey = getCacheKey(request);
  const cached = await CACHE_KV.get(cacheKey, { type: 'json' });
  
  if (!cached) return null;
  
  // Check if expired
  if (Date.now() > cached.expiresAt) {
    await CACHE_KV.delete(cacheKey);
    return null;
  }
  
  // Return cached response
  const response = new Response(JSON.stringify(cached.data), {
    status: cached.status,
    headers: {
      'Content-Type': 'application/json',
      'X-Cache': 'HIT',
      'X-Cache-Expires': new Date(cached.expiresAt).toISOString(),
    }
  });
  
  return response;
}

async function setCache(request, response) {
  const url = new URL(request.url);
  const ttl = getCacheTTL(url.pathname);
  
  if (ttl === 0) return; // Don't cache
  
  try {
    const data = await response.json();
    const cacheKey = getCacheKey(request);
    
    await CACHE_KV.put(cacheKey, JSON.stringify({
      data,
      status: response.status,
      expiresAt: Date.now() + (ttl * 1000),
      cachedAt: Date.now(),
    }), {
      expirationTtl: ttl,
    });
  } catch (e) {
    // Ignore cache errors
    console.error('Cache error:', e);
  }
}

function getCacheKey(request) {
  const url = new URL(request.url);
  return `cache:${url.pathname}${url.search}`;
}

function getCacheTTL(pathname) {
  if (pathname.includes('/products')) return CONFIG.CACHE_TTL.products;
  if (pathname.includes('/categories')) return CONFIG.CACHE_TTL.categories;
  if (pathname.includes('/reviews')) return CONFIG.CACHE_TTL.reviews;
  
  // Don't cache auth, cart, orders
  if (pathname.includes('/auth')) return 0;
  if (pathname.includes('/cart')) return 0;
  if (pathname.includes('/orders')) return 0;
  
  return CONFIG.CACHE_TTL.default;
}

// ============================================
// BACKEND FORWARDING
// ============================================

async function forwardToBackend(request) {
  const url = new URL(request.url);
  
  // Build backend URL
  const backendUrl = `${CONFIG.BACKEND_URL}${url.pathname}${url.search}`;
  
  // Clone request
  const modifiedRequest = new Request(backendUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' 
      ? await request.clone().arrayBuffer() 
      : null,
  });
  
  try {
    const response = await fetch(modifiedRequest);
    
    // Add cache status header
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers),
        'X-Cache': 'MISS',
      }
    });
    
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        error: {
          message: 'Backend server unavailable',
          details: error.message,
        }
      },
      502
    );
  }
}

// ============================================
// CORS HANDLING
// ============================================

function handleCORS(request) {
  const origin = request.headers.get('Origin');
  
  if (CONFIG.CORS_ORIGINS.includes(origin)) {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      }
    });
  }
  
  return new Response('Forbidden', { status: 403 });
}

function addCORSHeaders(response, request) {
  const origin = request.headers.get('Origin');
  
  if (CONFIG.CORS_ORIGINS.includes(origin)) {
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }
  
  return response;
}

// ============================================
// UTILITIES
// ============================================

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    }
  });
}

// ============================================
// ANALYTICS (Optional)
// ============================================

async function logRequest(request, response) {
  // Log to Cloudflare Analytics hoặc external service
  const data = {
    timestamp: Date.now(),
    method: request.method,
    path: new URL(request.url).pathname,
    status: response.status,
    ip: request.headers.get('CF-Connecting-IP'),
    userAgent: request.headers.get('User-Agent'),
  };
  
  // Store in KV hoặc send to analytics service
  // await ANALYTICS_KV.put(`log:${Date.now()}`, JSON.stringify(data));
}
