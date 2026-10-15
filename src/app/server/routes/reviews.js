/**
 * Reviews API Routes
 */

const express = require('express');
const router = express.Router();
const db = require('../db');

// ============================================
// GET /api/reviews - Lấy danh sách reviews
// ============================================
router.get('/', async (req, res, next) => {
  try {
    const { product_id, user_id, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        r.*,
        u.name as user_name,
        u.avatar as user_avatar,
        p.name as product_name,
        p.slug as product_slug
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN products p ON r.product_id = p.id
      WHERE r.is_approved = 1
    `;
    const params = [];

    if (product_id) {
      query += ` AND r.product_id = ?`;
      params.push(product_id);
    }

    if (user_id) {
      query += ` AND r.user_id = ?`;
      params.push(user_id);
    }

    query += ` ORDER BY r.created_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    const [reviews] = await db.query(query, params);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM reviews r
      WHERE r.is_approved = 1
    `;
    const countParams = [];

    if (product_id) {
      countQuery += ` AND r.product_id = ?`;
      countParams.push(product_id);
    }
    if (user_id) {
      countQuery += ` AND r.user_id = ?`;
      countParams.push(user_id);
    }

    const [countResult] = await db.query(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: {
        reviews: reviews.map(r => ({
          ...r,
          images: r.images ? JSON.parse(r.images) : []
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
// GET /api/reviews/:id - Lấy chi tiết review
// ============================================
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const [reviews] = await db.query(`
      SELECT 
        r.*,
        u.name as user_name,
        u.avatar as user_avatar,
        p.name as product_name,
        p.slug as product_slug
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN products p ON r.product_id = p.id
      WHERE r.id = ?
    `, [id]);

    if (reviews.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Review not found' }
      });
    }

    const review = reviews[0];

    res.json({
      success: true,
      data: {
        ...review,
        images: review.images ? JSON.parse(review.images) : []
      }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// POST /api/reviews - Tạo review mới
// ============================================
router.post('/', async (req, res, next) => {
  try {
    const {
      product_id, user_id, rating, title, comment, images = []
    } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: { message: 'Rating must be between 1 and 5' }
      });
    }

    // Check if user already reviewed this product
    const [existing] = await db.query(
      'SELECT id FROM reviews WHERE user_id = ? AND product_id = ?',
      [user_id, product_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'You already reviewed this product' }
      });
    }

    // Create review
    const [result] = await db.query(`
      INSERT INTO reviews (
        product_id, user_id, rating, title, comment, images
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, [
      product_id, user_id, rating, title, comment,
      JSON.stringify(images)
    ]);

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        message: 'Review created successfully'
      }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// PUT /api/reviews/:id - Cập nhật review
// ============================================
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, title, comment, images } = req.body;

    await db.query(`
      UPDATE reviews 
      SET rating = ?, title = ?, comment = ?, images = ?
      WHERE id = ?
    `, [rating, title, comment, JSON.stringify(images), id]);

    res.json({
      success: true,
      data: { message: 'Review updated successfully' }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// DELETE /api/reviews/:id - Xóa review
// ============================================
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM reviews WHERE id = ?', [id]);

    res.json({
      success: true,
      data: { message: 'Review deleted successfully' }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// POST /api/reviews/:id/helpful - Mark review helpful
// ============================================
router.post('/:id/helpful', async (req, res, next) => {
  try {
    const { id } = req.params;

    await db.query(
      'UPDATE reviews SET helpful_count = helpful_count + 1 WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      data: { message: 'Thank you for your feedback' }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// GET /api/reviews/product/:product_id/summary
// Thống kê rating của sản phẩm
// ============================================
router.get('/product/:product_id/summary', async (req, res, next) => {
  try {
    const { product_id } = req.params;

    // Get rating distribution
    const [distribution] = await db.query(`
      SELECT 
        rating,
        COUNT(*) as count
      FROM reviews
      WHERE product_id = ? AND is_approved = 1
      GROUP BY rating
      ORDER BY rating DESC
    `, [product_id]);

    // Get average and total
    const [summary] = await db.query(`
      SELECT 
        AVG(rating) as average,
        COUNT(*) as total
      FROM reviews
      WHERE product_id = ? AND is_approved = 1
    `, [product_id]);

    res.json({
      success: true,
      data: {
        average: parseFloat(summary[0].average || 0).toFixed(2),
        total: summary[0].total,
        distribution: {
          5: distribution.find(d => d.rating === 5)?.count || 0,
          4: distribution.find(d => d.rating === 4)?.count || 0,
          3: distribution.find(d => d.rating === 3)?.count || 0,
          2: distribution.find(d => d.rating === 2)?.count || 0,
          1: distribution.find(d => d.rating === 1)?.count || 0,
        }
      }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
