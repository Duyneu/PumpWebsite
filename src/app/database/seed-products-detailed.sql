-- ============================================
-- VOLTOR VIETNAM - Detailed Products Data
-- ============================================
-- WS Series, QS Series, WQ Series
-- Data từ bảng giá ngày 01/05/2025
-- ============================================

-- ============================================
-- WS SERIES - Máy Bơm Chìm Nước Thải
-- ============================================

-- WSD9-8-0.37E
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WSD9-8-0.37E',
    'may-bom-chim-nuoc-thai-voltor-wsd9-8-0-37e',
    'WSD9-8-0.37E',
    5, -- Máy Bơm Chìm
    1550000, NULL, 0,
    'Máy bơm chìm nước thải 0.5HP, lưu lượng 12m³/6m, hồng xả Ø42mm',
    'Máy bơm chìm nước thải VOLTOR WSD9-8-0.37E công suất 0.5HP, điện áp 220V. Phù hợp bơm nước thải sinh hoạt, nước mưa. Thiết kế nhỏ gọn, vận hành êm ái, tiết kiệm điện.',
    'VOLTOR', 'WSD9-8-0.37E', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.5HP',
        'power_kw', '0.37KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '12m³/6m, 8m³/9m, 6m³/10m',
        'head_max', '10m',
        'material', 'Gang đúc + Inox',
        'weight', '15kg',
        'series', 'WS Series'
    ),
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800'),
    30, FALSE, FALSE, TRUE
);

-- WSD15-10-0.75E
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WSD15-10-0.75E',
    'may-bom-chim-nuoc-thai-voltor-wsd15-10-0-75e',
    'WSD15-10-0.75E',
    5, -- Máy Bơm Chìm
    2360000, NULL, 0,
    'Máy bơm chìm nước thải 1.0HP, lưu lượng 18m³/9m, hồng xả Ø60mm',
    'Máy bơm chìm nước thải VOLTOR WSD15-10-0.75E công suất 1.0HP, điện áp 220V. Khả năng xử lý nước thải có cặn bẩn, phù hợp cho hầm biogas, hố móng.',
    'VOLTOR', 'WSD15-10-0.75E', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.0HP',
        'power_kw', '0.75KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '18m³/9m, 10m³/15m, 6m³/12m',
        'head_max', '15m',
        'material', 'Gang đúc + Inox',
        'weight', '20kg',
        'series', 'WS Series'
    ),
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800'),
    25, TRUE, FALSE, TRUE
);

-- WSD20-11-1.1E
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WSD20-11-1.1E',
    'may-bom-chim-nuoc-thai-voltor-wsd20-11-1-1e',
    'WSD20-11-1.1E',
    5, -- Máy Bơm Chìm
    2800000, NULL, 0,
    'Máy bơm chìm nước thải 1.5HP, lưu lượng 24m³/8m, hồng xả Ø60mm',
    'Máy bơm chìm nước thải VOLTOR WSD20-11-1.1E công suất 1.5HP, điện áp 220V. Thiết kế bền bỉ, phù hợp bơm nước thải công nghiệp.',
    'VOLTOR', 'WSD20-11-1.1E', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '24m³/8m, 20m³/11m, 12m³/14m',
        'head_max', '14m',
        'material', 'Gang đúc + Inox',
        'weight', '25kg',
        'series', 'WS Series'
    ),
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'),
    20, FALSE, TRUE, TRUE
);

-- WSD15-16-1.5E
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WSD15-16-1.5E',
    'may-bom-chim-nuoc-thai-voltor-wsd15-16-1-5e',
    'WSD15-16-1.5E',
    5,
    3100000, NULL, 0,
    'Máy bơm chìm nước thải 2.0HP, lưu lượng 24m³/12m, hồng xả Ø60mm',
    'Máy bơm chìm nước thải VOLTOR WSD15-16-1.5E công suất 2.0HP, điện áp 220V. Cột áp cao, phù hợp bơm từ hố sâu.',
    'VOLTOR', 'WSD15-16-1.5E', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '24m³/12m, 15m³/16m, 12m³/17m',
        'head_max', '17m',
        'material', 'Gang đúc + Inox',
        'weight', '28kg',
        'series', 'WS Series'
    ),
    'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800'),
    18, TRUE, FALSE, TRUE
);

-- WSD20-17-2.2E
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WSD20-17-2.2E',
    'may-bom-chim-nuoc-thai-voltor-wsd20-17-2-2e',
    'WSD20-17-2.2E',
    5,
    4500000, NULL, 0,
    'Máy bơm chìm nước thải 3.0HP, lưu lượng 30m³/13m, hồng xả Ø60mm',
    'Máy bơm chìm nước thải VOLTOR WSD20-17-2.2E công suất 3.0HP, điện áp 220V. Lưu lượng lớn, phù hợp cho công trình quy mô trung bình.',
    'VOLTOR', 'WSD20-17-2.2E', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '3.0HP',
        'power_kw', '2.2KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '30m³/13m, 20m³/17m, 12m³/20m',
        'head_max', '20m',
        'material', 'Gang đúc + Inox',
        'weight', '35kg',
        'series', 'WS Series'
    ),
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800'),
    15, TRUE, TRUE, FALSE
);

-- WS15-16-1.5E (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WS15-16-1.5E (380V)',
    'may-bom-chim-nuoc-thai-voltor-ws15-16-1-5e-380v',
    'WS15-16-1.5E',
    5,
    3000000, NULL, 0,
    'Máy bơm chìm nước thải 2.0HP - 380V, lưu lượng 24m³/12m',
    'Máy bơm chìm nước thải VOLTOR WS15-16-1.5E công suất 2.0HP, điện áp 380V (3 pha). Phù hợp cho công trình công nghiệp.',
    'VOLTOR', 'WS15-16-1.5E', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '24m³/12m, 15m³/16m, 12m³/17m',
        'head_max', '17m',
        'material', 'Gang đúc + Inox',
        'weight', '30kg',
        'series', 'WS Series'
    ),
    'https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800'),
    12, FALSE, FALSE, TRUE
);

-- WS20-17-2.2E (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WS20-17-2.2E (380V)',
    'may-bom-chim-nuoc-thai-voltor-ws20-17-2-2e-380v',
    'WS20-17-2.2E',
    5,
    3950000, NULL, 0,
    'Máy bơm chìm nước thải 3.0HP - 380V, lưu lượng 30m³/13m',
    'Máy bơm chìm nước thải VOLTOR WS20-17-2.2E công suất 3.0HP, điện áp 380V (3 pha). Công suất lớn, bền bỉ.',
    'VOLTOR', 'WS20-17-2.2E', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '3.0HP',
        'power_kw', '2.2KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '30m³/13m, 20m³/17m, 12m³/20m',
        'head_max', '20m',
        'material', 'Gang đúc + Inox',
        'weight', '38kg',
        'series', 'WS Series'
    ),
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800'),
    10, TRUE, FALSE, FALSE
);

-- WS60-11-4E (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WS60-11-4E (380V)',
    'may-bom-chim-nuoc-thai-voltor-ws60-11-4e-380v',
    'WS60-11-4E',
    5,
    5200000, NULL, 0,
    'Máy bơm chìm nước thải 5.5HP - 380V, lưu lượng 65m³/9m',
    'Máy bơm chìm nước thải VOLTOR WS60-11-4E công suất 5.5HP, điện áp 380V (3 pha). Lưu lượng lớn, phù hợp cho công trình lớn.',
    'VOLTOR', 'WS60-11-4E', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '5.5HP',
        'power_kw', '4.0KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø90mm',
        'flow_rate', '65m³/9m, 50m³/14m, 30m³/20m',
        'head_max', '20m',
        'material', 'Gang đúc + Inox',
        'weight', '55kg',
        'series', 'WS Series'
    ),
    'https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800'),
    8, TRUE, TRUE, FALSE
);

-- ============================================
-- WS SERIES (A) - Phiên bản nâng cấp
-- ============================================

-- WSD9-8-0.37E (A)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WSD9-8-0.37E (A)',
    'may-bom-chim-nuoc-thai-voltor-wsd9-8-0-37e-a',
    'WSD9-8-0.37E(A)',
    5,
    1620000, 1700000, 5,
    'Máy bơm chìm nước thải 0.5HP nâng cấp, lưu lượng 12m³/6m',
    'Máy bơm chìm nước thải VOLTOR WSD9-8-0.37E phiên bản (A) nâng cấp. Cải tiến động cơ, vận hành êm hơn, tiết kiệm điện hơn.',
    'VOLTOR', 'WSD9-8-0.37E(A)', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.5HP',
        'power_kw', '0.37KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '12m³/6m, 8m³/9m, 6m³/10m',
        'head_max', '10m',
        'material', 'Gang đúc + Inox 304',
        'weight', '16kg',
        'series', 'WS Series (A)'
    ),
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800'),
    25, FALSE, FALSE, TRUE
);

-- WSD15-10-0.75E (A)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WSD15-10-0.75E (A)',
    'may-bom-chim-nuoc-thai-voltor-wsd15-10-0-75e-a',
    'WSD15-10-0.75E(A)',
    5,
    2500000, 2600000, 4,
    'Máy bơm chìm nước thải 1.0HP nâng cấp, lưu lượng 18m³/9m',
    'Máy bơm chìm nước thải VOLTOR WSD15-10-0.75E phiên bản (A) nâng cấp. Cải tiến motor, hiệu suất cao hơn.',
    'VOLTOR', 'WSD15-10-0.75E(A)', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.0HP',
        'power_kw', '0.75KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '18m³/9m, 10m³/15m, 6m³/12m',
        'head_max', '15m',
        'material', 'Gang đúc + Inox 304',
        'weight', '22kg',
        'series', 'WS Series (A)'
    ),
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800'),
    20, TRUE, FALSE, TRUE
);

-- WSD20-11-1.1E (A)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WSD20-11-1.1E (A)',
    'may-bom-chim-nuoc-thai-voltor-wsd20-11-1-1e-a',
    'WSD20-11-1.1E(A)',
    5,
    2900000, 3050000, 5,
    'Máy bơm chìm nước thải 1.5HP nâng cấp, lưu lượng 24m³/8m',
    'Máy bơm chìm nước thải VOLTOR WSD20-11-1.1E phiên bản (A) nâng cấp. Cấu tạo bền vững, chống ăn mòn tốt.',
    'VOLTOR', 'WSD20-11-1.1E(A)', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '24m³/8m, 20m³/11m, 12m³/14m',
        'head_max', '14m',
        'material', 'Gang đúc + Inox 304',
        'weight', '26kg',
        'series', 'WS Series (A)'
    ),
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'),
    18, FALSE, TRUE, TRUE
);

-- WSD15-16-1.5E (A)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WSD15-16-1.5E (A)',
    'may-bom-chim-nuoc-thai-voltor-wsd15-16-1-5e-a',
    'WSD15-16-1.5E(A)',
    5,
    3250000, 3400000, 4,
    'Máy bơm chìm nước thải 2.0HP nâng cấp, lưu lượng 24m³/12m',
    'Máy bơm chìm nước thải VOLTOR WSD15-16-1.5E phiên bản (A) nâng cấp. Tăng tuổi thọ, giảm tiếng ồn.',
    'VOLTOR', 'WSD15-16-1.5E(A)', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '24m³/12m, 15m³/16m, 12m³/17m',
        'head_max', '17m',
        'material', 'Gang đúc + Inox 304',
        'weight', '30kg',
        'series', 'WS Series (A)'
    ),
    'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800'),
    15, TRUE, FALSE, TRUE
);

-- ============================================
-- WS SERIES - 1CD & 5CD (Cánh Đơn)
-- ============================================

-- WSD15-10-1.1CD
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WSD15-10-1.1CD',
    'may-bom-chim-nuoc-thai-voltor-wsd15-10-1-1cd',
    'WSD15-10-1.1CD',
    5,
    3200000, NULL, 0,
    'Máy bơm chìm cánh đơn 1.5HP, lưu lượng 18m³/8m, hồng xả Ø60mm',
    'Máy bơm chìm nước thải VOLTOR WSD15-10-1.1CD thiết kế cánh đơn, giảm tắc nghẽn. Phù hợp nước thải có tạp chất lớn.',
    'VOLTOR', 'WSD15-10-1.1CD', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '18m³/8m, 15m³/10m, 6m³/15m',
        'head_max', '15m',
        'impeller_type', 'Cánh đơn (Single Vane)',
        'material', 'Gang đúc + Inox',
        'weight', '24kg',
        'series', 'WS Series CD'
    ),
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800'),
    15, FALSE, FALSE, TRUE
);

-- WSD20-12-1.5CD
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải VOLTOR WSD20-12-1.5CD',
    'may-bom-chim-nuoc-thai-voltor-wsd20-12-1-5cd',
    'WSD20-12-1.5CD',
    5,
    3650000, NULL, 0,
    'Máy bơm chìm cánh đơn 2.0HP, lưu lượng 27m³/8m, hồng xả Ø60mm',
    'Máy bơm chìm nước thải VOLTOR WSD20-12-1.5CD thiết kế cánh đơn, thông thoáng. Bơm nước bẩn hiệu quả.',
    'VOLTOR', 'WSD20-12-1.5CD', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '27m³/8m, 20m³/12m, 9m³/17m',
        'head_max', '17m',
        'impeller_type', 'Cánh đơn (Single Vane)',
        'material', 'Gang đúc + Inox',
        'weight', '28kg',
        'series', 'WS Series CD'
    ),
    'https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800'),
    12, TRUE, FALSE, TRUE
);

-- ============================================
-- QS SERIES - Máy Bơm Chìm Nước Sạch
-- ============================================

-- QSD6-15-0.37
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD6-15-0.37',
    'may-bom-chim-nuoc-sach-voltor-qsd6-15-0-37',
    'QSD6-15-0.37',
    5,
    2000000, NULL, 0,
    'Máy bơm chìm nước sạch 0.5HP, lưu lượng 9m³/13m, hồng xả Ø42mm',
    'Máy bơm chìm nước sạch VOLTOR QSD6-15-0.37. Thiết kế nhỏ gọn, phù hợp bơm nước giếng, bể chứa. Bảo hành 12 tháng.',
    'VOLTOR', 'QSD6-15-0.37', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.5HP (1/2HP)',
        'power_kw', '0.37KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '9m³/13m, 6m³/15m, 3m³/17m',
        'head_max', '17m',
        'material', 'Inox 304',
        'weight', '12kg',
        'series', 'QS Series'
    ),
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800'),
    30, TRUE, FALSE, TRUE
);

-- QSD6-18-0.55
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD6-18-0.55',
    'may-bom-chim-nuoc-sach-voltor-qsd6-18-0-55',
    'QSD6-18-0.55',
    5,
    2100000, NULL, 0,
    'Máy bơm chìm nước sạch 0.75HP, lưu lượng 9m³/15m, hồng xả Ø42mm',
    'Máy bơm chìm nước sạch VOLTOR QSD6-18-0.55. Công suất 0.75HP, cột áp cao, bơm từ giếng sâu.',
    'VOLTOR', 'QSD6-18-0.55', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.75HP (3/4HP)',
        'power_kw', '0.55KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '9m³/15m, 6m³/18m, 3m³/19m',
        'head_max', '19m',
        'material', 'Inox 304',
        'weight', '14kg',
        'series', 'QS Series'
    ),
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800'),
    25, FALSE, FALSE, TRUE
);

-- QSD6-22-0.75
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD6-22-0.75',
    'may-bom-chim-nuoc-sach-voltor-qsd6-22-0-75',
    'QSD6-22-0.75',
    5,
    2260000, NULL, 0,
    'Máy bơm chìm nước sạch 1.0HP, lưu lượng 12m³/16m, hồng xả Ø42mm',
    'Máy bơm chìm nước sạch VOLTOR QSD6-22-0.75. Công suất 1.0HP, phù hợp cấp nước sinh hoạt gia đình.',
    'VOLTOR', 'QSD6-22-0.75', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.0HP',
        'power_kw', '0.75KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '12m³/16m, 6m³/22m, 3m³/24m',
        'head_max', '24m',
        'material', 'Inox 304',
        'weight', '16kg',
        'series', 'QS Series'
    ),
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'),
    22, TRUE, TRUE, TRUE
);

-- QSD6-25-1.1
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD6-25-1.1',
    'may-bom-chim-nuoc-sach-voltor-qsd6-25-1-1',
    'QSD6-25-1.1',
    5,
    2570000, NULL, 0,
    'Máy bơm chìm nước sạch 1.5HP, lưu lượng 15m³/16m, hồng xả Ø42mm',
    'Máy bơm chìm nước sạch VOLTOR QSD6-25-1.1. Công suất 1.5HP, cột áp cao 28m.',
    'VOLTOR', 'QSD6-25-1.1', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '15m³/16m, 6m³/25m, 3m³/28m',
        'head_max', '28m',
        'material', 'Inox 304',
        'weight', '18kg',
        'series', 'QS Series'
    ),
    'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800'),
    20, FALSE, FALSE, TRUE
);

-- QSD10-28-1.5
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD10-28-1.5',
    'may-bom-chim-nuoc-sach-voltor-qsd10-28-1-5',
    'QSD10-28-1.5',
    5,
    2860000, NULL, 0,
    'Máy bơm chìm nước sạch 2.0HP, lưu lượng 15m³/23m, hồng xả Ø42mm',
    'Máy bơm chìm nước sạch VOLTOR QSD10-28-1.5. Điện áp 220V, cột áp 31m, phù hợp bơm từ giếng sâu.',
    'VOLTOR', 'QSD10-28-1.5', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '15m³/23m, 10m³/28m, 6m³/31m',
        'head_max', '31m',
        'material', 'Inox 304',
        'weight', '22kg',
        'series', 'QS Series'
    ),
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800'),
    18, TRUE, FALSE, TRUE
);

-- QSD10-32-1.9
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD10-32-1.9',
    'may-bom-chim-nuoc-sach-voltor-qsd10-32-1-9',
    'QSD10-32-1.9',
    5,
    3250000, NULL, 0,
    'Máy bơm chìm nước sạch 2.5HP, lưu lượng 18m³/23m, hồng xả Ø42mm',
    'Máy bơm chìm nước sạch VOLTOR QSD10-32-1.9. Công suất 2.5HP, cột áp 36m.',
    'VOLTOR', 'QSD10-32-1.9', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '2.5HP',
        'power_kw', '1.9KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '18m³/23m, 10m³/32m, 6m³/36m',
        'head_max', '36m',
        'material', 'Inox 304',
        'weight', '26kg',
        'series', 'QS Series'
    ),
    'https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800'),
    15, FALSE, FALSE, TRUE
);

-- QSD15-32-2.2
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD15-32-2.2',
    'may-bom-chim-nuoc-sach-voltor-qsd15-32-2-2',
    'QSD15-32-2.2',
    5,
    3750000, NULL, 0,
    'Máy bơm chìm nước sạch 3.0HP, lưu lượng 30m³/12m, hồng xả Ø49mm',
    'Máy bơm chìm nước sạch VOLTOR QSD15-32-2.2. Công suất 3.0HP, lưu lượng lớn.',
    'VOLTOR', 'QSD15-32-2.2', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '3.0HP',
        'power_kw', '2.2KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø49mm',
        'flow_rate', '30m³/12m, 15m³/32m, 9m³/36m',
        'head_max', '36m',
        'material', 'Inox 304',
        'weight', '32kg',
        'series', 'QS Series'
    ),
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800'),
    12, TRUE, TRUE, FALSE
);

-- QSD15-40-3
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD15-40-3',
    'may-bom-chim-nuoc-sach-voltor-qsd15-40-3',
    'QSD15-40-3',
    5,
    4250000, NULL, 0,
    'Máy bơm chìm nước sạch 4.0HP, lưu lượng 30m³/23m, hồng xả Ø49mm',
    'Máy bơm chìm nước sạch VOLTOR QSD15-40-3. Công suất 4.0HP, cột áp 40m.',
    'VOLTOR', 'QSD15-40-3', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '4.0HP',
        'power_kw', '3.0KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø49mm',
        'flow_rate', '30m³/23m, 15m³/40m, 9m³/40m',
        'head_max', '40m',
        'material', 'Inox 304',
        'weight', '38kg',
        'series', 'QS Series'
    ),
    'https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800'),
    10, FALSE, FALSE, FALSE
);

-- ============================================
-- QS SERIES - 380V (Hỏa Tiễn)
-- ============================================

-- QS10-28-1.5
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hỏa tiễn VOLTOR QS10-28-1.5 (380V)',
    'may-bom-chim-hoa-tien-voltor-qs10-28-1-5-380v',
    'QS10-28-1.5',
    6, -- Máy Bơm Hỏa Tiễn
    2650000, NULL, 0,
    'Máy bơm hỏa tiễn 2.0HP - 380V, lưu lượng 15m³/23m',
    'Máy bơm chìm hỏa tiễn VOLTOR QS10-28-1.5. Điện áp 380V (3 pha), phù hợp giếng khoan sâu.',
    'VOLTOR', 'QS10-28-1.5', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '15m³/23m, 10m³/28m, 6m³/31m',
        'head_max', '31m',
        'diameter', '4 inch (100mm)',
        'material', 'Inox 304',
        'weight', '25kg',
        'series', 'QS Series (Hỏa Tiễn)'
    ),
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'),
    15, FALSE, FALSE, TRUE
);

-- QS15-32-2.2
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hỏa tiễn VOLTOR QS15-32-2.2 (380V)',
    'may-bom-chim-hoa-tien-voltor-qs15-32-2-2-380v',
    'QS15-32-2.2',
    6,
    3350000, NULL, 0,
    'Máy bơm hỏa tiễn 3.0HP - 380V, lưu lượng 30m³/12m',
    'Máy bơm chìm hỏa tiễn VOLTOR QS15-32-2.2. Điện áp 380V (3 pha), cột áp 36m.',
    'VOLTOR', 'QS15-32-2.2', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '3.0HP',
        'power_kw', '2.2KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø49mm',
        'flow_rate', '30m³/12m, 15m³/32m, 9m³/36m',
        'head_max', '36m',
        'diameter', '4 inch (100mm)',
        'material', 'Inox 304',
        'weight', '35kg',
        'series', 'QS Series (Hỏa Tiễn)'
    ),
    'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800'),
    12, TRUE, FALSE, TRUE
);

-- QS15-40-3 (Liệt Bảng)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hỏa tiễn VOLTOR QS15-40-3 Liệt Bảng (380V)',
    'may-bom-chim-hoa-tien-voltor-qs15-40-3-liet-bang-380v',
    'QS15-40-3',
    6,
    3800000, NULL, 0,
    'Máy bơm hỏa tiễn Liệt Bảng 4.0HP - 380V, lưu lượng 30m³/23m',
    'Máy bơm chìm hỏa tiễn VOLTOR QS15-40-3 phiên bản Liệt Bảng. Điện áp 380V (3 pha), chất lượng cao.',
    'VOLTOR', 'QS15-40-3', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '4.0HP',
        'power_kw', '3.0KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø49mm',
        'flow_rate', '30m³/23m, 15m³/40m, 9m³/40m',
        'head_max', '40m',
        'diameter', '4 inch (100mm)',
        'material', 'Inox 304',
        'weight', '40kg',
        'series', 'QS Series (Liệt Bảng)'
    ),
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800'),
    10, TRUE, TRUE, FALSE
);

-- QS20-40-4
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hỏa tiễn VOLTOR QS20-40-4 (380V)',
    'may-bom-chim-hoa-tien-voltor-qs20-40-4-380v',
    'QS20-40-4',
    6,
    4900000, NULL, 0,
    'Máy bơm hỏa tiễn 5.5HP - 380V, lưu lượng 36m³/15m',
    'Máy bơm chìm hỏa tiễn VOLTOR QS20-40-4. Công suất 5.5HP, cột áp 43m.',
    'VOLTOR', 'QS20-40-4', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '5.5HP',
        'power_kw', '4.0KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø49mm',
        'flow_rate', '36m³/15m, 20m³/40m, 15m³/43m',
        'head_max', '43m',
        'diameter', '5 inch (125mm)',
        'material', 'Inox 304',
        'weight', '48kg',
        'series', 'QS Series (Hỏa Tiễn)'
    ),
    'https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800'),
    8, FALSE, FALSE, FALSE
);

-- QS25-50-5.5
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hỏa tiễn VOLTOR QS25-50-5.5 (380V)',
    'may-bom-chim-hoa-tien-voltor-qs25-50-5-5-380v',
    'QS25-50-5.5',
    6,
    6600000, NULL, 0,
    'Máy bơm hỏa tiễn 7.5HP - 380V, lưu lượng 48m³/24m',
    'Máy bơm chìm hỏa tiễn VOLTOR QS25-50-5.5. Công suất 7.5HP, cột áp 54m.',
    'VOLTOR', 'QS25-50-5.5', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '7.5HP',
        'power_kw', '5.5KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '48m³/24m, 25m³/50m, 18m³/54m',
        'head_max', '54m',
        'diameter', '6 inch (150mm)',
        'material', 'Inox 304',
        'weight', '62kg',
        'series', 'QS Series (Hỏa Tiễn)'
    ),
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800'),
    6, TRUE, TRUE, FALSE
);

-- QS25-55-7.5
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm hỏa tiễn VOLTOR QS25-55-7.5 (380V)',
    'may-bom-chim-hoa-tien-voltor-qs25-55-7-5-380v',
    'QS25-55-7.5',
    6,
    7600000, NULL, 0,
    'Máy bơm hỏa tiễn 10HP - 380V, lưu lượng 54m³/28m',
    'Máy bơm chìm hỏa tiễn VOLTOR QS25-55-7.5. Công suất 10HP, cột áp 56m.',
    'VOLTOR', 'QS25-55-7.5', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '10HP',
        'power_kw', '7.5KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '54m³/28m, 25m³/55m, 18m³/56m',
        'head_max', '56m',
        'diameter', '6 inch (150mm)',
        'material', 'Inox 304',
        'weight', '72kg',
        'series', 'QS Series (Hỏa Tiễn)'
    ),
    'https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800'),
    5, TRUE, TRUE, FALSE
);

-- ============================================
-- QS SERIES (A) - Bơm Điện Chìm Cơ Phạo
-- ============================================

-- QSD6-15-0.37(A)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD6-15-0.37(A)',
    'may-bom-chim-nuoc-sach-voltor-qsd6-15-0-37a',
    'QSD6-15-0.37(A)',
    5,
    2060000, NULL, 0,
    'Máy bơm chìm cơ phạo 0.5HP, lưu lượng 9m³/13m',
    'Máy bơm chìm nước sạch VOLTOR QSD6-15-0.37(A) phiên bản bơm điện chìm cơ phạo. Tự động bật/tắt theo mức nước.',
    'VOLTOR', 'QSD6-15-0.37(A)', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.5HP (1/2HP)',
        'power_kw', '0.37KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '9m³/13m, 6m³/15m, 3m³/17m',
        'head_max', '17m',
        'float_switch', 'Có (Auto On/Off)',
        'material', 'Inox 304',
        'weight', '13kg',
        'series', 'QS Series (Cơ Phạo)'
    ),
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800'),
    25, TRUE, FALSE, TRUE
);

-- QSD6-18-0.55(A)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD6-18-0.55(A)',
    'may-bom-chim-nuoc-sach-voltor-qsd6-18-0-55a',
    'QSD6-18-0.55(A)',
    5,
    2200000, NULL, 0,
    'Máy bơm chìm cơ phạo 0.75HP, lưu lượng 9m³/15m',
    'Máy bơm chìm nước sạch VOLTOR QSD6-18-0.55(A) phiên bản bơm điện chìm cơ phạo. Tự động hóa hoàn toàn.',
    'VOLTOR', 'QSD6-18-0.55(A)', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '0.75HP (3/4HP)',
        'power_kw', '0.55KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '9m³/15m, 6m³/18m, 3m³/19m',
        'head_max', '19m',
        'float_switch', 'Có (Auto On/Off)',
        'material', 'Inox 304',
        'weight', '15kg',
        'series', 'QS Series (Cơ Phạo)'
    ),
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800'),
    20, FALSE, FALSE, TRUE
);

-- QSD6-22-0.75(A)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD6-22-0.75(A)',
    'may-bom-chim-nuoc-sach-voltor-qsd6-22-0-75a',
    'QSD6-22-0.75(A)',
    5,
    2360000, NULL, 0,
    'Máy bơm chìm cơ phạo 1.0HP, lưu lượng 12m³/16m',
    'Máy bơm chìm nước sạch VOLTOR QSD6-22-0.75(A) phiên bản bơm điện chìm cơ phạo. Tiện lợi, tự động.',
    'VOLTOR', 'QSD6-22-0.75(A)', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.0HP',
        'power_kw', '0.75KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '12m³/16m, 9m³/20m, 6m³/22m',
        'head_max', '22m',
        'float_switch', 'Có (Auto On/Off)',
        'material', 'Inox 304',
        'weight', '17kg',
        'series', 'QS Series (Cơ Phạo)'
    ),
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'),
    18, TRUE, TRUE, TRUE
);

-- QSD6-25-1.1(A)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước sạch VOLTOR QSD6-25-1.1(A)',
    'may-bom-chim-nuoc-sach-voltor-qsd6-25-1-1a',
    'QSD6-25-1.1(A)',
    5,
    2700000, NULL, 0,
    'Máy bơm chìm cơ phạo 1.5HP, lưu lượng 12m³/20m',
    'Máy bơm chìm nước sạch VOLTOR QSD6-25-1.1(A) phiên bản bơm điện chìm cơ phạo. Công suất 1.5HP.',
    'VOLTOR', 'QSD6-25-1.1(A)', 'Việt Nam', '12 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø42mm',
        'flow_rate', '12m³/20m, 9m³/23m, 6m³/25m',
        'head_max', '25m',
        'float_switch', 'Có (Auto On/Off)',
        'material', 'Inox 304',
        'weight', '19kg',
        'series', 'QS Series (Cơ Phạo)'
    ),
    'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800'),
    15, FALSE, FALSE, TRUE
);

-- ============================================
-- WQ SERIES - Máy Bơm Chìm Nước Thải Cánh Cắt Rác
-- ============================================

-- WQD15-10-1.1GN
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQD15-10-1.1GN',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wqd15-10-1-1gn',
    'WQD15-10-1.1GN',
    7, -- Máy Bơm Hố Móng
    4000000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 1.5HP, lưu lượng 18m³/8m, hồng xả Ø60mm',
    'Máy bơm chìm nước thải VOLTOR WQD15-10-1.1GN với cánh cắt rác. Phù hợp bơm nước thải có tạp chất lớn, rác thải. Thiết kế cánh cắt chống tắc nghẽn.',
    'VOLTOR', 'WQD15-10-1.1GN', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '18m³/8m, 12m³/12m, 6m³/14m',
        'head_max', '14m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '32kg',
        'series', 'WQ Series'
    ),
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800'),
    15, TRUE, FALSE, TRUE
);

-- WQD18-12-1.5GN
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQD18-12-1.5GN',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wqd18-12-1-5gn',
    'WQD18-12-1.5GN',
    7,
    5150000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 2.0HP, lưu lượng 24m³/9m, hồng xả Ø60mm',
    'Máy bơm chìm nước thải VOLTOR WQD18-12-1.5GN với cánh cắt rác. Công suất 2.0HP, phù hợp công trình xây dựng.',
    'VOLTOR', 'WQD18-12-1.5GN', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '24m³/9m, 18m³/12m, 12m³/15m',
        'head_max', '15m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '38kg',
        'series', 'WQ Series'
    ),
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800'),
    12, FALSE, FALSE, TRUE
);

-- WQD25-15-2.2GN
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQD25-15-2.2GN',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wqd25-15-2-2gn',
    'WQD25-15-2.2GN',
    7,
    6900000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 3.0HP, lưu lượng 42m³/5m, hồng xả Ø75mm',
    'Máy bơm chìm nước thải VOLTOR WQD25-15-2.2GN với cánh cắt rác. Lưu lượng lớn, phù hợp công trình lớn.',
    'VOLTOR', 'WQD25-15-2.2GN', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '3.0HP',
        'power_kw', '2.2KW',
        'voltage', '220V',
        'outlet_diameter', 'Ø75mm',
        'flow_rate', '42m³/5m, 25m³/15m, 12m³/19m',
        'head_max', '19m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '48kg',
        'series', 'WQ Series'
    ),
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'),
    10, TRUE, TRUE, FALSE
);

-- WQ15-10-1.1GN (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQ15-10-1.1GN (380V)',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wq15-10-1-1gn-380v',
    'WQ15-10-1.1GN',
    7,
    4000000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 1.5HP - 380V, lưu lượng 18m³/8m',
    'Máy bơm chìm nước thải VOLTOR WQ15-10-1.1GN điện áp 380V (3 pha) với cánh cắt rác. Công nghiệp.',
    'VOLTOR', 'WQ15-10-1.1GN', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '1.5HP',
        'power_kw', '1.1KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '18m³/8m, 12m³/12m, 6m³/14m',
        'head_max', '14m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '35kg',
        'series', 'WQ Series (380V)'
    ),
    'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800'),
    12, FALSE, FALSE, TRUE
);

-- WQ18-12-1.5GN (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQ18-12-1.5GN (380V)',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wq18-12-1-5gn-380v',
    'WQ18-12-1.5GN',
    7,
    5150000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 2.0HP - 380V, lưu lượng 24m³/9m',
    'Máy bơm chìm nước thải VOLTOR WQ18-12-1.5GN điện áp 380V (3 pha) với cánh cắt rác.',
    'VOLTOR', 'WQ18-12-1.5GN', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '2.0HP',
        'power_kw', '1.5KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø60mm',
        'flow_rate', '24m³/9m, 18m³/12m, 12m³/15m',
        'head_max', '15m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '42kg',
        'series', 'WQ Series (380V)'
    ),
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800'),
    10, TRUE, FALSE, TRUE
);

-- WQ25-15-2.2GN (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQ25-15-2.2GN (380V)',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wq25-15-2-2gn-380v',
    'WQ25-15-2.2GN',
    7,
    6400000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 3.0HP - 380V, lưu lượng 42m³/5m',
    'Máy bơm chìm nước thải VOLTOR WQ25-15-2.2GN điện áp 380V (3 pha) với cánh cắt rác.',
    'VOLTOR', 'WQ25-15-2.2GN', 'Việt Nam', '18 tháng',
    JSON_OBJECT(
        'power_hp', '3.0HP',
        'power_kw', '2.2KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø75mm',
        'flow_rate', '42m³/5m, 25m³/15m, 12m³/19m',
        'head_max', '19m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '52kg',
        'series', 'WQ Series (380V)'
    ),
    'https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800'),
    8, FALSE, FALSE, FALSE
);

-- WQ30-17-3.0GN (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQ30-17-3.0GN (380V)',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wq30-17-3-0gn-380v',
    'WQ30-17-3.0GN',
    7,
    7000000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 4.0HP - 380V, lưu lượng 48m³/10m',
    'Máy bơm chìm nước thải VOLTOR WQ30-17-3.0GN điện áp 380V (3 pha) với cánh cắt rác. Công suất lớn.',
    'VOLTOR', 'WQ30-17-3.0GN', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '4.0HP',
        'power_kw', '3.0KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø75mm',
        'flow_rate', '48m³/10m, 30m³/17m, 18m³/20m',
        'head_max', '20m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '58kg',
        'series', 'WQ Series (380V)'
    ),
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800'),
    6, TRUE, TRUE, FALSE
);

-- WQ40-18-4.0GN (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQ40-18-4.0GN (380V)',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wq40-18-4-0gn-380v',
    'WQ40-18-4.0GN',
    7,
    8100000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 5.5HP - 380V, lưu lượng 60m³/11m',
    'Máy bơm chìm nước thải VOLTOR WQ40-18-4.0GN điện áp 380V (3 pha) với cánh cắt rác. Lưu lượng rất lớn.',
    'VOLTOR', 'WQ40-18-4.0GN', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '5.5HP',
        'power_kw', '4.0KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø75mm',
        'flow_rate', '60m³/11m, 40m³/18m, 18m³/27m',
        'head_max', '27m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '68kg',
        'series', 'WQ Series (380V)'
    ),
    'https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800'),
    5, TRUE, TRUE, FALSE
);

-- WQ65-17-5.5GN (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQ65-17-5.5GN (380V)',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wq65-17-5-5gn-380v',
    'WQ65-17-5.5GN',
    7,
    11100000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 7.5HP - 380V, lưu lượng 84m³/13m',
    'Máy bơm chìm nước thải VOLTOR WQ65-17-5.5GN điện áp 380V (3 pha) với cánh cắt rác. Công suất rất lớn.',
    'VOLTOR', 'WQ65-17-5.5GN', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '7.5HP',
        'power_kw', '5.5KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø90mm',
        'flow_rate', '84m³/13m, 60m³/20m, 18m³/28m',
        'head_max', '28m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '85kg',
        'series', 'WQ Series (380V)'
    ),
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800'),
    4, TRUE, TRUE, FALSE
);

-- WQ85-18-7.5GN (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQ85-18-7.5GN (380V)',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wq85-18-7-5gn-380v',
    'WQ85-18-7.5GN',
    7,
    12800000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 10HP - 380V, lưu lượng 108m³/13m',
    'Máy bơm chìm nước thải VOLTOR WQ85-18-7.5GN điện áp 380V (3 pha) với cánh cắt rác. Công suất cực lớn.',
    'VOLTOR', 'WQ85-18-7.5GN', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '10HP',
        'power_kw', '7.5KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø90mm',
        'flow_rate', '108m³/13m, 85m³/18m, 18m³/29m',
        'head_max', '29m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '95kg',
        'series', 'WQ Series (380V)'
    ),
    'https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800'),
    3, TRUE, TRUE, FALSE
);

-- WQ120-20-11GN (380V) - Hết Hàng
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQ120-20-11GN (380V) - Hết Hàng',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wq120-20-11gn-380v',
    'WQ120-20-11GN',
    7,
    22600000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 15HP - 380V, lưu lượng 145m³/16m',
    'Máy bơm chìm nước thải VOLTOR WQ120-20-11GN điện áp 380V (3 pha) với cánh cắt rác. Siêu công suất.',
    'VOLTOR', 'WQ120-20-11GN', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '15HP',
        'power_kw', '11KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø114mm',
        'flow_rate', '145m³/16m, 120m³/20m, 36m³/28m',
        'head_max', '28m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '125kg',
        'series', 'WQ Series (380V)'
    ),
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800'),
    0, FALSE, TRUE, FALSE
);

-- WQ160-18-15GN (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQ160-18-15GN (380V)',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wq160-18-15gn-380v',
    'WQ160-18-15GN',
    7,
    25000000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 20HP - 380V, lưu lượng 180m³/11m',
    'Máy bơm chìm nước thải VOLTOR WQ160-18-15GN điện áp 380V (3 pha) với cánh cắt rác. Công suất công nghiệp.',
    'VOLTOR', 'WQ160-18-15GN', 'Việt Nam', '24 tháng',
    JSON_OBJECT(
        'power_hp', '20HP',
        'power_kw', '15KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø168mm',
        'flow_rate', '180m³/11m, 160m³/18m, 36m³/38m',
        'head_max', '38m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '168kg',
        'series', 'WQ Series (380V)'
    ),
    'https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800'),
    2, TRUE, TRUE, FALSE
);

-- WQ200-21-22GN (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQ200-21-22GN (380V)',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wq200-21-22gn-380v',
    'WQ200-21-22GN',
    7,
    52200000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 30HP - 380V, lưu lượng 288m³/13m',
    'Máy bơm chìm nước thải VOLTOR WQ200-21-22GN điện áp 380V (3 pha) với cánh cắt rác. Công suất siêu khủng.',
    'VOLTOR', 'WQ200-21-22GN', 'Việt Nam', '36 tháng',
    JSON_OBJECT(
        'power_hp', '30HP',
        'power_kw', '22KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø168mm',
        'flow_rate', '288m³/13m, 200m³/21m, 72m³/31m',
        'head_max', '31m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox',
        'weight', '220kg',
        'series', 'WQ Series (380V)'
    ),
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800'),
    1, TRUE, TRUE, FALSE
);

-- WQ400-13-30GN (380V)
INSERT INTO products (
    name, slug, sku, category_id,
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications, image, images, stock,
    is_featured, is_bestseller, is_new
) VALUES (
    'Máy bơm chìm nước thải cánh cắt rác VOLTOR WQ400-13-30GN (380V)',
    'may-bom-chim-nuoc-thai-canh-cat-rac-voltor-wq400-13-30gn-380v',
    'WQ400-13-30GN',
    7,
    88000000, NULL, 0,
    'Máy bơm chìm cánh cắt rác 40HP - 380V, lưu lượng 500m³/9m',
    'Máy bơm chìm nước thải VOLTOR WQ400-13-30GN điện áp 380V (3 pha) với cánh cắt rác. Công suất công nghiệp nặng.',
    'VOLTOR', 'WQ400-13-30GN', 'Việt Nam', '36 tháng',
    JSON_OBJECT(
        'power_hp', '40HP',
        'power_kw', '30KW',
        'voltage', '380V - 3 Phase',
        'outlet_diameter', 'Ø168mm',
        'flow_rate', '500m³/9m, 400m³/13m, 108m³/21m',
        'head_max', '21m',
        'cutting_blade', 'Có (Cánh Cắt Rác)',
        'material', 'Gang đúc + Inox 316',
        'weight', '320kg',
        'series', 'WQ Series (380V)'
    ),
    'https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800',
    JSON_ARRAY('https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800'),
    1, TRUE, TRUE, FALSE
);

-- ============================================
-- DONE!
-- ============================================

-- Check total products added
SELECT 'Total products added:' as message, COUNT(*) as count FROM products WHERE brand = 'VOLTOR';

-- Check products by series
SELECT 
    SUBSTRING_INDEX(JSON_UNQUOTE(JSON_EXTRACT(specifications, '$.series')), ' ', 1) as series,
    COUNT(*) as count
FROM products
WHERE brand = 'VOLTOR'
GROUP BY series
ORDER BY count DESC;

-- Summary
SELECT 
    'WS Series' as series,
    COUNT(*) as count
FROM products
WHERE specifications LIKE '%WS Series%'
UNION ALL
SELECT 
    'QS Series',
    COUNT(*)
FROM products
WHERE specifications LIKE '%QS Series%'
UNION ALL
SELECT 
    'WQ Series',
    COUNT(*)
FROM products
WHERE specifications LIKE '%WQ Series%';
