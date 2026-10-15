-- ============================================
-- VOLTOR VIETNAM - 6SR/6SP Series COMPLETE
-- ============================================
-- Data từ bảng giá ngày 01/05/2025
-- All products from 6SR/6SP Series catalog
-- ============================================

-- ============================================
-- 6SR SERIES - Bơm Chìm Hóa Tiến 6SR (380V - Motor 6m)
-- ============================================

-- 6SR30-04 (Existing - keeping for reference)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SR30-04',
    'may-bom-chim-hoa-tien-dongyin-6sr30-04',
    '6SR30-04',
    7,
    9700000, NULL, 0,
    'Bơm chìm hóa tiến 6SR 5.5HP, lưu lượng 20-40m³/H, cột áp 42-10m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SR30-04 công suất 5.5HP (4.0KW), điện áp 380V. Motor 6m, lưu lượng lớn cho công nghiệp.',
    'DONGYIN', '6SR30-04', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '5.5HP',
        'power_kw', '4.0KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '20m³/42m, 30m³/30m, 40m³/10m',
        'head_max', '42m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SR Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    8, TRUE, FALSE, TRUE
) ON DUPLICATE KEY UPDATE 
    price = VALUES(price),
    images = VALUES(images);

-- 6SR30-06 ✨ NEW
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SR30-06',
    'may-bom-chim-hoa-tien-dongyin-6sr30-06',
    '6SR30-06',
    7,
    13500000, NULL, 0,
    'Bơm chìm hóa tiến 6SR 7.5HP, lưu lượng 20-40m³/H, cột áp 63-12m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SR30-06 công suất 7.5HP (5.5KW), điện áp 380V. Motor 6m, cột áp cao 63m.',
    'DONGYIN', '6SR30-06', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '7.5HP',
        'power_kw', '5.5KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '20m³/63m, 30m³/44m, 40m³/12m',
        'head_max', '63m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SR Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    6, TRUE, TRUE, TRUE
);

-- 6SR30-08 ✨ NEW - Featured
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SR30-08',
    'may-bom-chim-hoa-tien-dongyin-6sr30-08',
    '6SR30-08',
    7,
    15300000, NULL, 0,
    'Bơm chìm hóa tiến 6SR 10HP, lưu lượng 20-40m³/H, cột áp 85-16m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SR30-08 công suất 10HP (7.5KW), điện áp 380V. Motor 6m, cột áp cao nhất 85m.',
    'DONGYIN', '6SR30-08', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '10HP',
        'power_kw', '7.5KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '20m³/85m, 30m³/58m, 40m³/16m',
        'head_max', '85m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SR Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    5, TRUE, TRUE, TRUE
);

-- 6SR45-05 ✨ NEW
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SR45-05',
    'may-bom-chim-hoa-tien-dongyin-6sr45-05',
    '6SR45-05',
    7,
    14700000, NULL, 0,
    'Bơm chìm hóa tiến 6SR 10HP, lưu lượng 36-60m³/H, cột áp 48-22m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SR45-05 công suất 10HP (7.5KW), điện áp 380V. Motor 6m, lưu lượng lớn 36-60m³/H.',
    'DONGYIN', '6SR45-05', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '10HP',
        'power_kw', '7.5KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '36m³/48m, 48m³/38m, 60m³/22m',
        'head_max', '48m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SR Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    7, TRUE, FALSE, TRUE
);

-- 6SR45-07 (Existing - keeping for reference)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SR45-07',
    'may-bom-chim-hoa-tien-dongyin-6sr45-07',
    '6SR45-07',
    7,
    18300000, NULL, 0,
    'Bơm chìm hóa tiến 6SR 15HP, lưu lượng 36-60m³/H, cột áp 68-31m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SR45-07 công suất 15HP (11KW), điện áp 380V. Motor 6m, công suất mạnh.',
    'DONGYIN', '6SR45-07', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '15HP',
        'power_kw', '11KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '36m³/68m, 48m³/54m, 60m³/31m',
        'head_max', '68m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SR Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    4, TRUE, TRUE, TRUE
) ON DUPLICATE KEY UPDATE 
    price = VALUES(price),
    images = VALUES(images);

-- 6SR60-06 ✨ NEW
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SR60-06',
    'may-bom-chim-hoa-tien-dongyin-6sr60-06',
    '6SR60-06',
    7,
    18300000, NULL, 0,
    'Bơm chìm hóa tiến 6SR 15HP, lưu lượng 48-72m³/H, cột áp 52-33m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SR60-06 công suất 15HP (11KW), điện áp 380V. Motor 6m, lưu lượng rất lớn 48-72m³/H.',
    'DONGYIN', '6SR60-06', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '15HP',
        'power_kw', '11KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '48m³/52m, 60m³/43m, 72m³/33m',
        'head_max', '52m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SR Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    4, TRUE, TRUE, TRUE
);

-- 6SR45-10 ✨ NEW - Bestseller
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SR45-10',
    'may-bom-chim-hoa-tien-dongyin-6sr45-10',
    '6SR45-10',
    7,
    22300000, NULL, 0,
    'Bơm chìm hóa tiến 6SR 20HP, lưu lượng 36-60m³/H, cột áp 97-45m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SR45-10 công suất 20HP (15KW), điện áp 380V. Motor 6m, cột áp siêu cao 97m.',
    'DONGYIN', '6SR45-10', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '20HP',
        'power_kw', '15KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '36m³/97m, 48m³/77m, 60m³/45m',
        'head_max', '97m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SR Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    3, TRUE, TRUE, TRUE
);

-- 6SR60-08 (Existing - keeping for reference)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SR60-08',
    'may-bom-chim-hoa-tien-dongyin-6sr60-08',
    '6SR60-08',
    7,
    22100000, NULL, 0,
    'Bơm chìm hóa tiến 6SR 20HP, lưu lượng 48-72m³/H, cột áp 69-44m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SR60-08 công suất 20HP (15KW), điện áp 380V. Motor 6m, cao cấp nhất dòng 6SR.',
    'DONGYIN', '6SR60-08', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '20HP',
        'power_kw', '15KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '48m³/69m, 60m³/57m, 72m³/44m',
        'head_max', '69m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SR Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    3, TRUE, TRUE, FALSE
) ON DUPLICATE KEY UPDATE 
    price = VALUES(price),
    images = VALUES(images);

-- ============================================
-- 6SP SERIES - Bơm Chìm Hóa Tiến 6SP
-- ============================================

-- ============================================
-- 6SP Series - Motor 4m (220V)
-- ============================================

-- 6SP18-04 (Existing - keeping for reference)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP18-04',
    'may-bom-chim-hoa-tien-dongyin-6sp18-04',
    '6SP18-04',
    5,
    6300000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 3.0HP, lưu lượng 9-21m³/H, cột áp 23-42m - 220V Motor 4m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP18-04 công suất 3.0HP (2.2KW), điện áp 220V. Motor 4m, phù hợp giếng khoan.',
    'DONGYIN', '6SP18-04', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '3.0HP',
        'power_kw', '2.2KW',
        'voltage', '220V',
        'flow_rate', '21m³/23m, 15m³/35m, 9m³/42m',
        'head_max', '42m',
        'motor_length', '4m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    8, TRUE, FALSE, TRUE
) ON DUPLICATE KEY UPDATE 
    price = VALUES(price),
    images = VALUES(images);

-- 6SP18-05 ✨ NEW
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP18-05',
    'may-bom-chim-hoa-tien-dongyin-6sp18-05',
    '6SP18-05',
    5,
    7800000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 4.0HP, lưu lượng 9-21m³/H, cột áp 29-52m - 220V Motor 4m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP18-05 công suất 4.0HP (3.0KW), điện áp 220V. Motor 4m, cột áp cao 52m.',
    'DONGYIN', '6SP18-05', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '4.0HP',
        'power_kw', '3.0KW',
        'voltage', '220V',
        'flow_rate', '21m³/29m, 15m³/44m, 9m³/52m',
        'head_max', '52m',
        'motor_length', '4m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    7, TRUE, FALSE, TRUE
);

-- 6SP18-07 ✨ NEW - Featured
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP18-07',
    'may-bom-chim-hoa-tien-dongyin-6sp18-07',
    '6SP18-07',
    5,
    11000000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 5.5HP, lưu lượng 9-21m³/H, cột áp 40-73m - 220V Motor 4m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP18-07 công suất 5.5HP (4.0KW), điện áp 220V. Motor 4m, cột áp siêu cao 73m.',
    'DONGYIN', '6SP18-07', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '5.5HP',
        'power_kw', '4.0KW',
        'voltage', '220V',
        'flow_rate', '21m³/40m, 15m³/61m, 9m³/73m',
        'head_max', '73m',
        'motor_length', '4m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    6, TRUE, TRUE, TRUE
);

-- 6SP18-10 (Existing - keeping for reference)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP18-10',
    'may-bom-chim-hoa-tien-dongyin-6sp18-10',
    '6SP18-10',
    5,
    13200000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 7.5HP, lưu lượng 9-21m³/H, cột áp 58-104m - 220V Motor 4m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP18-10 công suất 7.5HP (5.5KW), điện áp 220V. Motor 4m, cột áp siêu cao 104m.',
    'DONGYIN', '6SP18-10', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '7.5HP',
        'power_kw', '5.5KW',
        'voltage', '220V',
        'flow_rate', '21m³/58m, 15m³/87m, 9m³/104m',
        'head_max', '104m',
        'motor_length', '4m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    6, TRUE, TRUE, TRUE
) ON DUPLICATE KEY UPDATE 
    price = VALUES(price),
    images = VALUES(images);

-- 6SP18-12 ✨ NEW - Bestseller
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP18-12',
    'may-bom-chim-hoa-tien-dongyin-6sp18-12',
    '6SP18-12',
    5,
    15200000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 10HP, lưu lượng 18-42m³/H, cột áp 69-125m - 220V Motor 4m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP18-12 công suất 10HP (7.5KW), điện áp 220V. Motor 4m, cột áp cực cao 125m.',
    'DONGYIN', '6SP18-12', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '10HP',
        'power_kw', '7.5KW',
        'voltage', '220V',
        'flow_rate', '18m³/69m, 30m³/105m, 42m³/125m',
        'head_max', '125m',
        'motor_length', '4m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    5, TRUE, TRUE, TRUE
);

-- ============================================
-- 6SP Series - Motor 6m (380V)
-- ============================================

-- 6SP30-6 (Existing - keeping for reference)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP30-6',
    'may-bom-chim-hoa-tien-dongyin-6sp30-6',
    '6SP30-6',
    7,
    15200000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 7.5HP, lưu lượng 18-42m³/H, cột áp 58-21m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP30-6 công suất 7.5HP (5.5KW), điện áp 380V. Motor 6m, lưu lượng cao.',
    'DONGYIN', '6SP30-6', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '7.5HP',
        'power_kw', '5.5KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '18m³/58m, 30m³/46m, 42m³/21m',
        'head_max', '58m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    5, TRUE, FALSE, TRUE
) ON DUPLICATE KEY UPDATE 
    price = VALUES(price),
    images = VALUES(images);

-- 6SP30-8 ✨ NEW
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP30-8',
    'may-bom-chim-hoa-tien-dongyin-6sp30-8',
    '6SP30-8',
    7,
    17700000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 10HP, lưu lượng 18-42m³/H, cột áp 77-28m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP30-8 công suất 10HP (7.5KW), điện áp 380V. Motor 6m, cột áp 77m.',
    'DONGYIN', '6SP30-8', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '10HP',
        'power_kw', '7.5KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '18m³/77m, 30m³/61m, 42m³/28m',
        'head_max', '77m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    6, TRUE, TRUE, TRUE
);

-- 6SP46-5 ✨ NEW
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP46-5',
    'may-bom-chim-hoa-tien-dongyin-6sp46-5',
    '6SP46-5',
    7,
    16600000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 10HP, lưu lượng 36-66m³/H, cột áp 50-15m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP46-5 công suất 10HP (7.5KW), điện áp 380V. Motor 6m, lưu lượng lớn 36-66m³/H.',
    'DONGYIN', '6SP46-5', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '10HP',
        'power_kw', '7.5KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '36m³/50m, 48m³/40m, 66m³/15m',
        'head_max', '50m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    5, TRUE, FALSE, TRUE
);

-- 6SP46-6 ✨ NEW
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP46-6',
    'may-bom-chim-hoa-tien-dongyin-6sp46-6',
    '6SP46-6',
    7,
    17700000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 12.5HP, lưu lượng 36-66m³/H, cột áp 60-18m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP46-6 công suất 12.5HP (9.2KW), điện áp 380V. Motor 6m, hiệu suất cao.',
    'DONGYIN', '6SP46-6', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '12.5HP',
        'power_kw', '9.2KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '36m³/60m, 48m³/49m, 66m³/18m',
        'head_max', '60m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    4, TRUE, TRUE, TRUE
);

-- 6SP46-7 ✨ NEW - Featured
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP46-7',
    'may-bom-chim-hoa-tien-dongyin-6sp46-7',
    '6SP46-7',
    7,
    21000000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 15HP, lưu lượng 36-66m³/H, cột áp 70-25m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP46-7 công suất 15HP (11KW), điện áp 380V. Motor 6m, cột áp cao 70m.',
    'DONGYIN', '6SP46-7', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '15HP',
        'power_kw', '11KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '36m³/70m, 48m³/57m, 66m³/25m',
        'head_max', '70m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    4, TRUE, TRUE, TRUE
);

-- 6SP46-10 (Existing - keeping for reference)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP46-10',
    'may-bom-chim-hoa-tien-dongyin-6sp46-10',
    '6SP46-10',
    7,
    26200000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 20HP, lưu lượng 36-66m³/H, cột áp 100-36m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP46-10 công suất 20HP (15KW), điện áp 380V. Motor 6m, công suất lớn.',
    'DONGYIN', '6SP46-10', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '20HP',
        'power_kw', '15KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '36m³/100m, 48m³/81m, 66m³/36m',
        'head_max', '100m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    3, TRUE, TRUE, FALSE
) ON DUPLICATE KEY UPDATE 
    price = VALUES(price),
    images = VALUES(images);

-- 6SP60-6 ✨ NEW
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP60-6',
    'may-bom-chim-hoa-tien-dongyin-6sp60-6',
    '6SP60-6',
    7,
    20300000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 15HP, lưu lượng 48-78m³/H, cột áp 58-22m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP60-6 công suất 15HP (11KW), điện áp 380V. Motor 6m, lưu lượng rất cao 48-78m³/H.',
    'DONGYIN', '6SP60-6', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '15HP',
        'power_kw', '11KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '48m³/58m, 60m³/47m, 78m³/22m',
        'head_max', '58m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    4, TRUE, TRUE, TRUE
);

-- 6SP60-8 (Existing - keeping for reference)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 6SP60-8',
    'may-bom-chim-hoa-tien-dongyin-6sp60-8',
    '6SP60-8',
    7,
    24700000, NULL, 0,
    'Bơm chìm hóa tiến 6SP 20HP, lưu lượng 48-78m³/H, cột áp 77-29m - 380V Motor 6m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP60-8 công suất 20HP (15KW), điện áp 380V. Motor 6m, cao cấp nhất dòng 6SP.',
    'DONGYIN', '6SP60-8', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '20HP',
        'power_kw', '15KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '48m³/77m, 60m³/63m, 78m³/29m',
        'head_max', '77m',
        'motor_length', '6m',
        'material', 'Inox 304',
        'series', '6SP Series'
    ),
    'figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png',
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png', 'figma:asset/db7b924c312b53fc85885c369a567f62df23ce21.png'),
    2, TRUE, TRUE, FALSE
) ON DUPLICATE KEY UPDATE 
    price = VALUES(price),
    images = VALUES(images);

-- ============================================
-- DONE! 6SR/6SP Series COMPLETE
-- ============================================
-- Total 21 products (8 x 6SR + 13 x 6SP)
-- New products added: 13
-- Updated existing: 8
-- ============================================

SELECT '6SR/6SP Series Complete! All 21 products added/updated successfully!' as message;
SELECT COUNT(*) as total_6sr_6sp_products FROM products WHERE brand = 'DONGYIN' AND (sku LIKE '6SR%' OR sku LIKE '6SP%');
