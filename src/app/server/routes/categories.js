/**
 * Categories API Routes
 */

const express = require('express');
const router = express.Router();
const db = require('../db');

// ============================================
// GET /api/categories - Lấy tất cả categories (tree)
// ============================================
router.get('/', async (req, res, next) => {
  try {
    const [categories] = await db.query(`
      SELECT * FROM categories
      WHERE is_active = 1
      ORDER BY level ASC, display_order ASC
    `);

    // Build tree structure
    const buildTree = (parentId = null) => {
      return categories
        .filter(cat => cat.parent_id === parentId)
        .map(cat => ({
          ...cat,
          children: buildTree(cat.id)
        }));
    };

    const tree = buildTree(null);

    res.json({
      success: true,
      data: {
        categories: tree,
        flat: categories // Also send flat list
      }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// GET /api/categories/:slug - Lấy category theo slug
// ============================================
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;

    const [categories] = await db.query(`
      SELECT * FROM categories WHERE slug = ? AND is_active = 1
    `, [slug]);

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Category not found' }
      });
    }

    const category = categories[0];

    // Get subcategories
    const [subcategories] = await db.query(`
      SELECT * FROM categories 
      WHERE parent_id = ? AND is_active = 1
      ORDER BY display_order ASC
    `, [category.id]);

    // Get product count
    const [countResult] = await db.query(`
      SELECT COUNT(*) as count
      FROM products
      WHERE category_id = ? AND is_active = 1
    `, [category.id]);

    res.json({
      success: true,
      data: {
        ...category,
        subcategories,
        product_count: countResult[0].count
      }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
