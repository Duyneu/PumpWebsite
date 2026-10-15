-- ============================================
-- DONGYIN PUMP - Complete Product Catalog (PART 2)
-- Date: 01/05/2025 (Pricing effective date)
-- ============================================
-- SD Series, 4SDM, 4SD, 4SP, 6SR/6SP, 4DP
-- ============================================

-- ============================================
-- SD SERIES - BƠM CHÌM HỎA TIỄN SD/SDM (220V)
-- ============================================

INSERT INTO products (name, slug, sku, category_id, price, brand, model, origin, warranty, short_description, description, specifications, image, stock, is_featured, is_bestseller) VALUES

-- 2SDM Series (220V)

-- 2SDM-0.7/32
('Bơm Chìm Hỏa Tiễn 2SDM-0.7/32 (1/3HP 0.25KW 220V)', 'bom-chim-hoa-tien-2sdm-07-32', '2SDM-0.7/32',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
2000000, 'DONGYIN', '2SDM-0.7/32', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 2SDM-0.7/32 công suất 1/3HP (0.25KW), điện áp 220V, ống xả Ø27mm',
'Bơm chìm hỏa tiễn SD Series được thiết kế cho giếng khoan sâu, giếng ống nhỏ. Động cơ ngâm nước toàn bộ, trục inox 304, cánh bơm đồng hoặc inox. Phù hợp cho cấp nước sinh hoạt, tưới tiêu.',
JSON_OBJECT(
    'power_hp', '1/3HP',
    'power_kw', '0.25KW',
    'voltage', '220V',
    'outlet_size', 'Ø27mm',
    'flow_rates', JSON_ARRAY('0.36m³/h @ 33m', '0.72m³/h @ 25m', '1.1m³/h @ 14m'),
    'max_flow', '1.1 m³/h',
    'max_head', '33m',
    'series', '2SDM',
    'application', 'Giếng khoan sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 15, true, true),

-- 2SDM-0.7/38
('Bơm Chìm Hỏa Tiễn 2SDM-0.7/38 (1/3HP 0.37KW 220V)', 'bom-chim-hoa-tien-2sdm-07-38', '2SDM-0.7/38',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
2200000, 'DONGYIN', '2SDM-0.7/38', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 2SDM-0.7/38 công suất 1/3HP (0.37KW), điện áp 220V, ống xả Ø27mm',
'Bơm chìm hỏa tiễn 2SDM với cột áp cao 39m, phù hợp cho giếng sâu. Thiết kế nhỏ gọn cho giếng ống Ø60mm trở lên.',
JSON_OBJECT(
    'power_hp', '1/3HP',
    'power_kw', '0.37KW',
    'voltage', '220V',
    'outlet_size', 'Ø27mm',
    'flow_rates', JSON_ARRAY('0.36m³/h @ 39m', '0.72m³/h @ 30m', '1.1m³/h @ 17m'),
    'max_flow', '1.1 m³/h',
    'max_head', '39m',
    'series', '2SDM',
    'application', 'Giếng khoan sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 12, true, true),

-- 2.5SDM Series

-- 2.5SDM-1.5/12
('Bơm Chìm Hỏa Tiễn 2.5SDM-1.5/12 (2/3HP 0.25KW 220V)', 'bom-chim-hoa-tien-25sdm-15-12', '2.5SDM-1.5/12',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
1580000, 'DONGYIN', '2.5SDM-1.5/12', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 2.5SDM-1.5/12 công suất 2/3HP (0.25KW), điện áp 220V, ống xả Ø34mm',
'Bơm chìm hỏa tiễn 2.5SDM với lưu lượng 2.5m³/h, phù hợp cho cấp nước sinh hoạt gia đình, tưới tiêu vườn tược.',
JSON_OBJECT(
    'power_hp', '2/3HP',
    'power_kw', '0.25KW',
    'voltage', '220V',
    'outlet_size', 'Ø34mm',
    'flow_rates', JSON_ARRAY('0.6m³/h @ 28m', '1.5m³/h @ 20m', '2.5m³/h @ 5m'),
    'max_flow', '2.5 m³/h',
    'max_head', '28m',
    'series', '2.5SDM',
    'application', 'Giếng khoan, cấp nước sinh hoạt'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 20, true, false),

-- 2.5SDM-1.5/17
('Bơm Chìm Hỏa Tiễn 2.5SDM-1.5/17 (1/2HP 0.37KW 220V)', 'bom-chim-hoa-tien-25sdm-15-17', '2.5SDM-1.5/17',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
1780000, 'DONGYIN', '2.5SDM-1.5/17', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 2.5SDM-1.5/17 công suất 1/2HP (0.37KW), điện áp 220V, ống xả Ø34mm',
'Bơm chìm hỏa tiễn 2.5SDM với cột áp 39m, lưu lượng 2.5m³/h. Model phổ biến cho gia đình.',
JSON_OBJECT(
    'power_hp', '1/2HP',
    'power_kw', '0.37KW',
    'voltage', '220V',
    'outlet_size', 'Ø34mm',
    'flow_rates', JSON_ARRAY('0.6m³/h @ 39m', '1.5m³/h @ 29m', '2.5m³/h @ 7m'),
    'max_flow', '2.5 m³/h',
    'max_head', '39m',
    'series', '2.5SDM',
    'application', 'Giếng khoan, cấp nước sinh hoạt'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 18, true, true),

-- 2.5SDM-1.5/24
('Bơm Chìm Hỏa Tiễn 2.5SDM-1.5/24 (3/4HP 0.55KW 220V)', 'bom-chim-hoa-tien-25sdm-15-24', '2.5SDM-1.5/24',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
2050000, 'DONGYIN', '2.5SDM-1.5/24', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 2.5SDM-1.5/24 công suất 3/4HP (0.55KW), điện áp 220V, ống xả Ø34mm',
'Bơm chìm hỏa tiễn 2.5SDM với cột áp cao 56m, phù hợp cho giếng sâu, tưới tiêu.',
JSON_OBJECT(
    'power_hp', '3/4HP',
    'power_kw', '0.55KW',
    'voltage', '220V',
    'outlet_size', 'Ø34mm',
    'flow_rates', JSON_ARRAY('0.6m³/h @ 56m', '1.5m³/h @ 40m', '2.5m³/h @ 10m'),
    'max_flow', '2.5 m³/h',
    'max_head', '56m',
    'series', '2.5SDM',
    'application', 'Giếng khoan sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 15, false, false),

-- 2.5SDM-1.5/31
('Bơm Chìm Hỏa Tiễn 2.5SDM-1.5/31 (1.0HP 0.75KW 220V)', 'bom-chim-hoa-tien-25sdm-15-31', '2.5SDM-1.5/31',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
2400000, 'DONGYIN', '2.5SDM-1.5/31', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 2.5SDM-1.5/31 công suất 1.0HP (0.75KW), điện áp 220V, ống xả Ø34mm',
'Bơm chìm hỏa tiễn 2.5SDM với cột áp cực cao 77m, model mạnh nhất dòng 2.5SDM.',
JSON_OBJECT(
    'power_hp', '1.0HP',
    'power_kw', '0.75KW',
    'voltage', '220V',
    'outlet_size', 'Ø34mm',
    'flow_rates', JSON_ARRAY('0.6m³/h @ 77m', '1.5m³/h @ 52m', '2.5m³/h @ 13m'),
    'max_flow', '2.5 m³/h',
    'max_head', '77m',
    'series', '2.5SDM',
    'application', 'Giếng khoan rất sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 10, false, false),

-- 3SDM Series

-- 3SDM-03/11
('Bơm Chìm Hỏa Tiễn 3SDM-03/11 (1/2HP 0.37KW 220V)', 'bom-chim-hoa-tien-3sdm-03-11', '3SDM-03/11',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
1680000, 'DONGYIN', '3SDM-03/11', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-03/11 công suất 1/2HP (0.37KW), điện áp 220V, lưu lượng 3m³/h',
'Bơm chìm hỏa tiễn 3SDM với lưu lượng 3m³/h, phù hợp cho cấp nước sinh hoạt, tưới tiêu vườn.',
JSON_OBJECT(
    'power_hp', '1/2HP',
    'power_kw', '0.37KW',
    'voltage', '220V',
    'outlet_size', 'Ø34mm',
    'flow_rates', JSON_ARRAY('1.8m³/h @ 39m', '3.0m³/h @ 28m', '3.9m³/h @ 11m'),
    'max_flow', '3.9 m³/h',
    'max_head', '39m',
    'series', '3SDM',
    'application', 'Cấp nước sinh hoạt'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 18, true, false),

-- 3SDM-03/16
('Bơm Chìm Hỏa Tiễn 3SDM-03/16 (3/4HP 0.55KW 220V)', 'bom-chim-hoa-tien-3sdm-03-16', '3SDM-03/16',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
2150000, 'DONGYIN', '3SDM-03/16', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-03/16 công suất 3/4HP (0.55KW), điện áp 220V, lưu lượng 3m³/h',
'Bơm chìm hỏa tiễn 3SDM với cột áp 57m, lưu lượng 3m³/h. Phù hợp cho giếng khoan sâu vừa.',
JSON_OBJECT(
    'power_hp', '3/4HP',
    'power_kw', '0.55KW',
    'voltage', '220V',
    'outlet_size', 'Ø34mm',
    'flow_rates', JSON_ARRAY('1.8m³/h @ 57m', '3.0m³/h @ 41m', '3.9m³/h @ 17m'),
    'max_flow', '3.9 m³/h',
    'max_head', '57m',
    'series', '3SDM',
    'application', 'Giếng khoan sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 15, true, false),

-- 3SDM-03/21
('Bơm Chìm Hỏa Tiễn 3SDM-03/21 (1.0HP 0.75KW 220V)', 'bom-chim-hoa-tien-3sdm-03-21', '3SDM-03/21',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
2450000, 'DONGYIN', '3SDM-03/21', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-03/21 công suất 1.0HP (0.75KW), điện áp 220V, lưu lượng 3m³/h',
'Bơm chìm hỏa tiễn 3SDM 1HP với cột áp 74m, lưu lượng 3m³/h. Model phổ biến cho nhiều ứng dụng.',
JSON_OBJECT(
    'power_hp', '1.0HP',
    'power_kw', '0.75KW',
    'voltage', '220V',
    'outlet_size', 'Ø34mm',
    'flow_rates', JSON_ARRAY('1.8m³/h @ 74m', '3.0m³/h @ 53m', '3.9m³/h @ 23m'),
    'max_flow', '3.9 m³/h',
    'max_head', '74m',
    'series', '3SDM',
    'application', 'Giếng khoan sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 12, false, false),

-- 3SDM-03/26
('Bơm Chìm Hỏa Tiễn 3SDM-03/26 (1.25HP 0.92KW 220V)', 'bom-chim-hoa-tien-3sdm-03-26', '3SDM-03/26',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
2760000, 'DONGYIN', '3SDM-03/26', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-03/26 công suất 1.25HP (0.92KW), điện áp 220V, lưu lượng 3m³/h',
'Bơm chìm hỏa tiễn 3SDM 1.25HP với cột áp cao 92m, phù hợp cho giếng rất sâu.',
JSON_OBJECT(
    'power_hp', '1.25HP',
    'power_kw', '0.92KW',
    'voltage', '220V',
    'outlet_size', 'Ø34mm',
    'flow_rates', JSON_ARRAY('1.8m³/h @ 92m', '3.0m³/h @ 66m', '3.9m³/h @ 28m'),
    'max_flow', '3.9 m³/h',
    'max_head', '92m',
    'series', '3SDM',
    'application', 'Giếng khoan rất sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 10, false, false),

-- 3SDM-03/31
('Bơm Chìm Hỏa Tiễn 3SDM-03/31 (1.5HP 1.1KW 220V)', 'bom-chim-hoa-tien-3sdm-03-31', '3SDM-03/31',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
3150000, 'DONGYIN', '3SDM-03/31', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-03/31 công suất 1.5HP (1.1KW), điện áp 220V, lưu lượng 3m³/h',
'Bơm chìm hỏa tiễn 3SDM 1.5HP với cột áp cực cao 110m, lưu lượng 3m³/h.',
JSON_OBJECT(
    'power_hp', '1.5HP',
    'power_kw', '1.1KW',
    'voltage', '220V',
    'outlet_size', 'Ø34mm',
    'flow_rates', JSON_ARRAY('1.8m³/h @ 110m', '3.0m³/h @ 79m', '3.9m³/h @ 34m'),
    'max_flow', '3.9 m³/h',
    'max_head', '110m',
    'series', '3SDM',
    'application', 'Giếng khoan cực sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 8, false, false),

-- 3SDM-03/37
('Bơm Chìm Hỏa Tiễn 3SDM-03/37 (2.0HP 1.5KW 220V)', 'bom-chim-hoa-tien-3sdm-03-37', '3SDM-03/37',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
3550000, 'DONGYIN', '3SDM-03/37', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-03/37 công suất 2.0HP (1.5KW), điện áp 220V, lưu lượng 3m³/h',
'Bơm chìm hỏa tiễn 3SDM 2HP - model mạnh nhất dòng 3SDM với cột áp 131m.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'outlet_size', 'Ø34mm',
    'flow_rates', JSON_ARRAY('1.8m³/h @ 131m', '3.0m³/h @ 94m', '3.9m³/h @ 40m'),
    'max_flow', '3.9 m³/h',
    'max_head', '131m',
    'series', '3SDM',
    'application', 'Giếng khoan cực sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 6, false, false),

-- 4SDM Series (3SDM-04 models - larger flow)

-- 3SDM-04/09
('Bơm Chìm Hỏa Tiễn 3SDM-04/09 (1/2HP 0.37KW 220V) 4.2m³/h', 'bom-chim-hoa-tien-3sdm-04-09', '3SDM-04/09',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
1860000, 'DONGYIN', '3SDM-04/09', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-04/09 công suất 1/2HP (0.37KW), điện áp 220V, lưu lượng 4.2m³/h',
'Bơm chìm hỏa tiễn 3SDM-04 với lưu lượng lớn 5.4m³/h, ống xả Ø42mm. Phù hợp cho cấp nước lớn.',
JSON_OBJECT(
    'power_hp', '1/2HP',
    'power_kw', '0.37KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('3.0m³/h @ 32m', '4.2m³/h @ 24m', '5.4m³/h @ 12m'),
    'max_flow', '5.4 m³/h',
    'max_head', '32m',
    'series', '3SDM-04',
    'application', 'Cấp nước lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 15, false, false),

-- 3SDM-04/12
('Bơm Chìm Hỏa Tiễn 3SDM-04/12 (3/4HP 0.55KW 220V) 4.2m³/h', 'bom-chim-hoa-tien-3sdm-04-12', '3SDM-04/12',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
2100000, 'DONGYIN', '3SDM-04/12', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-04/12 công suất 3/4HP (0.55KW), điện áp 220V, lưu lượng 4.2m³/h',
'Bơm chìm hỏa tiễn 3SDM-04 với cột áp 42m, lưu lượng 5.4m³/h.',
JSON_OBJECT(
    'power_hp', '3/4HP',
    'power_kw', '0.55KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('3.0m³/h @ 42m', '4.2m³/h @ 32m', '5.4m³/h @ 15m'),
    'max_flow', '5.4 m³/h',
    'max_head', '42m',
    'series', '3SDM-04',
    'application', 'Cấp nước lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 12, false, false),

-- 3SDM-04/16
('Bơm Chìm Hỏa Tiễn 3SDM-04/16 (1.0HP 0.75KW 220V) 4.2m³/h', 'bom-chim-hoa-tien-3sdm-04-16', '3SDM-04/16',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
2360000, 'DONGYIN', '3SDM-04/16', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-04/16 công suất 1.0HP (0.75KW), điện áp 220V, lưu lượng 4.2m³/h',
'Bơm chìm hỏa tiễn 3SDM-04 1HP với cột áp 56m, lưu lượng 5.4m³/h.',
JSON_OBJECT(
    'power_hp', '1.0HP',
    'power_kw', '0.75KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('3.0m³/h @ 56m', '4.2m³/h @ 42m', '5.4m³/h @ 21m'),
    'max_flow', '5.4 m³/h',
    'max_head', '56m',
    'series', '3SDM-04',
    'application', 'Cấp nước lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 10, false, false),

-- 3SDM-04/20
('Bơm Chìm Hỏa Tiễn 3SDM-04/20 (1.25HP 0.92KW 220V) 4.2m³/h', 'bom-chim-hoa-tien-3sdm-04-20', '3SDM-04/20',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
2700000, 'DONGYIN', '3SDM-04/20', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-04/20 công suất 1.25HP (0.92KW), điện áp 220V, lưu lượng 4.2m³/h',
'Bơm chìm hỏa tiễn 3SDM-04 1.25HP với cột áp 70m, lưu lượng 5.4m³/h.',
JSON_OBJECT(
    'power_hp', '1.25HP',
    'power_kw', '0.92KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('3.0m³/h @ 70m', '4.2m³/h @ 53m', '5.4m³/h @ 25m'),
    'max_flow', '5.4 m³/h',
    'max_head', '70m',
    'series', '3SDM-04',
    'application', 'Cấp nước lớn, giếng sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 8, false, false),

-- 3SDM-04/24
('Bơm Chìm Hỏa Tiễn 3SDM-04/24 (1.5HP 1.1KW 220V) 4.2m³/h', 'bom-chim-hoa-tien-3sdm-04-24', '3SDM-04/24',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
3050000, 'DONGYIN', '3SDM-04/24', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-04/24 công suất 1.5HP (1.1KW), điện áp 220V, lưu lượng 4.2m³/h',
'Bơm chìm hỏa tiễn 3SDM-04 1.5HP với cột áp 84m, lưu lượng 5.4m³/h.',
JSON_OBJECT(
    'power_hp', '1.5HP',
    'power_kw', '1.1KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('3.0m³/h @ 84m', '4.2m³/h @ 63m', '5.4m³/h @ 31m'),
    'max_flow', '5.4 m³/h',
    'max_head', '84m',
    'series', '3SDM-04',
    'application', 'Cấp nước lớn, giếng sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 6, false, false),

-- 3SDM-04/28
('Bơm Chìm Hỏa Tiễn 3SDM-04/28 (2.0HP 1.5KW 220V) 4.2m³/h', 'bom-chim-hoa-tien-3sdm-04-28', '3SDM-04/28',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-sd-series' LIMIT 1),
3450000, 'DONGYIN', '3SDM-04/28', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 3SDM-04/28 công suất 2.0HP (1.5KW), điện áp 220V, lưu lượng 4.2m³/h',
'Bơm chìm hỏa tiễn 3SDM-04 2HP - model mạnh nhất với cột áp 98m, lưu lượng 5.4m³/h.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('3.0m³/h @ 98m', '4.2m³/h @ 74m', '5.4m³/h @ 36m'),
    'max_flow', '5.4 m³/h',
    'max_head', '98m',
    'series', '3SDM-04',
    'application', 'Cấp nước lớn, giếng rất sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 5, false, false);


-- ============================================
-- 4SP SERIES - BƠM CHÌM HỎA TIỄN 4SP (220V/380V)
-- ============================================

INSERT INTO products (name, slug, sku, category_id, price, brand, model, origin, warranty, short_description, description, specifications, image, stock, is_featured, is_new) VALUES

-- 4SPM Series (220V)

-- 4SPM-03/12
('Bơm Chìm Hỏa Tiễn 4SPM-03/12 (1.0HP 0.75KW 220V)', 'bom-chim-hoa-tien-4spm-03-12', '4SPM-03/12',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
4000000, 'DONGYIN', '4SPM-03/12', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SPM-03/12 công suất 1.0HP (0.75KW), điện áp 220V, lưu lượng 3m³/h',
'Bơm chìm hỏa tiễn 4SP Series công nghệ tiên tiến, hiệu suất cao, độ bền vượt trội. Phù hợp cho giếng khoan sâu, cấp nước công trình lớn.',
JSON_OBJECT(
    'power_hp', '1.0HP',
    'power_kw', '0.75KW',
    'voltage', '220V',
    'flow_rates', JSON_ARRAY('1.8m³/h @ 64m', '3.0m³/h @ 52m', '4.2m³/h @ 31m'),
    'max_flow', '4.2 m³/h',
    'max_head', '64m',
    'series', '4SPM',
    'application', 'Giếng khoan sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 10, true, false),

-- 4SPM-03/08
('Bơm Chìm Hỏa Tiễn 4SPM-03/08 (1.0HP 0.75KW 220V)', 'bom-chim-hoa-tien-4spm-03-08', '4SPM-03/08',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
3700000, 'DONGYIN', '4SPM-03/08', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SPM-03/08 công suất 1.0HP (0.75KW), điện áp 220V, lưu lượng lớn',
'Bơm chìm hỏa tiễn 4SPM-03/08 với lưu lượng lớn 6.6m³/h, phù hợp cho cấp nước với lưu lượng cao.',
JSON_OBJECT(
    'power_hp', '1.0HP',
    'power_kw', '0.75KW',
    'voltage', '220V',
    'flow_rates', JSON_ARRAY('1.8m³/h @ 44m', '4.8m³/h @ 32m', '6.6m³/h @ 20m'),
    'max_flow', '6.6 m³/h',
    'max_head', '44m',
    'series', '4SPM',
    'application', 'Cấp nước lưu lượng lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 8, true, false),

-- 4SPM-03/18
('Bơm Chìm Hỏa Tiễn 4SPM-03/18 (1.5HP 1.1KW 220V)', 'bom-chim-hoa-tien-4spm-03-18', '4SPM-03/18',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
5000000, 'DONGYIN', '4SPM-03/18', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SPM-03/18 công suất 1.5HP (1.1KW), điện áp 220V, cột áp cao',
'Bơm chìm hỏa tiễn 4SPM 1.5HP với cột áp cao 96m, lưu lượng 4.2m³/h.',
JSON_OBJECT(
    'power_hp', '1.5HP',
    'power_kw', '1.1KW',
    'voltage', '220V',
    'flow_rates', JSON_ARRAY('1.8m³/h @ 96m', '3.0m³/h @ 78m', '4.2m³/h @ 47m'),
    'max_flow', '4.2 m³/h',
    'max_head', '96m',
    'series', '4SPM',
    'application', 'Giếng khoan rất sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 6, false, false),

-- 4SPM-05/12
('Bơm Chìm Hỏa Tiễn 4SPM-05/12 (1.5HP 1.1KW 220V) 4.8m³/h', 'bom-chim-hoa-tien-4spm-05-12', '4SPM-05/12',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
4400000, 'DONGYIN', '4SPM-05/12', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SPM-05/12 công suất 1.5HP (1.1KW), điện áp 220V, lưu lượng 4.8m³/h',
'Bơm chìm hỏa tiễn 4SPM-05 với lưu lượng lớn 6.6m³/h, cột áp 66m.',
JSON_OBJECT(
    'power_hp', '1.5HP',
    'power_kw', '1.1KW',
    'voltage', '220V',
    'flow_rates', JSON_ARRAY('3.0m³/h @ 66m', '4.8m³/h @ 48m', '6.6m³/h @ 31m'),
    'max_flow', '6.6 m³/h',
    'max_head', '66m',
    'series', '4SPM',
    'application', 'Cấp nước lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 5, false, false),

-- 4SPM-03/25
('Bơm Chìm Hỏa Tiễn 4SPM-03/25 (2.0HP 1.5KW 220V)', 'bom-chim-hoa-tien-4spm-03-25', '4SPM-03/25',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
6100000, 'DONGYIN', '4SPM-03/25', 'Trung Quốc', '12 tháng',
'Bơm Chìm Hỏa Tiễn 4SPM-03/25 công suất 2.0HP (1.5KW), điện áp 220V, cột áp cao',
'Bơm chìm hỏa tiễn 4SPM 2HP với cột áp cực cao 113m, lưu lượng 4.2m³/h.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'flow_rates', JSON_ARRAY('1.8m³/h @ 113m', '3.0m³/h @ 108m', '4.2m³/h @ 65m'),
    'max_flow', '4.2 m³/h',
    'max_head', '113m',
    'series', '4SPM',
    'application', 'Giếng khoan cực sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 4, false, false),

-- 4SPM-05/17
('Bơm Chìm Hỏa Tiễn 4SPM-05/17 (2.0HP 1.5KW 220V) 4.8m³/h', 'bom-chim-hoa-tien-4spm-05-17', '4SPM-05/17',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
5400000, 'DONGYIN', '4SPM-05/17', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SPM-05/17 công suất 2.0HP (1.5KW), điện áp 220V, lưu lượng 4.8m³/h',
'Bơm chìm hỏa tiễn 4SPM-05 2HP với lưu lượng lớn 6.6m³/h, cột áp 95m.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'flow_rates', JSON_ARRAY('3.0m³/h @ 95m', '4.8m³/h @ 69m', '6.6m³/h @ 44m'),
    'max_flow', '6.6 m³/h',
    'max_head', '95m',
    'series', '4SPM',
    'application', 'Cấp nước lớn, giếng sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 4, false, false),

-- 4SPM-08/10
('Bơm Chìm Hỏa Tiễn 4SPM-08/10 (2.0HP 1.5KW 220V) 7.2m³/h', 'bom-chim-hoa-tien-4spm-08-10', '4SPM-08/10',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
5900000, 'DONGYIN', '4SPM-08/10', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SPM-08/10 công suất 2.0HP (1.5KW), điện áp 220V, lưu lượng lớn 7.2m³/h',
'Bơm chìm hỏa tiễn 4SPM-08 với lưu lượng rất lớn 10.8m³/h, phù hợp cho cấp nước công trình lớn.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'flow_rates', JSON_ARRAY('3.6m³/h @ 52m', '7.2m³/h @ 44m', '10.8m³/h @ 25m'),
    'max_flow', '10.8 m³/h',
    'max_head', '52m',
    'series', '4SPM',
    'application', 'Cấp nước lưu lượng rất lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 3, false, false),

-- 4SP Series (380V)

-- 4SPM-10/33 (3.0HP 380V)
('Bơm Chìm Hỏa Tiễn 4SPM-10/33 (3.0HP 2.2KW 380V)', 'bom-chim-hoa-tien-4spm-10-33', '4SPM-10/33',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
7700000, 'DONGYIN', '4SPM-10/33', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SPM-10/33 công suất 3.0HP (2.2KW), điện áp 380V, cột áp cực cao',
'Bơm chìm hỏa tiễn 4SPM 3HP điện áp 380V với cột áp cực cao 177m, lưu lượng 4.2m³/h.',
JSON_OBJECT(
    'power_hp', '3.0HP',
    'power_kw', '2.2KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('1.8m³/h @ 177m', '3.0m³/h @ 143m', '4.2m³/h @ 85m'),
    'max_flow', '4.2 m³/h',
    'max_head', '177m',
    'series', '4SPM',
    'application', 'Giếng khoan siêu sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 3, false, true),

-- 4SPM-05/25
('Bơm Chìm Hỏa Tiễn 4SPM-05/25 (3.0HP 2.2KW 380V) 4.8m³/h', 'bom-chim-hoa-tien-4spm-05-25', '4SPM-05/25',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
7000000, 'DONGYIN', '4SPM-05/25', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SPM-05/25 công suất 3.0HP (2.2KW), điện áp 380V, lưu lượng 4.8m³/h',
'Bơm chìm hỏa tiễn 4SPM-05 3HP với lưu lượng lớn 6.6m³/h, cột áp 125m.',
JSON_OBJECT(
    'power_hp', '3.0HP',
    'power_kw', '2.2KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('3.0m³/h @ 125m', '4.8m³/h @ 101m', '6.6m³/h @ 64m'),
    'max_flow', '6.6 m³/h',
    'max_head', '125m',
    'series', '4SPM',
    'application', 'Cấp nước lớn, giếng rất sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 3, false, true),

-- 4SPM-08/15
('Bơm Chìm Hỏa Tiễn 4SPM-08/15 (3.0HP 2.2KW 380V) 7.2m³/h', 'bom-chim-hoa-tien-4spm-08-15', '4SPM-08/15',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
7700000, 'DONGYIN', '4SPM-08/15', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SPM-08/15 công suất 3.0HP (2.2KW), điện áp 380V, lưu lượng lớn 7.2m³/h',
'Bơm chìm hỏa tiễn 4SPM-08 3HP với lưu lượng rất lớn 10.8m³/h, cột áp 79m.',
JSON_OBJECT(
    'power_hp', '3.0HP',
    'power_kw', '2.2KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('3.6m³/h @ 79m', '7.2m³/h @ 66m', '10.8m³/h @ 38m'),
    'max_flow', '10.8 m³/h',
    'max_head', '79m',
    'series', '4SPM',
    'application', 'Cấp nước lưu lượng rất lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 2, false, true),

-- 4SP-08/25 (5.5HP)
('Bơm Chìm Hỏa Tiễn 4SP-08/25 (5.5HP 4.0KW 380V)', 'bom-chim-hoa-tien-4sp-08-25', '4SP-08/25',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
11600000, 'DONGYIN', '4SP-08/25', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SP-08/25 công suất 5.5HP (4.0KW), điện áp 380V, cột áp cao',
'Bơm chìm hỏa tiễn 4SP 5.5HP với lưu lượng 10.8m³/h, cột áp 131m. Công nghiệp.',
JSON_OBJECT(
    'power_hp', '5.5HP',
    'power_kw', '4.0KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('3.6m³/h @ 131m', '7.2m³/h @ 110m', '10.8m³/h @ 64m'),
    'max_flow', '10.8 m³/h',
    'max_head', '131m',
    'series', '4SP',
    'application', 'Công nghiệp, giếng rất sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 2, false, true),

-- 4SP-14/13 (5.5HP)
('Bơm Chìm Hỏa Tiễn 4SP-14/13 (5.5HP 4.0KW 380V) 14.5m³/h', 'bom-chim-hoa-tien-4sp-14-13', '4SP-14/13',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
9200000, 'DONGYIN', '4SP-14/13', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SP-14/13 công suất 5.5HP (4.0KW), điện áp 380V, lưu lượng lớn 14.5m³/h',
'Bơm chìm hỏa tiễn 4SP-14 với lưu lượng cực lớn 18m³/h, phù hợp cho cấp nước công trình lớn.',
JSON_OBJECT(
    'power_hp', '5.5HP',
    'power_kw', '4.0KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('10.8m³/h @ 63m', '14.5m³/h @ 53m', '18m³/h @ 37m'),
    'max_flow', '18 m³/h',
    'max_head', '63m',
    'series', '4SP',
    'application', 'Cấp nước công trình lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 2, false, true),

-- 4SP-08/36 (7.5HP)
('Bơm Chìm Hỏa Tiễn 4SP-08/36 (7.5HP 5.5KW 380V)', 'bom-chim-hoa-tien-4sp-08-36', '4SP-08/36',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
15100000, 'DONGYIN', '4SP-08/36', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SP-08/36 công suất 7.5HP (5.5KW), điện áp 380V, cột áp cực cao',
'Bơm chìm hỏa tiễn 4SP 7.5HP với cột áp cực cao 189m, lưu lượng 10.8m³/h.',
JSON_OBJECT(
    'power_hp', '7.5HP',
    'power_kw', '5.5KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('3.6m³/h @ 189m', '7.2m³/h @ 158m', '10.8m³/h @ 91m'),
    'max_flow', '10.8 m³/h',
    'max_head', '189m',
    'series', '4SP',
    'application', 'Giếng khoan siêu sâu, công nghiệp'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 4SP-14/18 (7.5HP)
('Bơm Chìm Hỏa Tiễn 4SP-14/18 (7.5HP 5.5KW 380V) 14.5m³/h', 'bom-chim-hoa-tien-4sp-14-18', '4SP-14/18',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
11500000, 'DONGYIN', '4SP-14/18', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SP-14/18 công suất 7.5HP (5.5KW), điện áp 380V, lưu lượng lớn 14.5m³/h',
'Bơm chìm hỏa tiễn 4SP-14 7.5HP với lưu lượng lớn 18m³/h, cột áp 96m.',
JSON_OBJECT(
    'power_hp', '7.5HP',
    'power_kw', '5.5KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('10.8m³/h @ 96m', '14.5m³/h @ 73m', '18m³/h @ 51m'),
    'max_flow', '18 m³/h',
    'max_head', '96m',
    'series', '4SP',
    'application', 'Cấp nước lớn, giếng sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 4SP-14/24 (10HP)
('Bơm Chìm Hỏa Tiễn 4SP-14/24 (10HP 7.5KW 380V) 14.5m³/h', 'bom-chim-hoa-tien-4sp-14-24', '4SP-14/24',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-4sd-4sp-series' LIMIT 1),
15700000, 'DONGYIN', '4SP-14/24', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 4SP-14/24 công suất 10HP (7.5KW), điện áp 380V, lưu lượng lớn 14.5m³/h',
'Bơm chìm hỏa tiễn 4SP-14 10HP - model mạnh mẽ với lưu lượng 18m³/h, cột áp 117m.',
JSON_OBJECT(
    'power_hp', '10HP',
    'power_kw', '7.5KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('10.8m³/h @ 117m', '14.5m³/h @ 97m', '18m³/h @ 68m'),
    'max_flow', '18 m³/h',
    'max_head', '117m',
    'series', '4SP',
    'application', 'Công nghiệp, cấp nước lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true);


-- ============================================
-- 6SR/6SP SERIES - BƠM CHÌM HỎA TIỄN 6SR/6SP (380V)
-- ============================================

INSERT INTO products (name, slug, sku, category_id, price, brand, model, origin, warranty, short_description, description, specifications, image, stock, is_featured, is_new) VALUES

-- 6SR Series (380V)

-- 6SR30-04
('Bơm Chìm Hỏa Tiễn 6SR30-04 (5.5HP 4.0KW 380V)', 'bom-chim-hoa-tien-6sr30-04', '6SR30-04',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
9700000, 'DONGYIN', '6SR30-04', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SR30-04 công suất 5.5HP (4.0KW), điện áp 380V, lưu lượng 30m³/h',
'Bơm chìm hỏa tiễn 6SR Series - dòng sản phẩm cao cấp với đường kính 6 inch, công suất lớn, phù hợp cho các công trình lớn, khu công nghiệp, cấp nước đô thị.',
JSON_OBJECT(
    'power_hp', '5.5HP',
    'power_kw', '4.0KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('20m³/h @ 42m', '30m³/h @ 30m', '40m³/h @ 10m'),
    'max_flow', '40 m³/h',
    'max_head', '42m',
    'series', '6SR',
    'diameter', '6 inch',
    'application', 'Công nghiệp, cấp nước lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 3, true, true),

-- 6SR30-06
('Bơm Chìm Hỏa Tiễn 6SR30-06 (7.5HP 5.5KW 380V)', 'bom-chim-hoa-tien-6sr30-06', '6SR30-06',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
13500000, 'DONGYIN', '6SR30-06', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SR30-06 công suất 7.5HP (5.5KW), điện áp 380V, lưu lượng 30m³/h',
'Bơm chìm hỏa tiễn 6SR 7.5HP với lưu lượng 40m³/h, cột áp 63m. Phù hợp cho cấp nước công nghiệp.',
JSON_OBJECT(
    'power_hp', '7.5HP',
    'power_kw', '5.5KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('20m³/h @ 63m', '30m³/h @ 44m', '40m³/h @ 12m'),
    'max_flow', '40 m³/h',
    'max_head', '63m',
    'series', '6SR',
    'diameter', '6 inch',
    'application', 'Công nghiệp, cấp nước lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 2, true, true),

-- 6SR30-08
('Bơm Chìm Hỏa Tiễn 6SR30-08 (10HP 7.5KW 380V)', 'bom-chim-hoa-tien-6sr30-08', '6SR30-08',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
15300000, 'DONGYIN', '6SR30-08', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SR30-08 công suất 10HP (7.5KW), điện áp 380V, lưu lượng 30m³/h',
'Bơm chìm hỏa tiễn 6SR 10HP với lưu lượng 40m³/h, cột áp cao 85m.',
JSON_OBJECT(
    'power_hp', '10HP',
    'power_kw', '7.5KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('20m³/h @ 85m', '30m³/h @ 58m', '40m³/h @ 16m'),
    'max_flow', '40 m³/h',
    'max_head', '85m',
    'series', '6SR',
    'diameter', '6 inch',
    'application', 'Công nghiệp, giếng sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 2, false, true),

-- 6SR45-05
('Bơm Chìm Hỏa Tiễn 6SR45-05 (10HP 7.5KW 380V) 48m³/h', 'bom-chim-hoa-tien-6sr45-05', '6SR45-05',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
14700000, 'DONGYIN', '6SR45-05', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SR45-05 công suất 10HP (7.5KW), điện áp 380V, lưu lượng lớn 48m³/h',
'Bơm chìm hỏa tiễn 6SR-45 với lưu lượng lớn 60m³/h, cột áp 48m.',
JSON_OBJECT(
    'power_hp', '10HP',
    'power_kw', '7.5KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('36m³/h @ 48m', '48m³/h @ 38m', '60m³/h @ 22m'),
    'max_flow', '60 m³/h',
    'max_head', '48m',
    'series', '6SR',
    'diameter', '6 inch',
    'application', 'Cấp nước lưu lượng lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 2, false, true),

-- 6SR45-07
('Bơm Chìm Hỏa Tiễn 6SR45-07 (15HP 11KW 380V) 48m³/h', 'bom-chim-hoa-tien-6sr45-07', '6SR45-07',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
19300000, 'DONGYIN', '6SR45-07', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SR45-07 công suất 15HP (11KW), điện áp 380V, lưu lượng lớn 48m³/h',
'Bơm chìm hỏa tiễn 6SR-45 15HP với lưu lượng 60m³/h, cột áp 68m.',
JSON_OBJECT(
    'power_hp', '15HP',
    'power_kw', '11KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('36m³/h @ 68m', '48m³/h @ 54m', '60m³/h @ 30m'),
    'max_flow', '60 m³/h',
    'max_head', '68m',
    'series', '6SR',
    'diameter', '6 inch',
    'application', 'Công nghiệp lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SR60-06
('Bơm Chìm Hỏa Tiễn 6SR60-06 (15HP 11KW 380V) 60m³/h', 'bom-chim-hoa-tien-6sr60-06', '6SR60-06',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
18300000, 'DONGYIN', '6SR60-06', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SR60-06 công suất 15HP (11KW), điện áp 380V, lưu lượng lớn 60m³/h',
'Bơm chìm hỏa tiễn 6SR-60 với lưu lượng cực lớn 72m³/h, cột áp 52m.',
JSON_OBJECT(
    'power_hp', '15HP',
    'power_kw', '11KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('48m³/h @ 52m', '60m³/h @ 43m', '72m³/h @ 33m'),
    'max_flow', '72 m³/h',
    'max_head', '52m',
    'series', '6SR',
    'diameter', '6 inch',
    'application', 'Cấp nước lưu lượng cực lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SR45-10
('Bơm Chìm Hỏa Tiễn 6SR45-10 (20HP 15KW 380V) 48m³/h', 'bom-chim-hoa-tien-6sr45-10', '6SR45-10',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
22300000, 'DONGYIN', '6SR45-10', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SR45-10 công suất 20HP (15KW), điện áp 380V, lưu lượng lớn 48m³/h',
'Bơm chìm hỏa tiễn 6SR-45 20HP với lưu lượng 60m³/h, cột áp cao 97m.',
JSON_OBJECT(
    'power_hp', '20HP',
    'power_kw', '15KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('36m³/h @ 97m', '48m³/h @ 77m', '60m³/h @ 45m'),
    'max_flow', '60 m³/h',
    'max_head', '97m',
    'series', '6SR',
    'diameter', '6 inch',
    'application', 'Công nghiệp lớn, giếng sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SR60-08
('Bơm Chìm Hỏa Tiễn 6SR60-08 (20HP 15KW 380V) 60m³/h', 'bom-chim-hoa-tien-6sr60-08', '6SR60-08',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
22100000, 'DONGYIN', '6SR60-08', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SR60-08 công suất 20HP (15KW), điện áp 380V, lưu lượng lớn 60m³/h',
'Bơm chìm hỏa tiễn 6SR-60 20HP với lưu lượng cực lớn 72m³/h, cột áp 69m.',
JSON_OBJECT(
    'power_hp', '20HP',
    'power_kw', '15KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('48m³/h @ 69m', '60m³/h @ 57m', '72m³/h @ 44m'),
    'max_flow', '72 m³/h',
    'max_head', '69m',
    'series', '6SR',
    'diameter', '6 inch',
    'application', 'Công nghiệp lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SP Series (220V & 380V)

-- 6SP18-04 (3HP 220V)
('Bơm Chìm Hỏa Tiễn 6SP18-04 (3.0HP 2.2KW 220V)', 'bom-chim-hoa-tien-6sp18-04-220v', '6SP18-04-220V',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
6300000, 'DONGYIN', '6SP18-04', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP18-04 công suất 3.0HP (2.2KW), điện áp 220V, lưu lượng 18m³/h',
'Bơm chìm hỏa tiễn 6SP Series đường kính 6 inch, phiên bản 220V phù hợp cho gia đình, trang trại.',
JSON_OBJECT(
    'power_hp', '3.0HP',
    'power_kw', '2.2KW',
    'voltage', '220V',
    'flow_rates', JSON_ARRAY('21m³/h @ 23m', '15m³/h @ 35m', '9m³/h @ 42m'),
    'max_flow', '21 m³/h',
    'max_head', '42m',
    'series', '6SP',
    'diameter', '6 inch'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 3, false, false),

-- 6SP18-05 (4HP 220V)
('Bơm Chìm Hỏa Tiễn 6SP18-05 (4.0HP 3.0KW 220V)', 'bom-chim-hoa-tien-6sp18-05-220v', '6SP18-05-220V',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
7600000, 'DONGYIN', '6SP18-05', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP18-05 công suất 4.0HP (3.0KW), điện áp 220V, lưu lượng 18m³/h',
'Bơm chìm hỏa tiễn 6SP 4HP điện áp 220V với lưu lượng 21m³/h, cột áp 52m.',
JSON_OBJECT(
    'power_hp', '4.0HP',
    'power_kw', '3.0KW',
    'voltage', '220V',
    'flow_rates', JSON_ARRAY('21m³/h @ 29m', '15m³/h @ 44m', '9m³/h @ 52m'),
    'max_flow', '21 m³/h',
    'max_head', '52m',
    'series', '6SP',
    'diameter', '6 inch'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 2, false, false),

-- 6SP18-04 (3HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP18-04 (3.0HP 2.2KW 380V)', 'bom-chim-hoa-tien-6sp18-04-380v', '6SP18-04-380V',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
6100000, 'DONGYIN', '6SP18-04', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP18-04 công suất 3.0HP (2.2KW), điện áp 380V, lưu lượng 18m³/h',
'Bơm chìm hỏa tiễn 6SP 3HP điện áp 380V với lưu lượng 21m³/h, cột áp 42m.',
JSON_OBJECT(
    'power_hp', '3.0HP',
    'power_kw', '2.2KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('21m³/h @ 23m', '15m³/h @ 35m', '9m³/h @ 42m'),
    'max_flow', '21 m³/h',
    'max_head', '42m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Công nghiệp nhỏ'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 3, false, true),

-- 6SP18-05 (4HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP18-05 (4.0HP 3.0KW 380V)', 'bom-chim-hoa-tien-6sp18-05-380v', '6SP18-05-380V',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
7400000, 'DONGYIN', '6SP18-05', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP18-05 công suất 4.0HP (3.0KW), điện áp 380V, lưu lượng 18m³/h',
'Bơm chìm hỏa tiễn 6SP 4HP điện áp 380V với lưu lượng 21m³/h, cột áp 52m.',
JSON_OBJECT(
    'power_hp', '4.0HP',
    'power_kw', '3.0KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('21m³/h @ 29m', '15m³/h @ 44m', '9m³/h @ 52m'),
    'max_flow', '21 m³/h',
    'max_head', '52m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Công nghiệp nhỏ'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 2, false, true),

-- 6SP18-07 (5.5HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP18-07 (5.5HP 4.0KW 380V)', 'bom-chim-hoa-tien-6sp18-07', '6SP18-07',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
11000000, 'DONGYIN', '6SP18-07', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP18-07 công suất 5.5HP (4.0KW), điện áp 380V, lưu lượng 18m³/h',
'Bơm chìm hỏa tiễn 6SP 5.5HP với lưu lượng 21m³/h, cột áp cao 73m.',
JSON_OBJECT(
    'power_hp', '5.5HP',
    'power_kw', '4.0KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('21m³/h @ 40m', '15m³/h @ 61m', '9m³/h @ 73m'),
    'max_flow', '21 m³/h',
    'max_head', '73m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Công nghiệp, giếng sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 2, false, true),

-- 6SP18-10 (7.5HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP18-10 (7.5HP 5.5KW 380V)', 'bom-chim-hoa-tien-6sp18-10', '6SP18-10',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
13200000, 'DONGYIN', '6SP18-10', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP18-10 công suất 7.5HP (5.5KW), điện áp 380V, lưu lượng 18m³/h',
'Bơm chìm hỏa tiễn 6SP 7.5HP với lưu lượng 21m³/h, cột áp cực cao 104m.',
JSON_OBJECT(
    'power_hp', '7.5HP',
    'power_kw', '5.5KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('21m³/h @ 58m', '15m³/h @ 87m', '9m³/h @ 104m'),
    'max_flow', '21 m³/h',
    'max_head', '104m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Công nghiệp, giếng rất sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SP18-12 (10HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP18-12 (10HP 7.5KW 380V)', 'bom-chim-hoa-tien-6sp18-12', '6SP18-12',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
15200000, 'DONGYIN', '6SP18-12', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP18-12 công suất 10HP (7.5KW), điện áp 380V, lưu lượng lớn',
'Bơm chìm hỏa tiễn 6SP 10HP với lưu lượng 42m³/h, cột áp cực cao 125m.',
JSON_OBJECT(
    'power_hp', '10HP',
    'power_kw', '7.5KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('18m³/h @ 69m', '30m³/h @ 105m', '42m³/h @ 125m'),
    'max_flow', '42 m³/h',
    'max_head', '125m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Công nghiệp lớn, giếng cực sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SP30-6 (7.5HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP30-6 (7.5HP 5.5KW 380V) 30m³/h', 'bom-chim-hoa-tien-6sp30-6', '6SP30-6',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
15200000, 'DONGYIN', '6SP30-6', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP30-6 công suất 7.5HP (5.5KW), điện áp 380V, lưu lượng lớn 30m³/h',
'Bơm chìm hỏa tiễn 6SP-30 với lưu lượng lớn 60m³/h, cột áp 46m.',
JSON_OBJECT(
    'power_hp', '7.5HP',
    'power_kw', '5.5KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('30m³/h @ 46m', '48m³/h @ 34m', '60m³/h @ 21m'),
    'max_flow', '60 m³/h',
    'max_head', '46m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Cấp nước lưu lượng lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SP30-8 (10HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP30-8 (10HP 7.5KW 380V) 30m³/h', 'bom-chim-hoa-tien-6sp30-8', '6SP30-8',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
17700000, 'DONGYIN', '6SP30-8', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP30-8 công suất 10HP (7.5KW), điện áp 380V, lưu lượng lớn 30m³/h',
'Bơm chìm hỏa tiễn 6SP-30 10HP với lưu lượng 42m³/h, cột áp 81m.',
JSON_OBJECT(
    'power_hp', '10HP',
    'power_kw', '7.5KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('18m³/h @ 77m', '30m³/h @ 81m', '42m³/h @ 28m'),
    'max_flow', '42 m³/h',
    'max_head', '81m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Công nghiệp, cấp nước lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SP46-5 (10HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP46-5 (10HP 7.5KW 380V) 48m³/h', 'bom-chim-hoa-tien-6sp46-5', '6SP46-5',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
18600000, 'DONGYIN', '6SP46-5', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP46-5 công suất 10HP (7.5KW), điện áp 380V, lưu lượng cực lớn 48m³/h',
'Bơm chìm hỏa tiễn 6SP-46 với lưu lượng cực lớn 66m³/h, cột áp 50m.',
JSON_OBJECT(
    'power_hp', '10HP',
    'power_kw', '7.5KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('36m³/h @ 50m', '48m³/h @ 40m', '66m³/h @ 15m'),
    'max_flow', '66 m³/h',
    'max_head', '50m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Cấp nước lưu lượng cực lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SP46-6 (12.5HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP46-6 (12.5HP 9.2KW 380V) 48m³/h', 'bom-chim-hoa-tien-6sp46-6', '6SP46-6',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
17700000, 'DONGYIN', '6SP46-6', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP46-6 công suất 12.5HP (9.2KW), điện áp 380V, lưu lượng cực lớn 48m³/h',
'Bơm chìm hỏa tiễn 6SP-46 12.5HP với lưu lượng 66m³/h, cột áp 60m.',
JSON_OBJECT(
    'power_hp', '12.5HP',
    'power_kw', '9.2KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('36m³/h @ 60m', '48m³/h @ 49m', '66m³/h @ 18m'),
    'max_flow', '66 m³/h',
    'max_head', '60m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Công nghiệp lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SP46-7 (15HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP46-7 (15HP 11KW 380V) 48m³/h', 'bom-chim-hoa-tien-6sp46-7', '6SP46-7',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
21000000, 'DONGYIN', '6SP46-7', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP46-7 công suất 15HP (11KW), điện áp 380V, lưu lượng cực lớn 48m³/h',
'Bơm chìm hỏa tiễn 6SP-46 15HP với lưu lượng 66m³/h, cột áp 70m.',
JSON_OBJECT(
    'power_hp', '15HP',
    'power_kw', '11KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('36m³/h @ 70m', '48m³/h @ 57m', '66m³/h @ 25m'),
    'max_flow', '66 m³/h',
    'max_head', '70m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Công nghiệp lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SP46-10 (20HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP46-10 (20HP 15KW 380V) 48m³/h', 'bom-chim-hoa-tien-6sp46-10', '6SP46-10',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
26200000, 'DONGYIN', '6SP46-10', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP46-10 công suất 20HP (15KW), điện áp 380V, lưu lượng cực lớn 48m³/h',
'Bơm chìm hỏa tiễn 6SP-46 20HP - model mạnh mẽ với lưu lượng 66m³/h, cột áp 100m.',
JSON_OBJECT(
    'power_hp', '20HP',
    'power_kw', '15KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('36m³/h @ 100m', '48m³/h @ 81m', '66m³/h @ 36m'),
    'max_flow', '66 m³/h',
    'max_head', '100m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Công nghiệp lớn, giếng sâu'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SP60-6 (15HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP60-6 (15HP 11KW 380V) 60m³/h', 'bom-chim-hoa-tien-6sp60-6', '6SP60-6',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
20300000, 'DONGYIN', '6SP60-6', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP60-6 công suất 15HP (11KW), điện áp 380V, lưu lượng siêu lớn 60m³/h',
'Bơm chìm hỏa tiễn 6SP-60 với lưu lượng siêu lớn 78m³/h, cột áp 47m.',
JSON_OBJECT(
    'power_hp', '15HP',
    'power_kw', '11KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('48m³/h @ 30m', '60m³/h @ 47m', '78m³/h @ 22m'),
    'max_flow', '78 m³/h',
    'max_head', '47m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Cấp nước siêu lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true),

-- 6SP60-8 (20HP 380V)
('Bơm Chìm Hỏa Tiễn 6SP60-8 (20HP 15KW 380V) 60m³/h', 'bom-chim-hoa-tien-6sp60-8', '6SP60-8',
(SELECT id FROM categories WHERE slug = 'may-bom-hoa-tien-6sr-6sp-series' LIMIT 1),
24700000, 'DONGYIN', '6SP60-8', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn 6SP60-8 công suất 20HP (15KW), điện áp 380V, lưu lượng siêu lớn 60m³/h',
'Bơm chìm hỏa tiễn 6SP-60 20HP - model cao cấp nhất với lưu lượng 78m³/h, cột áp 77m.',
JSON_OBJECT(
    'power_hp', '20HP',
    'power_kw', '15KW',
    'voltage', '380V',
    'flow_rates', JSON_ARRAY('48m³/h @ 77m', '60m³/h @ 63m', '78m³/h @ 29m'),
    'max_flow', '78 m³/h',
    'max_head', '77m',
    'series', '6SP',
    'diameter', '6 inch',
    'application', 'Công nghiệp siêu lớn'
),
'https://images.unsplash.com/photo-1625265524815-f099f9a0b680?w=800', 1, false, true);


-- ============================================
-- 4DP SERIES - BƠM CHÌM HỎA TIỄN NĂNG LƯỢNG MẶT TRỜI (110V DC)
-- ============================================

INSERT INTO products (name, slug, sku, category_id, price, brand, model, origin, warranty, short_description, description, specifications, image, stock, is_featured, is_new) VALUES

-- 4DP 1100W Series

-- 4DP5-100
('Bơm Năng Lượng Mặt Trời 4DP5-100 (1100W 110V DC)', 'bom-nang-luong-mat-troi-4dp5-100', '4DP5-100',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP5-100', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP5-100 công suất 1100W, điện áp 110V DC',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP Series - giải pháp tiết kiệm, thân thiện môi trường. Hoạt động hoàn toàn bằng năng lượng mặt trời, có hộp tự điều khiển tự động. Phù hợp cho vùng nông thôn, miền núi, khu vực không có điện lưới.',
JSON_OBJECT(
    'power_w', '1100W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('1.2m³/h @ 89m', '3.0m³/h @ 63m', '4.8m³/h @ 23m'),
    'max_flow', '4.8 m³/h',
    'max_head', '89m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Khu vực không có điện lưới'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 5, true, true),

-- 4DP6-86
('Bơm Năng Lượng Mặt Trời 4DP6-86 (1100W 110V DC)', 'bom-nang-luong-mat-troi-4dp6-86', '4DP6-86',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP6-86', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP6-86 công suất 1100W, điện áp 110V DC',
'Bơm năng lượng mặt trời 4DP6-86 với lưu lượng lớn 6m³/h, phù hợp cho tưới tiêu nông nghiệp.',
JSON_OBJECT(
    'power_w', '1100W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('2.4m³/h @ 68m', '4.2m³/h @ 53m', '6.0m³/h @ 27m'),
    'max_flow', '6.0 m³/h',
    'max_head', '68m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Tưới tiêu nông nghiệp'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 5, true, true),

-- 4DP8-66
('Bơm Năng Lượng Mặt Trời 4DP8-66 (1100W 110V DC)', 'bom-nang-luong-mat-troi-4dp8-66', '4DP8-66',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP8-66', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP8-66 công suất 1100W, điện áp 110V DC',
'Bơm năng lượng mặt trời 4DP8-66 với lưu lượng lớn 8.1m³/h, cột áp 66m.',
JSON_OBJECT(
    'power_w', '1100W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('3.6m³/h @ 51m', '6.3m³/h @ 34m', '8.1m³/h @ 17m'),
    'max_flow', '8.1 m³/h',
    'max_head', '51m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Tưới tiêu, cấp nước'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 5, true, true),

-- 4DP12-52
('Bơm Năng Lượng Mặt Trời 4DP12-52 (1100W 110V DC)', 'bom-nang-luong-mat-troi-4dp12-52', '4DP12-52',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP12-52', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP12-52 công suất 1100W, điện áp 110V DC',
'Bơm năng lượng mặt trời 4DP12-52 với lưu lượng cực lớn 12m³/h, cột áp 52m.',
JSON_OBJECT(
    'power_w', '1100W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('4.8m³/h @ 33m', '8.4m³/h @ 19m', '12m³/h @ 5m'),
    'max_flow', '12 m³/h',
    'max_head', '33m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Cấp nước lưu lượng lớn'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 5, false, true),

-- 4DP 1300W Series

-- 4DP5-128
('Bơm Năng Lượng Mặt Trời 4DP5-128 (1300W 110V DC)', 'bom-nang-luong-mat-troi-4dp5-128', '4DP5-128',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP5-128', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP5-128 công suất 1300W, điện áp 110V DC',
'Bơm năng lượng mặt trời 4DP5-128 công suất 1300W với cột áp cực cao 118m.',
JSON_OBJECT(
    'power_w', '1300W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('1.2m³/h @ 118m', '3.0m³/h @ 81m', '4.8m³/h @ 28m'),
    'max_flow', '4.8 m³/h',
    'max_head', '118m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Giếng khoan sâu'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 4, false, true),

-- 4DP6-115
('Bơm Năng Lượng Mặt Trời 4DP6-115 (1300W 110V DC)', 'bom-nang-luong-mat-troi-4dp6-115', '4DP6-115',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP6-115', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP6-115 công suất 1300W, điện áp 110V DC',
'Bơm năng lượng mặt trời 4DP6-115 công suất 1300W với lưu lượng 6m³/h.',
JSON_OBJECT(
    'power_w', '1300W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('2.4m³/h @ 90m', '4.2m³/h @ 70m', '6.0m³/h @ 36m'),
    'max_flow', '6.0 m³/h',
    'max_head', '90m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Giếng khoan sâu'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 4, false, true),

-- 4DP8-86
('Bơm Năng Lượng Mặt Trời 4DP8-86 (1300W 110V DC)', 'bom-nang-luong-mat-troi-4dp8-86', '4DP8-86',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP8-86', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP8-86 công suất 1300W, điện áp 110V DC',
'Bơm năng lượng mặt trời 4DP8-86 công suất 1300W với lưu lượng 8.1m³/h.',
JSON_OBJECT(
    'power_w', '1300W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('3.6m³/h @ 69m', '6.3m³/h @ 46m', '8.1m³/h @ 19m'),
    'max_flow', '8.1 m³/h',
    'max_head', '69m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Tưới tiêu, cấp nước'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 4, false, true),

-- 4DP12-62
('Bơm Năng Lượng Mặt Trời 4DP12-62 (1300W 110V DC)', 'bom-nang-luong-mat-troi-4dp12-62', '4DP12-62',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP12-62', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP12-62 công suất 1300W, điện áp 110V DC',
'Bơm năng lượng mặt trời 4DP12-62 công suất 1300W với lưu lượng lớn 12m³/h.',
JSON_OBJECT(
    'power_w', '1300W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('4.8m³/h @ 42m', '8.4m³/h @ 23m', '12m³/h @ 6m'),
    'max_flow', '12 m³/h',
    'max_head', '42m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Cấp nước lưu lượng lớn'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 4, false, true),

-- 4DP 1500W Series

-- 4DP5-150
('Bơm Năng Lượng Mặt Trời 4DP5-150 (1500W 110V DC)', 'bom-nang-luong-mat-troi-4dp5-150', '4DP5-150',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP5-150', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP5-150 công suất 1500W, điện áp 110V DC',
'Bơm năng lượng mặt trời 4DP5-150 công suất 1500W với cột áp siêu cao 139m.',
JSON_OBJECT(
    'power_w', '1500W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('1.2m³/h @ 139m', '3.0m³/h @ 96m', '4.8m³/h @ 32m'),
    'max_flow', '4.8 m³/h',
    'max_head', '139m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Giếng khoan cực sâu'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 3, false, true),

-- 4DP6-136
('Bơm Năng Lượng Mặt Trời 4DP6-136 (1500W 110V DC)', 'bom-nang-luong-mat-troi-4dp6-136', '4DP6-136',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP6-136', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP6-136 công suất 1500W, điện áp 110V DC',
'Bơm năng lượng mặt trời 4DP6-136 công suất 1500W với cột áp 136m.',
JSON_OBJECT(
    'power_w', '1500W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('2.4m³/h @ 108m', '4.2m³/h @ 80m', '6.0m³/h @ 45m'),
    'max_flow', '6.0 m³/h',
    'max_head', '108m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Giếng khoan cực sâu'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 3, false, true),

-- 4DP8-100
('Bơm Năng Lượng Mặt Trời 4DP8-100 (1500W 110V DC)', 'bom-nang-luong-mat-troi-4dp8-100', '4DP8-100',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP8-100', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP8-100 công suất 1500W, điện áp 110V DC',
'Bơm năng lượng mặt trời 4DP8-100 công suất 1500W với lưu lượng 8.1m³/h.',
JSON_OBJECT(
    'power_w', '1500W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('3.6m³/h @ 80m', '6.3m³/h @ 53m', '8.1m³/h @ 22m'),
    'max_flow', '8.1 m³/h',
    'max_head', '80m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Tưới tiêu, giếng sâu'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 3, false, true),

-- 4DP12-70
('Bơm Năng Lượng Mặt Trời 4DP12-70 (1500W 110V DC)', 'bom-nang-luong-mat-troi-4dp12-70', '4DP12-70',
(SELECT id FROM categories WHERE slug = 'may-bom-nang-luong-mat-troi' LIMIT 1),
5300000, 'DONGYIN', '4DP12-70', 'Trung Quốc', '12 tháng',
'Bơm chìm hỏa tiễn năng lượng mặt trời 4DP12-70 công suất 1500W, điện áp 110V DC',
'Bơm năng lượng mặt trời 4DP12-70 công suất 1500W - model cao cấp nhất dòng 4DP với lưu lượng lớn 12m³/h.',
JSON_OBJECT(
    'power_w', '1500W',
    'voltage', '110V DC',
    'power_source', 'Năng lượng mặt trời',
    'flow_rates', JSON_ARRAY('4.8m³/h @ 50m', '8.4m³/h @ 28m', '12m³/h @ 7m'),
    'max_flow', '12 m³/h',
    'max_head', '50m',
    'series', '4DP',
    'includes', 'Hộp tự điều khiển tự động',
    'application', 'Cấp nước lớn, năng lượng xanh'
),
'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 3, false, true);

-- ============================================
-- DONE! - Part 2
-- ============================================
-- SD Series (2SDM, 2.5SDM, 3SDM, 3SDM-04): 20 products ✓
-- 4SP Series (4SPM, 4SP): 15 products ✓
-- 6SR/6SP Series: 23 products ✓
-- 4DP Series (Solar): 12 products ✓
-- Total Part 2: 70 products
-- ============================================
-- GRAND TOTAL: Part 1 (50) + Part 2 (70) = 120 products
-- ============================================
