-- ============================================
-- VOLTOR VIETNAM - DONGYIN & TD Products
-- ============================================
-- SD Series (DONGYIN) & TD Series (Tủ Điện)
-- Data từ bảng giá ngày 01/05/2025
-- ============================================

-- ============================================
-- SD SERIES - Bơm Chìm Hóa Tiến DONGYIN
-- ============================================

-- 2SDM-0.7/32
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 2SDM-0.7/32',
    'may-bom-chim-hoa-tien-dongyin-2sdm-0-7-32',
    '2SDM-0.7/32',
    5, -- Máy Bơm Chìm
    2000000, NULL, 0,
    'Bơm chìm hóa tiến 1/3HP, lưu lượng 0.36-1.1m³/H, hồng xả Ø27mm',
    'Máy bơm chìm hóa tiến DONGYIN 2SDM-0.7/32 công suất 1/3HP (0.25KW), điện áp 220V. Chuyên dụng cho hệ thống lọc nước, tuần hoàn hóa chất, xử lý nước thải. Thiết kế nhỏ gọn, vận hành êm, tiết kiệm điện.',
    'DONGYIN', '2SDM-0.7/32', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1/3HP',
        'power_kw', '0.25KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø27mm',
        'flow_rate', '0.36m³/33m, 0.72m³/25m, 1.1m³/14m',
        'head_max', '33m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    15, FALSE, FALSE, TRUE
);

-- 2SDM-0.7/38
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 2SDM-0.7/38',
    'may-bom-chim-hoa-tien-dongyin-2sdm-0-7-38',
    '2SDM-0.7/38',
    5, -- Máy Bơm Chìm
    2200000, NULL, 0,
    'Bơm chìm hóa tiến 1/2HP, lưu lượng 0.36-1.1m³/H, hồng xả Ø27mm',
    'Máy bơm chìm hóa tiến DONGYIN 2SDM-0.7/38 công suất 1/2HP (0.37KW), điện áp 220V. Phù hợp bơm nước sạch, hóa chất, dung dịch ăn mòn.',
    'DONGYIN', '2SDM-0.7/38', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1/2HP',
        'power_kw', '0.37KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø27mm',
        'flow_rate', '0.36m³/39m, 0.72m³/30m, 1.1m³/17m',
        'head_max', '39m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    12, FALSE, FALSE, TRUE
);

-- 2.5SDM-1.5/12
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 2.5SDM-1.5/12',
    'may-bom-chim-hoa-tien-dongyin-2-5sdm-1-5-12',
    '2.5SDM-1.5/12',
    5, -- Máy Bơm Chìm
    1580000, NULL, 0,
    'Bơm chìm hóa tiến 1/3HP, lưu lượng 0.6-2.5m³/H, hồng xả Ø34mm',
    'Máy bơm chìm hóa tiến DONGYIN 2.5SDM-1.5/12 công suất 1/3HP (0.25KW), điện áp 220V. Hiệu suất cao, độ bền vượt trội.',
    'DONGYIN', '2.5SDM-1.5/12', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1/3HP',
        'power_kw', '0.25KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø34mm',
        'flow_rate', '0.6m³/28m, 1.5m³/20m, 2.5m³/5m',
        'head_max', '28m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    20, TRUE, FALSE, TRUE
);

-- 2.5SDM-1.5/17
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 2.5SDM-1.5/17',
    'may-bom-chim-hoa-tien-dongyin-2-5sdm-1-5-17',
    '2.5SDM-1.5/17',
    5, -- Máy Bơm Chìm
    1780000, NULL, 0,
    'Bơm chìm hóa tiến 1/2HP, lưu lượng 0.6-2.5m³/H, hồng xả Ø34mm',
    'Máy bơm chìm hóa tiến DONGYIN 2.5SDM-1.5/17 công suất 1/2HP (0.37KW), điện áp 220V. Chất lượng cao, giá tốt.',
    'DONGYIN', '2.5SDM-1.5/17', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1/2HP',
        'power_kw', '0.37KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø34mm',
        'flow_rate', '0.6m³/39m, 1.5m³/30m, 2.5m³/7m',
        'head_max', '39m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    18, FALSE, TRUE, TRUE
);

-- 2.5SDM-1.5/24
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 2.5SDM-1.5/24',
    'may-bom-chim-hoa-tien-dongyin-2-5sdm-1-5-24',
    '2.5SDM-1.5/24',
    5, -- Máy Bơm Chìm
    2050000, NULL, 0,
    'Bơm chìm hóa tiến 3/4HP, lưu lượng 0.6-2.5m³/H, hồng xả Ø34mm',
    'Máy bơm chìm hóa tiến DONGYIN 2.5SDM-1.5/24 công suất 3/4HP (0.55KW), điện áp 220V. Công suất lớn, cột áp cao.',
    'DONGYIN', '2.5SDM-1.5/24', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '3/4HP',
        'power_kw', '0.55KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø34mm',
        'flow_rate', '0.6m³/56m, 1.5m³/40m, 2.5m³/10m',
        'head_max', '56m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    15, TRUE, TRUE, TRUE
);

-- 2.5SDM-1.5/31
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 2.5SDM-1.5/31',
    'may-bom-chim-hoa-tien-dongyin-2-5sdm-1-5-31',
    '2.5SDM-1.5/31',
    5, -- Máy Bơm Chìm
    2400000, NULL, 0,
    'Bơm chìm hóa tiến 1.0HP, lưu lượng 0.6-2.5m³/H, hồng xả Ø34mm',
    'Máy bơm chìm hóa tiến DONGYIN 2.5SDM-1.5/31 công suất 1.0HP (0.75KW), điện áp 220V. Hiệu suất vượt trội.',
    'DONGYIN', '2.5SDM-1.5/31', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.0HP',
        'power_kw', '0.75KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø34mm',
        'flow_rate', '0.6m³/72m, 1.5m³/52m, 2.5m³/13m',
        'head_max', '72m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    10, TRUE, TRUE, TRUE
);

-- 3SDM Series (Ø34mm)
-- 3SDM-03/11
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/11',
    'may-bom-chim-hoa-tien-dongyin-3sdm-03-11',
    '3SDM-03/11',
    5, -- Máy Bơm Chìm
    1880000, NULL, 0,
    'Bơm chìm hóa tiến 1/2HP, lưu lượng 1.8-3.9m³/H, hồng xả Ø34mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/11 công suất 1/2HP (0.37KW), điện áp 220V. Dòng 3SDM với lưu lượng lớn hơn.',
    'DONGYIN', '3SDM-03/11', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1/2HP',
        'power_kw', '0.37KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø34mm',
        'flow_rate', '1.8m³/39m, 3.0m³/28m, 3.9m³/12m',
        'head_max', '39m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    14, FALSE, FALSE, TRUE
);

-- 3SDM-03/16
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/16',
    'may-bom-chim-hoa-tien-dongyin-3sdm-03-16',
    '3SDM-03/16',
    5, -- Máy Bơm Chìm
    2150000, NULL, 0,
    'Bơm chìm hóa tiến 3/4HP, lưu lượng 1.8-3.9m³/H, hồng xả Ø34mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/16 công suất 3/4HP (0.55KW), điện áp 220V. Phù hợp hệ thống lọc công nghiệp.',
    'DONGYIN', '3SDM-03/16', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '3/4HP',
        'power_kw', '0.55KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø34mm',
        'flow_rate', '1.8m³/57m, 3.0m³/41m, 3.9m³/17m',
        'head_max', '57m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    12, TRUE, FALSE, TRUE
);

-- 3SDM-03/21
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/21',
    'may-bom-chim-hoa-tien-dongyin-3sdm-03-21',
    '3SDM-03/21',
    5, -- Máy Bơm Chìm
    2450000, NULL, 0,
    'Bơm chìm hóa tiến 1.0HP, lưu lượng 1.8-3.9m³/H, hồng xả Ø34mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/21 công suất 1.0HP (0.75KW), điện áp 220V. Cột áp cao, lưu lượng ổn định.',
    'DONGYIN', '3SDM-03/21', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.0HP',
        'power_kw', '0.75KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø34mm',
        'flow_rate', '1.8m³/74m, 3.0m³/53m, 3.9m³/23m',
        'head_max', '74m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    10, TRUE, TRUE, TRUE
);

-- 3SDM-03/26
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/26',
    'may-bom-chim-hoa-tien-dongyin-3sdm-03-26',
    '3SDM-03/26',
    5, -- Máy Bơm Chìm
    2760000, NULL, 0,
    'Bơm chìm hóa tiến 1.25HP, lưu lượng 1.8-3.9m³/H, hồng xả Ø34mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/26 công suất 1.25HP (0.92KW), điện áp 220V. Hiệu suất cao cho công nghiệp.',
    'DONGYIN', '3SDM-03/26', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.25HP',
        'power_kw', '0.92KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø34mm',
        'flow_rate', '1.8m³/92m, 3.0m³/66m, 3.9m³/28m',
        'head_max', '92m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    8, TRUE, FALSE, TRUE
);

-- 3SDM-03/31
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/31',
    'may-bom-chim-hoa-tien-dongyin-3sdm-03-31',
    '3SDM-03/31',
    5, -- Máy Bơm Chìm
    3150000, NULL, 0,
    'Bơm chìm hóa tiến 1.5HP, lưu lượng 1.8-3.9m³/H, hồng xả Ø34mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/31 công suất 1.5HP (1.1KW), điện áp 220V. Mạnh mẽ, bền bỉ.',
    'DONGYIN', '3SDM-03/31', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø34mm',
        'flow_rate', '1.8m³/110m, 3.0m³/79m, 3.9m³/34m',
        'head_max', '110m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    6, TRUE, TRUE, TRUE
);

-- 3SDM-03/37
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/37',
    'may-bom-chim-hoa-tien-dongyin-3sdm-03-37',
    '3SDM-03/37',
    5, -- Máy Bơm Chìm
    3550000, NULL, 0,
    'Bơm chìm hóa tiến 2.0HP, lưu lượng 1.8-3.9m³/H, hồng xả Ø34mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-03/37 công suất 2.0HP (1.5KW), điện áp 220V. Công suất lớn nhất dòng Ø34mm.',
    'DONGYIN', '3SDM-03/37', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø34mm',
        'flow_rate', '1.8m³/131m, 3.0m³/94m, 3.9m³/40m',
        'head_max', '131m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    5, TRUE, TRUE, FALSE
);

-- 3SDM Series (Ø42mm)
-- 3SDM-04/09
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/09',
    'may-bom-chim-hoa-tien-dongyin-3sdm-04-09',
    '3SDM-04/09',
    5, -- Máy Bơm Chìm
    1860000, NULL, 0,
    'Bơm chìm hóa tiến 1/2HP, lưu lượng 3.0-5.4m³/H, hồng xả Ø42mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/09 công suất 1/2HP (0.37KW), điện áp 220V. Hồng xả Ø42mm, lưu lượng lớn.',
    'DONGYIN', '3SDM-04/09', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1/2HP',
        'power_kw', '0.37KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '3.0m³/32m, 4.2m³/24m, 5.4m³/12m',
        'head_max', '32m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    14, FALSE, FALSE, TRUE
);

-- 3SDM-04/12
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/12',
    'may-bom-chim-hoa-tien-dongyin-3sdm-04-12',
    '3SDM-04/12',
    5, -- Máy Bơm Chìm
    2100000, NULL, 0,
    'Bơm chìm hóa tiến 3/4HP, lưu lượng 3.0-5.4m³/H, hồng xả Ø42mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/12 công suất 3/4HP (0.55KW), điện áp 220V. Hiệu suất tối ưu.',
    'DONGYIN', '3SDM-04/12', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '3/4HP',
        'power_kw', '0.55KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '3.0m³/42m, 4.2m³/32m, 5.4m³/15m',
        'head_max', '42m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    12, TRUE, FALSE, TRUE
);

-- 3SDM-04/16
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/16',
    'may-bom-chim-hoa-tien-dongyin-3sdm-04-16',
    '3SDM-04/16',
    5, -- Máy Bơm Chìm
    2360000, NULL, 0,
    'Bơm chìm hóa tiến 1.0HP, lưu lượng 3.0-5.4m³/H, hồng xả Ø42mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/16 công suất 1.0HP (0.75KW), điện áp 220V. Lưu lượng lớn, cột áp cao.',
    'DONGYIN', '3SDM-04/16', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.0HP',
        'power_kw', '0.75KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '3.0m³/56m, 4.2m³/42m, 5.4m³/21m',
        'head_max', '56m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    10, TRUE, TRUE, TRUE
);

-- 3SDM-04/20
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/20',
    'may-bom-chim-hoa-tien-dongyin-3sdm-04-20',
    '3SDM-04/20',
    5, -- Máy Bơm Chìm
    2700000, NULL, 0,
    'Bơm chìm hóa tiến 1.25HP, lưu lượng 3.0-5.4m³/H, hồng xả Ø42mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/20 công suất 1.25HP (0.92KW), điện áp 220V. Phù hợp công nghiệp.',
    'DONGYIN', '3SDM-04/20', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.25HP',
        'power_kw', '0.92KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '3.0m³/70m, 4.2m³/53m, 5.4m³/25m',
        'head_max', '70m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    8, TRUE, FALSE, TRUE
);

-- 3SDM-04/24
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/24',
    'may-bom-chim-hoa-tien-dongyin-3sdm-04-24',
    '3SDM-04/24',
    5, -- Máy Bơm Chìm
    3050000, NULL, 0,
    'Bơm chìm hóa tiến 1.5HP, lưu lượng 3.0-5.4m³/H, hồng xả Ø42mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/24 công suất 1.5HP (1.1KW), điện áp 220V. Công suất mạnh mẽ.',
    'DONGYIN', '3SDM-04/24', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '3.0m³/84m, 4.2m³/63m, 5.4m³/31m',
        'head_max', '84m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    6, TRUE, TRUE, TRUE
);

-- 3SDM-04/28
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/28',
    'may-bom-chim-hoa-tien-dongyin-3sdm-04-28',
    '3SDM-04/28',
    5, -- Máy Bơm Chìm
    3450000, NULL, 0,
    'Bơm chìm hóa tiến 2.0HP, lưu lượng 3.0-5.4m³/H, hồng xả Ø42mm',
    'Máy bơm chìm hóa tiến DONGYIN 3SDM-04/28 công suất 2.0HP (1.5KW), điện áp 220V. Công suất cực mạnh cho Ø42mm.',
    'DONGYIN', '3SDM-04/28', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '3.0m³/98m, 4.2m³/74m, 5.4m³/36m',
        'head_max', '98m',
        'material', 'Inox 304',
        'series', 'SD Series'
    ),
    'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png',
    JSON_ARRAY('figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'),
    5, TRUE, TRUE, FALSE
);

-- ============================================
-- TỦ ĐIỆN TD SERIES
-- ============================================

-- 2.0TD-0.50HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 2.0TD-0.50HP',
    'tu-dien-bom-nuoc-voltor-2-0td-0-50hp',
    '2.0TD-0.50HP',
    8, -- Điện Công Nghiệp
    190000, NULL, 0,
    'Tủ điện bơm nước 0.5HP - 0.37KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 2.0TD-0.50HP cho máy bơm 0.5HP (0.37KW), điện áp 220V. Bảo vệ quá tải, thiếu pha, ngắn mạch. Dễ dàng lắp đặt, vận hành ổn định.',
    'VOLTOR', '2.0TD-0.50HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.5HP',
        'power_kw', '0.37KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    50, TRUE, TRUE, FALSE
);

-- 2.5TD-0.33HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 2.5TD-0.33HP',
    'tu-dien-bom-nuoc-voltor-2-5td-0-33hp',
    '2.5TD-0.33HP',
    8, -- Điện Công Nghiệp
    200000, NULL, 0,
    'Tủ điện bơm nước 0.33HP - 0.25KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 2.5TD-0.33HP cho máy bơm 0.33HP (0.25KW), điện áp 220V. Thiết kế nhỏ gọn, an toàn cao.',
    'VOLTOR', '2.5TD-0.33HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.33HP',
        'power_kw', '0.25KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    45, FALSE, TRUE, FALSE
);

-- 2.5TD-0.50HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 2.5TD-0.50HP',
    'tu-dien-bom-nuoc-voltor-2-5td-0-50hp',
    '2.5TD-0.50HP',
    8, -- Điện Công Nghiệp
    190000, NULL, 0,
    'Tủ điện bơm nước 0.5HP - 0.37KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 2.5TD-0.50HP cho máy bơm 0.5HP (0.37KW), điện áp 220V. Chất lượng cao, giá tốt.',
    'VOLTOR', '2.5TD-0.50HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.5HP',
        'power_kw', '0.37KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    48, TRUE, TRUE, FALSE
);

-- 2.5TD-0.75HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 2.5TD-0.75HP',
    'tu-dien-bom-nuoc-voltor-2-5td-0-75hp',
    '2.5TD-0.75HP',
    8, -- Điện Công Nghiệp
    200000, NULL, 0,
    'Tủ điện bơm nước 0.75HP - 0.55KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 2.5TD-0.75HP cho máy bơm 0.75HP (0.55KW), điện áp 220V. Bảo vệ toàn diện.',
    'VOLTOR', '2.5TD-0.75HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.75HP',
        'power_kw', '0.55KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    40, FALSE, TRUE, FALSE
);

-- 2.5TD-1.0HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 2.5TD-1.0HP',
    'tu-dien-bom-nuoc-voltor-2-5td-1-0hp',
    '2.5TD-1.0HP',
    8, -- Điện Công Nghiệp
    210000, NULL, 0,
    'Tủ điện bơm nước 1.0HP - 0.75KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 2.5TD-1.0HP cho máy bơm 1.0HP (0.75KW), điện áp 220V. An toàn, bền bỉ.',
    'VOLTOR', '2.5TD-1.0HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.0HP',
        'power_kw', '0.75KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    35, TRUE, TRUE, FALSE
);

-- 3.0TD Series
-- 3.0TD-0.5HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 3.0TD-0.5HP',
    'tu-dien-bom-nuoc-voltor-3-0td-0-5hp',
    '3.0TD-0.5HP',
    8, -- Điện Công Nghiệp
    190000, NULL, 0,
    'Tủ điện bơm nước 0.5HP - 0.37KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 3.0TD-0.5HP cho máy bơm 0.5HP (0.37KW), điện áp 220V. Dòng 3.0TD với tính năng mở rộng.',
    'VOLTOR', '3.0TD-0.5HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.5HP',
        'power_kw', '0.37KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    42, FALSE, TRUE, FALSE
);

-- 3.0TD-0.75HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 3.0TD-0.75HP',
    'tu-dien-bom-nuoc-voltor-3-0td-0-75hp',
    '3.0TD-0.75HP',
    8, -- Điện Công Nghiệp
    200000, NULL, 0,
    'Tủ điện bơm nước 0.75HP - 0.55KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 3.0TD-0.75HP cho máy bơm 0.75HP (0.55KW), điện áp 220V. Thiết kế chắc chắn.',
    'VOLTOR', '3.0TD-0.75HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.75HP',
        'power_kw', '0.55KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    38, TRUE, TRUE, FALSE
);

-- 3.0TD-1.0HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 3.0TD-1.0HP',
    'tu-dien-bom-nuoc-voltor-3-0td-1-0hp',
    '3.0TD-1.0HP',
    8, -- Điện Công Nghiệp
    210000, NULL, 0,
    'Tủ điện bơm nước 1.0HP - 0.75KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 3.0TD-1.0HP cho máy bơm 1.0HP (0.75KW), điện áp 220V. Bán chạy nhất.',
    'VOLTOR', '3.0TD-1.0HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.0HP',
        'power_kw', '0.75KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    30, TRUE, TRUE, TRUE
);

-- 3.0TD-1.25HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 3.0TD-1.25HP',
    'tu-dien-bom-nuoc-voltor-3-0td-1-25hp',
    '3.0TD-1.25HP',
    8, -- Điện Công Nghiệp
    220000, NULL, 0,
    'Tủ điện bơm nước 1.25HP - 0.92KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 3.0TD-1.25HP cho máy bơm 1.25HP (0.92KW), điện áp 220V. Chất lượng cao.',
    'VOLTOR', '3.0TD-1.25HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.25HP',
        'power_kw', '0.92KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    28, FALSE, TRUE, TRUE
);

-- 3.0TD-1.5HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 3.0TD-1.5HP',
    'tu-dien-bom-nuoc-voltor-3-0td-1-5hp',
    '3.0TD-1.5HP',
    8, -- Điện Công Nghiệp
    230000, NULL, 0,
    'Tủ điện bơm nước 1.5HP - 1.1KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 3.0TD-1.5HP cho máy bơm 1.5HP (1.1KW), điện áp 220V. Hiệu suất tối ưu.',
    'VOLTOR', '3.0TD-1.5HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    25, TRUE, TRUE, TRUE
);

-- 3.0TD-2.0HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 3.0TD-2.0HP',
    'tu-dien-bom-nuoc-voltor-3-0td-2-0hp',
    '3.0TD-2.0HP',
    8, -- Điện Công Nghiệp
    250000, NULL, 0,
    'Tủ điện bơm nước 2.0HP - 1.5KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 3.0TD-2.0HP cho máy bơm 2.0HP (1.5KW), điện áp 220V. Công suất lớn.',
    'VOLTOR', '3.0TD-2.0HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    22, TRUE, TRUE, TRUE
);

-- 4.0TD Series
-- 4.0TD-1.0HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 4.0TD-1.0HP',
    'tu-dien-bom-nuoc-voltor-4-0td-1-0hp',
    '4.0TD-1.0HP',
    8, -- Điện Công Nghiệp
    220000, NULL, 0,
    'Tủ điện bơm nước 1.0HP - 0.75KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 4.0TD-1.0HP cho máy bơm 1.0HP (0.75KW), điện áp 220V. Dòng 4.0 cao cấp.',
    'VOLTOR', '4.0TD-1.0HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.0HP',
        'power_kw', '0.75KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    20, FALSE, TRUE, TRUE
);

-- 4.0TD-1.5HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 4.0TD-1.5HP',
    'tu-dien-bom-nuoc-voltor-4-0td-1-5hp',
    '4.0TD-1.5HP',
    8, -- Điện Công Nghiệp
    230000, NULL, 0,
    'Tủ điện bơm nước 1.5HP - 1.1KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 4.0TD-1.5HP cho máy bơm 1.5HP (1.1KW), điện áp 220V. Tính năng cao cấp.',
    'VOLTOR', '4.0TD-1.5HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    18, TRUE, TRUE, TRUE
);

-- 4.0TD-2.0HP
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Tủ điện bơm nước VOLTOR 4.0TD-2.0HP',
    'tu-dien-bom-nuoc-voltor-4-0td-2-0hp',
    '4.0TD-2.0HP',
    8, -- Điện Công Nghiệp
    250000, NULL, 0,
    'Tủ điện bơm nước 2.0HP - 1.5KW, điện áp 220V',
    'Tủ điện bơm nước VOLTOR 4.0TD-2.0HP cho máy bơm 2.0HP (1.5KW), điện áp 220V. Cao cấp nhất dòng 4.0TD.',
    'VOLTOR', '4.0TD-2.0HP', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '220V',
        'protection', 'Quá tải, thiếu pha, ngắn mạch',
        'contactor', 'Có',
        'thermal_relay', 'Có',
        'material', 'Nhựa chống cháy',
        'series', 'TD Series'
    ),
    'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png',
    JSON_ARRAY('figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'),
    15, TRUE, TRUE, TRUE
);

-- ============================================
-- DONE! Total 32 products added
-- ============================================
-- 18 DONGYIN SD Series products
-- 14 VOLTOR TD Series products
-- ============================================

SELECT 'DONGYIN & TD Series products added successfully!' as message;
