# 🚀 VOLTOR Backend API - MySQL Database

Backend API cho website VOLTOR Vietnam với MySQL database.

---

## 📋 Prerequisites

Cần cài đặt:
- **Node.js** (v16+): https://nodejs.org/
- **MySQL** (v8.0+): https://dev.mysql.com/downloads/mysql/
  - Hoặc **XAMPP**: https://www.apachefriends.org/
  - Hoặc **MySQL Workbench**: https://dev.mysql.com/downloads/workbench/

---

## 🔧 Setup Instructions

### Bước 1: Cài đặt MySQL

**Option A: MySQL Standalone**
```bash
# Download & Install từ:
https://dev.mysql.com/downloads/mysql/

# Start MySQL service
# Windows: Services → MySQL → Start
# Mac: System Preferences → MySQL → Start
# Linux: sudo systemctl start mysql
```

**Option B: XAMPP (Recommended cho beginners)**
```bash
# Download: https://www.apachefriends.org/
# Install và khởi động XAMPP Control Panel
# Click "Start" cho MySQL module
```

---

### Bước 2: Tạo Database

**Option A: Command Line**
```bash
# Login to MySQL
mysql -u root -p

# Tạo database
CREATE DATABASE voltor_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Exit
exit;
```

**Option B: phpMyAdmin (nếu dùng XAMPP)**
```
1. Mở: http://localhost/phpmyadmin
2. Click "New" để tạo database
3. Database name: voltor_db
4. Collation: utf8mb4_unicode_ci
5. Click "Create"
```

**Option C: MySQL Workbench**
```
1. Mở MySQL Workbench
2. Connect to localhost
3. Query → New Query
4. Paste SQL từ /database/schema.sql
5. Execute
```

---

### Bước 3: Import Schema & Data

**Option A: Command Line**
```bash
# Vào thư mục root của project
cd /path/to/voltor-project

# Import schema (tạo tables)
mysql -u root -p voltor_db < database/schema.sql

# Import sample data
mysql -u root -p voltor_db < database/seed.sql
```

**Option B: phpMyAdmin**
```
1. Vào phpMyAdmin
2. Click database "voltor_db"
3. Tab "Import"
4. Choose file: /database/schema.sql
5. Click "Go"
6. Lặp lại với /database/seed.sql
```

**Option C: MySQL Workbench**
```
1. File → Run SQL Script
2. Chọn /database/schema.sql → Execute
3. Chọn /database/seed.sql → Execute
```

---

### Bước 4: Setup Backend Server

```bash
# Vào thư mục server
cd server

# Install dependencies
npm install

# Copy .env file
cp .env.example .env

# Edit .env - cập nhật MySQL credentials
nano .env
# Hoặc mở bằng text editor
```

**Cập nhật .env:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=          # Điền password MySQL của bạn
DB_NAME=voltor_db

PORT=3001
JWT_SECRET=your-secret-key-here
```

---

### Bước 5: Khởi động Server

```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

**Thành công khi thấy:**
```
🚀 ========================================
🚀 VOLTOR Backend API Server
🚀 ========================================
🌐 Server running on: http://localhost:3001
✅ MySQL Connected Successfully!
📊 Database: voltor_db
```

---

## 🧪 Test API

### Test với Browser/Postman:

```bash
# Health check
GET http://localhost:3001/health

# Lấy danh sách sản phẩm
GET http://localhost:3001/api/products

# Lấy categories
GET http://localhost:3001/api/categories

# Lấy reviews
GET http://localhost:3001/api/reviews

# Register user
POST http://localhost:3001/api/auth/register
Content-Type: application/json
{
  "email": "test@voltor.com",
  "password": "password123",
  "name": "Test User"
}

# Login
POST http://localhost:3001/api/auth/login
Content-Type: application/json
{
  "email": "test@voltor.com",
  "password": "password123"
}
```

### Test với curl:

```bash
# Products
curl http://localhost:3001/api/products

# Categories
curl http://localhost:3001/api/categories

# Reviews
curl http://localhost:3001/api/reviews

# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@voltor.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@voltor.com","password":"password123"}'
```

---

## 📊 Database Schema

### Tables:
- **users** - Người dùng (local + OAuth)
- **categories** - Danh mục sản phẩm (3 cấp)
- **products** - Sản phẩm máy bơm
- **reviews** - Đánh giá sản phẩm
- **orders** - Đơn hàng
- **order_items** - Chi tiết đơn hàng
- **cart_items** - Giỏ hàng

### Sample Data:
- ✅ 4 users (admin + users)
- ✅ 11 categories (3 levels)
- ✅ 5 products
- ✅ 8 reviews
- ✅ 2 orders

**Admin Account:**
```
Email: admin@voltor.com
Password: password123
```

**User Account:**
```
Email: user@voltor.com
Password: password123
```

---

## 🔗 API Endpoints

### Products
```
GET    /api/products              - Danh sách sản phẩm
GET    /api/products/:slug        - Chi tiết sản phẩm
POST   /api/products              - Tạo sản phẩm (Admin)
PUT    /api/products/:id          - Cập nhật sản phẩm (Admin)
DELETE /api/products/:id          - Xóa sản phẩm (Admin)
```

### Categories
```
GET    /api/categories            - Danh sách categories (tree)
GET    /api/categories/:slug      - Chi tiết category
```

### Users
```
GET    /api/users                 - Danh sách users (Admin)
GET    /api/users/:id             - Chi tiết user
POST   /api/users                 - Tạo user
PUT    /api/users/:id             - Cập nhật user
PUT    /api/users/:id/password    - Đổi mật khẩu
DELETE /api/users/:id             - Xóa user
```

### Reviews
```
GET    /api/reviews               - Danh sách reviews
GET    /api/reviews/:id           - Chi tiết review
POST   /api/reviews               - Tạo review
PUT    /api/reviews/:id           - Cập nhật review
DELETE /api/reviews/:id           - Xóa review
POST   /api/reviews/:id/helpful   - Mark helpful
GET    /api/reviews/product/:id/summary  - Rating summary
```

### Authentication
```
POST   /api/auth/register         - Đăng ký
POST   /api/auth/login            - Đăng nhập
POST   /api/auth/oauth            - OAuth login
GET    /api/auth/me               - Get current user
```

### Orders
```
GET    /api/orders                - Danh sách orders
POST   /api/orders                - Tạo order mới
```

### Cart
```
GET    /api/cart/:user_id         - Lấy giỏ hàng
POST   /api/cart                  - Thêm vào giỏ
PUT    /api/cart/:id              - Cập nhật số lượng
DELETE /api/cart/:id              - Xóa item
DELETE /api/cart/user/:user_id    - Xóa tất cả
```

---

## 🛠️ Troubleshooting

### Problem 1: "MySQL Connection Error"

**Nguyên nhân:** MySQL chưa chạy hoặc credentials sai

**Giải pháp:**
```bash
# Check MySQL đang chạy
# Windows: services.msc → MySQL → Running
# Mac: System Preferences → MySQL
# Linux: sudo systemctl status mysql

# Test connection
mysql -u root -p

# Check credentials trong .env
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=voltor_db
```

---

### Problem 2: "Table doesn't exist"

**Nguyên nhân:** Schema chưa được import

**Giải pháp:**
```bash
# Import lại schema
mysql -u root -p voltor_db < database/schema.sql
mysql -u root -p voltor_db < database/seed.sql
```

---

### Problem 3: Port 3001 đã được dùng

**Giải pháp:**
```bash
# Đổi port trong .env
PORT=3002

# Hoặc kill process đang dùng port 3001
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3001 | xargs kill -9
```

---

### Problem 4: CORS Error từ Frontend

**Giải pháp:**
```bash
# Cập nhật CORS_ORIGIN trong .env
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Restart server
```

---

## 📁 Project Structure

```
server/
├── package.json          # Dependencies
├── server.js             # Main server file
├── db.js                 # MySQL connection
├── .env.example          # Environment template
├── .env                  # Environment config (create this)
└── routes/
    ├── products.js       # Products API
    ├── categories.js     # Categories API
    ├── users.js          # Users API
    ├── reviews.js        # Reviews API
    ├── orders.js         # Orders API
    ├── cart.js           # Cart API
    └── auth.js           # Authentication API

database/
├── schema.sql            # Database schema (tables)
└── seed.sql              # Sample data
```

---

## 🔒 Security Notes

**Production Checklist:**

```bash
# 1. Change JWT_SECRET
JWT_SECRET=<random-secure-string-here>

# 2. Use strong MySQL password
DB_PASSWORD=<strong-password>

# 3. Enable HTTPS
# 4. Add rate limiting
# 5. Validate all inputs
# 6. Use prepared statements (đã có)
# 7. Hash passwords (đã có với bcrypt)
```

---

## 📚 Dependencies

```json
{
  "express": "^4.18.2",        // Web framework
  "mysql2": "^3.6.5",          // MySQL client
  "cors": "^2.8.5",            // CORS middleware
  "bcrypt": "^5.1.1",          // Password hashing
  "jsonwebtoken": "^9.0.2",    // JWT authentication
  "dotenv": "^16.3.1",         // Environment variables
  "helmet": "^7.1.0",          // Security headers
  "compression": "^1.7.4",     // Response compression
  "morgan": "^1.10.0"          // Request logging
}
```

---

## 🚀 Deployment

### Deploy to VPS/Server:

```bash
# 1. Upload code lên server
scp -r server/ user@your-server:/path/to/app

# 2. SSH vào server
ssh user@your-server

# 3. Install dependencies
cd /path/to/app/server
npm install --production

# 4. Setup MySQL
mysql -u root -p < ../database/schema.sql
mysql -u root -p < ../database/seed.sql

# 5. Configure .env
nano .env

# 6. Start with PM2
npm install -g pm2
pm2 start server.js --name voltor-api
pm2 startup
pm2 save

# 7. Setup Nginx reverse proxy
# nginx config...
```

---

## 📞 Support

- **Email:** voltorvietnam@gmail.com
- **Phone:** (+84) 836 389 488
- **Địa chỉ:** Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh

---

## ✅ Checklist

```
□ MySQL đã cài đặt
□ Database "voltor_db" đã tạo
□ Schema đã import (schema.sql)
□ Sample data đã import (seed.sql)
□ Node.js dependencies đã install (npm install)
□ .env file đã tạo và cấu hình
□ Server chạy thành công (npm run dev)
□ Test API endpoints → OK
□ Frontend connect được đến API
```

---

**Happy Coding! 🎉**
