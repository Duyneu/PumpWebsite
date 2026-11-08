import fs from 'fs';
import path from 'path';
import { products } from '../src/app/data/products';

function escapeSql(str: string | undefined | null): string {
  if (str === undefined || str === null) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const lines: string[] = [];
lines.push('-- D1 Product & Categories Seed');
lines.push('');

// 1. Categories
lines.push(`INSERT OR IGNORE INTO categories (id, name, slug, level, description, icon, display_order) VALUES
(1, 'Máy Bơm Nước', 'may-bom-nuoc', 1, 'Các loại máy bơm nước công nghiệp và dân dụng', 'Droplets', 1),
(2, 'Phụ Kiện & Linh Kiện', 'phu-kien-linh-kien', 1, 'Phụ kiện và linh kiện cho máy bơm', 'Settings', 2),
(3, 'Thiết Bị Điều Khiển', 'thiet-bi-dieu-khien', 1, 'Thiết bị điều khiển và tự động hóa', 'Cpu', 3),
(4, 'Máy Bơm Ly Tâm', 'may-bom-ly-tam', 2, 'Máy bơm ly tâm công suất lớn', 'Circle', 1),
(5, 'Máy Bơm Chìm', 'may-bom-chim', 2, 'Máy bơm chìm nước thải, nước sạch', 'ArrowDown', 2),
(6, 'Máy Bơm Hỏa Tiễn', 'may-bom-hoa-tien', 2, 'Máy bơm hỏa tiễn giếng khoan', 'Rocket', 3),
(7, 'Máy Bơm Tăng Áp', 'may-bom-tang-ap', 2, 'Máy bơm tăng áp tự động', 'Zap', 4),
(8, 'Máy Bơm Hóa Chất', 'may-bom-hoa-chat', 2, 'Máy bơm hóa chất công nghiệp', 'FlaskConical', 5),
(9, 'Máy Bơm Giếng Khoan', 'may-bom-gieng-khoan', 2, 'Máy bơm giếng khoan sâu', 'Drill', 6);`);
lines.push('');

// 2. Products (Exclude 23 obsolete base products '1'..'23', only keep 120 Dongyin products)
const EXCLUDED_IDS = new Set(Array.from({ length: 23 }, (_, i) => String(i + 1)));

for (const p of products) {
  if (EXCLUDED_IDS.has(String(p.id))) continue;

  const id = p.id;
  const name = p.name;
  const slug = slugify(p.name) + '-' + id;
  const sku = `SKU-${id}`;
  const price = p.price || 0;
  const originalPrice = p.price ? Math.round(p.price * 1.15) : null;
  const brand = 'VOLTOR';
  const model = p.name;
  const origin = 'Việt Nam / Trung Quốc';
  const warranty = '12 - 24 tháng';
  const status = p.inStock ? 'active' : 'inactive';
  const imageUrl = p.image || '';
  const description = p.description || '';
  const specs = p.specs ? JSON.stringify(p.specs) : null;
  const customSpecs = p.customSpecs ? JSON.stringify(p.customSpecs) : null;

  const category = p.category || 'Máy Bơm Nước';

  lines.push(
    `INSERT OR REPLACE INTO products (id, name, slug, sku, category, price, original_price, brand, model, origin, warranty, status, stock_quantity, image_url, description, specifications) VALUES (` +
    `${escapeSql(id)}, ${escapeSql(name)}, ${escapeSql(slug)}, ${escapeSql(sku)}, ${escapeSql(category)}, ${price}, ${originalPrice ? originalPrice : 'NULL'}, ` +
    `${escapeSql(brand)}, ${escapeSql(model)}, ${escapeSql(origin)}, ${escapeSql(warranty)}, ${escapeSql(status)}, ${p.inStock ? 100 : 0}, ` +
    `${escapeSql(imageUrl)}, ${escapeSql(description)}, ${escapeSql(specs)}` +
    `);`
  );
}

// 3. Reviews
lines.push('');
lines.push(`INSERT OR IGNORE INTO reviews (id, product_id, user_id, user_name, rating, comment, created_at) VALUES
('review_001', '1', '1766504708779', 'Nguyễn Hữu Duy', 5, 'Máy bơm chạy rất tốt, êm ái và mạnh mẽ. Tôi rất hài lòng với sản phẩm này!', '2025-12-20T10:30:00.000Z'),
('review_002', '1', 'user_002', 'Trần Văn A', 4, 'Sản phẩm tốt, giao hàng nhanh. Giá cả hợp lý.', '2025-12-21T14:20:00.000Z'),
('review_003', '1', 'user_003', 'Lê Thị B', 5, 'Chất lượng tuyệt vời! Shop tư vấn nhiệt tình. Sẽ quay lại mua thêm.', '2025-12-22T09:15:00.000Z'),
('review_004', '2', 'user_004', 'Phạm Văn C', 5, 'Máy bơm chạy êm, hiệu suất cao. Rất đáng tiền!', '2025-12-19T16:45:00.000Z'),
('review_005', '3', 'user_005', 'Hoàng Thị D', 4, 'Sản phẩm tốt, đúng như mô tả. Giao hàng hơi lâu nhưng chấp nhận được.', '2025-12-18T11:30:00.000Z'),
('review_006', '3', 'user_006', 'Vũ Văn E', 5, 'Tuyệt vời! Máy bơm công suất lớn, phù hợp cho công trình của tôi.', '2025-12-17T13:20:00.000Z');`);

fs.writeFileSync(path.join(process.cwd(), 'migrations/0002_seed_products.sql'), lines.join('\n'));
console.log(`Generated migrations/0002_seed_products.sql with ${products.length} products.`);
