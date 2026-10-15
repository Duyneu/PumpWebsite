# HƯỚNG DẪN IMPORT SẢN PHẨM DONGYIN PUMP

## Tổng Quan

Database hiện đã được mở rộng với **120 sản phẩm mới** từ catalog DONGYIN PUMP bao gồm:

### Danh Mục Sản Phẩm

**Part 1** (50 sản phẩm) - File: `seed-products-dongyin-complete.sql`
1. **QS Series** - Bơm điện chìm QS (14 sản phẩm)
   - QSD Models (220V - có phao): 8 models
   - QS Models (220V - không phao): 3 models  
   - QS Models (380V): 3 models

2. **WS Series** - Bơm điện chìm nước thải WS (8 sản phẩm)
   - WSD Models (220V - có phao): 5 models
   - WS Models (220V - không phao): 1 model
   - WS Models (380V): 2 models

3. **WQ Series** - Bơm điện chìm nước thải WQ có cánh cắt rác (14 sản phẩm)
   - WQD Models (220V - có phao): 3 models
   - WQ Models (220V - không phao): 3 models
   - WQ Models (380V): 8 models (từ 4HP đến 40HP)

4. **TD Series** - Tủ điện điều khiển (14 sản phẩm)
   - 2.0TD, 2.5TD, 3.0TD, 4.0TD
   - Công suất từ 0.33HP đến 2.0HP

**Part 2** (70 sản phẩm) - File: `seed-products-dongyin-complete-part2.sql`

5. **SD Series** - Bơm chìm hỏa tiễn SD/SDM (20 sản phẩm)
   - 2SDM Series: 2 models
   - 2.5SDM Series: 4 models
   - 3SDM Series: 6 models
   - 3SDM-04 Series: 6 models
   - Ống xả Ø27mm - Ø42mm

6. **4SP Series** - Bơm chìm hỏa tiễn 4SP (15 sản phẩm)
   - 4SPM Series (220V): 7 models
   - 4SPM Series (380V): 3 models
   - 4SP Series (380V): 5 models
   - Công suất từ 1HP đến 10HP

7. **6SR/6SP Series** - Bơm chìm hỏa tiễn 6 inch (23 sản phẩm)
   - 6SR Series (380V): 8 models
   - 6SP Series (220V): 2 models
   - 6SP Series (380V): 13 models
   - Công suất từ 3HP đến 20HP
   - Lưu lượng lớn: 18m³/h - 78m³/h

8. **4DP Series** - Bơm năng lượng mặt trời (12 sản phẩm)
   - Công suất: 1100W, 1300W, 1500W
   - Điện áp: 110V DC
   - Bao gồm hộp tự điều khiển

## Thông Tin Kỹ Thuật

### Categories Mới
```
- Máy Bơm Chìm QS Series
- Máy Bơm Chìm WS Series  
- Máy Bơm Chìm WQ Series
- Máy Bơm Hỏa Tiễn SD Series
- Máy Bơm Hỏa Tiễn 4SD/4SP Series
- Máy Bơm Hỏa Tiễn 6SR/6SP Series
- Máy Bơm Năng Lượng Mặt Trời
- Tủ Điện TD Series
```

### Thông Số Chính
- **Brand**: DONGYIN
- **Origin**: Trung Quốc
- **Warranty**: 12 tháng
- **Price**: Từ 190,000 VND (tủ điện) đến 88,000,000 VND (WQ400-13-30GN)
- **Voltage**: 220V, 380V, 110V DC
- **Power**: Từ 0.25KW đến 30KW

### JSON Specifications
Mỗi sản phẩm có thông số kỹ thuật đầy đủ trong JSON format:
```json
{
  "power_hp": "5.5HP",
  "power_kw": "4.0KW",
  "voltage": "380V",
  "outlet_size": "Ø60mm",
  "flow_rates": ["48m³/h @ 24m", "25m³/h @ 50m", "18m³/h @ 54m"],
  "max_flow": "48 m³/h",
  "max_head": "54m",
  "series": "QS",
  "has_float": false,
  "application": "Công nghiệp"
}
```

## Cách Import

### Bước 1: Backup Database
```bash
mysqldump -u root -p voltor_db > backup_before_dongyin_$(date +%Y%m%d).sql
```

### Bước 2: Import Categories và Part 1
```bash
mysql -u root -p voltor_db < /database/seed-products-dongyin-complete.sql
```

### Bước 3: Import Part 2
```bash
mysql -u root -p voltor_db < /database/seed-products-dongyin-complete-part2.sql
```

### Bước 4: Kiểm Tra
```sql
-- Đếm tổng số sản phẩm
SELECT COUNT(*) as total_products FROM products;

-- Đếm theo brand
SELECT brand, COUNT(*) as count 
FROM products 
WHERE brand = 'DONGYIN' 
GROUP BY brand;

-- Đếm theo series
SELECT 
  JSON_EXTRACT(specifications, '$.series') as series,
  COUNT(*) as count
FROM products
WHERE brand = 'DONGYIN'
GROUP BY series
ORDER BY count DESC;

-- Kiểm tra giá cao nhất và thấp nhất
SELECT name, price 
FROM products 
WHERE brand = 'DONGYIN'
ORDER BY price DESC 
LIMIT 5;

SELECT name, price 
FROM products 
WHERE brand = 'DONGYIN'
ORDER BY price ASC 
LIMIT 5;
```

## Features

### 1. Phân Loại Chi Tiết
- Series rõ ràng: QS, WS, WQ, SD, 4SP, 6SR/6SP, 4DP, TD
- Điện áp rõ ràng: 220V, 380V, 110V DC
- Có/không có phao tự động
- Phân biệt công nghiệp/dân dụng

### 2. Thông Số Đầy Đủ
- Power (HP và KW)
- Flow rates với nhiều điểm đo
- Max head (cột áp tối đa)
- Outlet size (kích thước ống xả)
- Application (ứng dụng)

### 3. SEO & Marketing
- Tên sản phẩm chi tiết
- Short description hấp dẫn
- Description đầy đủ tính năng
- Keywords phù hợp

### 4. Images
- Sử dụng Unsplash images chất lượng cao
- Phân biệt theo loại:
  - Bơm chìm: pump images
  - Bơm hỏa tiễn: deep well pump images
  - Tủ điện: electrical panel images
  - Solar: solar panel images

### 5. Stock & Featured
- Stock: từ 1-50 units
- Featured: các model phổ biến
- Bestseller: các model bán chạy
- New: các model 380V và solar

## Giá Trị Kinh Doanh

### Tầm Giá
1. **Phân Khúc Phổ Thông** (< 3 triệu)
   - TD Series: 190k - 250k
   - SD Series nhỏ: 1.5tr - 3tr
   - QS/WS Series nhỏ: 1.5tr - 3.5tr

2. **Phân Khúc Trung Cấp** (3-10 triệu)
   - QS/WS/WQ Series lớn: 3tr - 7tr
   - SD/4SP Series: 3tr - 10tr
   - 4DP Solar: 5.3tr (tất cả)

3. **Phân Khúc Cao Cấp** (10-30 triệu)
   - 6SR/6SP Series: 6tr - 27tr
   - WQ công nghiệp lớn: 11tr - 25tr

4. **Phân Khúc Đặc Biệt** (> 30 triệu)
   - WQ400-13-30GN: 88tr (công suất lớn nhất)
   - WQ200-21-22GN: 52tr

### Target Market
- Gia đình: SD Series, QS nhỏ, 4DP Solar
- Nông nghiệp: WS, WQ, 4DP Solar
- Công nghiệp nhỏ: WQ, 6SP 220V
- Công nghiệp lớn: 6SR, 6SP 380V, WQ lớn
- Xây dựng: QS, WS, WQ
- Năng lượng xanh: 4DP Series

## Lưu Ý

1. **Giá đã bao gồm**:
   - Máy bơm
   - Tủ điện TD: chỉ tủ điều khiển
   - 4DP Solar: bao gồm hộp tự điều khiển

2. **Giá chưa bao gồm**:
   - Motor riêng (nếu khách hàng muốn)
   - Phụ kiện lắp đặt
   - Vận chuyển

3. **Tư vấn kỹ thuật**:
   - Khách hàng cần tư vấn về motor riêng
   - Tư vấn về panel solar cho 4DP Series
   - Hướng dẫn lắp đặt

## Next Steps

1. ✅ Import categories
2. ✅ Import Part 1 (50 products)
3. ✅ Import Part 2 (70 products)
4. ⏳ Cập nhật hình ảnh thực tế (nếu có)
5. ⏳ Tạo reviews mẫu
6. ⏳ Thiết lập combo deals
7. ⏳ Tạo content marketing

## Tổng Kết

**Tổng Số Sản Phẩm DONGYIN**: 120 sản phẩm
- Part 1: 50 sản phẩm (QS, WS, WQ, TD)
- Part 2: 70 sản phẩm (SD, 4SP, 6SR/6SP, 4DP)

**Giá Trị Database**:
- Tổng giá trị kho (nếu mỗi model 1 unit): ~1.2 tỷ VND
- Danh mục phong phú: 8 series chính
- Phù hợp mọi phân khúc khách hàng
- Đầy đủ thông tin kỹ thuật

---

**Ngày tạo**: 05/02/2026
**Effective Date**: 01/05/2025 (theo catalog)
**Version**: 1.0
