-- ============================================
-- VOLTOR VIETNAM - 4SDM/4SD/4SP/6SR/6SP Products
-- ============================================
-- Data từ bảng giá ngày 01/05/2025
-- ============================================

-- ============================================
-- 4SDM SERIES - Bơm Chìm Hóa Tiến 4SDM (220V)
-- ============================================

-- 4SDM-03/10
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 4SDM-03/10',
    'may-bom-chim-hoa-tien-dongyin-4sdm-03-10',
    '4SDM-03/10',
    5,
    2450000, NULL, 0,
    'Bơm chìm hóa tiến 0.44HP, lưu lượng 0.8-2.4m³/H, hồng xả Ø49mm - 220V',
    'Máy bơm chìm hóa tiến DONGYIN 4SDM-03/10 công suất 0.44HP (0.33KW), điện áp 220V. Hồng xả Ø49mm, phù hợp cho hệ thống lọc nước, tuần hoàn hóa chất.',
    'DONGYIN', '4SDM-03/10', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.44HP',
        'power_kw', '0.33KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø49mm',
        'flow_rate', '0.8m³/19m, 1.6m³/13m, 2.4m³/6m',
        'head_max', '19m',
        'material', 'Inox 304',
        'series', '4SDM Series'
    ),
    'figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png',
    JSON_ARRAY('figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png'),
    12, FALSE, FALSE, TRUE
);

-- 4SDM-04/08
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 4SDM-04/08',
    'may-bom-chim-hoa-tien-dongyin-4sdm-04-08',
    '4SDM-04/08',
    5,
    2400000, NULL, 0,
    'Bơm chìm hóa tiến 0.65HP, lưu lượng 0.4-1.7m³/H, hồng xả Ø42mm - 220V',
    'Máy bơm chìm hóa tiến DONGYIN 4SDM-04/08 công suất 0.65HP (0.55KW), điện áp 220V. Lưu lượng 0.4-1.7m³/H.',
    'DONGYIN', '4SDM-04/08', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.65HP',
        'power_kw', '0.55KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '0.4m³/15m, 0.8m³/12m, 1.7m³/5m',
        'head_max', '15m',
        'material', 'Inox 304',
        'series', '4SDM Series'
    ),
    'figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png',
    JSON_ARRAY('figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png'),
    10, FALSE, FALSE, TRUE
);

-- 4SDM-04/22 (bestseller)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 4SDM-04/22',
    'may-bom-chim-hoa-tien-dongyin-4sdm-04-22',
    '4SDM-04/22',
    5,
    3770000, NULL, 0,
    'Bơm chìm hóa tiến 1.5HP, lưu lượng 1.0-2.7m³/H, hồng xả Ø42mm - 220V',
    'Máy bơm chìm hóa tiến DONGYIN 4SDM-04/22 công suất 1.5HP (1.1KW), điện áp 220V. Bestseller với hiệu suất cao.',
    'DONGYIN', '4SDM-04/22', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '1.0m³/42m, 1.8m³/31m, 2.7m³/14m',
        'head_max', '42m',
        'material', 'Inox 304',
        'series', '4SDM Series'
    ),
    'figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png',
    JSON_ARRAY('figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png'),
    15, TRUE, TRUE, TRUE
);

-- ============================================
-- 4SD SERIES - Bơm Chìm Hóa Tiến 4SD (380V)
-- ============================================

-- 4SD-08/09
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 4SD-08/09',
    'may-bom-chim-hoa-tien-dongyin-4sd-08-09',
    '4SD-08/09',
    7,
    3000000, NULL, 0,
    'Bơm chìm hóa tiến 1.5HP, lưu lượng 10.0-14.0m³/H, hồng xả Ø42mm - 380V',
    'Máy bơm chìm hóa tiến DONGYIN 4SD-08/09 công suất 1.5HP (1.1KW), điện áp 380V (3 pha). Lưu lượng lớn cho công nghiệp.',
    'DONGYIN', '4SD-08/09', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '10.0m³/17m, 12.0m³/9m, 14.0m³/4m',
        'head_max', '17m',
        'material', 'Inox 304',
        'series', '4SD Series'
    ),
    'figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png',
    JSON_ARRAY('figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png'),
    8, FALSE, FALSE, TRUE
);

-- 4SD-12/12
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 4SD-12/12',
    'may-bom-chim-hoa-tien-dongyin-4sd-12-12',
    '4SD-12/12',
    7,
    5590000, NULL, 0,
    'Bơm chìm hóa tiến 3.0HP, lưu lượng 16.0-21.0m³/H, hồng xả Ø60mm - 380V',
    'Máy bơm chìm hóa tiến DONGYIN 4SD-12/12 công suất 3.0HP (2.2KW), điện áp 380V. Hồng xả Ø60mm, công suất mạnh.',
    'DONGYIN', '4SD-12/12', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '3.0HP',
        'power_kw', '2.2KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '16.0m³/21m, 18.0m³/13m, 21.0m³/6m',
        'head_max', '21m',
        'material', 'Inox 304',
        'series', '4SD Series'
    ),
    'figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png',
    JSON_ARRAY('figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png'),
    6, TRUE, FALSE, TRUE
);

-- 4SD-20/11 (Featured + Bestseller)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 4SD-20/11',
    'may-bom-chim-hoa-tien-dongyin-4sd-20-11',
    '4SD-20/11',
    7,
    5350000, NULL, 0,
    'Bơm chìm hóa tiến 4.0HP, lưu lượng 21.0-32.0m³/H, hồng xả Ø60mm - 380V',
    'Máy bơm chìm hóa tiến DONGYIN 4SD-20/11 công suất 4.0HP (3.0KW), điện áp 380V. Bestseller với hiệu suất vượt trội.',
    'DONGYIN', '4SD-20/11', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '4.0HP',
        'power_kw', '3.0KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '21.0m³/28m, 27.0m³/18m, 32.0m³/6m',
        'head_max', '28m',
        'material', 'Inox 304',
        'series', '4SD Series'
    ),
    'figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png',
    JSON_ARRAY('figma:asset/b5894ea94d1df23f330e7b832774accfbce71dad.png'),
    10, TRUE, TRUE, TRUE
);

-- ============================================
-- 4SP SERIES - Bơm Chìm Hóa Tiến 4SP
-- ============================================

-- 4SPM-03/12 (220V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 4SPM-03/12',
    'may-bom-chim-hoa-tien-dongyin-4spm-03-12',
    '4SPM-03/12',
    5,
    4000000, NULL, 0,
    'Bơm chìm hóa tiến 4SP 1.0HP, lưu lượng 1.8-4.2m³/H, cột áp 64-31m - 220V',
    'Máy bơm chìm hóa tiến DONGYIN 4SPM-03/12 công suất 1.0HP (0.75KW), điện áp 220V. Dòng 4SP với cột áp cao.',
    'DONGYIN', '4SPM-03/12', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.0HP',
        'power_kw', '0.75KW',
        'voltage', '220V',
        'flow_rate', '1.8m³/64m, 3.0m³/52m, 4.2m³/31m',
        'head_max', '64m',
        'material', 'Inox 304',
        'series', '4SP Series'
    ),
    'figma:asset/a0eb77b5364154f63f59dbfab53da900692fae1c.png',
    JSON_ARRAY('figma:asset/a0eb77b5364154f63f59dbfab53da900692fae1c.png'),
    10, TRUE, FALSE, TRUE
);

-- 4SPM-05/17 (220V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 4SPM-05/17',
    'may-bom-chim-hoa-tien-dongyin-4spm-05-17',
    '4SPM-05/17',
    5,
    5400000, NULL, 0,
    'Bơm chìm hóa tiến 4SP 2.0HP, lưu lượng 3.0-6.6m³/H, cột áp 85-44m - 220V',
    'Máy bơm chìm hóa tiến DONGYIN 4SPM-05/17 công suất 2.0HP (1.5KW), điện áp 220V. Cột áp cao 85m.',
    'DONGYIN', '4SPM-05/17', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '220V',
        'flow_rate', '3.0m³/85m, 4.8m³/69m, 6.6m³/44m',
        'head_max', '85m',
        'material', 'Inox 304',
        'series', '4SP Series'
    ),
    'figma:asset/a0eb77b5364154f63f59dbfab53da900692fae1c.png',
    JSON_ARRAY('figma:asset/a0eb77b5364154f63f59dbfab53da900692fae1c.png'),
    8, TRUE, TRUE, TRUE
);

-- 4SP-08/25 (380V) - Featured
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 4SP-08/25',
    'may-bom-chim-hoa-tien-dongyin-4sp-08-25',
    '4SP-08/25',
    7,
    11600000, NULL, 0,
    'Bơm chìm hóa tiến 4SP 5.5HP, lưu lượng 3.6-10.8m³/H, cột áp 131-64m - 380V',
    'Máy bơm chìm hóa tiến DONGYIN 4SP-08/25 công suất 5.5HP (4.0KW), điện áp 380V. Công suất lớn cho công nghiệp.',
    'DONGYIN', '4SP-08/25', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '5.5HP',
        'power_kw', '4.0KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '3.6m³/131m, 7.2m³/110m, 10.8m³/64m',
        'head_max', '131m',
        'material', 'Inox 304',
        'series', '4SP Series'
    ),
    'figma:asset/a0eb77b5364154f63f59dbfab53da900692fae1c.png',
    JSON_ARRAY('figma:asset/a0eb77b5364154f63f59dbfab53da900692fae1c.png'),
    5, TRUE, TRUE, TRUE
);

-- 4SP-14/24 (380V) - Cao cấp nhất
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hóa tiến DONGYIN 4SP-14/24',
    'may-bom-chim-hoa-tien-dongyin-4sp-14-24',
    '4SP-14/24',
    7,
    15700000, NULL, 0,
    'Bơm chìm hóa tiến 4SP 10HP, lưu lượng 10.8-18.0m³/H, cột áp 117-68m - 380V',
    'Máy bơm chìm hóa tiến DONGYIN 4SP-14/24 công suất 10HP (7.5KW), điện áp 380V. Cao cấp nhất dòng 4SP.',
    'DONGYIN', '4SP-14/24', 'Trung Quốc', '12 tháng',
    JSON_OBJECT(
        'power_hp', '10HP',
        'power_kw', '7.5KW',
        'voltage', '380V - 3 Phase',
        'flow_rate', '10.8m³/117m, 14.5m³/97m, 18.0m³/68m',
        'head_max', '117m',
        'material', 'Inox 304',
        'series', '4SP Series'
    ),
    'figma:asset/a0eb77b5364154f63f59dbfab53da900692fae1c.png',
    JSON_ARRAY('figma:asset/a0eb77b5364154f63f59dbfab53da900692fae1c.png'),
    3, TRUE, TRUE, FALSE
);

-- ============================================
-- 6SR SERIES - Bơm Chìm Hóa Tiến 6SR (380V)
-- ============================================

-- 6SR30-04 (Motor 6m)
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
    'Máy bơm chìm hóa tiến DONGYIN 6SR30-04 công suất 5.5HP (4.0KW), điện áp 380V. Motor 6m, lưu lượng lớn.',
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
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png'),
    5, TRUE, FALSE, TRUE
);

-- 6SR45-07 (Motor 6m)
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
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png'),
    4, TRUE, TRUE, TRUE
);

-- 6SR60-08 (Motor 6m) - Cao cấp
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
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png'),
    3, TRUE, TRUE, FALSE
);

-- ============================================
-- 6SP SERIES - Bơm Chìm Hóa Tiến 6SP
-- ============================================

-- 6SP18-04 (Motor 4m - 220V)
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
    'Bơm chìm hóa tiến 6SP 3.0HP, lưu lượng 21-9m³/H, cột áp 23-42m - 220V Motor 4m',
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
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png'),
    8, TRUE, FALSE, TRUE
);

-- 6SP18-10 (Motor 4m - 220V)
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
    'Bơm chìm hóa tiến 6SP 7.5HP, lưu lượng 21-9m³/H, cột áp 58-104m - 220V Motor 4m',
    'Máy bơm chìm hóa tiến DONGYIN 6SP18-10 công suất 7.5HP (5.5KW), điện áp 220V. Motor 4m, cột áp cao.',
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
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png'),
    6, TRUE, TRUE, TRUE
);

-- 6SP30-6 (Motor 6m - 380V)
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
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png'),
    5, TRUE, FALSE, TRUE
);

-- 6SP46-10 (Motor 6m - 380V)
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
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png'),
    3, TRUE, TRUE, FALSE
);

-- 6SP60-8 (Motor 6m - 380V) - Cao cấp nhất
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
    JSON_ARRAY('figma:asset/bc1e6008bda7449cc529935b2ea0eed4011c2766.png'),
    2, TRUE, TRUE, FALSE
);

-- ============================================
-- DONE! Total 18 products added
-- ============================================
-- 3 x 4SDM Series (220V)
-- 3 x 4SD Series (380V)
-- 4 x 4SP Series (220V + 380V)
-- 3 x 6SR Series (380V)
-- 5 x 6SP Series (220V + 380V)
-- ============================================

SELECT '4SDM/4SD/4SP/6SR/6SP Series products added successfully!' as message;
