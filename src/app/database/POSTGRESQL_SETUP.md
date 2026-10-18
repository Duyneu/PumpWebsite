# 🐘 Hướng Dẫn Sử Dụng PostgreSQL Cho VOLTOR Backend

Hệ thống Backend đã được nâng cấp hoàn toàn sang hỗ trợ **PostgreSQL**.

---

## 🚀 Cách 1: Sử dụng PostgreSQL Miễn Phí Trên Cloud (Khuyên dùng - Nhanh nhất)

Bạn không cần cài đặt bất kỳ phần mềm database nào trên máy tính, chỉ mất 1-2 phút tạo database miễn phí:

### Lựa chọn 1: [Neon.tech](https://neon.tech) (Serverless Postgres)
1. Đăng ký tài khoản miễn phí tại [Neon.tech](https://neon.tech).
2. Tạo project mới (ví dụ: `voltor-db`).
3. Copy chuỗi **Connection String**, định dạng dạng:
   ```
   postgresql://username:password@ep-xyz.neon.tech/neondb?sslmode=require
   ```
4. Dán vào file `.env` trong thư mục `src/app/server/.env`:
   ```env
   DATABASE_URL=postgresql://username:password@ep-xyz.neon.tech/neondb?sslmode=require
   ```

### Lựa chọn 2: [Supabase](https://supabase.com)
1. Tạo project tại [Supabase](https://supabase.com).
2. Vào **Project Settings** → **Database** → Copy **URI** (Connection String).
3. Dán vào `DATABASE_URL` trong file `.env`.

---

## 💻 Cách 2: Sử dụng PostgreSQL Cài Đặt Trên Máy (Local)

1. Cài đặt PostgreSQL (hoặc pgAdmin): [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
2. Mở terminal hoặc pgAdmin tạo database `voltor_db`:
   ```bash
   createdb -U postgres voltor_db
   ```
3. Cấu hình thông tin kết nối trong `src/app/server/.env`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=mật_khẩu_của_bạn
   DB_NAME=voltor_db
   DB_SSL=false
   ```

---

## ⚡ Khởi Tạo Bảng & Dữ Liệu Mẫu (Schema & Seed)

Sau khi đã có database và cấu hình `.env`, chạy lệnh sau tại thư mục `src/app/server`:

```bash
cd src/app/server
npm run init-db
```

Lệnh này sẽ tự động:
1. Tạo đầy đủ các bảng: `users`, `categories`, `products`, `reviews`, `orders`, `order_items`, `cart_items` (kèm triggers tự động cập nhật rating & updated_at).
2. Nạp dữ liệu mẫu gồm các dòng máy bơm VOLTOR, danh mục 3 cấp và tài khoản admin/user.

---

## ▶️ Chạy Backend Server

```bash
cd src/app/server
npm run dev
```

Server sẽ khởi động tại: `http://localhost:3001`
* Endpoint kiểm tra: `GET http://localhost:3001/health`
* Danh sách sản phẩm: `GET http://localhost:3001/api/products`
* Danh mục: `GET http://localhost:3001/api/categories`

