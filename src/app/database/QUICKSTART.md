# 🚀 QUICK START - IMPORT DONGYIN PRODUCTS

## ⚡ Import Nhanh (Recommended)

### Bước 1: Backup (Quan Trọng!)
```bash
mysqldump -u root -p voltor_db > backup_before_dongyin.sql
```

### Bước 2: Import Tất Cả (1 lệnh)
```bash
mysql -u root -p voltor_db < database/seed-all-dongyin-products.sql
```

✅ **Done! 120 sản phẩm đã được import**

---

## 📦 Chi Tiết Sản Phẩm Import

### Part 1 (50 sản phẩm)
```
✅ QS Series (14):  Bơm điện chìm nước sạch 220V/380V
✅ WS Series (8):   Bơm điện chìm nước thải 220V/380V  
✅ WQ Series (14):  Bơm nước thải có cánh cắt rác 220V/380V
✅ TD Series (14):  Tủ điện điều khiển 220V
```

### Part 2 (70 sản phẩm)
```
✅ SD Series (20):     Bơm chìm hỏa tiễn giếng khoan 220V
✅ 4SP Series (15):    Bơm chìm hỏa tiễn 220V/380V
✅ 6SR/6SP Series(23): Bơm chìm hỏa tiễn 6 inch 220V/380V
✅ 4DP Series (12):    Bơm năng lượng mặt trời 110V DC
```

---

## 🔍 Kiểm Tra Nhanh

```sql
-- Đếm sản phẩm DONGYIN
SELECT COUNT(*) FROM products WHERE brand = 'DONGYIN';
-- Kết quả: 120

-- Xem phân bố theo series
SELECT 
  JSON_EXTRACT(specifications, '$.series') as series,
  COUNT(*) as count
FROM products
WHERE brand = 'DONGYIN'
GROUP BY series;
```

---

## 💰 Bảng Giá Tóm Tắt

| Series | Số Lượng | Giá Từ | Giá Đến |
|--------|----------|---------|---------|
| **TD** | 14 | 190K | 250K |
| **SD** | 20 | 1.5M | 3.5M |
| **QS** | 14 | 2.0M | 7.6M |
| **WS** | 8 | 1.5M | 5.2M |
| **WQ** | 14 | 4.0M | 88M |
| **4SP** | 15 | 3.7M | 15.7M |
| **4DP** | 12 | 5.3M | 5.3M |
| **6SR/6SP** | 23 | 6.1M | 26.2M |

**Tổng Giá Trị Kho**: ~1.2 tỷ VND (nếu mỗi model 1 unit)

---

## 🎯 Sản Phẩm Hot

### Best Sellers (is_bestseller = true)
```
✅ QSD6-15-0.37  (2.0M)  - Bơm chìm 1/2HP phổ biến nhất
✅ QSD6-18-0.55  (2.1M)  - Bơm chìm 3/4HP bán chạy
✅ WSD9-8-0.37E  (1.5M)  - Bơm nước thải nhỏ
✅ WSD15-10-0.75E(2.3M)  - Bơm nước thải 1HP
✅ 2SDM-0.7/32   (2.0M)  - Bơm hỏa tiễn giếng khoan
✅ 2.5SDM-1.5/17 (1.7M)  - Bơm hỏa tiễn gia đình
```

### Featured (is_featured = true)
- Tất cả QS Series 220V (8 models)
- WS Series 220V (5 models)  
- WQ Series 220V (6 models)
- 3SDM Series (3 models)
- 6SR Series (2 models)
- 4DP Solar (3 models)

**Tổng: ~27 sản phẩm featured**

### New (is_new = true)
- Tất cả models 380V
- Tất cả 4DP Solar Series
- 6SR/6SP Series

---

## 📱 Ứng Dụng Theo Khách Hàng

### Gia Đình / Dân Dụng
```
💧 Cấp nước sinh hoạt:
   - 2SDM, 2.5SDM, 3SDM Series (1.5M - 3.5M)
   - QS Series nhỏ (2.0M - 3.7M)

🌱 Tưới tiêu vườn:
   - 4DP Solar (5.3M) - Tiết kiệm điện
   - QS/WS nhỏ (1.5M - 3.0M)
```

### Nông Nghiệp
```
🌾 Tưới tiêu:
   - 4DP Solar Series (5.3M) - Năng lượng xanh
   - QS Series 220V (2.0M - 4.2M)
   - 4SP Series 220V (3.7M - 6.1M)

💩 Xử lý nước thải:
   - WS Series (1.5M - 5.2M)
   - WQ Series nhỏ (4.0M - 6.9M)
```

### Công Nghiệp Nhỏ
```
🏭 Cấp nước:
   - 6SP Series 220V (6.3M - 7.6M)
   - 4SP Series (3.7M - 15.7M)

🚰 Xử lý nước thải:
   - WQ Series 380V (7.0M - 25M)
```

### Công Nghiệp Lớn
```
🏗️ Công trình lớn:
   - 6SR Series (9.7M - 22.3M)
   - 6SP Series 380V (11M - 26.2M)
   - WQ lớn (22.6M - 88M)
```

---

## 🔧 Thông Số Kỹ Thuật

### Điện Áp
- **220V**: Gia đình, dân dụng (70+ models)
- **380V**: Công nghiệp (40+ models)
- **110V DC**: Năng lượng mặt trời (12 models)

### Công Suất
- **< 1HP**: Gia đình nhỏ (20+ models)
- **1-3HP**: Gia đình lớn, nông nghiệp (40+ models)
- **3-10HP**: Công nghiệp nhỏ (35+ models)
- **10-40HP**: Công nghiệp lớn (15+ models)

### Lưu Lượng
- **< 10m³/h**: Gia đình (40+ models)
- **10-30m³/h**: Nông nghiệp (30+ models)
- **30-100m³/h**: Công nghiệp vừa (30+ models)
- **> 100m³/h**: Công nghiệp lớn (10+ models)

---

## 📞 Thông Tin Hỗ Trợ

**VOLTOR VIETNAM**
- 📧 Email: voltorvietnam@gmail.com
- 📱 Phone/Zalo: (+84) 836 389 488
- 📍 Địa chỉ: Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh

**Bảo Hành**: 12 tháng tất cả sản phẩm
**Giá Có Hiệu Lực**: 01/05/2025

---

## 🆘 Troubleshooting

### Lỗi: Access Denied
```bash
# Cấp quyền cho user
mysql -u root -p -e "GRANT ALL PRIVILEGES ON voltor_db.* TO 'your_user'@'localhost';"
mysql -u root -p -e "FLUSH PRIVILEGES;"
```

### Lỗi: Database không tồn tại
```bash
mysql -u root -p -e "CREATE DATABASE voltor_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### Import bị duplicate
```bash
# Xóa dữ liệu DONGYIN cũ
mysql -u root -p voltor_db -e "DELETE FROM products WHERE brand = 'DONGYIN';"

# Import lại
mysql -u root -p voltor_db < database/seed-all-dongyin-products.sql
```

---

## 📖 Tài Liệu Đầy Đủ

- 📄 [README.md](./README.md) - Tổng quan database
- 📄 [IMPORT-DONGYIN-PRODUCTS.md](./IMPORT-DONGYIN-PRODUCTS.md) - Chi tiết đầy đủ
- 📄 [DATABASE_GUIDE.md](../DATABASE_GUIDE.md) - Hướng dẫn database chung

---

**Chúc bạn import thành công! 🎉**

*Last updated: 05/02/2026*
