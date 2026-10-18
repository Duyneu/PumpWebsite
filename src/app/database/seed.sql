-- ============================================
-- VOLTOR VIETNAM - Sample Data (Seed)
-- ============================================

-- ============================================
-- 1. SEED USERS
-- ============================================

INSERT INTO users (email, password, name, phone, address, provider, role) VALUES
('admin@voltor.com', '$2b$10$K6mVQJzwT3xvJZQbX9p8.Oy8QZ7KJYvTYxBqGZqFOZLx5pYGJZ8Fm', 'Admin VOLTOR', '0898296336', 'Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh', 'local', 'admin'),
('user@voltor.com', '$2b$10$K6mVQJzwT3xvJZQbX9p8.Oy8QZ7KJYvTYxBqGZqFOZLx5pYGJZ8Fm', 'Nguyễn Văn A', '0901234567', 'Hà Nội', 'local', 'user'),
('nguyenvana@gmail.com', NULL, 'Nguyễn Văn A', '0912345678', 'TP. HCM', 'google', 'user'),
('levanb@outlook.com', NULL, 'Lê Văn B', '0923456789', 'Đà Nẵng', 'facebook', 'user');

-- Password cho admin và user: 'password123' (đã hash với bcrypt)

-- ============================================
-- 2. SEED CATEGORIES (3 cấp)
-- ============================================

-- Cấp 1: Root categories
INSERT INTO categories (name, slug, parent_id, level, description, icon, display_order) VALUES
('Máy Bơm Nước', 'may-bom-nuoc', NULL, 1, 'Các loại máy bơm nước công nghiệp và dân dụng', 'Droplets', 1),
('Phụ Kiện & Linh Kiện', 'phu-kien-linh-kien', NULL, 1, 'Phụ kiện và linh kiện cho máy bơm', 'Settings', 2),
('Thiết Bị Điều Khiển', 'thiet-bi-dieu-khien', NULL, 1, 'Thiết bị điều khiển và tự động hóa', 'Cpu', 3);

-- Cấp 2: Sub categories (Máy Bơm Nước)
INSERT INTO categories (name, slug, parent_id, level, description, icon, display_order) VALUES
('Máy Bơm Ly Tâm', 'may-bom-ly-tam', 1, 2, 'Máy bơm ly tâm công suất lớn', 'Circle', 1),
('Máy Bơm Chìm', 'may-bom-chim', 1, 2, 'Máy bơm chìm nước thải, nước sạch', 'ArrowDown', 2),
('Máy Bơm Hỏa Tiễn', 'may-bom-hoa-tien', 1, 2, 'Máy bơm hỏa tiễn giếng khoan', 'Rocket', 3),
('Máy Bơm Hố Móng', 'may-bom-ho-mong', 1, 2, 'Máy bơm hố móng công trình', 'Construction', 4);

-- Cấp 3: Sub-sub categories (Máy Bơm Ly Tâm)
INSERT INTO categories (name, slug, parent_id, level, description, icon, display_order) VALUES
('Bơm Ly Tâm Trục Ngang', 'bom-ly-tam-truc-ngang', 4, 3, 'Bơm ly tâm trục ngang công nghiệp', NULL, 1),
('Bơm Ly Tâm Trục Đứng', 'bom-ly-tam-truc-dung', 4, 3, 'Bơm ly tâm trục đứng', NULL, 2),
('Bơm Ly Tâm Nhiều Tầng', 'bom-ly-tam-nhieu-tang', 4, 3, 'Bơm ly tâm nhiều tầng cánh', NULL, 3);

-- ============================================
-- 3. SEED PRODUCTS
-- ============================================

INSERT INTO products (
    name, slug, sku, category_id, 
    price, original_price, discount_percent,
    short_description, description,
    brand, model, origin, warranty,
    specifications,
    image, images,
    stock, is_featured, is_bestseller, is_new
) VALUES

-- Product 1: Máy bơm ly tâm
(
    'Máy bơm ly tâm VOLTOR VT-100',
    'may-bom-ly-tam-voltor-vt-100',
    'VT-100',
    4,
    15500000,
    18000000,
    14,
    'Máy bơm ly tâm công suất 7.5HP, lưu lượng 100m³/h, cột áp 50m',
    'Máy bơm ly tâm VOLTOR VT-100 được thiết kế chuyên dụng cho các hệ thống cấp nước công nghiệp, tưới tiêu nông nghiệp. Với cấu tạo bền bỉ, hiệu suất cao và tiết kiệm năng lượng.',
    'VOLTOR',
    'VT-100',
    'Việt Nam',
    '24 tháng',
    JSON_OBJECT(
        'power', '7.5HP (5.5kW)',
        'flow', '100 m³/h',
        'head', '50 m',
        'inlet', 'DN80 (3 inch)',
        'outlet', 'DN65 (2.5 inch)',
        'speed', '2900 rpm',
        'voltage', '380V - 3 Phase',
        'material', 'Gang đúc',
        'weight', '85 kg'
    ),
    'https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800',
    JSON_ARRAY(
        'https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800',
        'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800'
    ),
    25,
    TRUE,
    TRUE,
    FALSE
),

-- Product 2: Máy bơm chìm
(
    'Máy bơm chìm nước thải VOLTOR VS-250',
    'may-bom-chim-nuoc-thai-voltor-vs-250',
    'VS-250',
    5,
    12800000,
    14500000,
    12,
    'Máy bơm chìm nước thải 3HP, lưu lượng 250L/phút, độ chìm 20m',
    'Máy bơm chìm VOLTOR VS-250 chuyên dụng cho xử lý nước thải sinh hoạt, công nghiệp. Khả năng hút cặn lớn, vận hành êm ái.',
    'VOLTOR',
    'VS-250',
    'Việt Nam',
    '18 tháng',
    JSON_OBJECT(
        'power', '3HP (2.2kW)',
        'flow', '250 L/phút',
        'head', '20 m',
        'outlet', 'DN50 (2 inch)',
        'max_solids', '35 mm',
        'voltage', '220V - 1 Phase',
        'cable_length', '15 m',
        'material', 'Inox 304',
        'weight', '28 kg'
    ),
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800',
    JSON_ARRAY(
        'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800',
        'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800'
    ),
    40,
    TRUE,
    FALSE,
    TRUE
),

-- Product 3: Máy bơm hỏa tiễn
(
    'Máy bơm hỏa tiễn VOLTOR VR-150',
    'may-bom-hoa-tien-voltor-vr-150',
    'VR-150',
    6,
    28500000,
    32000000,
    11,
    'Máy bơm hỏa tiễn giếng khoan 10HP, Q=150L/phút, H=150m',
    'Máy bơm hỏa tiễn VOLTOR VR-150 thiết kế cho giếng khoan sâu, cấp nước sinh hoạt, tưới tiêu. Hiệu suất cao, tiết kiệm điện năng.',
    'VOLTOR',
    'VR-150',
    'Việt Nam',
    '36 tháng',
    JSON_OBJECT(
        'power', '10HP (7.5kW)',
        'flow', '150 L/phút (9 m³/h)',
        'head', '150 m',
        'outlet', 'DN40 (1.5 inch)',
        'diameter', '4 inch (100mm)',
        'stages', '16 tầng',
        'voltage', '380V - 3 Phase',
        'material', 'Inox 304',
        'weight', '45 kg'
    ),
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    JSON_ARRAY(
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
        'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800'
    ),
    15,
    FALSE,
    TRUE,
    FALSE
),

-- Product 4: Máy bơm hố móng
(
    'Máy bơm hố móng VOLTOR VM-50',
    'may-bom-ho-mong-voltor-vm-50',
    'VM-50',
    7,
    8500000,
    9800000,
    13,
    'Máy bơm hố móng 2HP, lưu lượng 200L/phút, hút cặn tối đa 40mm',
    'Máy bơm hố móng VOLTOR VM-50 chuyên dụng cho công trình xây dựng, hút nước mưa, nước ngầm có cặn bẩn.',
    'VOLTOR',
    'VM-50',
    'Việt Nam',
    '12 tháng',
    JSON_OBJECT(
        'power', '2HP (1.5kW)',
        'flow', '200 L/phút',
        'head', '15 m',
        'outlet', 'DN50 (2 inch)',
        'max_solids', '40 mm',
        'voltage', '220V - 1 Phase',
        'cable_length', '10 m',
        'material', 'Gang + Inox',
        'weight', '18 kg'
    ),
    'https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800',
    JSON_ARRAY(
        'https://images.unsplash.com/photo-1581092583537-20d51876f3e3?w=800'
    ),
    50,
    TRUE,
    FALSE,
    TRUE
),

-- Product 5: Máy bơm ly tâm trục ngang
(
    'Máy bơm ly tâm trục ngang VOLTOR VH-200',
    'may-bom-ly-tam-truc-ngang-voltor-vh-200',
    'VH-200',
    8,
    42000000,
    48000000,
    13,
    'Máy bơm công nghiệp 25HP, lưu lượng 200m³/h, cột áp 80m',
    'Máy bơm ly tâm trục ngang VOLTOR VH-200 công suất lớn, phù hợp cho nhà máy, hệ thống cấp nước đô thị.',
    'VOLTOR',
    'VH-200',
    'Việt Nam',
    '36 tháng',
    JSON_OBJECT(
        'power', '25HP (18.5kW)',
        'flow', '200 m³/h',
        'head', '80 m',
        'inlet', 'DN125 (5 inch)',
        'outlet', 'DN100 (4 inch)',
        'speed', '2900 rpm',
        'voltage', '380V - 3 Phase',
        'material', 'Inox 316',
        'weight', '250 kg'
    ),
    'https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800',
    JSON_ARRAY(
        'https://images.unsplash.com/photo-1581092918484-8313e1f7e8e7?w=800'
    ),
    10,
    FALSE,
    FALSE,
    FALSE
);

-- ============================================
-- 4. SEED REVIEWS
-- ============================================

INSERT INTO reviews (product_id, user_id, rating, title, comment, is_verified_purchase) VALUES
(1, 2, 5, 'Máy bơm rất tốt!', 'Mình đã sử dụng máy bơm này được 6 tháng rồi, hoạt động rất ổn định. Lưu lượng nước mạnh, tiết kiệm điện. Đội ngũ VOLTOR hỗ trợ lắp đặt nhiệt tình. Recommend!', TRUE),
(1, 3, 4, 'Chất lượng tốt', 'Máy chạy êm, công suất đủ mạnh. Giá hơi cao nhưng đáng đồng tiền. Đã dùng 3 tháng chưa thấy vấn đề gì.', TRUE),
(1, 4, 5, 'Rất hài lòng', 'Giao hàng nhanh, đóng gói cẩn thận. Máy bơm chất lượng tốt, phù hợp cho hệ thống tưới cây của mình.', FALSE),

(2, 2, 5, 'Máy bơm chìm cực tốt', 'Dùng để bơm nước thải trong nhà máy, hoạt động liên tục 10 tiếng/ngày không bị nóng. Rất hài lòng!', TRUE),
(2, 4, 4, 'Tốt, giá hợp lý', 'So với mấy hãng khác thì máy này giá tốt hơn mà chất lượng không thua kém. Đã mua thêm 2 cái nữa.', TRUE),

(3, 3, 5, 'Máy hỏa tiễn chất lượng cao', 'Mới lắp được 1 tháng, giếng sâu 80m vẫn bơm nước lên tốt. Áp lực ổn định. Team kỹ thuật hỗ trợ tận tình!', TRUE),

(4, 2, 4, 'Máy bơm hố móng đúng chất', 'Dùng cho công trình, bơm nước bùn đất cũng ok. Nhỏ gọn dễ di chuyển. Tốt!', TRUE),
(4, 3, 5, 'Rất tốt cho công trình', 'Đã mua 5 cái để dùng cho các công trình. Máy chạy khỏe, bền bỉ.', TRUE);

-- ============================================
-- 5. SEED ORDERS (Sample)
-- ============================================

INSERT INTO orders (
    order_number, user_id,
    customer_name, customer_email, customer_phone, customer_address,
    subtotal, shipping_fee, total,
    status, payment_status, payment_method
) VALUES
(
    'ORD20241229001',
    2,
    'Nguyễn Văn A',
    'user@voltor.com',
    '0901234567',
    '123 Đường ABC, Quận 1, TP.HCM',
    15500000,
    0,
    15500000,
    'delivered',
    'paid',
    'bank_transfer'
),
(
    'ORD20241229002',
    3,
    'Nguyễn Văn A',
    'nguyenvana@gmail.com',
    '0912345678',
    '456 Đường XYZ, Hà Nội',
    25600000,
    500000,
    26100000,
    'shipping',
    'paid',
    'cod'
);

-- ============================================
-- 6. SEED ORDER ITEMS
-- ============================================

INSERT INTO order_items (order_id, product_id, product_name, product_sku, price, quantity, subtotal) VALUES
(1, 1, 'Máy bơm ly tâm VOLTOR VT-100', 'VT-100', 15500000, 1, 15500000),
(2, 2, 'Máy bơm chìm nước thải VOLTOR VS-250', 'VS-250', 12800000, 2, 25600000);

-- ============================================
-- DONE!
-- ============================================

-- Check data
SELECT 'Users:' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Categories:', COUNT(*) FROM categories
UNION ALL
SELECT 'Products:', COUNT(*) FROM products
UNION ALL
SELECT 'Reviews:', COUNT(*) FROM reviews
UNION ALL
SELECT 'Orders:', COUNT(*) FROM orders;

-- View products with categories
SELECT 
    p.id,
    p.name,
    p.sku,
    c.name as category,
    p.price,
    p.stock,
    p.rating_average,
    p.review_count
FROM products p
JOIN categories c ON p.category_id = c.id;

-- View reviews summary
SELECT 
    p.name as product,
    r.rating,
    r.title,
    u.name as reviewer,
    r.created_at
FROM reviews r
JOIN products p ON r.product_id = p.id
JOIN users u ON r.user_id = u.id
ORDER BY r.created_at DESC;
