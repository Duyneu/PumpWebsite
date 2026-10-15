# ☁️ Cloudflare Protection - Quick Start Guide

Hướng dẫn nhanh setup Cloudflare để bảo vệ API khỏi spam/DDoS.

---

## 🎯 2 Options

### Option 1: Cloudflare Workers (Recommended) ⭐
**Pros:**
- ✅ Global CDN (200+ locations)
- ✅ Cache responses (5-10x faster)
- ✅ Rate limiting per IP
- ✅ FREE 100k requests/day
- ✅ No code change on backend

**Cons:**
- ❌ Cần setup Cloudflare account (5 phút)
- ❌ Cần deploy worker (2 phút)

**→ Đọc `/cloudflare/SETUP.md` để setup**

---

### Option 2: Express Middleware (Simpler) 🚀
**Pros:**
- ✅ Không cần Cloudflare
- ✅ Setup ngay trong Express
- ✅ In-memory cache
- ✅ Rate limiting

**Cons:**
- ❌ Chỉ protect 1 server (không global)
- ❌ Cache mất khi restart
- ❌ Dùng RAM của server

**→ ĐÃ SETUP SẴN trong `/server/middleware/`**

---

## ⚡ Quick Setup: Express Middleware

### Bước 1: Install dependencies

```bash
cd server
npm install
```

**Đã có trong package.json:**
- `express-rate-limit` - Rate limiting
- `node-cache` - In-memory cache

---

### Bước 2: Server đã được cấu hình sẵn!

File `/server/server.js` đã có:

```javascript
// ✅ Cache middleware
app.use(cacheMiddleware);

// ✅ Rate limiting
app.use('/api/', generalLimiter);

// ✅ Specific rate limits
app.use('/api/products', lenientLimiter);    // 200 req/min
app.use('/api/auth', authLimiter);            // 5 req/15min
```

---

### Bước 3: Chạy server

```bash
npm run dev
```

**Done!** API đã được bảo vệ! 🎉

---

## 🧪 Test Protection

### Test 1: Cache

```bash
# Request lần 1 (cache MISS)
curl http://localhost:3001/api/products
# Response có: "_cache": { "hit": false }

# Request lần 2 (cache HIT)
curl http://localhost:3001/api/products
# Response có: "_cache": { "hit": true }
# → Nhanh hơn nhiều!
```

---

### Test 2: Rate Limiting

```bash
# Spam 110 requests
for i in {1..110}; do
  curl http://localhost:3001/api/products
done

# After request 100 → 429 Too Many Requests
# {
#   "success": false,
#   "error": {
#     "message": "Too many requests. Please try again later.",
#     "retryAfter": 60
#   }
# }
```

---

## 📊 Cache Management

### Get cache stats:

```bash
curl http://localhost:3001/api/cache/stats

# Response:
# {
#   "success": true,
#   "data": {
#     "keys": 15,
#     "hits": 120,
#     "misses": 30,
#     "ksize": 1024,
#     "vsize": 45678
#   }
# }
```

### Clear all cache:

```bash
curl -X POST http://localhost:3001/api/cache/clear

# Response:
# {
#   "success": true,
#   "data": { "message": "Cache cleared successfully" }
# }
```

### Clear cache by pattern:

```bash
# Clear all product cache
curl -X POST http://localhost:3001/api/cache/clear/products

# Clear all category cache
curl -X POST http://localhost:3001/api/cache/clear/categories
```

---

## ⚙️ Configuration

### Adjust Cache TTL:

Sửa `/server/middleware/cache.js`:

```javascript
const CACHE_TTL = {
  '/api/products': 600,        // 10 minutes (thay vì 5)
  '/api/categories': 7200,     // 2 hours (thay vì 1)
  '/api/reviews': 300,         // 5 minutes (thay vì 10)
  default: 120,                // 2 minutes (thay vì 1)
};
```

### Adjust Rate Limits:

Sửa `/server/middleware/rateLimit.js`:

```javascript
// General API - 200 requests/minute (thay vì 100)
const generalLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 200,
});

// Auth - 10 attempts/15 minutes (thay vì 5)
const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
});
```

### Whitelist IPs:

Sửa `/server/middleware/rateLimit.js`:

```javascript
const whitelist = [
  '127.0.0.1',
  '::1',
  '123.45.67.89',    // Add trusted IP
  '98.76.54.32',     // Add another IP
];
```

---

## 🔄 When to Use Which?

### Use Express Middleware when:
- ✅ Đơn giản, quick setup
- ✅ 1 server, traffic thấp-trung bình
- ✅ Chưa có domain/DNS
- ✅ Test/development

### Use Cloudflare Workers when:
- ✅ Production website
- ✅ Traffic cao
- ✅ Cần global CDN
- ✅ Cần cache lâu dài (không mất khi restart)
- ✅ Có domain

### Use Both (Best!) when:
- ✅ Production + high security
- ✅ 2 layers protection:
  ```
  User → Cloudflare (cache + rate limit)
       → Express (cache + rate limit)
       → MySQL
  ```

---

## 📈 Performance Comparison

### Without Protection:
```
Request → Backend → MySQL
Response time: 200-500ms
Cache: None ❌
Rate limit: None ❌
Anti-DDoS: None ❌
```

### With Express Middleware:
```
Request → Cache check → Backend → MySQL
Response time: 10-50ms (cached) or 200-500ms (miss)
Cache: ✅ In-memory
Rate limit: ✅ 100 req/min
Anti-DDoS: ✅ Basic
```

### With Cloudflare Workers:
```
Request → Cloudflare Edge → Cache → Backend → MySQL
Response time: 5-30ms (global CDN)
Cache: ✅ Global KV
Rate limit: ✅ Per IP
Anti-DDoS: ✅ Advanced
Global: ✅ 200+ locations
```

---

## ✅ Current Setup Status

**Express Server:**
```
✅ Cache middleware installed
✅ Rate limiting installed
✅ Auto-configured
✅ Ready to use
```

**Cloudflare Workers:**
```
□ Need to setup (optional)
□ See /cloudflare/SETUP.md
□ Takes 10-15 minutes
□ FREE tier available
```

---

## 🎯 Next Steps

### Option A: Use current setup (Express only)
```bash
1. cd server
2. npm install
3. npm run dev
4. ✅ Done! Protection active!
```

### Option B: Add Cloudflare (Extra protection)
```bash
1. Read /cloudflare/SETUP.md
2. Create Cloudflare account
3. Deploy worker
4. Update frontend API URL
5. ✅ Done! Double protection!
```

---

## 📞 Support

**Issues?**
- Check `/server/README.md`
- Check `/cloudflare/SETUP.md`
- Email: voltorvietnam@gmail.com

---

**Happy Protecting! 🛡️✨**
