-- ============================================
-- VOLTOR VIETNAM - DONGYIN PUMP PRODUCTS
-- COMPLETE DATABASE SEED
-- ============================================
-- Date: 05/02/2026
-- Effective Price Date: 01/05/2025
-- Total Products: 120 items
-- ============================================

-- Import Part 1: QS, WS, WQ, TD Series (50 products)
SOURCE /database/seed-products-dongyin-complete.sql;

-- Import Part 2: SD, 4SP, 6SR/6SP, 4DP Series (70 products)
SOURCE /database/seed-products-dongyin-complete-part2.sql;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Tổng số sản phẩm DONGYIN
SELECT 
  'Total DONGYIN Products' as metric,
  COUNT(*) as value
FROM products
WHERE brand = 'DONGYIN';

-- Phân bố theo Series
SELECT 
  JSON_EXTRACT(specifications, '$.series') as series,
  COUNT(*) as count,
  CONCAT(FORMAT(AVG(price), 0), ' VND') as avg_price
FROM products
WHERE brand = 'DONGYIN'
GROUP BY series
ORDER BY count DESC;

-- Phân bố theo điện áp
SELECT 
  JSON_EXTRACT(specifications, '$.voltage') as voltage,
  COUNT(*) as count
FROM products
WHERE brand = 'DONGYIN'
GROUP BY voltage
ORDER BY count DESC;

-- Top 10 sản phẩm đắt nhất
SELECT 
  name,
  CONCAT(FORMAT(price, 0), ' VND') as price,
  JSON_EXTRACT(specifications, '$.series') as series
FROM products
WHERE brand = 'DONGYIN'
ORDER BY price DESC
LIMIT 10;

-- Top 10 sản phẩm rẻ nhất
SELECT 
  name,
  CONCAT(FORMAT(price, 0), ' VND') as price,
  JSON_EXTRACT(specifications, '$.series') as series
FROM products
WHERE brand = 'DONGYIN'
ORDER BY price ASC
LIMIT 10;

-- Featured products
SELECT 
  COUNT(*) as featured_count
FROM products
WHERE brand = 'DONGYIN' AND is_featured = TRUE;

-- Bestseller products
SELECT 
  COUNT(*) as bestseller_count
FROM products
WHERE brand = 'DONGYIN' AND is_bestseller = TRUE;

-- New products
SELECT 
  COUNT(*) as new_count
FROM products
WHERE brand = 'DONGYIN' AND is_new = TRUE;

-- Tổng giá trị kho (giả định mỗi sản phẩm có 1 unit trong stock)
SELECT 
  CONCAT(FORMAT(SUM(price * stock), 0), ' VND') as total_inventory_value
FROM products
WHERE brand = 'DONGYIN';

-- ============================================
-- DONE!
-- ============================================
