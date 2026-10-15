# ☁️ Cloudflare Workers - API Proxy Setup

Hướng dẫn deploy Cloudflare Worker làm proxy layer cho VOLTOR API với **caching** + **rate limiting** + **DDoS protection**.

---

## 🎯 Tại sao cần Cloudflare Worker?

### ❌ **Vấn đề khi không có:**
```
User → Backend API (MySQL)
  ↓
- Mọi request đều hit MySQL
- Dễ bị spam/DDoS
- Overload khi traffic cao
- Slow response time
- Chi phí server cao
```

### ✅ **Với Cloudflare Worker:**
```
User → Cloudflare Worker (Cache + Rate Limit)
       ↓ (chỉ khi cache miss)
       Backend API (MySQL)
  
- Cache responses → Fast
- Rate limiting → Anti-spam
- DDoS protection
- Global CDN (200+ locations)
- FREE 100,000 requests/day
```

---

## 🚀 Setup Guide

### Bước 1: Tạo Cloudflare Account

1. **Đăng ký:** https://dash.cloudflare.com/sign-up
   - Email
   - Password
   - Verify email

2. **Free Plan:** Chọn "Free" plan (đủ dùng!)

---

### Bước 2: Install Wrangler CLI

Wrangler = Tool để deploy Cloudflare Workers

```bash
# Install globally
npm install -g wrangler

# Check version
wrangler --version

# Login to Cloudflare
wrangler login
# → Mở browser → Login → Authorize
```

---

### Bước 3: Tạo KV Namespaces (Storage)

KV = Key-Value storage cho cache và rate limiting

```bash
# 1. Cache KV
wrangler kv:namespace create "CACHE_KV"
# Output: 
# { binding = "CACHE_KV", id = "abc123..." }

# 2. Cache KV Preview (for testing)
wrangler kv:namespace create "CACHE_KV" --preview
# Output:
# { binding = "CACHE_KV", preview_id = "xyz789..." }

# 3. Rate Limit KV
wrangler kv:namespace create "RATE_LIMIT_KV"
# Output:
# { binding = "RATE_LIMIT_KV", id = "def456..." }

# 4. Rate Limit KV Preview
wrangler kv:namespace create "RATE_LIMIT_KV" --preview
# Output:
# { binding = "RATE_LIMIT_KV", preview_id = "uvw012..." }
```

**Copy các IDs này! Cần dùng ở bước sau.**

---

### Bước 4: Cấu hình wrangler.toml

Mở file `/cloudflare/wrangler.toml` và update:

```toml
# Account ID
account_id = "YOUR_ACCOUNT_ID"
# Lấy từ: https://dash.cloudflare.com/ → Right sidebar → Account ID

# KV Namespaces
[[kv_namespaces]]
binding = "CACHE_KV"
id = "abc123..."              # Thay bằng ID từ bước 3
preview_id = "xyz789..."      # Thay bằng preview ID từ bước 3

[[kv_namespaces]]
binding = "RATE_LIMIT_KV"
id = "def456..."              # Thay bằng ID từ bước 3
preview_id = "uvw012..."      # Thay bằng preview ID từ bước 3
```

---

### Bước 5: Cấu hình Backend URL

Mở file `/cloudflare/worker.js` và update:

```javascript
const CONFIG = {
  // Thay bằng URL backend thật của bạn:
  BACKEND_URL: 'https://api.voltor.com',
  // Hoặc VPS: 'http://123.45.67.89:3001'
  // Hoặc localhost (chỉ test): 'http://localhost:3001'
  
  // Thêm domain frontend vào CORS:
  CORS_ORIGINS: [
    'http://localhost:5173',      // Local dev
    'https://voltor.com',         // Production
    'https://www.voltor.com',     // Production www
  ],
};
```

---

### Bước 6: Deploy Worker

```bash
# Vào thư mục cloudflare
cd cloudflare

# Deploy!
wrangler publish

# Hoặc deploy với tên khác:
# wrangler publish --name voltor-api-prod
```

**Output:**
```
✨ Built successfully!
✨ Uploaded successfully!
✨ Deployed to Cloudflare Workers!

🌍 Worker URL: https://voltor-api-proxy.YOUR-SUBDOMAIN.workers.dev
```

**Copy URL này!** Đây là API endpoint mới của bạn.

---

### Bước 7: Test Worker

```bash
# Health check
curl https://voltor-api-proxy.YOUR-SUBDOMAIN.workers.dev/health

# Expected output:
# {"status":"OK","worker":"Cloudflare","timestamp":1704556800000}

# Test products API
curl https://voltor-api-proxy.YOUR-SUBDOMAIN.workers.dev/api/products

# Check cache header
curl -I https://voltor-api-proxy.YOUR-SUBDOMAIN.workers.dev/api/products
# Look for: X-Cache: MISS (first time) or HIT (cached)
```

---

### Bước 8: Update Frontend

Thay đổi API URL trong frontend:

**Before:**
```typescript
const API_URL = 'http://localhost:3001/api';
```

**After:**
```typescript
const API_URL = 'https://voltor-api-proxy.YOUR-SUBDOMAIN.workers.dev/api';
```

**Hoặc trong `/config/database.ts`:**
```typescript
export const API_BASE_URL = 'https://voltor-api-proxy.YOUR-SUBDOMAIN.workers.dev/api';
```

---

### Bước 9: Test End-to-End

```bash
# 1. Start frontend
npm run dev

# 2. Open browser
http://localhost:5173

# 3. Check Network tab
# → Requests go to Cloudflare Worker
# → First request: X-Cache: MISS
# → Second request: X-Cache: HIT (cached!)

# 4. Test rate limiting
# → Open console
for (let i = 0; i < 110; i++) {
  fetch('https://voltor-api-proxy.YOUR-SUBDOMAIN.workers.dev/api/products');
}
# → After 100 requests → 429 Too Many Requests
```

---

## 📊 Caching Strategy

### Cache TTL (Time-To-Live):

```javascript
products:    300s  (5 minutes)   - Thường xuyên update
categories:  3600s (1 hour)      - Ít thay đổi
reviews:     600s  (10 minutes)  - Trung bình
default:     60s   (1 minute)    - Safe default
```

### Không cache:
- ❌ `/api/auth/*` - Authentication (luôn fresh)
- ❌ `/api/cart/*` - Cart (user-specific)
- ❌ `/api/orders/*` - Orders (private data)

### Cache flow:
```
1. Request GET /api/products
   ↓
2. Check Cloudflare KV cache
   ↓
3. Cache HIT? → Return cached response (fast!)
   ↓
4. Cache MISS? → Forward to backend
   ↓
5. Store response in cache
   ↓
6. Return response
```

---

## 🛡️ Rate Limiting

### Default limits:
```
100 requests per 60 seconds per IP
```

### Behavior:
```
Requests 1-100:  ✅ OK
Request 101:     ❌ 429 Too Many Requests
                 🔒 IP blocked for 5 minutes
After 5 min:     ✅ OK again
```

### Response khi bị block:
```json
{
  "success": false,
  "error": {
    "message": "Rate limit exceeded. IP blocked temporarily.",
    "retryAfter": 300
  }
}
```

### Customize limits:

Sửa trong `/cloudflare/worker.js`:

```javascript
RATE_LIMIT: {
  requests: 200,        // 200 requests (thay vì 100)
  window: 60 * 1000,    // per 60 seconds
  blockDuration: 600,   // Block 10 minutes (thay vì 5)
},
```

---

## 🌐 Custom Domain (Optional)

Thay vì `voltor-api-proxy.workers.dev`, dùng domain đẹp hơn: `api.voltor.com`

### Bước 1: Add domain vào Cloudflare

```
1. Cloudflare Dashboard → Add Site
2. Enter domain: voltor.com
3. Follow DNS setup instructions
4. Update nameservers tại registrar (GoDaddy, Namecheap, etc.)
5. Wait for activation (5-10 minutes)
```

### Bước 2: Add Worker Route

```
1. Dashboard → Workers & Pages → voltor-api-proxy
2. Settings → Triggers → Routes → Add Route
3. Route: api.voltor.com/*
4. Zone: voltor.com
5. Save
```

### Bước 3: Update worker config

Sửa `/cloudflare/wrangler.toml`:

```toml
routes = [
  { pattern = "api.voltor.com/*", zone_name = "voltor.com" }
]
```

### Bước 4: Deploy lại

```bash
wrangler publish
```

### Bước 5: Update frontend

```typescript
const API_URL = 'https://api.voltor.com/api';
```

**Done!** Giờ API của bạn có URL đẹp: `https://api.voltor.com` ✨

---

## 📈 Monitoring & Analytics

### View Worker Stats:

```
Cloudflare Dashboard → Workers & Pages → voltor-api-proxy → Metrics
```

**Metrics:**
- ✅ Total requests
- ✅ Errors
- ✅ CPU time
- ✅ Success rate
- ✅ Cache hit ratio

### View Logs (Real-time):

```bash
wrangler tail
```

Output:
```
[2024-01-05 10:30:15] GET /api/products → 200 (15ms) [CACHE: HIT]
[2024-01-05 10:30:20] GET /api/categories → 200 (8ms) [CACHE: HIT]
[2024-01-05 10:30:25] POST /api/reviews → 201 (120ms) [CACHE: MISS]
```

---

## 🔧 Advanced Configuration

### 1. Adjust Cache TTL

Sửa trong `/cloudflare/worker.js`:

```javascript
CACHE_TTL: {
  products: 600,        // 10 minutes (thay vì 5)
  categories: 7200,     // 2 hours (thay vì 1)
  reviews: 300,         // 5 minutes (thay vì 10)
  default: 120,         // 2 minutes (thay vì 1)
},
```

### 2. IP Whitelist (Không rate limit)

```javascript
async function checkRateLimit(request) {
  const ip = request.headers.get('CF-Connecting-IP');
  
  // Whitelist
  const whitelist = ['123.45.67.89', '98.76.54.32'];
  if (whitelist.includes(ip)) {
    return null; // Bypass rate limit
  }
  
  // ... rest of code
}
```

### 3. Custom Cache Keys (Query params)

```javascript
function getCacheKey(request) {
  const url = new URL(request.url);
  
  // Include specific query params in cache key
  const params = new URLSearchParams();
  params.set('category', url.searchParams.get('category') || '');
  params.set('page', url.searchParams.get('page') || '1');
  
  return `cache:${url.pathname}?${params.toString()}`;
}
```

### 4. Purge Cache (Manual)

```bash
# Purge all cache
wrangler kv:key list --namespace-id=YOUR_CACHE_KV_ID | \
  jq -r '.[].name' | \
  xargs -I {} wrangler kv:key delete "{}" --namespace-id=YOUR_CACHE_KV_ID

# Purge specific key
wrangler kv:key delete "cache:/api/products" --namespace-id=YOUR_CACHE_KV_ID
```

---

## 💰 Pricing

### Cloudflare Workers Free Plan:

```
✅ 100,000 requests/day  (FREE)
✅ 10ms CPU time/request
✅ KV: 100,000 reads/day
✅ KV: 1,000 writes/day
✅ KV: 1 GB storage

Ví dụ:
- 10 users × 100 requests/day = 1,000 requests → FREE ✅
- 100 users × 100 requests/day = 10,000 requests → FREE ✅
- 1,000 users × 100 requests/day = 100,000 requests → FREE ✅
```

### Paid Plan (nếu cần):

```
$5/month:
- 10 million requests/month
- 50ms CPU time/request
- Unlimited KV reads/writes
```

**→ Free plan ĐỦ cho website nhỏ/trung!**

---

## ❌ Troubleshooting

### Problem 1: "Error: No account_id found"

```bash
# Check wrangler.toml → account_id
# Get từ: https://dash.cloudflare.com/ (right sidebar)
```

### Problem 2: "KV namespace not found"

```bash
# List KV namespaces
wrangler kv:namespace list

# Recreate if needed
wrangler kv:namespace create "CACHE_KV"
```

### Problem 3: "Backend server unavailable"

```bash
# Check BACKEND_URL trong worker.js
# Ensure backend server đang chạy
curl https://your-backend-api.com/health
```

### Problem 4: CORS errors

```bash
# Add domain vào CORS_ORIGINS trong worker.js
CORS_ORIGINS: [
  'https://your-frontend-domain.com',
],

# Redeploy
wrangler publish
```

### Problem 5: Cache không work

```bash
# Check X-Cache header
curl -I https://worker-url/api/products

# Clear cache
wrangler kv:key list --namespace-id=XXX
# Delete all keys starting with "cache:"
```

---

## 🔄 Update & Redeploy

Khi thay đổi code:

```bash
# 1. Edit worker.js
nano /cloudflare/worker.js

# 2. Deploy
cd cloudflare
wrangler publish

# 3. Test
curl https://worker-url/health

# 4. Done!
```

---

## 📊 Performance Comparison

### Without Cloudflare:
```
Request → Backend (Vietnam) → MySQL
Response time: 200-500ms
Cache: None
Rate limit: None
DDoS protection: None
```

### With Cloudflare:
```
Request → Cloudflare Edge (nearest location) → Cache check
         ↓ (cache miss)
         Backend → MySQL

Response time: 10-50ms (cached) or 200-500ms (miss)
Cache: ✅ 5min-1hr
Rate limit: ✅ 100 req/min
DDoS protection: ✅ Automatic
Global CDN: ✅ 200+ locations
```

**Speed improvement: 5-10x faster!** 🚀

---

## ✅ Checklist

```
□ Cloudflare account created
□ Wrangler CLI installed
□ Logged in: wrangler login
□ KV namespaces created (CACHE_KV, RATE_LIMIT_KV)
□ wrangler.toml configured (account_id, KV IDs)
□ worker.js configured (BACKEND_URL, CORS_ORIGINS)
□ Deployed: wrangler publish
□ Tested: curl worker-url/health
□ Frontend updated to use worker URL
□ End-to-end test passed
□ Monitoring setup (optional)
```

---

## 🎯 Summary

**Đã tạo:**
- ✅ Cloudflare Worker proxy
- ✅ Intelligent caching (KV storage)
- ✅ Rate limiting per IP
- ✅ DDoS protection
- ✅ CORS handling
- ✅ Global CDN

**Benefits:**
- 🚀 5-10x faster responses (cache)
- 🛡️ Anti-spam/DDoS
- 💰 Free 100k requests/day
- 🌍 Global edge network
- 📊 Built-in analytics

**Next steps:**
1. ⚡ Deploy worker → 5 phút
2. 🧪 Test → 2 phút
3. 🔗 Update frontend → 1 phút
4. ✅ Done! → Enjoy fast & protected API!

---

**Perfect! Giờ API của bạn có lớp bảo vệ mạnh mẽ từ Cloudflare! 🎉☁️**
