-- ============================================
-- VOLTOR VIETNAM - MySQL Database Schema
-- ============================================
-- Sản phẩm máy bơm, Users, Reviews
-- ============================================

-- Drop tables nếu tồn tại (cẩn thận!)
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255), -- Hashed password (NULL nếu OAuth)
    name VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    avatar VARCHAR(500),
    provider VARCHAR(50), -- 'local', 'facebook', 'google', 'linkedin'
    provider_id VARCHAR(255), -- ID từ OAuth provider
    role ENUM('user', 'admin') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_provider (provider, provider_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. CATEGORIES TABLE (Phân cấp 3 cấp)
-- ============================================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    parent_id INT NULL,
    level INT DEFAULT 1, -- 1: Root, 2: Sub, 3: Sub-sub
    description TEXT,
    icon VARCHAR(100), -- Icon name từ lucide-react
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_parent (parent_id),
    INDEX idx_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    sku VARCHAR(100) UNIQUE,
    category_id INT NOT NULL,
    
    -- Pricing
    price DECIMAL(15, 2) NOT NULL,
    original_price DECIMAL(15, 2), -- Giá gốc (trước giảm giá)
    discount_percent INT DEFAULT 0,
    
    -- Description
    short_description TEXT,
    description TEXT,
    
    -- Specifications
    brand VARCHAR(255),
    model VARCHAR(255),
    origin VARCHAR(255), -- Xuất xứ
    warranty VARCHAR(255), -- Bảo hành
    
    -- Technical Specs (JSON format)
    specifications JSON, -- {power: "5HP", flow: "100m3/h", head: "50m", ...}
    
    -- Images
    image VARCHAR(500), -- Main image
    images JSON, -- ["image1.jpg", "image2.jpg", ...]
    
    -- Stock
    stock INT DEFAULT 0,
    min_order INT DEFAULT 1,
    max_order INT DEFAULT 999,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    
    -- Status
    is_featured BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Stats
    view_count INT DEFAULT 0,
    order_count INT DEFAULT 0,
    rating_average DECIMAL(3, 2) DEFAULT 0.00, -- 0.00 - 5.00
    review_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_slug (slug),
    INDEX idx_sku (sku),
    INDEX idx_category (category_id),
    INDEX idx_price (price),
    INDEX idx_featured (is_featured),
    INDEX idx_active (is_active),
    FULLTEXT idx_search (name, short_description, description, brand, model)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. REVIEWS TABLE
-- ============================================
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    
    -- Review content
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(255),
    comment TEXT NOT NULL,
    
    -- Images (optional)
    images JSON, -- ["review1.jpg", "review2.jpg", ...]
    
    -- Status
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- Helpful votes
    helpful_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_user (user_id),
    INDEX idx_rating (rating),
    INDEX idx_created (created_at),
    
    -- Một user chỉ review một product một lần
    UNIQUE KEY unique_user_product (user_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. ORDERS TABLE
-- ============================================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    
    -- Customer Info
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_address TEXT NOT NULL,
    customer_note TEXT,
    
    -- Order totals
    subtotal DECIMAL(15, 2) NOT NULL,
    shipping_fee DECIMAL(15, 2) DEFAULT 0.00,
    discount DECIMAL(15, 2) DEFAULT 0.00,
    tax DECIMAL(15, 2) DEFAULT 0.00,
    total DECIMAL(15, 2) NOT NULL,
    
    -- Status
    status ENUM('pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
    payment_method VARCHAR(50), -- 'cod', 'bank_transfer', 'credit_card'
    
    -- Tracking
    shipping_method VARCHAR(100),
    tracking_number VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP NULL,
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_order_number (order_number),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 6. ORDER_ITEMS TABLE
-- ============================================
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    
    -- Product snapshot (lưu thông tin tại thời điểm mua)
    product_name VARCHAR(500) NOT NULL,
    product_sku VARCHAR(100),
    product_image VARCHAR(500),
    
    -- Pricing
    price DECIMAL(15, 2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(15, 2) NOT NULL, -- price * quantity
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_order (order_id),
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 7. CART_ITEMS TABLE (Optional - hoặc dùng localStorage)
-- ============================================
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger: Tự động cập nhật rating_average và review_count khi có review mới
DELIMITER $$

CREATE TRIGGER after_review_insert
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    UPDATE products
    SET 
        review_count = (SELECT COUNT(*) FROM reviews WHERE product_id = NEW.product_id AND is_approved = TRUE),
        rating_average = (SELECT AVG(rating) FROM reviews WHERE product_id = NEW.product_id AND is_approved = TRUE)
    WHERE id = NEW.product_id;
END$$

CREATE TRIGGER after_review_update
AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN
    UPDATE products
    SET 
        review_count = (SELECT COUNT(*) FROM reviews WHERE product_id = NEW.product_id AND is_approved = TRUE),
        rating_average = (SELECT AVG(rating) FROM reviews WHERE product_id = NEW.product_id AND is_approved = TRUE)
    WHERE id = NEW.product_id;
END$$

CREATE TRIGGER after_review_delete
AFTER DELETE ON reviews
FOR EACH ROW
BEGIN
    UPDATE products
    SET 
        review_count = (SELECT COUNT(*) FROM reviews WHERE product_id = OLD.product_id AND is_approved = TRUE),
        rating_average = COALESCE((SELECT AVG(rating) FROM reviews WHERE product_id = OLD.product_id AND is_approved = TRUE), 0)
    WHERE id = OLD.product_id;
END$$

DELIMITER ;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Composite indexes for common queries
CREATE INDEX idx_products_category_active ON products(category_id, is_active);
CREATE INDEX idx_products_featured_active ON products(is_featured, is_active);
CREATE INDEX idx_reviews_product_approved ON reviews(product_id, is_approved);

-- ============================================
-- DONE!
-- ============================================

-- Check tables
SHOW TABLES;

-- Check structure
DESCRIBE users;
DESCRIBE categories;
DESCRIBE products;
DESCRIBE reviews;
DESCRIBE orders;
DESCRIBE order_items;
DESCRIBE cart_items;
