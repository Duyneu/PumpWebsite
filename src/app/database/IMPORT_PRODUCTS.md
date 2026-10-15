# 📦 Import Sản Phẩm Chi Tiết vào Database

Hướng dẫn import **45+ sản phẩm** từ bảng giá WS Series, QS Series, WQ Series vào MySQL database.

---

## 📊 Dữ Liệu Sản Phẩm

### **WS Series** - Máy Bơm Chìm Nước Thải (16 sản phẩm)
```
✅ WSD9-8-0.37E (220V)
✅ WSD15-10-0.75E (220V)
✅ WSD20-11-1.1E (220V)
✅ WSD15-16-1.5E (220V)
✅ WSD20-17-2.2E (220V)
✅ WS15-16-1.5E (380V)
✅ WS20-17-2.2E (380V)
✅ WS60-11-4E (380V)

✅ WSD9-8-0.37E (A) - Phiên bản nâng cấp
✅ WSD15-10-0.75E (A)
✅ WSD20-11-1.1E (A)
✅ WSD15-16-1.5E (A)

✅ WSD15-10-1.1CD - Cánh đơn
✅ WSD20-12-1.5CD - Cánh đơn
```

### **QS Series** - Máy Bơm Chìm Nước Sạch (18 sản phẩm)
```
✅ QSD6-15-0.37 (220V)
✅ QSD6-18-0.55 (220V)
✅ QSD6-22-0.75 (220V)
✅ QSD6-25-1.1 (220V)
✅ QSD10-28-1.5 (220V)
✅ QSD10-32-1.9 (220V)
✅ QSD15-32-2.2 (220V)
✅ QSD15-40-3 (220V)

✅ QS10-28-1.5 (380V - Hỏa Tiễn)
✅ QS15-32-2.2 (380V - Hỏa Tiễn)
✅ QS15-40-3 (380V - Liệt Bảng)
✅ QS20-40-4 (380V - Hỏa Tiễn)
✅ QS25-50-5.5 (380V - Hỏa Tiễn)
✅ QS25-55-7.5 (380V - Hỏa Tiễn)

✅ QSD6-15-0.37(A) - Cơ phạo
✅ QSD6-18-0.55(A) - Cơ phạo
✅ QSD6-22-0.75(A) - Cơ phạo
✅ QSD6-25-1.1(A) - Cơ phạo
```

### **WQ Series** - Máy Bơm Chìm Cánh Cắt Rác (16 sản phẩm)
```
✅ WQD15-10-1.1GN (220V)
✅ WQD18-12-1.5GN (220V)
✅ WQD25-15-2.2GN (220V)

✅ WQ15-10-1.1GN (380V)
✅ WQ18-12-1.5GN (380V)
✅ WQ25-15-2.2GN (380V)
✅ WQ30-17-3.0GN (380V)
✅ WQ40-18-4.0GN (380V)
✅ WQ65-17-5.5GN (380V)
✅ WQ85-18-7.5GN (380V)
✅ WQ120-20-11GN (380V) - Hết hàng
✅ WQ160-18-15GN (380V)
✅ WQ200-21-22GN (380V)
✅ WQ400-13-30GN (380V)
```

**Tổng cộng: 50 sản phẩm!**

---

## 🚀 Cách Import

### **Option 1: Command Line (Recommended)**

```bash
# 1. Vào thư mục database
cd /path/to/project

# 2. Import file SQL
mysql -u root -p voltor_db < database/seed-products-detailed.sql

# Enter password khi được hỏi
# → Import thành công!
```

---

### **Option 2: phpMyAdmin (XAMPP)**

```
1. Mở: http://localhost/phpmyadmin
2. Click database "voltor_db" (left sidebar)
3. Tab "Import" (top menu)
4. Click "Choose File"
5. Chọn: /database/seed-products-detailed.sql
6. Scroll down → Click "Go"
7. ✅ Done!
```

---

### **Option 3: MySQL Workbench**

```
1. Open MySQL Workbench
2. Connect to localhost
3. Select database: voltor_db
4. Menu: File → Run SQL Script
5. Choose file: /database/seed-products-detailed.sql
6. Click "Run"
7. ✅ Done!
```

---

## ✅ Verify Import

### Check tổng số sản phẩm:

```sql
SELECT COUNT(*) as total FROM products WHERE brand = 'VOLTOR';
-- Expected: 55 sản phẩm (5 cũ + 50 mới)
```

### Check sản phẩm theo series:

```sql
SELECT 
    SUBSTRING_INDEX(JSON_UNQUOTE(JSON_EXTRACT(specifications, '$.series')), ' ', 1) as series,
    COUNT(*) as count
FROM products
WHERE brand = 'VOLTOR'
GROUP BY series
ORDER BY count DESC;

-- Expected:
-- WS Series: 16
-- QS Series: 18  
-- WQ Series: 16
-- (+ 5 sản phẩm cũ)
```

### Xem tất cả sản phẩm mới:

```sql
SELECT 
    id,
    sku,
    name,
    price,
    JSON_UNQUOTE(JSON_EXTRACT(specifications, '$.series')) as series
FROM products
WHERE brand = 'VOLTOR'
ORDER BY price ASC;
```

---

## 📋 Chi Tiết Sản Phẩm

### Thông tin mỗi sản phẩm có:

```javascript
{
  // Basic info
  name: "Máy bơm chìm nước thải VOLTOR WSD9-8-0.37E"
  sku: "WSD9-8-0.37E"
  slug: "may-bom-chim-nuoc-thai-voltor-wsd9-8-0-37e"
  
  // Category
  category_id: 5 (Máy Bơm Chìm)
  
  // Pricing
  price: 1550000 VNĐ
  original_price: null
  discount_percent: 0
  
  // Description
  short_description: "Máy bơm chìm nước thải 0.5HP..."
  description: "Máy bơm chìm nước thải VOLTOR WSD9..."
  
  // Brand info
  brand: "VOLTOR"
  model: "WSD9-8-0.37E"
  origin: "Việt Nam"
  warranty: "12 tháng"
  
  // Specifications (JSON)
  specifications: {
    "power_hp": "0.5HP",
    "power_kw": "0.37KW",
    "voltage": "220V",
    "outlet_diameter": "Ø42mm",
    "flow_rate": "12m³/6m, 8m³/9m, 6m³/10m",
    "head_max": "10m",
    "material": "Gang đúc + Inox",
    "weight": "15kg",
    "series": "WS Series"
  }
  
  // Images
  image: "https://images.unsplash.com/..."
  images: ["https://images.unsplash.com/..."]
  
  // Stock
  stock: 30
  
  // Flags
  is_featured: false
  is_bestseller: false
  is_new: true
}
```

---

## 🏷️ Giá Sản Phẩm

### WS Series (220V):
```
WSD9-8-0.37E:     1,550,000 VNĐ
WSD15-10-0.75E:   2,360,000 VNĐ
WSD20-11-1.1E:    2,800,000 VNĐ
WSD15-16-1.5E:    3,100,000 VNĐ
WSD20-17-2.2E:    4,500,000 VNĐ
```

### WS Series (380V):
```
WS15-16-1.5E:     3,000,000 VNĐ
WS20-17-2.2E:     3,950,000 VNĐ
WS60-11-4E:       5,200,000 VNĐ
```

### QS Series (220V):
```
QSD6-15-0.37:     2,000,000 VNĐ
QSD6-18-0.55:     2,100,000 VNĐ
QSD6-22-0.75:     2,260,000 VNĐ
QSD10-28-1.5:     2,860,000 VNĐ
QSD15-32-2.2:     3,750,000 VNĐ
QSD15-40-3:       4,250,000 VNĐ
```

### QS Series (380V - Hỏa Tiễn):
```
QS10-28-1.5:      2,650,000 VNĐ
QS15-32-2.2:      3,350,000 VNĐ
QS20-40-4:        4,900,000 VNĐ
QS25-50-5.5:      6,600,000 VNĐ
QS25-55-7.5:      7,600,000 VNĐ
```

### WQ Series (220V):
```
WQD15-10-1.1GN:   4,000,000 VNĐ
WQD18-12-1.5GN:   5,150,000 VNĐ
WQD25-15-2.2GN:   6,900,000 VNĐ
```

### WQ Series (380V):
```
WQ15-10-1.1GN:    4,000,000 VNĐ
WQ30-17-3.0GN:    7,000,000 VNĐ
WQ65-17-5.5GN:    11,100,000 VNĐ
WQ85-18-7.5GN:    12,800,000 VNĐ
WQ160-18-15GN:    25,000,000 VNĐ
WQ200-21-22GN:    52,200,000 VNĐ
WQ400-13-30GN:    88,000,000 VNĐ ← Most expensive!
```

---

## 🔍 Query Examples

### Lấy sản phẩm WS Series:

```sql
SELECT id, sku, name, price
FROM products
WHERE specifications LIKE '%WS Series%'
ORDER BY price ASC;
```

### Lấy sản phẩm 220V:

```sql
SELECT id, sku, name, 
       JSON_UNQUOTE(JSON_EXTRACT(specifications, '$.voltage')) as voltage,
       price
FROM products
WHERE JSON_EXTRACT(specifications, '$.voltage') LIKE '%220V%'
ORDER BY price ASC;
```

### Lấy sản phẩm 380V:

```sql
SELECT id, sku, name,
       JSON_UNQUOTE(JSON_EXTRACT(specifications, '$.voltage')) as voltage,
       price
FROM products
WHERE JSON_EXTRACT(specifications, '$.voltage') LIKE '%380V%'
ORDER BY price DESC;
```

### Lấy sản phẩm có cánh cắt rác:

```sql
SELECT id, sku, name, price
FROM products
WHERE JSON_EXTRACT(specifications, '$.cutting_blade') IS NOT NULL
ORDER BY price ASC;
```

### Lấy sản phẩm hỏa tiễn:

```sql
SELECT id, sku, name, price
FROM products
WHERE category_id = 6  -- Máy Bơm Hỏa Tiễn
OR specifications LIKE '%Hỏa Tiễn%'
ORDER BY price ASC;
```

### Top 10 sản phẩm đắt nhất:

```sql
SELECT sku, name, price, stock
FROM products
WHERE brand = 'VOLTOR'
ORDER BY price DESC
LIMIT 10;
```

### Top 10 sản phẩm bán chạy nhất:

```sql
SELECT sku, name, price, stock
FROM products
WHERE brand = 'VOLTOR' AND is_bestseller = TRUE
ORDER BY price ASC
LIMIT 10;
```

---

## 🎨 Frontend Display

### Lọc theo Series:

```typescript
// Get WS Series products
GET /api/products?search=WS%20Series

// Get QS Series products
GET /api/products?search=QS%20Series

// Get WQ Series products
GET /api/products?search=WQ%20Series
```

### Lọc theo voltage:

```typescript
// Filter 220V products
GET /api/products?search=220V

// Filter 380V products
GET /api/products?search=380V
```

### Lọc theo công suất:

```typescript
// Search by HP
GET /api/products?search=5.5HP

// Search by KW
GET /api/products?search=4.0KW
```

---

## 📊 Statistics

```sql
-- Tổng số sản phẩm
SELECT COUNT(*) as total FROM products WHERE brand = 'VOLTOR';

-- Tổng giá trị hàng tồn kho
SELECT SUM(price * stock) as total_value FROM products WHERE brand = 'VOLTOR';

-- Giá trung bình
SELECT AVG(price) as avg_price FROM products WHERE brand = 'VOLTOR';

-- Sản phẩm rẻ nhất
SELECT sku, name, price FROM products WHERE brand = 'VOLTOR' ORDER BY price ASC LIMIT 1;

-- Sản phẩm đắt nhất
SELECT sku, name, price FROM products WHERE brand = 'VOLTOR' ORDER BY price DESC LIMIT 1;

-- Phân bố theo khoảng giá
SELECT 
    CASE 
        WHEN price < 3000000 THEN '< 3 triệu'
        WHEN price < 5000000 THEN '3-5 triệu'
        WHEN price < 10000000 THEN '5-10 triệu'
        WHEN price < 20000000 THEN '10-20 triệu'
        ELSE '> 20 triệu'
    END as price_range,
    COUNT(*) as count
FROM products
WHERE brand = 'VOLTOR'
GROUP BY price_range
ORDER BY MIN(price);
```

---

## ⚠️ Lưu Ý

### Đừng chạy import 2 lần!

Nếu chạy lại file SQL, bạn sẽ có **duplicate products**!

**Cách xóa nếu import nhầm:**

```sql
-- Xóa TẤT CẢ sản phẩm VOLTOR (CẢNH BÁO!)
DELETE FROM products WHERE brand = 'VOLTOR';

-- Sau đó import lại
mysql -u root -p voltor_db < database/seed-products-detailed.sql
```

**Hoặc xóa chỉ sản phẩm mới (giữ 5 sản phẩm cũ):**

```sql
-- Xóa sản phẩm WS, QS, WQ Series
DELETE FROM products 
WHERE sku LIKE 'WS%' 
   OR sku LIKE 'QS%' 
   OR sku LIKE 'WQ%';

-- Import lại
mysql -u root -p voltor_db < database/seed-products-detailed.sql
```

---

## ✅ Checklist

```
□ MySQL đang chạy
□ Database voltor_db đã tạo
□ Schema tables đã có (products, categories, etc.)
□ File seed-products-detailed.sql đã tải
□ Chạy lệnh import
□ Verify số lượng sản phẩm (55 total)
□ Test query 1-2 sản phẩm
□ Test API endpoint /api/products
□ Frontend hiển thị đúng
```

---

## 🎯 Next Steps

**Sau khi import xong:**

1. ✅ Test API
```bash
curl http://localhost:3001/api/products?limit=50
```

2. ✅ Test Frontend
```bash
npm run dev
# Open: http://localhost:5173/products
```

3. ✅ Add Reviews (optional)
```sql
-- Tạo reviews cho sản phẩm mới
INSERT INTO reviews (product_id, user_id, rating, title, comment)
VALUES (6, 2, 5, 'Sản phẩm tốt!', 'Máy chạy êm, bơm khỏe...');
```

4. ✅ Add Images (optional)
- Replace Unsplash URLs với hình ảnh thật
- Upload lên server/CDN

---

**Perfect! Bây giờ bạn có 50+ sản phẩm từ bảng giá thật! 🎉**
