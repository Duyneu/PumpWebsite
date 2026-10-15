# 🏗️ VOLTOR Vietnam - System Architecture

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER / BROWSER                          │
│                   (http://localhost:5173)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
        ┌────────────────────────────────────────┐
        │         2 OPTIONS (Choose one)         │
        └────────┬───────────────────────┬────────┘
                 │                       │
      ┌──────────▼──────────┐ ┌─────────▼──────────┐
      │   OPTION 1 (Simple) │ │ OPTION 2 (Advanced)│
      │                     │ │                     │
      │  Express Middleware │ │ Cloudflare Workers  │
      │  • Cache (Memory)   │ │ • Cache (KV Store)  │
      │  • Rate Limit       │ │ • Rate Limit        │
      │  • Same server      │ │ • Global CDN        │
      └──────────┬──────────┘ └─────────┬──────────┘
                 │                       │
                 └───────────┬───────────┘
                             │
                             ▼
              ┌──────────────────────────┐
              │   Backend API (Express)  │
              │   http://localhost:3001  │
              │                          │
              │  Routes:                 │
              │  • /api/products         │
              │  • /api/categories       │
              │  • /api/users            │
              │  • /api/reviews          │
              │  • /api/orders           │
              │  • /api/cart             │
              │  • /api/auth             │
              └──────────┬───────────────┘
                         │
                         ▼
              ┌──────────────────────────┐
              │   MySQL Database         │
              │   Database: voltor_db    │
              │                          │
              │  Tables:                 │
              │  • users                 │
              │  • products              │
              │  • categories            │
              │  • reviews               │
              │  • orders                │
              │  • order_items           │
              │  • cart_items            │
              └──────────────────────────┘
```

---

## 🔄 Request Flow

### Flow 1: Simple (Express Only)

```
1. User Request
   GET /api/products
   ↓
   
2. Express Server (localhost:3001)
   ├─ Cache Check (Memory)
   │  ├─ HIT? → Return cached (10-50ms) ✅
   │  └─ MISS? → Continue ↓
   │
   ├─ Rate Limit Check
   │  ├─ OK? → Continue ↓
   │  └─ Exceeded? → 429 Error ❌
   │
   ├─ MySQL Query
   │  └─ SELECT * FROM products (100-300ms)
   │
   ├─ Store in Cache (5min TTL)
   │
   └─ Return Response
   
3. User receives data
```

---

### Flow 2: Advanced (Cloudflare + Express)

```
1. User Request
   GET https://api.voltor.com/api/products
   ↓
   
2. Cloudflare Worker (Edge - Nearest location)
   ├─ Rate Limit Check (KV)
   │  ├─ OK? → Continue ↓
   │  └─ Exceeded? → 429 Error ❌
   │
   ├─ Cache Check (Cloudflare KV)
   │  ├─ HIT? → Return cached (5-30ms) ✅ FASTEST!
   │  └─ MISS? → Continue ↓
   │
   └─ Forward to Backend ↓
   
3. Express Server (Backend)
   ├─ Cache Check (Memory)
   │  ├─ HIT? → Return (10-50ms) ✅
   │  └─ MISS? → Continue ↓
   │
   ├─ Rate Limit Check (Backup)
   │
   ├─ MySQL Query (100-300ms)
   │
   ├─ Store in Local Cache
   │
   └─ Return to Cloudflare ↓
   
4. Cloudflare Worker
   ├─ Store in KV Cache (5min TTL)
   │
   └─ Return to User ↓
   
5. User receives data
```

---

## 🛡️ Protection Layers

### Layer 1: Cloudflare (Optional)
```
┌────────────────────────────────────┐
│  Cloudflare Edge Network           │
│  ────────────────────────          │
│  ✓ DDoS Protection (Automatic)     │
│  ✓ Rate Limiting (100 req/min/IP) │
│  ✓ Cache (KV Store, 5min-1hr)     │
│  ✓ Global CDN (200+ locations)    │
│  ✓ SSL/TLS                         │
│  ✓ Bot Protection                  │
└────────────────────────────────────┘
```

### Layer 2: Express Middleware
```
┌────────────────────────────────────┐
│  Express Server                    │
│  ───────────────                   │
│  ✓ Rate Limiting (Backup)          │
│  ✓ Cache (In-memory)               │
│  ✓ Input Validation                │
│  ✓ SQL Injection Protection        │
│  ✓ CORS                            │
│  ✓ Helmet (Security headers)       │
└────────────────────────────────────┘
```

### Layer 3: MySQL
```
┌────────────────────────────────────┐
│  Database Security                 │
│  ─────────────────                 │
│  ✓ Prepared Statements             │
│  ✓ Parameterized Queries           │
│  ✓ User Permissions                │
│  ✓ Encrypted Connections           │
└────────────────────────────────────┘
```

---

## ⚡ Performance Metrics

### Without Protection/Cache:
```
Request → MySQL
─────────────────
Time:      200-500ms
Load:      High (every request hits DB)
Security:  ❌ No rate limiting
Scale:     ❌ Limited by MySQL
Cost:      💰 High server usage
```

### With Express Cache + Rate Limit:
```
Request → Cache → MySQL (if miss)
──────────────────────────────────
Time:      10-50ms (cached) / 200-500ms (miss)
Load:      Medium (cache reduces DB hits)
Security:  ✅ Basic rate limiting
Scale:     ✅ Better (cache helps)
Cost:      💰 Medium
```

### With Cloudflare + Express:
```
Request → CF Edge → CF Cache → Express → MySQL
────────────────────────────────────────────────
Time:      5-30ms (global CDN + cache)
Load:      Low (multi-layer cache)
Security:  ✅✅ Double protection
Scale:     ✅✅ High (global CDN)
Cost:      💰 Low (Cloudflare free tier)
```

---

## 📊 Cache Strategy

### Cache Hierarchy:

```
Level 1: Browser Cache (Client)
├─ TTL: As per Cache-Control headers
└─ Scope: Single user

Level 2: Cloudflare KV (Global)
├─ TTL: 5min - 1hr (configurable)
└─ Scope: All users globally

Level 3: Express Memory (Server)
├─ TTL: 1min - 1hr (configurable)
└─ Scope: All users on server

Level 4: MySQL (Database)
└─ Source of truth
```

### Cache TTL by Endpoint:

```
/api/products       → 5 minutes  (medium change frequency)
/api/categories     → 1 hour     (rarely changes)
/api/reviews        → 10 minutes (moderate change)

/api/auth/*         → No cache   (always fresh)
/api/cart/*         → No cache   (user-specific)
/api/orders/*       → No cache   (private data)
```

---

## 🔐 Security Features

### 1. Rate Limiting
```javascript
// Per IP
General API:  100 requests / 60 seconds
Auth API:     5 attempts / 15 minutes
Public API:   200 requests / 60 seconds

// Penalty
Exceed limit → 429 Error
             → IP blocked 5 minutes
```

### 2. Input Validation
```javascript
// Express validator
- SQL injection protection
- XSS protection
- Type validation
- Length validation
```

### 3. Authentication
```javascript
// JWT-based
- Bcrypt password hashing (10 rounds)
- Token expiry (7 days)
- OAuth support (Google, Facebook, LinkedIn)
```

### 4. CORS
```javascript
// Whitelist origins
Allowed:
- http://localhost:5173
- http://localhost:3000
- https://voltor.com
- https://www.voltor.com
```

---

## 📈 Scalability

### Horizontal Scaling (Multiple servers):

```
                ┌──── Express Server 1 ────┐
                │                           │
User → Cloudflare ├──── Express Server 2 ────┤ → MySQL
                │                           │  (Master)
                └──── Express Server 3 ────┘
                                              │
                                              ├─ MySQL Slave 1
                                              └─ MySQL Slave 2
```

### Vertical Scaling (Bigger server):

```
Single Server:
├─ More RAM → Better cache
├─ More CPU → More concurrent requests
└─ SSD → Faster MySQL queries
```

---

## 🔧 Configuration Files

### Backend:
```
/server/
├── server.js                     # Main server
├── db.js                         # MySQL connection
├── .env                          # Config
├── middleware/
│   ├── cache.js                  # Cache layer
│   └── rateLimit.js              # Rate limiting
└── routes/
    ├── products.js
    ├── categories.js
    ├── users.js
    ├── reviews.js
    ├── orders.js
    ├── cart.js
    └── auth.js
```

### Cloudflare:
```
/cloudflare/
├── worker.js                     # Worker script
├── wrangler.toml                 # Config
└── SETUP.md                      # Guide
```

### Database:
```
/database/
├── schema.sql                    # Tables structure
└── seed.sql                      # Sample data
```

---

## 🎯 Deployment Options

### Option 1: Local Development
```
Frontend:  http://localhost:5173
Backend:   http://localhost:3001
MySQL:     localhost:3306
```

### Option 2: VPS/Server
```
Frontend:  https://voltor.com
Backend:   https://api.voltor.com (or IP:3001)
MySQL:     localhost:3306 (same server)
CF Worker: (optional) https://worker.workers.dev
```

### Option 3: Cloud (Full)
```
Frontend:  https://voltor.com (Vercel/Netlify)
Backend:   https://api.voltor.com (AWS/DigitalOcean)
MySQL:     RDS/Managed DB
CF Worker: https://api.voltor.com (custom domain)
```

---

## 🔄 CI/CD Pipeline (Future)

```
1. Code Push (GitHub)
   ↓
2. CI Tests (GitHub Actions)
   ├─ Lint
   ├─ Unit tests
   └─ Integration tests
   ↓
3. Build
   ├─ Frontend (npm run build)
   └─ Backend (docker build)
   ↓
4. Deploy
   ├─ Frontend → Vercel/Netlify
   ├─ Backend → VPS/AWS
   ├─ Cloudflare Worker → wrangler publish
   └─ MySQL → Migration scripts
   ↓
5. Monitor
   ├─ Uptime (UptimeRobot)
   ├─ Errors (Sentry)
   └─ Analytics (Cloudflare/Google)
```

---

## 📊 Monitoring & Logs

### Express Server Logs:
```bash
npm run dev
→ Morgan logs (colored)
→ Console.log (custom)
```

### Cloudflare Analytics:
```
Dashboard → Workers → Metrics
├─ Total requests
├─ Errors
├─ CPU time
├─ Cache hit ratio
└─ Success rate
```

### MySQL Logs:
```sql
-- Slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- Error log
SHOW VARIABLES LIKE 'log_error';
```

---

## ✅ Summary

**Current Setup:**
```
✅ Express API server (MySQL)
✅ 7 REST API routes
✅ Cache middleware (in-memory)
✅ Rate limiting middleware
✅ Security headers (Helmet)
✅ Compression (gzip)
✅ CORS configured
✅ JWT authentication
✅ Bcrypt password hashing
```

**Optional (Cloudflare):**
```
□ Cloudflare Worker (proxy)
□ Global CDN cache
□ Advanced DDoS protection
□ Custom domain routing
```

**Database:**
```
✅ MySQL schema (7 tables)
✅ Sample data
✅ Triggers (auto-update ratings)
✅ Indexes (performance)
✅ Foreign keys (integrity)
```

---

**Perfect Architecture! Production-ready! 🚀✨**
