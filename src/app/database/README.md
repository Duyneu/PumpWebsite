# VOLTOR VIETNAM - DATABASE FILES

## 📁 Cấu Trúc Files

### Core Database Files
- `schema.sql` - Database schema với 7 tables
- `seed.sql` - Dữ liệu mẫu ban đầu (users, categories, products)
- `seed-admin-user.sql` - Admin user (admin@voltor.vn / Admin@123)

### DONGYIN PUMP Products (120 sản phẩm)

#### Files Chính
- `seed-products-dongyin-complete.sql` **(Part 1 - 50 sản phẩm)**
  - QS Series: 14 products
  - WS Series: 8 products
  - WQ Series: 14 products
  - TD Series: 14 products

- `seed-products-dongyin-complete-part2.sql` **(Part 2 - 70 sản phẩm)**
  - SD Series: 20 products
  - 4SP Series: 15 products
  - 6SR/6SP Series: 23 products
  - 4DP Series: 12 products

#### File Import Tổng Hợp
- `seed-all-dongyin-products.sql` - Import tất cả DONGYIN products + verification queries

#### Documentation
- `IMPORT-DONGYIN-PRODUCTS.md` - Hướng dẫn chi tiết về import và quản lý
- `6SR-6SP-IMPORT-GUIDE.md` - Hướng dẫn import 6SR/6SP Series
- `IMPORT_PRODUCTS.md` - Hướng dẫn import sản phẩm nói chung

### Legacy Files (từ imports trước)
- `seed-products-detailed.sql` - Sản phẩm chi tiết ban đầu
- `seed-products-4sdm-4sd-4sp-6sr-6sp.sql` - Import 4SDM/4SD/4SP/6SR/6SP trước đó
- `seed-products-6sr-6sp-complete.sql` - Import 6SR/6SP hoàn chỉnh
- `seed-products-dongyin-td.sql` - TD Series import trước đó

## 🚀 Quick Start

### Import Toàn Bộ Database

```bash
# 1. Tạo database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS voltor_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 2. Import schema
mysql -u root -p voltor_db < schema.sql

# 3. Import seed data cơ bản
mysql -u root -p voltor_db < seed.sql

# 4. Import admin user
mysql -u root -p voltor_db < seed-admin-user.sql

# 5. Import tất cả DONGYIN products (120 sản phẩm)
mysql -u root -p voltor_db < seed-all-dongyin-products.sql
```

### Import Từng Phần

```bash
# Chỉ import Part 1 (QS, WS, WQ, TD)
mysql -u root -p voltor_db < seed-products-dongyin-complete.sql

# Chỉ import Part 2 (SD, 4SP, 6SR/6SP, 4DP)
mysql -u root -p voltor_db < seed-products-dongyin-complete-part2.sql
```

## 📊 Database Statistics

### Tables
- **users** - Người dùng và admin
- **categories** - Danh mục sản phẩm (3 cấp)
- **products** - Sản phẩm
- **reviews** - Đánh giá sản phẩm
- **orders** - Đơn hàng
- **order_items** - Chi tiết đơn hàng
- **cart_items** - Giỏ hàng

### DONGYIN Products Overview

| Series | Count | Voltage | Price Range |
|--------|-------|---------|-------------|
| QS | 14 | 220V/380V | 2.0M - 7.6M |
| WS | 8 | 220V/380V | 1.5M - 5.2M |
| WQ | 14 | 220V/380V | 4.0M - 88M |
| TD | 14 | 220V | 190K - 250K |
| SD | 20 | 220V | 1.5M - 3.5M |
| 4SP | 15 | 220V/380V | 3.7M - 15.7M |
| 6SR/6SP | 23 | 220V/380V | 6.1M - 26.2M |
| 4DP | 12 | 110V DC | 5.3M (all) |
| **Total** | **120** | - | **190K - 88M** |

### Product Features
- ✅ Đầy đủ thông số kỹ thuật (JSON format)
- ✅ Hình ảnh chất lượng cao (Unsplash)
- ✅ SEO-friendly names & descriptions
- ✅ Multiple price points
- ✅ Stock management
- ✅ Featured/Bestseller/New tags
- ✅ Phân loại rõ ràng theo voltage & series

## 🔍 Verification Queries

### Kiểm Tra Tổng Số Sản Phẩm
```sql
SELECT COUNT(*) as total_products FROM products;
SELECT COUNT(*) as dongyin_products FROM products WHERE brand = 'DONGYIN';
```

### Phân Bố Theo Series
```sql
SELECT 
  JSON_EXTRACT(specifications, '$.series') as series,
  COUNT(*) as count,
  CONCAT(FORMAT(AVG(price), 0), ' VND') as avg_price
FROM products
WHERE brand = 'DONGYIN'
GROUP BY series
ORDER BY count DESC;
```

### Top Products
```sql
-- Top 10 đắt nhất
SELECT name, price FROM products WHERE brand = 'DONGYIN' ORDER BY price DESC LIMIT 10;

-- Top 10 rẻ nhất
SELECT name, price FROM products WHERE brand = 'DONGYIN' ORDER BY price ASC LIMIT 10;

-- Featured products
SELECT COUNT(*) FROM products WHERE brand = 'DONGYIN' AND is_featured = TRUE;
```

## 📝 Notes

### Giá Sản Phẩm
- Giá có hiệu lực từ: **01/05/2025**
- Tất cả giá đã bao gồm VAT
- Bảo hành: **12 tháng** cho tất cả sản phẩm

### Thông Tin Liên Hệ (trong database)
- **Email**: voltorvietnam@gmail.com
- **Phone**: (+84) 836 389 488 (Zalo)
- **Address**: Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh

### Admin Account
- **Email**: admin@voltor.vn
- **Password**: Admin@123
- **Role**: admin

## 🛠️ Maintenance

### Backup Before Import
```bash
mysqldump -u root -p voltor_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Reset Database
```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS voltor_db;"
mysql -u root -p -e "CREATE DATABASE voltor_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### Update Product Prices
```sql
-- Update giá theo tỷ lệ phần trăm
UPDATE products 
SET price = price * 1.1  -- Tăng 10%
WHERE brand = 'DONGYIN';

-- Update giá cho một series cụ thể
UPDATE products 
SET price = price * 0.95  -- Giảm 5%
WHERE brand = 'DONGYIN' 
  AND JSON_EXTRACT(specifications, '$.series') = 'QS';
```

## 📚 Documentation

- [IMPORT-DONGYIN-PRODUCTS.md](./IMPORT-DONGYIN-PRODUCTS.md) - Chi tiết về DONGYIN products
- [6SR-6SP-IMPORT-GUIDE.md](./6SR-6SP-IMPORT-GUIDE.md) - Hướng dẫn 6SR/6SP Series
- [IMPORT_PRODUCTS.md](./IMPORT_PRODUCTS.md) - Hướng dẫn import chung

## 🎯 Next Steps

1. ✅ Import all DONGYIN products
2. ⏳ Add real product images (nếu có)
3. ⏳ Create sample reviews
4. ⏳ Setup combo deals
5. ⏳ Add more categories
6. ⏳ Import other brands

## 📞 Support

Nếu có vấn đề khi import hoặc cần hỗ trợ, vui lòng liên hệ:
- Email: voltorvietnam@gmail.com
- Phone: (+84) 836 389 488

---

**Last Updated**: 05/02/2026
**Database Version**: 2.0
**Total Products**: 120+ items
