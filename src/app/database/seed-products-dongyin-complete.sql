-- ============================================
-- DONGYIN PUMP - Complete Product Catalog
-- Date: 01/05/2025 (Pricing effective date)
-- ============================================
-- Total Products: ~110+ items
-- Categories: QS, WS, WQ, TD, SD, 4SDM, 4SD, 4SP, 6SR/6SP, 4DP Series
-- ============================================

-- ============================================
-- CATEGORIES (Thêm categories nếu chưa có)
-- ============================================

-- Kiểm tra và thêm categories
INSERT IGNORE INTO categories (name, slug, parent_id, level, description, icon, display_order) VALUES
('Máy Bơm Chìm QS Series', 'may-bom-chim-qs-series', 5, 3, 'Bơm điện chìm QS 220V/380V', NULL, 1),
('Máy Bơm Chìm WS Series', 'may-bom-chim-ws-series', 5, 3, 'Bơm điện chìm nước thải WS', NULL, 2),
('Máy Bơm Chìm WQ Series', 'may-bom-chim-wq-series', 5, 3, 'Bơm điện chìm nước thải WQ có cánh cắt rác', NULL, 3),
('Máy Bơm Hỏa Tiễn SD Series', 'may-bom-hoa-tien-sd-series', 6, 3, 'Bơm chìm hỏa tiễn SD/SDM 220V', NULL, 1),
('Máy Bơm Hỏa Tiễn 4SD/4SP Series', 'may-bom-hoa-tien-4sd-4sp-series', 6, 3, 'Bơm chìm hỏa tiễn 4SD/4SP 380V', NULL, 2),
('Máy Bơm Hỏa Tiễn 6SR/6SP Series', 'may-bom-hoa-tien-6sr-6sp-series', 6, 3, 'Bơm chìm hỏa tiễn 6SR/6SP 380V', NULL, 3),
('Máy Bơm Năng Lượng Mặt Trời', 'may-bom-nang-luong-mat-troi', 6, 3, 'Bơm chìm năng lượng mặt trời 110V DC', NULL, 4),
('Tủ Điện TD Series', 'tu-dien-td-series', 3, 2, 'Tủ điều khiển máy bơm TD 220V', NULL, 5);

-- ============================================
-- QS SERIES - BƠM ĐIỆN CHÌM QS (220V - 380V)
-- ============================================

-- QS Series 220V (Có phao - QSD Models)
INSERT INTO products (name, slug, sku, category_id, price, brand, model, origin, warranty, short_description, description, specifications, image, stock, is_featured, is_bestseller, is_new) VALUES

-- QSD6-15-0.37 (1/2HP)
('Bơm Điện Chìm QSD6-15-0.37 (1/2HP 0.37KW 220V)', 'bom-dien-chim-qsd6-15-037', 'QSD6-15-0.37', 
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
2000000, 'DONGYIN', 'QSD6-15-0.37', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QSD6-15-0.37 1/2HP có phao tự động, công suất 0.37KW, điện áp 220V',
'Bơm điện chìm QSD Series là dòng sản phẩm cao cấp của DONGYIN, được thiết kế với phao tự động tiện lợi. Phù hợp cho việc bơm nước sạch, tưới tiêu, xây dựng. Động cơ đồng nguyên chất, trục inox 304 chống gỉ, vỏ gang chắc chắn.',
JSON_OBJECT(
    'power_hp', '1/2HP',
    'power_kw', '0.37KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('9m³/h @ 13m', '6m³/h @ 15m', '3m³/h @ 17m'),
    'max_flow', '9 m³/h',
    'max_head', '17m',
    'has_float', true
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 15, true, true, false),

-- QSD6-18-0.55 (3/4HP)
('Bơm Điện Chìm QSD6-18-0.55 (3/4HP 0.55KW 220V)', 'bom-dien-chim-qsd6-18-055', 'QSD6-18-0.55',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
2100000, 'DONGYIN', 'QSD6-18-0.55', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QSD6-18-0.55 3/4HP có phao tự động, công suất 0.55KW, điện áp 220V',
'Bơm điện chìm QSD Series công suất 3/4HP, phù hợp cho bơm nước từ giếng khoan, hầm hố, hồ nước. Hệ thống phao tự động bật/tắt tiện lợi, tiết kiệm điện năng.',
JSON_OBJECT(
    'power_hp', '3/4HP',
    'power_kw', '0.55KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('9m³/h @ 15m', '6m³/h @ 18m', '3m³/h @ 19m'),
    'max_flow', '9 m³/h',
    'max_head', '19m',
    'has_float', true
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 12, true, true, false),

-- QSD6-22-0.75 (1.0HP)
('Bơm Điện Chìm QSD6-22-0.75 (1.0HP 0.75KW 220V)', 'bom-dien-chim-qsd6-22-075', 'QSD6-22-0.75',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
2260000, 'DONGYIN', 'QSD6-22-0.75', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QSD6-22-0.75 1.0HP có phao tự động, công suất 0.75KW, điện áp 220V',
'Bơm điện chìm 1HP với cột áp cao 24m, phù hợp cho giếng khoan sâu. Thiết kế compact, dễ lắp đặt và bảo trì.',
JSON_OBJECT(
    'power_hp', '1.0HP',
    'power_kw', '0.75KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('12m³/h @ 16m', '6m³/h @ 22m', '3m³/h @ 24m'),
    'max_flow', '12 m³/h',
    'max_head', '24m',
    'has_float', true
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 10, true, false, false),

-- QSD6-25-1.1 (1.5HP)
('Bơm Điện Chìm QSD6-25-1.1 (1.5HP 1.1KW 220V)', 'bom-dien-chim-qsd6-25-11', 'QSD6-25-1.1',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
2570000, 'DONGYIN', 'QSD6-25-1.1', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QSD6-25-1.1 1.5HP có phao tự động, công suất 1.1KW, điện áp 220V',
'Bơm điện chìm 1.5HP với lưu lượng lớn 15m³/h, cột áp cao 28m. Thích hợp cho các công trình xây dựng, tưới tiêu quy mô vừa và lớn.',
JSON_OBJECT(
    'power_hp', '1.5HP',
    'power_kw', '1.1KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('15m³/h @ 16m', '6m³/h @ 25m', '3m³/h @ 28m'),
    'max_flow', '15 m³/h',
    'max_head', '28m',
    'has_float', true
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 8, true, false, false),

-- QSD10-28-1.5 (2.0HP)
('Bơm Điện Chìm QSD10-28-1.5 (2.0HP 1.5KW 220V)', 'bom-dien-chim-qsd10-28-15', 'QSD10-28-1.5',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
2860000, 'DONGYIN', 'QSD10-28-1.5', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QSD10-28-1.5 2.0HP có phao tự động, công suất 1.5KW, điện áp 220V',
'Bơm điện chìm 2HP với lưu lượng 15m³/h và cột áp 31m. Động cơ mạnh mẽ, phù hợp cho bơm từ giếng khoan sâu, hồ chứa nước.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('15m³/h @ 23m', '10m³/h @ 28m', '6m³/h @ 31m'),
    'max_flow', '15 m³/h',
    'max_head', '31m',
    'has_float', true
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 7, false, false, false),

-- QSD10-32-1.9 (2.5HP)
('Bơm Điện Chìm QSD10-32-1.9 (2.5HP 1.9KW 220V)', 'bom-dien-chim-qsd10-32-19', 'QSD10-32-1.9',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
3250000, 'DONGYIN', 'QSD10-32-1.9', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QSD10-32-1.9 2.5HP có phao tự động, công suất 1.9KW, điện áp 220V',
'Bơm điện chìm 2.5HP công suất lớn, lưu lượng 18m³/h, cột áp tối đa 36m. Phù hợp cho các ứng dụng công nghiệp nhỏ.',
JSON_OBJECT(
    'power_hp', '2.5HP',
    'power_kw', '1.9KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('18m³/h @ 23m', '10m³/h @ 32m', '6m³/h @ 36m'),
    'max_flow', '18 m³/h',
    'max_head', '36m',
    'has_float', true
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 6, false, false, false),

-- QSD15-32-2.2 (3.0HP)
('Bơm Điện Chìm QSD15-32-2.2 (3.0HP 2.2KW 220V)', 'bom-dien-chim-qsd15-32-22', 'QSD15-32-2.2',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
3750000, 'DONGYIN', 'QSD15-32-2.2', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QSD15-32-2.2 3.0HP có phao tự động, công suất 2.2KW, điện áp 220V',
'Bơm điện chìm 3HP với ống xả Ø49mm, lưu lượng lớn 30m³/h. Thích hợp cho tưới tiêu nông nghiệp, cấp nước công trình.',
JSON_OBJECT(
    'power_hp', '3.0HP',
    'power_kw', '2.2KW',
    'voltage', '220V',
    'outlet_size', 'Ø49mm',
    'flow_rates', JSON_ARRAY('30m³/h @ 12m', '15m³/h @ 32m', '9m³/h @ 36m'),
    'max_flow', '30 m³/h',
    'max_head', '36m',
    'has_float', true
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 5, false, false, false),

-- QSD15-40-3 (4.0HP)
('Bơm Điện Chìm QSD15-40-3 (4.0HP 3.0KW 220V)', 'bom-dien-chim-qsd15-40-3', 'QSD15-40-3',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
4250000, 'DONGYIN', 'QSD15-40-3', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QSD15-40-3 4.0HP có phao tự động, công suất 3.0KW, điện áp 220V',
'Bơm điện chìm 4HP công suất cao, cột áp 40m. Model cao cấp của dòng QSD 220V, phù hợp cho mọi ứng dụng bơm nước sạch.',
JSON_OBJECT(
    'power_hp', '4.0HP',
    'power_kw', '3.0KW',
    'voltage', '220V',
    'outlet_size', 'Ø49mm',
    'flow_rates', JSON_ARRAY('30m³/h @ 23m', '15m³/h @ 40m', '9m³/h @ 40m'),
    'max_flow', '30 m³/h',
    'max_head', '40m',
    'has_float', true
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 4, false, false, false),

-- QS Series 220V (Không phao - QS Models)

-- QS10-28-1.5 (2.0HP)
('Bơm Điện Chìm QS10-28-1.5 (2.0HP 1.5KW 220V)', 'bom-dien-chim-qs10-28-15', 'QS10-28-1.5',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
2650000, 'DONGYIN', 'QS10-28-1.5', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QS10-28-1.5 2.0HP không phao, công suất 1.5KW, điện áp 220V',
'Bơm điện chìm QS 2HP không có phao tự động, phù hợp cho hệ thống có điều khiển riêng. Giá thành tối ưu.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('15m³/h @ 23m', '10m³/h @ 28m', '6m³/h @ 31m'),
    'max_flow', '15 m³/h',
    'max_head', '31m',
    'has_float', false
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 8, false, false, false),

-- QS15-32-2.2 (3.0HP)
('Bơm Điện Chìm QS15-32-2.2 (3.0HP 2.2KW 220V)', 'bom-dien-chim-qs15-32-22', 'QS15-32-2.2',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
3350000, 'DONGYIN', 'QS15-32-2.2', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QS15-32-2.2 3.0HP không phao, công suất 2.2KW, điện áp 220V',
'Bơm điện chìm QS 3HP không phao, lưu lượng 30m³/h, cột áp 36m. Giá cạnh tranh so với model có phao.',
JSON_OBJECT(
    'power_hp', '3.0HP',
    'power_kw', '2.2KW',
    'voltage', '220V',
    'outlet_size', 'Ø49mm',
    'flow_rates', JSON_ARRAY('30m³/h @ 12m', '15m³/h @ 32m', '9m³/h @ 36m'),
    'max_flow', '30 m³/h',
    'max_head', '36m',
    'has_float', false
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 6, false, false, false),

-- QS15-40-3 (4.0HP)
('Bơm Điện Chìm QS15-40-3 (4.0HP 3.0KW 220V)', 'bom-dien-chim-qs15-40-3', 'QS15-40-3',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
3800000, 'DONGYIN', 'QS15-40-3', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QS15-40-3 4.0HP không phao, công suất 3.0KW, điện áp 220V',
'Bơm điện chìm QS 4HP không phao, cột áp cao 40m. Model mạnh mẽ cho công trình lớn.',
JSON_OBJECT(
    'power_hp', '4.0HP',
    'power_kw', '3.0KW',
    'voltage', '220V',
    'outlet_size', 'Ø49mm',
    'flow_rates', JSON_ARRAY('30m³/h @ 23m', '15m³/h @ 40m', '9m³/h @ 40m'),
    'max_flow', '30 m³/h',
    'max_head', '40m',
    'has_float', false
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 5, false, false, false),

-- QS Series 380V Models

-- QS20-40-4 (5.5HP)
('Bơm Điện Chìm QS20-40-4 (5.5HP 4.0KW 380V)', 'bom-dien-chim-qs20-40-4', 'QS20-40-4',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
4900000, 'DONGYIN', 'QS20-40-4', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QS20-40-4 5.5HP 380V, công suất 4.0KW, lưu lượng 20m³/h',
'Bơm điện chìm 380V công suất 5.5HP, lưu lượng 36m³/h, cột áp 43m. Phù hợp cho công trình công nghiệp.',
JSON_OBJECT(
    'power_hp', '5.5HP',
    'power_kw', '4.0KW',
    'voltage', '380V',
    'outlet_size', 'Ø49mm',
    'flow_rates', JSON_ARRAY('36m³/h @ 15m', '20m³/h @ 40m', '15m³/h @ 43m'),
    'max_flow', '36 m³/h',
    'max_head', '43m',
    'has_float', false
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 4, false, false, true),

-- QS25-50-5.5 (7.5HP)
('Bơm Điện Chìm QS25-50-5.5 (7.5HP 5.5KW 380V)', 'bom-dien-chim-qs25-50-55', 'QS25-50-5.5',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
6600000, 'DONGYIN', 'QS25-50-5.5', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QS25-50-5.5 7.5HP 380V, công suất 5.5KW, lưu lượng 25m³/h',
'Bơm điện chìm 380V công suất 7.5HP, lưu lượng lớn 48m³/h, cột áp 54m. Ống xả Ø60mm cho lưu lượng cao.',
JSON_OBJECT(
    'power_hp', '7.5HP',
    'power_kw', '5.5KW',
    'voltage', '380V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('48m³/h @ 24m', '25m³/h @ 50m', '18m³/h @ 54m'),
    'max_flow', '48 m³/h',
    'max_head', '54m',
    'has_float', false
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 3, false, false, true),

-- QS25-55-7.5 (10HP)
('Bơm Điện Chìm QS25-55-7.5 (10HP 7.5KW 380V)', 'bom-dien-chim-qs25-55-75', 'QS25-55-7.5',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-qs-series' LIMIT 1),
7600000, 'DONGYIN', 'QS25-55-7.5', 'Trung Quốc', '12 tháng',
'Bơm điện chìm QS25-55-7.5 10HP 380V, công suất 7.5KW, lưu lượng 25m³/h',
'Bơm điện chìm 380V công suất 10HP, model cao cấp nhất dòng QS. Lưu lượng 54m³/h, cột áp 56m.',
JSON_OBJECT(
    'power_hp', '10HP',
    'power_kw', '7.5KW',
    'voltage', '380V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('54m³/h @ 28m', '25m³/h @ 55m', '18m³/h @ 56m'),
    'max_flow', '54 m³/h',
    'max_head', '56m',
    'has_float', false
),
'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', 2, false, false, true);


-- ============================================
-- WS SERIES - BƠM ĐIỆN CHÌM NƯỚC THẢI WS
-- ============================================

-- WS Series 220V (Có phao - WSD Models)
INSERT INTO products (name, slug, sku, category_id, price, brand, model, origin, warranty, short_description, description, specifications, image, stock, is_featured, is_bestseller) VALUES

-- WSD9-8-0.37E (0.5HP)
('Bơm Điện Chìm Nước Thải WSD9-8-0.37E (0.5HP 0.37KW 220V)', 'bom-dien-chim-nuoc-thai-wsd9-8-037e', 'WSD9-8-0.37E',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-ws-series' LIMIT 1),
1550000, 'DONGYIN', 'WSD9-8-0.37E', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WSD9-8-0.37E 0.5HP có phao, công suất 0.37KW, điện áp 220V',
'Bơm điện chìm nước thải WS Series được thiết kế chuyên dụng cho bơm nước thải sinh hoạt, nước bẩn. Cánh inox chống ăn mòn, công cụ chống tắc (UFC), có phao tự động tiện lợi.',
JSON_OBJECT(
    'power_hp', '0.5HP',
    'power_kw', '0.37KW',
    'voltage', '220V',
    'outlet_size', 'Ø42mm',
    'flow_rates', JSON_ARRAY('12m³/h @ 6m', '8m³/h @ 9m', '6m³/h @ 10m'),
    'max_flow', '12 m³/h',
    'max_head', '10m',
    'has_float', true,
    'application', 'Nước thải',
    'features', JSON_ARRAY('UFC - Công cụ chống tắc', 'Cánh inox chống ăn mòn')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 20, true, true),

-- WSD15-10-0.75E (1.0HP)
('Bơm Điện Chìm Nước Thải WSD15-10-0.75E (1.0HP 0.75KW 220V)', 'bom-dien-chim-nuoc-thai-wsd15-10-075e', 'WSD15-10-0.75E',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-ws-series' LIMIT 1),
2360000, 'DONGYIN', 'WSD15-10-0.75E', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WSD15-10-0.75E 1.0HP có phao, công suất 0.75KW, điện áp 220V',
'Bơm nước thải 1HP với ống xả Ø60mm, lưu lượng 18m³/h. Phù hợp cho hầm cầu, ao cá, công trình xây dựng.',
JSON_OBJECT(
    'power_hp', '1.0HP',
    'power_kw', '0.75KW',
    'voltage', '220V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('18m³/h @ 9m', '10m³/h @ 15m', '6m³/h @ 12m'),
    'max_flow', '18 m³/h',
    'max_head', '15m',
    'has_float', true,
    'application', 'Nước thải',
    'features', JSON_ARRAY('UFC - Công cụ chống tắc', 'Cánh inox chống ăn mòn')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 15, true, true),

-- WSD20-11-1.1E (1.5HP)
('Bơm Điện Chìm Nước Thải WSD20-11-1.1E (1.5HP 1.1KW 220V)', 'bom-dien-chim-nuoc-thai-wsd20-11-11e', 'WSD20-11-1.1E',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-ws-series' LIMIT 1),
2800000, 'DONGYIN', 'WSD20-11-1.1E', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WSD20-11-1.1E 1.5HP có phao, công suất 1.1KW, điện áp 220V',
'Bơm nước thải 1.5HP công suất mạnh, lưu lượng 24m³/h. Thích hợp cho bơm nước thải công nghiệp nhẹ.',
JSON_OBJECT(
    'power_hp', '1.5HP',
    'power_kw', '1.1KW',
    'voltage', '220V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('24m³/h @ 8m', '20m³/h @ 11m', '12m³/h @ 14m'),
    'max_flow', '24 m³/h',
    'max_head', '14m',
    'has_float', true,
    'application', 'Nước thải',
    'features', JSON_ARRAY('UFC - Công cụ chống tắc', 'Cánh inox chống ăn mòn')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 12, true, false),

-- WSD15-16-1.5E (2.0HP)
('Bơm Điện Chìm Nước Thải WSD15-16-1.5E (2.0HP 1.5KW 220V)', 'bom-dien-chim-nuoc-thai-wsd15-16-15e', 'WSD15-16-1.5E',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-ws-series' LIMIT 1),
3100000, 'DONGYIN', 'WSD15-16-1.5E', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WSD15-16-1.5E 2.0HP có phao, công suất 1.5KW, điện áp 220V',
'Bơm nước thải 2HP với cột áp cao 17m, lưu lượng 24m³/h. Model phổ biến cho nhiều ứng dụng.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('24m³/h @ 12m', '15m³/h @ 16m', '12m³/h @ 17m'),
    'max_flow', '24 m³/h',
    'max_head', '17m',
    'has_float', true,
    'application', 'Nước thải',
    'features', JSON_ARRAY('UFC - Công cụ chống tắc', 'Cánh inox chống ăn mòn')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 10, false, false),

-- WSD20-17-2.2E (3.0HP)
('Bơm Điện Chìm Nước Thải WSD20-17-2.2E (3.0HP 2.2KW 220V)', 'bom-dien-chim-nuoc-thai-wsd20-17-22e', 'WSD20-17-2.2E',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-ws-series' LIMIT 1),
4500000, 'DONGYIN', 'WSD20-17-2.2E', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WSD20-17-2.2E 3.0HP có phao, công suất 2.2KW, điện áp 220V',
'Bơm nước thải 3HP công suất lớn, lưu lượng 30m³/h, cột áp 20m. Model cao cấp cho ứng dụng công nghiệp.',
JSON_OBJECT(
    'power_hp', '3.0HP',
    'power_kw', '2.2KW',
    'voltage', '220V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('30m³/h @ 12m', '20m³/h @ 17m', '16m³/h @ 20m'),
    'max_flow', '30 m³/h',
    'max_head', '20m',
    'has_float', true,
    'application', 'Nước thải',
    'features', JSON_ARRAY('UFC - Công cụ chống tắc', 'Cánh inox chống ăn mòn')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 6, false, false),

-- WS15-16-1.5E (2.0HP) - Không phao
('Bơm Điện Chìm Nước Thải WS15-16-1.5E (2.0HP 1.5KW 220V)', 'bom-dien-chim-nuoc-thai-ws15-16-15e', 'WS15-16-1.5E',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-ws-series' LIMIT 1),
3000000, 'DONGYIN', 'WS15-16-1.5E', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WS15-16-1.5E 2.0HP không phao, công suất 1.5KW, điện áp 220V',
'Bơm nước thải 2HP không phao, phù hợp cho hệ thống có điều khiển tự động riêng. Giá thành tối ưu.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('24m³/h @ 12m', '15m³/h @ 16m', '12m³/h @ 17m'),
    'max_flow', '24 m³/h',
    'max_head', '17m',
    'has_float', false,
    'application', 'Nước thải',
    'features', JSON_ARRAY('UFC - Công cụ chống tắc', 'Cánh inox chống ăn mòn')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 8, false, false),

-- WS Series 380V Models

-- WS20-17-2.2E (3.0HP)
('Bơm Điện Chìm Nước Thải WS20-17-2.2E (3.0HP 2.2KW 380V)', 'bom-dien-chim-nuoc-thai-ws20-17-22e-380v', 'WS20-17-2.2E',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-ws-series' LIMIT 1),
3950000, 'DONGYIN', 'WS20-17-2.2E', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WS20-17-2.2E 3.0HP 380V, công suất 2.2KW',
'Bơm nước thải 3HP điện áp 380V, công suất ổn định, hiệu suất cao. Phù hợp cho công nghiệp.',
JSON_OBJECT(
    'power_hp', '3.0HP',
    'power_kw', '2.2KW',
    'voltage', '380V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('30m³/h @ 12m', '20m³/h @ 17m', '16m³/h @ 20m'),
    'max_flow', '30 m³/h',
    'max_head', '20m',
    'has_float', false,
    'application', 'Nước thải',
    'features', JSON_ARRAY('UFC - Công cụ chống tắc', 'Cánh inox chống ăn mòn')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 5, false, false),

-- WS60-11-4E (5.5HP)
('Bơm Điện Chìm Nước Thải WS60-11-4E (5.5HP 4.0KW 380V)', 'bom-dien-chim-nuoc-thai-ws60-11-4e', 'WS60-11-4E',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-ws-series' LIMIT 1),
5200000, 'DONGYIN', 'WS60-11-4E', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WS60-11-4E 5.5HP 380V, công suất 4.0KW, lưu lượng lớn',
'Bơm nước thải 5.5HP với lưu lượng cực lớn 65m³/h, ống xả Ø90mm. Phù hợp cho công trình lớn, xử lý nước thải công nghiệp.',
JSON_OBJECT(
    'power_hp', '5.5HP',
    'power_kw', '4.0KW',
    'voltage', '380V',
    'outlet_size', 'Ø90mm',
    'flow_rates', JSON_ARRAY('65m³/h @ 9m', '50m³/h @ 14m', '30m³/h @ 20m'),
    'max_flow', '65 m³/h',
    'max_head', '20m',
    'has_float', false,
    'application', 'Nước thải công nghiệp',
    'features', JSON_ARRAY('UFC - Công cụ chống tắc', 'Cánh inox chống ăn mòn')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 3, false, false);


-- ============================================
-- WQ SERIES - BƠM ĐIỆN CHÌM NƯỚC THẢI WQ (CÁNH CẮT RÁC)
-- ============================================

INSERT INTO products (name, slug, sku, category_id, price, brand, model, origin, warranty, short_description, description, specifications, image, stock, is_featured, is_new) VALUES

-- WQ Series 220V (Có phao - WQD Models)

-- WQD15-10-1.1GN (1.5HP)
('Bơm Điện Chìm Nước Thải WQD15-10-1.1GN (1.5HP 1.1KW 220V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wqd15-10-11gn', 'WQD15-10-1.1GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
4000000, 'DONGYIN', 'WQD15-10-1.1GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQD15-10-1.1GN 1.5HP có phao, công suất 1.1KW, có cánh cắt rác',
'Bơm điện chìm WQ Series với công nghệ cánh cắt rác tiên tiến, chuyên xử lý nước thải có tạp chất lớn. Phù hợp cho n��ớc thải sinh hoạt, công nghiệp có nhiều tạp chất rắn, sợi vải.',
JSON_OBJECT(
    'power_hp', '1.5HP',
    'power_kw', '1.1KW',
    'voltage', '220V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('18m³/h @ 8m', '12m³/h @ 12m', '6m³/h @ 14m'),
    'max_flow', '18 m³/h',
    'max_head', '14m',
    'has_float', true,
    'application', 'Nước thải có tạp chất',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 10, true, true),

-- WQD18-12-1.5GN (2.0HP)
('Bơm Điện Chìm Nước Thải WQD18-12-1.5GN (2.0HP 1.5KW 220V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wqd18-12-15gn', 'WQD18-12-1.5GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
5150000, 'DONGYIN', 'WQD18-12-1.5GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQD18-12-1.5GN 2.0HP có phao, công suất 1.5KW, có cánh cắt rác',
'Bơm nước thải 2HP với hệ thống cánh cắt rác mạnh mẽ, lưu lượng 24m³/h. Giải pháp tối ưu cho nước thải sinh hoạt.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('24m³/h @ 9m', '18m³/h @ 12m', '12m³/h @ 15m'),
    'max_flow', '24 m³/h',
    'max_head', '15m',
    'has_float', true,
    'application', 'Nước thải có tạp chất',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 8, true, true),

-- WQD25-15-2.2GN (3.0HP)
('Bơm Điện Chìm Nước Thải WQD25-15-2.2GN (3.0HP 2.2KW 220V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wqd25-15-22gn', 'WQD25-15-2.2GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
6900000, 'DONGYIN', 'WQD25-15-2.2GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQD25-15-2.2GN 3.0HP có phao, công suất 2.2KW, có cánh cắt rác',
'Bơm nước thải 3HP với ống xả Ø75mm, lưu lượng lớn 42m³/h. Model cao cấp cho xử lý nước thải công nghiệp.',
JSON_OBJECT(
    'power_hp', '3.0HP',
    'power_kw', '2.2KW',
    'voltage', '220V',
    'outlet_size', 'Ø75mm',
    'flow_rates', JSON_ARRAY('42m³/h @ 5m', '25m³/h @ 15m', '12m³/h @ 19m'),
    'max_flow', '42 m³/h',
    'max_head', '19m',
    'has_float', true,
    'application', 'Nước thải công nghiệp',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 6, true, true),

-- WQ Series 220V (Không phao - WQ Models)

-- WQ15-10-1.1GN (1.5HP)
('Bơm Điện Chìm Nước Thải WQ15-10-1.1GN (1.5HP 1.1KW 220V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wq15-10-11gn', 'WQ15-10-1.1GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
4000000, 'DONGYIN', 'WQ15-10-1.1GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQ15-10-1.1GN 1.5HP không phao, công suất 1.1KW, có cánh cắt rác',
'Bơm nước thải 1.5HP không phao với cánh cắt rác, phù hợp cho hệ thống điều khiển tự động.',
JSON_OBJECT(
    'power_hp', '1.5HP',
    'power_kw', '1.1KW',
    'voltage', '220V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('18m³/h @ 8m', '12m³/h @ 12m', '6m³/h @ 14m'),
    'max_flow', '18 m³/h',
    'max_head', '14m',
    'has_float', false,
    'application', 'Nước thải có tạp chất',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 8, false, false),

-- WQ18-12-1.5GN (2.0HP)
('Bơm Điện Chìm Nước Thải WQ18-12-1.5GN (2.0HP 1.5KW 220V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wq18-12-15gn', 'WQ18-12-1.5GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
5150000, 'DONGYIN', 'WQ18-12-1.5GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQ18-12-1.5GN 2.0HP không phao, công suất 1.5KW, có cánh cắt rác',
'Bơm nước thải 2HP không phao với cánh cắt rác, lưu lượng 24m³/h.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'outlet_size', 'Ø60mm',
    'flow_rates', JSON_ARRAY('24m³/h @ 9m', '18m³/h @ 12m', '12m³/h @ 15m'),
    'max_flow', '24 m³/h',
    'max_head', '15m',
    'has_float', false,
    'application', 'Nước thải có tạp chất',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 6, false, false),

-- WQ25-15-2.2GN (3.0HP)
('Bơm Điện Chìm Nước Thải WQ25-15-2.2GN (3.0HP 2.2KW 220V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wq25-15-22gn', 'WQ25-15-2.2GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
6400000, 'DONGYIN', 'WQ25-15-2.2GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQ25-15-2.2GN 3.0HP không phao, công suất 2.2KW, có cánh cắt rác',
'Bơm nước thải 3HP không phao với cánh cắt rác, lưu lượng lớn 42m³/h.',
JSON_OBJECT(
    'power_hp', '3.0HP',
    'power_kw', '2.2KW',
    'voltage', '220V',
    'outlet_size', 'Ø75/65mm',
    'flow_rates', JSON_ARRAY('42m³/h @ 5m', '25m³/h @ 15m', '12m³/h @ 19m'),
    'max_flow', '42 m³/h',
    'max_head', '19m',
    'has_float', false,
    'application', 'Nước thải công nghiệp',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 5, false, false),

-- WQ Series 380V Models

-- WQ30-15-3.0GN (4.0HP)
('Bơm Điện Chìm Nước Thải WQ30-15-3.0GN (4.0HP 3.0KW 380V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wq30-15-30gn', 'WQ30-15-3.0GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
7000000, 'DONGYIN', 'WQ30-15-3.0GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQ30-15-3.0GN 4.0HP 380V, công suất 3.0KW, có cánh cắt rác',
'Bơm nước thải 4HP điện áp 380V, lưu lượng 48m³/h, cột áp 20m. Model công nghiệp với cánh cắt rác mạnh mẽ.',
JSON_OBJECT(
    'power_hp', '4.0HP',
    'power_kw', '3.0KW',
    'voltage', '380V',
    'outlet_size', 'Ø75/65mm',
    'flow_rates', JSON_ARRAY('48m³/h @ 10m', '30m³/h @ 17m', '18m³/h @ 20m'),
    'max_flow', '48 m³/h',
    'max_head', '20m',
    'has_float', false,
    'application', 'Nước thải công nghiệp',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng', '380V')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 4, false, true),

-- WQ40-18-4.0GN (5.5HP)
('Bơm Điện Chìm Nước Thải WQ40-18-4.0GN (5.5HP 4.0KW 380V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wq40-18-40gn', 'WQ40-18-4.0GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
8100000, 'DONGYIN', 'WQ40-18-4.0GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQ40-18-4.0GN 5.5HP 380V, công suất 4.0KW, có cánh cắt rác',
'Bơm nước thải 5.5HP với lưu lượng 60m³/h, ống xả Ø75mm. Phù hợp cho xử lý nước thải công nghiệp lớn.',
JSON_OBJECT(
    'power_hp', '5.5HP',
    'power_kw', '4.0KW',
    'voltage', '380V',
    'outlet_size', 'Ø75/65mm',
    'flow_rates', JSON_ARRAY('60m³/h @ 11m', '40m³/h @ 18m', '18m³/h @ 27m'),
    'max_flow', '60 m³/h',
    'max_head', '27m',
    'has_float', false,
    'application', 'Nước thải công nghiệp',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng', '380V')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 3, false, true),

-- WQ65-17-5.5GN (7.5HP)
('Bơm Điện Chìm Nước Thải WQ65-17-5.5GN (7.5HP 5.5KW 380V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wq65-17-55gn', 'WQ65-17-5.5GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
11100000, 'DONGYIN', 'WQ65-17-5.5GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQ65-17-5.5GN 7.5HP 380V, công suất 5.5KW, có cánh cắt rác',
'Bơm nước thải 7.5HP với lưu lượng cực lớn 84m³/h, ống xả Ø90mm. Giải pháp cho nhà máy, khu công nghiệp.',
JSON_OBJECT(
    'power_hp', '7.5HP',
    'power_kw', '5.5KW',
    'voltage', '380V',
    'outlet_size', 'Ø90/75mm',
    'flow_rates', JSON_ARRAY('84m³/h @ 13m', '60m³/h @ 20m', '18m³/h @ 28m'),
    'max_flow', '84 m³/h',
    'max_head', '28m',
    'has_float', false,
    'application', 'Nước thải công nghiệp nặng',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng', '380V')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 2, false, true),

-- WQ85-18-7.5GN (10HP)
('Bơm Điện Chìm Nước Thải WQ85-18-7.5GN (10HP 7.5KW 380V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wq85-18-75gn', 'WQ85-18-7.5GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
12800000, 'DONGYIN', 'WQ85-18-7.5GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQ85-18-7.5GN 10HP 380V, công suất 7.5KW, có cánh cắt rác',
'Bơm nước thải 10HP với lưu lượng 108m³/h, ống xả Ø90mm. Model công suất lớn cho ứng dụng công nghiệp nặng.',
JSON_OBJECT(
    'power_hp', '10HP',
    'power_kw', '7.5KW',
    'voltage', '380V',
    'outlet_size', 'Ø90/75mm',
    'flow_rates', JSON_ARRAY('108m³/h @ 13m', '85m³/h @ 18m', '18m³/h @ 29m'),
    'max_flow', '108 m³/h',
    'max_head', '29m',
    'has_float', false,
    'application', 'Nước thải công nghiệp nặng',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng', '380V')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 2, false, true),

-- WQ120-20-11GN (15HP)
('Bơm Điện Chìm Nước Thải WQ120-20-11GN (15HP 11KW 380V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wq120-20-11gn', 'WQ120-20-11GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
22600000, 'DONGYIN', 'WQ120-20-11GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQ120-20-11GN 15HP 380V, công suất 11KW, có cánh cắt rác',
'Bơm nước thải 15HP với lưu lượng 145m³/h, ống xả Ø114mm. Giải pháp cho nhà máy xử lý nước thải lớn.',
JSON_OBJECT(
    'power_hp', '15HP',
    'power_kw', '11KW',
    'voltage', '380V',
    'outlet_size', 'Ø114mm',
    'flow_rates', JSON_ARRAY('145m³/h @ 16m', '120m³/h @ 20m', '36m³/h @ 28m'),
    'max_flow', '145 m³/h',
    'max_head', '28m',
    'has_float', false,
    'application', 'Nước thải công nghiệp nặng',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng', '380V', 'Công suất lớn')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 1, false, true),

-- WQ160-18-15GN (20HP)
('Bơm Điện Chìm Nước Thải WQ160-18-15GN (20HP 15KW 380V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wq160-18-15gn', 'WQ160-18-15GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
25000000, 'DONGYIN', 'WQ160-18-15GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQ160-18-15GN 20HP 380V, công suất 15KW, có cánh cắt rác',
'Bơm nước thải 20HP với lưu lượng 180m³/h, ống xả Ø168mm. Model siêu mạnh cho ứng dụng công nghiệp lớn.',
JSON_OBJECT(
    'power_hp', '20HP',
    'power_kw', '15KW',
    'voltage', '380V',
    'outlet_size', 'Ø168mm',
    'flow_rates', JSON_ARRAY('180m³/h @ 11m', '160m³/h @ 18m', '36m³/h @ 38m'),
    'max_flow', '180 m³/h',
    'max_head', '38m',
    'has_float', false,
    'application', 'Nước thải công nghiệp nặng',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng', '380V', 'Công suất siêu lớn')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 1, false, true),

-- WQ200-21-22GN (30HP)
('Bơm Điện Chìm Nước Thải WQ200-21-22GN (30HP 22KW 380V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wq200-21-22gn', 'WQ200-21-22GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
52200000, 'DONGYIN', 'WQ200-21-22GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQ200-21-22GN 30HP 380V, công suất 22KW, có cánh cắt rác',
'Bơm nước thải 30HP với lưu lượng khủng 288m³/h, ống xả Ø168mm. Giải pháp cho các dự án siêu lớn.',
JSON_OBJECT(
    'power_hp', '30HP',
    'power_kw', '22KW',
    'voltage', '380V',
    'outlet_size', 'Ø168mm',
    'flow_rates', JSON_ARRAY('288m³/h @ 13m', '200m³/h @ 21m', '72m³/h @ 31m'),
    'max_flow', '288 m³/h',
    'max_head', '31m',
    'has_float', false,
    'application', 'Nước thải công nghiệp nặng',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng', '380V', 'Công suất siêu lớn')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 1, false, true),

-- WQ400-13-30GN (40HP)
('Bơm Điện Chìm Nước Thải WQ400-13-30GN (40HP 30KW 380V) Cánh Cắt Rác', 'bom-dien-chim-nuoc-thai-wq400-13-30gn', 'WQ400-13-30GN',
(SELECT id FROM categories WHERE slug = 'may-bom-chim-wq-series' LIMIT 1),
88000000, 'DONGYIN', 'WQ400-13-30GN', 'Trung Quốc', '12 tháng',
'Bơm điện chìm nước thải WQ400-13-30GN 40HP 380V, công suất 30KW, có cánh cắt rác',
'Bơm nước thải 40HP - Model mạnh nhất dòng WQ với lưu lượng siêu khủng 500m³/h. Giải pháp tối ưu cho các nhà máy xử lý nước thải, trạm bơm lớn.',
JSON_OBJECT(
    'power_hp', '40HP',
    'power_kw', '30KW',
    'voltage', '380V',
    'outlet_size', 'Ø168mm',
    'flow_rates', JSON_ARRAY('500m³/h @ 9m', '400m³/h @ 13m', '108m³/h @ 21m'),
    'max_flow', '500 m³/h',
    'max_head', '21m',
    'has_float', false,
    'application', 'Nước thải công nghiệp siêu nặng',
    'features', JSON_ARRAY('Cánh cắt rác', 'Xử lý nước thải nặng', '380V', 'Công suất cực đại')
),
'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800', 1, false, true);


-- ============================================
-- TD SERIES - TỦ ĐIỆN (220V)
-- ============================================

INSERT INTO products (name, slug, sku, category_id, price, brand, model, origin, warranty, short_description, description, specifications, image, stock, is_featured) VALUES

-- TD 2.0 Series
('Tủ Điện 2.0TD-0.50HP (0.5HP 0.37KW 220V)', 'tu-dien-20td-050hp', '2.0TD-0.50HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
190000, 'DONGYIN', '2.0TD-0.50HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 2.0TD-0.50HP, công suất 0.5HP (0.37KW), điện áp 220V',
'Tủ điện TD Series là thiết bị điều khiển tự động cho máy bơm, có chức năng bảo vệ quá tải, thiếu pha, chống cháy khô. Thiết kế compact, dễ lắp đặt.',
JSON_OBJECT(
    'power_hp', '0.5HP',
    'power_kw', '0.37KW',
    'voltage', '220V',
    'series', '2.0TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

-- TD 2.5 Series
('Tủ Điện 2.5TD-0.33HP (0.33HP 0.25KW 220V)', 'tu-dien-25td-033hp', '2.5TD-0.33HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
200000, 'DONGYIN', '2.5TD-0.33HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 2.5TD-0.33HP, công suất 0.33HP (0.25KW), điện áp 220V',
'Tủ điện TD 2.5 Series phù hợp cho máy bơm công suất nhỏ, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '0.33HP',
    'power_kw', '0.25KW',
    'voltage', '220V',
    'series', '2.5TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

('Tủ Điện 2.5TD-0.50HP (0.5HP 0.37KW 220V)', 'tu-dien-25td-050hp', '2.5TD-0.50HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
190000, 'DONGYIN', '2.5TD-0.50HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 2.5TD-0.50HP, công suất 0.5HP (0.37KW), điện áp 220V',
'Tủ điện TD 2.5 Series phù hợp cho máy bơm công suất nhỏ, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '0.5HP',
    'power_kw', '0.37KW',
    'voltage', '220V',
    'series', '2.5TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

('Tủ Điện 2.5TD-0.75HP (0.75HP 0.55KW 220V)', 'tu-dien-25td-075hp', '2.5TD-0.75HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
200000, 'DONGYIN', '2.5TD-0.75HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 2.5TD-0.75HP, công suất 0.75HP (0.55KW), điện áp 220V',
'Tủ điện TD 2.5 Series phù hợp cho máy bơm công suất nhỏ, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '0.75HP',
    'power_kw', '0.55KW',
    'voltage', '220V',
    'series', '2.5TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

('Tủ Điện 2.5TD-1.0HP (1.0HP 0.75KW 220V)', 'tu-dien-25td-10hp', '2.5TD-1.0HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
210000, 'DONGYIN', '2.5TD-1.0HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 2.5TD-1.0HP, công suất 1.0HP (0.75KW), điện áp 220V',
'Tủ điện TD 2.5 Series phù hợp cho máy bơm công suất nhỏ, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '1.0HP',
    'power_kw', '0.75KW',
    'voltage', '220V',
    'series', '2.5TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

-- TD 3.0 Series
('Tủ Điện 3.0TD-0.5HP (0.5HP 0.37KW 220V)', 'tu-dien-30td-05hp', '3.0TD-0.5HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
190000, 'DONGYIN', '3.0TD-0.5HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 3.0TD-0.5HP, công suất 0.5HP (0.37KW), điện áp 220V',
'Tủ điện TD 3.0 Series phù hợp cho máy bơm công suất vừa, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '0.5HP',
    'power_kw', '0.37KW',
    'voltage', '220V',
    'series', '3.0TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

('Tủ Điện 3.0TD-0.75HP (0.75HP 0.55KW 220V)', 'tu-dien-30td-075hp', '3.0TD-0.75HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
200000, 'DONGYIN', '3.0TD-0.75HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 3.0TD-0.75HP, công suất 0.75HP (0.55KW), điện áp 220V',
'Tủ điện TD 3.0 Series phù hợp cho máy bơm công suất vừa, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '0.75HP',
    'power_kw', '0.55KW',
    'voltage', '220V',
    'series', '3.0TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

('Tủ Điện 3.0TD-1.0HP (1.0HP 0.75KW 220V)', 'tu-dien-30td-10hp', '3.0TD-1.0HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
210000, 'DONGYIN', '3.0TD-1.0HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 3.0TD-1.0HP, công suất 1.0HP (0.75KW), điện áp 220V',
'Tủ điện TD 3.0 Series phù hợp cho máy bơm công suất vừa, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '1.0HP',
    'power_kw', '0.75KW',
    'voltage', '220V',
    'series', '3.0TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

('Tủ Điện 3.0TD-1.25HP (1.25HP 0.92KW 220V)', 'tu-dien-30td-125hp', '3.0TD-1.25HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
220000, 'DONGYIN', '3.0TD-1.25HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 3.0TD-1.25HP, công suất 1.25HP (0.92KW), điện áp 220V',
'Tủ điện TD 3.0 Series phù hợp cho máy bơm công suất vừa, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '1.25HP',
    'power_kw', '0.92KW',
    'voltage', '220V',
    'series', '3.0TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

('Tủ Điện 3.0TD-1.5HP (1.5HP 1.1KW 220V)', 'tu-dien-30td-15hp', '3.0TD-1.5HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
230000, 'DONGYIN', '3.0TD-1.5HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 3.0TD-1.5HP, công suất 1.5HP (1.1KW), điện áp 220V',
'Tủ điện TD 3.0 Series phù hợp cho máy bơm công suất vừa, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '1.5HP',
    'power_kw', '1.1KW',
    'voltage', '220V',
    'series', '3.0TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

('Tủ Điện 3.0TD-2.0HP (2.0HP 1.5KW 220V)', 'tu-dien-30td-20hp', '3.0TD-2.0HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
250000, 'DONGYIN', '3.0TD-2.0HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 3.0TD-2.0HP, công suất 2.0HP (1.5KW), điện áp 220V',
'Tủ điện TD 3.0 Series phù hợp cho máy bơm công suất vừa, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'series', '3.0TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

-- TD 4.0 Series
('Tủ Điện 4.0TD-1.0HP (1.0HP 0.75KW 220V)', 'tu-dien-40td-10hp', '4.0TD-1.0HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
220000, 'DONGYIN', '4.0TD-1.0HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 4.0TD-1.0HP, công suất 1.0HP (0.75KW), điện áp 220V',
'Tủ điện TD 4.0 Series phù hợp cho máy bơm công suất lớn, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '1.0HP',
    'power_kw', '0.75KW',
    'voltage', '220V',
    'series', '4.0TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

('Tủ Điện 4.0TD-1.5HP (1.5HP 1.1KW 220V)', 'tu-dien-40td-15hp', '4.0TD-1.5HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
230000, 'DONGYIN', '4.0TD-1.5HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 4.0TD-1.5HP, công suất 1.5HP (1.1KW), điện áp 220V',
'Tủ điện TD 4.0 Series phù hợp cho máy bơm công suất lớn, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '1.5HP',
    'power_kw', '1.1KW',
    'voltage', '220V',
    'series', '4.0TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false),

('Tủ Điện 4.0TD-2.0HP (2.0HP 1.5KW 220V)', 'tu-dien-40td-20hp', '4.0TD-2.0HP',
(SELECT id FROM categories WHERE slug = 'tu-dien-td-series' LIMIT 1),
250000, 'DONGYIN', '4.0TD-2.0HP', 'Trung Quốc', '12 tháng',
'Tủ điện điều khiển máy bơm 4.0TD-2.0HP, công suất 2.0HP (1.5KW), điện áp 220V',
'Tủ điện TD 4.0 Series phù hợp cho máy bơm công suất lớn, có đầy đủ tính năng bảo vệ.',
JSON_OBJECT(
    'power_hp', '2.0HP',
    'power_kw', '1.5KW',
    'voltage', '220V',
    'series', '4.0TD',
    'features', JSON_ARRAY('Bảo vệ quá tải', 'Bảo vệ thiếu pha', 'Chống cháy khô')
),
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800', 50, false);


-- ============================================
-- DONE! - Part 1
-- ============================================
-- QS Series: 14 products ✓
-- WS Series: 8 products ✓
-- WQ Series: 14 products ✓
-- TD Series: 14 products ✓
-- Total so far: 50 products
-- ============================================
-- Còn tiếp: SD, 4SDM, 4SD, 4SP, 6SR/6SP, 4DP Series
-- ============================================
