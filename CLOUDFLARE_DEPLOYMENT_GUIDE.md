# Hướng Dẫn Triển Khai VOLTOR Lên Cloudflare

Dự án đã được cấu hình hoàn chỉnh để chạy trên mạng lưới toàn cầu của Cloudflare (Cloudflare Pages & Workers).

---

## 1. Cấu hình có sẵn trong dự án

1. **`wrangler.toml`**: File cấu hình Cloudflare chính thức cho dự án (`voltor-website`). Quản lý routing SPA tự động qua `not_found_handling = "single-page-application"`.
2. **`public/_headers`**: Thiết lập bảo mật HTTP (X-Frame-Options, NoSniff, HSTS) và tối ưu hóa bộ nhớ đệm (Cache-Control) trên Cloudflare Edge.
3. **`functions/api/`**: Cloudflare Pages Functions xử lý API tại rìa mạng lưới (Edge), tích hợp sẵn reverse proxy tới Backend / Neon PostgreSQL.

---

## 2. Cách triển khai lên Cloudflare

### Cách 1: Triển khai qua lệnh CLI (Wrangler)

```bash
# Bước 1: Đăng nhập vào Cloudflare (chỉ cần làm 1 lần)
npx wrangler login

# Bước 2: Build và đẩy lên Cloudflare Pages
npm run deploy:pages
```

Sau khi chạy, Wrangler sẽ tạo project và cung cấp URL truy cập ngay lập tức dạng:
`https://voltor-website.pages.dev`

---

### Cách 2: Kết nối tự động qua GitHub (Khuyên dùng)

1. Đăng nhập vào dashboard [dash.cloudflare.com](https://dash.cloudflare.com/).
2. Chọn mục **Workers & Pages** -> **Create application** -> Tab **Pages** -> **Connect to Git**.
3. Chọn repository `Duyneu/PumpWebsite`.
4. Điền thông tin cấu hình build:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `18` hoặc `20` (Thêm biến môi trường `NODE_VERSION=20` trong mục Environment Variables).
5. Nhấn **Save and Deploy**. Mỗi khi bạn push code lên GitHub `main`, Cloudflare sẽ tự động build và deploy toàn cầu trong 1 phút.

---

## 3. Biến môi trường (Environment Variables) trên Cloudflare

Vào **Settings** -> **Environment variables** trên Cloudflare Pages:

| Tên biến | Giá trị mẫu | Mục đích |
|---|---|---|
| `NODE_VERSION` | `20` | Đảm bảo phiên bản Node.js tương thích Vite |
| `BACKEND_API_URL` | `https://api.yourdomain.com` | URL trỏ tới API server nếu dùng Express riêng |
| `DATABASE_URL` | `postgresql://neondb_owner:...@neon.tech/neondb?sslmode=require` | Kết nối cơ sở dữ liệu Neon PostgreSQL |

---

## 4. Gắn tên miền tùy chỉnh (Custom Domain)

1. Trên Cloudflare Pages -> Tab **Custom domains**.
2. Nhập tên miền (ví dụ: `voltor.vn` hoặc `pump.voltor.vn`).
3. Cloudflare sẽ tự động cấp chứng chỉ SSL miễn phí và kích hoạt CDN chống DDoS toàn cầu.
