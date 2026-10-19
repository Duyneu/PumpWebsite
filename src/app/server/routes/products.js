/**
 * Products API Routes
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../db');
const { verifyAdmin } = require('../middleware/auth');

const ALLOWED_PRODUCT_FIELDS = [
  'name', 'slug', 'sku', 'category_id', 'price', 'original_price',
  'discount_percent', 'short_description', 'description', 'brand',
  'model', 'origin', 'warranty', 'specifications', 'image', 'images',
  'stock', 'is_featured', 'is_bestseller', 'is_new', 'is_active'
];

// ============================================
// GET /api/products - Lấy danh sách sản phẩm
// ============================================
router.get('/', async (req, res, next) => {
  try {
    const { 
      category, 
      search, 
      sort = 'newest',
      page = 1, 
      limit = 12,
      featured,
      bestseller
    } = req.query;

    let query = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1
    `;
    const params = [];

    // Filter by category
    if (category) {
      query += ` AND (c.slug = ? OR c.parent_id IN (SELECT id FROM categories WHERE slug = ?))`;
      params.push(category, category);
    }

    // Filter by search
    if (search) {
      query += ` AND (
        p.name LIKE ? OR 
        p.short_description LIKE ? OR 
        p.brand LIKE ? OR 
        p.model LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Filter featured
    if (featured === 'true') {
      query += ` AND p.is_featured = 1`;
    }

    // Filter bestseller
    if (bestseller === 'true') {
      query += ` AND p.is_bestseller = 1`;
    }

    // Sorting
    switch (sort) {
      case 'price-asc':
        query += ` ORDER BY p.price ASC`;
        break;
      case 'price-desc':
        query += ` ORDER BY p.price DESC`;
        break;
      case 'rating':
        query += ` ORDER BY p.rating_average DESC, p.review_count DESC`;
        break;
      case 'popular':
        query += ` ORDER BY p.view_count DESC`;
        break;
      case 'newest':
      default:
        query += ` ORDER BY p.created_at DESC`;
    }

    // Pagination
    const offset = (page - 1) * limit;
    query += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    // Execute query
    const [products] = await db.query(query, params);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1
    `;
    const countParams = [];
    
    if (category) {
      countQuery += ` AND (c.slug = ? OR c.parent_id IN (SELECT id FROM categories WHERE slug = ?))`;
      countParams.push(category, category);
    }
    if (search) {
      countQuery += ` AND (p.name LIKE ? OR p.short_description LIKE ?)`;
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm);
    }
    if (featured === 'true') {
      countQuery += ` AND p.is_featured = 1`;
    }
    if (bestseller === 'true') {
      countQuery += ` AND p.is_bestseller = 1`;
    }

    const [countResult] = await db.query(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: {
        products: products.map(p => ({
          ...p,
          images: p.images ? JSON.parse(p.images) : [],
          specifications: p.specifications ? JSON.parse(p.specifications) : {}
        })),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// GET /api/products/:slug - Lấy chi tiết sản phẩm
// ============================================
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;

    const [products] = await db.query(`
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ? AND p.is_active = 1
    `, [slug]);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Product not found' }
      });
    }

    const product = products[0];

    // Update view count
    await db.query('UPDATE products SET view_count = view_count + 1 WHERE id = ?', [product.id]);

    // Get reviews
    const [reviews] = await db.query(`
      SELECT 
        r.*,
        u.name as user_name,
        u.avatar as user_avatar
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ? AND r.is_approved = 1
      ORDER BY r.created_at DESC
    `, [product.id]);

    res.json({
      success: true,
      data: {
        ...product,
        images: product.images ? JSON.parse(product.images) : [],
        specifications: product.specifications ? JSON.parse(product.specifications) : {},
        reviews: reviews.map(r => ({
          ...r,
          images: r.images ? JSON.parse(r.images) : []
        }))
      }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// POST /api/products - Tạo sản phẩm mới (Admin only)
// ============================================
router.post(
  '/',
  verifyAdmin,
  [
    body('name').trim().notEmpty().withMessage('Tên sản phẩm không được để trống').isLength({ max: 255 }),
    body('sku').trim().notEmpty().withMessage('Mã SKU không được để trống').isLength({ max: 100 }),
    body('price').isFloat({ min: 0 }).withMessage('Giá sản phẩm phải là số không âm'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Số lượng tồn kho phải là số nguyên không âm')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: errors.array()[0].msg,
            details: errors.array()
          }
        });
      }

      const {
        name, slug, sku, category_id,
        price, original_price, discount_percent,
        short_description, description,
        brand, model, origin, warranty,
        specifications, image, images,
        stock
      } = req.body;

      // Auto-generate slug if not provided
      const cleanSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const [result] = await db.query(`
        INSERT INTO products (
          name, slug, sku, category_id,
          price, original_price, discount_percent,
          short_description, description,
          brand, model, origin, warranty,
          specifications, image, images, stock
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        name, cleanSlug, sku, category_id || null,
        price, original_price || null, discount_percent || 0,
        short_description || null, description || null,
        brand || null, model || null, origin || null, warranty || null,
        JSON.stringify(specifications || {}),
        image || null,
        JSON.stringify(images || []),
        stock || 0
      ]);

      res.status(201).json({
        success: true,
        data: {
          id: result.insertId,
          message: 'Tạo sản phẩm thành công'
        }
      });

    } catch (error) {
      next(error);
    }
  }
);

// ============================================
// PUT /api/products/:id - Cập nhật sản phẩm (Admin only)
// ============================================
router.put(
  '/:id',
  verifyAdmin,
  [
    body('price').optional().isFloat({ min: 0 }).withMessage('Giá sản phẩm phải là số không âm'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Số lượng kho phải là số nguyên không âm')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: errors.array()[0].msg,
            details: errors.array()
          }
        });
      }

      const { id } = req.params;
      const updates = req.body;

      // Filter only allowed fields to prevent mass assignment
      const fields = [];
      const values = [];

      for (const [key, value] of Object.entries(updates)) {
        if (!ALLOWED_PRODUCT_FIELDS.includes(key)) continue;

        if (['specifications', 'images'].includes(key)) {
          fields.push(`${key} = ?`);
          values.push(JSON.stringify(value || (key === 'images' ? [] : {})));
        } else {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (fields.length === 0) {
        return res.status(400).json({
          success: false,
          error: { message: 'Không có trường dữ liệu hợp lệ để cập nhật' }
        });
      }

      values.push(id);

      await db.query(`
        UPDATE products 
        SET ${fields.join(', ')}
        WHERE id = ?
      `, values);

      res.json({
        success: true,
        data: { message: 'Cập nhật sản phẩm thành công' }
      });

    } catch (error) {
      next(error);
    }
  }
);

// ============================================
// DELETE /api/products/:id - Xóa sản phẩm (Admin only)
// ============================================
router.delete('/:id', verifyAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    // Soft delete (set is_active = 0)
    await db.query('UPDATE products SET is_active = 0 WHERE id = ?', [id]);

    res.json({
      success: true,
      data: { message: 'Đã xóa sản phẩm thành công' }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
